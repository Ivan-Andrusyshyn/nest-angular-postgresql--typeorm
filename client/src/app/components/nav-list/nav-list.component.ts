import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavList } from '../../shared/interfaces/header.interface';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [NgIf, RouterLink, NgFor, RouterLinkActive],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  @Input() isAuth: boolean = false;
  @Input() navHeaderList!: NavList[];
  @Output() onLogout = new EventEmitter<void>();

  handleLogout() {
    this.onLogout.emit();
  }
}
