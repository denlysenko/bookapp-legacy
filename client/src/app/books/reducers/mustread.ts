import { Book } from '../models/Book';
import * as Mustread from '../actions/mustread';

export interface State {
  isLoading: boolean;
  success: string | null;
  error: string | null;
  books: Book[];
}

export const initialState: State = {
  isLoading: false,
  success: null,
  error: null,
  books: []
};

export function reducer(state = initialState, action: Mustread.Actions): State {
  switch (action.type) {
    case Mustread.FETCH_MUSTREAD_BOOKS:
      return {
        ...state,
        isLoading: true,
        books: []
      };

    case Mustread.FETCH_MUSTREAD_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      };

    case Mustread.FETCH_MUSTREAD_BOOKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        books: []
      };

    case Mustread.ADD_TO_MUSTREAD:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case Mustread.ADD_TO_MUSTREAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'Added To Must Read Titles'
      };

    case Mustread.ADD_TO_MUSTREAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getBooks = (state: State) => state.books;
export const getLoading = (state: State) => state.isLoading;
export const getError = (state: State) => state.error;
export const getSuccess = (state: State) => state.success;
