
import { Component,OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { Router } from '@angular/router';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent implements OnInit {


   toggleStatus: boolean = true;

  isLoading: boolean = false;
  jobApplications: any[] = [];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedJobApplicants: any[] | null = null;

  ngOnInit(): void {
   
 
    this.getcandidates();
    
  }
  constructor(
      private JobService: JobService,
        private userSessionService: UserSessionService,
        private CompanyRegistrationService: CompanyRegistrationService,
        private RegisterUserService: RegisterUserService,
        private CompanyDashboardService: CompanyDashboardService,
        private router: Router,
        private adminCompanyService: adminCompanyService,
  ){

  }

    

    getcandidates(): void {
    this.isLoading = true;
    this.adminCompanyService.getcandidates().subscribe(
      (response: any[]) => {

          console.log(response,'candiates');
     
        this.isLoading = false;

        // map job status
        this.jobApplications = response.map((job) => ({
        
          ...job,
          toggleStatus: job.jobStatusID === 1,

        }));

      
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching candiates Details:', error);
      }
    );
  }

onViewApplications(job: any): void {
  this.router.navigate(['/candidateprofile'], {
    state: { jobId: job.jobID }  
  });
}




}
