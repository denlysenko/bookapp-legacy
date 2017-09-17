import { Action } from '@ngrx/store';
import { Book } from '../models/Book';

export const FETCH_WISHLIST = '[Books] Fetch Wishlist';
export const FETCH_WISHLIST_SUCCESS = '[Books] Fetch Wishlist Success';
export const FETCH_WISHLIST_FAILURE = '[Books] Fetch Wishlist Failure';
export const ADD_TO_WISHLIST = '[Books] Add To Wishlist';
export const ADD_TO_WISHLIST_SUCCESS = '[Books] Add To Wishlist Success';
export const ADD_TO_WISHLIST_FAILURE = '[Books] Add To Wishlist Failure';

export class FetchWishlist implements Action {
  readonly type = FETCH_WISHLIST;
}

export class FetchWishlistSuccess implements Action {
  readonly type = FETCH_WISHLIST_SUCCESS;

  constructor(public payload: Book[]) { }
}

export class FetchWishlistFailure implements Action {
  readonly type = FETCH_WISHLIST_FAILURE;

  constructor(public payload: string) { }
}

export class AddToWishlist implements Action {
  readonly type = ADD_TO_WISHLIST;

  constructor(public payload: string) { }
}

export class AddToWishlistSuccess implements Action {
  readonly type = ADD_TO_WISHLIST_SUCCESS;
}

export class AddToWishlistFailure implements Action {
  readonly type = ADD_TO_WISHLIST_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  FetchWishlist |
  FetchWishlistSuccess |
  FetchWishlistFailure |
  AddToWishlist |
  AddToWishlistSuccess |
  AddToWishlistFailure;
