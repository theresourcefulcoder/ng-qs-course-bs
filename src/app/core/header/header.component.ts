import { Component, OnInit, OnDestroy } from '@angular/core';

import { faHome, faUser, faSignInAlt, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavbarMenu } from './models/navbar-menu.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

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
  menus$: Observable<NavbarMenu[]>;
  adminMenus$: Observable<NavbarMenu[]>;

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
  constructor(private authenticationService: AuthenticationService,
              private http: HttpService) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit() {
    this.isAuthenticatedSub = this.authenticationService.isAuthenticatedSubject
      .subscribe(
        data => {
          this.isAuthenticated = data;
          this.menus$ = this.http.read(environment.serverApiPath + 'menus');
          this.adminMenus$ = this.http.read(environment.serverApiPath + 'adminMenus');
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

  /**
   * Function to determine if the user has the admin role
   */
  hasAdminRole(): boolean {
    return this.authenticationService.hasAdminRole();
  }
}
