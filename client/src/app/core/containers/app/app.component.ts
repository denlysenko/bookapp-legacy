import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/auth';
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

  constructor(private store: Store<fromAuth.State>) {
    this.isLoggedIn$ = store.select(fromAuth.getLoggedIn);
  }

  signout() {
    this.store.dispatch(new Logout());
  }
}
