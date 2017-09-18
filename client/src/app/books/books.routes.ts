import { Routes } from '@angular/router';
import { BrowseBooksComponent } from './containers/browse/browse-books.component';
import { FavouriteBooksComponent } from './containers/favourite/favourite-books.component';
import { WishlistBooksComponent } from './containers/wishlist/wishlist-books.component';
import { MustreadBooksComponent } from './containers/mustread/mustread-books.component';
import { BestBooksComponent } from './containers/best/best-books.component';
import { BookViewComponent } from './containers/book-view/book-view.component';

export const booksRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'browse'
  },
  {
    path: 'browse',
    component: BrowseBooksComponent
  },
  {
    path: 'buy',
    component: BrowseBooksComponent
  },
  {
    path: 'browse/:author/:slug',
    component: BookViewComponent
  },
  {
    path: 'buy/:author/:slug',
    component: BookViewComponent
  },
  {
    path: 'favourite',
    component: FavouriteBooksComponent
  },
  {
    path: 'wishlist',
    component: WishlistBooksComponent
  },
  {
    path: 'mustread',
    component: MustreadBooksComponent
  },
  {
    path: 'best',
    component: BestBooksComponent
  }
];
