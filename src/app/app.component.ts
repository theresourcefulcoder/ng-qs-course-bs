import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AlertService } from './shared/services/alert.service';
import { AuthenticationService } from './shared/services/authentication.service';

/**
 * Root application component
 *
 * @example
 * <app-root></app-root>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * Locally scoped variables
   */
  minutesUntilAutoLogout = environment.timeout; // in mins
  timeoutCheckInterval = environment.timeoutCheckInterval; // in ms
  lastAction = Date.now(); // in ms
  userNotified = false;

  /**
   * Function that listens for DOM click events. Used to
   * determine whether to reset the timeout counter.
   */
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.reset();
  }

  /**
   * Function that listens for DOM keydown events. Used to determine
   * whether to reset the timeout counter.
   */
  @HostListener('document:keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    this.reset();
  }

  /**
   * Constructor
   */
  constructor(private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit() {
    this.initializeInterval();
  }

  /**
   * Function to reset the timeout counter
   */
  private reset(): void {
    this.lastAction = Date.now();

    /* If the user has already been notified, then clear
       the alerts and toggle the userNotified variable */
    if (this.userNotified) {
      this.alertService.clear();
      this.userNotified = false;
    }
  }

  /**
   * Function to check whether the user has timed out.
   */
  private check(): void {
    const now = Date.now();
    const timeLeft = this.lastAction + this.minutesUntilAutoLogout * 60 * 1000;
    const diff = timeLeft - now;
    const isTimedOut = diff < 0;

    // If logged in and less than 1 minute until timeout, then show a warning message
    if (diff <= 60000 && this.authenticationService.isAuthenticated()) {
      if (!this.userNotified) {
        this.alertService.warning(
          'This user will be logged out in 1 minute due to inactivity. Interact with the screen or close this message to extend.',
          false
        );
        this.userNotified = true;
      }
    }

    // If logged in and timed out, then logout, clear any alerts, and navigate to the home page
    if (isTimedOut && this.authenticationService.isAuthenticated()) {
      this.authenticationService.logout();
      this.alertService.clear();
      this.router.navigate(['/home']);
    }
  }

  /**
   * Function to initialize the timer interval
   */
  private initializeInterval(): void {
    setInterval(() => {
      this.check();
    }, this.timeoutCheckInterval);
  }
}
