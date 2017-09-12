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
  selector: 'ba-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotForm: FormGroup;

  @Input() isSubmitting: boolean;
  @Output() formSubmitted = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.formSubmitted.emit(this.forgotForm.value);
    }
  }

  private initForm() {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        ValidatorHelper.isEmail
      ])]
    });
  }
}
