import { Component ,OnInit } from '@angular/core';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';

declare var bootstrap: any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent implements OnInit {
  
  // Industry Types
  UniTypes: any[] = [];
  selectedIndustry: number | null = null;
  newIndustryName: string = '';
  
  // Domains
  domains: any[] = [];
  filteredDomains: any[] = [];
  domainTitle: string = '';
  editingDomainId: number = 0;
  editMode: boolean = false;
  
  // Search
 searchTerm: string = '';

   successMessage: string | null = null;
  errorMessage: string | null = null;
  

  
  constructor(private companyregistration: CompanyRegistrationService,
              private userSessionService: UserSessionService
  ) {}
  
  ngOnInit(): void {
    this.loadIndustries();
    this.loadDomains();
  }
  
  // Load Industries
  loadIndustries(): void {
    this.companyregistration.getIndustriesTypes().subscribe({
      next: (response: any) => {
        this.UniTypes = response.data || response;
      },
      error: (error) => {
        console.error('Error loading industries:', error);
      }
    });
  }
  
  // Load Domains
  loadDomains(): void {
    this.companyregistration.getCompanyTypeDomain().subscribe({
      next: (response: any) => {
        this.domains = response.data || response;
        this.filterDomains();
        console.log('Domains loaded:', this.domains);
      },
      error: (error) => {
        console.error('Error loading domains:', error);
      }
    });
  }
  
  // Filter domains based on selected industry
  onIndustryChangeNgSelect(): void {
    this.filterDomains();
    this.resetDomainForm();
  }


  filterDomains(): void {
  if (this.selectedIndustry) {
    this.filteredDomains = this.domains.filter(
      d => d.companyTypeID === this.selectedIndustry
    );
  } else {
    this.filteredDomains = this.domains; 
  }
}
  
showSuccess(message: string) {
  this.successMessage = message;
  this.errorMessage = null;

  setTimeout(() => {
    this.successMessage = null;
  }, 3000);
}

showError(message: string) {
  this.errorMessage = message;
  this.successMessage = null;

  setTimeout(() => {
    this.errorMessage = null;
  }, 3000);
}
  // filterDomains(): void {
  //   if (this.selectedIndustry) {
  //     this.filteredDomains = this.domains.filter(
  //       d => d.companyTypeID === this.selectedIndustry
  //     );
  //   } else {
  //     this.filteredDomains = [];
  //   }
  // }
  
  // Add Industry
 addIndustry(): void {
  if (!this.newIndustryName.trim()) {
    return;
  }

  const industryData = {
    companyTypeID: 0,
    companyTypeTitle: this.newIndustryName,
    userID: this.userSessionService.getUserID(),
    spType: 'Insert'
  };

  this.companyregistration.saveIndustry(industryData).subscribe({
    next: (response: any) => {

      // Close modal
      const modal = document.getElementById('addIndustryModal');
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();

      // Reset form
      this.newIndustryName = '';

      // Reload data
      this.loadIndustries();
      this.loadDomains();

      // Success message
      this.showSuccess('Industry added successfully!');
    },
    error: (error) => {
      console.error('Error adding industry:', error);
      this.showError('Error adding industry. Please try again.');
    }
  });
}
  
  // Add or Update Domain
  addOrUpdateDomain(): void {
    if (!this.selectedIndustry || !this.domainTitle.trim()) {
      return;
    }
    
    const domainData = {
      domainID: this.editingDomainId,
      domainTitle: this.domainTitle,
      companyTypeID: this.selectedIndustry,
      userID: this.userSessionService.getUserID(),
      spType: this.editMode ? 'Update' : 'Insert'
    };
    
    this.companyregistration.saveDomain(domainData).subscribe({
      next: (response: any) => {
        // Reload domains
        this.loadDomains();
        
        // Reset form
        this.resetDomainForm();
        
        // Show success message
        const message = this.editMode ? 'Domain updated successfully!' : 'Domain added successfully!';
        this.successMessage = message;
      },
      error: (error) => {
        console.error('Error saving domain:', error);
        this.errorMessage = 'Error saving domain. Please try again.';
      }
    });
  }
  
  // Edit Domain
  editDomain(domain: any): void {
    this.editMode = true;
    this.editingDomainId = domain.domainID;
    this.domainTitle = domain.domainTitle;
    this.selectedIndustry = domain.companyTypeID;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Delete Domain
  deleteDomain(domain: any): void {
    if (!confirm(`Are you sure you want to delete "${domain.domainTitle}"?`)) {
      return;
    }
    
    const domainData = {
      domainID: domain.domainID,
      domainTitle: domain.domainTitle,
      companyTypeID: domain.companyTypeID,
      userID: this.userSessionService.getUserID(),
      spType: 'Delete'
    };
    
    this.companyregistration.saveDomain(domainData).subscribe({
      next: (response: any) => {
        // Reload domains
        this.loadDomains();
        
        this.successMessage = 'Domain deleted successfully!';
      },
      error: (error) => {
        console.error('Error deleting domain:', error);
        this.errorMessage = 'Error deleting domain. Please try again.';
      }
    });
  }
  
  // Reset Domain Form
  resetDomainForm(): void {
    this.domainTitle = '';
    this.editingDomainId = 0;
    this.editMode = false;
  }
  
}
