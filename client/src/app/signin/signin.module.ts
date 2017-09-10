import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SigninPageComponent } from './containers/signin-page/signin-page.component';
import { RouterModule } from '@angular/router';
import { signinRoutes } from './signinRoutes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(signinRoutes),
    StoreModule.forFeature('login', reducers),
    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [
    SigninPageComponent,
    SigninFormComponent
  ],
  providers: [LoginService]
})
export class SigninModule { }
