import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { handleError } from '../../helpers/errorHandler';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestorePasswordService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  requestReset(body: { email: string }): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/users/forgot`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }

  resetPassword(token: string, password: string): Observable<any> {
    const body = {
      password: password
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/users/reset/${token}`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }
}
