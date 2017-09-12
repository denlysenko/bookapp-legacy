import * as fromForgotPassword from './forgot-password';
import * as fromResetPassword from './reset-password';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ForgotPasswordState {
  forgotPassword: fromForgotPassword.State;
}

export interface ResetPasswordState {
  resetPassword: fromResetPassword.State;
}

export interface State extends fromRoot.State {
  forgotPassword: ForgotPasswordState;
  resetPassword: ResetPasswordState;
}

export const reducers = {
  forgotPassword: fromForgotPassword.reducer,
  resetPassword: fromResetPassword.reducer
};

export const ResetPasswordPageSelector = createFeatureSelector<ResetPasswordState>('resetPassword');
export const ForgotPasswordPageSelector = createFeatureSelector<ForgotPasswordState>('forgotPassword');

export const selectResetPasswordState = createSelector(
  ResetPasswordPageSelector,
  (state: ResetPasswordState) => state.resetPassword
);

export const selectForgotPasswordState = createSelector(
  ForgotPasswordPageSelector,
  (state: ForgotPasswordState) => state.forgotPassword
);

export const getForgotSubmitting = createSelector(
  selectForgotPasswordState,
  fromForgotPassword.getSubmitting
);

export const getForgotSuccess = createSelector(
  selectForgotPasswordState,
  fromForgotPassword.getSuccess
);

export const getForgotError = createSelector(
  selectForgotPasswordState,
  fromForgotPassword.getError
);

export const getResetSubmitting = createSelector(
  selectResetPasswordState,
  fromResetPassword.getSubmitting
);

export const getResetSuccess = createSelector(
  selectResetPasswordState,
  fromResetPassword.getSuccess
);

export const getResetError = createSelector(
  selectResetPasswordState,
  fromResetPassword.getError
);
