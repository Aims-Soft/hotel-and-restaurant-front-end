import { Component, Input, OnChanges, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../../../Services/userSession/userSession.Service';
import { WebsiteService } from '../../../Services/website/website.service';
import { environment } from '../../../../environmentts/environment';

@Component({
  selector: 'app-job-display',
  templateUrl: './job-display.component.html',
  styleUrl: './job-display.component.scss'
})
export class JobDisplayComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';

  isLoading: boolean = false;
  jobs: any[] = [];
  displayedJobs: any[] = [];
  showAll: boolean = false;
  openDropdownId: number | null = null; // Track which dropdown is open

  constructor(
    private router: Router,
    private usersessionservice: UserSessionService,
    private websiteservice: WebsiteService,
    private route: ActivatedRoute,
  ) {}

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.openDropdownId = null;
  }

  ngOnInit(): void {
    this.getAlljobs();
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredJobs = this.jobs;

    if (this.searchQuery.trim()) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
  }

  getAlljobs(filterTitle?: string): void {
    this.isLoading = true;
    this.websiteservice.getAdminJobs(0).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.jobs = response;
        console.log(response, 'all open jobs')
        
        if (filterTitle) {
          this.jobs = this.jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase())
          );
        }

        this.showAll = false;
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
    this.applyFilters();
  }

    goToApply(jobId: number): void {

       this.router.navigate(['/companyDiscription', jobId])
    // const user = this.usersessionservice.getUserID();

    // if (user) {
    //   this.router.navigate(['/companyDiscription', jobId]);
    // } else {
    //   this.router.navigate(['/signIn']);
    // }
  }

  // goToApply(jobId: number): void {
  //   const user = this.usersessionservice.getUserID();

  //   if (user) {
  //     this.router.navigate(['/companyDiscription', jobId]);
  //   } else {
  //     this.router.navigate(['/signIn']);
  //   }
  // }

  // Toggle dropdown menu
  toggleShareDropdown(jobId: number, event: Event): void {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === jobId ? null : jobId;
  }

  // Check if dropdown is open
  isDropdownOpen(jobId: number): boolean {
    return this.openDropdownId === jobId;
  }

  // Share job - copy link
  shareJob(job: any, event: Event): void {
    event.stopPropagation();
    
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    
    // Check if Web Share API is supported (mobile devices)
    if (navigator.share) {
      navigator.share({
        title: job.jobTitle,
        text: `Check out this job opportunity: ${job.jobTitle} at ${job.companyName}`,
        url: jobUrl
      })
      .then(() => {
        console.log('Shared successfully');
        this.openDropdownId = null;
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: Copy to clipboard
      this.copyToClipboard(jobUrl);
    }
  }

  // Copy link to clipboard
  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Job link copied to clipboard!');
        this.openDropdownId = null;
      }).catch(err => {
        console.error('Failed to copy:', err);
        this.fallbackCopyToClipboard(text);
      });
    } else {
      this.fallbackCopyToClipboard(text);
    }
  }

  // Fallback for older browsers
  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showToast('Job link copied to clipboard!');
      this.openDropdownId = null;
    } catch (err) {
      console.error('Fallback: Could not copy text', err);
      alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
  }

  // Show toast notification
  private showToast(message: string): void {
    // You can implement a proper toast service here
    // For now, using a simple alert
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Share via social media
  shareViaWhatsApp(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    const text = `Check out this job: ${job.jobTitle} at ${job.companyName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`;
    window.open(whatsappUrl, '_blank');
    this.openDropdownId = null;
  }

  shareViaLinkedIn(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
    window.open(linkedInUrl, '_blank');
    this.openDropdownId = null;
  }

  shareViaEmail(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    const subject = `Job Opportunity: ${job.jobTitle}`;
    const body = `I found this job opportunity that might interest you:\n\n${job.jobTitle} at ${job.companyName}\n\n${jobUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.openDropdownId = null;
  }
}


// import { Component, Input, OnChanges, OnInit, HostListener } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserSessionService } from '../../../Services/userSession/userSession.Service';
// import { WebsiteService } from '../../../Services/website/website.service';
// import { environment } from '../../../../environmentts/environment';

// @Component({
//   selector: 'app-job-display',
//   templateUrl: './job-display.component.html',
//   styleUrl: './job-display.component.scss'
// })
// export class JobDisplayComponent implements OnInit, OnChanges {
//   @Input() searchQuery: string = '';

//   isLoading: boolean = false;
//   jobs: any[] = [];
//   displayedJobs: any[] = [];
//   showAll: boolean = false;
//   openDropdownId: number | null = null; // Track which dropdown is open

//   constructor(
//     private router: Router,
//     private usersessionservice: UserSessionService,
//     private websiteservice: WebsiteService,
//     private route: ActivatedRoute,
//   ) {}

//   // Close dropdown when clicking outside
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//     this.openDropdownId = null;
//   }

//   ngOnInit(): void {
//     this.getAlljobs();
//   }

//   ngOnChanges(): void {
//     this.applyFilters();
//   }

//   applyFilters(): void {
//     let filteredJobs = this.jobs;

//     if (this.searchQuery.trim()) {
//       filteredJobs = filteredJobs.filter(job =>
//         job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//         job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
//       );
//     }

//     this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
//   }

//   getAlljobs(filterTitle?: string): void {
//     this.isLoading = true;
//     this.websiteservice.getAdminJobs(0).subscribe(
//       (response: any[]) => {
//         this.isLoading = false;
//         this.jobs = response;
//         console.log(response, 'all open jobs')
        
//         if (filterTitle) {
//           this.jobs = this.jobs.filter(job =>
//             job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase())
//           );
//         }

//         this.showAll = false;
//         this.applyFilters();

//         console.log('Total Jobs:', this.jobs.length);
//         console.log('Displayed Jobs:', this.displayedJobs.length);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching Jobs:', error);
//       }
//     );
//   }

//   toggleJobs(): void {
//     this.showAll = !this.showAll;
//     this.applyFilters();
//   }

//   goToApply(jobId: number): void {
//     const user = this.usersessionservice.getUserID();

//     if (user) {
//       this.router.navigate(['/companyDiscription', jobId]);
//     } else {
//       this.router.navigate(['/signIn']);
//     }
//   }

//   // Toggle dropdown menu
//   toggleShareDropdown(jobId: number, event: Event): void {
//     event.stopPropagation();
//     this.openDropdownId = this.openDropdownId === jobId ? null : jobId;
//   }

//   // Check if dropdown is open
//   isDropdownOpen(jobId: number): boolean {
//     return this.openDropdownId === jobId;
//   }

//   // Share job - copy link
//   shareJob(job: any, event: Event): void {
//     event.stopPropagation();
    
//     const jobUrl = `${environment.productUrl}companyDiscription/${job.jobID}`;
    
//     // Check if Web Share API is supported (mobile devices)
//     if (navigator.share) {
//       navigator.share({
//         title: job.jobTitle,
//         text: `Check out this job opportunity: ${job.jobTitle} at ${job.companyName}`,
//         url: jobUrl
//       })
//       .then(() => {
//         console.log('Shared successfully');
//         this.openDropdownId = null;
//       })
//       .catch((error) => console.log('Error sharing:', error));
//     } else {
//       // Fallback: Copy to clipboard
//       this.copyToClipboard(jobUrl);
//     }
//   }

//   // Copy link to clipboard
//   copyToClipboard(text: string): void {
//     if (navigator.clipboard) {
//       navigator.clipboard.writeText(text).then(() => {
//         this.showToast('Job link copied to clipboard!');
//         this.openDropdownId = null;
//       }).catch(err => {
//         console.error('Failed to copy:', err);
//         this.fallbackCopyToClipboard(text);
//       });
//     } else {
//       this.fallbackCopyToClipboard(text);
//     }
//   }

//   // Fallback for older browsers
//   private fallbackCopyToClipboard(text: string): void {
//     const textArea = document.createElement('textarea');
//     textArea.value = text;
//     textArea.style.position = 'fixed';
//     textArea.style.left = '-999999px';
//     document.body.appendChild(textArea);
//     textArea.focus();
//     textArea.select();
    
//     try {
//       document.execCommand('copy');
//       this.showToast('Job link copied to clipboard!');
//       this.openDropdownId = null;
//     } catch (err) {
//       console.error('Fallback: Could not copy text', err);
//       alert('Failed to copy link. Please copy manually: ' + text);
//     }
    
//     document.body.removeChild(textArea);
//   }

//   // Show toast notification
//   private showToast(message: string): void {
//     // You can implement a proper toast service here
//     // For now, using a simple alert
//     const toast = document.createElement('div');
//     toast.className = 'custom-toast';
//     toast.textContent = message;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.classList.add('show');
//     }, 100);
    
//     setTimeout(() => {
//       toast.classList.remove('show');
//       setTimeout(() => {
//         document.body.removeChild(toast);
//       }, 300);
//     }, 3000);
//   }

//   // Share via social media
//   shareViaWhatsApp(job: any, event: Event): void {
//     event.stopPropagation();
//     const jobUrl = `${environment.productUrl}companyDiscription/${job.jobID}`;
//     const text = `Check out this job: ${job.jobTitle} at ${job.companyName}`;
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`;
//     window.open(whatsappUrl, '_blank');
//     this.openDropdownId = null;
//   }

//   shareViaLinkedIn(job: any, event: Event): void {
//     event.stopPropagation();
//     const jobUrl = `${environment.productUrl}companyDiscription/${job.jobID}`;
//     const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
//     window.open(linkedInUrl, '_blank');
//     this.openDropdownId = null;
//   }

//   shareViaEmail(job: any, event: Event): void {
//     event.stopPropagation();
//     const jobUrl = `${environment.productUrl}companyDiscription/${job.jobID}`;
//     const subject = `Job Opportunity: ${job.jobTitle}`;
//     const body = `I found this job opportunity that might interest you:\n\n${job.jobTitle} at ${job.companyName}\n\n${jobUrl}`;
//     window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//     this.openDropdownId = null;
//   }
// }



// import { Component, Input, OnChanges, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserSessionService } from '../../../Services/userSession/userSession.Service';
// import { WebsiteService } from '../../../Services/website/website.service';

// @Component({
//   selector: 'app-job-display',
//   templateUrl: './job-display.component.html',
//   styleUrl: './job-display.component.scss'
// })
// export class JobDisplayComponent implements OnInit, OnChanges {
//   // @Input() selectedCategories: string[] = [];
//     @Input() searchQuery: string = '';

//   isLoading: boolean = false;
//   jobs: any[] = [];
//   displayedJobs: any[] = [];
//   showAll: boolean = false;
//   // searchQuery: string = '';

//   constructor(
//     private router: Router,
//     private usersessionservice: UserSessionService,
//     private websiteservice: WebsiteService,
//     private route: ActivatedRoute,
//   ) {}

//    ngOnInit(): void {
//     // Listen for search query from URL params
//     // this.route.queryParams.subscribe(params => {
//     //   this.searchQuery = params['search'] || '';
  
//     // });
//         this.getAlljobs();
//   }

//   ngOnChanges(): void {
//     this.applyFilters();
//   }

//   // applyFilters(): void {
//   //   if (this.selectedCategories.length > 0) {
//   //     // Filter by selected categories
//   //     const filteredJobs = this.jobs.filter(job =>
//   //       this.selectedCategories.includes(job.jobTitle)
//   //     );
      
//   //     // Show first 5 or all based on showAll flag
//   //     this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
//   //   } else {
//   //     // No filter applied, show first 5 or all based on showAll flag
//   //     this.displayedJobs = this.showAll ? this.jobs : this.jobs.slice(0, 4);
//   //   }
//   // }

//    applyFilters(): void {
//     let filteredJobs = this.jobs;

//     // Apply search query filter
//     if (this.searchQuery.trim()) {
//       filteredJobs = filteredJobs.filter(job =>
//         job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//         job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
//       );
//     }

//     // // Apply category filter
//     // if (this.selectedCategories.length > 0) {
//     //   filteredJobs = filteredJobs.filter(job =>
//     //     this.selectedCategories.includes(job.jobTitle)
//     //   );
//     // }

//     this.displayedJobs = this.showAll ? filteredJobs : filteredJobs.slice(0, 4);
//   }

//   getAlljobs(filterTitle?: string): void {
//     this.isLoading = true;
//     this.websiteservice.getAdminJobs(0).subscribe(
//       (response: any[]) => {
//         this.isLoading = false;
//         this.jobs = response;
//           console.log(response,'all open jobs')
//         // Apply title filter if provided
//         if (filterTitle) {
//           this.jobs = this.jobs.filter(job =>
//             job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase())
//           );
//         }

//         // Apply category filters and show initial 5 jobs
//         this.showAll = false; // Reset to show only 5
//         this.applyFilters();

//         console.log('Total Jobs:', this.jobs.length);
//         console.log('Displayed Jobs:', this.displayedJobs.length);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching Jobs:', error);
//       }
//     );
//   }

//   toggleJobs(): void {
//     this.showAll = !this.showAll;
//     this.applyFilters(); // Use the centralized filter logic
//   }

//   goToApply(jobId: number): void {
//     const user = this.usersessionservice.getUserID();

//     if (user) {
//       this.router.navigate(['/companyDiscription', jobId]);
//     } else {
//       this.router.navigate(['/signIn']);
//     }
//   }
// }