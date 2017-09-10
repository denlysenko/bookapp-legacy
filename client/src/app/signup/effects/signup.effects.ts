import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SignupService } from '../services/signup.service';
import * as fromSignup from '../actions/signup';
import * as fromAuth from '../../auth/actions/auth';
import { User } from '../../auth/models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class SignupEffects {
  @Effect()
  signup$ = this.actions$
    .ofType(fromSignup.SIGNUP)
    .map((action: fromSignup.Signup) => action.payload)
    .switchMap((user: User) => {
      return this.signupService.signup(user)
        .map(token => new fromSignup.SignupSuccess(token))
        .catch(err => Observable.of(new fromSignup.SignupFailure(err)));
    });

  @Effect()
  signupSuccess$ = this.actions$
    .ofType(fromSignup.SIGNUP_SUCCESS)
    .map((action: fromSignup.SignupSuccess) => action.payload)
    .map(token => {
      localStorage.setItem('access_token', token);
      this.router.navigate(['']);
      return new fromAuth.LoadLoggedUser();
    });

  constructor(
    private actions$: Actions,
    private signupService: SignupService,
    private router: Router
  ) { }
}
