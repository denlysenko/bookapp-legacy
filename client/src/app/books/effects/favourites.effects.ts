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
        .map(response => new Favourites.FetchFavouriteSuccess(response.books))
        .catch(err => Observable.of(new Favourites.FetchFavouriteFailure(err)));
    });

  @Effect()
  addToFavourites$ = this.actions$
    .ofType(Favourites.ADD_TO_FAVOURITE)
    .map((action: Favourites.AddToFavourite) => action.payload)
    .switchMap(id => {
      return this.favouriteService.addToFavourites(id)
        .map(() => new Favourites.AddToFavouriteSuccess())
        .catch(err => Observable.of(new Favourites.AddToFavouriteFailure(err)));
    });

  @Effect()
  removeFromFavourites$ = this.actions$
    .ofType(Favourites.REMOVE_FROM_FAVOURITE)
    .map((action: Favourites.RemoveFromFavourite) => action.payload)
    .switchMap(id => {
      return this.favouriteService.removeFromFavourites(id)
        .map(() => new Favourites.RemoveFromFavouriteSuccess(id))
        .catch(err => Observable.of(new Favourites.RemoveFromFavouriteFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private favouriteService: FavouriteService
  ) { }
}
