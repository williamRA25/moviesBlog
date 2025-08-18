import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PostListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postService.getAll().subscribe((data) => {
      this.posts = data;
      this.filteredPosts = data;

      // Suscribirse a los query params
      this.route.queryParams.subscribe((params) => {
        const search = params['search'] || '';
        const category = params['category'] || 'all';
        this.applyFilters(search, category);
      });
    });
  }

  applyFilters(search: string, category: string) {
    this.filteredPosts = this.posts.filter((p) => {
      const matchesCategory =
        category === 'all' ||
        p.category.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
