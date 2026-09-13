import { AppError } from "./app.error";

/**
 * Thrown for unexpected server-side failures that are not domain errors.
 * Prefer specific exceptions (NotFoundException, etc.) when the cause is known.
 * Results in a 500 HTTP response.
 */
export class InternalServerErrorException extends AppError {
  constructor(
    message = "An unexpected error occurred. Please try again later.",
  ) {
    super(500, message);
  }
}
