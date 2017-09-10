import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { User } from '../../auth/models/User';
import { Observable } from 'rxjs/Observable';
import { SignupResponse } from '../models/SignupResponse';
import 'rxjs/add/observable/throw';
import * as errorHandler from '../../helpers/errorHandler';

@Injectable()
export class SignupService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  signup(user: User): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<SignupResponse>(`${this.config.baseUrl}/api/users`, user, { headers })
      .map(res => res.token)
      .catch(err => Observable.throw(errorHandler.handleError(err.error)));
  }
}
