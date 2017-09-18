import { Injectable } from '@angular/core';
import * as Comments from '../actions/comments';
import { Actions, Effect } from '@ngrx/effects';
import { CommentService } from '../services/comment.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsEffects {
  @Effect()
  fetchComments$ = this.actions$
    .ofType(Comments.FETCH_COMMENTS)
    .map((action: Comments.FetchComments) => action.payload)
    .switchMap(bookId => {
      return this.commentService.getComments(bookId)
        .map(comments => new Comments.FetchCommentsSuccess(comments))
        .catch(err => Observable.of(new Comments.FetchCommentsFailure(err)));
    });

  @Effect()
  addComment$ = this.actions$
    .ofType(Comments.ADD_COMMENT)
    .map((action: Comments.AddComment) => action.payload)
    .switchMap(commentPayload => {
      const { bookId, comment } = commentPayload;
      return this.commentService.saveComment(bookId, comment)
        .map(comment => new Comments.AddCommentSuccess(comment))
        .catch(err => Observable.of(new Comments.AddCommentFailure(err)));
    });

  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) { }
}
