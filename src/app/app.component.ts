import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'career';
  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  }
  showNav(): boolean {
    const url = this.router.url;
    return !(
      url.startsWith('/applicationdetails') || url.startsWith ('/candidateprofile') ||
      [
        '/signIn',
        '/applyForm',
        '/companyDashboard',
        '/verticalNav',
        '/createJobs',
        '/applications',
        '/privacy',
        '/settings',
        '/adminDashboard',
        '/admincompanies',
        '/adminjobs',
        '/candidates',
        '/adminsettings',
        // '/registercompany',
        // '/registeryourself',
        '/adminviewcompanies',
        '/adminjobdetail',
        '/cadidateprofile',
        '/resume',
        '/companyjobuser',
        '/forgetPassword',
        '/enterCode',
        '/resetPassword',
        '/contactMessage'
      ].includes(url)
    );
  }

  showSideNav(): boolean {
    const url = this.router.url;
    return (
      url.startsWith('/applicationdetails') || url.startsWith ('/candidateprofile') ||
      [
        '/companyDashboard',
        '/verticalNav',
        '/createJobs',
        '/applications',
        '/privacy',
        '/settings',
        '/adminDashboard',
        '/admincompanies',
        '/adminjobs',
        '/candidates',
        '/adminsettings',
        '/adminviewcompanies',
        '/adminjobdetail',
        '/companyjobuser',
        '/resume',
        '/contactMessage',
      
      ].includes(url)
    );
  }
}