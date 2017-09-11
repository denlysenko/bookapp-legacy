import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as Profile from '../actions/profile';
import * as Auth from '../../auth/actions/auth';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProfileEffects {
  @Effect() saveProfile$ = this.actions$
    .ofType(Profile.SAVE_PROFILE)
    .map((action: Profile.SaveProfile) => action.payload)
    .switchMap(payload => {
      return this.profileService.saveProfile(payload.id, payload.user, payload.avatar)
        .map(user => new Profile.SaveProfileSuccess(user))
        .catch(err => Observable.of(new Profile.SaveProfileFailure(err)));
    });

  @Effect() saveProfileSuccess$ = this.actions$
    .ofType(Profile.SAVE_PROFILE_SUCCESS)
    .map((action: Profile.SaveProfileSuccess) => action.payload)
    .map(user => {
      localStorage.setItem('current_profile', JSON.stringify(user));
      return new Auth.LoadLoggedUserSuccess(user);
    });

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) { }
}
