import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import { User } from '../../../auth/models/User';
import { Logout } from '../../../auth/actions/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.isLoggedIn$ = store.select(fromAuth.getLoggedIn);
    this.user$ = store.select(fromAuth.getUser);
    this.isAdmin$ = store.select(fromAuth.getIsAdmin);
  }

  signout() {
    this.store.dispatch(new Logout());
  }
}
