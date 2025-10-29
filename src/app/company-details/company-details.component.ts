import { Component,OnInit} from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { WebsiteService } from '../Services/website/website.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent  implements OnInit{

  
    isLoading: boolean = false;
 companydetails: any = {}; 
  companyId!: number;
   jobs: any[] = [];


  ngOnInit(): void {

     this.companyId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.companyId) {
      this.getCompanyDetails(this.companyId);
      this.getAllJobs(this.companyId);
    }
    
  }


  constructor(private usersessionservice:UserSessionService,
    private websitesevice: WebsiteService,
    private router: Router,
    private route:ActivatedRoute,

  ){
  }


  // getCompanyDetails(ComapnyId: number): void {
  //   this.isLoading = true;
  //   this.websitesevice.getCompaniesdetails().subscribe(
  //     (response: any) => {
  //       this.isLoading = false;
  //       this.companydetails = response; 
  //       console.log(this.companydetails, ' Company Details');
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.error('Error fetching Company Details:', error);
  //     }
  //   );
  // }

  getCompanyDetails(companyId: number): void {
  this.isLoading = true;
  this.websitesevice.getCompaniesdetails().subscribe(
    (response: any[]) => {
      this.isLoading = false;

 
      const company = response.find(c => c.companyID === companyId);
      if (company) {
        this.companydetails = company;
      }

      console.log(this.companydetails, ' Company Details');
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error fetching Company Details:', error);
    }
  );
}


 goToApply(jobId: number): void {
  const user = this.usersessionservice.getUserID(); 

  if (user) {

    this.router.navigate(['/companyDiscription', jobId]);
  } else {
  
    this.router.navigate(['/signIn']);
  }
}


  getAllJobs(companyId: number): void {
    this.isLoading = true;
    this.websitesevice.getAdminJobs(companyId).subscribe(
      (response: any[]) => {
        this.isLoading = false;

        this.jobs = response.map(job => ({
          ...job
        }));

        console.log(this.jobs, 'Jobs of this company');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }

  formatWebsiteUrl(url: string): string {
  if (!url) return '#';
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

  

}
