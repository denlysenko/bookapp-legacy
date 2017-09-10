import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LoginService } from '../services/login.service';
import * as fromLogin from '../actions/login';
import * as fromAuth from '../../auth/actions/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  @Effect()
  login$ = this.actions$
    .ofType(fromLogin.LOGIN)
    .map((action: fromLogin.Login) => action.payload)
    .switchMap(creds => {
      return this.loginService.login(creds)
        .map(token => new fromLogin.LoginSuccess(token))
        .catch(err => Observable.of(new fromLogin.LoginFailure(err)));
    });

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromLogin.LOGIN_SUCCESS)
    .map((action: fromLogin.LoginSuccess) => action.payload)
    .map(token => {
      localStorage.setItem('access_token', token);
      this.router.navigate(['']);
      return new fromAuth.LoadLoggedUser();
    });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}
}
