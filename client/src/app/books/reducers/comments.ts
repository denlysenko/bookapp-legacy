import { IComment } from '../models/Comment';
import * as Comment from '../actions/comments';

export interface State {
  submitting: boolean;
  comment: IComment | null;
  error: string | null;
}

export const initialState: State = {
  submitting: false,
  comment: null,
  error: null
};

export function reducer(state = initialState, action: Comment.Actions): State {
  switch (action.type) {
    case Comment.FETCH_COMMENTS:
      return {
        ...state,
        submitting: true,
        comment: null
      };

    case Comment.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        submitting: false,
        comment: action.payload
      };

    case Comment.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload
      };

    case Comment.ADD_COMMENT:
      return {
        ...state,
        submitting: true
      };

    case Comment.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        submitting: false,
        comment: action.payload
      };

    case Comment.ADD_COMMENT_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getComments = (state: State) => state.comment;
export const getSubmitting = (state: State) => state.submitting;
export const getError = (state: State) => state.error;
