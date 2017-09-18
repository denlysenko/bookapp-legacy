import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from '../../models/Book';
/*
import { BookService } from "../../../services/book.service";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../models/User";
import { Subscription } from "rxjs";
import { MustreadService } from "../../../services/mustread.service";
import * as ErrorHandler from '../../../helpers/errorHandler';
import * as CreditCardHelper from '../../../helpers/creditCard.helper';
import { FavouriteService } from "../../../services/favourite.service";
import { WishlistService } from "../../../services/wishlist.service";
import { ValidatorHelper } from "../../../helpers/validator.helper";
import { HistoryService } from "../../../services/history.service";
import { APP_CONFIG } from "../../../config/app.config";
import { AppConfig } from "../../../config/AppConfig";*/

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  // user: User;
  buyForm: FormGroup;
  typecard: string;

  @Input() book: Book;
  @Input() success: string;
  @Input() error: string;
  @Input() isAdmin: boolean;
  @Input() isSubmitting: boolean;
  @Input() baseUrl: string;

  @Output() rated = new EventEmitter<Book>();
  @Output() addedToMustread = new EventEmitter<string>();
  @Output() addedToFavourites = new EventEmitter<string>();
  @Output() addedToWishlist = new EventEmitter<string>();

  @ViewChild('buyFormRef') buyFormRef: ElementRef;

  private buyFormVisible: boolean = false;
  private isDownloading: boolean = false;

  constructor() {}

  rate(book: Book) {
    this.rated.emit(book);
  }

  addToMustread() {
    this.addedToMustread.emit(this.book._id);
  }

  addToFavourites() {
    this.addedToFavourites.emit(this.book._id);
  }

  addToWishlist() {
    this.addedToWishlist.emit(this.book._id);
  }

  // showBuyForm() {
  //   this.buyFormVisible = true;
  // }
  //
  // correctPan(event) {
  //   this.buyForm.controls['cardNumber'].setValue(CreditCardHelper.formatPan(event.target.value));
  // }

  // buyBook() {
  //   if(this.buyForm.valid) {
  //     let url;
  //     this._bookService.buyBook(this.book._id, CreditCardHelper.correctNumber(this.buyForm.value.cardNumber))
  //       .switchMap(res => {
  //         url = res.url;
  //         return this._historyService.addToHistory(`You bought ${this.book.title} by ${this.book.author}`);
  //       })
  //       .subscribe(
  //         () => {
  //           this.createDownloadLink(url);
  //           this.buyFormVisible = false;
  //           this.isDownloading = true;
  //         },
  //         err => {
  //           this.error = ErrorHandler.handleError(err.json());
  //         }
  //       );
  //   }
  // }
  //
  // removeBook() {
  //   const isConfirmed = confirm('Do you want to remove the book?'),
  //     path = this._route.snapshot.url[0].path;
  //   if(isConfirmed) {
  //     this._bookService.remove(this.book.slug)
  //       .switchMap(() => {
  //         return this._historyService.addToHistory(`You removed ${this.book.title} by ${this.book.author}`);
  //       })
  //       .subscribe(
  //         () => {
  //           this._router.navigate([path]);
  //         },
  //         err => {
  //           this.error = ErrorHandler.handleError(err.json());
  //         }
  //       );
  //   }
  // }

  // private createDownloadLink(href: string): void {
  //   let aElem = this._renderer.createElement(this.buyFormRef.nativeElement.parentNode, 'a');
  //   this._renderer.createText(aElem, 'Download Book');
  //   this._renderer.setElementAttribute(aElem, 'href', href);
  //   this._renderer.setElementClass(aElem, 'download-link', true);
  //   this._renderer.listen(aElem, 'click', () => {
  //     this._renderer.detachView([aElem]);
  //     this.isDownloading = false;
  //   });
  // }
  //
  // ngOnInit() {
  //   this.isLoading = true;
  //   this.subscription = this._userService.currentUser
  //     .subscribe(user => {
  //       this.user = user;
  //     });
  //
  //   this._route.params.forEach(param => {
  //     let slug = param['slug'];
  //     this._bookService.getBook(slug)
  //       .finally(() => { this.isLoading = false; })
  //       .subscribe(res => {
  //         this.book = res;
  //       });
  //   });
  //
  //   this.buyForm = new FormGroup({
  //     cardNumber: new FormControl('', Validators.compose([
  //       Validators.required,
  //       ValidatorHelper.isCreditCard
  //     ]))
  //   });
  //
  //   this.buyForm.controls['cardNumber'].valueChanges
  //     .subscribe(value => {
  //       this.typecard = CreditCardHelper.detectCardType(CreditCardHelper.correctNumber(value));
  //     });
  // }
  //
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
