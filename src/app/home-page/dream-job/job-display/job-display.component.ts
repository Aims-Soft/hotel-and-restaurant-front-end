import { Component, Input, OnChanges, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../../../Services/userSession/userSession.Service';
import { WebsiteService } from '../../../Services/website/website.service';
import { environment } from '../../../../environmentts/environment';

@Component({
  selector: 'app-job-display',
  templateUrl: './job-display.component.html',
  styleUrl: './job-display.component.scss'
})
export class JobDisplayComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';

  isLoading: boolean = false;
  jobs: any[] = [];
  displayedJobs: any[] = [];
  showAll: boolean = false;
  openDropdownId: number | null = null;

  // ✅ Track active category filter from URL
  activeCategoryID: number | null = null;
  activeCategoryTitle: string = '';

  constructor(
    private router: Router,
    private usersessionservice: UserSessionService,
    private websiteservice: WebsiteService,
    private route: ActivatedRoute,
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.openDropdownId = null;
  }

  ngOnInit(): void {
    // ✅ Read jobCategoryID from query params on page load
    this.route.queryParams.subscribe(params => {
      const catID = params['jobCategoryID'];

      if (catID) {
        this.activeCategoryID = parseInt(catID);
        this.getAlljobs(); // load all then filter by category
      } else {
        // No category filter — show all jobs
        this.activeCategoryID = null;
        this.activeCategoryTitle = '';
        this.getAlljobs();
      }
    });
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.jobs];

    // ✅ Filter by jobCategoryID if set
    if (this.activeCategoryID !== null) {
      filtered = filtered.filter(job => job.jobCategoryID === this.activeCategoryID);
      // Set title for display from first matched job
      const match = filtered[0];
      if (match) this.activeCategoryTitle = match.jobCategoryTitle;
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.displayedJobs = this.showAll ? filtered : filtered.slice(0, 4);
  }

  getAlljobs(): void {
    this.isLoading = true;
    this.websiteservice.getActiveJobs(0).subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.jobs = response;
        this.showAll = false;
        this.applyFilters();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching Jobs:', error);
      }
    );
  }

  // ✅ Clear category filter → show all jobs
  clearCategoryFilter(): void {
    this.activeCategoryID = null;
    this.activeCategoryTitle = '';
    // Remove query param from URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });
    this.applyFilters();
  }

  toggleJobs(): void {
    this.showAll = !this.showAll;
    this.applyFilters();
  }

  goToApply(jobId: number): void {
    this.router.navigate(['/companyDiscription', jobId]);
  }

  toggleShareDropdown(jobId: number, event: Event): void {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === jobId ? null : jobId;
  }

  isDropdownOpen(jobId: number): boolean {
    return this.openDropdownId === jobId;
  }

  shareJob(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    if (navigator.share) {
      navigator.share({
        title: job.jobTitle,
        text: `Check out this job opportunity: ${job.jobTitle} at ${job.companyName}`,
        url: jobUrl
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      this.copyToClipboard(jobUrl);
    }
    this.openDropdownId = null;
  }

  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Job link copied to clipboard!');
        this.openDropdownId = null;
      }).catch(() => this.fallbackCopyToClipboard(text));
    } else {
      this.fallbackCopyToClipboard(text);
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast('Job link copied to clipboard!');
      this.openDropdownId = null;
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  shareViaWhatsApp(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    const text = `Check out this job: ${job.jobTitle} at ${job.companyName}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`, '_blank');
    this.openDropdownId = null;
  }

  shareViaLinkedIn(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`, '_blank');
    this.openDropdownId = null;
  }

  shareViaEmail(job: any, event: Event): void {
    event.stopPropagation();
    const jobUrl = `${environment.productUrl}#/companyDiscription/${job.jobID}`;
    const subject = `Job Opportunity: ${job.jobTitle}`;
    const body = `I found this job opportunity:\n\n${job.jobTitle} at ${job.companyName}\n\n${jobUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.openDropdownId = null;
  }
}