import { Book } from '../models/Book';
import * as Best from '../actions/best';

export interface State {
  isLoading: boolean;
  error: string | null;
  books: Book[];
}

export const initialState: State = {
  isLoading: false,
  error: null,
  books: []
};

export function reducer(state = initialState, action: Best.Actions): State {
  switch (action.type) {
    case Best.FETCH_BEST_BOOKS:
      return {
        ...state,
        isLoading: true,
        books: []
      };

    case Best.FETCH_BEST_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      };

    case Best.FETCH_BEST_BOOKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        books: []
      };

    default:
      return state;
  }
}

export const getBooks = (state: State) => state.books;
export const getLoading = (state: State) => state.isLoading;
export const getError = (state: State) => state.error;
