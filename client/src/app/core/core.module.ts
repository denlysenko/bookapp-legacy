import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './containers/app/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from '../auth/auth.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BookListComponent } from './components/book-list/book-list.component';

const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  BookListComponent
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        whitelistedDomains: ['bookappserver-den2710.rhcloud.com', 'localhost:4200']
      }
    }),
    AuthModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
