import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
  @Input() userForm!: FormGroup;
  @Output() onSubmit = new EventEmitter();

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  handleSubmit(): void {
    this.onSubmit.emit();
  }
}
