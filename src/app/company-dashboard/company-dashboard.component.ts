// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
// import { RegisterUserService } from '../Services/register user/register-user.service';
// import { JobService } from '../Services/Job/Job.service';
// import { CreateJobsComponent } from '../create-jobs/create-jobs.component';
// import * as XLSX from 'xlsx';

// import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

// @Component({
//   selector: 'app-company-dashboard',
//   templateUrl: './company-dashboard.component.html',
//   styleUrl: './company-dashboard.component.css',
// })
// export class CompanyDashboardComponent implements OnInit {
//   // @ViewChild(CreateJobsComponent) jobform: any;

//   isLoading: boolean = false;
//   Activejobs: any[] = [];
//   job: any = {};
//   searchText: string = ''; 
//    companyID: number = 0;
//     statusList: any[] = [];
//   selectedStatus: number | null = null;
//   exportStatus: string = 'all';


//   constructor(
//     private JobService: JobService,
//     private userSessionService: UserSessionService,
//     private CompanyRegistrationService: CompanyRegistrationService,
//     private RegisterUserService: RegisterUserService,
//     private CompanyDashboardService: CompanyDashboardService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//      this.companyID = this.userSessionService.getCompanyID() || 1; 
    
//     this.getTotalJobs(this.companyID);
//     this.getActivejobs(this.companyID);

//       this.getStatusList();
//   }

//   editJob(job: any): void {
//     console.log('Clicked Job:', job);
//     // this.router.navigate(['/createJobs'], { queryParams: { jobID: job.jobID } });
//     this.router.navigate(['/createJobs'], { state: { job } });
//   }

//   getTotalJobs(companyID: number): void {
//     this.isLoading = true;
//     this.CompanyDashboardService.getTotalJobs(companyID).subscribe(
//       (response: any[]) => {
//         console.log('Company ID:', companyID);
//         this.isLoading = false;
//         this.job = response;
//         console.log(response, 'Job Category');
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching JobCategory:', error);
//       }
//     );
//   }


// successMessage: string | null = null;
// errorMessage: string | null = null;

// onDelete(job: any): void {
//   if (!job?.jobID) return;

//   const ok = window.confirm('Are you sure you want to delete this job?');
//   if (!ok) return;

//   this.isLoading = true;

//   const payload = {
//     jobTitle: '',
//     companyID: 0,
//     jobTypeID: 0,
//     jobSpaceID: 0,
//     experienceID: 0,
//     educationReq: '',
//     salaryRange: '',
//     postingDate: '',
//     expireDate: '',
//     cityID: 0,
//     countryID: 0,
//     jobStatusID: 0,
//     location: '',
//     responsibilities: '',
//     requirements: '',
//     benefitjson: '',
//     skilljson: '',
//     userID: this.userSessionService.getUserID(),
//     spType: 'DELETE',
//     jobID: Number(job.jobID),
//   };

//   this.JobService.saveJob(payload).subscribe({
//     next: (res) => {
//       this.isLoading = false;
//       this.successMessage = 'Job deleted successfully ✅';
//       this.errorMessage = null;

//       this.getActivejobs(this.companyID);
//         this.getTotalJobs(this.companyID);

//       // Auto hide message after 3s
//       setTimeout(() => this.successMessage = null, 3000);
//     },
//     error: (err) => {
//       this.isLoading = false;
//       this.successMessage = null;
//       this.errorMessage = '❌ Failed to delete job. Please try again.';

//       setTimeout(() => this.errorMessage = null, 3000);
//     }
//   });
// }

// getActivejobs(companyID: number): void {
//     this.isLoading = true;
//     this.CompanyDashboardService. getComapnyJobs(companyID).subscribe(
//       (response: any[]) => {
//         this.isLoading = false;
//         this.Activejobs = response;
//         console.log(`Active jobs for company ${companyID}:`, response);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching Active Jobs:', error);
//       }
//     );
//   }

//     getStatusList(): void {
//     this.isLoading = true;
//     this.CompanyDashboardService.getStatus().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.statusList = response;
//         console.log('Status List:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching status list:', error);
     
//       }
//     );
//   }

//   // Method to handle status change
//   // onStatusChange(job: any): void {
//   //   console.log('Selected Status:', this.selectedStatus);
//   //   // Add any additional logic you need when status changes
//   // }


//   onStatusChange(job: any): void {
//   console.log('Status changed for job:', job);
//   console.log('New Status ID:', job.jobStatusID);

//   if (!job.jobStatusID) {
//     this.errorMessage = 'Please select a valid status';
//     setTimeout(() => this.errorMessage = null, 3000);
//     return;
//   }

//   this.isLoading = true;

//   // ✅ FIXED: Use the job parameter passed to the method
//   const payload = {
//     jobID: job.jobID,              // ✅ Use job from parameter, not this.job
//     jobTitle: job.jobTitle,         // ✅ Use job from parameter
//     jobStatusID: job.jobStatusID,   // ✅ Use the selected status ID, not entire array
//     userID: this.userSessionService.getUserID(),
//     spType: 'UPDATE',               // ✅ Uppercase to match your pattern
//   };

//   console.log('Payload being sent:', payload); // Add this for debugging

//   this.CompanyDashboardService.updateJobStatus(payload).subscribe({
//     next: (response) => {
//       console.log(response, 'save status');
//       this.isLoading = false;
//       this.successMessage = 'Job status updated successfully ✅';
//       this.errorMessage = null;

//       // Refresh the job list to show updated status
//       this.getActivejobs(this.companyID);
//       this.getTotalJobs(this.companyID);

//       setTimeout(() => this.successMessage = null, 3000);
//     },
//     error: (error) => {
//       this.isLoading = false;
//       this.successMessage = null;
//       this.errorMessage = '❌ Failed to update job status. Please try again.';
//       console.error('Error updating job status:', error);

//       setTimeout(() => this.errorMessage = null, 3000);
//     }
//   });
// }



// isJobExpired(expireDate: string): boolean {
//   if (!expireDate) return false;
  
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset time to start of day
  
//   const jobExpiry = new Date(expireDate);
//   jobExpiry.setHours(0, 0, 0, 0); // Reset time to start of day
  
//   return jobExpiry < today;
// }
//   // getActivejobs(): void {
//   //   this.isLoading = true;
//   //   this.CompanyDashboardService.getActivejobs(0).subscribe(
//   //     (response: any[]) => {
//   //       this.isLoading = false;
//   //       this.Activejobs = response;
//   //       // console.log(response, 'Job Category');
//   //     },
//   //     (error: any) => {
//   //       this.isLoading = false;
//   //       // console.error('Error fetching JobCategory:', error);
//   //     }
//   //   );
//   // }


//   exportJobs(): void {
//   let jobsToExport = this.Activejobs;

//   // Filter by status if not 'all'
//   if (this.exportStatus !== 'all') {
//     jobsToExport = this.Activejobs.filter(job => {
//       const statusTitle = job.jobStatusTitle?.toLowerCase();
//       return statusTitle === this.exportStatus;
//     });
//   }

//   if (jobsToExport.length === 0) {
//     alert(`No jobs found with status: ${this.exportStatus === 'all' ? 'All' : this.exportStatus}`);
//     return;
//   }

//   // Prepare data for Excel
//   const exportData = jobsToExport.map((job, index) => ({
//     'S.No': index + 1,
//     'Job Title': job.jobTitle || '',
//     'Job Category': job.jobCategoryTitle || '',
//     'Job Type': job.jobTypeTitle || '',
//     'Workspace': job.jobSpaceTitle || '',
//     'Experience': job.experienceRange || '',
//     'Salary Range': job.salaryRange || '',
//     'Location': `${job.cityName || ''}, ${job.countryName || ''}`,
//     'Status': job.jobStatusTitle || '',
//     'Posted Date': job.postingDate ? new Date(job.postingDate).toLocaleDateString() : '',
//     'Expiry Date': job.expireDate ? new Date(job.expireDate).toLocaleDateString() : '',
//     'Is Expired': this.isJobExpired(job.expireDate) ? 'Yes' : 'No',
//     'Total Applicants': job.totalApplicants || 0,
//   }));

//   // Create workbook and worksheet
//   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
//   const wb: XLSX.WorkBook = XLSX.utils.book_new();

//   // Set column widths
//   const colWidths = [
//     { width: 8 },  // S.No
//     { width: 30 }, // Job Title
//     { width: 20 }, // Category
//     { width: 15 }, // Type
//     { width: 15 }, // Workspace
//     { width: 15 }, // Experience
//     { width: 20 }, // Salary
//     { width: 25 }, // Location
//     { width: 12 }, // Status
//     { width: 15 }, // Posted Date
//     { width: 15 }, // Expiry Date
//     { width: 12 }, // Is Expired
//     { width: 15 }, // Applicants
//   ];
//   ws['!cols'] = colWidths;

//   XLSX.utils.book_append_sheet(wb, ws, 'Jobs');

//   // Generate filename with timestamp and status
//   const statusText = this.exportStatus === 'all' ? 'All' : this.exportStatus.charAt(0).toUpperCase() + this.exportStatus.slice(1);
//   const fileName = `Jobs_${statusText}_${new Date().toISOString().split('T')[0]}.xlsx`;
  
//   XLSX.writeFile(wb, fileName);
  
//   this.successMessage = `✅ Exported ${jobsToExport.length} jobs successfully!`;
//   setTimeout(() => this.successMessage = null, 3000);
// }

// // Get jobs count by status
// getJobsCountByStatus(status: string): number {
//   if (status === 'all') return this.Activejobs.length;
  
//   return this.Activejobs.filter(job => 
//     job.jobStatusTitle?.toLowerCase() === status.toLowerCase()
//   ).length;
// }
// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { JobService } from '../Services/Job/Job.service';
import { CreateJobsComponent } from '../create-jobs/create-jobs.component';
import * as XLSX from 'xlsx';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent implements OnInit {
  isLoading: boolean = false;
  Activejobs: any[] = [];
  filteredJobs: any[] = [];
  job: any = {};
  searchText: string = ''; 
  companyID: number = 0;
  statusList: any[] = [];
  selectedStatus: number | null = null;
  
  // Filter properties
  showFilterDropdown: boolean = false;
  statusFilters = {
    open: false,
    close: false,
    pause: false
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyID = this.userSessionService.getCompanyID() || 1; 
    
    this.getTotalJobs(this.companyID);
    this.getActivejobs(this.companyID);
    this.getStatusList();
  }

  editJob(job: any): void {
    console.log('Clicked Job:', job);
    this.router.navigate(['/createJobs'], { state: { job } });
  }

  getTotalJobs(companyID: number): void {
    this.isLoading = true;
    this.CompanyDashboardService.getTotalJobs(companyID).subscribe(
      (response: any[]) => {
        console.log('Company ID:', companyID);
        this.isLoading = false;
        this.job = response;
        console.log(response, 'Job Category');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching JobCategory:', error);
      }
    );
  }

  onDelete(job: any): void {
    if (!job?.jobID) return;

    const ok = window.confirm('Are you sure you want to delete this job?');
    if (!ok) return;

    this.isLoading = true;

    const payload = {
      jobTitle: '',
      companyID: 0,
      jobTypeID: 0,
      jobSpaceID: 0,
      experienceID: 0,
      educationReq: '',
      salaryRange: '',
      postingDate: '',
      expireDate: '',
      cityID: 0,
      countryID: 0,
      jobStatusID: 0,
      location: '',
      responsibilities: '',
      requirements: '',
      benefitjson: '',
      skilljson: '',
      userID: this.userSessionService.getUserID(),
      spType: 'DELETE',
      jobID: Number(job.jobID),
    };

    this.JobService.saveJob(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Job deleted successfully ✅';
        this.errorMessage = null;

        this.getActivejobs(this.companyID);
        this.getTotalJobs(this.companyID);

        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.successMessage = null;
        this.errorMessage = '❌ Failed to delete job. Please try again.';

        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }

  getActivejobs(companyID: number): void {
    this.isLoading = true;
    this.CompanyDashboardService.getComapnyJobs(companyID).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.Activejobs = response;
        this.applyFilters(); // Apply filters after getting data
        console.log(`Active jobs for company ${companyID}:`, response);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Active Jobs:', error);
      }
    );
  }

  getStatusList(): void {
    this.isLoading = true;
    this.CompanyDashboardService.getStatus().subscribe(
      (response) => {
        this.isLoading = false;
        this.statusList = response;
        console.log('Status List:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching status list:', error);
      }
    );
  }

  onStatusChange(job: any): void {
    console.log('Status changed for job:', job);
    console.log('New Status ID:', job.jobStatusID);

    if (!job.jobStatusID) {
      this.errorMessage = 'Please select a valid status';
      setTimeout(() => this.errorMessage = null, 3000);
      return;
    }

    this.isLoading = true;

    const payload = {
      jobID: job.jobID,
      jobTitle: job.jobTitle,
      jobStatusID: job.jobStatusID,
      userID: this.userSessionService.getUserID(),
      spType: 'UPDATE',
    };

    console.log('Payload being sent:', payload);

    this.CompanyDashboardService.updateJobStatus(payload).subscribe({
      next: (response) => {
        console.log(response, 'save status');
        this.isLoading = false;
        this.successMessage = 'Job status updated successfully ✅';
        this.errorMessage = null;

        this.getActivejobs(this.companyID);
        this.getTotalJobs(this.companyID);

        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.successMessage = null;
        this.errorMessage = '❌ Failed to update job status. Please try again.';
        console.error('Error updating job status:', error);

        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }

  isJobExpired(expireDate: string): boolean {
    if (!expireDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const jobExpiry = new Date(expireDate);
    jobExpiry.setHours(0, 0, 0, 0);
    
    return jobExpiry < today;
  }

  // Toggle filter dropdown
  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  // Apply filters based on selected checkboxes
  applyFilters(): void {
    const hasAnyFilter = this.statusFilters.open || this.statusFilters.close || this.statusFilters.pause;

    if (!hasAnyFilter) {
      // If no filters selected, show all jobs
      this.filteredJobs = [...this.Activejobs];
    } else {
      // Filter based on selected statuses
      this.filteredJobs = this.Activejobs.filter(job => {
        const status = job.jobStatusTitle?.toLowerCase();
        
        if (this.statusFilters.open && status === 'open') return true;
        if (this.statusFilters.close && status === 'close') return true;
        if (this.statusFilters.pause && status === 'pause') return true;
        
        return false;
      });
    }
  }

  // Handle checkbox change
  onFilterChange(): void {
    this.applyFilters();
  }

  // Get count of active filters
  getActiveFilterCount(): number {
    let count = 0;
    if (this.statusFilters.open) count++;
    if (this.statusFilters.close) count++;
    if (this.statusFilters.pause) count++;
    return count;
  }

  // Clear all filters
  clearFilters(): void {
    this.statusFilters.open = false;
    this.statusFilters.close = false;
    this.statusFilters.pause = false;
    this.applyFilters();
  }

  // Export jobs - exports only filtered data if filters are active
  exportJobs(): void {
    const jobsToExport = this.filteredJobs.length > 0 ? this.filteredJobs : this.Activejobs;

    if (jobsToExport.length === 0) {
      alert('No jobs available to export');
      return;
    }

    // Prepare data for Excel
    const exportData = jobsToExport.map((job, index) => ({
      'S.No': index + 1,
      'Job Title': job.jobTitle || '',
      'Job Category': job.jobCategoryTitle || '',
      'Job Type': job.jobTypeTitle || '',
      'Workspace': job.jobSpaceTitle || '',
      'Experience': job.experienceRange || '',
      'Salary Range': job.salaryRange || '',
      'Location': `${job.cityName || ''}, ${job.countryName || ''}`,
      'Status': job.jobStatusTitle || '',
      'Posted Date': job.postingDate ? new Date(job.postingDate).toLocaleDateString() : '',
      'Expiry Date': job.expireDate ? new Date(job.expireDate).toLocaleDateString() : '',
      'Is Expired': this.isJobExpired(job.expireDate) ? 'Yes' : 'No',
      'Total Applicants': job.totalApplicants || 0,
    }));

    // Create workbook and worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Set column widths
    const colWidths = [
      { width: 8 },  // S.No
      { width: 30 }, // Job Title
      { width: 20 }, // Category
      { width: 15 }, // Type
      { width: 15 }, // Workspace
      { width: 15 }, // Experience
      { width: 20 }, // Salary
      { width: 25 }, // Location
      { width: 12 }, // Status
      { width: 15 }, // Posted Date
      { width: 15 }, // Expiry Date
      { width: 12 }, // Is Expired
      { width: 15 }, // Applicants
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Jobs');

    // Generate filename with timestamp
    const activeFilters = [];
    if (this.statusFilters.open) activeFilters.push('Open');
    if (this.statusFilters.close) activeFilters.push('Close');
    if (this.statusFilters.pause) activeFilters.push('Pause');
    
    const filterText = activeFilters.length > 0 ? `_${activeFilters.join('_')}` : '_All';
    const fileName = `Jobs${filterText}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
    
    this.successMessage = `✅ Exported ${jobsToExport.length} jobs successfully!`;
    setTimeout(() => this.successMessage = null, 3000);
  }

  // Get jobs count by status for display
  getJobsCountByStatus(status: string): number {
    return this.Activejobs.filter(job => 
      job.jobStatusTitle?.toLowerCase() === status.toLowerCase()
    ).length;
  }
}