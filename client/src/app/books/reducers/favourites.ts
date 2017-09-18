import { Book } from '../models/Book';
import * as Favourites from '../actions/favourites';

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

export function reducer(state = initialState, action: Favourites.Actions): State {
  switch (action.type) {
    case Favourites.FETCH_FAVOURITE:
      return {
        ...state,
        isLoading: true,
        books: []
      };

    case Favourites.FETCH_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      };

    case Favourites.FETCH_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        books: []
      };

    case Favourites.ADD_TO_FAVOURITE:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case Favourites.ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'Successfully added to Favourite Books'
      };

    case Favourites.ADD_TO_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getFavouriteBooks = (state: State) => state.books;
export const getLoading = (state: State) => state.isLoading;
export const getError = (state: State) => state.error;
export const getSuccess = (state: State) => state.success;
