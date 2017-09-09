// import { Injectable, Inject } from "@angular/core";
// import { AuthHttp } from "angular2-jwt";
// import { Observable } from "rxjs";
// import { Headers } from "@angular/http";
// import { APP_CONFIG } from "../config/app.config";
// import { AppConfig } from "../config/AppConfig";
//
// @Injectable()
// export class FavouriteService {
//   constructor(
//     @Inject(APP_CONFIG) private config: AppConfig,
//     private _authHttp: AuthHttp
//   ) {}
//
//   getFavourites(): Observable<any> {
//     return this._authHttp.get(`${this.config.baseUrl}/api/favourite`)
//       .map(res => res.json());
//   }
//
//   addToFavourites(bookId: string): Observable<any> {
//     const body = {
//       bookId: bookId
//     };
//
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//
//     return this._authHttp.post(`${this.config.baseUrl}/api/favourite`, JSON.stringify(body), { headers: headers });
//   }
//
//   removeFromFavourites(bookId: string): Observable<any> {
//     return this._authHttp.delete(`${this.config.baseUrl}/api/favourite/${bookId}`);
//   }
// }
