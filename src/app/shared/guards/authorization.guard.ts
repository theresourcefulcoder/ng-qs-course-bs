import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

/**
 * Guard which validates a user's roles against a resources
 * required roles list before activating the route. Will
 * display an alert message and route to the home page if the
 * appropriate role is not present.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  /**
   * Constructor which injects services
   */
  constructor(private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  /**
   * Function to determine if the route can be activated
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
              Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Only check authorizations if they are logged in
    if (this.authenticationService.isAuthenticated()) {
      const userRoles = this.authenticationService.getUser().roles;
      const rolesRequired = next.data.roles;
      const hasRole: boolean = rolesRequired.some(role => userRoles.includes(role));

      if (hasRole) {
        return true;
      } else {
        this.alertService.warning('You do not have the required permissions to access this resource.', true);

        if (window.location.href.indexOf('login?returnUrl') !== -1) {
          // If the user was trying to access a deep link when not logged in,
          // navigate them to the home page if they do not have permission to
          // access the deep link screen. This is to prevent confusion when they
          // are brought to the login screen first.
          this.router.navigate(['/home']);
        }

        return false;
      }
    }

    /* If they are not logged in, let it fall through as it needs
       to be handled by the Authentication guard first. This prevents
       double logging. */
    return false;
  }
}
