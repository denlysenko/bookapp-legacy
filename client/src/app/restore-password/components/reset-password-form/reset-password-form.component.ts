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
  selector: 'ba-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordFormComponent implements OnInit {
  resetPasswordForm: FormGroup;

  @Input() isSubmitting: boolean;

  @Output() formSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.formSubmitted.emit(this.resetPasswordForm.value);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      verifyPassword: ['', Validators.required]
    }, {
      validator: ValidatorHelper.matchPassword
    });
  }
}
