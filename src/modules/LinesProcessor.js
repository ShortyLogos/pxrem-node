import { createReadStream, createWriteStream } from "fs";
import readline from "readline";
import LineWorker from "./LineWorker.js";

/**
 * A class for processing lines from an input file, converting pixel values to REM units.
 */
export default class LinesProcessor {
  /**
   * @param {string} inputPath - The path to the input file.
   * @param {string} outputPath - The path to the output file.
   * @param {number} [rootFontSize=16] - The root font size for REM conversion.
   */
  constructor(inputPath, outputPath, rootFontSize = 16) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.encoding = "utf-8";
    this.lineNumber = 1;

    this.regex = /\d+px/g;
    this.rootFontSize = rootFontSize;
    this.changesCount = 0;
  }

  /**
   * Process the lines from the input file, converting pixel values to REM units.
   */
  async process() {
    try {
      const startTime = performance.now();

      const inputStream = createReadStream(this.inputPath, this.encoding);
      const lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity, // Treats '\r\n' as a single line break
      });

      const outputStream = createWriteStream(this.outputPath);

      const lineWorker = new LineWorker(this.regex, this.rootFontSize);

      for await (const line of lines) {
        lineWorker.setLine(line);
        lineWorker.checkForMatches();

        if (lineWorker.matches) {
          console.log(this.lineNumber, "\t", lineWorker.matches);

          const { modifiedLine, changesCount } = await lineWorker.convertToRem();

          this.changesCount += changesCount;
          outputStream.write(`${modifiedLine}\n`);
        } else {
          outputStream.write(`${line}\n`);
        }

        this.lineNumber++;
      }

      outputStream.end();

      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      console.log(`
        Processed ${this.lineNumber} lines in ${elapsedTime} milliseconds.
        ${this.changesCount} changes from px -> rem based on a font size of ${this.rootFontSize}.
        Saved to ${this.outputPath}.
      `);
    } catch (error) {
      console.error(error);
    }
  }
}
