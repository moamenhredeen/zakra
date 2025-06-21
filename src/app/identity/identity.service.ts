import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {User} from './identity.types';


const TOKEN_KEY = 'auth_token'

export type LoginPayload = {
  identity: string,
  password: string
}

export type RegisterPayload = {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  emailVisibility: boolean
}

export type LoginResponse = {
  token: string,
  record: User
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  #http = inject(HttpClient)
  #authenticatedSubject = new BehaviorSubject<boolean>(false)
  #userSubject = new BehaviorSubject<User | null>(null)
  #isAuthenticated = false

  get authenticated$() {
    return this.#authenticatedSubject.asObservable()
  }

  get isAuthenticated(): boolean {
    return this.#isAuthenticated
  }

  get user$() {
    return this.#userSubject.asObservable()
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.#http.post<User>(`${environment.apiUrl}/collections/users/records`, payload)
  }

  verify(email: string){
    return this.#http.post<void>(`${environment.apiUrl}/collections/users/request-verification`, {email})
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.#http.post<LoginResponse>(`${environment.apiUrl}/collections/users/auth-with-password`, payload).pipe(
      tap(response => {
        this.#isAuthenticated = true
        localStorage.setItem(TOKEN_KEY, response.token)
        this.#authenticatedSubject.next(true)
        this.#userSubject.next(response.record)
      })
    )
  }

  logout() {
    this.#authenticatedSubject.next(false)
    this.#userSubject.next(null)
    localStorage.removeItem(TOKEN_KEY)
    this.#isAuthenticated = false
  }
}
