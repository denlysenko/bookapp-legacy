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
        .map(books => new Wishlist.FetchWishlistSuccess(books))
        .catch(err => Observable.of(new Wishlist.FetchWishlistFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private wishlistService: WishlistService
  ) { }
}
