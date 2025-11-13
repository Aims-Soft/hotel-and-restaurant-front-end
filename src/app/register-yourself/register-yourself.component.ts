import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import { environment } from '../../environmentts/environment';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-register-yourself',
  templateUrl: './register-yourself.component.html',
  styleUrls: ['./register-yourself.component.css'],
})
export class RegisterYourselfComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUpload!: ImageUploadComponent;
  @ViewChild('imageFileInput') imageFileInput!: ElementRef;
  @ViewChild('pdfFileInput') pdfFileInput!: ElementRef;

  // File handling properties
  selectedImageFile: File | null = null;
  selectedPdfFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  imageFileName: string = '';
  pdfFileName: string = '';

  // Your existing properties
  isLoading: boolean = false;
  DegreeLevel: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordMismatch: boolean = false;
  isFormSubmitted: boolean = false;

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
  contactNo: string = '';
  address: string = '';
  description: string = '';
  profession: string = '';
  selectedGender: number | null = null;

  searchText: string = '';
  isDropdownOpen: boolean = false;
  filteredDomains: any[] = [];
  userProfile: any;
  

  constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private global: adminCompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDegreeLevel();
    this.getExperience();
    this.getCountries();
    this.getCities();
    this.getCompanyDomain();
    this.userProfile = 'https://www.w3schools.com/images/picture.jpg';
  }

  // File Upload Methods
  triggerImageUpload(): void {
    this.imageFileInput.nativeElement.click();
  }

  triggerPdfUpload(): void {
    this.pdfFileInput.nativeElement.click();
  }

  // Handle image file selection
  onImageFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.imageFileName = file.name;

      // Create preview for image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log('Image file selected:', file.name);
    }
    event.target.value = ''; // Reset input to allow selecting same file again
  }

  // Handle PDF file selection
  onPdfFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPdfFile = file;
      this.pdfFileName = file.name;

      console.log('PDF file selected:', file.name);
    }
    event.target.value = ''; // Reset input to allow selecting same file again
  }

  // Update the uploadFile method to handle both local and ImageUploadComponent
  uploadFile(event: any, type: string): void {
    if (type === 'images') {
      this.onImageFileSelected(event);
      // Also update ImageUploadComponent if available
      if (this.imageUpload) {
        this.imageUpload.uploadFile(event, type);
      }
    } else if (type === 'pdf') {
      this.onPdfFileSelected(event);
      // Also update ImageUploadComponent if available
      if (this.imageUpload) {
        this.imageUpload.uploadFile(event, type);
      }
    }
  }

  // Update validation to check local file references
  validateForm(): boolean {
    this.isFormSubmitted = true;
    const missingFields: string[] = [];

    // Check profile image using local file reference
    // if (!this.selectedImageFile) {
    //   missingFields.push('Profile Image');
    // }

    // Check resume using local file reference
    if (!this.selectedPdfFile) {
      missingFields.push('Resume');
    }

    if (!this.userName || this.userName.trim() === '') {
      missingFields.push('User Name');
    }

    const rawCnic = this.getRawCnic();
    if (!rawCnic || rawCnic.length !== 13) {
      missingFields.push('Valid CNIC (13 digits)');
    }

    if (!this.profession || this.profession.trim() === '') {
      missingFields.push('Profession');
    }

    if (!this.selectedDegree) {
      missingFields.push('Study Level');
    }

    if (!this.selectedExperience) {
      missingFields.push('Experience');
    }

    if (!this.selectedCountry) {
      missingFields.push('Country');
    }

    if (!this.selectedCity) {
      missingFields.push('City');
    }

    if (!this.contactNo || this.contactNo.trim() === '') {
      missingFields.push('Contact Number');
    }

    if (!this.address || this.address.trim() === '') {
      missingFields.push('Address');
    }

    if (!this.selectedGender) {
      missingFields.push('Gender');
    }

    if (!this.companyEmail || !this.isValidEmail(this.companyEmail)) {
      missingFields.push('Valid Email');
    }

    if (!this.password || this.password.trim() === '') {
      missingFields.push('Password');
    }

    if (!this.confirmPassword || this.confirmPassword.trim() === '') {
      missingFields.push('Confirm Password');
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      missingFields.push('Passwords must match');
    }

    if (!this.selectedDomains || this.selectedDomains.length === 0) {
      missingFields.push('At least one Domain');
    }

    if (missingFields.length > 0) {
      this.errorMessage = `Please fill in the following required fields: ${missingFields.join(
        ', '
      )}`;
      this.successMessage = '';

      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }

    return true;
  }

  // Update onRegister to use local file references
  onRegister(): void {
    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Ensure files are selected
    if (!this.selectedImageFile || !this.selectedPdfFile) {
      this.errorMessage = 'Please select both profile image and resume files.';
      return;
    }

      this.isLoading = true;

    // Prepare files for API - you'll need to convert files to base64 or FormData
    const imageBase64 = this.imageUrl as string;
    const imageBase64Data = imageBase64.split(',')[1]; // Remove data URL prefix

    // For PDF, you'll need to read it as base64
    const pdfReader = new FileReader();
    pdfReader.onload = (e: any) => {
      const pdfBase64 = e.target.result;
      const pdfBase64Data = pdfBase64.split(',')[1];

      const payload: any = {
        userID: 0,
        userName: this.userName,
        cnic: this.getRawCnic(),
        companyName: this.companyName,
        password: this.password,
        email: this.companyEmail,
        address: this.address,
        profession: this.profession,
        contactNo: this.contactNo,
        eResume: pdfBase64Data,
        eResumePath: environment.imageUrl + 'Applicant-resume',
        eResumeExt: 'pdf',
        eDoc: imageBase64Data,
        eDocPath: environment.imageUrl + 'Applicant-Profile',
        eDocExt: 'png',
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

      console.log('Final payload:', payload);
      this.submitRegistration(payload);
    };

    pdfReader.readAsDataURL(this.selectedPdfFile);
  }

  // Separate method for API call
  private submitRegistration(payload: any): void {
    // this.isLoading = true;

    this.RegisterUserService.saveUser(payload).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.includes('Success') == true) {
          console.log('Job saved successfully:', response);
          this.showSuccess(' User Register  successfully!');
          setTimeout(() => this.router.navigate(['/signIn']), 7000);
          // this.resetForm();
        } else {
          console.log('Error:', response);
          this.showError(response);
        }
      },
      (error) => {
        this.isLoading = false;
        this.showError('Error Registeration. Please try again.');
        console.error('Error saving User:', error);

        if (error.error && error.error.includes('FOREIGN KEY constraint')) {
          this.showError(
            'Backend Error'
          );
        }
      }
    );

    // this.RegisterUserService.saveUser(payload).subscribe({
    //   next: (res: any) => {
    //     this.isLoading = false;
    //     console.log('API Response:', res);

    //     if (Array.isArray(res) && res.length > 0) {
    //       const responseMessage = res[0];

    //       if (responseMessage.includes('User already Exist')) {
    //         this.errorMessage =
    //           'CNIC or Email already exists. Please use different credentials.';
    //         console.log(responseMessage);
    //         // this.successMessage = '';
    //         // window.scrollTo({ top: 0, behavior: 'smooth' });
    //         return;
    //       }

    //       if (responseMessage.includes('Success')) {
    //         const parts = responseMessage.split('|||');
    //         const userId = parts[1];
    //         console.log('New User ID:', userId);

    //         this.successMessage =
    //           'Registration successful! Redirecting to login page...';
    //         console.log(responseMessage);
    //         // this.errorMessage = '';
    //         // window.scrollTo({ top: 0, behavior: 'smooth' });

    //         setTimeout(() => {
    //           this.router.navigate(['/signIn']);
    //         }, 3000);
    //         return;
    //       }
    //     }

    //     // this.errorMessage = 'Unexpected response from server. Please try again.';
    //     // this.successMessage = '';
    //     // window.scrollTo({ top: 0, behavior: 'smooth' });
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Error:', err);
    //     this.errorMessage = 'Failed to register user. Please try again later.';
    //     this.successMessage = '';
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //   },
    // });
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 7000);
  }

  // Show success message
  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 7000);
  }
  // Rest of your existing methods remain the same...
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

  onCnicInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 13) {
      value = value.substring(0, 13);
    }

    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = value.substring(0, 5);
    }
    if (value.length > 5) {
      formattedValue += '-' + value.substring(5, 12);
    }
    if (value.length > 12) {
      formattedValue += '-' + value.substring(12, 13);
    }

    this.cnic = formattedValue;
  }

  getRawCnic(): string {
    return this.cnic.replace(/\D/g, '');
  }

  getDegreeLevel(): void {
    this.isLoading = true;
    this.RegisterUserService.getDegreeLevel().subscribe(
      (response) => {
        this.isLoading = false;
        this.DegreeLevel = response;
        console.log(response, 'study level');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  getExperience(): void {
    this.isLoading = true;
    this.RegisterUserService.getExperience().subscribe(
      (response) => {
        this.isLoading = false;
        this.experience = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Experience:', error);
      }
    );
  }

  getCountries(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCountries().subscribe(
      (response) => {
        this.isLoading = false;
        this.countries = response;
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
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Cities:', error);
      }
    );
  }

  onCountryChangeNgSelect(): void {
    if (this.selectedCountry) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryID === this.selectedCountry
      );
      this.selectedCity = null;
    } else {
      this.filteredCities = [];
      this.selectedCity = null;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  checkPasswordMatch(): void {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  getCompanyDomain(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getUserDomain().subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response;
        this.filteredDomains = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching User domains:', error);
      }
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.searchText = '';
      this.filteredDomains = this.companyDomains;
    }
  }

  onSearchChange(): void {
    const search = this.searchText.toLowerCase().trim();
    if (search === '') {
      this.filteredDomains = this.companyDomains;
    } else {
      this.filteredDomains = this.companyDomains.filter((domain: any) =>
        domain.domainTitle.toLowerCase().includes(search)
      );
    }
  }

  toggleDomain(domainId: number): void {
    if (this.selectedDomains.includes(domainId)) {
      this.selectedDomains = this.selectedDomains.filter(
        (id) => id !== domainId
      );
    } else {
      this.selectedDomains.push(domainId);
    }
  }

  removeDomain(domainId: number): void {
    this.selectedDomains = this.selectedDomains.filter((id) => id !== domainId);
  }

  getSelectedDomains(): any[] {
    return this.companyDomains.filter((domain) =>
      this.selectedDomains.includes(domain.domainID)
    );
  }

  isDomainSelected(domainId: number): boolean {
    return this.selectedDomains.includes(domainId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect')) {
      this.isDropdownOpen = false;
    }
  }
}
