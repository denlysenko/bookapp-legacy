import * as fromAuth from './auth';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  status: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers = {
  status: fromAuth.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);
