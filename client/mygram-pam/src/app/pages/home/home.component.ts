import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { openCloseAnimation } from './animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post } from '../../shared/interfaces/post.interface';
import { PostService } from '../../shared/services/post.service';
import { CreatePostFormComponent } from '../../components/create-post-form/create-post-form.component';
import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostsComponent, AsyncPipe, CreatePostFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [openCloseAnimation],
})
export class HomeComponent implements OnInit {
  postForm!: FormGroup;

  private postService = inject(PostService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  isCreatePostForm: Observable<boolean> =
    this.postService.getIsCreatePostForm();
  posts = signal<Post[] | null>(null);

  ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(
        catchError((err) => {
          throw err.message;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response) => {
        this.posts.set(response);
      });

    this.postForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  createPost() {
    this.postService
      .createPost(this.postForm.value)
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      )
      .subscribe((response) => {
        this.postForm.reset();
      });
  }
}
