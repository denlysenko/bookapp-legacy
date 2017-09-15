import { Action } from '@ngrx/store';
import { BookFilter } from '../models/BookFilter';
import { Book } from '../models/Book';

export const FETCH_BOOKS = '[Books] Fetch Books';
export const FETCH_BOOKS_SUCCESS = '[Books] Fetch Books Success';
export const FETCH_BOOKS_FAILURE = '[Books] Fetch Books Failure';

export class FetchBooks implements Action {
  readonly type = FETCH_BOOKS;

  constructor(public payload: BookFilter) {}
}

export class FetchBooksSuccess implements Action {
  readonly type = FETCH_BOOKS_SUCCESS;

  constructor(public payload: Book[]) {}
}

export class FetchBooksFailure implements Action {
  readonly type = FETCH_BOOKS_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  FetchBooks |
  FetchBooksSuccess |
  FetchBooksFailure;
