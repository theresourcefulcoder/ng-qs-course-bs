import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

/**
 * Guard which ensures that users are logged in before
 * activating the route. Will display an alert message
 * and route to the login page if not currently logged in
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
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

    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.alertService.warning('You must be logged in to access this resource.', true);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

      return false;
    }
  }
}
