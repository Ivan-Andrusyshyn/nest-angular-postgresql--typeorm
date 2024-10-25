import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AsyncPipe, NgIf } from '@angular/common';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-create-post-button',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './create-post-button.component.html',
  styleUrl: './create-post-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostButtonComponent {
  private postService = inject(PostService);
  isCreatePost: Observable<boolean> = this.postService.getIsCreatePostForm();

  showCreatePostForm() {
    this.postService.showCreatePostForm();
  }
  hideCreatePostForm() {
    this.postService.hideCreatePostForm();
  }
}
