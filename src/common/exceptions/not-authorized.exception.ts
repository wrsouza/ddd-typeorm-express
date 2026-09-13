import { AppError } from "./app.error";

/**
 * Thrown when the request lacks valid authentication.
 * Use this when a user is not logged in or their session expired.
 * Results in a 401 HTTP response.
 */
export class NotAuthorizedException extends AppError {
  constructor(message = "Authentication required.") {
    super(401, message);
  }
}
