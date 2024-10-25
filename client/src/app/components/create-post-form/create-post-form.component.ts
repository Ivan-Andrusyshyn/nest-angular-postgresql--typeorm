import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostFormComponent {
  @Input() postForm!: FormGroup;
  @Output() createPost = new EventEmitter<void>();

  get titleController() {
    return (
      this.postForm.controls['title'].invalid &&
      this.postForm.controls['title'].touched
    );
  }

  get contentController() {
    return (
      this.postForm.controls['content'].invalid &&
      this.postForm.controls['content'].touched
    );
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.createPost.emit();
      console.log('Post submitted:', this.postForm.value);
    } else {
      console.log('This form is not valid.');
    }
  }
}
