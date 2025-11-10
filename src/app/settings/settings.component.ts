// import { Component, OnInit } from '@angular/core';
// import { JobService } from '../Services/Job/Job.service';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-settings',
//   templateUrl: './settings.component.html',
//   styleUrls: ['./settings.component.css'],
// })
// export class SettingsComponent implements OnInit {
//   isLoading: boolean = false;
//   hasData: boolean = false;

//   // Your existing properties...
//   UniTypes: any[] = [];
//   employees: any[] = [];
//   companyDomains: any[] = [];
//   selectedDomains: number[] = [];
//   selectedEmployee: number | null = null;
//   selectedFile: File | null = null;
//   previewUrl: string | ArrayBuffer | null = null;
//   isImage = false;
//   selectedIndustry: number | null = null;
//   countries: any[] = [];
//   selectedCountry: number | null = null;
//   cities: any[] = [];
//   selectedCity: number | null = null;
//   foundedIn: string = '';
//   selectedBannerFile: File | null = null;
//   bannerPreviewUrl: string | ArrayBuffer | null = null;
//   isBannerImage = false;
//   filteredCities: any[] = [];

//   companyName: string = '';
//   companyEmail: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   websiteLink: string = '';
//   contact: string = '';
//   address: string = '';
//   description: string = '';
//   location: string = '';
//   pin: string= '';

//   successMessage: string = '';
//   errorMessage: string = '';
//   // string | ArrayBuffer | null;

//   oldLogoExt: string = '';
//   oldBannerExt: string = '';
//   oldLogoBase64: string = '';
//   oldBannerBase64: string = '';

//   constructor(
//     private JobService: JobService,
//     private userSessionService: UserSessionService,
//     private CompanyRegistrationService: CompanyRegistrationService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     console.log('SettingsComponent initialized');
//     this.getCompanyDetail();
//     this.getIndustriesTypes();
//     this.getEmployees();
//     this.getCountries();
//     this.getCities();
//     // this.getCompanyDomain();
//   }

//   getIndustriesTypes(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getIndustriesTypes().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.UniTypes = response;
//         // console.log(response, 'types');
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Industries Types:', error);
//       }
//     );
//   }

//   getCities(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getCities().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.cities = response; // store all cities
//         this.filteredCities = [...this.cities]; // Initialize filteredCities with all cities
//         // console.log('All Cities:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Cities:', error);
//       }
//     );
//   }

// getCompanyDomain(companyTypeID: number): void {
//   this.isLoading = true;
//   this.CompanyRegistrationService.getCompanyDomain(companyTypeID).subscribe(
//     (response) => {
//       this.isLoading = false;
//       this.companyDomains = response;
//       console.log('Company Domains for type', companyTypeID, ':', response);
//     },
//     (error) => {
//       this.isLoading = false;
//       console.error('Error fetching company domains:', error);
//       this.companyDomains = [];
//     }
//   );
// }

//   getEmployees(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getEmployees().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.employees = response;
//         // console.log('Employees:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Employees:', error);
//       }
//     );
//   }

//   getCountries(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getCountries().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.countries = response;
//         // console.log('Countries:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Countries:', error);
//       }
//     );
//   }

//  getCompanyDetail(): void {
//   this.isLoading = true;
//   this.hasData = false;
//   console.log('Fetching company details...');

//   const currentCompanyId = this.userSessionService.getCompanyID();
//   console.log('Current Company ID:', currentCompanyId);

//   this.CompanyRegistrationService.getCompanyDetail().subscribe(
//     (response: any) => {
//       this.isLoading = false;
//       console.log('API Response:', response);

//       if (response && Array.isArray(response)) {
//         const companyData = response.find(
//           (company) => Number(company.companyID) === Number(currentCompanyId)
//         );

//         if (companyData) {
//           this.hasData = true;
//           console.log('Filtered Company Data:', companyData);

//           // Map API response to form fields
//           this.companyName = companyData.companyName || '';
//           this.companyEmail = companyData.email || '';
//           this.foundedIn = companyData.foundedIn || '';
//           this.websiteLink = companyData.websiteLink || '';
//           this.contact = companyData.contact || '';
//           this.address = companyData.address || '';
//           // this.pin = companyData.pin || '';
//           this.description = companyData.description || '';
//           this.location = companyData.location || '';
//           this.selectedEmployee = companyData.employeeID || null;
//           this.selectedIndustry = companyData.companyTypeID || null;
//           this.selectedCountry = companyData.countryID || null;
//           this.selectedCity = companyData.cityID || null;

//           this.handleLogoDisplay(companyData);
//           this.handleBannerDisplay(companyData);

//           // Filter cities based on selected country
//           if (this.selectedCountry) {
//             this.filterCitiesByCountry(this.selectedCountry);
//           }

//           // Load domains based on selected industry
//           if (this.selectedIndustry) {
//             this.getCompanyDomain(this.selectedIndustry);
//           }

//           // Handle domains - Parse after domains are loaded
//           try {
//             if (companyData.json) {
//               const parsedDomains = JSON.parse(companyData.json);
//               this.selectedDomains = parsedDomains.map(
//                 (d: any) => d.domainID
//               );
//             } else {
//               this.selectedDomains = [];
//             }
//           } catch (e) {
//             console.error('Error parsing domains JSON:', e);
//             this.selectedDomains = [];
//           }
//         } else {
//           console.warn('No company data found for current user');
//           this.errorMessage = 'No company data found for your account';
//         }
//       } else {
//         console.warn('Invalid API response format');
//         this.errorMessage = 'Invalid response from server';
//       }
//     },
//     (error: any) => {
//       this.isLoading = false;
//       console.error('Error fetching Company Details:', error);
//       this.errorMessage = 'Failed to load company details. Please try again.';
//     }
//   );
// }
//   // Helper method to filter cities by country
//   filterCitiesByCountry(countryId: number): void {
//     this.filteredCities = this.cities.filter(
//       (city) => Number(city.countryID) === Number(countryId)
//     );
//     console.log(
//       'Filtered cities for country',
//       countryId,
//       ':',
//       this.filteredCities
//     );
//   }

// onFileSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     this.selectedFile = input.files[0];
//     const fileName = this.selectedFile.name.toLowerCase();

//     if (
//       fileName.endsWith('.png') ||
//       fileName.endsWith('.jpg') ||
//       fileName.endsWith('.jpeg')
//     ) {
//       // Show image preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result;
//         // ALSO update the oldLogoBase64 with the new file's base64 data
//         this.oldLogoBase64 = reader.result as string;
//         // Add null check for selectedFile
//         if (this.selectedFile) {
//           this.oldLogoExt = this.getFileExtension(this.selectedFile.name);
//         }
//       };
//       reader.readAsDataURL(this.selectedFile);
//       this.isImage = true;
//     } else if (fileName.endsWith('.pdf')) {
//       // Show pdf icon + filename
//       this.previewUrl = 'pdf';
//       this.isImage = false;
//       // For PDF files, we need to read the file and store as base64
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.oldLogoBase64 = reader.result as string;
//         this.oldLogoExt = 'pdf';
//       };
//       reader.readAsDataURL(this.selectedFile);
//     } else {
//       // Unsupported file type → clear
//       this.previewUrl = null;
//       this.isImage = false;
//       this.selectedFile = null;
//       this.oldLogoBase64 = '';
//       this.oldLogoExt = '';
//       alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
//     }
//   }
// }

// onBannerSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     this.selectedBannerFile = input.files[0];
//     const fileName = this.selectedBannerFile.name.toLowerCase();

//     if (
//       fileName.endsWith('.png') ||
//       fileName.endsWith('.jpg') ||
//       fileName.endsWith('.jpeg')
//     ) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.bannerPreviewUrl = reader.result;
//         // ALSO update the oldBannerBase64 with the new file's base64 data
//         this.oldBannerBase64 = reader.result as string;
//         // Add null check for selectedBannerFile
//         if (this.selectedBannerFile) {
//           this.oldBannerExt = this.getFileExtension(this.selectedBannerFile.name);
//         }
//       };
//       reader.readAsDataURL(this.selectedBannerFile);
//       this.isBannerImage = true;
//     } else if (fileName.endsWith('.pdf')) {
//       this.bannerPreviewUrl = 'pdf';
//       this.isBannerImage = false;
//       // For PDF files, we need to read the file and store as base64
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.oldBannerBase64 = reader.result as string;
//         this.oldBannerExt = 'pdf';
//       };
//       reader.readAsDataURL(this.selectedBannerFile);
//     } else {
//       this.bannerPreviewUrl = null;
//       this.isBannerImage = false;
//       this.selectedBannerFile = null;
//       this.oldBannerBase64 = '';
//       this.oldBannerExt = '';
//       alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
//     }
//   }
// }
//   // onFileSelected(event: Event): void {
//   //   const input = event.target as HTMLInputElement;
//   //   if (input.files && input.files.length > 0) {
//   //     this.selectedFile = input.files[0];
//   //     const fileName = this.selectedFile.name.toLowerCase();

//   //     if (
//   //       fileName.endsWith('.png') ||
//   //       fileName.endsWith('.jpg') ||
//   //       fileName.endsWith('.jpeg')
//   //     ) {
//   //       // Show image preview
//   //       const reader = new FileReader();
//   //       reader.onload = () => (this.previewUrl = reader.result);
//   //       reader.readAsDataURL(this.selectedFile);
//   //       this.isImage = true;
//   //     } else if (fileName.endsWith('.pdf')) {
//   //       // Show pdf icon + filename
//   //       this.previewUrl = 'pdf';
//   //       this.isImage = false;
//   //     } else {
//   //       // Unsupported file type → clear
//   //       this.previewUrl = null;
//   //       this.isImage = false;
//   //       this.selectedFile = null;
//   //       alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
//   //     }
//   //   }
//   // }

//   // onBannerSelected(event: Event): void {
//   //   const input = event.target as HTMLInputElement;
//   //   if (input.files && input.files.length > 0) {
//   //     this.selectedBannerFile = input.files[0];
//   //     const fileName = this.selectedBannerFile.name.toLowerCase();

//   //     if (
//   //       fileName.endsWith('.png') ||
//   //       fileName.endsWith('.jpg') ||
//   //       fileName.endsWith('.jpeg')
//   //     ) {
//   //       const reader = new FileReader();
//   //       reader.onload = () => (this.bannerPreviewUrl = reader.result);
//   //       reader.readAsDataURL(this.selectedBannerFile);
//   //       this.isBannerImage = true;
//   //     } else if (fileName.endsWith('.pdf')) {
//   //       this.bannerPreviewUrl = 'pdf';
//   //       this.isBannerImage = false;
//   //     } else {
//   //       this.bannerPreviewUrl = null;
//   //       this.isBannerImage = false;
//   //       this.selectedBannerFile = null;
//   //       alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
//   //     }
//   //   }
//   // }

//   // onFileSelected(event: Event): void {
//   //   const input = event.target as HTMLInputElement;
//   //   if (input.files && input.files.length > 0) {
//   //     this.selectedFile = input.files[0];
//   //     const fileType = this.selectedFile.type;
//   //     this.isImage = fileType.startsWith('image/');

//   //     if (this.isImage) {
//   //       const reader = new FileReader();
//   //       reader.onload = () => {
//   //         this.previewUrl = reader.result;
//   //       };
//   //       if (this.selectedFile) {
//   //         reader.readAsDataURL(this.selectedFile);
//   //       }
//   //     } else {
//   //       this.previewUrl = 'pdf';
//   //     }
//   //   }
//   // }

//   // onBannerSelected(event: Event): void {
//   //   const input = event.target as HTMLInputElement;
//   //   if (input.files && input.files.length > 0) {
//   //     this.selectedBannerFile = input.files[0];
//   //     const fileType = this.selectedBannerFile.type;
//   //     this.isBannerImage = fileType.startsWith('image/');

//   //     if (this.isBannerImage) {
//   //       const reader = new FileReader();
//   //       reader.onload = () => {
//   //         this.bannerPreviewUrl = reader.result;
//   //       };
//   //       if (this.selectedBannerFile) {
//   //         reader.readAsDataURL(this.selectedBannerFile);
//   //       }
//   //     } else {
//   //       this.bannerPreviewUrl = 'pdf';
//   //     }
//   //   }
//   // }

//   toggleDomain(domainId: number): void {
//     if (this.selectedDomains.includes(domainId)) {
//       this.selectedDomains = this.selectedDomains.filter(
//         (id) => id !== domainId
//       );
//     } else {
//       this.selectedDomains.push(domainId);
//     }
//   }

//   // onRegister(): void {
//   //   this.successMessage = '';
//   //   this.errorMessage = '';

//   //   // Validation
//   //   if (!this.companyName || !this.companyEmail) {
//   //     this.errorMessage = 'Please fill all required fields.';
//   //     return;
//   //   }
//   //   if (this.password && this.password !== this.confirmPassword) {
//   //     this.errorMessage = 'Passwords do not match.';
//   //     return;
//   //   }

//   //   // Keep old values if no new file uploaded
//   //   let existingLogo =
//   //     this.previewUrl &&
//   //     typeof this.previewUrl === 'string' &&
//   //     this.previewUrl.startsWith('data:')
//   //       ? this.previewUrl.split(',')[1]
//   //       : ''; // or keep companyData.eLogo if you cached it

//   //   let existingBanner =
//   //     this.bannerPreviewUrl &&
//   //     typeof this.bannerPreviewUrl === 'string' &&
//   //     this.bannerPreviewUrl.startsWith('data:')
//   //       ? this.bannerPreviewUrl.split(',')[1]
//   //       : '';

//   //   const payload: any = {
//   //     userID: this.userSessionService.getUserID(),
//   //     companyID: this.userSessionService.getCompanyID(),
//   //     companyName: this.companyName,
//   //     userName: "",
//   //     eLogo: existingLogo,
//   //     eLogoPath: "",
//   // eDocPath: "",
//   //     eLogoExt: this.selectedFile?.name.split('.').pop() || this.oldLogoExt || "",
//   //     eDoc:  existingBanner,
//   //
//   //     eDocExt: this.selectedBannerFile?.name.split('.').pop() || this.oldBannerExt || "",

//   //     companyEmail: this.companyEmail,
//   //     password: this.password,
//   //     foundedIn: this.foundedIn,
//   //     websiteLink: this.websiteLink,
//   //     contact: this.contact,
//   //     address: this.address,
//   //     description: this.description,
//   //     location: this.address,
//   //     employeeID: this.selectedEmployee,
//   //     companyTypeID: this.selectedIndustry,
//   //     countryID: this.selectedCountry,
//   //     cityID: this.selectedCity,
//   //     userTypeID: 2,
//   //     json: JSON.stringify(this.selectedDomains),
//   //     spType: 'update',
//   //   };

//   //   console.log(payload, 'payload');

//   //   // File Handling
//   //   const filePromises: Promise<void>[] = [];

//   //   if (this.selectedFile) {
//   //     const filePromise = new Promise<void>((resolve) => {
//   //       const reader = new FileReader();
//   //       reader.onload = () => {
//   //         const base64 = reader.result as string;
//   //         payload.eLogo = base64.split(',')[1];
//   //         payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
//   //         resolve();
//   //       };
//   //       if (this.selectedFile) {
//   //         reader.readAsDataURL(this.selectedFile);
//   //       } else {
//   //         resolve();
//   //       }
//   //     });
//   //     filePromises.push(filePromise);
//   //   }

//   //   if (this.selectedBannerFile) {
//   //     const bannerPromise = new Promise<void>((resolve) => {
//   //       const reader = new FileReader();
//   //       reader.onload = () => {
//   //         const base64 = reader.result as string;
//   //         payload.eDoc = base64.split(',')[1];
//   //         payload.eDocExt =
//   //           this.selectedBannerFile?.name.split('.').pop() || '';
//   //         resolve();
//   //       };
//   //       if (this.selectedBannerFile) {
//   //         reader.readAsDataURL(this.selectedBannerFile);
//   //       } else {
//   //         resolve();
//   //       }
//   //     });
//   //     filePromises.push(bannerPromise);
//   //   }

//   //   // API Call
//   //   Promise.all(filePromises).then(() => {
//   //     this.CompanyRegistrationService.saveCompany(payload).subscribe({
//   //       next: (res) => {
//   //         console.log(res, 'update compnay');

//   //         if (Array.isArray(res) && res.length > 0) {
//   //           const responseStr = res[0];
//   //           if (responseStr.split('|||')[0] === 'Success') {
//   //             this.successMessage = 'Company Updated successfully!';
//   //             this.getCompanyDetail();
//   //           } else {
//   //             this.errorMessage = responseStr;
//   //           }
//   //         } else {
//   //           this.errorMessage = 'Unexpected response from server.';
//   //         }
//   //       },
//   //       error: (err) => {
//   //         console.error('Error:', err);
//   //         if (err.error && Array.isArray(err.error)) {
//   //           this.errorMessage = err.error[0];
//   //         } else {
//   //           this.errorMessage = 'Failed to update company.';
//   //         }
//   //       },
//   //     });
//   //   });
//   // }
//   onRegister(): void {
//   this.successMessage = '';
//   this.errorMessage = '';

//   // Validation
//   if (!this.companyName || !this.companyEmail) {
//     this.errorMessage = 'Please fill all required fields.';
//     return;
//   }
//   if (this.password && this.password !== this.confirmPassword) {
//     this.errorMessage = 'Passwords do not match.';
//     return;
//   }

//   // Prepare base payload
//   const payload: any = {
//     userID: this.userSessionService.getUserID(),
//     companyID: this.userSessionService.getCompanyID(),
//     companyName: this.companyName,
//     userName: "",
//     companyEmail: this.companyEmail,
//     // password: this.password,
//     password:"",
//     foundedIn: this.foundedIn,
//     websiteLink: this.websiteLink,
//     contact: this.contact,
//     address: this.address,
//     description: this.description,
//     location: this.address,
//     //  pin: this.pin,
//     pin:"",
//     eDocPath:"",
//     eLogoPath:"",
//     employeeID: this.selectedEmployee,
//     companyTypeID: this.selectedIndustry,
//     countryID: this.selectedCountry,
//     cityID: this.selectedCity,
//     userTypeID: 2,
//     json: JSON.stringify(this.selectedDomains),
//     spType: 'update',
//   };

//   console.log('Initial payload:', payload);

//   // Handle file uploads
//   const processFiles = async (): Promise<void> => {
//     try {
//       // Process logo file
//       if (this.selectedFile) {
//         const logoBase64 = await this.fileToBase64(this.selectedFile);
//         payload.eLogo = this.cleanBase64(logoBase64);
//         payload.eLogoExt = this.getFileExtension(this.selectedFile.name);
//         console.log('New logo processed, extension:', payload.eLogoExt);
//       } else {
//         // Keep existing logo
//         payload.eLogo = this.cleanBase64(this.oldLogoBase64);
//         payload.eLogoExt = this.oldLogoExt;
//         console.log('Using existing logo, extension:', payload.eLogoExt);
//       }

//       // Process banner file
//       if (this.selectedBannerFile) {
//         const bannerBase64 = await this.fileToBase64(this.selectedBannerFile);
//         payload.eDoc = this.cleanBase64(bannerBase64);
//         payload.eDocExt = this.getFileExtension(this.selectedBannerFile.name);
//         console.log('New banner processed, extension:', payload.eDocExt);
//       } else {
//         // Keep existing banner
//         payload.eDoc = this.cleanBase64(this.oldBannerBase64);
//         payload.eDocExt = this.oldBannerExt;
//         console.log('Using existing banner, extension:', payload.eDocExt);
//       }

//       // Log the payload (without base64 data to avoid console clutter)
//       const debugPayload = { ...payload };
//       if (debugPayload.eLogo) debugPayload.eLogo = 'BASE64_DATA...';
//       if (debugPayload.eDoc) debugPayload.eDoc = 'BASE64_DATA...';
//       console.log('Final payload:', debugPayload);

//       // Make API call
//       this.CompanyRegistrationService.saveCompany(payload).subscribe({
//         next: (res) => {
//           console.log('API Response:', res);

//           if (Array.isArray(res) && res.length > 0) {
//             const responseStr = res[0];
//             if (responseStr.split('|||')[0] === 'Success') {
//               this.successMessage = 'Company updated successfully!';
//               this.getCompanyDetail(); // Refresh data
//             } else {
//               this.errorMessage = responseStr;
//             }
//           } else {
//             this.errorMessage = 'Unexpected response from server.';
//           }
//         },
//         error: (err) => {
//           console.error('API Error:', err);
//           if (err.error && Array.isArray(err.error)) {
//             this.errorMessage = err.error[0];
//           } else {
//             this.errorMessage = 'Failed to update company. Please try again.';
//           }
//         }
//       });

//     } catch (error) {
//       console.error('Error processing files:', error);
//       this.errorMessage = 'Error processing files. Please try again.';
//     }
//   };

//   // Start the file processing
//   processFiles();
// }

// // Clean base64 string - remove data URL prefix and any whitespace
// private cleanBase64(base64String: string): string {
//   if (!base64String) return '';

//   // Remove data URL prefix if present
//   if (base64String.startsWith('data:')) {
//     const parts = base64String.split(',');
//     if (parts.length > 1) {
//       base64String = parts[1];
//     }
//   }

//   // Remove any whitespace, newlines, or special characters
//   base64String = base64String.replace(/\s/g, '');
//   base64String = base64String.replace(/[^A-Za-z0-9+/=]/g, '');

//   return base64String;
// }

// // Convert file to base64 (returns clean base64 without data URL prefix)
// private fileToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result as string;
//       const cleanBase64 = this.cleanBase64(result);
//       resolve(cleanBase64);
//     };
//     reader.onerror = error => reject(error);
//     reader.readAsDataURL(file);
//   });
// }

// // Helper method to get file extension
// private getFileExtension(filename: string): string {
//   return filename.split('.').pop()?.toLowerCase() || '';
// }

//   resetForm(): void {
//     this.getCompanyDetail(); // Reset to original values
//   }

//  onIndustryChange(event: any) {
//   this.selectedIndustry = +event.target.value;
//   console.log('Industry changed to:', this.selectedIndustry);
  
//   // Clear previous domain selections
//   this.selectedDomains = [];
//   this.companyDomains = [];
  
//   // Load domains for new industry
//   if (this.selectedIndustry) {
//     this.getCompanyDomain(this.selectedIndustry);
//   }
// }

//   onEmployeeChange(event: any) {
//     this.selectedEmployee = +event.target.value;
//   }

//   onCountryChange(event: any) {
//     this.selectedCountry = +event.target.value;
//     this.filterCitiesByCountry(this.selectedCountry);
//     this.selectedCity = null; // Reset city when country changes
//   }

//   onCityChange(event: any) {
//     this.selectedCity = +event.target.value;
//   }
//   // handleLogoDisplay(companyData: any): void {
//   //   const logoData =
//   //     companyData.eLogo || companyData.companyLogo || companyData.logo;

//   //   if (logoData) {
//   //     console.log('Logo data found:', logoData);

//   //     // Check if it's a URL (starts with http/https)
//   //     if (logoData.startsWith('http://') || logoData.startsWith('https://')) {
//   //       // It's a URL - use directly
//   //       this.previewUrl = logoData;
//   //       this.isImage = this.checkIfImageFromUrl(logoData);
//   //     }
//   //     // Check if it's a base64 string
//   //     else if (logoData.startsWith('data:') || logoData.includes('base64')) {
//   //       // It's already a data URL
//   //       this.previewUrl = logoData;
//   //       this.isImage = true;
//   //     }
//   //     // Check if it's base64 without prefix
//   //     else if (
//   //       logoData.length > 50 &&
//   //       !logoData.includes('/') &&
//   //       !logoData.includes('\\')
//   //     ) {
//   //       // Likely base64, add data URL prefix
//   //       const extension = companyData.eLogoExt || 'png';
//   //       this.previewUrl = `data:image/${extension};base64,${logoData}`;
//   //       this.isImage = true;
//   //     } else {
//   //       // Assume it's a file path - might need full server URL
//   //       this.previewUrl = logoData;
//   //       this.isImage = this.checkIfImage(logoData);
//   //     }
//   //   } else {
//   //     this.previewUrl = null;
//   //     this.isImage = false;
//   //   }
//   // }

//   // // Handle banner display from API - FIXED for URL-based images
//   // handleBannerDisplay(companyData: any): void {
//   //   const bannerData =
//   //     companyData.eDoc ||
//   //     companyData.companyDoc ||
//   //     companyData.banner ||
//   //     companyData.document;

//   //   if (bannerData) {
//   //     console.log('Banner data found:', bannerData);

//   //     // Check if it's a URL (starts with http/https)
//   //     if (
//   //       bannerData.startsWith('http://') ||
//   //       bannerData.startsWith('https://')
//   //     ) {
//   //       // It's a URL - use directly
//   //       this.bannerPreviewUrl = bannerData;
//   //       this.isBannerImage = this.checkIfImageFromUrl(bannerData);
//   //     }
//   //     // Check if it's a base64 string
//   //     else if (
//   //       bannerData.startsWith('data:') ||
//   //       bannerData.includes('base64')
//   //     ) {
//   //       // It's already a data URL
//   //       this.bannerPreviewUrl = bannerData;
//   //       this.isBannerImage = true;
//   //     }
//   //     // Check if it's base64 without prefix
//   //     else if (
//   //       bannerData.length > 50 &&
//   //       !bannerData.includes('/') &&
//   //       !bannerData.includes('\\')
//   //     ) {
//   //       // Likely base64, add data URL prefix
//   //       const extension = companyData.eDocExt || 'png';
//   //       this.bannerPreviewUrl = `data:image/${extension};base64,${bannerData}`;
//   //       this.isBannerImage = true;
//   //     } else {
//   //       // Assume it's a file path - might need full server URL
//   //       this.bannerPreviewUrl = bannerData;
//   //       this.isBannerImage = this.checkIfImage(bannerData);
//   //     }
//   //   } else {
//   //     this.bannerPreviewUrl = null;
//   //     this.isBannerImage = false;
//   //   }
//   // }

// handleLogoDisplay(companyData: any): void {
//   const logoData = companyData.eLogo || companyData.companyLogo || companyData.logo;
  
//   // Store original values for update (clean base64)
//   this.oldLogoExt = companyData.eLogoExt || 'png'; // Default to png if not specified
//   this.oldLogoBase64 = logoData || ''; // Store the original base64 data

//   if (logoData) {
//     console.log('Logo data found, extension:', this.oldLogoExt);

//     // Check if it's already a data URL
//     if (logoData.startsWith('data:')) {
//       this.previewUrl = logoData;
//       this.isImage = true;
//     } 
//     // Check if it's a URL
//     else if (logoData.startsWith('http://') || logoData.startsWith('https://')) {
//       this.previewUrl = logoData;
//       this.isImage = this.checkIfImageFromUrl(logoData);
//     }
//     // Assume it's base64 without prefix
//     else {
//       // Create data URL from base64
//       this.previewUrl = `data:image/${this.oldLogoExt};base64,${logoData}`;
//       this.isImage = true;
//     }
//   } else {
//     this.previewUrl = null;
//     this.isImage = false;
//   }
// }

// handleBannerDisplay(companyData: any): void {
//   const bannerData = companyData.eDoc || companyData.companyDoc || companyData.banner || companyData.document;
  
//   // Store original values for update
//   this.oldBannerExt = companyData.eDocExt || 'png';
//   this.oldBannerBase64 = bannerData || '';

//   if (bannerData) {
//     console.log('Banner data found, extension:', this.oldBannerExt);

//     if (bannerData.startsWith('data:')) {
//       this.bannerPreviewUrl = bannerData;
//       this.isBannerImage = true;
//     } else if (bannerData.startsWith('http://') || bannerData.startsWith('https://')) {
//       this.bannerPreviewUrl = bannerData;
//       this.isBannerImage = this.checkIfImageFromUrl(bannerData);
//     } else {
//       this.bannerPreviewUrl = `data:image/${this.oldBannerExt};base64,${bannerData}`;
//       this.isBannerImage = true;
//     }
//   } else {
//     this.bannerPreviewUrl = null;
//     this.isBannerImage = false;
//   }
// }

//   // NEW: Helper method to check if URL points to an image
//   checkIfImageFromUrl(url: string): boolean {
//     if (!url) return false;
//     const lowerUrl = url.toLowerCase();

//     // Check file extension in URL
//     if (
//       lowerUrl.includes('.png') ||
//       lowerUrl.includes('.jpg') ||
//       lowerUrl.includes('.jpeg') ||
//       lowerUrl.includes('.gif') ||
//       lowerUrl.includes('.webp') ||
//       lowerUrl.includes('.bmp') ||
//       lowerUrl.includes('.svg')
//     ) {
//       return true;
//     }

//     // If no clear extension, assume it's an image since it's coming from image API
//     return true;
//   }

//   // Keep your existing checkIfImage method as well
//   checkIfImage(fileName: string): boolean {
//     if (!fileName) return false;
//     const lowerFileName = fileName.toLowerCase();
//     return (
//       lowerFileName.endsWith('.png') ||
//       lowerFileName.endsWith('.jpg') ||
//       lowerFileName.endsWith('.jpeg') ||
//       lowerFileName.endsWith('.gif') ||
//       lowerFileName.endsWith('.webp')
//     );
//   }

//   debugFileData(): void {
//   console.log('=== DEBUG FILE DATA ===');
//   console.log('selectedFile:', this.selectedFile?.name);
//   console.log('previewUrl type:', typeof this.previewUrl);
//   console.log('previewUrl length:', this.previewUrl ? (this.previewUrl as string).length : 0);
//   console.log('oldLogoBase64 length:', this.oldLogoBase64 ? this.oldLogoBase64.length : 0);
//   console.log('oldLogoExt:', this.oldLogoExt);
//   console.log('---');
//   console.log('selectedBannerFile:', this.selectedBannerFile?.name);
//   console.log('bannerPreviewUrl type:', typeof this.bannerPreviewUrl);
//   console.log('bannerPreviewUrl length:', this.bannerPreviewUrl ? (this.bannerPreviewUrl as string).length : 0);
//   console.log('oldBannerBase64 length:', this.oldBannerBase64 ? this.oldBannerBase64.length : 0);
//   console.log('oldBannerExt:', this.oldBannerExt);
//   console.log('=== END DEBUG ===');
// }
// }

import { Component, OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isLoading: boolean = false;
  hasData: boolean = false;

  UniTypes: any[] = [];
  employees: any[] = [];
  companyDomains: any[] = [];
  selectedDomains: number[] = [];
  selectedEmployee: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isImage = false;
  selectedIndustry: number | null = null;
  countries: any[] = [];
  selectedCountry: number | null = null;
  cities: any[] = [];
  selectedCity: number | null = null;
  foundedIn: string = '';
  selectedBannerFile: File | null = null;
  bannerPreviewUrl: string | ArrayBuffer | null = null;
  isBannerImage = false;
  filteredCities: any[] = [];

  companyName: string = '';
  companyEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  websiteLink: string = '';
  contact: string = '';
  address: string = '';
  description: string = '';
  location: string = '';
  pin: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  oldLogoExt: string = '';
  oldBannerExt: string = '';
  oldLogoBase64: string = '';
  oldBannerBase64: string = '';

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('SettingsComponent initialized');
    this.getCompanyDetail();
    this.getIndustriesTypes();
    this.getEmployees();
    this.getCountries();
    this.getCities();
  }

  getIndustriesTypes(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getIndustriesTypes().subscribe(
      (response) => {
        this.isLoading = false;
        this.UniTypes = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  getCities(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCities().subscribe(
      (response) => {
        this.isLoading = false;
        this.cities = response;
        this.filteredCities = [...this.cities];
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Cities:', error);
      }
    );
  }

  getCompanyDomain(companyTypeID: number): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCompanyDomain(companyTypeID).subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response;
        console.log('Company Domains for type', companyTypeID, ':', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
        this.companyDomains = [];
      }
    );
  }

  getEmployees(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getEmployees().subscribe(
      (response) => {
        this.isLoading = false;
        this.employees = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Employees:', error);
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

  getCompanyDetail(): void {
    this.isLoading = true;
    this.hasData = false;
    console.log('Fetching company details...');

    const currentCompanyId = this.userSessionService.getCompanyID();
    console.log('Current Company ID:', currentCompanyId);

    this.CompanyRegistrationService.getCompanyDetail().subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          const companyData = response.find(
            (company) => Number(company.companyID) === Number(currentCompanyId)
          );

          if (companyData) {
            this.hasData = true;
            console.log('Filtered Company Data:', companyData);

            // Map API response to form fields
            this.companyName = companyData.companyName || '';
            this.companyEmail = companyData.email || '';
            this.foundedIn = companyData.foundedIn || '';
            this.websiteLink = companyData.websiteLink || '';
            this.contact = companyData.contact || '';
            this.address = companyData.address || '';
            this.description = companyData.description || '';
            this.location = companyData.location || '';
            this.selectedEmployee = companyData.employeeID || null;
            this.selectedIndustry = companyData.companyTypeID || null;
            this.selectedCountry = companyData.countryID || null;
            this.selectedCity = companyData.cityID || null;

            this.handleLogoDisplay(companyData);
            this.handleBannerDisplay(companyData);

            // Filter cities based on selected country
            if (this.selectedCountry) {
              this.filterCitiesByCountry(this.selectedCountry);
            }

            // Load domains based on selected industry
            if (this.selectedIndustry) {
              this.getCompanyDomain(this.selectedIndustry);
            }

            // Handle domains - Parse after domains are loaded
            try {
              if (companyData.json) {
                const parsedDomains = JSON.parse(companyData.json);
                this.selectedDomains = parsedDomains.map(
                  (d: any) => d.domainID
                );
              } else {
                this.selectedDomains = [];
              }
            } catch (e) {
              console.error('Error parsing domains JSON:', e);
              this.selectedDomains = [];
            }
          } else {
            console.warn('No company data found for current user');
            this.errorMessage = 'No company data found for your account';
          }
        } else {
          console.warn('Invalid API response format');
          this.errorMessage = 'Invalid response from server';
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Company Details:', error);
        this.errorMessage = 'Failed to load company details. Please try again.';
      }
    );
  }

  filterCitiesByCountry(countryId: number): void {
    this.filteredCities = this.cities.filter(
      (city) => Number(city.countryID) === Number(countryId)
    );
    console.log(
      'Filtered cities for country',
      countryId,
      ':',
      this.filteredCities
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileName = this.selectedFile.name.toLowerCase();

      if (
        fileName.endsWith('.png') ||
        fileName.endsWith('.jpg') ||
        fileName.endsWith('.jpeg')
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
          // Store clean base64 for API
          this.oldLogoBase64 = this.extractBase64Data(reader.result as string);
          if (this.selectedFile) {
            this.oldLogoExt = this.getFileExtension(this.selectedFile.name);
          }
        };
        reader.readAsDataURL(this.selectedFile);
        this.isImage = true;
      } else if (fileName.endsWith('.pdf')) {
        this.previewUrl = 'pdf';
        this.isImage = false;
        const reader = new FileReader();
        reader.onload = () => {
          this.oldLogoBase64 = this.extractBase64Data(reader.result as string);
          this.oldLogoExt = 'pdf';
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.previewUrl = null;
        this.isImage = false;
        this.selectedFile = null;
        this.oldLogoBase64 = '';
        this.oldLogoExt = '';
        alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
      }
    }
  }

  onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedBannerFile = input.files[0];
      const fileName = this.selectedBannerFile.name.toLowerCase();

      if (
        fileName.endsWith('.png') ||
        fileName.endsWith('.jpg') ||
        fileName.endsWith('.jpeg')
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bannerPreviewUrl = reader.result;
          this.oldBannerBase64 = this.extractBase64Data(reader.result as string);
          if (this.selectedBannerFile) {
            this.oldBannerExt = this.getFileExtension(
              this.selectedBannerFile.name
            );
          }
        };
        reader.readAsDataURL(this.selectedBannerFile);
        this.isBannerImage = true;
      } else if (fileName.endsWith('.pdf')) {
        this.bannerPreviewUrl = 'pdf';
        this.isBannerImage = false;
        const reader = new FileReader();
        reader.onload = () => {
          this.oldBannerBase64 = this.extractBase64Data(reader.result as string);
          this.oldBannerExt = 'pdf';
        };
        reader.readAsDataURL(this.selectedBannerFile);
      } else {
        this.bannerPreviewUrl = null;
        this.isBannerImage = false;
        this.selectedBannerFile = null;
        this.oldBannerBase64 = '';
        this.oldBannerExt = '';
        alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
      }
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

  onRegister(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Validation
    if (!this.companyName || !this.companyEmail) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }
    if (this.password && this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Prepare base payload
    const payload: any = {
      userID: this.userSessionService.getUserID(),
      companyID: this.userSessionService.getCompanyID(),
      companyName: this.companyName,
      userName: '',
      companyEmail: this.companyEmail,
      password: '',
      foundedIn: this.foundedIn,
      websiteLink: this.websiteLink,
      contact: this.contact,
      address: this.address,
      description: this.description,
      location: this.address,
      pin: '',
      eDocPath: '',
      eLogoPath: '',
      employeeID: this.selectedEmployee,
      companyTypeID: this.selectedIndustry,
      countryID: this.selectedCountry,
      cityID: this.selectedCity,
      userTypeID: 2,
      json: JSON.stringify(this.selectedDomains),
      spType: 'update',
    };

    console.log('Initial payload:', payload);

    // Handle file uploads
    const processFiles = async (): Promise<void> => {
      try {
        // Process logo file
        if (this.selectedFile) {
          // New file uploaded
          payload.eLogo = await this.fileToBase64(this.selectedFile);
          payload.eLogoExt = this.getFileExtension(this.selectedFile.name);
          console.log('New logo processed, extension:', payload.eLogoExt);
        } else if (this.oldLogoBase64 && this.oldLogoExt) {
          // Keep existing logo
          payload.eLogo = this.oldLogoBase64;
          payload.eLogoExt = this.oldLogoExt;
          console.log('Using existing logo, extension:', payload.eLogoExt);
        } else {
          payload.eLogo = '';
          payload.eLogoExt = '';
        }

        // Process banner file
        if (this.selectedBannerFile) {
          // New file uploaded
          payload.eDoc = await this.fileToBase64(this.selectedBannerFile);
          payload.eDocExt = this.getFileExtension(
            this.selectedBannerFile.name
          );
          console.log('New banner processed, extension:', payload.eDocExt);
        } else if (this.oldBannerBase64 && this.oldBannerExt) {
          // Keep existing banner
          payload.eDoc = this.oldBannerBase64;
          payload.eDocExt = this.oldBannerExt;
          console.log('Using existing banner, extension:', payload.eDocExt);
        } else {
          payload.eDoc = '';
          payload.eDocExt = '';
        }

        // Validate base64 strings before sending
        if (payload.eLogo && !this.isValidBase64(payload.eLogo)) {
          console.error('Invalid logo base64 detected');
          this.errorMessage =
            'Invalid logo file format. Please try uploading again.';
          return;
        }

        if (payload.eDoc && !this.isValidBase64(payload.eDoc)) {
          console.error('Invalid banner base64 detected');
          this.errorMessage =
            'Invalid banner file format. Please try uploading again.';
          return;
        }

        // Log payload for debugging
        console.log('Final payload:', {
          ...payload,
          eLogo: payload.eLogo ? `[BASE64: ${payload.eLogo.length} chars]` : '',
          eDoc: payload.eDoc ? `[BASE64: ${payload.eDoc.length} chars]` : '',
        });

        // Make API call
        this.isLoading = true;
        this.CompanyRegistrationService.saveCompany(payload).subscribe({
          next: (res) => {
            this.isLoading = false;
            console.log('API Response:', res);

            if (Array.isArray(res) && res.length > 0) {
              const responseStr = res[0];
              if (responseStr.split('|||')[0] === 'Success') {
                this.successMessage = 'Company updated successfully!';
                setTimeout(() => {
                  this.getCompanyDetail(); // Refresh data
                }, 1000);
              } else {
                this.errorMessage = responseStr;
              }
            } else {
              this.errorMessage = 'Unexpected response from server.';
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('API Error:', err);
            if (err.error && Array.isArray(err.error)) {
              this.errorMessage = err.error[0];
            } else if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage =
                'Failed to update company. Please try again.';
            }
          },
        });
      } catch (error) {
        this.isLoading = false;
        console.error('Error processing files:', error);
        this.errorMessage = 'Error processing files. Please try again.';
      }
    };

    // Start the file processing
    processFiles();
  }

  // Extract base64 data from data URL
  private extractBase64Data(dataUrl: string): string {
    if (!dataUrl) return '';
    
    // Check if it's already a clean base64 string (no data URL prefix)
    if (!dataUrl.includes(',')) {
      return this.ensureBase64Padding(dataUrl);
    }
    
    // Extract base64 part from data URL
    const base64Part = dataUrl.split(',')[1];
    return this.ensureBase64Padding(base64Part);
  }

  // Ensure proper base64 padding
  private ensureBase64Padding(base64: string): string {
    if (!base64) return '';
    
    // Remove existing padding
    let cleaned = base64.replace(/=+$/, '');
    
    // Add correct padding
    const paddingLength = (4 - (cleaned.length % 4)) % 4;
    return cleaned + '='.repeat(paddingLength);
  }

  // Convert file to base64 (returns clean base64 without data URL prefix)
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Extract and clean the base64 part
        const cleaned = this.extractBase64Data(result);
        resolve(cleaned);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Helper method to get file extension
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Improved base64 validation
  private isValidBase64(str: string): boolean {
    if (!str || str.length === 0) return true; // Empty is valid

    // Remove any whitespace
    const cleanStr = str.replace(/\s/g, '');

    // Check if string contains only valid base64 characters
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

    // If it's very short, might be corrupted
    if (cleanStr.length < 4) {
      console.warn('Base64 string too short:', cleanStr.length);
      return false;
    }

    // Check if it matches base64 pattern
    if (!base64Regex.test(cleanStr)) {
      console.warn('Base64 contains invalid characters');
      return false;
    }

    // Try to decode to verify it's valid
    try {
      atob(cleanStr);
      return true;
    } catch (e) {
      console.warn('Base64 decode failed:', e);
      return false;
    }
  }

  resetForm(): void {
    this.getCompanyDetail(); // Reset to original values
  }

  onIndustryChange(event: any) {
    this.selectedIndustry = +event.target.value;
    console.log('Industry changed to:', this.selectedIndustry);

    // Clear previous domain selections
    this.selectedDomains = [];
    this.companyDomains = [];

    // Load domains for new industry
    if (this.selectedIndustry) {
      this.getCompanyDomain(this.selectedIndustry);
    }
  }

  onEmployeeChange(event: any) {
    this.selectedEmployee = +event.target.value;
  }

  onCountryChange(event: any) {
    this.selectedCountry = +event.target.value;
    this.filterCitiesByCountry(this.selectedCountry);
    this.selectedCity = null; // Reset city when country changes
  }

  onCityChange(event: any) {
    this.selectedCity = +event.target.value;
  }

  handleLogoDisplay(companyData: any): void {
    const logoData = companyData.eLogo || companyData.companyLogo || companyData.logo;

    // Store extension
    this.oldLogoExt = companyData.eLogoExt || 'png';

    if (logoData) {
      console.log('Logo data found, extension:', this.oldLogoExt);

      // Check if it's already a data URL
      if (logoData.startsWith('data:')) {
        this.previewUrl = logoData;
        this.oldLogoBase64 = this.extractBase64Data(logoData);
      } 
      // Check if it's a URL
      else if (logoData.startsWith('http://') || logoData.startsWith('https://')) {
        this.previewUrl = logoData;
        this.oldLogoBase64 = ''; // Can't extract base64 from URL
      } 
      // Assume it's raw base64
      else {
        this.oldLogoBase64 = this.ensureBase64Padding(logoData);
        // Create data URL for display
        this.previewUrl = `data:image/${this.oldLogoExt};base64,${this.oldLogoBase64}`;
      }
      
      this.isImage = true;
    } else {
      this.previewUrl = null;
      this.isImage = false;
      this.oldLogoBase64 = '';
    }
  }

handleBannerDisplay(companyData: any): void {
  const bannerData = companyData.eDoc || companyData.companyDoc || companyData.banner || companyData.document;

  this.oldBannerExt = companyData.eDocExt || 'png';

  if (bannerData) {
    console.log('Banner data found:', bannerData);

    // Case 1: Full base64 data URL
    if (bannerData.startsWith('data:')) {
      this.bannerPreviewUrl = bannerData;
      this.oldBannerBase64 = this.extractBase64Data(bannerData);
    }
    // Case 2: Full external URL (starts with http)
    else if (bannerData.startsWith('https://') || bannerData.startsWith('https://')) {
      this.bannerPreviewUrl = bannerData;
      this.oldBannerBase64 = '';
    }
    // Case 3: Relative path from API (e.g. /images/banner.png)
    else if (bannerData.startsWith('/')) {
      this.bannerPreviewUrl = `https://your-api-domain.com${bannerData}`;
      this.oldBannerBase64 = '';
    }
    // Case 4: Raw base64 (no data: prefix)
    else {
      this.oldBannerBase64 = this.ensureBase64Padding(bannerData);
      this.bannerPreviewUrl = `data:image/${this.oldBannerExt};base64,${this.oldBannerBase64}`;
    }

    this.isBannerImage = true;
  } else {
    this.bannerPreviewUrl = null;
    this.isBannerImage = false;
    this.oldBannerBase64 = '';
  }
}


  // Helper method to check if URL points to an image
  checkIfImageFromUrl(url: string): boolean {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();

    // Check file extension in URL
    if (
      lowerUrl.includes('.png') ||
      lowerUrl.includes('.jpg') ||
      lowerUrl.includes('.jpeg') ||
      lowerUrl.includes('.gif') ||
      lowerUrl.includes('.webp') ||
      lowerUrl.includes('.bmp') ||
      lowerUrl.includes('.svg')
    ) {
      return true;
    }

    // If no clear extension, assume it's an image since it's coming from image API
    return true;
  }

  // Keep your existing checkIfImage method as well
  checkIfImage(fileName: string): boolean {
    if (!fileName) return false;
    const lowerFileName = fileName.toLowerCase();
    return (
      lowerFileName.endsWith('.png') ||
      lowerFileName.endsWith('.jpg') ||
      lowerFileName.endsWith('.jpeg') ||
      lowerFileName.endsWith('.gif') ||
      lowerFileName.endsWith('.webp')
    );
  }
}