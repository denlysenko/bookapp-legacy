import { Action } from '@ngrx/store';
import { Book } from '../models/Book';

export const FETCH_FAVOURITE = '[Books] Fetch Favourite Books';
export const FETCH_FAVOURITE_SUCCESS = '[Books] Fetch Favourite Books Success';
export const FETCH_FAVOURITE_FAILURE = '[Books] Fetch Favourite Books Failure';
export const ADD_TO_FAVOURITE = '[Books] Add To Favourite';
export const ADD_TO_FAVOURITE_SUCCESS = '[Books] Add To Favourite Success';
export const ADD_TO_FAVOURITE_FAILURE = '[Books] Add To Favourite Failure';

export class FetchFavourite implements Action {
  readonly type = FETCH_FAVOURITE;
}

export class FetchFavouriteSuccess implements Action {
  readonly type = FETCH_FAVOURITE_SUCCESS;

  constructor(public payload: Book[]) { }
}

export class FetchFavouriteFailure implements Action {
  readonly type = FETCH_FAVOURITE_FAILURE;

  constructor(public payload: string) { }
}

export class AddToFavourite implements Action {
  readonly type = ADD_TO_FAVOURITE;

  constructor(public payload: string) { }
}

export class AddToFavouriteSuccess implements Action {
  readonly type = ADD_TO_FAVOURITE_SUCCESS;
}

export class AddToFavouriteFailure implements Action {
  readonly type = ADD_TO_FAVOURITE_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  FetchFavourite |
  FetchFavouriteSuccess |
  FetchFavouriteFailure |
  AddToFavourite |
  AddToFavouriteSuccess |
  AddToFavouriteFailure;
