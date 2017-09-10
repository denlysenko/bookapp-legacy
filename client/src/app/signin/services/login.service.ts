import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../auth/models/Credentials';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }

  login(creds: Credentials): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/auth/local`, creds, { headers })
      .map(res => res['token'])
      .catch(err => Observable.throw(err.error.message));
  }
}
