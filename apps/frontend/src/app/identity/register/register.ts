import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {IdentityService} from '../identity.service';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
})
export class Register {

  #identityService = inject(IdentityService)
  #router = inject(Router)

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: this.passwordMatchValidator()
  })


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password?.value === confirmPassword?.value ? null : {confirmPassword: false}
    };
  }

  onSubmit() {
    const value = this.registerForm.value;
    const subscription = this.#identityService.register({
      firstName: value.name as string,
      lastName: value.name as string,
      username: "moamenhredeen",
      email: value.email as string,
      password: value.password as string,
    }).subscribe({
      next: res => {
        this.#router.navigate(['/identity/verify-email'])
      },
      error: err => {
        console.log(err)
      },
    })
  }

  get name(): FormControl<string>  {
    return this.registerForm.get('name') as FormControl<string>
  }

  get email(): FormControl<string>  {
    return this.registerForm.get('email') as FormControl<string>
  }

  get password(): FormControl<string>  {
    return this.registerForm.get('password') as FormControl<string>
  }

  get confirmPassword() : FormControl<string> {
    return this.registerForm.get('confirmPassword') as FormControl<string>
  }
}
