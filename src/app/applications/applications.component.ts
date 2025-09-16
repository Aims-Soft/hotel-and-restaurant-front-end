import { Component, OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  toggleStatus: boolean = true;

  isLoading: boolean = false;
  jobApplications: any[] = [];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedJobApplicants: any[] | null = null;

  ngOnInit(): void {
    this.getJobApplications();
  }

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router
  ) {}

  getJobApplications(): void {
    this.isLoading = true;
    this.CompanyDashboardService.getJobApplications().subscribe(
      (response: any[]) => {
        this.isLoading = false;

        // map job status
        this.jobApplications = response.map((job) => ({
          ...job,
          toggleStatus: job.jobStatusID === 1,
        }));

        console.log(this.jobApplications, 'Job Applications with toggleStatus');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Job Applications:', error);
      }
    );
  }

  // onViewApplications(job: any): void {
  //   this.router.navigate(['/applicationDetails'], {
  //     state: { jobId: job.jobID }
  //   });
  // }

  onViewApplications(job: any): void {
    this.router.navigate(['/applicationdetails', job.jobID]);

    // this.router.navigate(['/applicationdetails/:jobId'], {
    //   queryParams: { jobId: job.jobID }
    // });
  }

  onToggleStatus(job: any): void {
    const payload = {
      jobID: job.jobID,
      jobTitle: job.jobTitle,
      jobStatusID: job.toggleStatus ? 1 : 2,
      userID: this.userSessionService.getUserID(),
      spType: 'update',
    };

    this.CompanyDashboardService.updateJobStatus(payload).subscribe(
      (res) => {
        this.successMessage = `Status updated to ${
          job.toggleStatus ? 'Open' : 'Closed'
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
