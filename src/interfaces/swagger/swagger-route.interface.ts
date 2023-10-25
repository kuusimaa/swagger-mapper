import SwaggerRouteSchema from './swagger-route-schema.interface';

/**
 * The SwaggerRoute interface represents a route in a Swagger specification.
 * @interface SwaggerRoute
 */
export default interface SwaggerRoute {
  [method: string]: SwaggerRouteSchema;
}
