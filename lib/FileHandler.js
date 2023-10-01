import { promises as fsPromises } from "fs";
import path from "path";

export default class FileHandler {
  constructor(debug, flag = "_rem") {
    this.flag = flag;
    this._debug = debug;
    this._tempFilePath = null;
  }

  get tempFilePath() {
    return this._tempFilePath;
  }

  generateTempPath(filePath) {
    try {
      const { dir, name, ext } = path.parse(filePath);

      const tempFilename = name + "_temp" + ext;
      const tempFilePath = path.join(dir, tempFilename);

      if (this._debug) {
        console.log(`Input File Path: ${filePath}`);
        console.log(`Temp File Path: ${tempFilePath}`);
      }

      this._tempFilePath = tempFilePath;
      return tempFilePath;
    } catch (error) {
      console.error(error);
    }
  }

  generateAutoPath(filePath) {
    try {
      const { dir, name, ext } = path.parse(filePath);

      // Modify the file name by removing "_REM" (if present)
      // and appending it just before the file extension
      const newFilename = name.replace(this.flag, "") + this.flag + ext;
      const outputFilePath = path.join(dir, newFilename);

      if (this._debug) {
        console.log(`Input File Path: ${filePath}`);
        console.log(`Output File Path: ${outputFilePath}`);
      }

      return outputFilePath;
    } catch (error) {
      console.error(error);
    }
  }

  overwriteOriginalFile(inputFilePath, outputFilePath) {
    try {
      fsPromises.unlink(inputFilePath);
      return fsPromises.rename(outputFilePath, inputFilePath);
    } catch (error) {
      console.error(
        "FileHandler: Error trying to delete original file and rename temp file with modified content: ",
        error
      );
    }
  }
}
