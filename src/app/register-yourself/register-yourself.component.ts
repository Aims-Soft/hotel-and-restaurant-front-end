import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';

@Component({
  selector: 'app-register-yourself',
  templateUrl: './register-yourself.component.html',
  styleUrl: './register-yourself.component.css',
})
export class RegisterYourselfComponent implements OnInit {
  isLoading: boolean = false;
  DegreeLevel: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  passwordMismatch: boolean = false;


  companyDomains: any[] = [];
  selectedDomains: number[] = [];
  experience: any[] = [];
  selectedExperience: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isImage = false;
  selectedDegree: number | null = null;
  countries: any[] = [];
  selectedCountry: number | null = null;
  cities: any[] = [];
  selectedCity: number | null = null;
  foundedIn: string = '';
  selectedBannerFile: File | null = null;
  bannerPreviewUrl: string | ArrayBuffer | null = null;
  isBannerImage = false;

  userName: string = '';
  cnic: string = '';
  companyName: string = '';
  password: string = '';
  confirmPassword: string = '';
  companyEmail: string = '';
  // cnicMask = this.global.cnicMask();
  // cnicMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
// cnic: string = '';

  contactNo: string = '';
  address: string = '';
  description: string = '';
  profession: string = '';
  selectedGender: number | null = null;

  constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private global:adminCompanyService
  ) {}

  ngOnInit(): void {
    this.getDegreeLevel();
    this.getExperience();
    this.getCountries();
    this.getCities();
    this.getCompanyDomain();
  }


    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
  this.showConfirmPassword = !this.showConfirmPassword;
}


  genders = [
    { genderID: 1, genderName: 'Male' },
    { genderID: 2, genderName: 'Female' },
    { genderID: 3, genderName: 'Others' },
  ];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileType = this.selectedFile.type;

      this.isImage = fileType.startsWith('image/');

      if (this.isImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.previewUrl = 'pdf';
      }
    }
  }

  onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedBannerFile = input.files[0];
      const fileType = this.selectedBannerFile.type;

      this.isBannerImage = fileType.startsWith('image/');

      if (this.isBannerImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bannerPreviewUrl = reader.result;
        };
        reader.readAsDataURL(this.selectedBannerFile);
      } else {
        // For PDFs just show name
        this.bannerPreviewUrl = 'pdf';
      }
    }
  }

  getDegreeLevel(): void {
    this.isLoading = true;
    this.RegisterUserService.getDegreeLevel().subscribe(
      (response) => {
        this.isLoading = false;
        this.DegreeLevel = response;
        console.log(response, 'types');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  onStudyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDegree = Number(select.value);
    console.log('Selected Industry ID:', this.selectedDegree);
  }

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
  onExperienceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedExperience = Number(select.value);
    console.log('Selected Exerperience ID:', this.selectedExperience);
  }

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
    console.log('Selected Country ID:', this.selectedCountry);

    if (this.selectedCountry) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryID === this.selectedCountry
      );
    }
  }

  onCityChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCity = Number(select.value);
    console.log('Selected City ID:', this.selectedCity);
  }

  onRegister(): void {

      if (this.password !== this.confirmPassword) {
    this.passwordMismatch = true;
    return;
  }
  this.passwordMismatch = false;

    const payload: any = {
      userID: 0,
      userName: this.userName,
      cnic: this.cnic,
      companyName: this.companyName,
      password: this.password,
      email: this.companyEmail,
      address: this.address,
      profession: this.profession,
      contactNo: this.contactNo,
      eResume: null,
      eResumePath: '',
      eResumeExt: '',
      eDoc: null,
      eDocPath: '',
      eDocExt: '',
      experienceID: this.selectedExperience,
      studyLevelID: this.selectedDegree,
      companyStatusID: 1,
      cityID: this.selectedCity,
      genderID: Number(this.selectedGender),
      json: JSON.stringify(this.selectedDomains),
      roleID: 1,
      userTypeID: 1,

      spType: 'insert',
    };

    //   console.log("Selected Domains:", this.selectedDomains);
    // console.log("Payload JSON:", JSON.stringify(this.selectedDomains));



    const filePromises: Promise<void>[] = [];

    if (this.selectedFile) {
      const filePromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eDoc = base64.split(',')[1];
          payload.eDocExt = this.selectedFile?.name.split('.').pop() || '';
          resolve();
        };

        if (this.selectedFile) {
          reader.readAsDataURL(this.selectedFile);
        } else {
          resolve();
        }
      });
      filePromises.push(filePromise);
    }

    if (this.selectedBannerFile) {
      const bannerPromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eResume = base64.split(',')[1]; // Remove data:image/... prefix
          payload.eResumeExt =
            this.selectedBannerFile?.name.split('.').pop() || '';
          resolve();
        };

        if (this.selectedBannerFile) {
          reader.readAsDataURL(this.selectedBannerFile);
        } else {
          resolve();
        }
      });
      filePromises.push(bannerPromise);
    }

    Promise.all(filePromises).then(() => {
      console.log('Final payload:', payload);

      this.RegisterUserService.saveUser(payload).subscribe({
        next: (res) => {
          console.log('user registered:', res);
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error:', err);
          console.error('Error details:', err.error);
          this.errorMessage = 'Failed to register user. Try again.';
          this.successMessage = '';
        },
      });
    });
  }

  checkPasswordMatch(): void {
  this.passwordMismatch = this.password !== this.confirmPassword;
}
  getCompanyDomain(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCompanyDomain().subscribe(
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

  toggleDomain(domainId: number): void {
    if (this.selectedDomains.includes(domainId)) {
      this.selectedDomains = this.selectedDomains.filter(
        (id) => id !== domainId
      );
    } else {
      this.selectedDomains.push(domainId);
    }
    console.log('Selected Domains:', this.selectedDomains);
  }
}
