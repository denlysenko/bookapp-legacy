import * as fromBooks from './books';
import * as fromFilter from './filter';
import * as fromFavourites from './favourites';
import * as fromWishlist from './wishlist';
import * as fromMustread from './mustread';
import * as fromBest from './best';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BooksState {
  books: fromBooks.State;
  filter: fromFilter.State;
  favourites: fromFavourites.State;
  wishlist: fromWishlist.State;
  mustread: fromMustread.State;
  best: fromBest.State;
}

export interface State extends fromRoot.State {
  books: BooksState;
}

export const reducers = {
  books: fromBooks.reducer,
  filter: fromFilter.reducer,
  favourites: fromFavourites.reducer,
  wishlist: fromWishlist.reducer,
  mustread: fromMustread.reducer,
  best: fromBest.reducer
};

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getBooksEntitiesState = createSelector(
  getBooksState,
  (state: BooksState) => state.books
);

export const getBooksFilterState = createSelector(
  getBooksState,
  (state: BooksState) => state.filter
);

export const getFavouritesState = createSelector(
  getBooksState,
  (state: BooksState) => state.favourites
);

export const getWishlistState = createSelector(
  getBooksState,
  (state: BooksState) => state.wishlist
);

export const getMustreadState = createSelector(
  getBooksState,
  (state: BooksState) => state.mustread
);

export const getBestState = createSelector(
  getBooksState,
  (state: BooksState) => state.best
);

export const selectBooks = createSelector(
  getBooksEntitiesState,
  fromBooks.getBooks
);

export const selectLoading = createSelector(
  getBooksFilterState,
  fromFilter.getLoading
);

export const selectError = createSelector(
  getBooksFilterState,
  fromFilter.getError
);

export const selectFavouriteBooks = createSelector(
  getFavouritesState,
  fromFavourites.getFavouriteBooks
);

export const selectFavouriteLoading = createSelector(
  getFavouritesState,
  fromFavourites.getLoading
);

export const selectFavouriteError = createSelector(
  getFavouritesState,
  fromFavourites.getError
);

export const selectWishlistBooks = createSelector(
  getWishlistState,
  fromWishlist.getWishlist
);

export const selectWishlistLoading = createSelector(
  getWishlistState,
  fromWishlist.getLoading
);

export const selectWishlistError = createSelector(
  getWishlistState,
  fromWishlist.getError
);

export const selectMustreadBooks = createSelector(
  getMustreadState,
  fromMustread.getBooks
);

export const selectMustreadLoading = createSelector(
  getMustreadState,
  fromMustread.getLoading
);

export const selectMustreadError = createSelector(
  getMustreadState,
  fromMustread.getError
);

export const selectBestBooks = createSelector(
  getBestState,
  fromBest.getBooks
);

export const selectBestLoading = createSelector(
  getBestState,
  fromBest.getLoading
);

export const selectBestError = createSelector(
  getBestState,
  fromBest.getError
);
