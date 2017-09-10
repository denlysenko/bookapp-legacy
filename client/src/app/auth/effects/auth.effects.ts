import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as Auth from '../actions/auth';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  loadLoggedUser$ = this.actions$
    .ofType(Auth.LOAD_LOGGED_USER)
    .switchMap(() => {
      return this.authService.getLoggedUser()
        .map(user => {
          localStorage.setItem('current_profile', JSON.stringify(user));
          return new Auth.LoadLoggedUserSuccess(user);
        })
        .catch(err => Observable.of(new Auth.LoadLoggedUserFailure(err)));
    });

  @Effect()
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .map(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_profile');
      this.router.navigate(['']);
      return new Auth.LogoutSuccess();
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}

