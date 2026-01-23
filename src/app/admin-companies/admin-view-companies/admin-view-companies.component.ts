import { Component, OnInit, OnDestroy } from '@angular/core';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
import { Router } from '@angular/router';
import { WebsiteService } from '../../Services/website/website.service';

@Component({
  selector: 'app-admin-view-companies',
  templateUrl: './admin-view-companies.component.html',
  styleUrl: './admin-view-companies.component.css'
})
export class AdminViewCompaniesComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  jobApplications: any[] = [];
  company: any;
  companyID: number | null = null;
  companyId!: number;
  jobs: any[] = [];

  // Document configuration
  documents = [
    { key: 'eBill', label: 'Utility Bill', icon: 'bi-receipt', color: '#4CAF50' },
    { key: 'eAgreement', label: 'Agreement', icon: 'bi-file-earmark-text', color: '#2196F3' },
    { key: 'eLetter', label: 'Authorization Letter', icon: 'bi-envelope-paper', color: '#FF9800' },
    { key: 'eLicense', label: 'Business License', icon: 'bi-shield-check', color: '#9C27B0' }
  ];

  ngOnInit(): void {
    // Check if company data exists
    if (!this.company) {
      console.error('No company data received');
      this.router.navigate(['/admin-companies']);
      return;
    }

    // Now fetch jobs using the company ID from the company object
    this.getAllJobs(this.company.companyID);
  }

  ngOnDestroy(): void {
    // Clean up localStorage when component is destroyed
    localStorage.removeItem('selectedCompany');
  }

  constructor(
    private admincompanyService: adminCompanyService,
    private router: Router,
    private websitesevice: WebsiteService,
  ) {
    // Try to get from navigation state first
    const nav = this.router.getCurrentNavigation();
    this.company = nav?.extras.state?.['company'];

    // If not in state, try localStorage (for page refresh)
    if (!this.company) {
      const savedCompany = localStorage.getItem('selectedCompany');
      if (savedCompany) {
        this.company = JSON.parse(savedCompany);
        console.log('Company loaded from localStorage:', this.company);
      }
    }
  }

  getCompanyDetails(): void {
    this.isLoading = true;
    this.admincompanyService.getcompanyDetails().subscribe(
      (response: any[]) => {
        this.isLoading = false;

        // map job status
        this.jobApplications = response.map((company) => ({
          ...company,
        }));

        console.log(this.jobApplications, 'Admin Company Details with toggleStatus');
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Companies Details:', error);
      }
    );
  }

  getAllJobs(companyId: number): void {
    if (!companyId) {
      console.error('Invalid company ID');
      return;
    }

    this.isLoading = true;
    console.log('Fetching jobs for company ID:', companyId);

    this.websitesevice.getAdminJobs(companyId).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.jobs = response.map(job => ({
          ...job
        }));
        console.log('Jobs fetched:', this.jobs);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }

  goToApply(jobId: number): void {
    // Save jobId to localStorage before navigation
    localStorage.setItem('selectedJobId', jobId.toString());

    this.router.navigate(['/companyjobuser'], {
      state: { jobId: jobId }
    });
  }

  formatWebsiteUrl(url: string): string {
    if (!url) return '#';
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  }

  // Check if document exists and has a valid URL
  hasDocument(docKey: string): boolean {
    const docUrl = this.company?.[docKey];
    return docUrl && docUrl.trim() !== '' && !docUrl.endsWith('/');
  }

  // Get available documents
  getAvailableDocuments() {
    return this.documents.filter(doc => this.hasDocument(doc.key));
  }

  // View document in new tab
  viewDocument(docKey: string): void {
    const docUrl = this.company?.[docKey];
    if (docUrl) {
      window.open(docUrl, '_blank');
    }
  }

  // Download document
  downloadDocument(docKey: string, label: string): void {
    const docUrl = this.company?.[docKey];
    if (docUrl) {
      const link = document.createElement('a');
      link.href = docUrl;
      link.download = `${this.company.companyName}_${label}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}