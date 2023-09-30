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
    const matches = line.match(/\d+px/g);

    if (matches) {
      console.log(lineNumber, matches);
      let modifiedLine;

      for await (const match of matches) {
        const pxValue = parseInt(match.substring(0, match.length - 2)); // Remove "px" part

        // Calculate the value in rem (assuming rootFontSize is 16)
        const remValue = pxValue / 16; // You can adjust the rootFontSize as needed

        // Replace the "px" value with the calculated "rem" value in the line
        modifiedLine = line.replace(match, `${remValue}rem`);

        conversions++;
      }
      // Write the modified line to the output file
      outputStream.write(`${modifiedLine}\n`);
    } else {
      // If no "px" values were found in the line, write it as is to the output
      outputStream.write(`${line}\n`);
    }

    lineNumber++;

    // Log the modified line to the console
    console.log(line);
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
