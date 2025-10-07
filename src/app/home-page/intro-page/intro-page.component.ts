// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-intro-page',
//   templateUrl: './intro-page.component.html',
//   styleUrl: './intro-page.component.scss',
// })
// export class IntroPageComponent {

//   searchQuery: string = '';

//   constructor(
//     private router:Router,
//   ){

//   }
//    findJobs(): void {
//     if (this.searchQuery.trim()) {
//       // Navigate to jobs section with search query
//       this.router.navigate(['/jobs'], {
//         queryParams: { search: this.searchQuery }
//       });
//     } else {
//       // Navigate to jobs section without filter
//       this.router.navigate(['/jobs']);
//     }
//   }

//   // If jobs are on the same page, scroll to them
//   scrollToJobs(): void {
//     const jobSection = document.getElementById('jobs-section');
//     if (jobSection) {
//       jobSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   }
// }

// import { Component, Output, EventEmitter } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-intro-page',
//   templateUrl: './intro-page.component.html',
//   styleUrl: './intro-page.component.scss',
// })
// export class IntroPageComponent {
//   searchQuery: string = '';
//   @Output() searchChange = new EventEmitter<string>();

//   constructor(private router: Router) {}

//   onSearchInput(): void {
//     // Emit search query on every input change
//     this.searchChange.emit(this.searchQuery);
//   }

//   findJobs(): void {
//     // Scroll to jobs section on button click
//     this.scrollToJobs();
//     this.searchChange.emit(this.searchQuery);
//   }

//   scrollToJobs(): void {
//     const jobSection = document.getElementById('jobs-section');
//     if (jobSection) {
//       jobSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   }
// }

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(): void {
    this.searchChange.emit(this.searchQuery);
  }

  findJobs(): void {
    this.scrollToJobs();
    this.searchChange.emit(this.searchQuery);
  }

  scrollToJobs(): void {
    const jobSection = document.getElementById('jobs-section');
    if (jobSection) {
      jobSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}