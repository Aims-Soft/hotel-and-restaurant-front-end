import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

import { PrivacyComponent } from './privacy/privacy.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { CatagoriesComponent } from './home-page/catagories/catagories.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterYourselfComponent } from './register-yourself/register-yourself.component';
import { AdminCompaniesComponent } from './admin-companies/admin-companies.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { SearchPipe } from './pipes/search.pipe';
import { AdminViewCompaniesComponent } from './admin-companies/admin-view-companies/admin-view-companies.component';
import { AdminJobDetailComponent } from './admin-jobs/admin-job-detail/admin-job-detail.component';
import { ApplicationDetailComponent } from './applications/application-detail/application-detail.component';
import { CandiateProfileComponent } from './candidates/candiate-profile/candiate-profile.component';
import { ResumeComponent } from './candidates/candiate-profile/resume/resume.component';
import { CompanyJobUserComponent } from './admin-companies/admin-view-companies/company-job-user/company-job-user.component';
import { AuthInterceptor } from '../Interceptors/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ForgetPasswordComponent } from './sign-in/forget-password/forget-password.component';
import { EnterCodeComponent } from './sign-in/forget-password/enter-code/enter-code.component';
import { ResetPasswordComponent } from './sign-in/forget-password/enter-code/reset-password/reset-password.component';
import { UserProfileComponent } from './home-page/user-profile/user-profile.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { FilterMessagesPipe } from './pipes/filter-messages.pipe';
import { FilePickerComponent } from './file-picker/file-picker.component';

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

    PrivacyComponent,
    SettingsComponent,
    AdminDashbordComponent,
    CatagoriesComponent,
    CompanyDashboardComponent,
    RegisterCompanyComponent,
    RegisterYourselfComponent,
    AdminCompaniesComponent,
    AdminJobsComponent,
    CandidatesComponent,
    AdminSettingComponent,
    SearchPipe,
    AdminViewCompaniesComponent,
    AdminJobDetailComponent,
    ApplicationDetailComponent,
    CandiateProfileComponent,
    ResumeComponent,
    CompanyJobUserComponent,
    ForgetPasswordComponent,
    EnterCodeComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    ImageUploadComponent,
    ContactMessagesComponent,
    FilterMessagesPipe,
    FilePickerComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule, 
   
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
