import { Component , OnInit } from '@angular/core';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import{CompanyRegistrationService  }from '../Services/Company registration/company-registration.service'

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent  implements OnInit  {

  isLoading: boolean = false;
   UniTypes: any[] = []
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



  
   constructor(
    private userSessionService: UserSessionService,
    private CompanyRegistrationService :CompanyRegistrationService 
  ) {}

    ngOnInit(): void {
    this.getIndustriesTypes(); 
    this.getEmployees();
     this.getCountries(); 
     this.getCities();
     this.getCompanyDomain(); 
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
         console.log(response,'types')
      
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
    console.log("Selected Industry ID:", this.selectedIndustry);
  }

  getEmployees(): void {
  this.isLoading = true;
  this.CompanyRegistrationService.getEmployees().subscribe(
    (response) => {
      this.isLoading = false;
      this.employees = response;
      console.log("Employees:", response);
    },
    (error) => {
      this.isLoading = false;
      console.error("Error fetching Employees:", error);
    }
  );
}
onEmployeeChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  this.selectedEmployee = Number(select.value);
  console.log("Selected Employee ID:", this.selectedEmployee);
}

getCountries(): void {
  this.isLoading = true;
  this.CompanyRegistrationService.getCountries().subscribe(
    (response) => {
      this.isLoading = false;
      this.countries = response;
      console.log("Countries:", response);
    },
    (error) => {
      this.isLoading = false;
      console.error("Error fetching Countries:", error);
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
      this.cities = response;  // store all cities
      console.log("All Cities:", response);
    },
    (error) => {
      this.isLoading = false;
      console.error("Error fetching Cities:", error);
    }
  );
}

onCountryChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  this.selectedCountry = Number(select.value);
  console.log("Selected Country ID:", this.selectedCountry);

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
  console.log("Selected City ID:", this.selectedCity);
}



 getCompanyDomain(): void {
  this.isLoading = true;
  this.CompanyRegistrationService.getCompanyDomain().subscribe(
    (response) => {
      this.isLoading = false;
      this.companyDomains = response;  // [{id:1,name:"PHP"},...]
      console.log("Company Domains:", response);
    },
    (error) => {
      this.isLoading = false;
      console.error("Error fetching company domains:", error);
    }
  );
}

toggleDomain(domainId: number): void {
  if (this.selectedDomains.includes(domainId)) {
    // remove if already selected
    this.selectedDomains = this.selectedDomains.filter(id => id !== domainId);
  } else {
    // add if not selected
    this.selectedDomains.push(domainId);
  }
  console.log("Selected Domains:", this.selectedDomains);
}

onRegister(): void {
  const payload = {
    userID: 0,
    userName: this.userName,
    companyName: this.companyName,
    password: this.password,
    companyEmail: this.companyEmail,
    foundedIn: this.foundedIn, 
    websiteLink: this.websiteLink,
    address: this.address,
    description: this.description,
    location: this.location,
    companyTypeID: this.selectedIndustry,
    employeeID: this.selectedEmployee,
    countryID: this.selectedCountry,
    cityID: this.selectedCity,
    domains: this.selectedDomains 
  };

  console.log("save Company user:", payload);

  this.CompanyRegistrationService.saveCompany(payload).subscribe({
    next: (res) => {
      console.log("Company registered:", res);
      alert("Company registered successfully!");
    },
    error: (err) => {
      console.error("Error:", err);
      alert("Failed to register company.");
    }
  });
}


}
