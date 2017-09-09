import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [HomeComponent, HomePageComponent]
})
export class HomeModule { }
