// import { Component, Input , OnChanges, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserSessionService } from '../../../Services/userSession/userSession.Service';
// import { WebsiteService } from '../../../Services/website/website.service';

// @Component({
//   selector: 'app-job-display',
//   templateUrl: './job-display.component.html',
//   styleUrl: './job-display.component.scss'
// })
// export class JobDisplayComponent implements OnInit , OnChanges {
//     @Input() selectedCategories: string[] = [];

//     isLoading: boolean = false;
//  jobs: any[] = [];

//   displayedJobs: any[] = [];  
//   showAll: boolean = false; 


//   ngOnChanges(): void {
//     this.applyFilters();
//   }


//     applyFilters(): void {
//     if (this.selectedCategories.length > 0) {
//       this.displayedJobs = this.jobs.filter(job =>
//         this.selectedCategories.includes(job.jobTitle)
//       );
//     } else {
//       this.displayedJobs = this.jobs.slice(0, 5);
//     }
//   }
  

//    ngOnInit(): void {
//     this.getAlljobs();
//   }

// //  ngOnInit(): void {
// //   this.route.queryParams.subscribe(params => {
// //     const jobTitle = params['title'];
// //     if (jobTitle) {
// //       this.getAlljobs(jobTitle);  // Pass filter
// //     } else {
// //       this.getAlljobs(); // Load all if no filter
// //     }
// //   });
// // }
//    constructor(private router:Router,
//     private usersessionservice:UserSessionService,
//     private websiteservice:WebsiteService,
//     private route: ActivatedRoute,
//    ){

//    }


//    goToApply(jobId: number): void {
//   const user = this.usersessionservice.getUserID(); 

//   if (user) {

//     this.router.navigate(['/companyDiscription', jobId]);
//   } else {
  
//     this.router.navigate(['/signIn']);
//   }
// }

// getAlljobs(filterTitle?: string): void {
//   this.isLoading = true;
//   this.websiteservice.getAlljobs().subscribe(
//     (response: any[]) => {
//       this.isLoading = false;
//       this.jobs = response;
//       this.applyFilters();

//       if (filterTitle) {
//         this.jobs = this.jobs.filter(job =>
//           job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase())
//         );
//       }

//       this.displayedJobs = this.jobs.slice(0, 5);
//       console.log(this.jobs, 'Filtered Jobs');
//     },
//     (error: any) => {
//       this.isLoading = false;
//       console.error('Error fetching Jobs:', error);
//     }
//   );
// }



//   //   getAlljobs(): void {
//   //   this.isLoading = true;
//   //   this.websiteservice.getAlljobs().subscribe(
//   //     (response: any[]) => {
     
//   //       this.isLoading = false;

        
//   //          this.jobs = response.map((jobs) => ({
//   //         ...jobs,
       
//   //       }));

//   //        this.displayedJobs = this.jobs.slice(0, 5);

//   //       console.log(this.jobs, ' ALL jobs');
//   //     },
//   //     (error: any) => {
//   //       this.isLoading = false;
//   //       console.error('Error fetching  Jobs:', error);
//   //     }
//   //   );
//   // }

//     toggleJobs(): void {
//     this.showAll = !this.showAll;
//     if (this.showAll) {
//       this.displayedJobs = this.jobs;  
//     } else {
//       this.displayedJobs = this.jobs.slice(0, 5); 
//     }
//   }


// }

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../../../Services/userSession/userSession.Service';
import { WebsiteService } from '../../../Services/website/website.service';

@Component({
  selector: 'app-job-display',
  templateUrl: './job-display.component.html',
  styleUrl: './job-display.component.scss'
})
export class JobDisplayComponent implements OnInit, OnChanges {
  // @Input() selectedCategories: string[] = [];
    @Input() searchQuery: string = '';

  isLoading: boolean = false;
  jobs: any[] = [];
  displayedJobs: any[] = [];
  showAll: boolean = false;
  // searchQuery: string = '';

  constructor(
    private router: Router,
    private usersessionservice: UserSessionService,
    private websiteservice: WebsiteService,
    private route: ActivatedRoute,
  ) {}

   ngOnInit(): void {
    // Listen for search query from URL params
    // this.route.queryParams.subscribe(params => {
    //   this.searchQuery = params['search'] || '';
  
    // });
        this.getAlljobs();
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  // applyFilters(): void {
  //   if (this.selectedCategories.length > 0) {
  //     // Filter by selected categories
  //     const filteredJobs = this.jobs.filter(job =>
  //       this.selectedCategories.includes(job.jobTitle)
  //     );
      
  //     // Show first 5 or all based on showAll flag
  //     this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
  //   } else {
  //     // No filter applied, show first 5 or all based on showAll flag
  //     this.displayedJobs = this.showAll ? this.jobs : this.jobs.slice(0, 4);
  //   }
  // }

   applyFilters(): void {
    let filteredJobs = this.jobs;

    // Apply search query filter
    if (this.searchQuery.trim()) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // // Apply category filter
    // if (this.selectedCategories.length > 0) {
    //   filteredJobs = filteredJobs.filter(job =>
    //     this.selectedCategories.includes(job.jobTitle)
    //   );
    // }

    this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
  }

  getAlljobs(filterTitle?: string): void {
    this.isLoading = true;
    this.websiteservice.getAdminJobs(0).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.jobs = response;

        // Apply title filter if provided
        if (filterTitle) {
          this.jobs = this.jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase())
          );
        }

        // Apply category filters and show initial 5 jobs
        this.showAll = false; // Reset to show only 5
        this.applyFilters();

        console.log('Total Jobs:', this.jobs.length);
        console.log('Displayed Jobs:', this.displayedJobs.length);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }

  toggleJobs(): void {
    this.showAll = !this.showAll;
    this.applyFilters(); // Use the centralized filter logic
  }

  goToApply(jobId: number): void {
    const user = this.usersessionservice.getUserID();

    if (user) {
      this.router.navigate(['/companyDiscription', jobId]);
    } else {
      this.router.navigate(['/signIn']);
    }
  }
}