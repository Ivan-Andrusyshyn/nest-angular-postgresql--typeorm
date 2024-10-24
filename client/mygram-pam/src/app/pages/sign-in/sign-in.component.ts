import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SigninFormComponent } from '../../components/auth/signin-form/signin-form.component';
import { SigninService } from '../../shared/services/signin.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { catchError } from 'rxjs';
import { Token } from '../../shared/enums/storage.enum';
import { HandleAuthService } from '../../shared/services/handle-auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SigninFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  userForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private signInService = inject(SigninService);
  private storageService = inject(StorageService);
  private handleAuthService = inject(HandleAuthService);

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['test@icloud.com', [Validators.required, Validators.email]],
      password: ['Test123456', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.signInService
        .signIn(formData)
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
}
