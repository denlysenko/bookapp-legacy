import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routeAnimation } from '../../../animations/route-animation';
import { Book } from '../../models/Book';
import { Observable } from 'rxjs/Observable';
import * as fromFavourites from '../../reducers';
import * as Favourites from '../../actions/favourites';
import * as Books from '../../actions/books';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './favourite-books.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class FavouriteBooksComponent implements OnInit {
  title = 'Favourite Books';

  books$: Observable<Book[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  private page: string;

  constructor(
    private store: Store<fromFavourites.State>,
    private _location: Location
  ) {
    this.books$ = store.select(fromFavourites.selectFavouriteBooks);
    this.isLoading$ = store.select(fromFavourites.selectFavouriteLoading);
    this.error$ = store.select(fromFavourites.selectFavouriteError);
  }

  rate(book: Book) {
    this.store.dispatch(new Books.RateBook(book));
  }

  // removeFromFavourites(book: Book) {
  //   this._favouriteService.removeFromFavourites(book._id)
  //     .switchMap(() => {
  //       return this._historyService.addToHistory(`You removed ${book.title} by ${book.author} from Favourites`);
  //     })
  //     .subscribe(
  //       () => {
  //         this.getFavourites();
  //       },
  //       err => {
  //         this.error = ErrorHandler.handleError(err.json());
  //       }
  //     );
  // }

  ngOnInit() {
    this.page = this._location.path();
    this.store.dispatch(new Favourites.FetchFavourite());
  }
}
