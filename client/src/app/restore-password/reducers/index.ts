import * as fromForgotPassword from './forgot-password';
import * as fromResetPassword from './reset-password';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RestorePasswordState {
  forgotPassword: fromForgotPassword.State;
  resetPassword: fromResetPassword.State;
}

export interface State extends fromRoot.State {
  restorePassword: RestorePasswordState;
}

export const reducers = {
  forgotPassword: fromForgotPassword.reducer,
  resetPassword: fromResetPassword.reducer
};

export const restorePasswordPageSelector = createFeatureSelector<RestorePasswordState>('restorePassword');

export const selectResetPasswordState = createSelector(
  restorePasswordPageSelector,
  (state: RestorePasswordState) => state.resetPassword
);

export const selectForgotPasswordState = createSelector(
  restorePasswordPageSelector,
  (state: RestorePasswordState) => state.forgotPassword
);

export const getForgotSubmitting = createSelector(
  selectForgotPasswordState,
  fromForgotPassword.getSubmitting
);

export const getForgotError = createSelector(
  selectForgotPasswordState,
  fromForgotPassword.getError
);

export const getResetSubmitting = createSelector(
  selectResetPasswordState,
  fromResetPassword.getSubmitting
);

export const getResetError = createSelector(
  selectResetPasswordState,
  fromResetPassword.getError
);
