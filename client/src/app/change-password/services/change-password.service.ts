import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { Observable } from 'rxjs/Observable';
import { handleError } from '../../helpers/errorHandler';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChangePasswordService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  changePassword(userId: string, newPassword: string, oldPassword: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = {
      newPassword: newPassword,
      oldPassword: oldPassword
    };

    return this.http.put(`${this.config.baseUrl}/api/users/${userId}/password`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }
}
