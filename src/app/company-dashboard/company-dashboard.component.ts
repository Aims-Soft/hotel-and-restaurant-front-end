import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { JobService } from '../Services/Job/Job.service';
import { CreateJobsComponent } from '../create-jobs/create-jobs.component';

import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent implements OnInit {
  // @ViewChild(CreateJobsComponent) jobform: any;

  isLoading: boolean = false;
  Activejobs: any[] = [];
  job: any = {};
  searchText: string = ''; 
   companyID: number = 0;


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
  }

  editJob(job: any): void {
    console.log('Clicked Job:', job);
    // this.router.navigate(['/createJobs'], { queryParams: { jobID: job.jobID } });
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


successMessage: string | null = null;
errorMessage: string | null = null;

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

      // Auto hide message after 3s
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
    this.CompanyDashboardService.getActivejobs(companyID).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.Activejobs = response;
        console.log(`Active jobs for company ${companyID}:`, response);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Active Jobs:', error);
      }
    );
  }

  // getActivejobs(): void {
  //   this.isLoading = true;
  //   this.CompanyDashboardService.getActivejobs(0).subscribe(
  //     (response: any[]) => {
  //       this.isLoading = false;
  //       this.Activejobs = response;
  //       // console.log(response, 'Job Category');
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       // console.error('Error fetching JobCategory:', error);
  //     }
  //   );
  // }
}
