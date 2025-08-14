import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
   imports: [CommonModule, RouterModule]
})
export class PostListComponent implements OnChanges {
  @Input() posts: Post[] = [];
  paginatedPosts: Post[] = [];
  currentPage = 1;
  postsPerPage = 6;
  totalPages = 1;

  ngOnChanges() {
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    this.changePage(1);
  }

  changePage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.postsPerPage;
    this.paginatedPosts = this.posts.slice(start, start + this.postsPerPage);
  }
}
