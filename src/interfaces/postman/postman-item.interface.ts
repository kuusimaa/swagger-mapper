import PostmanResponse from './postman-response.interface';
import PostmanRequest from './postman-request.interface';

/**
 * The PostmanItem interface represents an item in a Postman collection.
 * @interface PostmanItem
 */
export default interface PostmanItem {
  name: string;
  request: PostmanRequest;
  response: PostmanResponse[];
}
