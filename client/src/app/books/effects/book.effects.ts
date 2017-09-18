import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as Books from '../actions/book';
import { Book } from '../models/Book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookEffects {
  @Effect()
  fetchBook$ = this.actions$
    .ofType(Books.FETCH_BOOK)
    .map((action: Books.FetchBook) => action.payload)
    .switchMap(slug => {
      return this.bookService.getBook(slug)
        .map((book: Book) => new Books.FetchBookSuccess(book))
        .catch(err => Observable.of(new Books.FetchBookFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
