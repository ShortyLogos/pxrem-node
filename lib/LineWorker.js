import Converter from "./Converter";

export default class LineWorker {
  /**
   * @param {RegExp} regex - Regular expression for matching values in the line.
   * @param {Converter} [converter=null] - The converter used for converting values.
   * @throws {Error} Throws an error if the regex is not a valid RegExp.
   */
  constructor(regex, converter) {
    this._line = null;
    this._converter = converter || null;
    this._matches = [];

    this._validateRegex(regex);
    this._regex = regex;
  }

  /**
   * Validate that the line is a valid string.
   * @throws {Error} Throws an error if the line is not a valid string.
   * @private
   */
  _validateLine() {
    if (typeof this._line !== "string") {
      throw new Error(
        "LineWorker: _line is not a string. Call setLine() with a string value."
      );
    }
  }

  /**
   * Validate that a converter has been set.
   * @throws {Error} Throws an error if no valid converter has been set.
   * @private
   */
  _validateConverter() {
    if (!(this._converter instanceof Converter)) {
      throw new Error(
        "LineWorker: _converter is not an instance of Converter. Call setConverter() with a Converter instance."
      );
    }
  }

  /**
   * Validate that a regex has been set.
   * @throws {Error} Throws an error if no valid regex has been set.
   * @private
   */
  _validateRegex() {
    if (!(this._regex instanceof RegExp)) {
      throw new Error(
        "LineWorker: _regex is not a valid RegExp. Call setRegex() with a RegExp instance."
      );
    }
  }

  /**
   * @param {string} line - The line to be processed.
   */
  set line(line) {
    this._line = line;
    this._validateLine();
  }

  /**
   * @param {Converter} converter - The converter used.
   */
  set converter(converter) {
    if (!(converter instanceof Converter)) {
      throw new Error("LineWorker: converter is not an instance of Converter.");
    }

    this._converter = converter;
  }

  /**
   * @returns {Converter} The converter assigned to the LineWorker.
   */
  get converter() {
    return this._converter;
  }

  /**
   * @returns {Array} The matches found in the line.
   */
  get matches() {
    return this._matches;
  }

  /**
   * Find matches in the line using the provided regex.
   */
  checkForMatches() {
    this._validateLine();
    this._matches = this._line.match(this._regex);
  }

  /**
   * @param {RegExp} regex - Regular expression for matching values in the line.
   * @throws {Error} Throws an error if the regex is not a valid RegExp.
   */
  set regex(regex) {
    this._validateRegex(regex);
    this._regex = regex;
  }

  /**
   * Convert matched values in the line from pixels to REM.
   * @returns {Promise<{ convertedLine: string, changesCount: number }>}.
   */
  async convert() {
    this._validateConverter();
    let convertedLine = this._line;
    let changesCount = 0;

    for await (const match of this.matches) {
      const sourceValue = parseInt(
        match.substring(0, match.length - this.converter.sourceLabel.length)
      );

      if (!isNaN(sourceValue)) {
        const formattedTarget = this.converter.convert(sourceValue);

        convertedLine = convertedLine.replace(match, `${formattedTarget}`);

        changesCount++;
      } else {
        console.error(`Error: Could not parse "${sourceValue}" as an integer.`);
      }
    }

    return { convertedLine, changesCount };
  }
}
