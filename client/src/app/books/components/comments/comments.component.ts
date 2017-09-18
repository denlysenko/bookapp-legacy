import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from '../../models/Comment';
import { User } from '../../../auth/models/User';

@Component({
  selector: 'ba-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() comments: IComment;
  @Input() user: User;
  @Input() isSubmitting: boolean;

  @Output() addedComment = new EventEmitter();

  constructor() {}

  submitComment(form) {
    if(form.valid) {
      this.addedComment.emit(form.value);
      form.reset();
    }
  }
}
