import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent implements OnInit {
  isLoggedIn = false;
  fullName: string | null = null;


  constructor(public router: Router,
    private usersessionservice: UserSessionService,

  ) {}
  ngOnInit(): void {
    this.checkLoginStatus();
    
  }

    checkLoginStatus(): void {
    this.isLoggedIn = this.usersessionservice.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.usersessionservice.getUser();
      this.fullName = user?.fullName || null;
    }
  }

  logout(): void {
    this.usersessionservice.clearSession();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
