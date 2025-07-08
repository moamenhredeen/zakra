import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  #identityService = inject(IdentityService);
  #router = inject(Router);

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator(),
    },
  );

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password?.value === confirmPassword?.value
        ? null
        : { confirmPassword: false };
    };
  }

  onSubmit() {
    const value = this.registerForm.value;
    this.#identityService
      .register({
        firstName: value.firstName as string,
        lastName: value.lastName as string,
        username: 'moamenhredeen',
        email: value.email as string,
        password: value.password as string,
      })
      .subscribe({
        next: (_) => {
          this.#router.navigate(['/identity/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  get firstName(): FormControl<string> {
    return this.registerForm.get('firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.registerForm.get('lastName') as FormControl<string>;
  }

  get email(): FormControl<string> {
    return this.registerForm.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.registerForm.get('password') as FormControl<string>;
  }

  get confirmPassword(): FormControl<string> {
    return this.registerForm.get('confirmPassword') as FormControl<string>;
  }
}
