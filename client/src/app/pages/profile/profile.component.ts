import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { catchError } from 'rxjs';

import { ProfileService } from '../../shared/services/profile.service';
import { StorageService } from '../../shared/services/storage.service';
import { GenderPipe } from './gender.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [GenderPipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private storageService = inject(StorageService);

  user = signal<any>(null);

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.profileService
      .getOneUser()
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      )
      .subscribe((response) => {
        if (response.length) {
          const userResponse = response[0];
          this.user.set(userResponse);
          this.storageService.set('user-data', userResponse);
        } else {
          throw 'No user data exist!';
        }
      });
  }
}
