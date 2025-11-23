import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/osu-auth.service';
import { inject } from '@angular/core';

export const authenticatorInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let token = authService.getToken();
  let authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;
  return next(authReq);
};
