import PostmanMapper from './PostmanMapper.service';
import SwaggerService from './swagger.service';
import FileService from './file.service';

export default class CommanderService {
  /**
   * Handles the command-line arguments and generates the Postman collections.
   * @param {string[]} urls The URLs of the Swagger data to map to Postman collections.
   * @param {string} outputDir The output directory for the Postman collections.
   * @returns {Promise<void>} A Promise that resolves when the Postman collections have been generated.
   */
  public static async handleAsync(urls: string[], outputDir: string): Promise<void> {
    return Promise.all(urls.map(url => SwaggerService.fetchSwaggerJsonAsync(url))) // Fetch the Swagger data from the provided URLs
      .then(sw => sw.filter(({data}) => data !== undefined)) // Filter out any responses that have undefined data
      .then(sw => sw.map(c => PostmanMapper.map(c.data!, c.url))) // Map the Swagger data to Postman collections
      .then(pc => FileService.writeResultsToFileAsync(pc, outputDir)); // Write the Postman collections to files
  }
}
