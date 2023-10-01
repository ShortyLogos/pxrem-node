import { createReadStream, createWriteStream } from "fs";
import readline from "readline";
import LineWorker from "./LineWorker.js";

export default class LinesProcessor {
  /**
   * @param {string} inputPath - The path to the input file.
   * @param {string} outputPath - The path to the output file.
   * @param {boolean} isOverwriting - Whether or not the output file is overwriting the input file.
   * @param {number} [rootFontSize=16] - The root font size for REM conversion.
   */
  constructor(inputPath, outputPath, debug, rootFontSize = 16) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.encoding = "utf-8";
    this.lineNumber = 1;

    this.regex = /\d+px/g;
    this.rootFontSize = rootFontSize;
    this.changesCount = 0;

    this._debug = debug;
  }

  /**
   * Process the lines from the input file, converting pixel values to REM units.
   */
  async execute() {
    try {
      const inputStream = createReadStream(this.inputPath, this.encoding);
      const lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity, // Treats '\r\n' as a single line break
      });

      const outputStream = createWriteStream(this.outputPath);

      const lineWorker = new LineWorker(this.regex, this.rootFontSize);

      for await (const line of lines) {
        lineWorker.line = line;
        lineWorker.checkForMatches();

        if (lineWorker.matches) {
          if (this._debug) {
            console.log(this.lineNumber, "\t", lineWorker.matches);
          }

          const { convertedLine, changesCount } = await lineWorker.convertToRem();

          this.changesCount += changesCount;
          outputStream.write(`${convertedLine}\n`);
        } else {
          outputStream.write(`${line}\n`);
        }

        this.lineNumber++;
      }

      inputStream.close();
      outputStream.end();

      return { changesCount: this.changesCount, lineNumber: this.lineNumber };
    } catch (error) {
      console.error("LinesProcessor: Error in 'execute' method: ", error);
    }
  }
}