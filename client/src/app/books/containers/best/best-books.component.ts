import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../../models/Book';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromBest from '../../reducers';
import * as BestBooks from '../../actions/best';
import * as Books from '../../actions/books';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  templateUrl: './best-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class BestBooksComponent implements OnInit {
  title = 'Best Books';
  baseUrl: string;

  books$: Observable<Book[]>;
  isLoading$: Observable<boolean>;

  private page: string;

  constructor(
    private _location: Location,
    private store: Store<fromBest.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.books$ = store.select(fromBest.selectBestBooks);
    this.isLoading$ = store.select(fromBest.selectBestLoading);
  }

  rate(book: Book) {
    this.store.dispatch(new Books.RateBook(book));
  }

  ngOnInit() {
    this.page = this._location.path();
    this.baseUrl = this.config.baseUrl;
    this.store.dispatch(new BestBooks.FetchBestBooks());
  }
}
