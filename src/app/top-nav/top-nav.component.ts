
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { adminCompanyService } from '../Services/Admin Companies/admincompanies.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent implements OnInit {
  isLoggedIn = false;
  fullName: string | null = null;
  roleId: number | null = null;
  companyId: any = null;
  showMobileMenu: boolean = false;
  
  // Profile image properties
  profileImageUrl: string = '../../assets/images/1.png'; // Default fallback
  isLoadingProfile: boolean = false;

  constructor(
    public router: Router,
    private usersessionservice: UserSessionService,
    private admincompanies: adminCompanyService // Inject the service
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.usersessionservice.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.usersessionservice.getUser();
      this.fullName = user?.fullName || null;
      this.roleId = this.usersessionservice.getRoleId();
      this.companyId = this.usersessionservice.getCompanyID();
      
      console.log('User Role ID:', this.roleId);
      console.log('User Company ID:', this.companyId);
      
      // Fetch user profile with image
      this.getUserProfileWithImage();
    }
  }

  // Method to fetch user profile including eDoc image
  getUserProfileWithImage(): void {
    const currentUserId = this.usersessionservice.getUserID();
    
    if (!currentUserId) {
      console.log('No user ID found');
      return;
    }

    this.isLoadingProfile = true;
    
    // Using the same getUserInfo method from your UserProfileComponent
    this.admincompanies.getUserInfo(currentUserId).subscribe({
      next: (response: any) => {
        this.isLoadingProfile = false;
        console.log('User Info Response:', response);
        
        if (response && Array.isArray(response) && response.length > 0) {
          const userData = response[0];
          
          // Check for eDoc (profile image) - exactly as in your UserProfileComponent
          if (userData.eDoc && userData.eDoc.trim() !== '') {
            this.profileImageUrl = userData.eDoc;
            console.log('Profile image loaded from eDoc:', this.profileImageUrl);
          } else {
            // Use default avatar if no eDoc found
            this.profileImageUrl = this.getDefaultAvatar();
            console.log('No eDoc found, using default avatar');
          }
          
          // Optionally update fullName if available from API
          if (userData.userName) {
            this.fullName = userData.userName;
          }
        } else {
          this.profileImageUrl = this.getDefaultAvatar();
        }
      },
      error: (error: any) => {
        this.isLoadingProfile = false;
        console.error('Error fetching user info:', error);
        this.profileImageUrl = this.getDefaultAvatar();
      }
    });
  }

  // Method to get default avatar (using UI Avatars API as fallback)
  getDefaultAvatar(): string {
    // If we have a name, create a nice avatar with initials
    if (this.fullName && this.fullName.trim() !== '') {
      const nameInitials = this.getInitials(this.fullName);
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(nameInitials)}&background=4CAF50&color=fff&rounded=true&size=60&bold=true`;
    }
    // Fallback to local default image
    return '../../assets/images/default-avatar.png';
  }

  // Helper to get initials from full name
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
    document.body.style.overflow = 'auto';
  }

  shouldShowDashboardButton(): boolean {
    return this.isLoggedIn && (this.roleId === 2 || this.roleId === 3);
  }

  shouldShowCandidateButton(): boolean {
    return this.isLoggedIn && this.roleId === 1;
  }

  goToDashboard(): void {
    if (this.roleId === 2) {
      console.log('Navigating to Company Dashboard');
      this.router.navigate(['/companyDashboard']);
    } else if (this.roleId === 3) {
      console.log('Navigating to Admin Dashboard');
      this.router.navigate(['/adminDashboard']);
    }
  }

  goToCandidateProfile(): void {
    console.log('Navigating to Candidate Profile');
    this.router.navigate(['/userprofile']);
  }

  logout(): void {
    this.usersessionservice.clearSession();
    this.isLoggedIn = false;
    this.fullName = null;
    this.roleId = null;
    this.companyId = null;
    this.profileImageUrl = '../../assets/images/1.png'; // Reset to default
    this.router.navigate(['/']);
  }

  handleImageError(event: any): void {
  console.log('Image failed to load:', this.profileImageUrl);
  event.target.src = this.getDefaultAvatar();
  event.target.onerror = null; // Prevent infinite loop
}

}