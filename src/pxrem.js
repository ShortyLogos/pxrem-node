#!/usr/bin/env node
import { Command } from "commander";
import LinesProcessor from "./modules/LinesProcessor.js";
import FileHandler from "./modules/FileHandler.js";

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
  .option(
    "-o, --no-overwrite",
    "Generate a modified file instead of overwriting.",
    false
  )
  .parse();

const options = program.opts();

console.log("options", options);
console.log("paths", options.paths);

if (options.paths.length > 2) {
  console.error("Error: Too many paths provided.");
  process.exit(1);
}

const fileHandler = new FileHandler();

const inputFilePath = options.paths[0];
const outputFilePath =
  options.paths[1] ?? fileHandler.generateFilePath(inputFilePath);

const rootFontSize = parseInt(options.rootFontSize);

// Define input and output file paths
// const inputFilePath = "../files/example.tsx";

const linesProcessor = new LinesProcessor(
  inputFilePath,
  outputFilePath,
  rootFontSize
);

// Call the process method
linesProcessor.process();
