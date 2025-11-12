

import { Component, OnInit } from '@angular/core';
import { JobService } from '../Services/Job/Job.service';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { CompanyRegistrationService } from '../Services/Company registration/company-registration.service';
import { RegisterUserService } from '../Services/register user/register-user.service';
import { Router } from '@angular/router';
import { CompanyDashboardService } from '../Services/Company Dashboard/companyDashboard.service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent implements OnInit {

  toggleStatus: boolean = true;
  isLoading: boolean = false;
  jobApplications: any[] = [];
  searchText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedJobApplicants: any[] | null = null;

  ngOnInit(): void {
    this.getcandidates();
  }

  constructor(
    private JobService: JobService,
    private userSessionService: UserSessionService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private RegisterUserService: RegisterUserService,
    private CompanyDashboardService: CompanyDashboardService,
    private router: Router,
    private adminCompanyService: adminCompanyService,
  ) {}

  getcandidates(): void {
    this.isLoading = true;
    this.adminCompanyService.getcandidates().subscribe(
      (response: any[]) => {
        console.log(response, 'candidates');
        this.isLoading = false;

        // map job status
        this.jobApplications = response.map((job) => ({
          ...job,
          toggleStatus: job.jobStatusID === 1,
        }));
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching candidates Details:', error);
      }
    );
  }

  onViewApplications(job: any): void {
    console.log('Navigating with userID:', job.userID);
    this.router.navigate(['/candidateprofile'], {
      state: { userID: job.userID }
    });
  }

  // Export to Excel function
  exportToExcel(): void {
    try {
      // Get filtered data based on search
      const filteredData = this.searchText 
        ? this.jobApplications.filter(item => 
            item.userName?.toLowerCase().includes(this.searchText.toLowerCase())
          )
        : this.jobApplications;

      if (filteredData.length === 0) {
        this.errorMessage = 'No data to export';
        setTimeout(() => this.errorMessage = null, 3000);
        return;
      }

      // Prepare data for export - select only relevant columns
      const exportData = filteredData.map((item, index) => ({
        'S.No': index + 1,
        'Name': item.userName || '',
        'Cnic': item.cnic || '',
        'Email': item.email || '',
        'Country': item.countryName || '',
        'City': item.cityName || '',
        'Contact': item.contact || '',
        'Address': item.address || ''
      }));

      // Create worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const columnWidths = [
        { wch: 8 },  // S.No
        { wch: 25 }, // Name
         { wch: 30 }, // Cnic
        { wch: 30 }, // Email
        { wch: 20 }, // Country
        { wch: 20 }, // City
        { wch: 15 }, // Contact
        { wch: 50 }  // Address
      ];
      ws['!cols'] = columnWidths;

      // Create workbook
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Candidates');

      // Generate filename with current date
      const date = new Date();
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const filename = `Candidates_${dateStr}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);

      // Show success message
      this.successMessage = `Successfully exported ${filteredData.length} candidate(s)`;
      setTimeout(() => this.successMessage = null, 3000);

    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.errorMessage = 'Failed to export data. Please try again.';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }
}
