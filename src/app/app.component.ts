import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'career';
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
  if (event instanceof NavigationEnd && typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
});
  }
  showNav(): boolean {
    return !['/signIn','/applyForm','/companyDashboard','/verticalNav','/createJobs','/applications','/privacy','/applicationDetails','/settings','/adminDashboard'].includes(this.router.url);
  }

  showSideNav(): boolean {
    return ['/companyDashboard','/verticalNav','/createJobs','/applications','/privacy','/applicationDetails','/settings','/adminDashboard'].includes(this.router.url);
  }

  
}
