import SwaggerParameter from './swagger-parameter.interface';
import SwaggerResponse from './swagger-response.interface';

/**
 * The SwaggerRouteSchema interface represents a method schema for a route in a Swagger specification.
 * @interface SwaggerRouteSchema
 */
export default interface SwaggerRouteSchema {
  summary?: string;
  description?: string;
  parameters?: SwaggerParameter[];
  tags?: string[];
  responses?: Record<string, SwaggerResponse>;
}
