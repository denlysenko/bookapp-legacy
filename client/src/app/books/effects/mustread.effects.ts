import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as Mustread from '../actions/mustread';
import { Observable } from 'rxjs/Observable';
import { MustreadService } from '../services/mustread.service';

@Injectable()
export class MustreadEffects {
  @Effect()
  mustreadBooks$ = this.actions$
    .ofType(Mustread.FETCH_MUSTREAD_BOOKS)
    .switchMap(() => {
      return this.mustreadService.getMustread()
        .map(res => new Mustread.FetchMustreadBooksSuccess(res.books))
        .catch(err => Observable.of(new Mustread.FetchMustreadBooksFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private mustreadService: MustreadService
  ) { }
}
