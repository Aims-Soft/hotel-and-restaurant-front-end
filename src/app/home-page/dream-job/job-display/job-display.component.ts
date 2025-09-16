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


  

  ngOnInit(): void {

    this.getAlljobs();
    
    
  }
   constructor(private router:Router,
    private usersessionservice:UserSessionService,
    private websiteservice:WebsiteService,
   ){

   }


    getAlljobs(): void {
    this.isLoading = true;
    this.websiteservice.getAlljobs().subscribe(
      (response: any[]) => {
     
        this.isLoading = false;

        
           this.jobs = response.map((jobs) => ({
          ...jobs,
       
        }));

        console.log(this.jobs, ' ALL jobs');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching  Jobs:', error);
      }
    );
  }

}
