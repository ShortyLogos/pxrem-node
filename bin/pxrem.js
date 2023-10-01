#!/usr/bin/env node
import { Command } from "commander";
import { promises as fsPromises } from "fs";
import chalk from "chalk";
import LinesProcessor from "../lib/LinesProcessor.js";
import FileHandler from "../lib/FileHandler.js";

const program = new Command();

program
  .name("pxrem")
  .description("pxrem is for converting px -> rem values in web dev related files.")
  .version("1.0.0");

program
  .requiredOption(
    "-p, --paths [paths...]",
    "Paths of the file to be processed and its output file."
  )
  .option(
    "-c, --conversion [values...]",
    "Data to handle conversions. [0] = source label, [1] = target label, [2] = ratio, [3] = operation, [4] = floating.",
    ["px", "rem", 16, "divide", false]
  )
  .option("-o, --overwrite", "Overwriting the original file instead of generating a new one.")
  .option("-r, --ratio <int>", "Ratio used for conversions.", "16")
  .option("--rem-to-px", "Convert rem -> px values. Superseeds the -c option.")
  .option("-d, --debug", "Activate Debug Mode.")
  .parse();

const options = program.opts();

const conversionParams = options.remToPx
  ? ["rem", "px", options.ratio, "multiply", true]
  : options.conversion;

function validateOptions(options) {
  if (options.debug) {
    console.log("options", options);
    console.log("paths", options.paths);
  }

  if (options.paths.length > 2) {
    console.error("Error: Too many paths provided.");
    process.exit(1);
  }
}

async function execute(options) {
  const startTime = performance.now();

  const [sourceLabel, targetLabel, unparsedRatio, operation, hasFloating] = conversionParams;

  const fileHandler = new FileHandler(options.debug, targetLabel);

  const inputFilePath = options.paths[0];
  const outputFilePath = options.overwrite
    ? fileHandler.generateTempPath(inputFilePath)
    : options.paths[1] ?? fileHandler.generateAutoPath(inputFilePath);

  const ratio = parseInt(unparsedRatio);

  const linesProcessor = new LinesProcessor(inputFilePath, outputFilePath, options.debug, [
    sourceLabel,
    targetLabel,
    unparsedRatio,
    operation,
    hasFloating,
  ]);

  const { lineNumber, changesCount } = await linesProcessor.process();

  if (options.overwrite) {
    await fileHandler.overwriteOriginalFile(inputFilePath, outputFilePath);
  }

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  logResults({
    inputFilePath,
    outputFilePath,
    sourceLabel,
    targetLabel,
    isOverwriting: options.overwrite,
    lineNumber,
    changesCount,
    elapsedTime,
    ratio,
  });
}

function logResults(data) {
  const resultsLog = [];
  const FLOATING_POINT_PRECISION = 2;

  resultsLog.push(
    `Processed ${chalk.cyan.bold(`${data.lineNumber}`)} lines in ${data.elapsedTime.toFixed(
      FLOATING_POINT_PRECISION
    )}ms.`
  );

  resultsLog.push(
    `${chalk.magenta.bold(data.changesCount)} changes from ${chalk.italic(
      `${data.sourceLabel} -> ${data.targetLabel}`
    )} based on a ratio of ${chalk.yellowBright.bold(data.ratio)}.`
  );

  if (data.isOverwriting) {
    resultsLog.push(chalk.green.bold(`Overwrited ${data.inputFilePath}.`));
  } else {
    resultsLog.push(chalk.green.bold(`Saved to ${data.outputFilePath}.`));
  }

  resultsLog.unshift("");
  resultsLog.push("");

  resultsLog.forEach(result => console.log(`\t${result}`));
}

async function main() {
  validateOptions(options);
  try {
    await fsPromises.access(options.paths[0], fsPromises.constants.R_OK);
    execute(options);
  } catch (error) {
    console.error(
      "Error accessing input path. Make sure it exists and you have read permissions.",
      error
    );
  }
}

main();
