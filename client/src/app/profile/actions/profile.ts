import { Action } from '@ngrx/store';
import { User } from '../../auth/models/User';

export const SAVE_PROFILE = '[Profile] Save';
export const SAVE_PROFILE_SUCCESS = '[Profile] Save Profile Success';
export const SAVE_PROFILE_FAILURE = '[Profile] Save Profile Failure';

export interface SaveProfilePayload {
  id: string;
  user: User;
  avatar?: File;
}

export class SaveProfile implements Action {
  readonly type = SAVE_PROFILE;

  constructor(public payload: SaveProfilePayload) { }
}

export class SaveProfileSuccess implements Action {
  readonly type = SAVE_PROFILE_SUCCESS;

  constructor(public payload: User) { }
}

export class SaveProfileFailure implements Action {
  readonly type = SAVE_PROFILE_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  SaveProfile |
  SaveProfileSuccess |
  SaveProfileFailure;
