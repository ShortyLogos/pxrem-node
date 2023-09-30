export default class LineWorker {
  /**
   * @param {RegExp} regex - Regular expression for matching values in the line.
   * @param {number} rootFontSize - The root font size for REM conversion.
   * @param {string} [sourceLabel="px"] - The label for source values (e.g., "px").
   * @param {string} [targetLabel="rem"] - The label for target values (e.g., "rem").
   */
  constructor(regex, rootFontSize, sourceLabel = "px", targetLabel = "rem") {
    this._line = null;
    this.regex = regex;
    this.matches = [];

    this.rootFontSize = rootFontSize;
    this.sourceLabel = sourceLabel;
    this.targetLabel = targetLabel;
  }

  _validateLine() {
    if (this._line === null) {
      throw new Error(
        "LineWorker: _line is not set. Call setLine() first with a valid line."
      );
    }
  }

  /**
   * Set the line to be processed.
   * @param {string} line - The line to be processed.
   */
  setLine(line) {
    this._line = line;
    this._validateLine();
  }

  /**
   * Find matches in the line using the provided regex.
   */
  checkForMatches() {
    this._validateLine();
    this.matches = this._line.match(this.regex);
  }

  /**
   * Convert matched values in the line from pixels to REM.
   * @returns {Promise<{ modifiedLine: string, changesCount: number }>} - An object with the modified line and the number of changes made.
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

        convertedLine = modifiedLine.replace(
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
