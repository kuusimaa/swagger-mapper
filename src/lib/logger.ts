/* eslint-disable @typescript-eslint/no-explicit-any */ // Disable the explicit any rule for this file.

const prefix = '\x1b[36m [Swagger Mapper]'; // Define a constant for the message prefix.

/**
 * A simple logger that logs messages to the console with a prefix.
 */
export default {
  /**
   * Logs an informational message to the console with the message prefix.
   * @param {string} message The message to log.
   * @param {...any[]} optionalParams Optional parameters to include in the log message.
   */
  info: (message: string, ...optionalParams: any[]) => console.log(prefix, '\x1b[32m', message, ...optionalParams),

  /**
   * Logs a warning message to the console with the message prefix.
   * @param {string} message The message to log.
   * @param {...any[]} optionalParams Optional parameters to include in the log message.
   */
  warn: (message: string, ...optionalParams: any[]) => console.warn(prefix, '\x1b[33m', message, ...optionalParams),

  /**
   * Logs an error message to the console with the message prefix.
   * @param {string} message The message to log.
   * @param {...any[]} optionalParams Optional parameters to include in the log message.
   */
  error: (message: string, ...optionalParams: any[]) => console.error(prefix, '\x1b[31m', message, ...optionalParams),
};
