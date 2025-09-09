

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

  // Your existing properties...
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

  successMessage: string = '';
  errorMessage: string = '';
  // string | ArrayBuffer | null;

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
    this.getCompanyDomain();
  }

  getIndustriesTypes(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getIndustriesTypes().subscribe(
      (response) => {
        this.isLoading = false;
        this.UniTypes = response;
        // console.log(response, 'types');
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
        this.cities = response; // store all cities
        this.filteredCities = [...this.cities]; // Initialize filteredCities with all cities
        // console.log('All Cities:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Cities:', error);
      }
    );
  }

  getCompanyDomain(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getCompanyDomain().subscribe(
      (response) => {
        this.isLoading = false;
        this.companyDomains = response;
        // console.log('Company Domains:', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching company domains:', error);
      }
    );
  }

  getEmployees(): void {
    this.isLoading = true;
    this.CompanyRegistrationService.getEmployees().subscribe(
      (response) => {
        this.isLoading = false;
        this.employees = response;
        // console.log('Employees:', response);
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
        // console.log('Countries:', response);
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

            // Prefill logo and banner
            // this.previewUrl = companyData.eLogo || null;
            // this.bannerPreviewUrl = companyData.eDoc || null;
  // this.previewUrl = companyData.eLogo || companyData.companyLogo || companyData.logo || null;
  // this.bannerPreviewUrl = companyData.eDoc || companyData.companyDoc || companyData.banner || companyData.document || null;


// if (typeof this.previewUrl === 'string') {
//   const fileName = this.previewUrl.toLowerCase();
//   if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
//     this.isImage = true;
//   } else if (fileName.endsWith('.pdf')) {
//     this.isImage = false;
//     this.previewUrl = 'pdf';
//   }
// }

// if (typeof this.bannerPreviewUrl === 'string') {
//   const fileName = this.bannerPreviewUrl.toLowerCase();
//   if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
//     this.isBannerImage = true;
//   } else if (fileName.endsWith('.pdf')) {
//     this.isBannerImage = false;
//     this.bannerPreviewUrl = 'pdf';
//   }
// }


            

            // Filter cities based on selected country
            if (this.selectedCountry) {
              this.filterCitiesByCountry(this.selectedCountry);
            }

            // Handle domains
            // this.selectedDomains = [];

          
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

  // Helper method to filter cities by country
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

    if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      // Show image preview
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
      this.isImage = true;
    } else if (fileName.endsWith('.pdf')) {
      // Show pdf icon + filename
      this.previewUrl = 'pdf';
      this.isImage = false;
    } else {
      // Unsupported file type → clear
      this.previewUrl = null;
      this.isImage = false;
      this.selectedFile = null;
      alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
    }
  }
}

onBannerSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedBannerFile = input.files[0];
    const fileName = this.selectedBannerFile.name.toLowerCase();

    if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      const reader = new FileReader();
      reader.onload = () => (this.bannerPreviewUrl = reader.result);
      reader.readAsDataURL(this.selectedBannerFile);
      this.isBannerImage = true;
    } else if (fileName.endsWith('.pdf')) {
      this.bannerPreviewUrl = 'pdf';
      this.isBannerImage = false;
    } else {
      this.bannerPreviewUrl = null;
      this.isBannerImage = false;
      this.selectedBannerFile = null;
      alert('Only PNG, JPG, JPEG, and PDF files are allowed.');
    }
  }
}

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     const fileType = this.selectedFile.type;
  //     this.isImage = fileType.startsWith('image/');

  //     if (this.isImage) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.previewUrl = reader.result;
  //       };
  //       if (this.selectedFile) {
  //         reader.readAsDataURL(this.selectedFile);
  //       }
  //     } else {
  //       this.previewUrl = 'pdf';
  //     }
  //   }
  // }

  // onBannerSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedBannerFile = input.files[0];
  //     const fileType = this.selectedBannerFile.type;
  //     this.isBannerImage = fileType.startsWith('image/');

  //     if (this.isBannerImage) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.bannerPreviewUrl = reader.result;
  //       };
  //       if (this.selectedBannerFile) {
  //         reader.readAsDataURL(this.selectedBannerFile);
  //       }
  //     } else {
  //       this.bannerPreviewUrl = 'pdf';
  //     }
  //   }
  // }

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

    const payload: any = {
      companyID: this.userSessionService.getCompanyID(),
      companyName: this.companyName,
      companyEmail: this.companyEmail,
      password: this.password,
      foundedIn: this.foundedIn,
      websiteLink: this.websiteLink,
      contactNo: this.contact,
      address: this.address,
      description: this.description,
      location: this.location,
      employeeID: this.selectedEmployee,
      companyTypeID: this.selectedIndustry,
      countryID: this.selectedCountry,
      cityID: this.selectedCity,
      domains: JSON.stringify(this.selectedDomains),
      spType: 'update',
    };

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

    // API Call
    Promise.all(filePromises).then(() => {
      this.CompanyRegistrationService.saveCompany(payload).subscribe({
        next: (res) => {
          if (Array.isArray(res) && res.length > 0) {
            const responseStr = res[0];
            if (responseStr.split('|||')[0] === 'Success') {
              this.successMessage = 'Company Updated successfully!';
              this.getCompanyDetail(); // Refresh data
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
            this.errorMessage = 'Failed to update company.';
          }
        },
      });
    });
  }

  resetForm(): void {
    this.getCompanyDetail(); // Reset to original values
  }

  onIndustryChange(event: any) {
    this.selectedIndustry = +event.target.value;
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
}
