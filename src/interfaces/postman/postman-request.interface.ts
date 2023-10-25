import PostmanVariable from './postman-variable.interface';
import PostmanBody from './postman-body.interface';
import PostmanUrl from './postman-url.interface';

/**
 * The PostmanRequest interface represents a request for an item in a Postman collection.
 * @interface PostmanRequest
 */
export default interface PostmanRequest {
  method: string;
  header: PostmanVariable[];
  body: PostmanBody;
  url: PostmanUrl;
}
