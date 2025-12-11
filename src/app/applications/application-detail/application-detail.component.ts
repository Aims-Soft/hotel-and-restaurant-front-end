

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
import * as XLSX from 'xlsx';

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
    companyID: number = 0;

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

     this.companyID = this.userSessionService.getUserID() || 1;

    this.route.paramMap.subscribe((params) => {
      const jobId = +params.get('jobId')!;
      this.getJobApplications(jobId);
    });
  }

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
    this.CompanyDashboardService.getJobApplications(0).subscribe(
      (response: any[]) => {
        console.log(response, 'applications');
        console.log('Company ID used:', this.companyID);
        this.isLoading = false;

        // clear old lists
        this.applications = [];
        this.shortlisted = [];
        this.rejected = [];
        this.interview = [];

        let jobsToProcess = response;

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

              cityName: job.cityName,
              countryName: user.countryName || '',
              contact: user.contact || '',
              salaryRange: job.salaryRange,
              jobSpaceTitle: job.jobSpaceTitle,
              jobTypeTitle: job.jobTypeTitle,
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

  viewCV(user: any): void {
  if (!user.eResume) {
    alert('Resume not available for this user');
    return;
  }

  console.log('Opening CV in new tab:', user.eResume);
  
  // Open the CV in a new browser tab
  window.open(user.eResume, '_blank');
}

 downloadCV(user: any): void {
    if (!user.eResume) {
      alert('Resume not available for this user');
      return;
    }

    console.log('Downloading CV from:', user.eResume);

    // Method 1: Direct download using fetch (handles CORS better)
    fetch(user.eResume)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create temporary link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${user.userName}_Resume.pdf`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('Error downloading CV via fetch:', error);
        
        // Fallback: Open in new tab if CORS blocks download
        console.log('Attempting fallback method...');
        window.open(user.eResume, '_blank');
      });
  }
  //   downloadCV(user: any): void {
  //   if (!user.eResume) {
  //     alert('Resume not available for this user');
  //     return;
  //   }

  //   try {
  //     // Create a temporary anchor element
  //     const link = document.createElement('a');
  //     link.href = user.eResume;
  //     link.download = `${user.userName}_Resume.pdf`;
  //     link.target = '_blank';
      
  //     // Append to body, click, and remove
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     console.log('Downloading CV from:', user.eResume);
  //   } catch (error) {
  //     console.error('Error downloading CV:', error);
  //     alert('Failed to download CV. Please try again.');
  //   }
  // }

  // Excel Export Functions
  exportToExcel(data: any[], fileName: string): void {
    if (data.length === 0) {
      alert(`No data available to export for ${fileName}`);
      return;
    }

    // Prepare data for Excel export
    const exportData = data.map((user) => ({
      Name: user.userName || '',
      'Job Title': user.jobTitle || '',
      Experience: user.experience || '',
      Email: user.email || '',
      CNIC: user.cnic || 'N/A',
      Contact: user.contact || 'N/A', 
      Country: user.countryName || 'N/A', 
      City: user.cityName || '',
      Address: user.address || 'N/A', 
      
      Status: user.jobApplicationStatusTitle || '',
      'Salary Range': user.salaryRange || '',
      'Job Type': user.jobTypeTitle || '',
      'Job Space': user.jobSpaceTitle || '',
      'Applied Date': user.appliedAt
        ? new Date(user.appliedAt).toLocaleDateString()
        : '',
      'Study Level': user.studyLevelTitle || '',
    
    }));

    // Create workbook and worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Set column widths
    const colWidths = [
      { width: 20 }, // Name
      { width: 25 }, // Job Title
      { width: 15 }, // Experience
      { width: 30 }, // Email
      { width: 20 }, // CNIC
      { width: 15 }, //contact
      { width: 15 }, // Country
      { width: 15 }, // City
      {width: 40},  //Address
      { width: 15 }, // Status
      { width: 15 }, // Salary Range
      { width: 15 }, // Job Type
      { width: 15 }, // Job Space
      { width: 15 }, // Applied Date
      { width: 15 }, // Study Level
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, fileName);

    // Save file
    XLSX.writeFile(
      wb,
      `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`
    );
  }

  exportApplications(): void {
    this.exportToExcel(this.applications, 'Applications');
  }

  exportShortlisted(): void {
    this.exportToExcel(this.shortlisted, 'Shortlisted');
  }

  exportRejected(): void {
    this.exportToExcel(this.rejected, 'Rejected');
  }

  exportInterview(): void {
    this.exportToExcel(this.interview, 'Interview');
  }

  exportAll(): void {
    const allData = [
      ...this.applications,
      ...this.shortlisted,
      ...this.rejected,
      ...this.interview,
    ];
    this.exportToExcel(allData, 'All_Applications');
  }

    goBack(): void {
    this.router.navigate(['/applications'], {
    
    });
  }
}
