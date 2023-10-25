#! /usr/bin/env node

import CommanderService from './services/commander.service';
import {Command} from 'commander';
import logger from './lib/logger';
import figlet from 'figlet';

/**
 * The main function that runs the program.
 */
async function main() {
  console.log('\n', '\x1b[36m', figlet.textSync('Swagger Mapper'), '\n'); // Display the program name in ASCII art.

  const program = new Command() // Create a new Commander program.
    .version('1.0.0') // Set the program version.
    .description('Map Swagger json to Postman collection') // Set the program description.
    .argument('<urls>', 'The URL(s) of the Swagger JSON file(s), separated by commas') // Define the urls argument.
    .argument('<outputDir>', 'The directory where the Postman collection will be saved') // Define the outputDir argument.
    .action(async (urls, outputDir) => await CommanderService.handleAsync(urls.split(','), outputDir)); // Call the CommanderService to handle the arguments.

  await program.parseAsync(process.argv); // Parse the arguments and run the program.
}

// Run the main function and catch any unexpected errors.
main().catch(error => {
  logger.error('Unexpected error occurred:', error.message); // Log any unexpected errors to the console.

  // eslint-disable-next-line no-process-exit
  process.exit(1); // Exit the program with an error code.
});
