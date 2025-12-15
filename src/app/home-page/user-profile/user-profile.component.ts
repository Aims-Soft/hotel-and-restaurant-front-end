import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UserSessionService } from '../../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../../Services/register user/register-user.service';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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
  selectedDegree: number | null = null;
  countries: any[] = [];
  selectedCountry: number | null = null;
  cities: any[] = [];
  selectedCity: number | null = null;
  filteredCities: any[] = [];

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
  studyLevelTitle: string = '';

  searchText: string = '';
  isDropdownOpen: boolean = false;
  filteredDomains: any[] = [];

  // CRITICAL: Store original values from database
  originalProfileImageUrl: string = '';
  originalProfileImageExt: string = '';
  originalResumeUrl: string = '';
  originalResumeExt: string = '';

  currentUserId: number = 0;

  genders = [
    { genderID: 1, genderName: 'Male' },
    { genderID: 2, genderName: 'Female' },
    { genderID: 3, genderName: 'Others' },
  ];

  constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private global: adminCompanyService,
    private router: Router,
    private admincompanies: adminCompanyService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
    this.getUserDetail();
  }

  // Helper method for template to get resume URL
  get resumeUrl(): string {
    if (this.selectedPdfFile) {
      return URL.createObjectURL(this.selectedPdfFile);
    }
    return this.originalResumeUrl || '';
  }

  // Helper method to check if resume exists
  get hasResume(): boolean {
    return !!(this.selectedPdfFile || this.originalResumeUrl);
  }

  loadAllData(): void {
    this.isLoading = true;

    forkJoin({
      degrees: this.RegisterUserService.getDegreeLevel(),
      experience: this.RegisterUserService.getExperience(),
      countries: this.CompanyRegistrationService.getCountries(),
      cities: this.CompanyRegistrationService.getCities(),
      domains: this.CompanyRegistrationService.getUserDomain(),
    }).subscribe({
      next: (results) => {
        this.DegreeLevel = results.degrees;
        this.experience = results.experience;
        this.countries = results.countries;
        this.cities = results.cities;
        this.filteredCities = [...this.cities];
        this.companyDomains = results.domains;
        this.filteredDomains = results.domains;

        this.getUserDetail();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading dropdown data:', error);
        this.errorMessage =
          'Failed to load form data. Please refresh the page.';
      },
    });
  }

  // File Upload Methods
  triggerImageUpload(): void {
    this.imageFileInput.nativeElement.click();
  }

  triggerPdfUpload(): void {
    this.pdfFileInput.nativeElement.click();
  }

  // Handle image file selection
  // onImageFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  //     if (!allowedTypes.includes(file.type)) {
  //       alert('Only PNG and JPG images are allowed');
  //       return;
  //     }

  //     const maxSize = 5 * 1024 * 1024;
  //     if (file.size > maxSize) {
  //       alert('Image size should be less than 5MB');
  //       return;
  //     }

  //     this.selectedImageFile = file;
  //     this.imageFileName = file.name;

  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrl = e.target.result;
  //     };
  //     reader.readAsDataURL(file);

  //     console.log('New image file selected:', file.name);
  //   }
  //   event.target.value = '';
  // }

  //  onImageChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.onImageFileSelected(file); // your existing handler
  //   }
  // }

  //   onPdfChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.onPdfFileSelected(file); // your existing handler
  //   }
  // }

  profileEDoc: string = '';
  profileEDocExt: string = '';
  profileEDocPath: string = '';

  onImageFileSelected(fileData: any): void {
    this.profileEDoc = fileData.eDoc.split(',')[1];
    this.profileEDocExt = fileData.eDocExt;
    this.profileEDocPath =
      'C:\inetpub\wwwroot\jobPortal\jobPortal-app\assets\Job-images\Applicant-Profile';
    this.imageFileName = fileData.eDoc;

    console.log(fileData, 'pdf');
  }


  pdfEDoc: string = '';
  pdfEDocExt: string = '';
  pdfEDocPath: string = '';

  // Handle PDF file selection
  onPdfFileSelected(fileData: any): void {

     this.pdfEDoc = fileData.eDoc.split(',')[1];
    this. pdfEDocExt = fileData.eDocExt;
    this.pdfEDocPath ='C:\inetpub\wwwroot\jobPortal\jobPortal-app\assets\Job-images\Applicant-resume';
    this.pdfFileName = fileData.fileName;
    // const file = event.target.files[0];
    // if (file) {
    //   if (file.type !== 'application/pdf') {
    //     alert('Only PDF files are allowed');
    //     return;
    //   }

    //   const maxSize = 10 * 1024 * 1024;
    //   if (file.size > maxSize) {
    //     alert('PDF size should be less than 10MB');
    //     return;
    //   }

    //   this.selectedPdfFile = file;
    //   this.pdfFileName = file.name;

    //   console.log('New PDF file selected:', file.name);
    // }
    // event.target.value = '';
  }

  // Validation method
  validateForm(): boolean {
    this.isFormSubmitted = true;
    const missingFields: string[] = [];

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

    if (this.password && this.password !== this.confirmPassword) {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }

    return true;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

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

  onCountryChangeNgSelect(): void {
    if (this.selectedCountry) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryID === this.selectedCountry
      );
      if (this.selectedCity) {
        const cityExists = this.filteredCities.find(
          (c) => c.cityID === this.selectedCity
        );
        if (!cityExists) {
          this.selectedCity = null;
        }
      }
    } else {
      this.filteredCities = [...this.cities];
      this.selectedCity = null;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getUserDetail(): void {
    const currentUserId = this.userSessionService.getUserID();
    console.log('Current User ID:', currentUserId);

    if (!currentUserId) {
      this.isLoading = false;
      this.errorMessage = 'User ID not found. Please login again.';
      return;
    }

    this.admincompanies.getUserInfo(currentUserId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Full API Response:', response);

        if (response && Array.isArray(response) && response.length > 0) {
          const userData = response[0];
          this.currentUserId = userData.userID || currentUserId;

          // Populate form fields
          this.userName = userData.userName || '';
          this.cnic = this.formatCnic(userData.cnic || '');
          this.profession = userData.profession || '';
          this.studyLevelTitle = userData.studyLevelTitle || '';
          this.companyEmail = userData.email || '';
          this.contactNo = userData.contactNo || '';
          this.address = userData.address || '';
          this.description = userData.description || '';

          this.selectedDegree = userData.studylevel || null;
          this.selectedExperience = userData.experienceID || null;
          this.selectedGender = userData.genderID || null;
          this.selectedCity = userData.cityID || null;

          if (this.selectedCity && this.cities.length > 0) {
            const city = this.cities.find(
              (c) => c.cityID === this.selectedCity
            );
            if (city) {
              this.selectedCountry = city.countryID;
              this.onCountryChangeNgSelect();
            }
          }

          // Store original URLs from database
          this.originalProfileImageUrl = userData.eDoc || '';
          this.originalProfileImageExt = userData.eDocExt || 'png';
          this.originalResumeUrl = userData.eResume || '';
          this.originalResumeExt = userData.eResumeExt || 'pdf';

          // Set display values
          if (this.originalProfileImageUrl) {
            this.imageUrl = this.originalProfileImageUrl;
          }

          this.handleDomains(userData);

          console.log(
            'Original Profile Image URL:',
            this.originalProfileImageUrl
          );
          console.log('Original Resume URL:', this.originalResumeUrl);
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error fetching User Details:', error);
        this.errorMessage = 'Failed to load user details. Please try again.';
      },
    });
  }

  formatCnic(cnic: string): string {
    const rawCnic = cnic.replace(/\D/g, '');
    if (rawCnic.length === 13) {
      return `${rawCnic.substring(0, 5)}-${rawCnic.substring(
        5,
        12
      )}-${rawCnic.substring(12, 13)}`;
    }
    return cnic;
  }

  // NEW: Convert URL to Base64
  private async urlToBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          // Extract only the base64 part (after comma)
          const base64Data = base64.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting URL to base64:', error);
      return '';
    }
  }

  // UPDATED: Main update method with URL to base64 conversion
 async onRegister(): Promise<void> {
  this.successMessage = '';
  this.errorMessage = '';

  if (!this.validateForm()) return;

  this.isLoading = true;

  try {
    // -----------------------------------------------------------
    // 🔥 PROFILE IMAGE (eDoc)
    // -----------------------------------------------------------
    let finalProfileDoc = this.profileEDoc || '';            // new upload or empty
    let finalProfileExt = this.profileEDocExt || '';
    let finalProfilePath = this.profileEDocPath || '';

    // If user did NOT upload new image → use the old one
    if (!this.profileEDoc && this.originalProfileImageUrl) {
      finalProfileDoc = ''; // backend will not overwrite
      finalProfileExt = this.originalProfileImageExt;
      finalProfilePath = this.originalProfileImageUrl;
    }

    // -----------------------------------------------------------
    // 🔥 RESUME (eResume)
    // -----------------------------------------------------------
    let finalResumeDoc = this.pdfEDoc || '';   // new upload or empty
    let finalResumeExt = this.pdfEDocExt || '';
    let finalResumePath = this.pdfEDocPath || '';

    // No new upload → keep old resume
    if (!this.pdfEDoc && this.originalResumeUrl) {
      finalResumeDoc = ''; // backend will not overwrite
      finalResumeExt = this.originalResumeExt;
      finalResumePath = this.originalResumeUrl;
    }

    // -----------------------------------------------------------
    // 🔥 MAKE PAYLOAD
    // -----------------------------------------------------------
    const payload = {
      userID: this.currentUserId || 0,
      userName: this.userName,
      cnic: this.getRawCnic(),
      companyName: this.companyName || '',
      password: this.password || '',
      email: this.companyEmail,
      address: this.address,
      profession: this.profession,
      contactNo: this.contactNo,

      // ---------- Image ----------
      eDoc: finalProfileDoc,
      eDocExt: finalProfileExt,
      eDocPath: finalProfilePath,

      // ---------- Resume ----------
      eResume: finalResumeDoc,
      eResumeExt: finalResumeExt,
      eResumePath: finalResumePath,

      // Other fields
      experienceID: this.selectedExperience,
      studyLevelID: this.selectedDegree,
      companyStatusID: 1,
      cityID: this.selectedCity,
      genderID: Number(this.selectedGender),
      json: JSON.stringify(this.selectedDomains),
      roleID: 1,
      userTypeID: 1,
      spType: 'update',
    };

    console.log("FINAL PAYLOAD:", payload);

    // -----------------------------------------------------------
    // 🔥 Send To API
    // -----------------------------------------------------------
    this.submitProfileUpdate(payload);

  } catch (err) {
    console.error(err);
    this.errorMessage = "Something went wrong while preparing the request.";
    this.isLoading = false;
  }
}


  private submitProfileUpdate(payload: any): void {
    this.RegisterUserService.saveUser(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('API Response:', res);

        let responseMessage = '';

        if (Array.isArray(res) && res.length > 0) {
          responseMessage = res[0];
        } else if (typeof res === 'string') {
          responseMessage = res;
        } else if (res && typeof res === 'object') {
          responseMessage = JSON.stringify(res);
        }

        console.log('Processing response:', responseMessage);

        if (
          responseMessage.includes('Success') ||
          responseMessage.includes('success') ||
          responseMessage.startsWith('Success') ||
          responseMessage.includes('updated')
        ) {
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';

          // Clear password fields
          this.password = '';
          this.confirmPassword = '';

          // Clear new file selections
          this.selectedImageFile = null;
          this.selectedPdfFile = null;
          this.imageFileName = '';
          this.pdfFileName = '';

          window.scrollTo({ top: 0, behavior: 'smooth' });

          // Refresh user data
          setTimeout(() => {
            this.getUserDetail();
          }, 1000);

          return;
        } else {
          this.errorMessage =
            responseMessage || 'Failed to update profile. Please try again.';
          this.successMessage = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error:', err);

        if (err.status === 0) {
          this.errorMessage =
            'Network error. Please check your internet connection.';
        } else if (err.status === 400) {
          this.errorMessage =
            'Invalid data submitted. Please check your information.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }

        this.successMessage = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  private getFileExtension(filename: string): string {
    if (!filename) return '';
    const name = filename.split('/').pop() || filename;
    const parts = name.split('.');
    const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
    return ext.substring(0, 10);
  }

  // Domain dropdown methods
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

  checkPasswordMatch(): void {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  handleDomains(userData: any): void {
    try {
      if (userData.json) {
        const parsedDomains = JSON.parse(userData.json);
        if (Array.isArray(parsedDomains)) {
          this.selectedDomains = parsedDomains.map((d: any) =>
            typeof d === 'object' ? d.domainID : d
          );
        } else {
          this.selectedDomains = [];
        }
      } else {
        this.selectedDomains = [];
      }
    } catch (e) {
      console.error('Error parsing domains JSON:', e);
      this.selectedDomains = [];
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect')) {
      this.isDropdownOpen = false;
    }
  }
}
