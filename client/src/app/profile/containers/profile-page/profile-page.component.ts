import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromProfile from '../../reducers';
import * as fromAuth from '../../../auth/reducers'
import { User } from '../../../auth/models/User';
import { routeAnimation } from '../../../animations/route-animation';

@Component({
  templateUrl: './profile-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class ProfilePageComponent {
  error$: Observable<string>;
  success$: Observable<boolean>;
  submitting$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromProfile.State>) {
    this.error$ = store.select(fromProfile.selectError);
    this.success$ = store.select(fromProfile.selectSuccess);
    this.submitting$ = store.select(fromProfile.selectSubmitting);
    this.user$ = store.select(fromAuth.getUser);
  }
}
