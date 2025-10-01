import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
import { RegisterUserService } from '../Services/register user/register-user.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.css',
})
export class ApplyFormComponent implements OnInit {
  isLoading: boolean = false;
  userData: any = {};

  experience: any[] = [];
  DegreeLevel: any[] = [];
  selectedExperience: number | null = null;
  selectedDegree: number | null = null;
  jobID!: number;

  successMessage: string = '';
  errorMessage: string = '';
  showMessage: boolean = false;

  isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private usersesssion: UserSessionService,
    private websiteservice: WebsiteService,
    private registeruserservice: RegisterUserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.jobID = Number(params.get('id'));
      console.log('JobID from route:', this.jobID);
    });

    const userId = this.usersesssion.getUserID();
    this.getjobapply(userId);
    this.getDegreeLevel();
    this.getExperience();
  }

  getjobapply(userId: number): void {
    this.isLoading = true;
    this.websiteservice.getjobapply(userId).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response.length > 0) {
          this.userData = response[0];
        }
        console.log(this.userData, 'User Data');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching user info:', error);
      }
    );
  }

  getExperience(): void {
    this.isLoading = true;
    this.registeruserservice.getExperience().subscribe(
      (response) => {
        this.isLoading = false;
        this.experience = response;
        console.log('Experience:', response);
      },
      (error) => {
        this.isLoading = false;

        this.showErrorMessage('Error loading experience levels.');

        console.error('Error fetching Experience:', error);
      }
    );
  }
  onExperienceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedExperience = Number(select.value);
    console.log('Selected Exerperience ID:', this.selectedExperience);

    if (this.selectedExperience) {
      this.clearMessages();
    }
  }

  getDegreeLevel(): void {
    this.isLoading = true;
    this.registeruserservice.getDegreeLevel().subscribe(
      (response) => {
        this.isLoading = false;
        this.DegreeLevel = response;
        console.log(response, 'types');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  onStudyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDegree = Number(select.value);
    console.log('Selected Industry ID:', this.selectedDegree);

    if (this.selectedDegree) {
      this.clearMessages();
    }
  }

  validateForm(): boolean {
    this.isFormSubmitted = true;

    if (!this.selectedDegree) {
      this.showErrorMessage('Please select a Study Level before applying.');
      return false;
    }

    if (!this.selectedExperience) {
      this.showErrorMessage(
        'Please select your Experience level before applying.'
      );
      return false;
    }

    if (!this.userData?.eResume) {
      this.showErrorMessage('Please upload your resume before applying.');
      return false;
    }

    return true;
  }

  onRegister(): void {
    this.clearMessages();

    if (!this.validateForm()) {
      return;
    }

    const payload: any = {
      userID: this.usersesssion.getUserID(),
      jobID: this.jobID,
      appliedAt: '',
      description: '',
      lastStatus: '',
      resume: '',
      jobApplicationStatusID: 1,
      experienceID: this.selectedExperience,
      studyLevelID: this.selectedDegree,
      spType: 'insert',
    };

    console.log('Final Payload:', payload);

    this.websiteservice.applyjob(payload).subscribe({
      next: (res) => {
        console.log('User apply job:', res);
     if (Array.isArray(res)) {
        const message = res[0] || 'Application failed';

        // Check for success message
        if (message.toLowerCase().includes('success')) {
          this.showSuccessMessage(
            'Application submitted successfully! You will be notified about the status.'
          );
          
          // Navigate back after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/jobs']);
          }, 2000);
        } 
        // Check for already applied
        else if (message.toLowerCase().includes('already')) {
          this.showErrorMessage('You have already applied for this job.');
        } 
        // Any other error message
        else {
          this.showErrorMessage(message);
        }
        return;
      }

      // Handle object response (if your API sometimes returns objects)
      if (res && res.success === false) {
        this.showErrorMessage(
          res.message || 'Failed to submit application. Please try again.'
        );
        return;
      }

      // Default success case (if response is not an array)
      this.showSuccessMessage(
        'Application submitted successfully! You will be notified about the status.'
      );
      
      setTimeout(() => {
        this.router.navigate(['/jobs']);
      }, 2000);
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Error applying for job:', err);

      if (err.status === 400) {
        this.showErrorMessage('Server Not Respond');
      } else if (err.status === 409) {
        this.showErrorMessage('You have already applied for this job.');
      } else if (err.status === 500) {
        this.showErrorMessage('Server error. Please try again later.');
      } else {
        this.showErrorMessage('Failed to submit application. Please try again.');
      }
    },
  });
}

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    this.showMessage = true;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }

  showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    this.showMessage = true;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.showMessage = false;
  }
  onCancel(): void {
    this.router.navigate(['/companyDiscription/:id']);
  }

  goBack(): void {
    this.router.navigate(['/companyDiscription/:id']);
  }
}
