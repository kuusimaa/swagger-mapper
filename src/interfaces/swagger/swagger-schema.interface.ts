/**
 * The SwaggerSchema interface represents a schema for a response or parameter in a Swagger specification.
 * @interface SwaggerSchema
 */
export default interface SwaggerSchema {
  example?: object;
  type?: string;
  enum?: string[];
  properties?: Record<string, SwaggerSchema>;
  items: SwaggerSchema;
}
