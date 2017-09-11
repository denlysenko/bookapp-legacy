import * as fromRoot from '../../reducers';
import * as fromChangePassword from './change-password';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ChangePasswordState {
  changePassword: fromChangePassword.State;
}

export interface State extends fromRoot.State {
  changePassword: ChangePasswordState;
}

export const reducers = {
  changePassword: fromChangePassword.reducer
};

export const changePasswordPageStateSelector = createFeatureSelector<ChangePasswordState>('changePassword');

export const selectChangePasswordState = createSelector(
  changePasswordPageStateSelector,
  (state: ChangePasswordState) => state.changePassword
);

export const selectSubmitting = createSelector(
  selectChangePasswordState,
  fromChangePassword.getSubmitting
);

export const selectSuccess = createSelector(
  selectChangePasswordState,
  fromChangePassword.getSuccess
);

export const selectError = createSelector(
  selectChangePasswordState,
  fromChangePassword.getError
);
