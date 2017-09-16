import { BookFilter } from '../models/BookFilter';
import * as Books from '../actions/books';

export interface State {
  isLoading: boolean;
  filter: BookFilter | null;
  error: string | null;
}

export const initialState: State = {
  isLoading: false,
  filter: null,
  error: null
};

export function reducer(state = initialState, action: Books.Actions): State {
  switch (action.type) {
    case Books.FETCH_BOOKS:
      return {
        ...state,
        isLoading: true,
        filter: action.payload
      };

    case Books.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false
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
export const getError = (state: State) => state.error;
