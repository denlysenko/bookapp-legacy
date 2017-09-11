import { Action } from '@ngrx/store';
import { User } from '../../auth/models/User';

export const SAVE_PROFILE = '[Profile] Save';
export const SAVE_AVATAR = '[Profile] Save Avatar';
export const SAVE_PROFILE_SUCCESS = '[Profile] Save Profile Success';
export const SAVE_PROFILE_FAILURE = '[Profile] Save Profile Failure';
export const SAVE_AVATAR_SUCCESS = '[Profile] Save Avatar Success';
export const SAVE_AVATAR_FAILURE = '[Profile] Save Avatar Failure';

export class SaveProfile implements Action {
  readonly type = SAVE_PROFILE;

  constructor(public payload: User) { }
}

export class SaveAvatar implements Action {
  readonly type = SAVE_AVATAR;

  constructor(public payload: File) { }
}

export class SaveProfileSuccess implements Action {
  readonly type = SAVE_PROFILE_SUCCESS;
}

export class SaveProfileFailure implements Action {
  readonly type = SAVE_PROFILE_FAILURE;

  constructor(public payload: string) { }
}

export class SaveAvatarSuccess implements Action {
  readonly type = SAVE_AVATAR_SUCCESS;
}

export class SaveAvatarFailure implements Action {
  readonly type = SAVE_AVATAR_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  SaveProfile |
  SaveProfileSuccess |
  SaveProfileFailure |
  SaveAvatar |
  SaveAvatarSuccess |
  SaveAvatarFailure;
