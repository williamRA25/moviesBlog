import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  searchTerm = '';
  categories: string[] = [];
  selectedCategory = 'all';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  onSearch() {
    this.router.navigate(['/'], { queryParams: { search: this.searchTerm } });
  }

  onCategoryChange() {
    this.router.navigate(['/'], {
      queryParams: { category: this.selectedCategory },
    });
  }
}
