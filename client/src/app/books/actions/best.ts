import { Action } from '@ngrx/store';
import { Book } from '../models/Book';

export const FETCH_BEST_BOOKS = '[Books] Fetch Best Books';
export const FETCH_BEST_BOOKS_SUCCESS = '[Books] Fetch Best Books Success';
export const FETCH_BEST_BOOKS_FAILURE = '[Books] Fetch Best Books Failure';

export class FetchBestBooks implements Action {
  readonly type = FETCH_BEST_BOOKS;
}

export class FetchBestBooksSuccess implements Action {
  readonly type = FETCH_BEST_BOOKS_SUCCESS;

  constructor(public payload: Book[]) {}
}

export class FetchBestBooksFailure implements Action {
  readonly type = FETCH_BEST_BOOKS_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  FetchBestBooks |
  FetchBestBooksSuccess |
  FetchBestBooksFailure;
