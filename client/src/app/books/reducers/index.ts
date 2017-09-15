import * as fromBooks from './books';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BooksState {
  books: fromBooks.State;
}

export interface State extends fromRoot.State {
  books: BooksState;
}

export const reducers = {
  books: fromBooks.reducer
};

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getBooksEntitiesState = createSelector(
  getBooksState,
  (state: BooksState) => state.books
);

export const selectLoading = createSelector(
  getBooksEntitiesState,
  fromBooks.getLoading
);

export const selectBooks = createSelector(
  getBooksEntitiesState,
  fromBooks.getBooks
);

export const selectError = createSelector(
  getBooksEntitiesState,
  fromBooks.getError
);
