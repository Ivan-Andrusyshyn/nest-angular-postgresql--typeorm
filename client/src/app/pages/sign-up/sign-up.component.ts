import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { SignupFormComponent } from '../../components/auth/signup-form/signup-form.component';
import { User } from '../../shared/interfaces/auth.interface';
import { SignupService } from '../../shared/services/signup.service';

import { StorageService } from '../../shared/services/storage.service';
import { Token } from '../../shared/enums/storage.enum';
import { HandleAuthService } from '../../shared/services/handle-auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  userForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private signupService = inject(SignupService);
  private storageService = inject(StorageService);
  private handleAuthService = inject(HandleAuthService);

  ngOnInit(): void {
    this.userForm = this.fb.group({
      personalInfo: this.fb.group({
        name: ['test', [Validators.required, Validators.maxLength(30)]],
        username: ['test', [Validators.maxLength(15)]],
      }),
      controlInfo: this.fb.group({
        email: ['test@icloud.com', [Validators.required, Validators.email]],
        age: [
          +'19',
          [
            Validators.pattern('^[0-9]*$'),
            Validators.min(18),
            Validators.max(100),
          ],
        ],
      }),
      securityInfo: this.fb.group({
        password: [
          'Test123456',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        gender: ['m', Validators.required],
        access: ['user', Validators.required],
      }),
    });
  }

  onSubmit() {
    const formData: User = {
      ...this.userForm.value.personalInfo,
      ...this.userForm.value.controlInfo,
      ...this.userForm.value.securityInfo,
    };
    this.signupService
      .signUp(formData)
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      )
      .subscribe((response) => {
        if (response) {
          const token = response.access_token;
          if (!token) return;
          this.storageService.set(Token.access_token, token);
          this.handleAuthService.checkAuthenticationToken(token);
          this.router.navigate(['profile']);
        }
      });
  }
}
