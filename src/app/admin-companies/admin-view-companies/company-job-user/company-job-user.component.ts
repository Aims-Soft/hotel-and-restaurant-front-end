import { Component,OnInit } from '@angular/core';
import { adminJobsService } from '../../../Services/Admin-Jobs/adminjobs.service';
import { UserSessionService } from '../../../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../../../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../../../Services/register user/register-user.service';
import { CompanyDashboardService } from '../../../Services/Company Dashboard/companyDashboard.service';
import { adminCompanyService } from '../../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-company-job-user',
  templateUrl: './company-job-user.component.html',
  styleUrl: './company-job-user.component.css'
})
export class CompanyJobUserComponent implements OnInit{



     toggleStatus: boolean = true;
  
    isLoading: boolean = false;
    jobApplications: any[] = [];
    searchText: string = '';
    successMessage: string | null = null;
    errorMessage: string | null = null;
    selectedJobApplicants: any[] | null = null;

     jobId: number | null = null;
  
    ngOnInit(): void {
    if (!this.jobId) {
      console.error('No jobId received');
      this.errorMessage = 'No job selected. Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/admin-companies']);
      }, 2000);
      return;
    }

    
    this.getcandidates(this.jobId);
  }
    constructor(
        private JobService: adminJobsService,
          private userSessionService: UserSessionService,
          private CompanyRegistrationService: CompanyRegistrationService,
          private RegisterUserService: RegisterUserService,
          private CompanyDashboardService: CompanyDashboardService,
          private router: Router,
          private adminCompanyService: adminCompanyService,
    ){
         const nav = this.router.getCurrentNavigation();
    this.jobId = nav?.extras.state?.['jobId'];
    console.log('Received jobId in constructor:', this.jobId);
    }
  
      
 
    getcandidates(jobId: number): void {
    this.isLoading = true;
    console.log('Fetching candidates for jobId:', jobId);
    
    // Use the service method with jobId
    this.adminCompanyService.getCompanyJobUser(jobId).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        console.log('API Response:', response);

        if (!response || response.length === 0) {
          this.errorMessage = 'No candidates found for this job.';
          this.jobApplications = [];
          return;
        }

        // Map the response
        this.jobApplications = response.map((candidate) => ({
          ...candidate,
          toggleStatus: candidate.jobStatusID === 1,
        }));

        console.log('Candidates loaded:', this.jobApplications);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching candidates:', error);
        this.errorMessage = 'Failed to load candidates. Please try again.';
      }
    );
  }
  
  // onViewApplications(job: any): void {
  //   this.router.navigate(['/candidateprofile'], {
  //     state: { jobId: job.jobID }  
  //   });
  // }



  exportToExcel(): void {
    // Prepare data for export
    const exportData = this.jobApplications.map(item => ({
      'Name': item.userName,
      'Email': item.email,
      'Job': item.jobTitle,
      'Country': item.countryName,
      'City': item.cityName,
      'Contact': item.contact
    }));

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 25 }, // Job
      { wch: 15 }, // Country
      { wch: 15 }, // City
      { wch: 15 }  // Contact
    ];

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Candidates');

    // Generate filename with current date
    const date = new Date();
    const filename = `Candidates_${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    // Show success message
    this.successMessage = 'Data exported successfully!';
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

}
