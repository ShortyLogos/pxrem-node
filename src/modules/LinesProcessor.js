import { createReadStream, createWriteStream } from "fs";
import readline from "readline";

export default class LinesProcessor {
  constructor(inputPath, outputPath, rootFontSize = 16) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;

    this.rootFontSize = rootFontSize;
    this.encoding = "utf-8";

    this.lineNumber = 1;
    this.conversions = 0;

    this.regex = /\d+px/g;
  }

  async process() {
    try {
      const startTime = performance.now();

      const inputStream = createReadStream(this.inputPath, this.encoding);
      const lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity, // Treats '\r\n' as a single line break
      });

      const outputStream = createWriteStream(this.outputPath);

      for await (const line of lines) {
        const matches = line.match(this.regex);

        if (matches) {
          console.log(this.lineNumber, "\t", matches);
          let modifiedLine = line;

          for await (const match of matches) {
            const pxValue = parseInt(match.substring(0, match.length - 2)); // Remove "px" part
            const remValue = pxValue / 16; // You can adjust the rootFontSize as needed

            modifiedLine = modifiedLine.replace(match, `${remValue}rem`);
            this.conversions++;
          }
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
        ${this.conversions} conversions from px -> rem based on a font size of ${this.rootFontSize}.
        Saved to ${this.outputPath}.
      `);
    } catch (error) {
      console.error(error);
    }
  }
}
