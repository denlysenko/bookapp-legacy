import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers/auth';
import * as Auth from '../actions/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private store: Store<fromAuth.State>
  ) {
    const token = localStorage.getItem('access_token');
    const profile = localStorage.getItem('current_profile');

    if (token && !jwtHelper.isTokenExpired(token)) {
      if (profile) {
        setTimeout(() => {
          this.store.dispatch(new Auth.LoadLoggedUserSuccess(JSON.parse(profile)));
        });
      } else {
        setTimeout(() => {
          this.store.dispatch(new Auth.LoadLoggedUser());
        });
      }
    }
  }

  getLoggedUser(): Observable<User> {
    return this.http.get(`${this.config.baseUrl}/api/users/me`)
      .catch(err => Observable.throw(err));
  }
}
