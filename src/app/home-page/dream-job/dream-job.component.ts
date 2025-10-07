import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-dream-job',
  templateUrl: './dream-job.component.html',
  styleUrl: './dream-job.component.scss'
})
export class DreamJobComponent {

    @Input() searchQuery: string = '';


    selectedCategories: string[] = [];

  onCategoriesSelected(categories: string[]) {
    this.selectedCategories = categories;
  }

}
