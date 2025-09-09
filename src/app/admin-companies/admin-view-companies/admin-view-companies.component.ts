import { Component,OnInit } from '@angular/core';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-view-companies',
  templateUrl: './admin-view-companies.component.html',
  styleUrl: './admin-view-companies.component.css'
})
export class AdminViewCompaniesComponent implements OnInit {

  isLoading: boolean = false;
 jobApplications: any[] = [];
  company: any = null; 
  companyID: number | null = null;
 

  ngOnInit(): void {
    this.getCompanyDetails();
    
  }

  constructor( private  admincompanyService: adminCompanyService,
    private Router: Router,
    

  ){}



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

}
