import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profileRoutes';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ProfileService } from './services/profile.service';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';
import { FileUploadService } from '../services/fileUpload.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(profileRoutes),
    SharedModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [ProfilePageComponent, ProfileFormComponent],
  providers: [ProfileService, FileUploadService]
})
export class ProfileModule { }
