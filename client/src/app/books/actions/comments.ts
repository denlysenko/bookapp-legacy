import { Action } from '@ngrx/store';
import { CommentPayload, IComment } from '../models/Comment';

export const FETCH_COMMENTS = '[Books] Fetch Comments';
export const FETCH_COMMENTS_SUCCESS = '[Books] Fetch Comments Success';
export const FETCH_COMMENTS_FAILURE = '[Books] Fetch Comments Failure';
export const ADD_COMMENT = '[Books] Add Comment';
export const ADD_COMMENT_SUCCESS = '[Books] Add Comment Success';
export const ADD_COMMENT_FAILURE = '[Books] Add Comment Failure';

export class FetchComments implements Action {
  readonly type = FETCH_COMMENTS;

  constructor(public payload: string) { }
}

export class FetchCommentsSuccess implements Action {
  readonly type = FETCH_COMMENTS_SUCCESS;

  constructor(public payload: IComment) { }
}

export class FetchCommentsFailure implements Action {
  readonly type = FETCH_COMMENTS_FAILURE;

  constructor(public payload: string) { }
}

export class AddComment implements Action {
  readonly type = ADD_COMMENT;

  constructor(public payload: CommentPayload) { }
}

export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;

  constructor(public payload: IComment) { }
}

export class AddCommentFailure implements Action {
  readonly type = ADD_COMMENT_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  FetchComments |
  FetchCommentsSuccess |
  FetchCommentsFailure |
  AddComment |
  AddCommentSuccess |
  AddCommentFailure;
