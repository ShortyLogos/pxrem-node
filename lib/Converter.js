export default class Converter {
  constructor(sourceLabel, targetLabel, ratio, operation, hasFloating) {
    this.sourceLabel = sourceLabel;
    this.targetLabel = targetLabel;
    this.ratio = ratio;
    this.operation = operation;
    this.hasFloating = hasFloating;
  }

  convert(value, shouldBeFormatted = true) {
    let result = null;

    if (this.operation === "divide") {
      result = this.convertWithDivision(value);
    } else if (this.operation === "multiply") {
      result = this.convertWithMultiplication(value);
    } else if (typeof this.operation === "function") {
      result = this.convertWithCustomFunction(value);
    } else {
      throw new Error("Unsupported conversion operation");
    }

    return shouldBeFormatted ? result + this.targetLabel : result;
  }

  convertWithDivision(value) {
    return value / this.ratio;
  }

  convertWithMultiplication(value) {
    return value * this.ratio;
  }

  /*
   * This method is not used in the current version of the program.
   * It is kept here for future reference.
   */
  convertWithCustomFunction(value) {
    const result = this.operation(value);
    return result;
  }
}
