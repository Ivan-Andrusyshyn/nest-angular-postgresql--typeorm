import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
