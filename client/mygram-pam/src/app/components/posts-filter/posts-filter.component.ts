import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-posts-filter',
  standalone: true,
  imports: [],
  templateUrl: './posts-filter.component.html',
  styleUrl: './posts-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFilterComponent {
  @Output() filterPosts = new EventEmitter<string>();

  isFilterPopular = signal(false);
  isFilterNew = signal(false);

  handleFilterByPopular() {
    this.toggleFilterIsPopular();
    if (this.isFilterPopular()) {
      this.filterPosts.emit('popular');
    }
  }

  handleFilterByNew() {
    this.toggleFilterIsNew();
    if (this.isFilterNew()) {
      this.filterPosts.emit('new');
    }
  }

  private toggleFilterIsPopular() {
    this.isFilterPopular.update((prev) => !prev);
  }
  private toggleFilterIsNew() {
    this.isFilterNew.update((prev) => !prev);
  }
}
