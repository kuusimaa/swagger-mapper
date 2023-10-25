import Postman from '../interfaces/postman/postman.interface';
import Swagger from '../interfaces/swagger/swagger.interface';
import {getRoutes, mapRoute} from '../lib/mapper';
import logger from '../lib/logger';

import _ from 'lodash';

// The URL for the Postman schema.
const SCHEMA_URL = 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json';

export default class PostmanMapper {
  /**
   * Maps a Swagger object to a Postman object.
   * @param {Swagger} swagger The Swagger object to map to a Postman object.
   * @param {string} url The URL of the Swagger object.
   * @returns {Postman} The Postman object.
   */
  public static map(swagger: Swagger, url: string): Postman {
    logger.info('Mapping Swagger json to Postman collection from:', url);
    // Return the Postman object with the info, items, and variables.
    return {
      info: {name: swagger.info.title, schema: SCHEMA_URL}, // Create the Postman info object with the name and schema URL.
      item: _.sortBy(getRoutes(swagger).map(mapRoute), 'name'), // Map each route in the Swagger object to a Postman item, and sort the items by name.
      variable: [{key: 'baseUrl', value: new URL(url).origin}], // Create the Postman variable object with the base URL.
    };
  }
}
