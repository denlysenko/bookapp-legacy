import { Action } from '@ngrx/store';
import { Book } from '../models/Book';

export const FETCH_BOOK = '[Books] Fetch Book';
export const FETCH_BOOK_SUCCESS = '[Books] Fetch Book Success';
export const FETCH_BOOK_FAILURE = '[Books] Fetch Book Failure';

export class FetchBook implements Action {
  readonly type = FETCH_BOOK;

  constructor(public payload: string) { }
}

export class FetchBookSuccess implements Action {
  readonly type = FETCH_BOOK_SUCCESS;

  constructor(public payload: Book) { }
}

export class FetchBookFailure implements Action {
  readonly type = FETCH_BOOK_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  FetchBook |
  FetchBookSuccess |
  FetchBookFailure;
