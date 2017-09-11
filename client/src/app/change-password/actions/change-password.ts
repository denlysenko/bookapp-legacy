import { Action } from '@ngrx/store';
import { ChangePasswordFormValue } from '../models/ChangePasswordFormValue';

export const CHANGE_PASSWORD = '[Change Password]';
export const CHANGE_PASSWORD_SUCCESS = '[Change Password] Success';
export const CHANGE_PASSWORD_FAILURE = '[Change Password] Failure';

export class ChangePassword implements Action {
  readonly type = CHANGE_PASSWORD;

  constructor(public payload: ChangePasswordFormValue) { }
}

export class ChangePasswordSuccess implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;
}

export class ChangePasswordFailure implements Action {
  readonly type = CHANGE_PASSWORD_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  ChangePassword |
  ChangePasswordSuccess |
  ChangePasswordFailure;
