#!/usr/bin/env node
import { promises as fsPromises, createReadStream, createWriteStream } from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";

async function processLines(filePath, outputPath, rootFontSize = 16) {
  const inputStream = createReadStream(filePath, "utf-8");
  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity, // Treats '\r\n' as a single line break
  });

  const outputStream = createWriteStream(outputPath);

  let lineNumber = 0;
  let conversions = 0;

  for await (const line of lines) {
    // Double the counter and add it to the start of each line
    const modifiedLine = `${lineNumber * 2} ${line}`;

    // Write the modified line to the output file
    outputStream.write(`${modifiedLine}\n`);

    // Log the modified line to the console
    console.log(modifiedLine);
    lineNumber++;
    conversions++;
  }

  // Close the output stream when done
  outputStream.end();

  console.log(`
    Processed ${lineNumber} lines.
    \n${conversions} conversions from px -> rem based on a font size of ${rootFontSize}.
    \nSaved to ${outputPath}
  `);
}

// Define input and output file paths
const inputFilePath = "./files/example.tsx";
const outputFilePath = "./files/example_modified.tsx";

// Call the function to read and modify the file
processLines(inputFilePath, outputFilePath);
