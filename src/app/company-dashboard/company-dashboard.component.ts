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

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const companyID = 1;
    this.getTotalJobs(companyID);
    this.getActivejobs();
  }

  editJob(job: any): void {
    // console.log('Clicked Job:', job);
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

  getActivejobs(): void {
    this.isLoading = true;
    this.CompanyDashboardService.getActivejobs().subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.Activejobs = response;
        console.log(response, 'Job Category');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching JobCategory:', error);
      }
    );
  }
}
