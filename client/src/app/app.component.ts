import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Token } from './shared/enums/storage.enum';
import { StorageService } from './shared/services/storage.service';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HandleAuthService } from './shared/services/handle-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private handleAuhService = inject(HandleAuthService);
  private storageService = inject(StorageService);

  ngOnInit(): void {
    const token = this.storageService.get(Token.access_token);
    if (token) {
      this.handleAuhService.isAuthenticate();
    }
  }
}
