import { Component,OnInit } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';

import { WebsiteService } from '../Services/website/website.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {

    isLoading: boolean = false;
companies: any[] = [];
 showAll: boolean = false;
 searchText: string = '';

  ngOnInit(): void {
    this.getAllCompanies();
    
  }

  constructor (
    private usersessonservice:UserSessionService,
    private websiteservice: WebsiteService,
    private  router: Router,
  ){

  }

  onImageError(event: any) {
  event.target.src = 'assets/images/company-monogram.svg';
}

  getAllCompanies(): void {
    this.isLoading = true;
    this.websiteservice.getAllCompanies().subscribe(
      (response: any[]) => {
     
        this.isLoading = false;

        // map job status
           this.companies = response.map((company) => ({
          ...company,
       
        }));

        console.log(this.companies, 'All companies');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Comapanies:', error);
      }
    );
  }


    get visibleCompanies() {
   
    return this.showAll ? this.companies : this.companies.slice(0, 12);
  }
  

  loadMore() {
    this.showAll = true;
  }

  showLess() {
    this.showAll = false;
  }

}
