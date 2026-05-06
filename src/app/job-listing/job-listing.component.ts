// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-job-listing',
//   templateUrl: './job-listing.component.html',
//   styleUrl: './job-listing.component.scss'
// })
// export class JobListingComponent {

// }

import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
// import { environment } from '../../environmentts/environment';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent  implements OnInit {
  @Input() searchQuery: string = '';

  isLoading: boolean = false;
  popularCategories: any[] = []

ngOnInit(): void {
  this.getPopularCategory();
}

  constructor(
      // private router: Router,
      // private usersessionservice: UserSessionService,
      private websiteservice: WebsiteService,
      // private route: ActivatedRoute,
    ) {}
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(): void {
    this.searchChange.emit(this.searchQuery);
  }

  findJobs(): void {
    this.searchChange.emit(this.searchQuery);
  }

  getPopularCategory(): void {
  
    this.websiteservice.getPopularCategories().subscribe(
      (response: any[]) => {
        // this.isLoading = false;
        this.popularCategories = response;
        // this.showAll = false;
        
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }
}