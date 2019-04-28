import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

/**
 * Global service for making http calls
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * Constructor which injects services
   */
  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) { }

  /**
   * Function for standard http post calls
   *
   * @param endpoint - endpoint to call
   * @param payload - payload to pass
   */
  create(endpoint: string, payload: any): Observable<any> {
    const token = this.authenticationService.getAccessToken();
    const body = JSON.stringify(payload);
    const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')
                                                   .set('Authorization', 'Bearer ' + token)};

    return this.http.post(endpoint, body, httpOptions);
  }

  /**
   * Function for standard http get calls
   *
   * @param endpoint - endpoint to call
   * @param queryParams - optional query params to pass
   */
  read(endpoint: string, queryParams?: string): Observable<any> {
    const token = this.authenticationService.getAccessToken();
    const httpOptions = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)};
    const fullEndpointPath = queryParams ? endpoint + encodeURI(queryParams) : endpoint;

    return this.http.get(fullEndpointPath, httpOptions);
  }

  /**
   * Function for standard http post calls
   *
   * @param endpoint - endpoint to call
   * @param payload - payload to pass
   */
  update(endpoint: string, id: number, payload: any): Observable<any> {
    const token = this.authenticationService.getAccessToken();
    const body = JSON.stringify(payload);
    const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')
                                                   .set('Authorization', 'Bearer ' + token)};

    return this.http.put(`${endpoint}/${id}`, body, httpOptions);
  }

  /**
   * Function for standard http delete calls
   *
   * @param endpoint - endpoint to call
   * @param id - id of record to delete
   */
  delete(endpoint: string, id: number): Observable<any> {
    const token = this.authenticationService.getAccessToken();
    const httpOptions = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)};

    return this.http.delete(`${endpoint}/${id}`, httpOptions);
  }
}
