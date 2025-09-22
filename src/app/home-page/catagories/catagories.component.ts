import { Component,OnInit , EventEmitter, Output } from '@angular/core';
import { UserSessionService } from '../../Services/userSession/userSession.Service';
import { Router } from '@angular/router';
import { WebsiteService } from '../../Services/website/website.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrl: './catagories.component.css'
})
export class CatagoriesComponent implements OnInit {

    @Output() categoriesSelected = new EventEmitter<string[]>();  

    isLoading: boolean = false;
  Job: any[] = [];
  selectedCategories: string[] = [];



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

  goToCategory(jobTitle: string): void {
  this.router.navigate(['/jobDisplay'], { queryParams: { title: jobTitle } });
}

 toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.categoriesSelected.emit(this.selectedCategories);
  }

}
