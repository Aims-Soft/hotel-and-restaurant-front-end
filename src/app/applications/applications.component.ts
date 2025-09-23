import { Component, OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

import * as bootstrap from 'bootstrap';

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


   enteredPin: string = '';
  pinErrorMessage: string | null = null;
  isPinValidating: boolean = false;


  // Status toggle modal properties
  jobToToggle: any = null;
  statusToggleModal: any;
  statusTogglePin: string = '';
  statusPinErrorMessage: string | null = null;
  isStatusPinValidating: boolean = false;
  newToggleStatus: boolean = false;



    jobToDelete: any = null; 
  deleteModal: any;

   ngOnInit(): void {
    this.getJobApplications();

    // Initialize Bootstrap modal
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }

     const statusModalElement = document.getElementById('statusToggleModal');
    if (statusModalElement) {
      this.statusToggleModal = new bootstrap.Modal(statusModalElement);
    }
  }
  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router
  ) {}

  // getJobApplications(): void {
  //   this.isLoading = true;
  //   this.CompanyDashboardService.getJobApplications().subscribe(
  //     (response: any[]) => {
  //       this.isLoading = false;

  //       // map job status
  //       this.jobApplications = response.map((job) => ({
  //         ...job,
  //         toggleStatus: job.jobStatusID === 1,
  //       }));

  //       console.log(this.jobApplications, 'Job Applications with toggleStatus');
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.error('Error fetching Job Applications:', error);
  //     }
  //   );
  // }


  getJobApplications(): void {
  this.isLoading = true;
  this.CompanyDashboardService.getJobApplications().subscribe(
    (response: any[]) => {
      this.isLoading = false;

      this.jobApplications = response.map((job) => {
        let appliedUsers = [];
        try {
          appliedUsers = job.appliedUser ? JSON.parse(job.appliedUser) : [];
        } catch (e) {
          console.error('Invalid appliedUser JSON', e);
        }

        return {
          ...job,
          toggleStatus: job.jobStatusID === 1,
          appliedUsers, 
        };
      });

      console.log(this.jobApplications, 'Job Applications with appliedUsers');
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error fetching Job Applications:', error);
    }
  );
}


 validatePinAndDelete(): void {
    if (!this.enteredPin.trim()) {
      this.pinErrorMessage = 'Please enter your PIN code';
      return;
    }

    this.isPinValidating = true;
    this.pinErrorMessage = null;

    // Get stored PIN from UserSessionService
    const storedPin = this.userSessionService.getpin();
    
    if (this.enteredPin === storedPin) {
      // PIN is correct, proceed with delete
      this.pinErrorMessage = null;
      this.confirmDelete();
    } else {
      // PIN is incorrect
      this.pinErrorMessage = 'Incorrect PIN code. Please try again.';
      this.isPinValidating = false;
      this.enteredPin = ''; // Clear the PIN field
    }
  }


  //   openDeleteModal(job: any): void {
  //   this.jobToDelete = job;
  //   this.deleteModal.show();
  // }


    openDeleteModal(job: any): void {
    this.jobToDelete = job;
    this.enteredPin = ''; // Reset PIN field
    this.pinErrorMessage = null; // Clear any previous PIN errors
    this.deleteModal.show();
  }



  confirmDelete(): void {
    if (!this.jobToDelete) return;

    //   const jobApplicationID =
    // this.jobToDelete.appliedUsers && this.jobToDelete.appliedUsers.length > 0
    //   ? this.jobToDelete.appliedUsers[0].jobApplicationID
    //   : 0;

    const payload = {
      userID: this.userSessionService.getUserID(),
      jobID: this.jobToDelete.jobID,
      jobStatusID: this.jobToDelete.jobStatusID,
      experianceID: 0,
      appliedAt: "",
      description:"",
      lastStatus:"",
      resume:"",
      // jobApplicationID, 

     studyLevelID:0,

      spType: 'Delete',
    };

    this.CompanyDashboardService.deleteapplication(payload).subscribe(
      (res) => {
        // Remove from UI
        this.jobApplications = this.jobApplications.filter(
          (j) => j.jobID !== this.jobToDelete.jobID
        );

        console.log(res,'delete application');
        console.log(payload,'payload');

        this.successMessage = `Job "${this.jobToDelete.jobTitle}" Deleted successfully!`;
        this.errorMessage = null;

        this.closeDeleteModal();

        // this.deleteModal.hide(); 
        this.jobToDelete = null;

        setTimeout(() => (this.successMessage = null), 3000);
      },
      (error) => {
        console.error('Delete failed:', error);
        this.errorMessage = 'Failed to delete job. Please try again.';
        this.successMessage = null;

        setTimeout(() => (this.errorMessage = null), 3000);
      }
    );
  }

    closeDeleteModal(): void {
    this.deleteModal.hide();
    this.jobToDelete = null;
    this.enteredPin = '';
    this.pinErrorMessage = null;
    this.isPinValidating = false;
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

  // onToggleStatus(job: any): void {
  //   const payload = {
  //     jobID: job.jobID,
  //     jobTitle: job.jobTitle,
  //     jobStatusID: job.toggleStatus ? 1 : 2,
  //     userID: this.userSessionService.getUserID(),
  //     spType: 'update',
  //   };

  //   this.CompanyDashboardService.updateJobStatus(payload).subscribe(
  //     (res) => {
  //       this.successMessage = `Status updated to ${
  //         job.toggleStatus ? 'Open' : 'Closed'
  //       } successfully!`;
  //       this.errorMessage = null;

  //       // auto hide message after 3 seconds
  //       setTimeout(() => (this.successMessage = null), 3000);
  //     },
  //     (error) => {
  //       this.errorMessage = 'Failed to update job status. Please try again.';
  //       this.successMessage = null;

  //       // rollback toggle if failed
  //       job.toggleStatus = !job.toggleStatus;

  //       setTimeout(() => (this.errorMessage = null), 3000);
  //     }
  //   );
  // }



   onToggleStatus(job: any): void {
    // Store the job and new status, but don't apply it yet
    this.jobToToggle = job;
    this.newToggleStatus = !job.toggleStatus; // The new status we want to set
    this.statusTogglePin = '';
    this.statusPinErrorMessage = null;
    this.isStatusPinValidating = false;
    
    // Show PIN verification modal
    this.statusToggleModal.show();
  }

  validatePinAndToggleStatus(): void {
    if (!this.statusTogglePin.trim()) {
      this.statusPinErrorMessage = 'Please enter your PIN code';
      return;
    }

    this.isStatusPinValidating = true;
    this.statusPinErrorMessage = null;

    const storedPin = this.userSessionService.getpin();
    
    if (this.statusTogglePin === storedPin) {
      this.statusPinErrorMessage = null;
      this.confirmToggleStatus();
    } else {
      this.statusPinErrorMessage = 'Incorrect PIN code. Please try again.';
      this.isStatusPinValidating = false;
      this.statusTogglePin = '';
    }
  }

  confirmToggleStatus(): void {
    if (!this.jobToToggle) return;

    const payload = {
      jobID: this.jobToToggle.jobID,
      jobTitle: this.jobToToggle.jobTitle,
      jobStatusID: this.newToggleStatus ? 1 : 2,
      userID: this.userSessionService.getUserID(),
      spType: 'update',
    };

    this.CompanyDashboardService.updateJobStatus(payload).subscribe(
      (res) => {
        // Apply the toggle status change
        this.jobToToggle.toggleStatus = this.newToggleStatus;
        
        this.successMessage = `Status updated to ${
          this.newToggleStatus ? 'Open' : 'Closed'
        } successfully!`;
        this.errorMessage = null;

        this.closeStatusToggleModal();
        setTimeout(() => (this.successMessage = null), 3000);
      },
      (error) => {
        this.errorMessage = 'Failed to update job status. Please try again.';
        this.successMessage = null;
        this.isStatusPinValidating = false;
        setTimeout(() => (this.errorMessage = null), 3000);
      }
    );
  }

  closeStatusToggleModal(): void {
    this.statusToggleModal.hide();
    this.jobToToggle = null;
    this.statusTogglePin = '';
    this.statusPinErrorMessage = null;
    this.isStatusPinValidating = false;
    this.newToggleStatus = false;
  }
  
}
