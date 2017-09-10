import { Action } from '@ngrx/store';
import { User } from '../../auth/models/User';

export const SIGNUP = '[SignupPage] Signup';
export const SIGNUP_SUCCESS = '[SignupPage] Signup Success';
export const SIGNUP_FAILURE = '[SignupPage] Signup Failure';

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: User) { }
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(public payload: string) { }
}

export class SignupFailure implements Action {
  readonly type = SIGNUP_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  Signup |
  SignupSuccess |
  SignupFailure;
