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
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap';
import { FileUploadService } from '../services/fileUpload.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(booksRoutes),
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([BooksEffects]),
    SharedModule,
    RatingModule.forRoot()
  ],
  declarations: [
    BookListComponent,
    BrowseBooksComponent
  ],
  providers: [ BookService, FileUploadService ]
})
export class BooksModule { }
