import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { openCloseAnimation } from './animation';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Comment } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [openCloseAnimation],
})
export class CommentsComponent implements OnInit {
  @Output() hideComments = new EventEmitter<void>();
  @Output() handleComment = new EventEmitter();

  @Input() postId!: number;
  @Input() isComments: boolean = false;
  @Input() comments: Comment[] | null = null;

  private fb = inject(FormBuilder);

  commentForm!: FormGroup;

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      const form = this.commentForm.value;
      this.handleComment.emit({ postId: this.postId, ...form });
      this.commentForm.reset();
    } else {
      throw ' Something wrang with form.';
    }
  }

  offComments() {
    this.hideComments.emit();
  }
}
