import { Component, OnInit ,HostListener } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';

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
  pin: string ='';

  successMessage: string = '';
  errorMessage: string = '';

    searchText: string = '';
  isDropdownOpen: boolean = false;
  filteredDomains: any[] = [];

  constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService
  ) {}

  ngOnInit(): void {
    this.getIndustriesTypes();
    this.getEmployees();
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
        // For PDFs just show name
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

  onIndustryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedIndustry = Number(select.value);
    console.log('Selected Industry ID:', this.selectedIndustry);
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
  // onCountryChange(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedCountry = Number(select.value);
  //   console.log("Selected Country ID:", this.selectedCountry);
  // }
  filteredCities: any[] = [];

  getCities(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCities().subscribe(
      (response) => {
        this.isLoading = false;
        this.cities = response; // store all cities
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
      // filter locally
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

  getCompanyDomain(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCompanyDomain().subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response; 
         this.filteredDomains = response; 
        console.log('Company Domains:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
      }
    );
  }

  // toggleDomain(domainId: number): void {
  //   if (this.selectedDomains.includes(domainId)) {
  //     // remove if already selected
  //     this.selectedDomains = this.selectedDomains.filter(
  //       (id) => id !== domainId
  //     );
  //   } else {
  //     // add if not selected
  //     this.selectedDomains.push(domainId);
  //   }
  //   console.log('Selected Domains:', this.selectedDomains);
  // }


   // Toggle dropdown open/close
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.searchText = '';
      this.filteredDomains = this.companyDomains;
    }
  }

  // Filter domains based on search text
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

  // Toggle domain selection
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

  // Remove selected domain
  removeDomain(domainId: number): void {
    this.selectedDomains = this.selectedDomains.filter(
      (id) => id !== domainId
    );
  }

  // Get selected domain objects
  getSelectedDomains(): any[] {
    return this.companyDomains.filter((domain) =>
      this.selectedDomains.includes(domain.domainID)
    );
  }

  // Check if domain is selected
  isDomainSelected(domainId: number): boolean {
    return this.selectedDomains.includes(domainId);
  }

  // // Close dropdown when clicking outside
  // onClickOutside(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.custom-multiselect')) {
  //     this.isDropdownOpen = false;
  //   }
  

    // Listen for clicks anywhere on the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // If click is outside the dropdown, close it
    if (!target.closest('.custom-multiselect')) {
      this.isDropdownOpen = false;
    }
  }
  // onRegister(): void {
  //   const payload: any = {
  //     userID: 0,
  //     userName: "",
  //     companyName: this.companyName,
  //     password: this.password,
  //     companyEmail: this.companyEmail,
  //     foundedIn: this.foundedIn,
  //     websiteLink: this.websiteLink,
  //     address: this.address,
  //     description: this.description,
  //     location: this.location,
  //     eLogo: null,
  //     eLogoPath: "",
  //     eLogoExt: "",
  //     eDoc: null,
  //     eDocPath: "",
  //     eDocExt: "",
  //     employeeID: this.selectedEmployee,
  //     companyTypeID: this.selectedIndustry,
  //     companyStatusID: 1,
  //     cityID: this.selectedCity,
  //     roleID: 2,
  //     userTypeID: 2,
  //     json: JSON.stringify(this.selectedDomains),
  //     spType: "insert"
  //   };

  //   // File conversion logic here...
  //   const filePromises: Promise<void>[] = [];

  //   if (this.selectedFile) {
  //     const filePromise = new Promise<void>((resolve) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64 = reader.result as string;
  //         payload.eLogo = base64.split(',')[1]; // Remove data:image/... prefix
  //         payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
  //         resolve();
  //       };
  //       // Add null check before calling readAsDataURL
  //       if (this.selectedFile) {
  //         reader.readAsDataURL(this.selectedFile);
  //       } else {
  //         resolve(); // Resolve immediately if file is null
  //       }
  //     });
  //     filePromises.push(filePromise);
  //   }

  //   if (this.selectedBannerFile) {
  //     const bannerPromise = new Promise<void>((resolve) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64 = reader.result as string;
  //         payload.eDoc = base64.split(',')[1]; // Remove data:image/... prefix
  //         payload.eDocExt = this.selectedBannerFile?.name.split('.').pop() || '';
  //         resolve();
  //       };
  //       // Add null check before calling readAsDataURL
  //       if (this.selectedBannerFile) {
  //         reader.readAsDataURL(this.selectedBannerFile);
  //       } else {
  //         resolve(); // Resolve immediately if file is null
  //       }
  //     });
  //     filePromises.push(bannerPromise);
  //   }

  //   Promise.all(filePromises).then(() => {
  //     console.log("Final payload:", payload);

  //     this.CompanyRegistrationService.saveCompany(payload).subscribe({
  //       next: (res) => {
  //         console.log("Company registered:", res);
  //         alert("Company registered successfully!");
  //       },
  //       error: (err) => {
  //         console.error("Error:", err);
  //         console.error("Error details:", err.error); // Check server response
  //         alert("Failed to register company.");
  //       }
  //     });
  //   });
  // }

  // onRegister(): void {
  //   const payload: any = {
  //     userID: 0,
  //     userName: "",
  //     companyName: this.companyName,
  //     password: this.password,
  //     companyEmail: this.companyEmail,
  //     foundedIn: this.foundedIn,
  //     websiteLink: this.websiteLink,
  //     address: this.address,
  //     description: this.description,
  //     location: this.location,
  //     eLogo: null,
  //     eLogoPath: "",
  //     eLogoExt: "",
  //     eDoc: null,
  //     eDocPath: "",
  //     eDocExt: "",
  //     employeeID: this.selectedEmployee,
  //     companyTypeID: this.selectedIndustry,
  //     companyStatusID: 1,
  //     cityID: this.selectedCity,
  //     roleID: 2,
  //     userTypeID: 2,
  //     json: JSON.stringify(this.selectedDomains),
  //     spType: "insert"
  //   };

  //   // ---- Simple Frontend Validation ----
  //   if (!this.companyName || !this.companyEmail || !this.password || !this.confirmPassword) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   if (this.password !== this.confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   // ---- File conversion logic ----
  //   const filePromises: Promise<void>[] = [];

  //   // if (this.selectedFile) {
  //   //   const filePromise = new Promise<void>((resolve) => {
  //   //     const reader = new FileReader();
  //   //     reader.onload = () => {
  //   //       const base64 = reader.result as string;
  //   //       payload.eLogo = base64.split(',')[1];
  //   //       payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
  //   //       resolve();
  //   //     };
  //   //     reader.readAsDataURL(this.selectedFile);
  //   //   });
  //   //   filePromises.push(filePromise);
  //   // }

  //   if (this.selectedFile) {
  //     const filePromise = new Promise<void>((resolve) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64 = reader.result as string;
  //         payload.eLogo = base64.split(',')[1]; // Remove data:image/... prefix
  //         payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
  //         resolve();
  //       };
  //       // Add null check before calling readAsDataURL
  //       if (this.selectedFile) {
  //         reader.readAsDataURL(this.selectedFile);
  //       } else {
  //         resolve(); // Resolve immediately if file is null
  //       }
  //     });
  //     filePromises.push(filePromise);
  //   }

  //     if (this.selectedBannerFile) {
  //     const bannerPromise = new Promise<void>((resolve) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64 = reader.result as string;
  //         payload.eDoc = base64.split(',')[1]; // Remove data:image/... prefix
  //         payload.eDocExt = this.selectedBannerFile?.name.split('.').pop() || '';
  //         resolve();
  //       };
  //       // Add null check before calling readAsDataURL
  //       if (this.selectedBannerFile) {
  //         reader.readAsDataURL(this.selectedBannerFile);
  //       } else {
  //         resolve(); // Resolve immediately if file is null
  //       }
  //     });
  //     filePromises.push(bannerPromise);
  //   }

  //   // if (this.selectedBannerFile) {
  //   //   const bannerPromise = new Promise<void>((resolve) => {
  //   //     const reader = new FileReader();
  //   //     reader.onload = () => {
  //   //       const base64 = reader.result as string;
  //   //       payload.eDoc = base64.split(',')[1];
  //   //       payload.eDocExt = this.selectedBannerFile?.name.split('.').pop() || '';
  //   //       resolve();
  //   //     };
  //   //     reader.readAsDataURL(this.selectedBannerFile);
  //   //   });
  //   //   filePromises.push(bannerPromise);
  //   // }

  //   // ---- API Call ----
  //   Promise.all(filePromises).then(() => {
  //     this.CompanyRegistrationService.saveCompany(payload).subscribe({
  //       next: (res: any) => {
  //         console.log("Company registered:", res);

  //         // If response is success
  //         if (res && res.message === "Success") {
  //           alert("Company registered successfully!");
  //           this.resetForm();
  //         }
  //         // If response contains error array
  //         else if (Array.isArray(res) && res.length > 0) {
  //           alert(res[0]); // e.g. "User already Exist"
  //         } else {
  //           alert("Unexpected response from server.");
  //         }
  //       },
  //       error: (err) => {
  //         console.error("Error:", err);
  //         if (err.error && Array.isArray(err.error)) {
  //           alert(err.error[0]); // show backend validation message
  //         } else {
  //           alert("Failed to register company.");
  //         }
  //       }
  //     });
  //   });
  // }

  onRegister(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const payload: any = {
      userID: 0,
      userName: '',
      companyName: this.companyName,
      password: this.password,
      companyEmail: this.companyEmail,
      foundedIn: this.foundedIn,
      websiteLink: this.websiteLink,
      contact:this.contactNo,
      address: this.address,
      description: this.description,
      location: this.location,
      pin:this.pin,
      eLogo: null,
      eLogoPath: '',
      eLogoExt: '',
      eDoc: null,
      eDocPath: '',
      eDocExt: '',
      employeeID: this.selectedEmployee,
      companyTypeID: this.selectedIndustry,
      companyStatusID: 1,
      cityID: this.selectedCity,
      roleID: 2,
      userTypeID: 2,
      json: JSON.stringify(this.selectedDomains),
      spType: 'insert',
    };

    // ---- Validation ----
    if (
      !this.companyName ||
      !this.companyEmail ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // ---- File Handling ----
    const filePromises: Promise<void>[] = [];
    if (this.selectedFile) {
      const filePromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eLogo = base64.split(',')[1]; // Remove data:image/... prefix
          payload.eLogoExt = this.selectedFile?.name.split('.').pop() || '';
          resolve();
        };
        // Add null check before calling readAsDataURL
        if (this.selectedFile) {
          reader.readAsDataURL(this.selectedFile);
        } else {
          resolve(); // Resolve immediately if file is null
        }
      });
      filePromises.push(filePromise);
    }
    if (this.selectedBannerFile) {
      const bannerPromise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          payload.eDoc = base64.split(',')[1]; // Remove data:image/... prefix
          payload.eDocExt =
            this.selectedBannerFile?.name.split('.').pop() || '';
          resolve();
        };
        // Add null check before calling readAsDataURL
        if (this.selectedBannerFile) {
          reader.readAsDataURL(this.selectedBannerFile);
        } else {
          resolve(); // Resolve immediately if file is null
        }
      });
      filePromises.push(bannerPromise);
    }

    // ---- API Call ----
    Promise.all(filePromises).then(() => {
      this.CompanyRegistrationService.saveCompany(payload).subscribe({
        next: (res) => {
         
          if (Array.isArray(res) && res.length > 0) {
            const responseStr = res[0]; // "Success|||34"
           
  console.log(res,'save company');
            if (responseStr.split('|||')[0] === 'Success') {
              this.successMessage = 'Company registered successfully!';
              this.resetForm();
            } else {
              this.errorMessage = responseStr; // e.g. "User already Exist"
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
  }
}
