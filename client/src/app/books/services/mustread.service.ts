import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleError } from '../../helpers/errorHandler';

@Injectable()
export class MustreadService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  getMustread(): Observable<any> {
    return this.http.get(`${this.config.baseUrl}/api/mustread`)
      .catch(err => Observable.throw(handleError(err.error)));
  }

  addToMustread(bookId: string): Observable<any> {
    const body = {
      bookId: bookId
    };

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/mustread`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }

  removeFromMustread(bookId: string): Observable<any> {
    return this.http.delete(`${this.config.baseUrl}/api/mustread/${bookId}`)
      .catch(err => Observable.throw(handleError(err.error)));
  }
}
