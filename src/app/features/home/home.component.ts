import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Announcement } from './announcement.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

/**
 * Home component which is only ever routed to so
 * the selector has been removed
 */
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  announcements: Announcement[];
  showAuthorizedUseMessage = true;
  isAuthenticatedSub: Subscription;

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
          this.showAuthorizedUseMessage = data ? false : true;
        }
      );

    if (this.authenticationService.isAuthenticated()) {
      this.http.read(environment.serverApiPath + 'announcements')
        .subscribe(
          data => {
            this.announcements = data;
          }
        );
    }
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }
}
