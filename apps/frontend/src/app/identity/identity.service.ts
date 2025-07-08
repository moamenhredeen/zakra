import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './identity.types';
import { LoginRequest, RegisterRequest } from '@zakra/api-spec';

const TOKEN_KEY = 'auth_token';

export type LoginResponse = {
  token: string;
  record: User;
};

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  #http = inject(HttpClient);
  #authenticatedSubject = new BehaviorSubject<boolean>(false);
  #userSubject = new BehaviorSubject<User | null>(null);
  #isAuthenticated = false;

  get authenticated$() {
    return this.#authenticatedSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.#isAuthenticated;
  }

  get user$() {
    return this.#userSubject.asObservable();
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  register(payload: RegisterRequest): Observable<User> {
    return this.#http.post<User>(
      `${environment.apiUrl}/identity/register`,
      payload,
    );
  }

  verify(email: string) {
    console.log(email);
    // TODO: verify
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.#http
      .post<LoginResponse>(`${environment.apiUrl}/identity/login`, payload)
      .pipe(
        tap((response) => {
          this.#isAuthenticated = true;
          localStorage.setItem(TOKEN_KEY, response.token);
          this.#authenticatedSubject.next(true);
          this.#userSubject.next(response.record);
        }),
      );
  }

  logout() {
    this.#authenticatedSubject.next(false);
    this.#userSubject.next(null);
    localStorage.removeItem(TOKEN_KEY);
    this.#isAuthenticated = false;
  }
}
