import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../../auth/models/Credentials';
import { Store } from '@ngrx/store';
import * as LoginPage from '../../actions/login';
import * as fromLogin from '../../reducers';
import { routeAnimation } from '../../../animations/route-animation';

@Component({
  templateUrl: './signin-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class SigninPageComponent {
  submitting$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromLogin.State>) {
    this.submitting$ = store.select(fromLogin.selectSubmitting);
    this.error$ = store.select(fromLogin.selectError);
  }

  signin(creds: Credentials) {
    this.store.dispatch(new LoginPage.Login(creds));
  }
}
