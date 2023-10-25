import SwaggerRouteSchema from '../interfaces/swagger/swagger-route-schema.interface';
import SwaggerParameterType from '../interfaces/swagger/swagger-parameter-type.enum';
import SwaggerParameter from '../interfaces/swagger/swagger-parameter.interface';
import SwaggerSchema from '../interfaces/swagger/swagger-schema.interface';
import Swagger from '../interfaces/swagger/swagger.interface';

import PostmanVariable from '../interfaces/postman/postman-variable.interface';
import PostmanResponse from '../interfaces/postman/postman-response.interface';
import PostmanItem from '../interfaces/postman/postman-item.interface';
import PostmanBody from '../interfaces/postman/postman-body.interface';
import PostmanUrl from '../interfaces/postman/postman-url.interface';

interface Route {
  path: string;
  method: string;
  schema: SwaggerRouteSchema;
}

/**
 * Maps a single route from the Swagger object to a Postman item.
 * @param {Route} route The route object to map.
 * @returns {PostmanItem} The mapped Postman item.
 */
export function mapRoute(route: Route): PostmanItem {
  const {path, method, schema} = route;
  const paramMap = getParameterMap(schema);
  return {
    name: `${method.toUpperCase()} ${mapPath(path).join('/')}`,
    request: {
      method: method.toUpperCase(),
      header: mapParameters(paramMap.get(SwaggerParameterType.header)),
      body: mapRequestBody(paramMap.get(SwaggerParameterType.BODY)),
      url: mapUrl(path, paramMap),
    },
    response: mapResponse(schema),
  };
}

/**
 * Gets the routes from a Swagger object.
 * @param {Swagger} swagger The Swagger object.
 * @returns {Array<Route>} The array of routes.
 */
export function getRoutes(swagger: Swagger): Route[] {
  return Object.entries(swagger.paths).flatMap(([path, route]) =>
    Object.entries(route).map(([method, schema]) => ({path, method, schema}))
  );
}

/**
 * Maps the URL for a single route from the Swagger object to a Postman URL.
 * @param {string} path The path for the route.
 * @param {Map<SwaggerParameterType, Array<SwaggerParameter>>} paramMap The map of parameters for the route.
 * @returns {PostmanUrl} The mapped Postman URL.
 */
function mapUrl(path: string, paramMap: Map<SwaggerParameterType, Array<SwaggerParameter>>): PostmanUrl {
  return {
    raw: '{{baseUrl}}' + path,
    host: ['{{baseUrl}}'],
    path: mapPath(path),
    query: mapParameters(paramMap.get(SwaggerParameterType.QUERY), true),
    variable: mapParameters(paramMap.get(SwaggerParameterType.PATH)),
  };
}

/**
 * Maps the response for a single route from the Swagger object to a Postman response.
 * @param {SwaggerRouteSchema} schema The schema for the route.
 * @returns {Array<PostmanResponse>} The array of Postman responses.
 */
function mapResponse(schema: SwaggerRouteSchema): Array<PostmanResponse> {
  return Object.entries(schema.responses ?? {}).map(([code, {description, schema}]) => ({
    name: description,
    code,
    header: [],
    body: schema ? JSON.stringify(schema.example ?? {}) : '',
  }));
}

/**
 * Gets the map of parameters for a single route from the Swagger object.
 * @param {SwaggerRouteSchema} schema The schema for the route.
 * @returns {Map<SwaggerParameterType, Array<SwaggerParameter>>} The map of parameters.
 */
function getParameterMap(schema: SwaggerRouteSchema): Map<SwaggerParameterType, Array<SwaggerParameter>> {
  const paramMap = new Map<SwaggerParameterType, Array<SwaggerParameter>>();
  for (const param of schema.parameters ?? []) {
    paramMap.set(param.in, [...(paramMap.get(param.in) ?? []), param]);
  }
  return paramMap;
}

/**
 * Maps the path for a single route from the Swagger object to an array of path segments.
 * @param {string} path The path for the route.
 * @returns {Array<string>} The array of path segments.
 */
function mapPath(path: string): Array<string> {
  return path.split('/').map(segment => (isPathParameter(segment) ? `:${segment.slice(1, -1)}` : segment));
}

/**
 * Determines if a path segment is a path parameter.
 * @param {string} segment The path segment.
 * @returns {boolean} Whether or not the path segment is a path parameter.
 */
function isPathParameter(segment: string): boolean {
  return segment.startsWith('{') && segment.endsWith('}');
}

/**
 * Maps the parameters for a single route from the Swagger object to an array of Postman variables.
 * @param {Array<SwaggerParameter>} parameters The array of parameters for the route.
 * @param {boolean} disabled Whether or not the parameters are disabled.
 * @returns {Array<PostmanVariable>} The array of Postman variables.
 */
function mapParameters(parameters: Array<SwaggerParameter> | undefined, disabled?: boolean): PostmanVariable[] {
  return (
    parameters?.map(({name, description}) => ({
      key: name,
      value: '',
      description: description,
      disabled,
    })) ?? []
  );
}

/**
 * Maps the request body for a single route from the Swagger object to a Postman body.
 * @param {Array<SwaggerParameter>} parameters The array of parameters for the route.
 * @returns {PostmanBody} The mapped Postman body.
 */
function mapRequestBody(parameters: Array<SwaggerParameter> | undefined): PostmanBody {
  if (parameters?.length === 1 && parameters[0].schema) {
    const {schema} = parameters[0];
    const mappedRaw = mapType('', schema)[1];
    return {
      mode: 'raw',
      raw: JSON.stringify(mappedRaw, null, 2),
      options: {raw: {language: 'json'}},
    };
  }

  return {mode: '', raw: ''};
}

/**
 * Maps the type for a single schema from the Swagger object to a key-value pair.
 * @param {string} propertyName The name of the property.
 * @param {SwaggerSchema} value The schema for the property.
 * @returns {[key: string, value: any]} The mapped key-value pair.
 */
function mapType(
  propertyName: string,
  value: SwaggerSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [key: string, value: any] {
  switch (value?.type) {
    case 'object': {
      // If the schema is an object, map each property to a key-value pair and return an object.
      const objectEntries = Object.entries(value.properties ?? {});
      const mappedObjectEntries = objectEntries.map(([key, value]) => mapType(key, value));
      return [propertyName, Object.fromEntries(mappedObjectEntries)];
    }
    case 'array':
      // If the schema is an array, map the items to a key-value pair and return an array.
      return [propertyName, [mapType('', value.items)[1]]];
    case 'string':
      // If the schema is a string, return the enum values if it exists, otherwise return 'string'.
      return [propertyName, value.enum && value.enum.length > 0 ? value.enum.join(', ') : 'string'];
    case 'boolean':
      // If the schema is a boolean, return true.
      return [propertyName, true];
    case 'number':
      // If the schema is a number, return 0.
      return [propertyName, 0];
    default:
      // If the schema is any other type, return 'string'.
      return [propertyName, 'string'];
  }
}
