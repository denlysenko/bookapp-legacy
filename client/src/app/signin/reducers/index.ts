import * as fromRoot from '../../reducers';
import * as fromLogin from './login';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface LoginState {
  login: fromLogin.State;
}

export interface State extends fromRoot.State {
  login: LoginState;
}

export const reducers = {
  login: fromLogin.reducer
};

export const selectLoginPageState = createFeatureSelector<LoginState>('login');

export const selectLoginState = createSelector(
  selectLoginPageState,
  (state: LoginState) => state.login
);

export const selectSubmitting = createSelector(
  selectLoginState,
  fromLogin.getSubmitting
);

export const selectError = createSelector(
  selectLoginState,
  fromLogin.getError
);
