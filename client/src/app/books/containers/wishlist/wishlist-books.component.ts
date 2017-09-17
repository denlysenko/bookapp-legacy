import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { Location } from '@angular/common';
import { routeAnimation } from '../../../animations/route-animation';
import { Observable } from 'rxjs/Observable';
import * as fromWishlist from '../../reducers';
import * as Wishlist from '../../actions/wishlist';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';

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

  books$: Observable<Book[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  private page: string;

  constructor(
    private _location: Location,
    private store: Store<fromWishlist.State>
  ) {
    this.books$ = store.select(fromWishlist.selectWishlistBooks);
    this.isLoading$ = store.select(fromWishlist.selectWishlistLoading);
    this.error$ = store.select(fromWishlist.selectWishlistError);
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
