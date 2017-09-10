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
import { Credentials } from '../../../auth/models/Credentials';

@Component({
  selector: 'ba-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;

  @Input() submitting: boolean;
  @Output() formSubmitted = new EventEmitter<Credentials>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  signin() {
    if (this.signinForm.valid) {
      this.formSubmitted.emit(this.signinForm.value);
    }
  }

  private initForm() {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([ Validators.required, ValidatorHelper.isEmail ])],
      password: ['', Validators.required]
    });
  }
}
