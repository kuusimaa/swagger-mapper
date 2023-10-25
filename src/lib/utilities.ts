import Postman from '../interfaces/postman/postman.interface';
import logger from './logger';

import path from 'path';
import fs from 'fs';

/**
 * Ensures that a directory exists at the given path.
 * @param {string} path The path to the directory to ensure exists.
 * @returns {Promise<void>} A Promise that resolves when the directory exists.
 */
export async function ensurePathExistenceAsync(path: string): Promise<void> {
  // Check if the directory exists.
  if (!fs.existsSync(path)) {
    logger.info('Creating directory:', path);
    // If it doesn't exist, create it with any missing parent directories.
    await fs.promises.mkdir(path, {recursive: true});
  }
}

/**
 * Gets the file path for a Postman collection.
 * @param {Postman} postmanCollection The Postman collection to get the file path for.
 * @param {string} outputDir The output directory for the Postman collections.
 * @returns {string} The file path for the Postman collection.
 */
export function getFilePath({info: {name}}: Postman, outputDir: string): string {
  // Replace any spaces in the collection name with hyphens to create the file name.
  const fileName = `${name.replace(' ', '-')}-postman-collection-${Date.now()}.json`;

  // Return the full file path.
  return path.join(outputDir, fileName);
}

/**
 * Stringifies a Postman collection.
 * @param {Postman} postmanCollection The Postman collection to stringify.
 * @returns {string} The stringified Postman collection.
 */
export function stringify(postmanCollection: Postman): string {
  return JSON.stringify(postmanCollection, null, 2);
}

/**
 * Writes data to a file.
 * @param {string} path The file path to write the data to.
 * @param {string} data The data to write to the file.
 * @returns {Promise<void>} A Promise that resolves when the data has been written to the file.
 */
export async function writeFileAsync(path: string, data: string): Promise<void> {
  logger.info('Writing Postman collection to:', path);
  return fs.promises.writeFile(path, data);
}
