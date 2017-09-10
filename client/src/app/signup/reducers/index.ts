import * as fromRoot from '../../reducers';
import * as fromSignup from './signup';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SignupState {
  signup: fromSignup.State;
}

export interface State extends fromRoot.State {
  signup: SignupState;
}

export const reducers = {
  signup: fromSignup.reducer
};

export const selectSignupPageState = createFeatureSelector<SignupState>('signup');

export const selectSignupState = createSelector(
  selectSignupPageState,
  (state: SignupState) => state.signup
);

export const selectSubmitting = createSelector(
  selectSignupState,
  fromSignup.getSubmitting
);

export const selectError = createSelector(
  selectSignupState,
  fromSignup.getError
);
