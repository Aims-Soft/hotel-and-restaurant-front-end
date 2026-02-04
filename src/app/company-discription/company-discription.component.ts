import { Component, OnInit } from '@angular/core';

import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-discription',
  templateUrl: './company-discription.component.html',
  styleUrl: './company-discription.component.css',
})
export class CompanyDiscriptionComponent implements OnInit {
  isLoading: boolean = false;
   job: any;

  ngOnInit(): void {

     const jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (jobId) {
      this.getJobById(jobId);
    }
  }

  constructor(
    
    private usersession: UserSessionService,
    private websiteservice: WebsiteService,
    private route: ActivatedRoute,
    private router: Router,
    private usersessionservice: UserSessionService,
  ) {}

goToApply(jobId: number): void {
    const user = this.usersessionservice.getUserID();

    if (user) {
      this.router.navigate(['/applyForm', jobId]);
    } else {
      this.router.navigate(['/signIn']);
    }
  }

//   goToApply(jobId: number) {
//   this.router.navigate(['/applyForm', jobId]);
// }


 getJobById(jobId: number): void {
    this.isLoading = true;
    this.websiteservice.getAlljobs().subscribe(
      (response: any[]) => {
        this.isLoading = false;
        const job = response.find(j => j.jobID === jobId);
      if (job) {
        
        this.job = {
          ...job,
          skills: job.skills ? JSON.parse(job.skills) : [],
          benefits: job.benefits ? JSON.parse(job.benefits) : []
        };
      }
        console.log(this.job, 'Selected Job');
      },
      error => {
        this.isLoading = false;
        console.error('Error fetching job:', error);
      }
    );
  }

  splitByDot(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split('.')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

}
