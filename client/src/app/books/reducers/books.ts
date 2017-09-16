import { Book } from '../models/Book';
import * as Books from '../actions/books';

export interface State {
  selectedBook: string | null;
  books: Book[];
}

export const initialState: State = {
  selectedBook: null,
  books: []
};

export function reducer(state = initialState, action: Books.Actions): State {
  switch (action.type) {
    case Books.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload
      };

    default:
      return state;
  }
}

export const getBooks = (state: State) => state.books;
