import { Action } from '@ngrx/store';
import { ResetPasswordFormValue } from '../models/ResetPasswordFormValue';

export const FORGOT_PASSWORD = '[Restore Password] Forgot Password';
export const FORGOT_PASSWORD_SUCCESS = '[Restore Password] Forgot Password Success';
export const FORGOT_PASSWORD_FAILURE = '[Restore Password] Forgot Password Failure';
export const RESET_PASSWORD = '[Restore Password] Reset Password';
export const RESET_PASSWORD_SUCCESS = '[Restore Password] Reset Password Success';
export const RESET_PASSWORD_FAILURE = '[Restore Password] Reset Password Failure';

export class ForgotPassword implements Action {
  readonly type = FORGOT_PASSWORD;

  constructor(public payload: string) { }
}

export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;

  constructor(public payload: string) { }
}

export class ForgotPasswordFailure implements Action {
  readonly type = FORGOT_PASSWORD_FAILURE;

  constructor(public payload: string) { }
}

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;

  constructor(public payload: ResetPasswordFormValue) { }
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;

  constructor(public payload: string) { }
}

export class ResetPasswordFailure implements Action {
  readonly type = RESET_PASSWORD_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  ForgotPassword |
  ForgotPasswordSuccess |
  ForgotPasswordFailure |
  ResetPassword |
  ResetPasswordSuccess |
  ResetPasswordFailure;
