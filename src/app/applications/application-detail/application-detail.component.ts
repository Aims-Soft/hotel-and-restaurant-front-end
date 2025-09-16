// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-application-detail',
//   templateUrl: './application-detail.component.html',
//   styleUrl: './application-detail.component.css'
// })
// export class ApplicationDetailComponent {

// }

import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { JobService } from '../../Services/Job/Job.service';
import { UserSessionService } from '../../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../../Services/register user/register-user.service';
import { CompanyDashboardService } from '../../Services/Company Dashboard/companyDashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.css',
})
export class ApplicationDetailComponent implements OnInit {
  applications: any[] = [];
  shortlisted: any[] = [];
  rejected: any[] = [];
  interview: any[] = [];

  isLoading: boolean = false;

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const jobId = +params.get('jobId')!;
      this.getJobApplications(jobId);
    });
  }
  // ngOnInit(): void {
  //   this.getJobApplications();

  //   const navigation = this.router.getCurrentNavigation();
  //   const state = navigation?.extras?.state as { jobId: number };

  //   if (state?.jobId) {
  //     console.log('Received JobID:', state.jobId);
  //     this.getJobApplications(state.jobId);
  //   }
  // }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Get the moved card
      const movedCard = event.container.data[event.currentIndex];
      movedCard.jobApplicationStatusTitle = newStatus;

      // Map status → ID
      const statusMap: any = {
        Application: 1,
        Shortlisted: 2,
        Rejected: 3,
        Interview: 4,
      };

      movedCard.jobApplicationStatusID = statusMap[newStatus];

      // Build payload
      const payload = {
        userID: this.userSessionService.getUserID(),
        jobID: movedCard.jobID,
        jobApplicationID: movedCard.jobApplicationID,
        jobApplicationStatusID: movedCard.jobApplicationStatusID,
        spType: 'Update',
      };

      console.log('Saving payload:', payload);

      this.CompanyDashboardService.updatejobApplicationStatus(
        payload
      ).subscribe(
        (res) => console.log('Status updated:', res),
        (err) => console.error('Error updating status:', err)
      );
    }
  }

  getJobApplications(jobId?: number): void {
    this.isLoading = true;
    this.CompanyDashboardService.getJobApplications().subscribe(
      (response: any[]) => {
        console.log(response, 'applications');
        this.isLoading = false;

        // clear old lists
        this.applications = [];
        this.shortlisted = [];
        this.rejected = [];
        this.interview = [];

        let jobsToProcess = response;

        // ✅ if jobId is provided, filter to that job only
        if (jobId) {
          jobsToProcess = response.filter((job) => job.jobID === jobId);
        }

        jobsToProcess.forEach((job) => {
          const users = job.appliedUser ? JSON.parse(job.appliedUser) : [];

          users.forEach((user: any) => {
            const userCard = {
              ...user,
              jobID: job.jobID,
              jobTitle: job.jobTitle,
              experience: job.experienceRange,
            };

            switch (user.jobApplicationStatusTitle) {
              case 'Application':
                this.applications.push(userCard);
                break;
              case 'Shortlisted':
                this.shortlisted.push(userCard);
                break;
              case 'Rejected':
                this.rejected.push(userCard);
                break;
              case 'Interview':
                this.interview.push(userCard);
                break;
              default:
                this.applications.push(userCard);
            }
          });
        });
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Job Applications:', error);
      }
    );
  }

  // getJobApplications(): void {
  //   this.isLoading = true;
  //   this.CompanyDashboardService.getJobApplications().subscribe(
  //     (response: any[]) => {
  //       console.log(response,' applications')
  //       this.isLoading = false;

  //       this.applications = [];
  //       this.shortlisted = [];
  //       this.rejected = [];
  //       this.interview = [];

  //       response.forEach((job) => {
  //         const users = job.appliedUser ? JSON.parse(job.appliedUser) : [];
  //         users.forEach((user: any) => {
  //           const userCard = {
  //             ...user,
  //             jobID: job.jobID,
  //             jobTitle: job.jobTitle,
  //             experience: job.experienceRange
  //           };

  //           switch (user.jobApplicationStatusTitle) {
  //             case 'Application':
  //               this.applications.push(userCard);
  //               break;
  //             case 'Shortlisted':
  //               this.shortlisted.push(userCard);
  //               break;
  //             case 'Rejected':
  //               this.rejected.push(userCard);
  //               break;
  //             case 'Interview':
  //               this.interview.push(userCard);
  //               break;
  //             default:
  //               this.applications.push(userCard);
  //           }
  //         });
  //       });
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.error('Error fetching Job Applications:', error);
  //     }
  //   );
  // }
}
