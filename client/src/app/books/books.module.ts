import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './effects/books.effects';
import { RouterModule } from '@angular/router';
import { booksRoutes } from './books.routes';
import { BrowseBooksComponent } from './containers/browse/browse-books.component';
import { BookService } from './services/book.service';
import { SharedModule } from '../shared/shared.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap';
import { FileUploadService } from '../services/fileUpload.service';
import { FavouriteService } from './services/favourite.service';
import { FavouritesEffects } from './effects/favourites.effects';
import { FavouriteBooksComponent } from './containers/favourite/favourite-books.component';
import { WishlistService } from './services/wishlist.service';
import { WishlistEffects } from './effects/wishlist.effects';
import { WishlistBooksComponent } from './containers/wishlist/wishlist-books.component';
import { MustreadBooksComponent } from './containers/mustread/mustread-books.component';
import { MustreadService } from './services/mustread.service';
import { MustreadEffects } from './effects/mustread.effects';
import { BestBooksEffects } from './effects/best.effects';
import { BestBooksComponent } from './containers/best/best-books.component';
import { BookViewComponent } from './containers/book-view/book-view.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookEffects } from './effects/book.effects';
import { CommentService } from './services/comment.service';
import { CommentsEffects } from './effects/comments.effects';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(booksRoutes),
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([
      BooksEffects,
      FavouritesEffects,
      WishlistEffects,
      MustreadEffects,
      BestBooksEffects,
      BookEffects,
      CommentsEffects
    ]),
    SharedModule,
    RatingModule.forRoot()
  ],
  declarations: [
    BookListComponent,
    BrowseBooksComponent,
    FavouriteBooksComponent,
    WishlistBooksComponent,
    MustreadBooksComponent,
    BestBooksComponent,
    BookViewComponent,
    BookDetailsComponent,
    CommentsComponent
  ],
  providers: [
    BookService,
    FileUploadService,
    FavouriteService,
    WishlistService,
    MustreadService,
    CommentService
  ]
})
export class BooksModule { }
