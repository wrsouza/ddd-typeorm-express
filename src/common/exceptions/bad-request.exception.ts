import { AppError } from "./app.error";

/**
 * Thrown when incoming request data is structurally invalid before domain validation.
 * For field-level validation errors, prefer returning ServiceResult with errors instead.
 * Results in a 400 HTTP response.
 */
export class BadRequestException extends AppError {
  constructor(message = "Bad request.") {
    super(400, message);
  }
}
