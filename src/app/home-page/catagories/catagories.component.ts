import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from '../../Services/website/website.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrl: './catagories.component.css'
})
export class CatagoriesComponent implements OnInit {

  @Output() categoriesSelected = new EventEmitter<string[]>();

  categories: any[] = [];          // all unique categories from API
  displayedCategories: any[] = []; // 8 shown by default
  selectedCategory: string = '';
  filteredJobs: any[] = [];
  isLoadingCategories = false;
  isLoadingJobs = false;
  showAll = false;
  selectedCategories: string[] = [];

  constructor(
    private router: Router,
    private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  // ── Load all categories ──────────────────────────────────
  getAllCategories(): void {
    this.isLoadingCategories = true;
    this.websiteService.getcategory().subscribe(
      (res: any) => {
        this.isLoadingCategories = false;

        // Extract unique categories from the jobs list
        const seen = new Set<string>();
        const unique: any[] = [];
        res.forEach((job: any) => {
          if (!seen.has(job.jobCategoryTitle)) {
            seen.add(job.jobCategoryTitle);
            unique.push({
              jobCategoryID:    job.jobCategoryID,
              jobCategoryTitle: job.jobCategoryTitle,
              jobCount: res.filter((j: any) => j.jobCategoryTitle === job.jobCategoryTitle).length
            });
          }
        });

        this.categories = unique;
        this.displayedCategories = unique.slice(0, 8);
      },
      (err: any) => {
        this.isLoadingCategories = false;
        console.error('Error fetching categories:', err);
      }
    );
  }

  // ── Toggle show all / show 8 ─────────────────────────────
  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedCategories = this.showAll
      ? this.categories
      : this.categories.slice(0, 8);
  }

  // ── On category click → filter jobs by category ──────────
  goToCategory(jobCategoryTitle: string): void {
    this.selectedCategory = jobCategoryTitle;
    this.isLoadingJobs = true;
    this.filteredJobs = [];

   this.websiteService.getselectedcategory(jobCategoryTitle).subscribe(
        (res: any) => {
          this.isLoadingJobs = false;
          this.filteredJobs = res;
        },
        (err: any) => {
          this.isLoadingJobs = false;
          console.error('Error fetching jobs by category:', err);
        }
      );
  }

  // ── Icon map ─────────────────────────────────────────────
  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Front Desk':      'bi bi-reception-4',
      'Kitchen':         'bi bi-egg-fried',
      'Housekeeping':    'bi bi-house-door',
      'House Keeping':   'bi bi-house-door',
      'Laundry':         'bi bi-water',
      'Night Operations':'bi bi-moon-stars',
      'Food & Beverage': 'bi bi-cup-straw',
      'Spa & Wellness':  'bi bi-stars',
      'Management':      'bi bi-people',
      'Waitress':        'bi bi-cup-hot',
      'Waiter':          'bi bi-cup-hot',
      'Security':        'bi bi-shield-check',
      'Driver':          'bi bi-car-front',
      'Maintenance':     'bi bi-tools',
      'Finance':         'bi bi-cash-coin',
      'HR':              'bi bi-person-badge',
      'Marketing':       'bi bi-megaphone',
    };
    return iconMap[category] || 'bi bi-briefcase';
  }

  // ── Clear selection ───────────────────────────────────────
  clearFilter(): void {
    this.selectedCategory = '';
    this.filteredJobs = [];
  }
   goToApply(jobId: number): void {

       this.router.navigate(['/companyDiscription', jobId])
    // const user = this.usersessionservice.getUserID();

    // if (user) {
    //   this.router.navigate(['/companyDiscription', jobId]);
    // } else {
    //   this.router.navigate(['/signIn']);
    // }
  }
}