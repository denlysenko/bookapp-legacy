import { Component, Inject, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Book } from "../../models/Book";
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import * as fromBooks from '../../reducers';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  templateUrl: './browse-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class BrowseBooksComponent implements OnInit {
  isLoading$: Observable<boolean>;
  books$: Observable<Book[]>;
  page: string;
  paid: boolean;
  title: string;
  baseUrl: string;

  constructor(
    private location: Location,
    private store: Store<fromBooks.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.isLoading$ = store.select(fromBooks.selectLoading);
    this.books$ = store.select(fromBooks.selectBooks);
    this.baseUrl = config.baseUrl;
  }

  // sort(event) {
  //   this.sortBy = event;
  //   this.isLoading = true;
  //   this._bookService.getBooks({ paid: this.paid, sort: this.sortBy, search: this.searchTerm })
  //     .finally(() => {
  //       this.isLoading = false;
  //     })
  //     .subscribe(res => {
  //       this.books = res;
  //     });
  // }
  //
  // search(event) {
  //   this.searchTerm = event;
  //   this.searchStream.next(this.searchTerm);
  // }
  //
  // rate(book: Book) {
  //   this._bookService.rateBook(book._id, book.rating)
  //     .switchMap(() => {
  //       return this._historyService.addToHistory(`You rated ${book.title} by ${book.author}`);
  //     })
  //     .subscribe();
  // }
  //
  ngOnInit() {
    this.page = this.location.path();
    this.paid = this.page.includes('buy');
    this.title = this.paid ? 'Browse Books To Buy' : 'Browse Free Books';
    this.store.dispatch(new Books.FetchBooks({
      paid: this.paid,
      sort: '',
      search: ''
    }));

    // this.subscription = this.searchStream
    //   .debounceTime(300)
    //   .distinctUntilChanged()
    //   .switchMap((searchStr: string) => {
    //     this.isLoading = true;
    //     return this._bookService.getBooks({ paid: this.paid, search: searchStr, sort: this.sortBy });
    //   })
    //   .subscribe(res => {
    //     this.isLoading = false;
    //     this.books = res;
    //   });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
