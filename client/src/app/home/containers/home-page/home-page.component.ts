import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/auth';
import { routeAnimation } from '../../../animations/route-animation';

const TITLE = 'Book Application';

@Component({
  templateUrl: './home-page.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class HomePageComponent {
  title = TITLE;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.isLoggedIn$ = store.select(fromAuth.getLoggedIn);
  }
}
