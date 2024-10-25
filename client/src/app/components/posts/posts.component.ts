import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { catchError, Observable } from 'rxjs';

import { Post } from '../../shared/interfaces/post.interface';
import { PostButtonsComponent } from '../post-buttons/post-buttons.component';
import { CommentsComponent } from '../comments/comments.component';
import { HandleAuthService } from '../../shared/services/handle-auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { PostService } from '../../shared/services/post.service';
import { User } from '../../shared/interfaces/auth.interface';
import { UserData } from '../../shared/enums/storage.enum';
import { PostsFilterComponent } from '../posts-filter/posts-filter.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterOutlet,
    CommentsComponent,
    PostButtonsComponent,
    PostsFilterComponent,
    CommentsComponent,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  @Output() likePost = new EventEmitter<number>();

  @Input({ required: true }) set inputPosts(inputPosts: Post[] | null) {
    this.posts.set(inputPosts ?? []);
  }
  posts = signal<Post[]>([]);

  isComments = signal(false);
  isLiked = signal(false);
  currentPostId = signal<number | null>(null);
  currentUser: User | null = null;
  isAuth!: Observable<boolean>;

  private handleAuthService = inject(HandleAuthService);
  private storageService = inject(StorageService);
  private postService = inject(PostService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentUser = this.storageService.get(UserData.userData);

    this.isAuth = this.handleAuthService.isAuthenticate();
  }

  handleLike(postId: number) {
    this.postService
      .likePost(postId)
      .pipe(
        catchError((err) => {
          throw err.message;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((updatedPost: any) => {
        this.posts.update((prevPosts) =>
          prevPosts
            ? prevPosts.map((post) =>
                post.id === postId
                  ? { ...post, likes: updatedPost.likes }
                  : post
              )
            : []
        );
      });
  }
  handleComment(comment: { postId: number; comment: string }) {
    this.postService
      .commentPost(comment.postId, comment.comment)
      .pipe(
        catchError((err) => {
          throw err.message;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((updatedComment: any) => {
        this.posts.update((prevPosts) =>
          prevPosts
            ? prevPosts.map((post) =>
                post.id === comment.postId
                  ? { ...post, comments: [...post.comments, updatedComment] }
                  : post
              )
            : []
        );
      });
  }

  filterPosts(filterType: string) {
    this.posts.update((prevPosts) => {
      if (filterType === 'popular') {
        return this.postService.filterByPopular(prevPosts);
      } else if (filterType === 'new') {
        return this.postService.filterByNew(prevPosts);
      } else {
        return prevPosts;
      }
    });
  }

  isLikedByCurrentUser(post: Post): boolean {
    if (this.currentUser) {
      return post.likes.some((like) => like.userId === this.currentUser?.id);
    } else {
      return false;
    }
  }

  isCurrentPostExpended(postId: number) {
    return postId
      ? this.currentPostId() === postId && this.isComments()
      : false;
  }

  showComments(postId: number) {
    this.currentPostId.set(postId);
    this.isComments.set(true);
  }
  hideComments() {
    this.isComments.set(false);
    this.currentPostId.set(null);
  }
}
