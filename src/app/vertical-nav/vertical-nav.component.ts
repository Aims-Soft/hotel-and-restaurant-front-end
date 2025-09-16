import { Component, OnInit, OnDestroy } from '@angular/core';
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

  ngOnInit(): void {
    this.subscription = this.authSharedService.menuTrigger$.subscribe(() => {
      this.getMenu();
    });

    this.getMenu();
  }

  menuList: any = [];

  getMenu() {
    this.menuList = [];
    this.menuList = this.userSessionService.getMenus();

    console.log(this.menuList, 'menuList');
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentMenus');
    localStorage.removeItem('authToken');

      this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
