import { Action } from '@ngrx/store';
import { User } from '../models/User';

export const LOAD_LOGGED_USER = '[Auth] Load Logged User';
export const LOAD_LOGGED_USER_SUCCESS = '[Auth] Load Logged User Success';
export const LOAD_LOGGED_USER_FAILURE = '[Auth] Load Logged User Failure';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';

export class LoadLoggedUser implements Action {
  readonly type = LOAD_LOGGED_USER;
}

export class LoadLoggedUserSuccess implements Action {
  readonly type = LOAD_LOGGED_USER_SUCCESS;

  constructor(public payload: User) { }
}

export class LoadLoggedUserFailure implements Action {
  readonly type = LOAD_LOGGED_USER_FAILURE;

  constructor(public payload: string) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
}

export type Actions =
  LoadLoggedUser |
  LoadLoggedUserSuccess |
  LoadLoggedUserFailure |
  Logout |
  LogoutSuccess;

