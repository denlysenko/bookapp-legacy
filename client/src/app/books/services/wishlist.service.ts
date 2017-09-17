import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { handleError } from '../../helpers/errorHandler';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  getWishlist(): Observable<any> {
    return this.http.get(`${this.config.baseUrl}/api/wishlist`)
      .catch(err => Observable.throw(handleError(err.error)));
  }

  addToWishlist(bookId: string): Observable<any> {
    const body = {
      bookId: bookId
    };

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/wishlist`, body, { headers })
      .catch(err => Observable.throw(handleError(err.error)));
  }

  removeFromWishlist(bookId: string): Observable<any> {
    return this.http.delete(`${this.config.baseUrl}/api/wishlist/${bookId}`)
      .catch(err => Observable.throw(handleError(err.error)));
  }
}
