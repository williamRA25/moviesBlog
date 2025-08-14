import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.postService.getById(id).subscribe(p => this.post = p);
  }
}
