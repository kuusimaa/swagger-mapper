import SwaggerParameterType from './swagger-parameter-type.enum';
import SwaggerSchema from './swagger-schema.interface';

/**
 * The SwaggerParameter interface represents a parameter for a method in a Swagger specification.
 * @interface SwaggerParameter
 */
export default interface SwaggerParameter {
  in: SwaggerParameterType;
  name: string;
  description?: string;
  required?: boolean;
  schema?: SwaggerSchema;
}
