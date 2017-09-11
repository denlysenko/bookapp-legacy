import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profileRoutes';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(profileRoutes),
    SharedModule,
    StoreModule.forFeature('profile', reducers)
  ],
  declarations: [ProfilePageComponent, ProfileFormComponent]
})
export class ProfileModule { }
