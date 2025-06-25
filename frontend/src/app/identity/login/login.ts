import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IdentityService} from '../identity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
})
export class Login {

  #identityService = inject(IdentityService)
  #router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit() {
    if (this.loginForm.invalid) return
    const value = this.loginForm.value;
    this.#identityService.login({
      identity: value.email as string,
      password: value.password as string
    }).subscribe({
      next: res => {
        this.#router.navigate(['/app/bookmark'])
      },
      error: err => {

      }
    })
  }

  get email(): FormControl<string>  {
    return this.loginForm.get('email') as FormControl<string>
  }

  get password(): FormControl<string>  {
    return this.loginForm.get('password') as FormControl<string>
  }
}
