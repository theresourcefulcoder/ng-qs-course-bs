import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Login } from 'src/app/features/login/login.model';

/**
 * Global authentication service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /**
   * Locally scoped variables
   */
  private loginEndpoint = 'http://localhost:8000/auth/login';
  private authenticated = false;
  private accessToken: string;
  private user: User;
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  usernameSubject = new BehaviorSubject<string>('');

  /**
   * Constructor which injects HttpClient
   */
  constructor(private http: HttpClient,
              private router: Router) { }

  /**
   * Function to log in the user
   *
   * @param username - The username
   * @param password - The password
   *
   * @returns http response
   */
  login(username: string, password: string): Observable<any> {
    const body = '{"username":"' + username + '","password":"' + password + '"}';
    const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    return this.http.post(this.loginEndpoint, body, httpOptions)
      .pipe(
        map((data: Login) => {
          if (data) {
            this.authenticated = data.authenticated;
            this.accessToken = data.accessToken;
            this.user = data.user;
            this.isAuthenticatedSubject.next(this.authenticated);
            this.usernameSubject.next(this.user.firstName + ' ' + this.user.lastName);

            return true;
          }

          return false;
        }),
        catchError(error => {
          this.authenticated = false;
          this.accessToken = undefined;
          this.user = undefined;
          this.isAuthenticatedSubject.next(this.authenticated);
          this.usernameSubject.next('');

          throw error;
        })
      );
  }

  /**
   * Function to log out the user
   */
  logout(): void {
    this.authenticated = false;
    this.accessToken = undefined;
    this.user = undefined;
    this.isAuthenticatedSubject.next(this.authenticated);
    this.usernameSubject.next('');

    this.router.navigate(['/home']);
  }

  /**
   * Function which determines if the current
   *  user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * Function to return the cached User object
   */
  getUser(): User {
    return this.user;
  }

  /**
   * Function to return the cached access token
   */
  getAccessToken(): string {
    return this.accessToken;
  }
}
