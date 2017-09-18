import { Component, Inject, OnInit } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { ActivatedRoute } from '@angular/router';
import * as Books from '../../actions/book';
import * as fromBook from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  templateUrl: './book-view.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class BookViewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  book$: Observable<Book>;
  baseUrl: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromBook.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.isAdmin$ = store.select(fromAuth.getIsAdmin);
    this.book$ = store.select(fromBook.selectBook);
    this.isLoading$ = store.select(fromBook.selectBookLoading);
    this.baseUrl = config.baseUrl;
  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];
    this.store.dispatch(new Books.FetchBook(slug));
  }
}
