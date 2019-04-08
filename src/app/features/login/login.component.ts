import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

/**
 * Component that handles authentication
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Locally scoped variables
   */
  returnUrl = '/';
  user: User = new User();

  /**
   * Constructor
   */
  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * Function to log the user in and navigate if successful
   */
  login() {
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
        data => {
          if (data) {
            this.router.navigate([this.returnUrl]);
          }
        }
      );
  }
}
