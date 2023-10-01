import { promises as fsPromises } from "fs";
import path from "path";

/**
 * Handles file paths.
 * @property {string} targetLabel - The flag to be appended to the file name when the overwrite option is disabled and no output path is specified.
 * @property {boolean} _debug - Whether or not debug mode is enabled.
 * @property {string} _tempFilePath - The path to the temporary file.
 */
export default class FileHandler {
  constructor(debug, targetLabel) {
    this.flag = "_" + targetLabel;
    this._debug = debug;
    this._tempFilePath = null;
  }

  get tempFilePath() {
    return this._tempFilePath;
  }

  /**
   * Generate a temporary path for the file to be processed when overwrite option is enabled.
   * @param {string} filePath - The path to the file to be processed.
   * @returns {string} The path to the temporary file.
   */
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

  /**
   * Generate an automatic path for the output file when overwrite option is disabled and no output path has been specified.
   * @param {string} filePath - The path to the file to be processed.
   * @returns {string} The path to the output file.
   */
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

  /**
   * Overwrite the original file with the modified content from the temporary file.
   * @param {string} inputFilePath - The path to the input file.
   * @param {string} outputFilePath - The path to the output file.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the original file cannot be deleted or the temporary file cannot be renamed.
   * @todo Add a check to make sure the temporary file exists before trying to rename it.
   * @todo Add a check to make sure the original file exists before trying to delete it.
   * @todo Add a check to make sure the temporary file is not empty before trying to rename it.
   * @todo Add a check to make sure the original file is not empty before trying to delete it.
   * @todo Add a check to make sure the temporary file has the same extension as the original file before trying to rename it.
   * @todo Add a check to make sure the original file has the same extension as the temporary file before trying to delete it.
   */
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
