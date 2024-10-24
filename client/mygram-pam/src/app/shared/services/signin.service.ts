import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../env/env';
import { AuthorizationUrl } from '../enums/urls.enum';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private http = inject(HttpClient);

  signIn(userData: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}${AuthorizationUrl.mainPrefix}/login`,
      userData
    );
  }
}
