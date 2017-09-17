import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../../models/Book';
import { routeAnimation } from '../../../animations/route-animation';
import * as Mustread from '../../actions/mustread';
import * as fromMustread from '../../reducers';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  templateUrl: './mustread-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class MustreadBooksComponent implements OnInit {
  title = 'Must Read Titles';
  baseUrl: string;

  books$: Observable<Book[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  private page: string;

  constructor(
    private _location: Location,
    private store: Store<fromMustread.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.books$ = store.select(fromMustread.selectMustreadBooks);
    this.isLoading$ = store.select(fromMustread.selectMustreadLoading);
    this.error$ = store.select(fromMustread.selectMustreadError);
  }

  rate(book: Book) {
    this.store.dispatch(new Books.RateBook(book));
  }

  // removeFromMustread(book: Book) {
  //   this._mustreadService.removeFromMustread(book._id)
  //     .switchMap(() => {
  //       return this._historyService.addToHistory(`You removed ${book.title} by ${book.author} from Must Read Titles`);
  //     })
  //     .subscribe(
  //       () => {
  //         this.getMustread();
  //       },
  //       err => {
  //         this.error = ErrorHandler.handleError(err.json());
  //       }
  //     );
  // }

  ngOnInit() {
    this.page = this._location.path();
    this.baseUrl = this.config.baseUrl;
    this.store.dispatch(new Mustread.FetchMustreadBooks());
  }
}
