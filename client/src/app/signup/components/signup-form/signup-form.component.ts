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
import { User } from '../../../auth/models/User';

@Component({
  selector: 'ba-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  @Input() isSubmitting: boolean;
  @Output() formSubmitted = new EventEmitter<User>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  signup() {
    if (this.signupForm.valid) {
      this.formSubmitted.emit(this.signupForm.value);
    }
  }

  private initForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        ValidatorHelper.isEmail
      ])],
      password: ['', Validators.required]
    });
  }
}
