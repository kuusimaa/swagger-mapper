import Swagger from '../interfaces/swagger/swagger.interface';
import logger from '../lib/logger';

import axios from 'axios';

export default class SwaggerService {
  /**
   * Fetches the Swagger json data from the provided URL.
   * @param {string} url The URL of the Swagger json.
   * @returns {Promise<{ data: Swagger; url: string; }>} A Promise that resolves to the Swagger data.
   */
  public static async fetchSwaggerJsonAsync(url: string): Promise<{data: Swagger | undefined; url: string}> {
    try {
      const {data} = await axios.get<Swagger>(url); // Use axios to fetch the Swagger json data.

      logger.info('Successfully fetched Swagger json from:', url);
      return {data, url}; // Return the Swagger json data.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(`Error occurred while fetching ${url}`, error.message); // Log any errors that occur while fetching the Swagger json.
      return {data: undefined, url}; // Return undefined if an error occurs.
    }
  }
}
