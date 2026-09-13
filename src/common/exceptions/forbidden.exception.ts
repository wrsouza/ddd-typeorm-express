import { AppError } from "./app.error";

/**
 * Thrown when the authenticated user does not have permission to access a resource.
 * Use this for authorization (access control) failures — distinct from authentication.
 * Results in a 403 HTTP response.
 */
export class ForbiddenException extends AppError {
  constructor(message = "Access denied.") {
    super(403, message);
  }
}
