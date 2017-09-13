import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as fromResetPassword from '../../reducers';
import * as RestorePassword from '../../actions/restore-password';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './reset-password-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class ResetPasswordPageComponent implements OnInit {
  submitting$: Observable<boolean>;
  error$: Observable<string>;

  private token: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromResetPassword.State>
  ) {
    this.submitting$ = store.select(fromResetPassword.getResetSubmitting);
    this.error$ = store.select(fromResetPassword.getResetError);
  }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
  }

  onFormSubmit(event: any) {
    const { newPassword } = event;
    this.store.dispatch(new RestorePassword.ResetPassword({
      newPassword: newPassword,
      token: this.token
    }));
  }
}
