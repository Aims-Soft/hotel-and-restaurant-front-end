import { Component,OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { Router } from '@angular/router';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';
import { AdminDashboardService } from '../Services/Admin Dashboard/adminDashboard.service';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrl: './admin-companies.component.css'
})
export class AdminCompaniesComponent implements OnInit {


   toggleStatus: boolean = true;

  isLoading: boolean = false;
  jobApplications: any[] = [];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedJobApplicants: any[] | null = null;

  ngOnInit(): void {
   
 
    this.getCompanyDetails();
    
  }
  constructor(
      private JobService: JobService,
        private userSessionService: UserSessionService,
        private CompanyRegistrationService: CompanyRegistrationService,
        private RegisterUserService: RegisterUserService,
        private CompanyDashboardService: CompanyDashboardService,
        private router: Router,
        private adminCompanyService: adminCompanyService,
        private  admindashboardservice:AdminDashboardService,
  ){

  }

    

    getCompanyDetails(): void {
    this.isLoading = true;
    this.adminCompanyService.getcompanyDetails().subscribe(
      (response: any[]) => {
     
        this.isLoading = false;

        // map job status
           this.jobApplications = response.map((company) => ({
          ...company,
          toggleStatus: company.companyStatusID === 1 
        }));

        console.log(this.jobApplications, 'Admin Company Details with toggleStatus');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Comapanies Details:', error);
      }
    );
  }

onViewApplications(company: any): void {
  this.router.navigate(['/adminviewcompanies'], {
       state: { companyID: company.companyID }  
  });
}


  onToggleCompanyStatus(company: any): void {

    const newStatusID = company.toggleStatus ? 1 : 4;
    
    const payload = {
      companyID: company.companyID,
      companyName: company.companyName,
      companyStatusID: newStatusID,
      userID: this.userSessionService.getUserID(),
      spType: 'update',
       remarkes: "" 
    };

    this.admindashboardservice.updateCompanyStatus(payload).subscribe(
      (res) => {
        console.log(res, 'company status');
        this.successMessage = `Company status updated to ${
          company.toggleStatus ? 'Approved' : 'Updated'
        } successfully!`;
        this.errorMessage = null;

       
        company.companyStatusID = newStatusID;
        
       
        setTimeout(() => (this.successMessage = null), 3000);
      },
      (error) => {
        this.errorMessage = 'Failed to update company status. Please try again.';
        this.successMessage = null;

       
        company.toggleStatus = !company.toggleStatus;

        setTimeout(() => (this.errorMessage = null), 3000);
      }
    );
  }
}
