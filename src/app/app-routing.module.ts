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

import { PrivacyComponent } from './privacy/privacy.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterYourselfComponent } from './register-yourself/register-yourself.component';
import { AdminCompaniesComponent } from './admin-companies/admin-companies.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminViewCompaniesComponent } from './admin-companies/admin-view-companies/admin-view-companies.component';
import { AdminJobDetailComponent } from './admin-jobs/admin-job-detail/admin-job-detail.component';
import { ApplicationDetailComponent } from './applications/application-detail/application-detail.component';
import { CandiateProfileComponent } from './candidates/candiate-profile/candiate-profile.component';
import { ResumeComponent } from './candidates/candiate-profile/resume/resume.component';
import { CompanyJobUserComponent } from './admin-companies/admin-view-companies/company-job-user/company-job-user.component';
import { JobDisplayComponent } from './home-page/dream-job/job-display/job-display.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ForgetPasswordComponent } from './sign-in/forget-password/forget-password.component';
import { EnterCodeComponent } from './sign-in/forget-password/enter-code/enter-code.component';
import { ResetPasswordComponent } from './sign-in/forget-password/enter-code/reset-password/reset-password.component';
import { UserProfileComponent } from './home-page/user-profile/user-profile.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'jobListing', component: JobListingComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companyDetails/:id', component: CompanyDetailsComponent },
  { path: 'companyDiscription/:id', component: CompanyDiscriptionComponent },
  { path: 'applyForm/:id', component: ApplyFormComponent },
  { path: 'registercompany', component: RegisterCompanyComponent },
  { path: 'registeryourself', component: RegisterYourselfComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'enterCode', component: EnterCodeComponent},
  { path: 'resetPassword',component: ResetPasswordComponent},
  {path:'userprofile',component:UserProfileComponent},

  

  //  ADMIN SECTION

  {
    path: '',
    component: VerticalNavComponent,
    children: [
      { path: 'adminDashboard', component: AdminDashbordComponent },
      { path: 'admincompanies', component: AdminCompaniesComponent },
      { path: 'adminjobs', component: AdminJobsComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'adminsettings', component: AdminSettingComponent },
      { path: 'adminviewcompanies', component: AdminViewCompaniesComponent },
      { path: 'adminjobdetail', component: AdminJobDetailComponent },
      { path: 'candidateprofile', component: CandiateProfileComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'companyjobuser', component: CompanyJobUserComponent },
      {path: 'contactMessage',component:ContactMessagesComponent},
      {path:'configuration', component:ConfigurationComponent}
    ],
  },

  //  COMPANY SECTION

  {
    path: '',
    component: VerticalNavComponent,
    children: [
      { path: 'companyDashboard', component: CompanyDashboardComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'jobs', component: JobDisplayComponent },
      { path: 'createJobs', component: CreateJobsComponent },
      {
        path: 'applicationdetails/:jobId',
        component: ApplicationDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide:LocationStrategy,useClass: HashLocationStrategy}]
})
export class AppRoutingModule {}

// const routes: Routes = [
//   { path: '', component: HomePageComponent },
//   { path: 'contact', component: ContactComponent },
//   { path: 'signIn', component: SignInComponent },
//   { path: 'jobListing', component: JobListingComponent },
//   { path: 'companies', component: CompaniesComponent },
//   { path: 'companyDetails/:id', component: CompanyDetailsComponent },
//   { path: 'companyDiscription/:id', component: CompanyDiscriptionComponent },
//   { path: 'applyForm/:id', component: ApplyFormComponent },
//   { path: 'verticalNav', component: VerticalNavComponent },
//   { path: 'createJobs', component: CreateJobsComponent },
//   // { path: 'create-job/:jobId', component: CreateJobsComponent },
//   { path: 'applications', component: ApplicationsComponent },

//   { path: 'privacy', component: PrivacyComponent },
//   { path: 'settings', component: SettingsComponent },
//   { path: 'adminDashboard', component: AdminDashbordComponent },
//   { path: 'companyDashboard', component: CompanyDashboardComponent },
//   {path:'applicationdetails/:jobId', component:ApplicationDetailComponent},
//   { path: 'registercompany', component: RegisterCompanyComponent },
//   { path: 'registeryourself', component: RegisterYourselfComponent },
//   { path: 'admincompanies', component: AdminCompaniesComponent },
//   { path: 'adminjobs', component: AdminJobsComponent },
//   { path: 'candidates', component: CandidatesComponent },
//   { path: 'adminsettings', component: AdminSettingComponent },
//   { path: 'adminviewcompanies', component: AdminViewCompaniesComponent },
//   { path: 'adminjobdetail', component: AdminJobDetailComponent },
//   {path:'candidateprofile', component:CandiateProfileComponent },
//   {path: 'resume',component:ResumeComponent},
//   {path:'companyjobuser',component:CompanyJobUserComponent},
//   {path:'jobs',component:JobDisplayComponent}

// ];
