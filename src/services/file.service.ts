import Postman from '../interfaces/postman/postman.interface';
import * as utils from '../lib/utilities';
import logger from '../lib/logger';

export default class FileService {
  /**
   * Writes an array of Postman collections to files.
   * @param {Postman[]} data The Postman collections to write to files.
   * @param {string} outputDir The output directory for the Postman collections.
   * @returns {Promise<void>} A Promise that resolves when the Postman collections have been written to files.
   */
  public static async writeResultsToFileAsync(data: Postman[], outputDir: string): Promise<void> {
    // Ensure that the output directory exists.
    await utils.ensurePathExistenceAsync(outputDir);

    // Write each Postman collection to a file in parallel.
    await Promise.all(
      data.map(async pc => {
        const path = utils.getFilePath(pc, outputDir); // Get the file path for the Postman collection.
        const data = utils.stringify(pc); // Stringify the Postman collection.
        await utils.writeFileAsync(path, data); // Write the Postman collection to a file.
      })
    );

    logger.info('done!');
  }
}
