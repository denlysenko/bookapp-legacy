import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page/reset-password-page.component';
import { RouterModule } from '@angular/router';
import { restorePasswordRoutes } from './restore-password.routes';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { RestorePasswordEffects } from './effects/restore-password.effects';
import { RestorePasswordService } from './services/restore-password.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(restorePasswordRoutes),
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('restorePassword', reducers),
    EffectsModule.forFeature([RestorePasswordEffects])
  ],
  declarations: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordFormComponent,
    ForgotPasswordFormComponent
  ],
  providers: [RestorePasswordService]
})
export class RestorePasswordModule { }
