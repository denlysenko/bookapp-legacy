import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { RestorePasswordService } from '../services/restore-password.service';
import * as RestorePassword from '../actions/restore-password';
import * as Auth from '../../auth/actions/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class RestorePasswordEffects {
  @Effect()
  forgotPassword$ = this.actions$
    .ofType(RestorePassword.FORGOT_PASSWORD)
    .map((action: RestorePassword.ForgotPassword) => action.payload)
    .switchMap(payload => {
      return this.restorePasswordService.requestReset({ email: payload })
        .map(token => new RestorePassword.ForgotPasswordSuccess(token))
        .catch(err => Observable.of(new RestorePassword.ForgotPasswordFailure(err)));
    });

  @Effect({ dispatch: false })
  forgotPasswordSuccess$ = this.actions$
    .ofType(RestorePassword.FORGOT_PASSWORD_SUCCESS)
    .map((action: RestorePassword.ForgotPasswordSuccess) => action.payload)
    .map(token => this.router.navigate(['reset', token]));

  @Effect()
  resetPassword$ = this.actions$
    .ofType(RestorePassword.RESET_PASSWORD)
    .map((action: RestorePassword.ResetPassword) => action.payload)
    .switchMap(payload => {
      const { token, newPassword } = payload;

      return this.restorePasswordService.resetPassword(token, newPassword)
        .map(token => new RestorePassword.ResetPasswordSuccess(token))
        .catch(err => Observable.of(new RestorePassword.ResetPasswordFailure(err)));
    });

  @Effect()
  resetPasswordSuccess$ = this.actions$
    .ofType(RestorePassword.RESET_PASSWORD_SUCCESS)
    .map((action: RestorePassword.ResetPasswordSuccess) => action.payload)
    .map(payload => {
      localStorage.setItem('access_token', payload);
      new Auth.LoadLoggedUser();
      this.router.navigate([''])
    });

  constructor(
    private actions$: Actions,
    private restorePasswordService: RestorePasswordService,
    private router: Router
  ) { }
}
