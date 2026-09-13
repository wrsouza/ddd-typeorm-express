import { AppError } from "./app.error";

/**
 * Thrown when a write operation violates a uniqueness constraint.
 * Example: creating a user with an email that already exists.
 * Results in a 409 HTTP response.
 */
export class ConflictException extends AppError {
  constructor(resource = "Resource", field?: string) {
    super(
      409,
      field
        ? `${resource} with this ${field} already exists.`
        : `${resource} already exists.`,
    );
  }
}
