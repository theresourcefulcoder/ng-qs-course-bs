import { ErrorHandler, Injector, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from '../services/alert.service';
import { HttpError } from './http.error';

/**
 * Custom error handler to catch and handle errors in one place
 */
@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler extends ErrorHandler {
  /**
   * Constructor which inject Injector
   */
  constructor(private injector: Injector) {
    super();
  }

  /**
   * Override of the super class function to apply
   * custom handling of error messages
   *
   * @param error the error to process
   */
  handleError(error: any): void {
    const alertService = this.injector.get(AlertService);
    const ngZone = this.injector.get(NgZone);
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      errorMessage = new HttpError(error).toString();
    } else {
      // Could replace the console.log with a call to a logger service
      console.log(errorMessage);
      errorMessage = 'An error occurred processing the request.';
    }

    /* Since the custom error handler runs outside of the Angular zone,
       ensure that the alertService call runs inside the zone to ensure
       the template gets updated correctly. */
    ngZone.run(() => alertService.error(errorMessage, false));
  }
}
