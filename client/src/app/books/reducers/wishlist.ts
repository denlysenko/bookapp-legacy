import { Book } from '../models/Book';
import * as Wishlist from '../actions/wishlist';

export interface State {
  isLoading: boolean;
  success: boolean;
  error: string | null;
  books: Book[];
}

export const initialState: State = {
  isLoading: false,
  success: false,
  error: null,
  books: []
};

export function reducer(state = initialState, action: Wishlist.Actions): State {
  switch (action.type) {
    case Wishlist.FETCH_WISHLIST:
      return {
        ...state,
        isLoading: true,
        books: []
      };

    case Wishlist.FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      };

    case Wishlist.FETCH_WISHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        books: []
      };

    case Wishlist.ADD_TO_WISHLIST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case Wishlist.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      };

    case Wishlist.ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getWishlist = (state: State) => state.books;
export const getLoading = (state: State) => state.isLoading;
export const getError = (state: State) => state.error;