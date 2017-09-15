import { Book } from '../models/Book';
import * as Books from '../actions/books';

export interface State {
  isLoading: boolean;
  books: Book[];
  error: string | null;
}

export const initialState: State = {
  isLoading: false,
  books: [],
  error: null
};

export function reducer(state = initialState, action: Books.Actions): State {
  switch (action.type) {
    case Books.FETCH_BOOKS:
      return {
        ...state,
        isLoading: true,
        books: [],
        error: null
      };

    case Books.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      };

    case Books.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.isLoading;
export const getBooks = (state: State) => state.books;
export const getError = (state: State) => state.error;
