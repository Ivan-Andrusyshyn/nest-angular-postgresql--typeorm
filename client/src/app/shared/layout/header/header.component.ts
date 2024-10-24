import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { NavList } from '../../interfaces/header.interface';
import { navHeaderList } from './header.content';
import { StorageService } from '../../services/storage.service';
import { Token, UserData } from '../../enums/storage.enum';
import { HandleAuthService } from '../../services/handle-auth.service';
import { Observable } from 'rxjs';
import { RunningLineComponent } from '../../../components/running-line/running-line.component';
import { CreatePostButtonComponent } from '../../../components/create-post-button/create-post-button.component';
import { NavListComponent } from '../../../components/nav-list/nav-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    RunningLineComponent,
    RouterLinkActive,
    AsyncPipe,
    NavListComponent,
    CreatePostButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  navHeaderList: NavList[] = navHeaderList;

  private storageService = inject(StorageService);
  private handleAuthService = inject(HandleAuthService);
  private router = inject(Router);

  isAuth!: Observable<boolean>;

  ngOnInit(): void {
    const token = this.storageService.get(Token.access_token);

    this.isAuth = this.handleAuthService.checkAuthenticationToken(token);
  }

  onLogout() {
    this.storageService.clearStorage(Token.access_token);
    this.storageService.clearStorage(UserData.userData);
    this.handleAuthService.logout();
    this.router.navigate(['login']);
  }
}
