import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { Store } from '@ngrx/store';
import * as fromForgotPassword from '../../reducers';
import * as RestorePassword from '../../actions/restore-password';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './forgot-password-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class ForgotPasswordPageComponent {
  submitting$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromForgotPassword.State>) {
    this.submitting$ = store.select(fromForgotPassword.getForgotSubmitting);
    this.error$ = store.select(fromForgotPassword.getForgotError);
  }

  onFormSubmit(event: string) {
    this.store.dispatch(new RestorePassword.ForgotPassword(event));
  }
}
