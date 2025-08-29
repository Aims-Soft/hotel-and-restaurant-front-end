import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { JobService } from '../Services/Job/Job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrl: './create-jobs.component.css',
})
export class CreateJobsComponent implements OnInit {
  isLoading: boolean = false;
  Job: any[] = [];
  JobType: any[] = [];
  WorkSpace: any[] = [];
  selectedJob: number | null = null;
  selectedJobType: number | null = null;
  selectedWorkSpace: number | null = null;
  experience: any[] = [];
  selectedExperience: number | null = null;
  countries: any[] = [];
  selectedCountry: number | null = null;
  cities: any[] = [];
  selectedCity: number | null = null;
  companyDomains: any[] = [];
  selectedSkills: number[] = [];
  benefits: any[] = [];
  selectedBenefits: number[] = [];
  jobID: any;

  jobTitle: string = '';
  educationReq: string = '';
  salaryRange: string = '';
  postingDate: string = '';
  expireDate: string = '';
  location: string = '';
  responsibilities: string = '';
  requirements: string = '';
  workspaceTypeID: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  fieldErrors: { [key: string]: string } = {};

  isEdit: boolean = false;
  jobId: number | null = null;
  tableDataParent: any = [];
   
  

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private route: ActivatedRoute,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobCategory();
    this.getJobType();
    this.getWorkSpace();
    this.getExperience();
    this.getCountries();
    this.getCities();
    this.getSkills();
    this.getBenefits();



    const jobFromState = history.state.job;
    // console.log('jobFromState:', jobFromState);

    if (jobFromState) {
      this.isEdit = true;
      // this.tableDataParent = jobFromState;

      this.edit(jobFromState);
    }
  }

  jobTypeID: any = '';

  edit(job: any) {
    this.isEdit = true;
    this.jobId = job.jobID;
    // alert('click here');
    // populate form fields
    console.log(job, 'job');
    this.jobTitle = job.jobTitle;
    this.salaryRange = job.salaryRange;
    this.postingDate = job.postingDate;
    this.expireDate = job.expireDate;
    this.requirements = job.requirements;
    this.location = job.location;
    this.responsibilities = job.responsibilities;

    // this.onJobType(job.jobTypeID);
    this.selectedJobType = job.jobTypeID;
    this.selectedWorkSpace = job.jobSpaceID;
    this.selectedCountry = job.countryID;
    this.selectedCity = job.cityID;
    this.selectedExperience = job.experienceID;
    this.selectedBenefits = job.benefitID;
    // console.log('benefitID:', job.benefitID);
    // this.selectedSkills=job.skillID;
    if (job.benefits && typeof job.benefits === 'string') {
      const parsedBenefits = JSON.parse(job.benefits || '[]');
      this.selectedBenefits = Array.isArray(parsedBenefits)
        ? parsedBenefits.map((b: any) => b.benefitID)
        : [];
    } else {
      this.selectedBenefits = [];
    }

    if (job.skills && typeof job.skills === 'string') {
      const parsedSkills = JSON.parse(job.skills || '[]');
      this.selectedSkills = Array.isArray(parsedSkills)
        ? parsedSkills.map((s: any) => s.skillID)
        : [];
    } else {
      this.selectedSkills = [];
    }

    this.filteredCities = this.cities.filter(
      (city) => city.countryID === this.selectedCountry
    );
  }

  getJobCategory(): void {
    this.isLoading = true;
    this.JobService.getJobCategory().subscribe(
      (response) => {
        this.isLoading = false;
        this.Job = response;
        console.log(response, 'Job Category');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching JobCategory:', error);
      }
    );
  }

  // onJobChange(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedJob = Number(select.value);
  //   console.log('Selected Job ID:', this.selectedJob);
  // }

  getJobType(): void {
    this.isLoading = true;
    this.JobService.getJobType().subscribe(
      (response) => {
        this.isLoading = false;
        this.JobType = response;
        console.log(response, 'Jobtypes');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Job Types:', error);
      }
    );
  }

  // onJobType(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedJobType = Number(select.value);
  //   console.log('Selected Job  Type ID:', this.selectedJobType);
  // }

  getWorkSpace(): void {
    this.isLoading = true;
    this.JobService.getWorkSpace().subscribe(
      (response) => {
        this.isLoading = false;
        this.WorkSpace = response;
        console.log(response, 'Workspace');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching WorkSpace:', error);
      }
    );
  }

  // ongetWorkSpace(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedWorkSpace = Number(select.value);
  //   console.log('Selected WorkSpace ID:', this.selectedWorkSpace);
  // }

  getExperience(): void {
    this.isLoading = true;
    this.RegisterUserService.getExperience().subscribe(
      (response) => {
        this.isLoading = false;
        this.experience = response;
        console.log('Experience:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Experience:', error);
      }
    );
  }
  // onExperienceChange(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedExperience = Number(select.value);
  //   console.log('Selected Exerperience ID:', this.selectedExperience);
  // }

  getCountries(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCountries().subscribe(
      (response) => {
        this.isLoading = false;
        this.countries = response;
        console.log('Countries:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Countries:', error);
      }
    );
  }

  filteredCities: any[] = [];

  getCities(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCities().subscribe(
      (response) => {
        this.isLoading = false;
        this.cities = response;

        if (this.selectedCountry) {
          this.filteredCities = this.cities.filter(
            (city) => city.countryID === this.selectedCountry
          );
        }
        console.log('All Cities:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Cities:', error);
      }
    );
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCountry = Number(select.value);

    if (this.selectedCountry) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryID === this.selectedCountry
      );
    }
  }

  // onCityChange(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedCity = Number(select.value);
  //   console.log('Selected City ID:', this.selectedCity);
  // }

  // skilljason is get company domain
  getSkills(): void {
    this.isLoading = true;
    this.JobService.getSkills().subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response;
        console.log('Company Domains:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
      }
    );
  }

  toggleSkills(skillID: number): void {
    if (this.selectedSkills.includes(skillID)) {
      // remove if already selected
      this.selectedSkills = this.selectedSkills.filter((id) => id !== skillID);
    } else {
      // add if not selected
      this.selectedSkills.push(skillID);
    }
    console.log('Selected Domains:', this.selectedSkills);
  }

  getBenefits(): void {
    this.isLoading = true;
    this.JobService.getBenefits().subscribe(
      (response) => {
        this.isLoading = false;
        this.benefits = response; // [{id:1,name:"PHP"},...]
        console.log('Company Domains:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
      }
    );
  }

  toggleBenefits(benefitID: number): void {
    if (this.selectedBenefits.includes(benefitID)) {
      // remove if already selected
      this.selectedBenefits = this.selectedBenefits.filter(
        (id) => id !== benefitID
      );
    } else {
      // add if not selected
      this.selectedBenefits.push(benefitID);
    }
    console.log('Selected Domains:', this.selectedBenefits);
  }

  onSubmit(): void {



    
    this.clearMessages();
    if (!this.validateForm()) {
      this.isLoading = false;
      this.showError('Please fix the highlighted errors before submitting.');
      return;
    }


    this.isLoading = true;
    const payload = {

      jobTitle: this.jobTitle,
      companyID: 1,
      jobTypeID: Number(this.selectedJobType),
      jobSpaceID: Number(this.selectedWorkSpace),
      experienceID: Number(this.selectedExperience),
      educationReq: this.educationReq,
      salaryRange: this.salaryRange,
      postingDate: this.postingDate,
      expireDate: this.expireDate,
      cityID: Number(this.selectedCity),
      countryID: Number(this.selectedCountry),
      jobStatusID: 1,
      location: this.location,
      responsibilities: this.responsibilities,
      requirements: this.requirements,
      benefitjson: JSON.stringify(this.selectedBenefits),
      skilljson: JSON.stringify(this.selectedSkills),
      userID: this.userSessionService.getUserID(),
      spType: this.isEdit ? 'update' : 'insert',
      jobID: this.isEdit ? Number(this.jobId) : 0,
    };

    

    console.log('Saving job with payload:', payload);

    this.JobService.saveJob(payload).subscribe(
      (response) => {
        this.isLoading = false;
        if (response[0].includes('Success') == true) {
          console.log('Job saved successfully:', response);
          this.showSuccess(
            this.isEdit
              ? 'Job updated successfully!'
              : 'Job posted successfully!'
          );
          this.resetForm();
        } else {
          this.showError(response[0]);
        }
      },
      (error) => {
        this.isLoading = false;
        this.showError('Error posting job. Please try again.');
        console.error('Error saving job:', error);

        if (error.error && error.error.includes('FOREIGN KEY constraint')) {
          this.showError(
            'Invalid skills selected. Please choose from the available options.'
          );
        }
      }
    );
  }

  // Validation method
  validateForm(): boolean {
    this.fieldErrors = {};

    if (!this.jobTitle) this.fieldErrors['jobTitle'] = 'Job title is required';
    if (!this.selectedJob)
      this.fieldErrors['jobCategory'] = 'Job category is required';
    if (!this.selectedJobType)
      this.fieldErrors['jobType'] = 'Job type is required';
    if (!this.selectedWorkSpace)
      this.fieldErrors['workspace'] = 'Workspace type is required';
    if (!this.selectedExperience)
      this.fieldErrors['experience'] = 'Experience level is required';
    if (!this.salaryRange)
      this.fieldErrors['salaryRange'] = 'Salary range is required';
    if (!this.postingDate)
      this.fieldErrors['postingDate'] = 'Posting date is required';
    if (!this.expireDate)
      this.fieldErrors['expireDate'] = 'Expiry date is required';
    if (!this.selectedCountry)
      this.fieldErrors['country'] = 'Country is required';
    if (!this.selectedCity) this.fieldErrors['city'] = 'City is required';
    if (!this.location) this.fieldErrors['location'] = 'Location is required';
    if (!this.responsibilities)
      this.fieldErrors['responsibilities'] = 'Responsibilities are required';
    if (!this.requirements)
      this.fieldErrors['requirements'] = 'Requirements are required';
    if (this.selectedSkills.length === 0)
      this.fieldErrors['skills'] = 'At least one skill is required';
    if (this.selectedBenefits.length === 0)
      this.fieldErrors['benefits'] = 'At least one benefit is required';

    // Date validation
    if (this.postingDate && this.expireDate) {
      const postDate = new Date(this.postingDate);
      const expDate = new Date(this.expireDate);

      if (expDate <= postDate) {
        this.fieldErrors['expireDate'] =
          'Expiry date must be after posting date';
      }
    }

    return Object.keys(this.fieldErrors).length === 0;
  }

  // Clear messages
  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.fieldErrors = {};
  }

  // Show error message
  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  // Show success message
  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  resetForm(): void {
    this.jobTitle = '';
    this.selectedJob = null;
    this.selectedJobType = null;
    this.selectedWorkSpace = null;
    this.selectedExperience = null;
    this.educationReq = '';
    this.salaryRange = '';
    this.postingDate = '';
    this.expireDate = '';
    this.selectedCountry = null;
    this.selectedCity = null;
    this.location = '';
    this.responsibilities = '';
    this.requirements = '';
    this.selectedSkills = [];
    this.selectedBenefits = [];
    this.filteredCities = [];
    this.fieldErrors = {};
  }
}
