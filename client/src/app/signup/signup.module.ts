import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { SignupService } from './services/signup.service';
import { SignupPageComponent } from './containers/signup-page/signup-page.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { EffectsModule } from '@ngrx/effects';
import { SignupEffects } from './effects/signup.effects';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { signupRoutes } from './signupRoutes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(signupRoutes),
    ReactiveFormsModule,
    StoreModule.forFeature('signup', reducers),
    EffectsModule.forFeature([SignupEffects]),
    SharedModule
  ],
  declarations: [SignupPageComponent, SignupFormComponent],
  providers: [SignupService]
})
export class SignupModule { }
