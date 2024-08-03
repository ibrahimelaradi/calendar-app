import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginParams } from '@calendar-app/schemas/dtos/auth.dto';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { mapClientErrorToFormGroupControls } from '../../utils/form-control';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { ClientError } from '../../client/client-error';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiButtonModule,
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  signInForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(private router: Router, private auth: AuthService) {}

  onSubmitSignInForm() {
    if (this.signInForm.invalid) {
      return;
    }

    const router = this.router;
    const errorHandler = mapClientErrorToFormGroupControls(this.signInForm);
    const values = this.signInForm.value as LoginParams;

    this.auth.logIn(values).subscribe({
      complete() {
        console.log('should go to home');
        router.navigate(['/home'], { replaceUrl: true });
      },
      error(err) {
        if (err instanceof ClientError) {
          errorHandler(err);
        }
      },
    });
  }

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }
}
