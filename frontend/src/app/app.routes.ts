import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { noAuthGuard } from './auth/no-auth.guard';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: 'signin', canActivate: [noAuthGuard], component: LandingComponent },
  { path: 'signup', canActivate: [noAuthGuard], component: SignupComponent },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'search',
    canActivate: [authGuard],
    component: SearchComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
