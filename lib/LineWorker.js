export default class LineWorker {
  /**
   * @param {RegExp} regex - Regular expression for matching values in the line.
   * @param {number} rootFontSize - The root font size for REM conversion.
   * @param {string} [sourceLabel="px"] - The label for source values (e.g., "px").
   * @param {string} [targetLabel="rem"] - The label for target values (e.g., "rem").
   */
  constructor(regex, rootFontSize, sourceLabel = "px", targetLabel = "rem") {
    this._line = null;
    this._matches = [];
    this.regex = regex;

    this.rootFontSize = rootFontSize;
    this.sourceLabel = sourceLabel;
    this.targetLabel = targetLabel;
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
   * Set the line to be processed.
   * @param {string} line - The line to be processed.
   */
  set line(line) {
    this._line = line;
    this._validateLine();
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
    this._matches = this._line.match(this.regex);
  }

  /**
   * Convert matched values in the line from pixels to REM.
   * @returns {Promise<{ convertedLine: string, changesCount: number }>} - An object with the modified line and the number of changes made.
   */
  async convertToRem() {
    let convertedLine = this._line;
    let changesCount = 0;

    for await (const match of this.matches) {
      const pxValue = parseInt(
        match.substring(0, match.length - this.sourceLabel.length)
      );

      if (!isNaN(pxValue)) {
        const remValue = pxValue / this.rootFontSize;

        convertedLine = convertedLine.replace(
          match,
          `${remValue}${this.targetLabel}`
        );

        changesCount++;
      } else {
        console.error(`Error: Could not parse "${pxValue}" as an integer.`);
      }
    }

    return { convertedLine, changesCount };
  }
}
