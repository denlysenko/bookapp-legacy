export interface IComment {
  bookId?: string;
  messages: CommentMessages[];
}

export interface CommentMessages {
  author: string;
  created_at?: string;
  text: string;
}

export interface CommentPayload {
  bookId: string;
  comment: string;
}
