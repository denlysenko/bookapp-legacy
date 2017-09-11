import * as fromRoot from '../../reducers';
import * as fromProfile from './profile';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProfileState {
  profile: fromProfile.State;
}

export interface State extends fromRoot.State {
  profile: ProfileState;
}

export const reducers = {
  profile: fromProfile.reducer
};

export const selectProfilePageState = createFeatureSelector<ProfileState>('profile');

export const selectProfileState = createSelector(
  selectProfilePageState,
  (state: ProfileState) => state.profile
);

export const selectSubmitting = createSelector(
  selectProfileState,
  fromProfile.getSubmitting
);

export const selectError = createSelector(
  selectProfileState,
  fromProfile.getError
);

export const selectSuccess = createSelector(
  selectProfileState,
  fromProfile.getSuccess
);
