import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Book } from "../../models/Book";
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import * as fromBooks from '../../reducers';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './browse-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class BrowseBooksComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  books$: Observable<Book[]>;
  page: string;
  paid: boolean;
  title: string;
  baseUrl: string;

  private searchSubscription: Subscription;
  private searchStream = new Subject<any>();

  constructor(
    private location: Location,
    private store: Store<fromBooks.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.isLoading$ = store.select(fromBooks.selectLoading);
    this.books$ = store.select(fromBooks.selectBooks);
    this.baseUrl = config.baseUrl;
  }

  sort(event) {
    this.store.dispatch(new Books.FetchBooks({ sort: event }));
  }

  search(event) {
    this.searchStream.next(event);
  }

  rate(book: Book) {
    this.store.dispatch(new Books.RateBook(book));
  }

  ngOnInit() {
    this.page = this.location.path();
    this.paid = this.page.includes('buy');
    this.title = this.paid ? 'Browse Books To Buy' : 'Browse Free Books';
    this.store.dispatch(new Books.FetchBooks({ paid: this.paid }));

    this.searchSubscription = this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((searchStr: string) => {
        this.store.dispatch(new Books.FetchBooks({ search: searchStr }));
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
