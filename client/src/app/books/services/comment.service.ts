import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../models/Comment';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleError } from '../../helpers/errorHandler';

@Injectable()
export class CommentService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  getComments(bookId: string): Observable<IComment> {
    return this.http.get(`${this.config.baseUrl}/api/comments/${bookId}`)
      .catch(err => Observable.throw(handleError(err.error)));
  }

  saveComment(bookId: string, comment: string): Observable<IComment> {
    const body = { comment: comment };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/comments/${bookId}`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }
}
