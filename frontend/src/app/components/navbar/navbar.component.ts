import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

  @Output() search = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onCategoryChange() {
    this.categoryChange.emit(this.selectedCategory);
  }
}
