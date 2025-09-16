import { Component,OnInit } from '@angular/core';
import { UserSessionService } from '../../Services/userSession/userSession.Service';
import { Router } from '@angular/router';
import { WebsiteService } from '../../Services/website/website.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrl: './catagories.component.css'
})
export class CatagoriesComponent implements OnInit {

    isLoading: boolean = false;
  Job: any[] = [];



  ngOnInit(): void {
     this.getJobCategory();
    
  }

  constructor(private usersession:UserSessionService,
    private router: Router,
    private websiteservice : WebsiteService,

  ){}


   getJobCategory(): void {
    this.isLoading = true;
    this.websiteservice.getWebsiteCategories().subscribe(
      (response) => {
        this.isLoading = false;
        this.Job = response;
        console.log(response, 'Job Category');
     
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching JobCategory:', error);
      }
    );
  }

}
