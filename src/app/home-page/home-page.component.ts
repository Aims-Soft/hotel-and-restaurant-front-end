import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

    currentSearchQuery: string = '';

  handleSearch(query: string): void {
    this.currentSearchQuery = query;
  }


  
  //   selectedCategories: string[] = [];

  // onCategoriesSelected(categories: string[]) {
  //   this.selectedCategories = categories;
  // }
}
