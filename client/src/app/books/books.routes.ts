import { Routes } from '@angular/router';
import { BrowseBooksComponent } from './containers/browse/browse-books.component';

export const booksRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'browse'
  },
  {
    path: 'browse',
    component: BrowseBooksComponent
  }
];
