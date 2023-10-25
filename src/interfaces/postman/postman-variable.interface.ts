/**
 * The PostmanVariable interface represents a variable in a URL for a request in a Postman collection.
 * @interface PostmanVariable
 */
export default interface PostmanVariable {
  key: string;
  value: string;
  description?: string;
  disabled?: boolean;
}
