import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { routeAnimation } from '../../../animations/route-animation';
import { ActivatedRoute } from '@angular/router';
import * as Books from '../../actions/book';
import * as Mustread from '../../actions/mustread';
import * as Favourite from '../../actions/favourites';
import * as Wishlist from '../../actions/wishlist';
import * as Comments from '../../actions/comments';
import * as fromBook from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/Book';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';
import { Subscription } from 'rxjs/Subscription';
import { IComment } from '../../models/Comment';
import { User } from '../../../auth/models/User';

@Component({
  templateUrl: './book-view.component.html',
  host: {
    '[@routeAnimation]': 'true'
  },
  styles: [':host { position: absolute; width: 100%; height: 100%; }'],
  animations: [routeAnimation]
})
export class BookViewComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  commentSubmitting$: Observable<boolean>;
  book: Book;
  comments$: Observable<IComment>;
  user$: Observable<User>;
  baseUrl: string;
  successMsg: string;
  errorMsg: string;

  private mustreadSuccessSubscription: Subscription;
  private mustreadErrorSubscription: Subscription;
  private favouriteSuccessSubscription: Subscription;
  private favouriteErrorSubscription: Subscription;
  private wishlistSuccessSubscription: Subscription;
  private wishlistErrorSubscription: Subscription;
  private bookSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromBook.State>,
    @Inject(APP_CONFIG) private config: AppConfig,
    private ref: ChangeDetectorRef
  ) {
    this.isAdmin$ = store.select(fromAuth.getIsAdmin);
    this.isLoading$ = store.select(fromBook.selectBookLoading);
    this.comments$ = store.select(fromBook.selectComments);
    this.commentSubmitting$ = store.select(fromBook.selectCommentsSubmitting);
    this.user$ = store.select(fromAuth.getUser);
    this.baseUrl = config.baseUrl;
  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];
    this.store.dispatch(new Books.FetchBook(slug));

    this.bookSubscription = this.store.select(fromBook.selectBook)
      .subscribe(book => {
        if (book) {
          this.book = book;
          this.store.dispatch(new Comments.FetchComments(this.book._id));
        }
      });

    this.mustreadSuccessSubscription = this.store.select(fromBook.selectMustreadSuccess)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.successMsg = msg;
      });

    this.mustreadErrorSubscription = this.store.select(fromBook.selectMustreadError)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.errorMsg = msg;
      });

    this.favouriteSuccessSubscription = this.store.select(fromBook.selectFavouriteSuccess)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.successMsg = msg;
      });

    this.favouriteErrorSubscription = this.store.select(fromBook.selectFavouriteError)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.errorMsg = msg;
      });

    this.wishlistSuccessSubscription = this.store.select(fromBook.selectWishlistSuccess)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.successMsg = msg;
      });

    this.wishlistErrorSubscription = this.store.select(fromBook.selectWishlistError)
      .subscribe(msg => {
        this.ref.markForCheck();
        this.errorMsg = msg;
      });
  }

  ngOnDestroy() {
    if (this.mustreadSuccessSubscription) {
      this.mustreadSuccessSubscription.unsubscribe();
    }

    if (this.mustreadErrorSubscription) {
      this.mustreadErrorSubscription.unsubscribe();
    }

    if (this.favouriteSuccessSubscription) {
      this.favouriteSuccessSubscription.unsubscribe();
    }

    if (this.favouriteErrorSubscription) {
      this.favouriteErrorSubscription.unsubscribe();
    }

    if (this.wishlistSuccessSubscription) {
      this.wishlistSuccessSubscription.unsubscribe();
    }

    if (this.wishlistErrorSubscription) {
      this.wishlistErrorSubscription.unsubscribe();
    }

    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

  onAddToMustread(event: string) {
    this.store.dispatch(new Mustread.AddToMustread(event));
  }

  onAddToFavourites(event: string) {
    this.store.dispatch(new Favourite.AddToFavourite(event));
  }

  onAddToWishlist(event: string) {
    this.store.dispatch(new Wishlist.AddToWishlist(event));
  }

  onCommentAdd(event: any) {
    this.store.dispatch(new Comments.AddComment(Object.assign(event, { bookId: this.book._id })));
  }
}
