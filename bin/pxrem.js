#!/usr/bin/env node
import { Command } from "commander";
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
  .option("-r, --root-font-size <int>", "Root font size in pixels.", "16")
  .option("-d, --debug", "Activate Debug Mode.")
  .option(
    "-o, --overwrite",
    "Overwriting the original file instead of generating a new one."
  )
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

async function process(options) {
  const fileHandler = new FileHandler(options.debug);

  const inputFilePath = options.paths[0];
  const outputFilePath = options.overwrite
    ? fileHandler.generateTempPath(inputFilePath)
    : options.paths[1] ?? fileHandler.generateAutoPath(inputFilePath);

  const rootFontSize = parseInt(options.rootFontSize);

  const startTime = performance.now();

  const { lineNumber, changesCount } = await new LinesProcessor(
    inputFilePath,
    outputFilePath,
    options.debug,
    rootFontSize
  ).execute();

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  console.log(
    `\nProcessed ${lineNumber} lines in ${elapsedTime.toFixed(
      2
    )} milliseconds.\n${changesCount} changes from px -> rem based on a font size of ${
      options.rootFontSize
    }.`
  );

  if (options.overwrite) {
    await fileHandler.overwriteOriginalFile(inputFilePath, outputFilePath);
    console.log(`Overwrited ${inputFilePath}.\n`);
  } else {
    console.log(`Saved to ${outputFilePath}.\n`);
  }
}

function main() {
  validateOptions(options);
  process(options);
}

main();
