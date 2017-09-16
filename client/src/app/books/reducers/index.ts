import * as fromBooks from './books';
import * as fromFilter from './filter';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BooksState {
  books: fromBooks.State;
  filter: fromFilter.State;
}

export interface State extends fromRoot.State {
  books: BooksState;
}

export const reducers = {
  books: fromBooks.reducer,
  filter: fromFilter.reducer
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
