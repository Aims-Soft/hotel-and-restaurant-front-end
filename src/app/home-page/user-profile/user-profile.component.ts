// import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
// import { UserSessionService } from '../../Services/userSession/userSession.Service';
// import { CompanyRegistrationService } from '../../Services/Company registration/company-registration.service';
// import { RegisterUserService } from '../../Services/register user/register-user.service';
// import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
// import { Router } from '@angular/router';
// import { forkJoin } from 'rxjs';
// import { environment } from '../../../environmentts/environment';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
//   @ViewChild('imageFileInput') imageFileInput!: ElementRef;
//   @ViewChild('pdfFileInput') pdfFileInput!: ElementRef;

//   // File handling properties - Same as registration component
//   selectedImageFile: File | null = null;
//   selectedPdfFile: File | null = null;
//   imageUrl: string | ArrayBuffer | null = null;
//   imageFileName: string = '';
//   pdfFileName: string = '';

//   // Your existing properties
//   isLoading: boolean = false;
//   DegreeLevel: any[] = [];
//   successMessage: string = '';
//   errorMessage: string = '';
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;
//   passwordMismatch: boolean = false;
//   isFormSubmitted: boolean = false;

//   companyDomains: any[] = [];
//   selectedDomains: number[] = [];
//   experience: any[] = [];
//   selectedExperience: number | null = null;
//   selectedDegree: number | null = null;
//   countries: any[] = [];
//   selectedCountry: number | null = null;
//   cities: any[] = [];
//   selectedCity: number | null = null;
//   filteredCities: any[] = [];

//   userName: string = '';
//   cnic: string = '';
//   companyName: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   companyEmail: string = '';
//   contactNo: string = '';
//   address: string = '';
//   description: string = '';
//   profession: string = '';
//   selectedGender: number | null = null;
//   studyLevelTitle: string = '';

//   searchText: string = '';
//   isDropdownOpen: boolean = false;
//   filteredDomains: any[] = [];

//   // Existing file data for update
//   existingProfileImageUrl: string = '';
//   existingProfileImageBase64: string = '';
//   existingProfileImageExt: string = '';

//   existingResumeUrl: string = '';
//   existingResumeBase64: string = '';
//   existingResumeExt: string = '';

//   currentUserId: number = 0;

//   constructor(
//     private userSessionService: UserSessionService,
//     private CompanyRegistrationService: CompanyRegistrationService,
//     private RegisterUserService: RegisterUserService,
//     private global: adminCompanyService,
//     private router: Router,
//     private admincompanies: adminCompanyService
//   ) {}

//   ngOnInit(): void {
//     this.loadAllData();
//   }

//   // Helper method for template to get resume URL
//   get resumeUrl(): string {
//     return this.existingResumeUrl || this.existingResumeBase64 || '';
//   }

//   // Helper method to check if resume exists
//   get hasResume(): boolean {
//     return !!(this.existingResumeUrl || this.existingResumeBase64 || this.selectedPdfFile);
//   }

//   loadAllData(): void {
//     this.isLoading = true;

//     forkJoin({
//       degrees: this.RegisterUserService.getDegreeLevel(),
//       experience: this.RegisterUserService.getExperience(),
//       countries: this.CompanyRegistrationService.getCountries(),
//       cities: this.CompanyRegistrationService.getCities(),
//       domains: this.CompanyRegistrationService.getUserDomain(),
//     }).subscribe({
//       next: (results) => {
//         this.DegreeLevel = results.degrees;
//         this.experience = results.experience;
//         this.countries = results.countries;
//         this.cities = results.cities;
//         this.filteredCities = [...this.cities];
//         this.companyDomains = results.domains;
//         this.filteredDomains = results.domains;

//         this.getUserDetail();
//       },
//       error: (error) => {
//         this.isLoading = false;
//         console.error('Error loading dropdown data:', error);
//         this.errorMessage = 'Failed to load form data. Please refresh the page.';
//       },
//     });
//   }

//   // File Upload Methods - Same as registration component
//   triggerImageUpload(): void {
//     this.imageFileInput.nativeElement.click();
//   }

//   triggerPdfUpload(): void {
//     this.pdfFileInput.nativeElement.click();
//   }

//   // Handle image file selection - Same as registration component
//   onImageFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Only PNG and JPG images are allowed');
//         return;
//       }

//       // Validate file size (max 5MB)
//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       this.selectedImageFile = file;
//       this.imageFileName = file.name;
      
//       // Create preview for image
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.imageUrl = e.target.result;
//       };
//       reader.readAsDataURL(file);

//       // Clear existing file references since we have a new file
//       this.existingProfileImageUrl = '';
//       this.existingProfileImageBase64 = '';

//       console.log('Image file selected:', file.name);
//     }
//     event.target.value = ''; // Reset input to allow selecting same file again
//   }

//   // Handle PDF file selection - Same as registration component
//   onPdfFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       if (file.type !== 'application/pdf') {
//         alert('Only PDF files are allowed');
//         return;
//       }

//       // Validate file size (max 10MB)
//       const maxSize = 10 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('PDF size should be less than 10MB');
//         return;
//       }

//       this.selectedPdfFile = file;
//       this.pdfFileName = file.name;
      
//       // Clear existing file references since we have a new file
//       this.existingResumeUrl = '';
//       this.existingResumeBase64 = '';

//       console.log('PDF file selected:', file.name);
//     }
//     event.target.value = ''; // Reset input to allow selecting same file again
//   }

//   // Validation method - Updated for profile (files are optional for update)
//   validateForm(): boolean {
//     this.isFormSubmitted = true;
//     const missingFields: string[] = [];

//     if (!this.userName || this.userName.trim() === '') {
//       missingFields.push('User Name');
//     }
    
//     const rawCnic = this.getRawCnic();
//     if (!rawCnic || rawCnic.length !== 13) {
//       missingFields.push('Valid CNIC (13 digits)');
//     }
    
//     if (!this.profession || this.profession.trim() === '') {
//       missingFields.push('Profession');
//     }
    
//     if (!this.selectedCountry) {
//       missingFields.push('Country');
//     }
    
//     if (!this.selectedCity) {
//       missingFields.push('City');
//     }
    
//     if (!this.contactNo || this.contactNo.trim() === '') {
//       missingFields.push('Contact Number');
//     }
    
//     if (!this.address || this.address.trim() === '') {
//       missingFields.push('Address');
//     }
    
//     if (!this.selectedGender) {
//       missingFields.push('Gender');
//     }
    
//     if (!this.companyEmail || !this.isValidEmail(this.companyEmail)) {
//       missingFields.push('Valid Email');
//     }
    
//     // Password validation only if provided (optional for update)
//     if (this.password && this.password !== this.confirmPassword) {
//       this.passwordMismatch = true;
//       missingFields.push('Passwords must match');
//     }
    
//     if (!this.selectedDomains || this.selectedDomains.length === 0) {
//       missingFields.push('At least one Domain');
//     }

//     if (missingFields.length > 0) {
//       this.errorMessage = `Please fill in the following required fields: ${missingFields.join(', ')}`;
//       this.successMessage = '';
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return false;
//     }

//     return true;
//   }

//   // Rest of your existing methods remain mostly the same...
//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   genders = [
//     { genderID: 1, genderName: 'Male' },
//     { genderID: 2, genderName: 'Female' },
//     { genderID: 3, genderName: 'Others' },
//   ];

//   onCnicInput(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     let value = input.value.replace(/\D/g, '');

//     if (value.length > 13) {
//       value = value.substring(0, 13);
//     }

//     let formattedValue = '';
//     if (value.length > 0) {
//       formattedValue = value.substring(0, 5);
//     }
//     if (value.length > 5) {
//       formattedValue += '-' + value.substring(5, 12);
//     }
//     if (value.length > 12) {
//       formattedValue += '-' + value.substring(12, 13);
//     }

//     this.cnic = formattedValue;
//   }

//   getRawCnic(): string {
//     return this.cnic.replace(/\D/g, '');
//   }

//   onCountryChangeNgSelect(): void {
//     if (this.selectedCountry) {
//       this.filteredCities = this.cities.filter(
//         (city) => city.countryID === this.selectedCountry
//       );
//       if (this.selectedCity) {
//         const cityExists = this.filteredCities.find(
//           (c) => c.cityID === this.selectedCity
//         );
//         if (!cityExists) {
//           this.selectedCity = null;
//         }
//       }
//     } else {
//       this.filteredCities = [...this.cities];
//       this.selectedCity = null;
//     }
//   }

//   // Email validation helper
//   isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   getUserDetail(): void {
//     const currentUserId = this.userSessionService.getUserID();
//     console.log('Current User ID:', currentUserId);

//     if (!currentUserId) {
//       this.isLoading = false;
//       this.errorMessage = 'User ID not found. Please login again.';
//       return;
//     }

//     this.admincompanies.getUserInfo(currentUserId).subscribe({
//       next: (response: any) => {
//         this.isLoading = false;
//         console.log('Full API Response:', response);

//         if (response && Array.isArray(response) && response.length > 0) {
//           const userData = response[0];
//           this.currentUserId = userData.userID || currentUserId;

//           // Populate form fields
//           this.userName = userData.userName || '';
//           this.cnic = this.formatCnic(userData.cnic || '');
//           this.profession = userData.profession || '';
//           this.studyLevelTitle = userData.studyLevelTitle || '';
//           this.companyEmail = userData.email || '';
//           this.contactNo = userData.contactNo || '';
//           this.address = userData.address || '';
//           this.description = userData.description || '';

//           this.selectedDegree = userData.studylevel || null;
//           this.selectedExperience = userData.experienceID || null;
//           this.selectedGender = userData.genderID || null;
//           this.selectedCity = userData.cityID || null;

//           if (this.selectedCity && this.cities.length > 0) {
//             const city = this.cities.find(
//               (c) => c.cityID === this.selectedCity
//             );
//             if (city) {
//               this.selectedCountry = city.countryID;
//               this.onCountryChangeNgSelect();
//             }
//           }

//           this.handleProfileImageDisplay(userData);
//           this.handleResumeDisplay(userData);
//           this.handleDomains(userData);
//         }
//       },
//       error: (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching User Details:', error);
//         this.errorMessage = 'Failed to load user details. Please try again.';
//       },
//     });
//   }

//   formatCnic(cnic: string): string {
//     const rawCnic = cnic.replace(/\D/g, '');
//     if (rawCnic.length === 13) {
//       return `${rawCnic.substring(0, 5)}-${rawCnic.substring(
//         5,
//         12
//       )}-${rawCnic.substring(12, 13)}`;
//     }
//     return cnic;
//   }

//   handleProfileImageDisplay(userData: any): void {
//     const imageData = userData.eDoc;
//     this.imageUrl = imageData;

//     if (!imageData) {
//       return;
//     }

//     console.log('Profile Image Data:', imageData);

//     // Check if it's a URL
//     if (this.isValidUrl(imageData)) {
//       this.imageUrl = imageData;
//       this.existingProfileImageUrl = imageData;
//       this.existingProfileImageExt = this.getFileExtensionFromUrl(imageData) || 'png';
//       this.existingProfileImageBase64 = '';
//     }
//     // Check if it's base64 with data URL prefix
//     else if (imageData.startsWith('data:')) {
//       this.imageUrl = imageData;
//       this.existingProfileImageBase64 = this.extractBase64Data(imageData);
//       this.existingProfileImageExt = this.getExtensionFromDataUrl(imageData) || 'png';
//       this.existingProfileImageUrl = '';
//     }
//     // Raw base64 string
//     else if (this.isValidBase64(imageData)) {
//       const ext = userData.eDocExt || 'png';
//       this.imageUrl = `data:image/${ext};base64,${imageData}`;
//       this.existingProfileImageBase64 = imageData;
//       this.existingProfileImageExt = ext;
//       this.existingProfileImageUrl = '';
//     }
//   }

//   handleResumeDisplay(userData: any): void {
//     const resumeData = userData.eResume;

//     if (!resumeData) {
//       return;
//     }

//     // Check if it's a URL
//     if (this.isValidUrl(resumeData)) {
//       let fixedUrl = this.fixDuplicateUrl(resumeData);
//       this.existingResumeUrl = fixedUrl;
//       this.existingResumeExt = this.getFileExtensionFromUrl(fixedUrl).toLowerCase() || 'pdf';
//       this.existingResumeBase64 = '';

//       console.log('Resume URL stored:', this.existingResumeUrl);
//     }
//     // Check if it's base64 with data URL prefix
//     else if (resumeData.startsWith('data:')) {
//       this.existingResumeBase64 = this.extractBase64Data(resumeData);
//       this.existingResumeExt = this.getExtensionFromDataUrl(resumeData) || 'pdf';
//       this.existingResumeUrl = '';
//     }
//     // Raw base64 string
//     else if (this.isValidBase64(resumeData)) {
//       const ext = userData.eResumeExt || 'pdf';
//       this.existingResumeBase64 = resumeData;
//       this.existingResumeExt = ext;
//       this.existingResumeUrl = '';
//     }
//   }

//   // Main update method - Using same technique as registration component
//   async onRegister(): Promise<void> {
//     this.successMessage = '';
//     this.errorMessage = '';

//     // Validate form
//     if (!this.validateForm()) {
//       return;
//     }

//     // Prepare files for API - Same technique as registration component
//     let imageBase64Data = '';
//     let pdfBase64Data = '';

//     // Handle profile image
//     if (this.selectedImageFile) {
//       // New file uploaded - convert to base64
//       const imageBase64 = this.imageUrl as string;
//       imageBase64Data = imageBase64.split(',')[1];
//     } else if (this.existingProfileImageBase64) {
//       // Use existing base64 data
//       imageBase64Data = this.existingProfileImageBase64;
//     }

//     // Handle resume
//     if (this.selectedPdfFile) {
//       // For PDF, read it as base64
//       const pdfBase64 = await this.fileToBase64(this.selectedPdfFile);
//       pdfBase64Data = pdfBase64.split(',')[1];
//     } else if (this.existingResumeBase64) {
//       // Use existing base64 data
//       pdfBase64Data = this.existingResumeBase64;
//     }

//     const payload: any = {
//       userID: this.currentUserId || 0,
//       userName: this.userName,
//       cnic: this.getRawCnic(),
//       companyName: this.companyName || '',
//       password: this.password || '', // Optional for update
//       email: this.companyEmail,
//       address: this.address,
//       profession: this.profession,
//       contactNo: this.contactNo,
//       eResume: pdfBase64Data,
//       eResumePath: environment.imageUrl + 'Applicant-resume',
//       eResumeExt: this.selectedPdfFile ? 'pdf' : (this.existingResumeExt || 'pdf'),
//       eDoc: imageBase64Data,
//       eDocPath: environment.imageUrl + 'Applicant-Profile',
//       eDocExt: this.selectedImageFile ? this.getFileExtension(this.selectedImageFile.name) : (this.existingProfileImageExt || 'png'),
//       experienceID: this.selectedExperience,
//       studyLevelID: this.selectedDegree,
//       companyStatusID: 1,
//       cityID: this.selectedCity,
//       genderID: Number(this.selectedGender),
//       json: JSON.stringify(this.selectedDomains),
//       roleID: 1,
//       userTypeID: 1,
//       spType: 'update', // Always update for profile
//     };

//     console.log('Final payload:', payload);
//     this.submitProfileUpdate(payload);
//   }

//   // Separate method for API call with improved response handling
//   private submitProfileUpdate(payload: any): void {
//     this.isLoading = true;

//     this.RegisterUserService.saveUser(payload).subscribe({
//       next: (res: any) => {
//         this.isLoading = false;
//         console.log('API Response:', res);

//         let responseMessage = '';

//         if (Array.isArray(res) && res.length > 0) {
//           responseMessage = res[0];
//         } else if (typeof res === 'string') {
//           responseMessage = res;
//         } else if (res && typeof res === 'object') {
//           responseMessage = JSON.stringify(res);
//         }

//         console.log('Processing response:', responseMessage);

//         // Check for success conditions
//         if (responseMessage.includes('Success') || 
//             responseMessage.includes('success') ||
//             responseMessage.startsWith('Success') ||
//             responseMessage.includes('updated')) {
          
//           this.successMessage = 'Profile updated successfully!';
//           this.errorMessage = '';
          
//           // Clear password fields
//           this.password = '';
//           this.confirmPassword = '';

//           // Clear new file selections
//           this.selectedImageFile = null;
//           this.selectedPdfFile = null;
//           this.imageFileName = '';
//           this.pdfFileName = '';

//           // Scroll to show success message
//           window.scrollTo({ top: 0, behavior: 'smooth' });

//           // Refresh user data
//           setTimeout(() => {
//             this.getUserDetail();
//           }, 1000);
          
//           return;
//         }
//         // Handle error cases
//         else {
//           this.errorMessage = responseMessage || 'Failed to update profile. Please try again.';
//           this.successMessage = '';
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error('Error:', err);
        
//         if (err.status === 0) {
//           this.errorMessage = 'Network error. Please check your internet connection.';
//         } else if (err.status === 400) {
//           this.errorMessage = 'Invalid data submitted. Please check your information.';
//         } else if (err.status === 500) {
//           this.errorMessage = 'Server error. Please try again later.';
//         } else {
//           this.errorMessage = 'Failed to update profile. Please try again.';
//         }
        
//         this.successMessage = '';
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     });
//   }

//   // Utility methods for file handling
//   private fileToBase64(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve(reader.result as string);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   }

//   private isValidBase64(str: string): boolean {
//     if (!str || str.length === 0) return false;
//     const cleanStr = str.replace(/\s/g, '');
//     const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

//     if (cleanStr.length < 4 || !base64Regex.test(cleanStr)) {
//       return false;
//     }

//     try {
//       atob(cleanStr);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }

//   private isValidUrl(string: string): boolean {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   }

//   private getFileExtensionFromUrl(url: string): string {
//     try {
//       const urlObj = new URL(url);
//       const pathname = urlObj.pathname;
//       return pathname.split('.').pop()?.toLowerCase() || '';
//     } catch (e) {
//       return '';
//     }
//   }

//   private getExtensionFromDataUrl(dataUrl: string): string {
//     const match = dataUrl.match(/data:([^;]+);/);
//     if (match && match[1]) {
//       const mimeType = match[1];
//       if (mimeType.includes('pdf')) return 'pdf';
//       if (mimeType.includes('jpeg')) return 'jpg';
//       if (mimeType.includes('png')) return 'png';
//       if (mimeType.includes('gif')) return 'gif';
//     }
//     return '';
//   }

//   private getFileExtension(filename: string): string {
//     if (!filename) return '';
//     const name = filename.split('/').pop() || filename;
//     const parts = name.split('.');
//     const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
//     return ext.substring(0, 10);
//   }

//   private extractBase64Data(dataUrl: string): string {
//     if (!dataUrl) return '';
//     if (!dataUrl.includes(',')) {
//       return dataUrl;
//     }
//     return dataUrl.split(',')[1];
//   }

//   private fixDuplicateUrl(url: string): string {
//     const correctPattern =
//       /^http:\/\/159\.69\.174\.28:16600\/assets\/Job-images\/Applicant-resume\/\d+\.(pdf|png|jpg|jpeg)$/;
//     if (correctPattern.test(url)) {
//       return url;
//     }

//     const malformedPattern =
//       /http:\/\/159\.69\.174\.28:16600\/assets\/Job-images\/Applicant-resume\/.*?(\d+\.(pdf|png|jpg|jpeg))$/;
//     const match = url.match(malformedPattern);

//     if (match && match[1]) {
//       return `https://159.69.174.28:16600/assets/Job-images/Applicant-resume/${match[1]}`;
//     }

//     return url;
//   }

//   // Domain dropdown methods
//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//     if (this.isDropdownOpen) {
//       this.searchText = '';
//       this.filteredDomains = this.companyDomains;
//     }
//   }

//   onSearchChange(): void {
//     const search = this.searchText.toLowerCase().trim();
//     if (search === '') {
//       this.filteredDomains = this.companyDomains;
//     } else {
//       this.filteredDomains = this.companyDomains.filter((domain: any) =>
//         domain.domainTitle.toLowerCase().includes(search)
//       );
//     }
//   }

//   toggleDomain(domainId: number): void {
//     if (this.selectedDomains.includes(domainId)) {
//       this.selectedDomains = this.selectedDomains.filter(
//         (id) => id !== domainId
//       );
//     } else {
//       this.selectedDomains.push(domainId);
//     }
//   }

//   removeDomain(domainId: number): void {
//     this.selectedDomains = this.selectedDomains.filter((id) => id !== domainId);
//   }

//   getSelectedDomains(): any[] {
//     return this.companyDomains.filter((domain) =>
//       this.selectedDomains.includes(domain.domainID)
//     );
//   }

//   isDomainSelected(domainId: number): boolean {
//     return this.selectedDomains.includes(domainId);
//   }

//   checkPasswordMatch(): void {
//     this.passwordMismatch = this.password !== this.confirmPassword;
//   }

//   handleDomains(userData: any): void {
//     try {
//       if (userData.json) {
//         const parsedDomains = JSON.parse(userData.json);
//         if (Array.isArray(parsedDomains)) {
//           this.selectedDomains = parsedDomains.map((d: any) =>
//             typeof d === 'object' ? d.domainID : d
//           );
//         } else {
//           this.selectedDomains = [];
//         }
//       } else {
//         this.selectedDomains = [];
//       }
//     } catch (e) {
//       console.error('Error parsing domains JSON:', e);
//       this.selectedDomains = [];
//     }
//   }

//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.custom-multiselect')) {
//       this.isDropdownOpen = false;
//     }
//   }
// }

// import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
// import { UserSessionService } from '../../Services/userSession/userSession.Service';
// import { CompanyRegistrationService } from '../../Services/Company registration/company-registration.service';
// import { RegisterUserService } from '../../Services/register user/register-user.service';
// import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
// import { Router } from '@angular/router';
// import { forkJoin } from 'rxjs';
// import { environment } from '../../../environmentts/environment';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
//   @ViewChild('imageFileInput') imageFileInput!: ElementRef;
//   @ViewChild('pdfFileInput') pdfFileInput!: ElementRef;

//   // File handling properties
//   selectedImageFile: File | null = null;
//   selectedPdfFile: File | null = null;
//   imageUrl: string | ArrayBuffer | null = null;
//   imageFileName: string = '';
//   pdfFileName: string = '';

//   // Your existing properties
//   isLoading: boolean = false;
//   DegreeLevel: any[] = [];
//   successMessage: string = '';
//   errorMessage: string = '';
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;
//   passwordMismatch: boolean = false;
//   isFormSubmitted: boolean = false;

//   companyDomains: any[] = [];
//   selectedDomains: number[] = [];
//   experience: any[] = [];
//   selectedExperience: number | null = null;
//   selectedDegree: number | null = null;
//   countries: any[] = [];
//   selectedCountry: number | null = null;
//   cities: any[] = [];
//   selectedCity: number | null = null;
//   filteredCities: any[] = [];

//   userName: string = '';
//   cnic: string = '';
//   companyName: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   companyEmail: string = '';
//   contactNo: string = '';
//   address: string = '';
//   description: string = '';
//   profession: string = '';
//   selectedGender: number | null = null;
//   studyLevelTitle: string = '';

//   searchText: string = '';
//   isDropdownOpen: boolean = false;
//   filteredDomains: any[] = [];

//   // CRITICAL: Store original values from database
//   originalProfileImage: string = '';  // Original eDoc from DB
//   originalProfileImageExt: string = '';  // Original eDocExt from DB
//   originalResume: string = '';  // Original eResume from DB
//   originalResumeExt: string = '';  // Original eResumeExt from DB

//   currentUserId: number = 0;

//   constructor(
//     private userSessionService: UserSessionService,
//     private CompanyRegistrationService: CompanyRegistrationService,
//     private RegisterUserService: RegisterUserService,
//     private global: adminCompanyService,
//     private router: Router,
//     private admincompanies: adminCompanyService
//   ) {}

//   ngOnInit(): void {
//     this.loadAllData();
//   }

//   // Helper method for template to get resume URL
//   get resumeUrl(): string {
//     // If new file selected, show that
//     if (this.selectedPdfFile) {
//       return URL.createObjectURL(this.selectedPdfFile);
//     }
//     // Otherwise show original
//     return this.originalResume || '';
//   }

//   // Helper method to check if resume exists
//   get hasResume(): boolean {
//     return !!(this.selectedPdfFile || this.originalResume);
//   }

//   loadAllData(): void {
//     this.isLoading = true;

//     forkJoin({
//       degrees: this.RegisterUserService.getDegreeLevel(),
//       experience: this.RegisterUserService.getExperience(),
//       countries: this.CompanyRegistrationService.getCountries(),
//       cities: this.CompanyRegistrationService.getCities(),
//       domains: this.CompanyRegistrationService.getUserDomain(),
//     }).subscribe({
//       next: (results) => {
//         this.DegreeLevel = results.degrees;
//         this.experience = results.experience;
//         this.countries = results.countries;
//         this.cities = results.cities;
//         this.filteredCities = [...this.cities];
//         this.companyDomains = results.domains;
//         this.filteredDomains = results.domains;

//         this.getUserDetail();
//       },
//       error: (error) => {
//         this.isLoading = false;
//         console.error('Error loading dropdown data:', error);
//         this.errorMessage = 'Failed to load form data. Please refresh the page.';
//       },
//     });
//   }

//   // File Upload Methods
//   triggerImageUpload(): void {
//     this.imageFileInput.nativeElement.click();
//   }

//   triggerPdfUpload(): void {
//     this.pdfFileInput.nativeElement.click();
//   }

//   // Handle image file selection
//   onImageFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Only PNG and JPG images are allowed');
//         return;
//       }

//       // Validate file size (max 5MB)
//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       this.selectedImageFile = file;
//       this.imageFileName = file.name;
      
//       // Create preview for image
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.imageUrl = e.target.result;
//       };
//       reader.readAsDataURL(file);

//       console.log('New image file selected:', file.name);
//     }
//     event.target.value = '';
//   }

//   // Handle PDF file selection
//   onPdfFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       if (file.type !== 'application/pdf') {
//         alert('Only PDF files are allowed');
//         return;
//       }

//       // Validate file size (max 10MB)
//       const maxSize = 10 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('PDF size should be less than 10MB');
//         return;
//       }

//       this.selectedPdfFile = file;
//       this.pdfFileName = file.name;

//       console.log('New PDF file selected:', file.name);
//     }
//     event.target.value = '';
//   }

//   // Validation method
//   validateForm(): boolean {
//     this.isFormSubmitted = true;
//     const missingFields: string[] = [];

//     if (!this.userName || this.userName.trim() === '') {
//       missingFields.push('User Name');
//     }
    
//     const rawCnic = this.getRawCnic();
//     if (!rawCnic || rawCnic.length !== 13) {
//       missingFields.push('Valid CNIC (13 digits)');
//     }
    
//     if (!this.profession || this.profession.trim() === '') {
//       missingFields.push('Profession');
//     }
    
//     if (!this.selectedCountry) {
//       missingFields.push('Country');
//     }
    
//     if (!this.selectedCity) {
//       missingFields.push('City');
//     }
    
//     if (!this.contactNo || this.contactNo.trim() === '') {
//       missingFields.push('Contact Number');
//     }
    
//     if (!this.address || this.address.trim() === '') {
//       missingFields.push('Address');
//     }
    
//     if (!this.selectedGender) {
//       missingFields.push('Gender');
//     }
    
//     if (!this.companyEmail || !this.isValidEmail(this.companyEmail)) {
//       missingFields.push('Valid Email');
//     }
    
//     // Password validation only if provided
//     if (this.password && this.password !== this.confirmPassword) {
//       this.passwordMismatch = true;
//       missingFields.push('Passwords must match');
//     }
    
//     if (!this.selectedDomains || this.selectedDomains.length === 0) {
//       missingFields.push('At least one Domain');
//     }

//     if (missingFields.length > 0) {
//       this.errorMessage = `Please fill in the following required fields: ${missingFields.join(', ')}`;
//       this.successMessage = '';
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return false;
//     }

//     return true;
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   genders = [
//     { genderID: 1, genderName: 'Male' },
//     { genderID: 2, genderName: 'Female' },
//     { genderID: 3, genderName: 'Others' },
//   ];

//   onCnicInput(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     let value = input.value.replace(/\D/g, '');

//     if (value.length > 13) {
//       value = value.substring(0, 13);
//     }

//     let formattedValue = '';
//     if (value.length > 0) {
//       formattedValue = value.substring(0, 5);
//     }
//     if (value.length > 5) {
//       formattedValue += '-' + value.substring(5, 12);
//     }
//     if (value.length > 12) {
//       formattedValue += '-' + value.substring(12, 13);
//     }

//     this.cnic = formattedValue;
//   }

//   getRawCnic(): string {
//     return this.cnic.replace(/\D/g, '');
//   }

//   onCountryChangeNgSelect(): void {
//     if (this.selectedCountry) {
//       this.filteredCities = this.cities.filter(
//         (city) => city.countryID === this.selectedCountry
//       );
//       if (this.selectedCity) {
//         const cityExists = this.filteredCities.find(
//           (c) => c.cityID === this.selectedCity
//         );
//         if (!cityExists) {
//           this.selectedCity = null;
//         }
//       }
//     } else {
//       this.filteredCities = [...this.cities];
//       this.selectedCity = null;
//     }
//   }

//   isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   getUserDetail(): void {
//     const currentUserId = this.userSessionService.getUserID();
//     console.log('Current User ID:', currentUserId);

//     if (!currentUserId) {
//       this.isLoading = false;
//       this.errorMessage = 'User ID not found. Please login again.';
//       return;
//     }

//     this.admincompanies.getUserInfo(currentUserId).subscribe({
//       next: (response: any) => {
//         this.isLoading = false;
//         console.log('Full API Response:', response);

//         if (response && Array.isArray(response) && response.length > 0) {
//           const userData = response[0];
//           this.currentUserId = userData.userID || currentUserId;

//           // Populate form fields
//           this.userName = userData.userName || '';
//           this.cnic = this.formatCnic(userData.cnic || '');
//           this.profession = userData.profession || '';
//           this.studyLevelTitle = userData.studyLevelTitle || '';
//           this.companyEmail = userData.email || '';
//           this.contactNo = userData.contactNo || '';
//           this.address = userData.address || '';
//           this.description = userData.description || '';

//           this.selectedDegree = userData.studylevel || null;
//           this.selectedExperience = userData.experienceID || null;
//           this.selectedGender = userData.genderID || null;
//           this.selectedCity = userData.cityID || null;

//           if (this.selectedCity && this.cities.length > 0) {
//             const city = this.cities.find(
//               (c) => c.cityID === this.selectedCity
//             );
//             if (city) {
//               this.selectedCountry = city.countryID;
//               this.onCountryChangeNgSelect();
//             }
//           }

//           // CRITICAL: Store original values from database
//           this.originalProfileImage = userData.eDoc || '';
//           this.originalProfileImageExt = userData.eDocExt || 'png';
//           this.originalResume = userData.eResume || '';
//           this.originalResumeExt = userData.eResumeExt || 'pdf';

//           // Set display values
//           if (this.originalProfileImage) {
//             this.imageUrl = this.originalProfileImage;
//           }

//           this.handleDomains(userData);

//           console.log('Original Profile Image:', this.originalProfileImage);
//           console.log('Original Resume:', this.originalResume);
//         }
//       },
//       error: (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching User Details:', error);
//         this.errorMessage = 'Failed to load user details. Please try again.';
//       },
//     });
//   }

//   formatCnic(cnic: string): string {
//     const rawCnic = cnic.replace(/\D/g, '');
//     if (rawCnic.length === 13) {
//       return `${rawCnic.substring(0, 5)}-${rawCnic.substring(
//         5,
//         12
//       )}-${rawCnic.substring(12, 13)}`;
//     }
//     return cnic;
//   }

//   // CRITICAL: Main update method with correct file handling
//   async onRegister(): Promise<void> {
//     this.successMessage = '';
//     this.errorMessage = '';

//     if (!this.validateForm()) {
//       return;
//     }

//     this.isLoading = true;

//     try {
//       // Prepare image data
//       let imageData = '';
//       let imageExt = '';
//       let imagePath = '';

//       if (this.selectedImageFile) {
//         // NEW IMAGE SELECTED - Convert to base64
//         const imageBase64 = await this.fileToBase64(this.selectedImageFile);
//         imageData = imageBase64.split(',')[1]; // Remove data:image/...;base64, prefix
//         imageExt = this.getFileExtension(this.selectedImageFile.name);
//         imagePath = environment.imageUrl + 'Applicant-Profile';
//         console.log('Using NEW image file');
//       } else {
//         // NO NEW IMAGE - Use original from database
//         imageData = this.originalProfileImage;
//         imageExt = this.originalProfileImageExt;
//         imagePath = ''; // Empty path means don't change
//         console.log('Using ORIGINAL image from DB');
//       }

//       // Prepare resume data
//       let resumeData = '';
//       let resumeExt = '';
//       let resumePath = '';

//       if (this.selectedPdfFile) {
//         // NEW PDF SELECTED - Convert to base64
//         const pdfBase64 = await this.fileToBase64(this.selectedPdfFile);
//         resumeData = pdfBase64.split(',')[1]; // Remove data:application/pdf;base64, prefix
//         resumeExt = 'pdf';
//         resumePath = environment.imageUrl + 'Applicant-resume';
//         console.log('Using NEW PDF file');
//       } else {
//         // NO NEW PDF - Use original from database
//         resumeData = this.originalResume;
//         resumeExt = this.originalResumeExt;
//         resumePath = ''; // Empty path means don't change
//         console.log('Using ORIGINAL resume from DB');
//       }

//       const payload: any = {
//         userID: this.currentUserId || 0,
//         userName: this.userName,
//         cnic: this.getRawCnic(),
//         companyName: this.companyName || '',
//         password: this.password || '',
//         email: this.companyEmail,
//         address: this.address,
//         profession: this.profession,
//         contactNo: this.contactNo,
//         eResume: resumeData,
//         eResumePath: resumePath,
//         eResumeExt: resumeExt,
//         eDoc: imageData,
//         eDocPath: imagePath,
//         eDocExt: imageExt,
//         experienceID: this.selectedExperience,
//         studyLevelID: this.selectedDegree,
//         companyStatusID: 1,
//         cityID: this.selectedCity,
//         genderID: Number(this.selectedGender),
//         json: JSON.stringify(this.selectedDomains),
//         roleID: 1,
//         userTypeID: 1,
//         spType: 'update',
//       };

//       console.log('Final payload:', payload);
//       this.submitProfileUpdate(payload);

//     } catch (error) {
//       this.isLoading = false;
//       console.error('Error preparing data:', error);
//       this.errorMessage = 'Failed to prepare data. Please try again.';
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }

//   private submitProfileUpdate(payload: any): void {
//     this.RegisterUserService.saveUser(payload).subscribe({
//       next: (res: any) => {
//         this.isLoading = false;
//         console.log('API Response:', res);

//         let responseMessage = '';

//         if (Array.isArray(res) && res.length > 0) {
//           responseMessage = res[0];
//         } else if (typeof res === 'string') {
//           responseMessage = res;
//         } else if (res && typeof res === 'object') {
//           responseMessage = JSON.stringify(res);
//         }

//         console.log('Processing response:', responseMessage);

//         if (responseMessage.includes('Success') || 
//             responseMessage.includes('success') ||
//             responseMessage.startsWith('Success') ||
//             responseMessage.includes('updated')) {
          
//           this.successMessage = 'Profile updated successfully!';
//           this.errorMessage = '';
          
//           // Clear password fields
//           this.password = '';
//           this.confirmPassword = '';

//           // Clear new file selections (but keep originals)
//           this.selectedImageFile = null;
//           this.selectedPdfFile = null;
//           this.imageFileName = '';
//           this.pdfFileName = '';

//           window.scrollTo({ top: 0, behavior: 'smooth' });

//           // Refresh user data
//           setTimeout(() => {
//             this.getUserDetail();
//           }, 1000);
          
//           return;
//         } else {
//           this.errorMessage = responseMessage || 'Failed to update profile. Please try again.';
//           this.successMessage = '';
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error('Error:', err);
        
//         if (err.status === 0) {
//           this.errorMessage = 'Network error. Please check your internet connection.';
//         } else if (err.status === 400) {
//           this.errorMessage = 'Invalid data submitted. Please check your information.';
//         } else if (err.status === 500) {
//           this.errorMessage = 'Server error. Please try again later.';
//         } else {
//           this.errorMessage = 'Failed to update profile. Please try again.';
//         }
        
//         this.successMessage = '';
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     });
//   }

//   private fileToBase64(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve(reader.result as string);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   }

//   private getFileExtension(filename: string): string {
//     if (!filename) return '';
//     const name = filename.split('/').pop() || filename;
//     const parts = name.split('.');
//     const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
//     return ext.substring(0, 10);
//   }

//   // Domain dropdown methods
//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//     if (this.isDropdownOpen) {
//       this.searchText = '';
//       this.filteredDomains = this.companyDomains;
//     }
//   }

//   onSearchChange(): void {
//     const search = this.searchText.toLowerCase().trim();
//     if (search === '') {
//       this.filteredDomains = this.companyDomains;
//     } else {
//       this.filteredDomains = this.companyDomains.filter((domain: any) =>
//         domain.domainTitle.toLowerCase().includes(search)
//       );
//     }
//   }

//   toggleDomain(domainId: number): void {
//     if (this.selectedDomains.includes(domainId)) {
//       this.selectedDomains = this.selectedDomains.filter(
//         (id) => id !== domainId
//       );
//     } else {
//       this.selectedDomains.push(domainId);
//     }
//   }

//   removeDomain(domainId: number): void {
//     this.selectedDomains = this.selectedDomains.filter((id) => id !== domainId);
//   }

//   getSelectedDomains(): any[] {
//     return this.companyDomains.filter((domain) =>
//       this.selectedDomains.includes(domain.domainID)
//     );
//   }

//   isDomainSelected(domainId: number): boolean {
//     return this.selectedDomains.includes(domainId);
//   }

//   checkPasswordMatch(): void {
//     this.passwordMismatch = this.password !== this.confirmPassword;
//   }

//   handleDomains(userData: any): void {
//     try {
//       if (userData.json) {
//         const parsedDomains = JSON.parse(userData.json);
//         if (Array.isArray(parsedDomains)) {
//           this.selectedDomains = parsedDomains.map((d: any) =>
//             typeof d === 'object' ? d.domainID : d
//           );
//         } else {
//           this.selectedDomains = [];
//         }
//       } else {
//         this.selectedDomains = [];
//       }
//     } catch (e) {
//       console.error('Error parsing domains JSON:', e);
//       this.selectedDomains = [];
//     }
//   }

//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.custom-multiselect')) {
//       this.isDropdownOpen = false;
//     }
//   }
// }

import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  styleUrls: ['./user-profile.component.css']
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
  originalProfileImage: string = '';
  originalProfileImageExt: string = '';
  originalResume: string = '';
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
  }

  // Helper method for template to get resume URL
  get resumeUrl(): string {
    if (this.selectedPdfFile) {
      return URL.createObjectURL(this.selectedPdfFile);
    }
    return this.originalResume || '';
  }

  // Helper method to check if resume exists
  get hasResume(): boolean {
    return !!(this.selectedPdfFile || this.originalResume);
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
        this.errorMessage = 'Failed to load form data. Please refresh the page.';
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
  onImageFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PNG and JPG images are allowed');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      this.selectedImageFile = file;
      this.imageFileName = file.name;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log('New image file selected:', file.name);
    }
    event.target.value = '';
  }

  // Handle PDF file selection
  onPdfFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('PDF size should be less than 10MB');
        return;
      }

      this.selectedPdfFile = file;
      this.pdfFileName = file.name;

      console.log('New PDF file selected:', file.name);
    }
    event.target.value = '';
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
      this.errorMessage = `Please fill in the following required fields: ${missingFields.join(', ')}`;
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

          // Store original values from database
          this.originalProfileImage = userData.eDoc || '';
          this.originalProfileImageExt = userData.eDocExt || 'png';
          this.originalResume = userData.eResume || '';
          this.originalResumeExt = userData.eResumeExt || 'pdf';

          // Set display values
          if (this.originalProfileImage) {
            this.imageUrl = this.originalProfileImage;
          }

          this.handleDomains(userData);

          console.log('Original Profile Image:', this.originalProfileImage);
          console.log('Original Resume:', this.originalResume);
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
      return `${rawCnic.substring(0, 5)}-${rawCnic.substring(5, 12)}-${rawCnic.substring(12, 13)}`;
    }
    return cnic;
  }

  // CRITICAL: Main update method with correct file handling
  async onRegister(): Promise<void> {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    try {
      // Prepare image data
      let imageData = '';
      let imageExt = '';
      let imagePath = '';

      if (this.selectedImageFile) {
        // NEW IMAGE SELECTED - Convert to base64
        const imageBase64 = await this.fileToBase64(this.selectedImageFile);
        imageData = imageBase64.split(',')[1];
        imageExt = this.getFileExtension(this.selectedImageFile.name);
        imagePath = environment.imageUrl + 'Applicant-Profile';
        console.log('Using NEW image file');
      } else if (this.isBase64(this.originalProfileImage)) {
        // Original is base64 - use as is
        imageData = this.extractBase64Only(this.originalProfileImage);
        imageExt = this.originalProfileImageExt;
        imagePath = '';
        console.log('Using ORIGINAL base64 image from DB');
      } else if (this.isValidUrl(this.originalProfileImage)) {
        // Original is URL - send empty to keep existing
        imageData = '';
        imageExt = '';
        imagePath = '';
        console.log('Keeping ORIGINAL image URL (no change)');
      } else {
        // No image at all
        imageData = '';
        imageExt = 'png';
        imagePath = '';
        console.log('No image data available');
      }

      // Prepare resume data
      let resumeData = '';
      let resumeExt = '';
      let resumePath = '';

      if (this.selectedPdfFile) {
        // NEW PDF SELECTED - Convert to base64
        const pdfBase64 = await this.fileToBase64(this.selectedPdfFile);
        resumeData = pdfBase64.split(',')[1];
        resumeExt = 'pdf';
        resumePath = environment.imageUrl + 'Applicant-resume';
        console.log('Using NEW PDF file');
      } else if (this.isBase64(this.originalResume)) {
        // Original is base64 - use as is
        resumeData = this.extractBase64Only(this.originalResume);
        resumeExt = this.originalResumeExt;
        resumePath = '';
        console.log('Using ORIGINAL base64 resume from DB');
      } else if (this.isValidUrl(this.originalResume)) {
        // Original is URL - send empty to keep existing
        resumeData = '';
        resumeExt = '';
        resumePath = '';
        console.log('Keeping ORIGINAL resume URL (no change)');
      } else {
        // No resume at all
        resumeData = '';
        resumeExt = 'pdf';
        resumePath = '';
        console.log('No resume data available');
      }

      const payload: any = {
        userID: this.currentUserId || 0,
        userName: this.userName,
        cnic: this.getRawCnic(),
        companyName: this.companyName || '',
        password: this.password || '',
        email: this.companyEmail,
        address: this.address,
        profession: this.profession,
        contactNo: this.contactNo,
        eResume: resumeData,
        eResumePath: resumePath,
        eResumeExt: resumeExt,
        eDoc: imageData,
        eDocPath: imagePath,
        eDocExt: imageExt,
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

      console.log('Final payload:', {
        ...payload,
        eDoc: imageData ? `${imageData.substring(0, 50)}...` : 'empty',
        eResume: resumeData ? `${resumeData.substring(0, 50)}...` : 'empty'
      });
      
      this.submitProfileUpdate(payload);

    } catch (error) {
      this.isLoading = false;
      console.error('Error preparing data:', error);
      this.errorMessage = 'Failed to prepare data. Please try again.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

        if (responseMessage.includes('Success') || 
            responseMessage.includes('success') ||
            responseMessage.startsWith('Success') ||
            responseMessage.includes('updated')) {
          
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
          this.errorMessage = responseMessage || 'Failed to update profile. Please try again.';
          this.successMessage = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error:', err);
        
        if (err.status === 0) {
          this.errorMessage = 'Network error. Please check your internet connection.';
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid data submitted. Please check your information.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
        
        this.successMessage = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Helper method to check if string is a valid URL
  private isValidUrl(string: string): boolean {
    if (!string) return false;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Helper method to check if string is valid base64
  private isBase64(str: string): boolean {
    if (!str || str.length === 0) return false;
    
    // If it starts with data:, extract the base64 part
    let cleanStr = str;
    if (str.includes(',')) {
      cleanStr = str.split(',')[1];
    }
    
    // Remove whitespace
    cleanStr = cleanStr.replace(/\s/g, '');
    
    // Check if it's valid base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    
    if (cleanStr.length < 4 || !base64Regex.test(cleanStr)) {
      return false;
    }
    
    // Additional validation: length should be multiple of 4
    if (cleanStr.length % 4 !== 0) {
      return false;
    }
    
    try {
      atob(cleanStr);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Helper method to extract only base64 data
  private extractBase64Only(data: string): string {
    if (!data) return '';
    
    // If it contains a comma, split and take the part after comma
    if (data.includes(',')) {
      return data.split(',')[1];
    }
    
    // Otherwise return as is
    return data;
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