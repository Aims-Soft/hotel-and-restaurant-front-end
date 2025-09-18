import { Component, OnInit } from '@angular/core';
import { adminJobsService } from '../Services/Admin-Jobs/adminjobs.service';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  
     toggleStatus: boolean = true;
  
    isLoading: boolean = false;
    jobApplications: any[] = [];
    searchText: string = '';
    successMessage: string | null = null;
    errorMessage: string | null = null;
    selectedJobApplicants: any[] | null = null;
  
    ngOnInit(): void {
     
   
      this. getAdminJobsList();
      
    }
    constructor(
  
          private userSessionService: UserSessionService,
       
          private CompanyDashboardService: CompanyDashboardService,
          private router: Router,
          private adminjobService: adminJobsService,
    ){
  
    }
  
getAdminJobsList(companyID: number = 0): void {
  this.isLoading = true;
  this.adminjobService.getAdminJobs(companyID).subscribe(
    (response: any[]) => {
      this.isLoading = false;

      this.jobApplications = response.map((job) => ({
        ...job,
        toggleStatus: job.jobStatusID === 1,
      }));

      console.log(
        companyID === 0 ? 'All jobs:' : `Jobs for companyID: ${companyID}`,
        this.jobApplications
      );
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error fetching job Details:', error);
    }
  );
}

      
  
    //   getadminjobs(): void {
    //   this.isLoading = true;
    //   this.adminjobService.getAdminJobs(0).subscribe(
    //     (response: any[]) => {
       
    //       this.isLoading = false;
  
    //       // map job status
    //       this.jobApplications = response.map((job) => ({
    //         ...job,
    //         toggleStatus: job.jobStatusID === 1,
    //       }));
  
    //       console.log(this.jobApplications, ' jobs with toggleStatus');
    //     },
    //     (error: any) => {
    //       this.isLoading = false;
    //       console.error('Error fetching job Details:', error);
    //     }
    //   );
    // }
  
  // onViewApplications(job: any): void {
  //   this.router.navigate(['/adminjobdetail'], {
  //     state: { jobId: job.jobID }   
  //   });
  // }


  onViewApplications(job: any): void {
  this.router.navigate(['/adminjobdetail'], {
    state: { job }   
  });
}
  
  
    onToggleStatus(job: any): void {
      const payload = {
        jobID: job.jobID,
        jobTitle: job.jobTitle,
        jobStatusID: job.toggleStatus ? 1 : 2,
        userID: this.userSessionService.getUserID(),
        spType: 'update',
      };
  
      this.adminjobService.updateJobStatus(payload).subscribe(
        (res) => {
          this.successMessage = `Status updated to ${
            job.toggleStatus ? 'Expired' : 'Publish'
          } successfully!`;
          this.errorMessage = null;
  
          // auto hide message after 3 seconds
          setTimeout(() => (this.successMessage = null), 3000);
        },
        (error) => {
          this.errorMessage = 'Failed to update job status. Please try again.';
          this.successMessage = null;
  
          // rollback toggle if failed
          job.toggleStatus = !job.toggleStatus;
  
          setTimeout(() => (this.errorMessage = null), 3000);
        }
      );
    }

}
