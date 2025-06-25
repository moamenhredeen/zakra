import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {IdentityService} from './identity.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const identityService = inject(IdentityService)
  const token = identityService.token
  if (token){
    const newReq = req.clone({
      headers: req.headers.append('Authorization', token),
    });
    return next(newReq);
  }
  return next(req)
}
