// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-job-listing',
//   templateUrl: './job-listing.component.html',
//   styleUrl: './job-listing.component.scss'
// })
// export class JobListingComponent {

// }

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent {
  @Input() searchQuery: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(): void {
    this.searchChange.emit(this.searchQuery);
  }

  findJobs(): void {
    this.searchChange.emit(this.searchQuery);
  }
}