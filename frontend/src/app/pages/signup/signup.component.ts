import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { AuthService } from '../../auth/auth.service';
import { SignupParams } from '@calendar-app/schemas/dtos/auth.dto';
import { AsyncPipe } from '@angular/common';
import { ClientError } from '../../client/client-error';
import { mapClientErrorToFormGroupControls } from '../../utils/form-control';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLabelModule,
    TuiErrorModule,
    AsyncPipe,
    TuiFieldErrorPipeModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      fullName: new FormControl(''),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      passwordConfirm: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      updateOn: 'submit',
      validators: [
        (form) => {
          if (
            form.get('password')?.value &&
            form.get('passwordConfirm')?.value &&
            form.get('password')?.value !== form.get('passwordConfirm')?.value
          ) {
            form.get('password')?.setErrors({ 'password-match': true });
            form.get('passwordConfirm')?.setErrors({ 'password-match': true });
            return null;
          }
          return null;
        },
      ],
    }
  );
  constructor(private router: Router, private auth: AuthService) {}

  onSignInClick() {
    this.router.navigate(['/signin']);
  }

  onSignUpSubmit() {
    if (!this.signupForm.valid) return;
    const errorHandler = mapClientErrorToFormGroupControls(this.signupForm);
    const router = this.router;
    const { passwordConfirm, ...values } = this.signupForm.value;
    this.auth.signUp(values as SignupParams).subscribe({
      complete() {
        router.navigate(['/home'], { replaceUrl: true });
      },
      error(err) {
        if (err instanceof ClientError) {
          errorHandler(err);
        }
      },
    });
  }
}
