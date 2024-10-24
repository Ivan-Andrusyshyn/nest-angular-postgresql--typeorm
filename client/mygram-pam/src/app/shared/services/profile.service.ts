import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../env/env';
import { UserUrl } from '../enums/urls.enum';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getOneUser() {
    return this.http.get<User[]>(`${environment.apiUrl}${UserUrl.mainPrefix}`);
  }
}
