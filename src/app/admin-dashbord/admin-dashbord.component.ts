
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../Services/Admin Dashboard/adminDashboard.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {
  isLoading: boolean = false;

  Activejobs: any[] = [];
  Recentjob: any[] = [];
  companies:any[]=[];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedJobs: any[] = [];
  totalPages: number = 1;


  companySearchText: string = '';
companyCurrentPage: number = 1;
companyItemsPerPage: number = 5;
paginatedCompanies: any[] = [];
companyTotalPages: number = 1;


  constructor(
    private router: Router,
    private adminDashbordService: AdminDashboardService,
    private usersessionService: UserSessionService,
  ) {}

  ngOnInit(): void {
    this.getActivejobs();
    this.getrecentjobs();
    this.getCompanies();
  }

  getActivejobs(): void {
    this.isLoading = true;
    this.adminDashbordService.getActivejobs().subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.Activejobs = response;
        console.log(response, 'Active jobs');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Active jobs:', error);
      }
    );
  }

  getrecentjobs(): void {
    this.isLoading = true;
    this.adminDashbordService.getrecentjobs().subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.Recentjob = response;

        // ✅ Setup pagination for recent jobs
        this.totalPages = Math.ceil(this.Recentjob.length / this.itemsPerPage);
        this.updatePaginatedJobs();

        console.log(response, 'Recent jobs');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching recent jobs:', error);
      }
    );
  }


// Initialize toggleStatus based on companyStatusID when loading companies
getCompanies(): void {
  this.isLoading = true;
  this.adminDashbordService.getcompanies().subscribe(
    (response: any[]) => {
      this.isLoading = false;
      
      // Map the response to include toggleStatus based on companyStatusID
      this.companies = response.map(company => ({
        ...company,
        toggleStatus: company.companyStatusID === 1 // true if Approved (1), false otherwise
      }));

      this.companyTotalPages = Math.ceil(this.companies.length / this.companyItemsPerPage);
      this.updatePaginatedCompanies();

      console.log(response, 'Companies data');
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error fetching companies:', error);
    }
  );
}
     onToggleCompanyStatus(company: any): void {
  // Determine the new status based on current toggleStatus
  // If toggleStatus is true, set to Approved (1), otherwise set to Pending (2)
  const newStatusID = company.toggleStatus ? 1 : 2;
  
  const payload = {
    companyID: company.companyID,
    companyName: company.companyName,
    companyStatusID: newStatusID,
    userID: this.usersessionService.getUserID(),
    spType: 'update',
    remarkes: ""
  };

  this.adminDashbordService.updateCompanyStatus(payload).subscribe(
    (res) => {
      console.log(res,'company status')
      this.successMessage = `Company status updated to ${
        company.toggleStatus ? 'Approved' : 'Pending'
      } successfully!`;
      this.errorMessage = null;

      // Update the company's status in the local array
      company.companyStatusID = newStatusID;
      
      // auto hide message after 3 seconds
      setTimeout(() => (this.successMessage = null), 3000);
    },
    (error) => {
      this.errorMessage = 'Failed to update company status. Please try again.';
      this.successMessage = null;

      // rollback toggle if failed
      company.toggleStatus = !company.toggleStatus;

      setTimeout(() => (this.errorMessage = null), 3000);
    }
  );
}

  // updatePaginatedJobs(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.paginatedJobs = this.Recentjob.slice(startIndex, endIndex);
  // }

  updatePaginatedJobs(): void {
  const filteredJobs = this.Recentjob.filter(job =>
    job.jobTitle?.toLowerCase().includes(this.searchText.toLowerCase()) ||
    job.jobCategoryTitle?.toLowerCase().includes(this.searchText.toLowerCase())
  );

  this.totalPages = Math.ceil(filteredJobs.length / this.itemsPerPage);

  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;

  this.paginatedJobs = filteredJobs.slice(startIndex, endIndex);
}



  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedJobs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedJobs();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedJobs();
    }
  }

  //   onSearchChange(): void {
  //   // If you want to implement search, filter Recentjob here
  //   // and recalculate pagination
  //   this.currentPage = 1; // Reset to first page when searching
  //   this.updatePaginatedJobs();
  // }

//   updatePaginatedCompanies(): void {
//   const startIndex = (this.companyCurrentPage - 1) * this.companyItemsPerPage;
//   const endIndex = startIndex + this.companyItemsPerPage;
//   this.paginatedCompanies = this.companies.slice(startIndex, endIndex);
// }

updatePaginatedCompanies(): void {
  const filteredCompanies = this.companies.filter(company =>
    company.companyName?.toLowerCase().includes(this.companySearchText.toLowerCase()) ||
    company.email?.toLowerCase().includes(this.companySearchText.toLowerCase()) ||
    company.countryName?.toLowerCase().includes(this.companySearchText.toLowerCase())
  );

  this.companyTotalPages = Math.ceil(filteredCompanies.length / this.companyItemsPerPage);

  const startIndex = (this.companyCurrentPage - 1) * this.companyItemsPerPage;
  const endIndex = startIndex + this.companyItemsPerPage;

  this.paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
}

nextCompanyPage(): void {
  if (this.companyCurrentPage < this.companyTotalPages) {
    this.companyCurrentPage++;
    this.updatePaginatedCompanies();
  }
}

previousCompanyPage(): void {
  if (this.companyCurrentPage > 1) {
    this.companyCurrentPage--;
    this.updatePaginatedCompanies();
  }
}

}
