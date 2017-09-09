// import { Injectable, Inject } from "@angular/core";
// import { AuthHttp } from "angular2-jwt";
// import { Observable, BehaviorSubject } from "rxjs";
// import { Headers } from "@angular/http";
// import { APP_CONFIG } from "../config/app.config";
// import { AppConfig } from "../config/AppConfig";
//
// @Injectable()
// export class HistoryService {
//   userHistory = new BehaviorSubject<[{desc: string, committed_at: string}]>(null);
//
//   constructor(
//     @Inject(APP_CONFIG) private config: AppConfig,
//     private _authHttp: AuthHttp
//   ) {
//     this.getHistory()
//       .subscribe(history => {
//         history && this.userHistory.next(history.actions);
//       });
//   }
//
//   getHistory(): Observable<any> {
//     return this._authHttp.get(`${this.config.baseUrl}/api/history`)
//       .map(res => res.json());
//   }
//
//   addToHistory(desc: string): Observable<any> {
//     const body = { desc: desc, committed_at: Date.now() };
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//
//     return this._authHttp.post(`${this.config.baseUrl}/api/history`, JSON.stringify(body), { headers: headers })
//       .map(res => {
//         this.userHistory.next(res.json().actions);
//       });
//   }
// }
