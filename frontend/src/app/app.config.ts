import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpFeatureKind,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { refreshAuthInterceptor } from './client/refresh-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([refreshAuthInterceptor])),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
  ],
};
