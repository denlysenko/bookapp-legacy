import { Routes } from '@angular/router';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page/reset-password-page.component';

export const restorePasswordRoutes: Routes = [
  {
    path: '',
    component: ForgotPasswordPageComponent
  },
  {
    path: ':token',
    component: ResetPasswordPageComponent
  }
];
