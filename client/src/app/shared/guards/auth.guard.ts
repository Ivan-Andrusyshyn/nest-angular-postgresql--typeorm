import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const accessToken = storageService.get('access_token');
  if (accessToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
