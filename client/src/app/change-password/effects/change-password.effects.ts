import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ChangePasswordService } from '../services/change-password.service';
import * as ChangePassword from '../actions/change-password';
import { ChangePasswordFormValue } from '../models/ChangePasswordFormValue';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ChangePasswordEffects {
  @Effect()
  changePassword$ = this.actions$
    .ofType(ChangePassword.CHANGE_PASSWORD)
    .map((action: ChangePassword.ChangePassword) => action.payload)
    .switchMap((payload: ChangePasswordFormValue) => {
      const { id, newPassword, oldPassword } = payload;
      return this.changePasswordService.changePassword(id, newPassword, oldPassword)
        .map(() => new ChangePassword.ChangePasswordSuccess())
        .catch(err => Observable.of(new ChangePassword.ChangePasswordFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private changePasswordService: ChangePasswordService
  ) { }
}
