import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromSignup from '../../reducers';
import * as Signup from '../../actions/signup';
import { User } from '../../../auth/models/User';

@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class SignupPageComponent {
  error$: Observable<string>;
  submitting$: Observable<boolean>;

  constructor(private store: Store<fromSignup.State>) {
    this.error$ = store.select(fromSignup.selectError);
    this.submitting$ = store.select(fromSignup.selectSubmitting);
  }

  onFormSubmitted(value: User) {
    this.store.dispatch(new Signup.Signup(value));
  }
}
