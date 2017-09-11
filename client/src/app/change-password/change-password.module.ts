import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordPageComponent } from './containers/change-password-page/change-password-page.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { RouterModule } from '@angular/router';
import { changePasswordRoutes } from './change-password.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(changePasswordRoutes),
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('changePassword', reducers)
  ],
  declarations: [
    ChangePasswordPageComponent,
    ChangePasswordFormComponent
  ]
})
export class ChangePasswordModule { }
