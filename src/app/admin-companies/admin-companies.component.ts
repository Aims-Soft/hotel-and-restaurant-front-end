import { Component, OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { Router } from '@angular/router';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';
import { AdminDashboardService } from '../Services/Admin Dashboard/adminDashboard.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrl: './admin-companies.component.css'
})
export class AdminCompaniesComponent implements OnInit {

  toggleStatus: boolean = true;
  isLoading: boolean = false;
  jobApplications: any[] = [];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedJobApplicants: any[] | null = null;

  ngOnInit(): void {
    this.getCompanyDetails();
  }

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router,
    private adminCompanyService: adminCompanyService,
    private admindashboardservice: AdminDashboardService,
  ) {}

  getCompanyDetails(): void {
    this.isLoading = true;
    this.adminCompanyService.getcompanyDetails().subscribe(
      (response: any[]) => {
        this.isLoading = false;

        // map job status
        this.jobApplications = response.map((company) => ({
          ...company,
          toggleStatus: company.companyStatusID === 1
        }));

        console.log(this.jobApplications, 'Admin Hotels Details with toggleStatus');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Hotels Details:', error);
      }
    );
  }

  onViewApplications(company: any): void {
    // Save to localStorage before navigation
    localStorage.setItem('selectedCompany', JSON.stringify(company));

    this.router.navigate(['/adminviewcompanies'], {
      state: { company }
    });
  }

  onToggleCompanyStatus(company: any): void {
    const newStatusID = company.toggleStatus ? 1 : 4;

    const payload = {
      companyID: company.companyID,
      companyName: company.companyName,
      companyStatusID: newStatusID,
      userID: this.userSessionService.getUserID(),
      spType: 'update',
      remarkes: ""
    };

    this.admindashboardservice.updateCompanyStatus(payload).subscribe(
      (res) => {
        console.log(res, 'Hotel status');
        this.successMessage = `Hotel status updated to ${
          company.toggleStatus ? 'Approved' : 'Updated'
        } successfully!`;
        this.errorMessage = null;

        // Update the company status in the local data
        company.companyStatusID = newStatusID;

        // Clear message after 3 seconds
        setTimeout(() => (this.successMessage = null), 3000);
      },
      (error) => {
        this.errorMessage = 'Failed to update hotel status. Please try again.';
        this.successMessage = null;

        // Revert toggle if API call fails
        company.toggleStatus = !company.toggleStatus;

        setTimeout(() => (this.errorMessage = null), 3000);
      }
    );
  }

  // Export to Excel function
  exportToExcel(): void {
    try {
      // Get filtered data based on search
      const filteredData = this.searchText
        ? this.jobApplications.filter(company =>
            company.companyName?.toLowerCase().includes(this.searchText.toLowerCase())
          )
        : this.jobApplications;

      if (filteredData.length === 0) {
        this.errorMessage = 'No data to export';
        setTimeout(() => this.errorMessage = null, 3000);
        return;
      }

      // Prepare data for export - select only relevant columns
      const exportData = filteredData.map((company, index) => ({
        'S.No': index + 1,
        'Company Name': company.companyName || '',
        'Email': company.email || '',
        'Country': company.countryName || '',
        'City': company.cityName || '',
        'Status': company.companyStatusID === 1 ? 'Approved' : 
                  company.companyStatusID === 4 ? 'Inactive' : 'Unknown',
        // 'Industry Type': company.companyTypeTitle || '',
        'Employee Range': company.employeeRange || '',
        'Website': company.websiteLink || '',
        'Contact': company.contact || '',
        'Address': company.address || '',
        'Founded In': company.foundedIn || '',
        // 'Company ID': company.companyID || ''
      }));

      // Create worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const columnWidths = [
        { wch: 8 },  // S.No
        { wch: 30 }, // Company Name
        { wch: 30 }, // Email
        { wch: 20 }, // Country
        { wch: 20 }, // City
        { wch: 15 }, // Status
        // { wch: 20 }, // Industry Type
        { wch: 18 }, // Employee Range
        { wch: 30 }, // Website
        { wch: 15 }, // Contact
        { wch: 35 }, // Address
        { wch: 12 }, // Founded In
        // { wch: 12 }  // Company ID
      ];
      ws['!cols'] = columnWidths;

      // Create workbook
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, ' Registered Companies');

      // Generate filename with current date
      const date = new Date();
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const filename = `Registered Hotels_${dateStr}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);

      // Show success message
      this.successMessage = `Successfully exported ${filteredData.length} Hotels/Hotels`;
      setTimeout(() => this.successMessage = null, 3000);

    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.errorMessage = 'Failed to export data. Please try again.';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }
}