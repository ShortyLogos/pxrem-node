import { createReadStream, createWriteStream } from "fs";
import readline from "readline";
import LineWorker from "./LineWorker.js";
import Converter from "./Converter.js";

export default class LinesProcessor {
  /**
   * @param {string} inputPath - The path to the input file.
   * @param {string} outputPath - The path to the output file.
   * @param {boolean} isOverwriting - Whether or not the output file is overwriting the input file.
   * @param {Array} conversionParams - The conversion params.
   */
  constructor(inputPath, outputPath, debug, conversionParams, encoding = "utf-8") {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.encoding = encoding;

    [this.sourceLabel, this.targetLabel, this.ratio, this.operation, this.hasFloating] =
      conversionParams;

    const pattern = this.hasFloating
      ? `\\d+\\.?\\d*${this.sourceLabel}`
      : `\\d+${this.sourceLabel}`;

    this.regex = new RegExp(pattern, "g");

    this.lineNumber = 1;
    this.changesCount = 0;

    this._debug = debug;
  }

  /**
   * Process the lines from the input file, converting pixel values to REM units.
   */
  async process() {
    try {
      const inputStream = createReadStream(this.inputPath, this.encoding);
      const lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity, // Treats '\r\n' as a single line break
      });

      const outputStream = createWriteStream(this.outputPath);

      const converter = new Converter(
        this.sourceLabel,
        this.targetLabel,
        this.ratio,
        this.operation,
        this.hasFloating
      );

      const lineWorker = new LineWorker(this.regex, converter);

      for await (const line of lines) {
        lineWorker.line = line;
        lineWorker.checkForMatches();

        if (lineWorker.matches) {
          if (this._debug) {
            console.log(this.lineNumber, "\t", lineWorker.matches);
          }

          const { convertedLine, changesCount } = await lineWorker.convert();

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
      console.error("LinesProcessor: Error in 'process' method: ", error);
    }
  }
}
