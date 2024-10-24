import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { Post } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-post-buttons',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './post-buttons.component.html',
  styleUrl: './post-buttons.component.scss',
})
export class PostButtonsComponent {
  @Input() post!: Post;
  @Input() isLiked!: boolean;
  @Output() showComments = new EventEmitter<number>();
  @Output() handleLike = new EventEmitter<number>();

  onLike() {
    this.handleLike.emit(this.post.id);
  }

  onComments() {
    this.showComments.emit(this.post.id);
  }
}
