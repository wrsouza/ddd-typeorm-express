/**
 * Base class for all application-level HTTP errors.
 * Extend this class to create domain-specific exceptions.
 * Services and repositories may throw these; loaders/actions catch and convert them.
 */
export abstract class AppError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    // Maintain proper prototype chain in transpiled environments
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
