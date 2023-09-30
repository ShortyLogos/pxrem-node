import path from "path";

export default class FileHandler {
  constructor(flag = "_REM", log = true) {
    this.flag = flag;
    this.log = log;
  }

  generateFilePath(filePath) {
    try {
      const { dir, name, ext } = path.parse(filePath);

      // Modify the file name by removing "_REM" (if present)
      // and appending it just before the file extension
      const newFilename = name.replace(this.flag, "") + this.flag + ext;
      const outputFilePath = path.join(dir, newFilename);

      if (this.log) {
        console.log(`Input File Path: ${filePath}`);
        console.log(`Output File Path: ${outputFilePath}`);
      }

      return outputFilePath;
    } catch (error) {
      console.error(error);
    }
  }
}
