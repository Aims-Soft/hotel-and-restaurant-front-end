import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IntroPageComponent } from './home-page/intro-page/intro-page.component';
import { FeaturedCompanyComponent } from './home-page/featured-company/featured-company.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { DreamJobComponent } from './home-page/dream-job/dream-job.component';
import { JobDisplayComponent } from './home-page/dream-job/job-display/job-display.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyDiscriptionComponent } from './company-discription/company-discription.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { VerticalNavComponent } from './vertical-nav/vertical-nav.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { CatagoriesComponent } from './home-page/catagories/catagories.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterYourselfComponent } from './register-yourself/register-yourself.component';

@NgModule({
  declarations: [
    AppComponent,
     TopNavComponent,
      HomePageComponent, 
      IntroPageComponent, 
      FeaturedCompanyComponent, 
      SignInComponent, 
      FooterComponent, 
      ContactComponent,
       DreamJobComponent, 
       JobDisplayComponent, 
       JobListingComponent,  
       CompaniesComponent, 
       CompanyDetailsComponent, 
       CompanyDiscriptionComponent, 
       ApplyFormComponent, 
       VerticalNavComponent,
        CreateJobsComponent, 
        ApplicationsComponent, 
         ApplicationDetailsComponent,
          PrivacyComponent,
           SettingsComponent, 
           AdminDashbordComponent,
            CatagoriesComponent,
             CompanyDashboardComponent,
             RegisterCompanyComponent,
             RegisterYourselfComponent
            ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     HttpClientModule,
     ReactiveFormsModule,
      FormsModule
    ],
  providers: [provideClientHydration(),provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
