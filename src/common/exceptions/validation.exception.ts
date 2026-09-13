import { AppError } from "./app.error";

/**
 * Thrown when Zod (or service-level) validation fails in a context where
 * an exception is preferred over returning a ServiceResult.
 * Carries the full field-level errors map.
 * Results in a 422 HTTP response.
 */
export class ValidationException extends AppError {
  readonly errors: Record<string, string>;

  constructor(errors: Record<string, string>, message = "Validation failed.") {
    super(422, message);
    this.errors = errors;
  }
}
