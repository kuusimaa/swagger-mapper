import PostmanVariable from './postman-variable.interface';

/**
 * The PostmanResponse interface represents a response for a request in a Postman collection.
 * @interface PostmanResponse
 */
export default interface PostmanResponse {
  name: string;
  code: string;
  header: PostmanVariable[];
  body: string;
}
