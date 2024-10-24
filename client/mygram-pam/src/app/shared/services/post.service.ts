import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Comment, Post } from '../interfaces/post.interface';
import { environment } from '../../env/env';
import { PostUrl } from '../enums/urls.enum';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private isCreatePostForm = new BehaviorSubject(false);
  private http = inject(HttpClient);
  constructor() {}

  getIsCreatePostForm() {
    return this.isCreatePostForm.asObservable();
  }

  createPost(post: Post) {
    return this.http.post(`${environment.apiUrl}${PostUrl.mainPrefix}`, post);
  }
  likePost(postId: number) {
    return this.http.patch(
      `${environment.apiUrl}${PostUrl.mainPrefix}/${postId}/like`,
      {}
    );
  }
  commentPost(postId: number, commentText: string) {
    return this.http.patch(
      `${environment.apiUrl}${PostUrl.mainPrefix}/${postId}/comment`,
      { text: commentText }
    );
  }

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}${PostUrl.mainPrefix}`);
  }

  filterByPopular(posts: Post[] | null): Post[] {
    if (posts) {
      return posts.slice().sort((a, b) => b.likes.length - a.likes.length);
    } else {
      return [];
    }
  }

  filterByNew(posts: Post[] | null): Post[] {
    if (posts) {
      return posts
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } else {
      return [];
    }
  }

  showCreatePostForm() {
    this.isCreatePostForm.next(true);
  }

  hideCreatePostForm() {
    this.isCreatePostForm.next(false);
  }
}
