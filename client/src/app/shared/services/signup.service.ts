import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../env/env';
import { User } from '../interfaces/auth.interface';
import { AuthorizationUrl } from '../enums/urls.enum';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signUp(userData: User) {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}${AuthorizationUrl.mainPrefix}/register`,
      userData
    );
  }
}
