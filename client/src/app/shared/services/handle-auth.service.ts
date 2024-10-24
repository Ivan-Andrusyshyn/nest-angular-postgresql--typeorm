import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../env/env';
import { UserUrl } from '../enums/urls.enum';

@Injectable({
  providedIn: 'root',
})
export class HandleAuthService {
  private isAuthenticated = new BehaviorSubject(false);
  private http = inject(HttpClient);
  constructor() {}

  checkAuthenticationToken(token: string | null): Observable<boolean> {
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }

    return this.isAuthenticated.asObservable();
  }
  isAuthenticate() {
    this.http
      .get(`${environment.apiUrl}${UserUrl.mainPrefix}`)
      .pipe(
        catchError((err) => {
          this.isAuthenticated.next(false);
          throw err.message;
        })
      )
      .subscribe((response) => {
        console.log('Logged in!');
        this.isAuthenticated.next(true);
      });
    return this.isAuthenticated.asObservable();
  }

  authenticating() {
    this.isAuthenticated.next(true);
  }

  logout() {
    this.isAuthenticated.next(false);
  }
}
