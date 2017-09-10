import { Action } from '@ngrx/store';
import { Credentials } from '../../auth/models/Credentials';

export const LOGIN = '[LoginPage] Login';
export const LOGIN_SUCCESS = '[LoginPage] Login Success';
export const LOGIN_FAILURE = '[LoginPage] Login Failure';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Credentials) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: string) { }
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  Login |
  LoginSuccess |
  LoginFailure;
