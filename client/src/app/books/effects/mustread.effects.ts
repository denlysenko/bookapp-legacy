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

  @Effect()
  addToMustread$ = this.actions$
    .ofType(Mustread.ADD_TO_MUSTREAD)
    .map((action: Mustread.AddToMustread) => action.payload)
    .switchMap(id => {
      return this.mustreadService.addToMustread(id)
        .map(() => new Mustread.AddToMustreadSuccess())
        .catch(err => Observable.of(new Mustread.AddToMustreadFailure(err)));
    });

  @Effect()
  removeFromMustread$ = this.actions$
    .ofType(Mustread.REMOVE_FROM_MUSTREAD)
    .map((action: Mustread.RemoveFromMustread) => action.payload)
    .switchMap(id => {
      return this.mustreadService.removeFromMustread(id)
        .map(() => new Mustread.RemoveFromMustreadSuccess(id))
        .catch(err => Observable.of(new Mustread.RemoveFromMustreadFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private mustreadService: MustreadService
  ) { }
}
