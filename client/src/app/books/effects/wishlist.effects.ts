import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WishlistService } from '../services/wishlist.service';
import * as Wishlist from '../actions/wishlist';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WishlistEffects {
  @Effect()
  favouriteBooks$ = this.actions$
    .ofType(Wishlist.FETCH_WISHLIST)
    .switchMap(() => {
      return this.wishlistService.getWishlist()
        .map(response => new Wishlist.FetchWishlistSuccess(response.books))
        .catch(err => Observable.of(new Wishlist.FetchWishlistFailure(err)));
    });

  @Effect()
  addToWishlist$ = this.actions$
    .ofType(Wishlist.ADD_TO_WISHLIST)
    .map((action: Wishlist.AddToWishlist) => action.payload)
    .switchMap(id => {
      return this.wishlistService.addToWishlist(id)
        .map(() => new Wishlist.AddToWishlistSuccess())
        .catch(err => Observable.of(new Wishlist.AddToWishlistFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private wishlistService: WishlistService
  ) { }
}
