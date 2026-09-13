import { AppError } from "./app.error";

/**
 * Thrown when a requested resource does not exist.
 * Loaders should throw this when `findById()` returns null.
 * Results in a 404 HTTP response.
 */
export class NotFoundException extends AppError {
  constructor(message = "Not Found.") {
    super(404, message);
  }
}
