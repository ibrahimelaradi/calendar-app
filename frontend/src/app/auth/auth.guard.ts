import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ClientError } from '../client/client-error';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return new Promise<boolean>((res) => {
    auth.profile.subscribe({
      next(value) {
        if (value) {
          return res(true);
        }
        router.navigate(['/signin'], { replaceUrl: true });
        return res(false);
      },
      error(err) {
        if (err instanceof ClientError) {
          // TODO Handle error?
        }
        router.navigate(['/signin'], { replaceUrl: true });
        return res(false);
      },
    });
  });
};
