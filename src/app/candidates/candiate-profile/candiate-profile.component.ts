import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { adminCompanyService } from '../../Services/Admin Companies/admincompanies.service';
// import { Location } from '@angular/common';
@Component({
  selector: 'app-candiate-profile',
  templateUrl: './candiate-profile.component.html',
  styleUrl: './candiate-profile.component.css'
})
export class CandiateProfileComponent  implements OnInit{

   isLoading: boolean = false;
  jobApplications: any[] = [];
  candidateDetails: any = null;
  userID: number | null = null;
  errorMessage: string | null = null;
   userDomains: any[] = [];

   ngOnInit(): void {
    // Check if userID exists
    if (!this.userID) {
      console.error('No userID received');
      this.errorMessage = 'No user selected. Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/candidates']);
      }, 2000);
      return;
    }

    // Fetch candidate details
    this.getCandidatesDetails(this.userID);
  }

  constructor(  private router:Router,
    private admincompanyservice:adminCompanyService,
    private route:ActivatedRoute,
    private adminCompanyService:adminCompanyService,
  ){
   // Get userID from navigation state in constructor
    const navigation = this.router.getCurrentNavigation();
    this.userID = navigation?.extras.state?.['userID'];
    console.log('Received userID in constructor:', this.userID);
  }

  getCandidatesDetails(userID: number): void {
  this.isLoading = true;
  console.log('Fetching candidate details for userID:', userID);
  
  this.adminCompanyService.getCandidatesDetails(userID).subscribe(
    (response: any) => {
      console.log('Full API Response:', response);
      console.log('Response type:', typeof response);
      console.log('Is Array?', Array.isArray(response));
      
      this.isLoading = false;
      
      // Check if response is an array and get first item
      if (Array.isArray(response) && response.length > 0) {
        this.candidateDetails = response[0];
        console.log('Candidate details (first item):', this.candidateDetails);
        
        // Parse userDomain if it exists
        if (this.candidateDetails.userDomain) {
          try {
            this.userDomains = JSON.parse(this.candidateDetails.userDomain);
            console.log('Parsed user domains:', this.userDomains);
            // Removed: this.userDomains = this.removeDuplicateDomains(this.userDomains);
          } catch (error) {
            console.error('Error parsing userDomain:', error);
            this.userDomains = [];
          }
        }
      } else if (response && !Array.isArray(response)) {
        // If response is an object directly
        this.candidateDetails = response;
        console.log('Candidate details (object):', this.candidateDetails);
        
        if (response.userDomain) {
          try {
            this.userDomains = JSON.parse(response.userDomain);
            // Removed: this.userDomains = this.removeDuplicateDomains(this.userDomains);
          } catch (error) {
            console.error('Error parsing userDomain:', error);
            this.userDomains = [];
          }
        }
      } else {
        console.error('Unexpected response format:', response);
        this.errorMessage = 'Invalid data format received.';
      }
      
      // Log all available properties
      if (this.candidateDetails) {
        console.log('Available properties:', Object.keys(this.candidateDetails));
      }
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error fetching candidate details:', error);
      this.errorMessage = 'Failed to load candidate details. Please try again.';
    }
  );
}

// getCandidatesDetails(userID: number): void {
//   this.isLoading = true;
//   console.log('Fetching candidate details for userID:', userID);
  
//   this.adminCompanyService.getCandidatesDetails(userID).subscribe(
//     (response: any) => {
//       console.log('Full API Response:', response);
//       console.log('Response type:', typeof response);
//       console.log('Is Array?', Array.isArray(response));
      
//       this.isLoading = false;
      
//       // Check if response is an array and get first item
//       if (Array.isArray(response) && response.length > 0) {
//         this.candidateDetails = response[0];
//         console.log('Candidate details (first item):', this.candidateDetails);
        
//         // Parse userDomain if it exists
//         if (this.candidateDetails.userDomain) {
//           try {
//             this.userDomains = JSON.parse(this.candidateDetails.userDomain);
//             console.log('Parsed user domains:', this.userDomains);
//             this.userDomains = this.removeDuplicateDomains(this.userDomains);
//           } catch (error) {
//             console.error('Error parsing userDomain:', error);
//             this.userDomains = [];
//           }
//         }
//       } else if (response && !Array.isArray(response)) {
//         // If response is an object directly
//         this.candidateDetails = response;
//         console.log('Candidate details (object):', this.candidateDetails);
        
//         if (response.userDomain) {
//           try {
//             this.userDomains = JSON.parse(response.userDomain);
//             this.userDomains = this.removeDuplicateDomains(this.userDomains);
//           } catch (error) {
//             console.error('Error parsing userDomain:', error);
//             this.userDomains = [];
//           }
//         }
//       } else {
//         console.error('Unexpected response format:', response);
//         this.errorMessage = 'Invalid data format received.';
//       }
      
//       // Log all available properties
//       if (this.candidateDetails) {
//         console.log('Available properties:', Object.keys(this.candidateDetails));
//       }
//     },
//     (error: any) => {
//       this.isLoading = false;
//       console.error('Error fetching candidate details:', error);
//       this.errorMessage = 'Failed to load candidate details. Please try again.';
//     }
//   );
// }

  // getCandidatesDetails(userID: number): void {
  //   this.isLoading = true;
  //   console.log('Fetching candidate details for userID:', userID);
    
  //   this.adminCompanyService.getCandidatesDetails(userID).subscribe(
  //     (response: any) => {
  //       console.log('Candidate details response:', response);
  //       this.isLoading = false;

  //       // Store candidate details
  //       this.candidateDetails = response;

  //       // Parse userDomain JSON string
  //       if (response.userDomain) {
  //         try {
  //           this.userDomains = JSON.parse(response.userDomain);
  //           console.log('Parsed user domains:', this.userDomains);
            
  //           // Remove duplicates based on companyID, domainID, experienceID, and studylevelID
  //           this.userDomains = this.removeDuplicateDomains(this.userDomains);
  //         } catch (error) {
  //           console.error('Error parsing userDomain:', error);
  //           this.userDomains = [];
  //         }
  //       }
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.error('Error fetching candidate details:', error);
  //       this.errorMessage = 'Failed to load candidate details. Please try again.';
  //     }
  //   );
  // }

    // removeDuplicateDomains(domains: any[]): any[] {
    // const uniqueMap = new Map();
    
    // domains.forEach(domain => {
    //   const key = `${domain.companyID}-${domain.domainID}-${domain.experienceID}-${domain.studylevelID}`;
    //   if (!uniqueMap.has(key)) {
    //     uniqueMap.set(key, domain);
    //   }
    // });
    
  //   return Array.from(uniqueMap.values());
  // }

  resume(): void {
    this.router.navigate(['/resume'], {
      state: { userID: this.userID }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/candidates'], {
      state: { userID: this.userID }
    });
  }

}
