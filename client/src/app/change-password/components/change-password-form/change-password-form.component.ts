import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorHelper } from '../../../helpers/validator.helper';

@Component({
  selector: 'ba-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordFormComponent implements OnInit {
  changePasswordForm: FormGroup;

  @Input() isSubmitting: boolean;

  @Output() formSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.formSubmitted.emit(this.changePasswordForm.value);
      this.changePasswordForm.markAsPristine();
    }
  }

  private initForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      verifyPassword: ['', Validators.required]
    }, {
      validator: ValidatorHelper.matchPassword
    });
  }
}
