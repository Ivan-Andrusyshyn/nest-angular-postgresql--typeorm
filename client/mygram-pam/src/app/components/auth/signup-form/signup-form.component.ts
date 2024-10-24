import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    NgIf,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  @Input() userForm!: FormGroup;
  @Output() onSubmit = new EventEmitter<void>();

  constructor() {}

  handleSubmit() {
    this.onSubmit.emit();
  }

  get personalInfo(): FormGroup {
    return this.userForm?.get('personalInfo') as FormGroup;
  }
  get controlInfo(): FormGroup {
    return this.userForm?.get('controlInfo') as FormGroup;
  }
  get securityInfo(): FormGroup {
    return this.userForm?.get('securityInfo') as FormGroup;
  }
}
