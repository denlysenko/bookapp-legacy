import * as Books from '../actions/book';
import { Book } from '../models/Book';

export interface State {
  isLoading: boolean;
  error: string | null;
  book: Book | null;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  book: null
};

export function reducer(state = initialState, action: Books.Actions) {
  switch (action.type) {
    case Books.FETCH_BOOK:
      return {
        ...state,
        isLoading: true,
        error: null,
        book: null
      };

    case Books.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        book: action.payload
      };

    case Books.FETCH_BOOK_FAILURE:
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
export const getBook = (state: State) => state.book;
export const getError = (state: State) => state.error;
