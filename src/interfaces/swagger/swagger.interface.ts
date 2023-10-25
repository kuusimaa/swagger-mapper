import SwaggerRoute from './swagger-route.interface';
import SwaggerInfo from './swagger-info.interface';

/**
 * The Swagger interface represents a Swagger specification.
 * @interface Swagger
 */
export default interface Swagger {
  info: SwaggerInfo;
  paths: Record<string, SwaggerRoute>;
}
