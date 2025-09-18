import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../Services/userSession/userSession.Service';
import { WebsiteService } from '../../../Services/website/website.service';

@Component({
  selector: 'app-job-display',
  templateUrl: './job-display.component.html',
  styleUrl: './job-display.component.scss'
})
export class JobDisplayComponent implements OnInit {

    isLoading: boolean = false;
 jobs: any[] = [];

  displayedJobs: any[] = [];  
  showAll: boolean = false; 


  

  ngOnInit(): void {

    this.getAlljobs();
    
    
  }
   constructor(private router:Router,
    private usersessionservice:UserSessionService,
    private websiteservice:WebsiteService,
   ){

   }


   goToApply(jobId: number): void {
  const user = this.usersessionservice.getUserID(); 

  if (user) {

    this.router.navigate(['/companyDiscription', jobId]);
  } else {
  
    this.router.navigate(['/signIn']);
  }
}


    getAlljobs(): void {
    this.isLoading = true;
    this.websiteservice.getAlljobs().subscribe(
      (response: any[]) => {
     
        this.isLoading = false;

        
           this.jobs = response.map((jobs) => ({
          ...jobs,
       
        }));

         this.displayedJobs = this.jobs.slice(0, 5);

        console.log(this.jobs, ' ALL jobs');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching  Jobs:', error);
      }
    );
  }

    toggleJobs(): void {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.displayedJobs = this.jobs;  
    } else {
      this.displayedJobs = this.jobs.slice(0, 5); 
    }
  }


}
