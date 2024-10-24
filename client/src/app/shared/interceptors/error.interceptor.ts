import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { HandleAuthService } from '../services/handle-auth.service';
import { Token, UserData } from '../enums/storage.enum';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const handleAuthService = inject(HandleAuthService);

  const maxRetries = 2;

  return next(req).pipe(
    retry(maxRetries),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        storageService.clearStorage(Token.access_token);
        storageService.clearStorage(UserData.userData);
        handleAuthService.logout();
        return throwError(() => error);
      } else {
        console.error('Retry Interceptor Functional Error:', error);
        return throwError(() => error);
      }
    })
  );
};
