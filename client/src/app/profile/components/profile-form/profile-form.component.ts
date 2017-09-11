import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { User } from '../../../auth/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorHelper } from '../../../helpers/validator.helper';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';
import { SaveProfilePayload } from '../../actions/profile';

const USER_CHANGES = 'user';

@Component({
  selector: 'ba-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements OnChanges {
  profileForm: FormGroup;
  avatarUrl: string;
  avatar: File;

  @Input() user: User;
  @Input() isSubmitting: boolean;

  @Output() formSubmitted = new EventEmitter<SaveProfilePayload>();

  constructor(
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private config: AppConfig,
    private ref: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes[USER_CHANGES]) {
      this.initForm();
    }
  }

  onFileChange(event: any) {
    if (event.target.files[0]) {
      this.avatar = event.target.files[0];
      this.readURL(this.avatar);
    }
  }

  saveChanges() {
    if (this.profileForm.valid) {
      this.formSubmitted.emit({
        id: this.user._id,
        user: this.profileForm.value,
        avatar: this.avatar
      });

      this.profileForm.markAsPristine();
    }
  }

  private readURL(file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarUrl = e.target.result;
      this.ref.markForCheck();
    };

    reader.readAsDataURL(file);
  }

  private initForm() {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, /*Validators.required*/],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.compose([
        Validators.required,
        ValidatorHelper.isEmail
      ])]
    });

    this.avatarUrl = `${this.config.baseUrl}${this.user.avatarUrl}`;
  }
}
