import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { ClientError } from './client-error';

export const refreshAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error: HttpErrorResponse) => {
      // FIXME Should check for X-Token-Expired header instead
      if (error.status === 401 && error.error?.message === 'Token expired') {
        return auth
          .refresh()
          .pipe(switchMap(() => next(req.clone({ withCredentials: true }))));
      } else {
        return throwError(() => error);
      }
    }),
    // TODO Separate ClientError handler into its own interceptor?
    catchError(ClientError.handleError)
  );
};
