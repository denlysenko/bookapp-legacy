import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FavouriteService } from '../services/favourite.service';
import * as Favourites from '../actions/favourites';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FavouritesEffects {
  @Effect()
  favouriteBooks$ = this.actions$
    .ofType(Favourites.FETCH_FAVOURITE)
    .switchMap(() => {
      return this.favouriteService.getFavourites()
        .map(books => new Favourites.FetchFavouriteSuccess(books))
        .catch(err => Observable.of(new Favourites.FetchFavouriteFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private favouriteService: FavouriteService
  ) { }
}
