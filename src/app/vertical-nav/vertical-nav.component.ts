import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { AuthSharedService } from '../Services/auth-shared/authShared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrl: './vertical-nav.component.css',
})
export class VerticalNavComponent implements OnInit, OnDestroy {
  constructor(
    private userSessionService: UserSessionService,
    private authSharedService: AuthSharedService,
    private router:Router,
  ) {}

  private subscription!: Subscription;
    loginName: string = '';
   menuList: any = [];
  showLogoDropdown: boolean = false;
   

  ngOnInit(): void {
    this.subscription = this.authSharedService.menuTrigger$.subscribe(() => {
      this.getMenu();
      
    });

    this.getMenu();
     this. getLoginName()
  }

 

  getMenu() {
    this.menuList = [];
    this.menuList = this.userSessionService.getMenus();

    console.log(this.menuList, 'menuList');
  }

 getLoginName() {
    // Get the current user from localStorage
    const user = this.userSessionService.getUser();
    
    if (user && user.loginName) {
      this.loginName = user.loginName;
    } else if (user && user.fullName) {
      // Fallback to fullName if loginName is not available
      this.loginName = user.fullName;
    } else {
      // Final fallback
      this.loginName = 'User';
    }

    console.log('Login Name:', this.loginName);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentMenus');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');

      this.router.navigate(['/signIn']);
  }
// Toggle logo dropdown
  toggleLogoDropdown() {
    this.showLogoDropdown = !this.showLogoDropdown;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    const target = event.target;
    const clickedInside = target.closest('.position-relative');
    
    if (!clickedInside && this.showLogoDropdown) {
      this.showLogoDropdown = false;
    }
  }



  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
