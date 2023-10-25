import PostmanOption from './postman-options.interface';

/**
 * The PostmanBody interface represents the body for a request in a Postman collection.
 * @interface PostmanBody
 */
export default interface PostmanBody {
  mode: string;
  raw: string;
  options?: PostmanOption;
}
