import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
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
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'signIn', component: SignInComponent},
  {path: 'jobListing', component: JobListingComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'companyDetails',component: CompanyDetailsComponent},
  {path:'companyDiscription',component: CompanyDiscriptionComponent},
  {path:'applyForm',component:ApplyFormComponent},
  {path:'verticalNav',component:VerticalNavComponent},
  {path: 'createJobs', component:CreateJobsComponent},
  {path: 'applications', component:ApplicationsComponent},
  {path: 'applicationDetails', component:ApplicationDetailsComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path:'settings', component:SettingsComponent},
  {path:'adminDashboard',component:AdminDashbordComponent},
  {path:'companyDashboard',component:CompanyDashboardComponent},
  {path:'adminDashboard',component:AdminDashbordComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
