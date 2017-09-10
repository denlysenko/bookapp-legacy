import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../auth/models/Credentials';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { LoginResponse } from '../models/LoginResponse';
import * as errorHandler from '../../helpers/errorHandler';

@Injectable()
export class LoginService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }

  login(creds: Credentials): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<LoginResponse>(`${this.config.baseUrl}/auth/local`, creds, { headers })
      .map(res => res.token)
      .catch(err => Observable.throw(errorHandler.handleError(err.error)));
  }
}
