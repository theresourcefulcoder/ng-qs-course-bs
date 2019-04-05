import { HttpErrorResponse } from '@angular/common/http';

/**
 * Class that handles http error messages.
 */
export class HttpError {

  /**
   * Constructor
   *
   * @param error - The error to process
   */
  constructor(private error: HttpErrorResponse) { }

  /**
   * Function to return the error as a string
   *
   * @returns Error message
   */
  toString(): string {
    switch (this.error.status) {
      case 0:
        return 'An error occurred communicating with the server. If this persists, please contact Agora support.';
      case 401:
        if (window.location.href.indexOf('login') !== -1) {
          return 'The user credentials supplied could not be validated.';
        } else {
          return 'This user account is not currently signed in or the session has expired.';
        }
      case 403:
        return 'You are not authorized to view this content.';
      case 404:
        return 'The resource was not found on the server.';
      case 500:
        return 'A server error occurred. If this persists, please contact Agora support.';
      default:
        return 'An error occurred communicating with the server. If this persists, please contact Agora support.';
    }
  }
}
