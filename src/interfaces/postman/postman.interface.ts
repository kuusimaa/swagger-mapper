import PostmanInfo from './postman-info.interface';
import PostmanItem from './postman-item.interface';
import PostmanVariable from './postman-variable.interface';

/**
 * The Postman interface represents a Postman collection.
 * @interface Postman
 */
export default interface Postman {
  info: PostmanInfo;
  item: PostmanItem[];
  variable?: PostmanVariable[];
}
