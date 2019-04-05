import { Component, OnInit, OnDestroy } from '@angular/core';

import { faHome, faUser, faSignInAlt, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subscription } from 'rxjs';

/**
 * Core header component
 *
 * @example
 * <app-header></app-header>
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  navbarCollapsed = true;
  isAuthenticatedSub: Subscription;
  isAuthenticated = false;
  usernameSub: Subscription;
  username = '';

  /**
   * Font Awesome Icon variables
   */
  faHome: IconDefinition = faHome;
  faUser: IconDefinition = faUser;
  faSignInAlt: IconDefinition = faSignInAlt;
  faSignOutAlt: IconDefinition = faSignOutAlt;

  /**
   * Constructor
   */
  constructor(private authenticationService: AuthenticationService) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit() {
    this.isAuthenticatedSub = this.authenticationService.isAuthenticatedSubject
      .subscribe(
        data => {
          this.isAuthenticated = data;
        }
      );

    this.usernameSub = this.authenticationService.usernameSubject
      .subscribe(
        data => {
          this.username = data;
        }
      );
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
    this.usernameSub.unsubscribe();
  }

  /**
   * Function to log out the user.
   */
  logout(): void {
    this.authenticationService.logout();
  }
}
