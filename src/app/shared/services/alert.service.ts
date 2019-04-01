import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject, Observable, Subscription } from 'rxjs';

import { Alert } from '../../core/alert/alert.model';
import { AlertType } from 'src/app/core/alert/alert-type.enum';

/**
 * Alert service which exposes several functions for managing alerts
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnDestroy {
  /**
   * Locally scoped variables
   */
  routerSub: Subscription;
  subject = new Subject<Alert>();
  keepAfterRouteChange = false;

  /**
   * Constructor which injects Router and subscribes to router NavigationStart events
   */
  constructor(private router: Router) {
    // Clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    if (this.router.events) {
      this.routerSub = this.router.events.subscribe(event => {
        // Only process NavigationStart events
        if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            // Only allows messages to be kept for a single route change
            this.keepAfterRouteChange = false;
          } else {
            // Clear all alert messages
            this.clear();
          }
        }
      });
    }
  }

  /**
   * OnDestroy LifeCycle hook
   */
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  /**
   * Function that creates an alert and pushes it onto the observable stream
   *
   * @param type - alert type of the message
   * @param message - message to display to the user
   * @param keepAfterRouteChange - whether to keep the message after a route change
   */
  private createAlert(type: AlertType, message: string, keepAfterRouteChange: boolean): void {
    // Sets whether to display the alert after navigating to a new route
    this.keepAfterRouteChange = keepAfterRouteChange;

    // Pushes the message onto the observable stream
    this.subject.next({ type, message } as Alert);
  }

  /**
   * Function that returns observable alerts
   */
  alerts(): Observable<Alert> {
    return this.subject.asObservable();
  }

  /**
   * Function that clears all alerts
   */
  clear(): void {
    this.subject.next();
  }

  /**
   * Function to create a success alert
   *
   * @param message - message to display to the user
   * @param keepAfterRouteChange - whether to keep the message after a route change
   */
  success(message: string, keepAfterRouteChange: boolean): void {
    this.createAlert(AlertType.success, message, keepAfterRouteChange);
  }

  /**
   * Function to create a info alert
   *
   * @param message - message to display to the user
   * @param keepAfterRouteChange - whether to keep the message after a route change
   */
  info(message: string, keepAfterRouteChange: boolean): void {
    this.createAlert(AlertType.info, message, keepAfterRouteChange);
  }

  /**
   * Function to create a warning alert
   *
   * @param message - message to display to the user
   * @param keepAfterRouteChange - whether to keep the message after a route change
   */
  warning(message: string, keepAfterRouteChange: boolean): void {
    this.createAlert(AlertType.warning, message, keepAfterRouteChange);
  }

  /**
   * Function to create a error alert
   *
   * @param message - message to display to the user
   * @param keepAfterRouteChange - whether to keep the message after a route change
   */
  error(message: string, keepAfterRouteChange: boolean): void {
    this.createAlert(AlertType.danger, message, keepAfterRouteChange);
  }
}
