// import { Component, OnInit ,HostListener } from '@angular/core';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';

// @Component({
//   selector: 'app-register-company',
//   templateUrl: './register-company.component.html',
//   styleUrl: './register-company.component.css',
// })
// export class RegisterCompanyComponent implements OnInit {
//   isLoading: boolean = false;
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
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;

//   // New document fields
//   selectedeLicense: File | null = null;
//   eLicensePreview: string | null = null;
//   selectedeBill: File | null = null;
//  eBillPreview: string | null = null;
//   selectedeAgreement: File | null = null;
//   eAgreementPreview: string | null = null;
//   selectedeLetter: File | null = null;
//   eLetterPreview: string | null = null;

//   userName: string = '';
//   companyName: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   companyEmail: string = '';
//   websiteLink: string = '';
//   contactNo: string = '';
//   address: string = '';
//   description: string = '';
//   location: string = '';
//   pin: string ='';

//   successMessage: string = '';
//   errorMessage: string = '';

//   searchText: string = '';
//   isDropdownOpen: boolean = false;
//   filteredDomains: any[] = [];

//   constructor(
//     private userSessionService: UserSessionService,
//     private CompanyRegistrationService: CompanyRegistrationService
//   ) {}

//   ngOnInit(): void {
//     this.getIndustriesTypes();
//     this.getEmployees();
//     this.getCountries();
//     this.getCities();
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }
  
//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;

//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//       const fileType = this.selectedFile.type;

//       this.isImage = fileType.startsWith('image/');

//       if (this.isImage) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           this.previewUrl = reader.result;
//         };
//         reader.readAsDataURL(this.selectedFile);
//       } else {
//         this.previewUrl = 'pdf';
//       }
//     }
//   }

//   onBannerSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;

//     if (input.files && input.files.length > 0) {
//       this.selectedBannerFile = input.files[0];
//       const fileType = this.selectedBannerFile.type;

//       this.isBannerImage = fileType.startsWith('image/');

//       if (this.isBannerImage) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           this.bannerPreviewUrl = reader.result;
//         };
//         reader.readAsDataURL(this.selectedBannerFile);
//       } else {
//         this.bannerPreviewUrl = 'pdf';
//       }
//     }
//   }

//   // New document upload handlers
//   oneLicenseSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedeLicense = input.files[0];
//       this.eLicensePreview = this.selectedeLicense.name;
//     }
//   }

//   oneBillSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedeBill = input.files[0];
//       this.eBillPreview = this.selectedeBill.name;
//     }
//   }

//   oneAgreementSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedeAgreement = input.files[0];
//       this.eAgreementPreview = this.selectedeAgreement.name;
//     }
//   }

//   oneLetterSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedeLetter = input.files[0];
//       this.eLetterPreview = this.selectedeLetter.name;
//     }
//   }

//   getIndustriesTypes(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getIndustriesTypes().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.UniTypes = response;
//         console.log(response, 'types');
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Industries Types:', error);
//       }
//     );
//   }

//   onIndustryChangeNgSelect(): void {
//     if (this.selectedIndustry) {
//       console.log('Selected Industry ID:', this.selectedIndustry);
      
//       this.selectedDomains = [];
//       this.companyDomains = [];
//       this.filteredDomains = [];
      
//       this.getCompanyDomain(this.selectedIndustry);
//     } else {
//       this.companyDomains = [];
//       this.filteredDomains = [];
//       this.selectedDomains = [];
//     }
//   }

//   onCountryChangeNgSelect(): void {
//     if (this.selectedCountry) {
//       this.filteredCities = this.cities.filter(
//         (city) => city.countryID === this.selectedCountry
//       );
//       this.selectedCity = null;
      
//       console.log('Selected Country ID:', this.selectedCountry);
//       console.log('Filtered Cities:', this.filteredCities);
//     } else {
//       this.filteredCities = [];
//       this.selectedCity = null;
//     }
//   }

//   getEmployees(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getEmployees().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.employees = response;
//         console.log('Employees:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Employees:', error);
//       }
//     );
//   }

//   onEmployeeChange(event: Event): void {
//     const select = event.target as HTMLSelectElement;
//     this.selectedEmployee = Number(select.value);
//     console.log('Selected Employee ID:', this.selectedEmployee);
//   }

//   getCountries(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getCountries().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.countries = response;
//         console.log('Countries:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Countries:', error);
//       }
//     );
//   }

//   filteredCities: any[] = [];

//   getCities(): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getCities().subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.cities = response;
//         console.log('All Cities:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching Cities:', error);
//       }
//     );
//   }

//   onCityChange(event: Event): void {
//     const select = event.target as HTMLSelectElement;
//     this.selectedCity = Number(select.value);
//     console.log('Selected City ID:', this.selectedCity);
//   }

//   getCompanyDomain(companyTypeID: number): void {
//     this.isLoading = true;
//     this.CompanyRegistrationService.getCompanyDomain(companyTypeID).subscribe(
//       (response) => {
//         this.isLoading = false;
//         this.companyDomains = response; 
//         this.filteredDomains = response; 
//         console.log('Company Domains:', response);
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching company domains:', error);
//         this.companyDomains = [];
//         this.filteredDomains = [];
//       }
//     );
//   }

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
//     console.log('Selected Domains:', this.selectedDomains);
//   }

//   removeDomain(domainId: number): void {
//     this.selectedDomains = this.selectedDomains.filter(
//       (id) => id !== domainId
//     );
//   }

//   getSelectedDomains(): any[] {
//     return this.companyDomains.filter((domain) =>
//       this.selectedDomains.includes(domain.domainID)
//     );
//   }

//   isDomainSelected(domainId: number): boolean {
//     return this.selectedDomains.includes(domainId);
//   }

//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.custom-multiselect')) {
//       this.isDropdownOpen = false;
//     }
//   }

//   onRegister(): void {
//     this.successMessage = '';
//     this.errorMessage = '';

//     const payload: any = {
//       userID: 0,
//       userName: '',
//       companyName: this.companyName,
//       password: this.password,
//       companyEmail: this.companyEmail,
//       foundedIn: this.foundedIn,
//       websiteLink: this.websiteLink,
//       contact: this.contactNo,
//       address: this.address,
//       description: this.description,
//       location: this.location,
//       pin: this.pin,
//       eLogo: null,
//       eLogoPath: '',
//       eLogoExt: '',
//       eDoc: null,
//       eDocPath: '',
//       eDocExt: '',
//       eLicense: "null",
//       eLicensePath: '',
//       eLicenseExt: '',
//      eBill: "null",
//      eBillPath: '',
//      eBillExt: '',
//       eAgreement: "null",
//       eAgreementPath: '',
//       eAgreementExt: '',
//       eLetter: "null",
//       eLetterPath: '',
//       eLetterExt: '',
//       employeeID: this.selectedEmployee,
//       companyTypeID: this.selectedIndustry,
//       companyStatusID: 1,
//       cityID: this.selectedCity,
//       roleID: 2,
//       userTypeID: 2,
//       json: JSON.stringify(this.selectedDomains),
//       spType: 'insert',
//     };

//     console.log(payload,'payload')

//     // Validation
//     if (
//       !this.companyName ||
//       !this.companyEmail ||
//       !this.password ||
//       !this.confirmPassword
//     ) {
//       this.errorMessage = 'Please fill all required fields.';
//       return;
//     }
//     if (this.password !== this.confirmPassword) {
//       this.errorMessage = 'Passwords do not match.';
//       return;
//     }

//     // File Handling
//     const filePromises: Promise<void>[] = [];

//     if (this.selectedFile) {
//       const filePromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eLogo = base64.split(',')[1];
//           payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedFile) {
//           reader.readAsDataURL(this.selectedFile);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(filePromise);
//     }

//     if (this.selectedBannerFile) {
//       const bannerPromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eDoc = base64.split(',')[1];
//           payload.eDocExt =
//             this.selectedBannerFile?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedBannerFile) {
//           reader.readAsDataURL(this.selectedBannerFile);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(bannerPromise);
//     }

//     // New document file handling
//     if (this.selectedeLicense) {
//       const licensePromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eLicense = base64.split(',')[1];
//           payload.eLicenseExt = this.selectedeLicense?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedeLicense) {
//           reader.readAsDataURL(this.selectedeLicense);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(licensePromise);
//     }

//     if (this.selectedeBill) {
//       const billPromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eBill = base64.split(',')[1];
//           payload.eBillExt = this.selectedeBill?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedeBill) {
//           reader.readAsDataURL(this.selectedeBill);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(billPromise);
//     }

//     if (this.selectedeAgreement) {
//       const leasePromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eAgreement = base64.split(',')[1];
//           payload.eAgreementExt = this.selectedeAgreement?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedeAgreement) {
//           reader.readAsDataURL(this.selectedeAgreement);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(leasePromise);
//     }

//     if (this.selectedeLetter) {
//       const bankPromise = new Promise<void>((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64 = reader.result as string;
//           payload.eLetter = base64.split(',')[1];
//           payload.eLetterExt = this.selectedeLetter?.name.split('.').pop() || '';
//           resolve();
//         };
//         if (this.selectedeLetter) {
//           reader.readAsDataURL(this.selectedeLetter);
//         } else {
//           resolve();
//         }
//       });
//       filePromises.push(bankPromise);
//     }

//     // API Call
//     Promise.all(filePromises).then(() => {
//       this.CompanyRegistrationService.saveCompany(payload).subscribe({
//         next: (res) => {
//           if (Array.isArray(res) && res.length > 0) {
//             const responseStr = res[0];
//             console.log(res,'save company');
            
//             if (responseStr.split('|||')[0] === 'Success') {
//               this.successMessage = 'Company registered successfully!';
//               this.resetForm();
//             } else {
//               this.errorMessage = responseStr;
//             }
//           } else {
//             this.errorMessage = 'Unexpected response from server.';
//           }
//         },
//         error: (err) => {
//           console.error('Error:', err);
//           if (err.error && Array.isArray(err.error)) {
//             this.errorMessage = err.error[0];
//           } else {
//             this.errorMessage = 'Failed to register company.';
//           }
//         },
//       });
//     });
//   }

//   resetForm(): void {
//     this.companyName = '';
//     this.companyEmail = '';
//     this.password = '';
//     this.confirmPassword = '';
//     this.websiteLink = '';
//     this.contactNo = '';
//     this.address = '';
//     this.description = '';
//     this.location = '';
//     this.pin='';
//     this.foundedIn = '';
//     this.selectedEmployee = null;
//     this.selectedIndustry = null;
//     this.selectedCountry = null;
//     this.selectedCity = null;
//     this.selectedDomains = [];
//     this.selectedFile = null;
//     this.previewUrl = null;
//     this.selectedBannerFile = null;
//     this.bannerPreviewUrl = null;
//     this.selectedeLicense = null;
//     this.eLicensePreview = null;
//     this.selectedeBill = null;
//     this.eBillPreview = null;
//     this.selectedeAgreement = null;
//     this.eAgreementPreview = null;
//     this.selectedeLetter = null;
//     this.eLetterPreview = null;
//   }
// }

import { Component, OnInit, HostListener } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css',
})
export class RegisterCompanyComponent implements OnInit {
  isLoading: boolean = false;
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
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // New document fields
  selectedeLicense: File | null = null;
  eLicensePreview: string | null = null;
  selectedeBill: File | null = null;
  eBillPreview: string | null = null;
  selectedeAgreement: File | null = null;
  eAgreementPreview: string | null = null;
  selectedeLetter: File | null = null;
  eLetterPreview: string | null = null;

  // File size validation errors
  logoSizeError: string = '';
  bannerSizeError: string = '';
  licenseSizeError: string = '';
  billSizeError: string = '';
  agreementSizeError: string = '';
  letterSizeError: string = '';

  userName: string = '';
  companyName: string = '';
  password: string = '';
  confirmPassword: string = '';
  companyEmail: string = '';
  websiteLink: string = '';
  contactNo: string = '';
  address: string = '';
  description: string = '';
  location: string = '';
  pin: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  searchText: string = '';
  isDropdownOpen: boolean = false;
  filteredDomains: any[] = [];

  constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getIndustriesTypes();
    this.getEmployees();
    this.getCountries();
    this.getCities();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // File size validation function
  private validateFileSize(file: File): boolean {
    const maxSize = 1048576; // 1MB in bytes
    return file.size <= maxSize;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoSizeError = '';

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.logoSizeError = 'File size must be less than 1MB';
        this.selectedFile = null;
        this.previewUrl = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedFile = file;
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
    this.bannerSizeError = '';

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.bannerSizeError = 'File size must be less than 1MB';
        this.selectedBannerFile = null;
        this.bannerPreviewUrl = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedBannerFile = file;
      const fileType = this.selectedBannerFile.type;

      this.isBannerImage = fileType.startsWith('image/');

      if (this.isBannerImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bannerPreviewUrl = reader.result;
        };
        reader.readAsDataURL(this.selectedBannerFile);
      } else {
        this.bannerPreviewUrl = 'pdf';
      }
    }
  }

  // New document upload handlers with size validation
  oneLicenseSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.licenseSizeError = '';
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.licenseSizeError = 'File size must be less than 1MB';
        this.selectedeLicense = null;
        this.eLicensePreview = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedeLicense = file;
      this.eLicensePreview = this.selectedeLicense.name;
    }
  }

  oneBillSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.billSizeError = '';
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.billSizeError = 'File size must be less than 1MB';
        this.selectedeBill = null;
        this.eBillPreview = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedeBill = file;
      this.eBillPreview = this.selectedeBill.name;
    }
  }

  oneAgreementSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.agreementSizeError = '';
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.agreementSizeError = 'File size must be less than 1MB';
        this.selectedeAgreement = null;
        this.eAgreementPreview = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedeAgreement = file;
      this.eAgreementPreview = this.selectedeAgreement.name;
    }
  }

  oneLetterSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.letterSizeError = '';
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (!this.validateFileSize(file)) {
        this.letterSizeError = 'File size must be less than 1MB';
        this.selectedeLetter = null;
        this.eLetterPreview = null;
        input.value = ''; // Clear the file input
        return;
      }

      this.selectedeLetter = file;
      this.eLetterPreview = this.selectedeLetter.name;
    }
  }

  getIndustriesTypes(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getIndustriesTypes().subscribe(
      (response) => {
        this.isLoading = false;
        this.UniTypes = response;
        console.log(response, 'types');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Industries Types:', error);
      }
    );
  }

  onIndustryChangeNgSelect(): void {
    if (this.selectedIndustry) {
      console.log('Selected Industry ID:', this.selectedIndustry);
      
      this.selectedDomains = [];
      this.companyDomains = [];
      this.filteredDomains = [];
      
      this.getCompanyDomain(this.selectedIndustry);
    } else {
      this.companyDomains = [];
      this.filteredDomains = [];
      this.selectedDomains = [];
    }
  }

  onCountryChangeNgSelect(): void {
    if (this.selectedCountry) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryID === this.selectedCountry
      );
      this.selectedCity = null;
      
      console.log('Selected Country ID:', this.selectedCountry);
      console.log('Filtered Cities:', this.filteredCities);
    } else {
      this.filteredCities = [];
      this.selectedCity = null;
    }
  }

  getEmployees(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getEmployees().subscribe(
      (response) => {
        this.isLoading = false;
        this.employees = response;
        console.log('Employees:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Employees:', error);
      }
    );
  }

  onEmployeeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedEmployee = Number(select.value);
    console.log('Selected Employee ID:', this.selectedEmployee);
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

  onCityChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCity = Number(select.value);
    console.log('Selected City ID:', this.selectedCity);
  }

  getCompanyDomain(companyTypeID: number): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCompanyDomain(companyTypeID).subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response; 
        this.filteredDomains = response; 
        console.log('Company Domains:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
        this.companyDomains = [];
        this.filteredDomains = [];
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
    console.log('Selected Domains:', this.selectedDomains);
  }

  removeDomain(domainId: number): void {
    this.selectedDomains = this.selectedDomains.filter(
      (id) => id !== domainId
    );
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

   showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  
  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  onRegister(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Clear previous file size errors
    this.logoSizeError = '';
    this.bannerSizeError = '';
    this.licenseSizeError = '';
    this.billSizeError = '';
    this.agreementSizeError = '';
    this.letterSizeError = '';

    // Required field validation
    if (
      !this.companyName ||
      !this.companyEmail ||
      !this.password ||
      !this.confirmPassword ||
      !this.selectedIndustry ||
      !this.selectedEmployee ||
      !this.selectedCountry ||
      !this.selectedCity ||
      !this.pin
    ) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    // Required file validation
    if (!this.selectedFile) {
      this.errorMessage = 'Company logo is required.';
      return;
    }

    if (!this.selectedBannerFile) {
      this.errorMessage = 'Company banner is required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // File size validation check
    if (this.selectedFile && !this.validateFileSize(this.selectedFile)) {
      this.logoSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    if (this.selectedBannerFile && !this.validateFileSize(this.selectedBannerFile)) {
      this.bannerSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    if (this.selectedeLicense && !this.validateFileSize(this.selectedeLicense)) {
      this.licenseSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    if (this.selectedeBill && !this.validateFileSize(this.selectedeBill)) {
      this.billSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    if (this.selectedeAgreement && !this.validateFileSize(this.selectedeAgreement)) {
      this.agreementSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    if (this.selectedeLetter && !this.validateFileSize(this.selectedeLetter)) {
      this.letterSizeError = 'File size must be less than 1MB';
      this.errorMessage = 'Please check file sizes.';
      return;
    }

    const payload: any = {
      userID: 0,
      userName: '',
      companyName: this.companyName,
      password: this.password,
      companyEmail: this.companyEmail,
      foundedIn: this.foundedIn,
      websiteLink: this.websiteLink,
      contact: this.contactNo,
      address: this.address,
      description: this.description,
      location: this.location,
      pin: this.pin,
      eLogo: null,
      eLogoPath: '',
      eLogoExt: '',
      eDoc: null,
      eDocPath: '',
      eDocExt: '',
      eLicense: "null",
      eLicensePath: '',
      eLicenseExt: '',
     eBill: "null",
     eBillPath: '',
     eBillExt: '',
      eAgreement: "null",
      eAgreementPath: '',
      eAgreementExt: '',
      eLetter: "null",
      eLetterPath: '',
      eLetterExt: '',
      employeeID: this.selectedEmployee,
      companyTypeID: this.selectedIndustry,
      companyStatusID: 1,
      cityID: this.selectedCity,
      roleID: 2,
      userTypeID: 2,
      json: JSON.stringify(this.selectedDomains),
      spType: 'insert',
    };

    console.log(payload,'payload')

    // File Handling
    const filePromises: Promise<void>[] = [];

    if (this.selectedFile) {
      const filePromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eLogo = base64.split(',')[1];
          payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
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
          payload.eDoc = base64.split(',')[1];
          payload.eDocExt =
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

    // New document file handling
    if (this.selectedeLicense) {
      const licensePromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eLicense = base64.split(',')[1];
          payload.eLicenseExt = this.selectedeLicense?.name.split('.').pop() || '';
          resolve();
        };
        if (this.selectedeLicense) {
          reader.readAsDataURL(this.selectedeLicense);
        } else {
          resolve();
        }
      });
      filePromises.push(licensePromise);
    }

    if (this.selectedeBill) {
      const billPromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eBill = base64.split(',')[1];
          payload.eBillExt = this.selectedeBill?.name.split('.').pop() || '';
          resolve();
        };
        if (this.selectedeBill) {
          reader.readAsDataURL(this.selectedeBill);
        } else {
          resolve();
        }
      });
      filePromises.push(billPromise);
    }

    if (this.selectedeAgreement) {
      const leasePromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eAgreement = base64.split(',')[1];
          payload.eAgreementExt = this.selectedeAgreement?.name.split('.').pop() || '';
          resolve();
        };
        if (this.selectedeAgreement) {
          reader.readAsDataURL(this.selectedeAgreement);
        } else {
          resolve();
        }
      });
      filePromises.push(leasePromise);
    }

    if (this.selectedeLetter) {
      const bankPromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eLetter = base64.split(',')[1];
          payload.eLetterExt = this.selectedeLetter?.name.split('.').pop() || '';
          resolve();
        };
        if (this.selectedeLetter) {
          reader.readAsDataURL(this.selectedeLetter);
        } else {
          resolve();
        }
      });
      filePromises.push(bankPromise);
    }

    // API Call
    Promise.all(filePromises).then(() => {
      this.CompanyRegistrationService.saveCompany(payload).subscribe({     
        next: (res) => {
         
          if (Array.isArray(res) && res.length > 0) {

             
                 
            const responseStr = res[0];
            console.log(res,'save company');

            
            if (responseStr.split('|||')[0] === 'Success') {
              debugger;
              this.successMessage = 'Company registered successfully!';

               setTimeout(() => this.router.navigate(['/signIn']), 1000);
         
              this.resetForm();
            } else {
              this.errorMessage = responseStr;
            }
          } else {
            this.errorMessage = 'Unexpected response from server.';
          }
        },

        error: (err) => {
          console.error('Error:', err);
          if (err.error && Array.isArray(err.error)) {
            this.errorMessage = err.error[0];
          } else {
            this.errorMessage = 'Failed to register company.';
          }
        },
      });
    });
  }

  resetForm(): void {
    this.companyName = '';
    this.companyEmail = '';
    this.password = '';
    this.confirmPassword = '';
    this.websiteLink = '';
    this.contactNo = '';
    this.address = '';
    this.description = '';
    this.location = '';
    this.pin='';
    this.foundedIn = '';
    this.selectedEmployee = null;
    this.selectedIndustry = null;
    this.selectedCountry = null;
    this.selectedCity = null;
    this.selectedDomains = [];
    this.selectedFile = null;
    this.previewUrl = null;
    this.selectedBannerFile = null;
    this.bannerPreviewUrl = null;
    this.selectedeLicense = null;
    this.eLicensePreview = null;
    this.selectedeBill = null;
    this.eBillPreview = null;
    this.selectedeAgreement = null;
    this.eAgreementPreview = null;
    this.selectedeLetter = null;
    this.eLetterPreview = null;
    
    // Clear error messages
    this.logoSizeError = '';
    this.bannerSizeError = '';
    this.licenseSizeError = '';
    this.billSizeError = '';
    this.agreementSizeError = '';
    this.letterSizeError = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}