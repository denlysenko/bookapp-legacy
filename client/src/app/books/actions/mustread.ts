import { Action } from '@ngrx/store';
import { Book } from '../models/Book';

export const FETCH_MUSTREAD_BOOKS = '[Books] Fetch Mustread Books';
export const FETCH_MUSTREAD_BOOKS_SUCCESS = '[Books] Fetch Mustread Books Success';
export const FETCH_MUSTREAD_BOOKS_FAILURE = '[Books] Fetch Mustread Books Failure';
export const ADD_TO_MUSTREAD = '[Books] Add To Mustread Books';
export const ADD_TO_MUSTREAD_SUCCESS = '[Books] Add To Mustread Books Success';
export const ADD_TO_MUSTREAD_FAILURE = '[Books] Add To Mustread Books Failure';
export const REMOVE_FROM_MUSTREAD = '[Books] Remove From Mustread Books';
export const REMOVE_FROM_MUSTREAD_SUCCESS = '[Books] Remove From Mustread Books Success';
export const REMOVE_FROM_MUSTREAD_FAILURE = '[Books] Remove From Mustread Books Failure';

export class FetchMustreadBooks implements Action {
  readonly type = FETCH_MUSTREAD_BOOKS;
}

export class FetchMustreadBooksSuccess implements Action {
  readonly type = FETCH_MUSTREAD_BOOKS_SUCCESS;

  constructor(public payload: Book[]) { }
}

export class FetchMustreadBooksFailure implements Action {
  readonly type = FETCH_MUSTREAD_BOOKS_FAILURE;

  constructor(public payload: string) { }
}

export class AddToMustread implements Action {
  readonly type = ADD_TO_MUSTREAD;

  constructor(public payload: string) { }
}

export class AddToMustreadSuccess implements Action {
  readonly type = ADD_TO_MUSTREAD_SUCCESS;
}

export class AddToMustreadFailure implements Action {
  readonly type = ADD_TO_MUSTREAD_FAILURE;

  constructor(public payload: string) { }
}

export class RemoveFromMustread implements Action {
  readonly type = REMOVE_FROM_MUSTREAD;

  constructor(public payload: string) { }
}

export class RemoveFromMustreadSuccess implements Action {
  readonly type = REMOVE_FROM_MUSTREAD_SUCCESS;
}

export class RemoveFromMustreadFailure implements Action {
  readonly type = REMOVE_FROM_MUSTREAD_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  FetchMustreadBooks |
  FetchMustreadBooksSuccess |
  FetchMustreadBooksFailure |
  AddToMustread |
  AddToMustreadSuccess |
  AddToMustreadFailure |
  RemoveFromMustread |
  RemoveFromMustreadSuccess |
  RemoveFromMustreadFailure;
