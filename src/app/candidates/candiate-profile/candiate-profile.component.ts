import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';

@Component({
  selector: 'app-candiate-profile',
  templateUrl: './candiate-profile.component.html',
  styleUrl: './candiate-profile.component.css'
})
export class CandiateProfileComponent  implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(  private router:Router,
    private admincompanyservice:adminCompanyService,
    private route:ActivatedRoute,
  ){
  
  }


  resume(){

    this.router.navigate(['/resume']);

  }

}
