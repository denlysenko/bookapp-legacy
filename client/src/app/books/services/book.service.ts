import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/Book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { APP_CONFIG } from '../../config/app.config';
import { AppConfig } from '../../config/AppConfig';
import { FileUploadService } from '../../services/fileUpload.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class BookService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) {}

  changeCover(cover: File, slug: string): Observable<any> {
    return this.fileUploadService.upload(`${this.config.baseUrl}/api/books/${slug}/cover`, 'PUT', cover);
  }

  changeEpub(epub: File, slug: string): Observable<any> {
    return this.fileUploadService.upload(`${this.config.baseUrl}/api/books/${slug}/epub`, 'PUT', epub);
  }

  create(book: Book): Observable<Book> {
    let newBook = new Book(book);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/books`, newBook, { headers })
      .catch(err => Observable.throw(err.error));
  }

  update(slug: string, book: Book): Observable<Book> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.config.baseUrl}/api/books/${slug}`, book, { headers })
      .catch(err => Observable.throw(err.error));
  }

  remove(slug: string): Observable<any> {
    return this.http.delete(`${this.config.baseUrl}/api/books/${slug}`)
      .catch(err => Observable.throw(err.error));
  }

  getBooks(searchParams: Object): Observable<Book[]> {
    let params: HttpParams = new HttpParams();

    for(let key in searchParams) {
      params.set(key, searchParams[key]);
    }

    return this.http.get(`${this.config.baseUrl}/api/books`, { params })
      .catch(err => Observable.throw(err.error));
  }

  getBestBooks(): Observable<Book[]> {
    return this.http.get(`${this.config.baseUrl}/api/books/best_books`)
      .catch(err => Observable.throw(err.error));
  };

  getBook(slug: string): Observable<Book> {
    return this.http.get(`${this.config.baseUrl}/api/books/${slug}`)
      .catch(err => Observable.throw(err.error));
  }

  rateBook(bookId, rating): Observable<any> {
    const body = { rating: rating };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.config.baseUrl}/api/books/${bookId}/rate`, body, { headers })
      .catch(err => Observable.throw(err.error));
  }

  buyBook(bookId: string, cardNumber: string): Observable<any> {
    const body = { cardNumber: cardNumber };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.baseUrl}/api/books/${bookId}/buy`, body, { headers })
      .catch(err => Observable.throw(err.error));
  }
}
