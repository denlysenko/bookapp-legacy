import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as BestBooks from '../actions/best';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { handleError } from '../../helpers/errorHandler';

@Injectable()
export class BestBooksEffects {
  @Effect()
  fetchBestBooks$ = this.actions$
    .ofType(BestBooks.FETCH_BEST_BOOKS)
    .switchMap(() => {
      return this.bookService.getBestBooks()
        .map(books => new BestBooks.FetchBestBooksSuccess(books))
        .catch(err => Observable.of(new BestBooks.FetchBestBooksFailure(handleError(err.error))));
    });

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) { }
}
