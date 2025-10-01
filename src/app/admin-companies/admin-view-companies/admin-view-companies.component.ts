import { Component,OnInit } from '@angular/core';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import { WebsiteService } from '../../Services/website/website.service';


@Component({
  selector: 'app-admin-view-companies',
  templateUrl: './admin-view-companies.component.html',
  styleUrl: './admin-view-companies.component.css'
})
export class AdminViewCompaniesComponent implements OnInit {

  isLoading: boolean = false;
 jobApplications: any[] = [];
  company: any ; 
  companyID: number | null = null;
   companyId!: number;
   jobs: any[] = [];
 

  ngOnInit(): void {
    // Check if company data exists
    if (!this.company) {
      console.error('No company data received');
      this.router.navigate(['/admin-companies']);
      return;
    }

    // Now fetch jobs using the company ID from the company object
    this.getAllJobs(this.company.companyID);
  }


  constructor( private  admincompanyService: adminCompanyService,
    private router: Router,
    private websitesevice:WebsiteService,
    

  ){
     const nav = this.router.getCurrentNavigation();
    this.company = nav?.extras.state?.['company'];
  }



  getCompanyDetails(): void {
    this.isLoading = true;
    this.admincompanyService.getcompanyDetails().subscribe(
      (response: any[]) => {
     
        this.isLoading = false;

        // map job status
           this.jobApplications = response.map((company) => ({
          ...company,
       
        }));

        console.log(this.jobApplications, 'Admin Company Details with toggleStatus');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Comapanies Details:', error);
      }
    );
  }


     getAllJobs(companyId: number): void {
    if (!companyId) {
      console.error('Invalid company ID');
      return;
    }

    this.isLoading = true;
    console.log('Fetching jobs for company ID:', companyId);

    this.websitesevice.getAdminJobs(companyId).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.jobs = response.map(job => ({
          ...job
        }));
        console.log('Jobs fetched:', this.jobs);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }

goToApply(jobId: number): void {
  this.router.navigate(['/companyjobuser'], {
    state: { jobId: jobId }
  });
}

}
