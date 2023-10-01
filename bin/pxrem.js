#!/usr/bin/env node
import { Command } from "commander";
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
  .option("-o, --overwrite", "Overwriting the original file instead of generating a new one.")
  .option("-r, --root-font-size <int>", "Root font size in pixels.", "16")
  .option("-d, --debug", "Activate Debug Mode.")
  .parse();

const options = program.opts();

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
  const fileHandler = new FileHandler(options.debug);

  const inputFilePath = options.paths[0];
  const outputFilePath = options.overwrite
    ? fileHandler.generateTempPath(inputFilePath)
    : options.paths[1] ?? fileHandler.generateAutoPath(inputFilePath);

  const rootFontSize = parseInt(options.rootFontSize);

  const startTime = performance.now();

  const linesProcessor = new LinesProcessor(
    inputFilePath,
    outputFilePath,
    options.debug,
    rootFontSize
  );

  const { lineNumber, changesCount } = await linesProcessor.process();

  if (options.overwrite) {
    await fileHandler.overwriteOriginalFile(inputFilePath, outputFilePath);
  }

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  logResults({
    inputFilePath,
    outputFilePath,
    isOverwriting: options.overwrite,
    lineNumber,
    changesCount,
    elapsedTime,
    rootFontSize,
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
      "px -> rem"
    )} based on a font size of ${chalk.yellowBright.bold(data.rootFontSize)}.`
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

function main() {
  validateOptions(options);
  execute(options);
}

main();
