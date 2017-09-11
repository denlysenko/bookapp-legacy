import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import * as fromChangePassword from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as ChangePassword from '../../actions/change-password';
import { Store } from '@ngrx/store';
import { ChangePasswordFormValue } from '../../models/ChangePasswordFormValue';
import * as _ from 'lodash';

@Component({
  templateUrl: './change-password-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class ChangePasswordPageComponent {
  submitting$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<string>;
  userId: string;

  constructor(private store: Store<fromChangePassword.State>) {
    this.submitting$ = store.select(fromChangePassword.selectSubmitting);
    this.success$ = store.select(fromChangePassword.selectSuccess);
    this.error$ = store.select(fromChangePassword.selectError);
    store.select(fromAuth.getUser)
      .map(user => user._id)
      .subscribe(userId => this.userId = userId);
  }

  onFormSubmit(event: ChangePasswordFormValue) {
    this.store.dispatch(
      new ChangePassword.ChangePassword(_.assignIn(event, { id: this.userId }))
    );
  }
}
