import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ClientError } from '../client/client-error';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return new Promise<boolean>((res) => {
    auth.profile.subscribe({
      next(value) {
        if (value) {
          router.navigate(['/home'], { replaceUrl: true });
          return res(false);
        }
        return res(true);
      },
      error(err) {
        if (err instanceof ClientError) {
          // TODO Handle error?
        }
        return res(true);
      },
    });
  });
};
