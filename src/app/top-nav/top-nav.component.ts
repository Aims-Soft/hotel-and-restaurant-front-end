// import { Component,OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../Services/userSession/userSession.Service';

// @Component({
//   selector: 'app-top-nav',
//   templateUrl: './top-nav.component.html',
//   styleUrl: './top-nav.component.scss',
// })
// export class TopNavComponent implements OnInit {
//   isLoggedIn = false;
//   fullName: string | null = null;


//   constructor(public router: Router,
//     private usersessionservice: UserSessionService,

//   ) {}
//   ngOnInit(): void {
//     this.checkLoginStatus();
    
//   }

//     checkLoginStatus(): void {
//     this.isLoggedIn = this.usersessionservice.isLoggedIn();
//     if (this.isLoggedIn) {
//       const user = this.usersessionservice.getUser();
//       this.fullName = user?.fullName || null;
//     }
//   }

//   logout(): void {
//     this.usersessionservice.clearSession();
//     this.isLoggedIn = false;
//     this.router.navigate(['/']);
//   }


// }
import { Component, OnInit } from '@angular/core';
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
  roleId: number | null = null;
  companyId: any = null;

  constructor(
    public router: Router,
    private usersessionservice: UserSessionService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.usersessionservice.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.usersessionservice.getUser();
      this.fullName = user?.fullName || null;
      this.roleId = this.usersessionservice.getRoleId();
      this.companyId = this.usersessionservice.getCompanyID();
      
      console.log('User Role ID:', this.roleId);
      console.log('User Company ID:', this.companyId);
    }
  }

  // Check if "Go to Dashboard" button should be shown
  shouldShowDashboardButton(): boolean {
    // Show button only for roleId 2 (Company) or 3 (Admin)
    // Hide for roleId 1 (Regular User/Candidate)
    return this.isLoggedIn && (this.roleId === 2 || this.roleId === 3);
  }

    // Check if candidate-specific button should be shown (for Role ID 1 only)
  shouldShowCandidateButton(): boolean {
    // Show button only for roleId 1 (Candidate)
    return this.isLoggedIn && this.roleId === 1;
  }

  // Navigate to appropriate dashboard based on role
  goToDashboard(): void {
    if (this.roleId === 2) {
      // Company User - go to company dashboard
      console.log('Navigating to Company Dashboard');
      this.router.navigate(['/companyDashboard']); // or '/company-dashboard'
    } else if (this.roleId === 3) {
      // Admin - go to admin dashboard
      console.log('Navigating to Admin Dashboard');
      this.router.navigate(['/adminDashboard']); // or '/admin-dashboard'
    }
  }

    // Navigate to candidate profile/dashboard
  goToCandidateProfile(): void {
    console.log('Navigating to Candidate Profile');
    this.router.navigate(['/candidate-profile']); // or '/my-profile' or '/user-dashboard'
  }

  logout(): void {
    this.usersessionservice.clearSession();
    this.isLoggedIn = false;
    this.fullName = null;
    this.roleId = null;
    this.companyId = null;
    this.router.navigate(['/']);
  }
}