import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { Location } from '@angular/common';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import * as fromWishlist from '../../reducers';
import * as Wishlist from '../../actions/wishlist';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  templateUrl: './wishlist-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class WishlistBooksComponent implements OnInit {
  title = 'Wishlist';
  baseUrl: string;

  books$: Observable<Book[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  private page: string;

  constructor(
    private _location: Location,
    private store: Store<fromWishlist.State>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.books$ = store.select(fromWishlist.selectWishlistBooks);
    this.isLoading$ = store.select(fromWishlist.selectWishlistLoading);
    this.error$ = store.select(fromWishlist.selectWishlistError);
    this.baseUrl = config.baseUrl;
  }

  rate(book: Book) {
    this.store.dispatch(new Books.RateBook(book));
  }

  // removeFromWishlist(book: Book) {
  //   this._wishlistService.removeFromWishlist(book._id)
  //     .switchMap(() => {
  //       return this._historyService.addToHistory(`You removed ${book.title} by ${book.author} from Wishlist`);
  //     })
  //     .subscribe(
  //       () => {
  //         this.getWishlist();
  //       },
  //       err => {
  //         this.error = ErrorHandler.handleError(err.json());
  //       }
  //     );
  // }

  ngOnInit() {
    this.page = this._location.path();
    this.store.dispatch(new Wishlist.FetchWishlist());
  }
}
