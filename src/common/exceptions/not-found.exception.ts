import { AppError } from "./app.error";

/**
 * Thrown when a requested resource does not exist.
 * Loaders should throw this when `findById()` returns null.
 * Results in a 404 HTTP response.
 */
export class NotFoundException extends AppError {
  constructor(resource = "Resource", id?: string) {
    super(
      404,
      id ? `${resource} with id "${id}" not found.` : `${resource} not found.`,
    );
  }
}
