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
import { EffectsModule } from '@ngrx/effects';
import { ChangePasswordEffects } from './effects/change-password.effects';
import { ChangePasswordService } from './services/change-password.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(changePasswordRoutes),
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('changePassword', reducers),
    EffectsModule.forFeature([ChangePasswordEffects])
  ],
  declarations: [
    ChangePasswordPageComponent,
    ChangePasswordFormComponent
  ],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule { }
