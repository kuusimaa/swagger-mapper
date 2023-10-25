import PostmanVariable from './postman-variable.interface';

/**
 * The PostmanUrl interface represents the URL for a request in a Postman collection.
 * @interface PostmanUrl
 */
export default interface PostmanUrl {
  raw: string;
  host: string[];
  path: string[];
  variable?: PostmanVariable[];
  query?: PostmanVariable[];
}
