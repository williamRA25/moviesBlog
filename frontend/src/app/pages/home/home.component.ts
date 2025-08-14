import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    PostListComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      this.posts = data;
      this.filteredPosts = data;
    });
  }

  onCategoryChange(cat: string) {
    this.filteredPosts = (cat === 'all') ? this.posts :
      this.posts.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  }

  onSearch(term: string) {
    this.filteredPosts = this.posts.filter(
      p => p.title.toLowerCase().includes(term.toLowerCase()) ||
           p.content.toLowerCase().includes(term.toLowerCase())
    );
  }
}
