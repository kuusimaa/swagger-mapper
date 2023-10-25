import SwaggerSchema from './swagger-schema.interface';

/**
 * The SwaggerResponse interface represents a response for a method in a Swagger specification.
 * @interface SwaggerResponse
 */
export default interface SwaggerResponse {
  description: string;
  schema?: SwaggerSchema;
}
