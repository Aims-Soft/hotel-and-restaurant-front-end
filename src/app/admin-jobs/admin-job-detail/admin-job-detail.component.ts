import { Component,OnInit} from '@angular/core';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import { adminJobsService } from '../../Services/Admin-Jobs/adminjobs.service';

@Component({
  selector: 'app-admin-job-detail',
  templateUrl: './admin-job-detail.component.html',
  styleUrl: './admin-job-detail.component.css'
})
export class AdminJobDetailComponent  implements OnInit{

    isLoading: boolean = false;
 jobApplications: any[] = [];
  job: any ; 
  companyID: number | null = null;


  ngOnInit(): void {
    this.getadminjobs();
    
  }

  constructor( private  admincompanyService: adminCompanyService,
    private router: Router,
    private adminjobService :adminJobsService,
    

  )
  {
    // Try to get from navigation state first
    const nav = this.router.getCurrentNavigation();
    this.job = nav?.extras.state?.['job'];
    
    // If not in state, try localStorage (for page refresh)
    if (!this.job) {
      const savedJob = localStorage.getItem('selectedJob');
      if (savedJob) {
        this.job = JSON.parse(savedJob);
        console.log('Job loaded from localStorage:', this.job);
      }
    } else {
      // Save to localStorage for future refreshes
      localStorage.setItem('selectedJob', JSON.stringify(this.job));
      console.log('Job saved to localStorage:', this.job);
    }

    // Parse skills and benefits if job exists
    if (this.job) {
      this.job.skills = this.job.skills ? JSON.parse(this.job.skills) : [];
      this.job.benefits = this.job.benefits ? JSON.parse(this.job.benefits) : [];
    }
  }
  // {
  //    const nav = this.router.getCurrentNavigation();
  //   this.job = nav?.extras.state?.['job'];

  //     if (this.job) {
  //   this.job.skills = this.job.skills ? JSON.parse(this.job.skills) : [];
  //   this.job.benefits = this.job.benefits ? JSON.parse(this.job.benefits) : [];
  // }

  // }


  
  // getCompanyDetails(): void {
  //   this.isLoading = true;
  //   this.admincompanyService.getcompanyDetails().subscribe(
  //     (response: any[]) => {
     
  //       this.isLoading = false;

  //       // map job status
  //          this.jobApplications = response.map((company) => ({
  //         ...company,
       
  //       }));

  //       console.log(this.jobApplications, 'Admin job Details with toggleStatus');
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.error('Error fetching Comapanies Details:', error);
  //     }
  //   );
  // }

      getadminjobs(): void {
      this.isLoading = true;
      this.adminjobService.getAdminJobs(0).subscribe(
        (response: any[]) => {
       
          this.isLoading = false;
  
          // map job status
          this.jobApplications = response.map((job) => ({
            ...job,
            toggleStatus: job.jobStatusID === 1,
          }));
  
          console.log(this.jobApplications, ' jobs with toggleStatus');
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error fetching job Details:', error);
        }
      );
    }

     ngOnDestroy(): void {
    // Clean up localStorage when component is destroyed
    localStorage.removeItem('selectedJob');
  }

}



