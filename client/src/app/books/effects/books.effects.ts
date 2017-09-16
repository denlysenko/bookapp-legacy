import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as Books from '../actions/books';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { handleError } from '../../helpers/errorHandler';

@Injectable()
export class BooksEffects {
  @Effect()
  fetchBooks$ = this.actions$
    .ofType(Books.FETCH_BOOKS)
    .map((action: Books.FetchBooks) => action.payload)
    .switchMap(query => {
      return this.bookService.getBooks(query)
        .map(books => new Books.FetchBooksSuccess(books))
        .catch(err => Observable.of(new Books.FetchBooksFailure(handleError(err))));
    });

  @Effect({ dispatch: false })
  rateBook$ = this.actions$
    .ofType(Books.RATE_BOOK)
    .map((action: Books.RateBook) => action.payload)
    .switchMap(book => this.bookService.rateBook(book._id, book.rating));

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) { }
}
