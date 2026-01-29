
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

  eBill : string= '';
peLetter : string= '';
eBillExt : string= '';
eLicense : string= '';
eBillPath : string = '';
eLetterExt : string = '';
eLetterPath  : string= '';
eLicenseExt  : string= '';
eLicensePath : string = '';
eAgreementExt  : string= '';
eAgreementPath  : string= '';
eAgreement : string= '';

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
      eBill: '',
      eLetter: '',
      eBillExt: '',
      eLicense: '',
      eBillPath:'',
      eLetterExt:'',
      eLetterPath:'',
      eLicenseExt:'',
      eLicensePath:'',
      eAgreementExt:'',
      eAgreementPath:'',
      eAgreement:'',
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
          // eLogo: payload.eLogo ? `[BASE64: ${payload.eLogo.length} chars]` : '',
          // eDoc: payload.eDoc ? `[BASE64: ${payload.eDoc.length} chars]` : '',
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