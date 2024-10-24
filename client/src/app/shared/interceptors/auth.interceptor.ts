import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { StorageService } from '../services/storage.service';
import { Token, UserData } from '../enums/storage.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  const accessToken = storageService.get(Token.access_token);

  let newReq;

  if (accessToken) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(newReq);
  } else {
    newReq = req.clone({
      setHeaders: {},
    });
    storageService.clearStorage(Token.access_token);
    storageService.clearStorage(UserData.userData);
    return next(newReq);
  }
};
