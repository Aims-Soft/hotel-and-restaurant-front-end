// import { Component ,OnInit} from '@angular/core';
// import { Router } from '@angular/router';
// import { adminCompanyService } from '../../../Services/Admin Companies/admincompanies.service';

// @Component({
//   selector: 'app-resume',
//   templateUrl:'./resume.component.html',
//   styleUrl: './resume.component.css'
// })
// export class ResumeComponent implements OnInit {

// isLoading: boolean = false;
//   userID: number | null = null;
//   resumeData: any = null;
//   errorMessage: string | null = null;
  
//   ngOnInit(): void {
//     // Check if userID exists
//     if (!this.userID) {
//       console.error('No userID received in resume component');
//       this.errorMessage = 'No user selected. Redirecting...';
//       setTimeout(() => {
//         this.router.navigate(['/candidates']);
//       }, 2000);
//       return;
//     }

//     // Fetch resume data
//     this.getResumeData(this.userID);
//   }

//   constructor( 
//     private router:Router,
//     private adminservice: adminCompanyService,  ){

//           const navigation = this.router.getCurrentNavigation();
//     this.userID = navigation?.extras.state?.['userID'];
//     console.log('Received userID in resume component:', this.userID);
//     }


//      getResumeData(userID: number): void {
//     this.isLoading = true;
//     console.log('Fetching resume for userID:', userID);

//     // Replace with your actual service method
//     this.adminservice.getCandidatesDetails(userID).subscribe(
//       (response: any) => {
//         this.isLoading = false;
//         console.log('Resume data received:', response);
        
//         if (Array.isArray(response) && response.length > 0) {
//           this.resumeData = response[0];
//         } else {
//           this.resumeData = response;
//         }
        
//         console.log('Resume data:', this.resumeData);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching resume:', error);
//         this.errorMessage = 'Failed to load resume. Please try again.';
//       }
//     );
//   }

//   goBack(): void {
//     this.router.navigate(['/candidate-profile'], {
//       state: { userID: this.userID }
//     });
//   }



// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { adminCompanyService } from '../../../Services/Admin Companies/admincompanies.service';

// @Component({
//   selector: 'app-resume',
//   templateUrl: './resume.component.html',
//   styleUrl: './resume.component.css'
// })
// export class ResumeComponent implements OnInit {
//   isLoading: boolean = false;
//   userID: number | null = null;
//   resumeData: any = null;
//   errorMessage: string | null = null;
//   educationList: any[] = [];
//   skillsList: any[] = [];

//   constructor(
//     private router: Router,
//     private adminservice: adminCompanyService
//   ) {
//     // Get userID from navigation state
//     const navigation = this.router.getCurrentNavigation();
//     this.userID = navigation?.extras.state?.['userID'];
//     console.log('Received userID in resume:', this.userID);
//   }

//   ngOnInit(): void {
//     if (!this.userID) {
//       console.error('No userID received');
//       this.errorMessage = 'No user selected. Redirecting...';
//       setTimeout(() => {
//         this.router.navigate(['/candidates']);
//       }, 2000);
//       return;
//     }

//     this.getResumeData(this.userID);
//   }

//   getResumeData(userID: number): void {
//     this.isLoading = true;
//     console.log('Fetching resume for userID:', userID);

//     this.adminservice.getUserInfo(userID).subscribe(
//       (response: any) => {
//         this.isLoading = false;
//         console.log('Resume data response:', response);
        
//         // Handle array or object response
//         if (Array.isArray(response) && response.length > 0) {
//           this.resumeData = response[0];
//         } else {
//           this.resumeData = response;
//         }

//         // // Parse education if exists
//         // if (this.resumeData.education) {
//         //   try {
//         //     this.educationList = JSON.parse(this.resumeData.education);
//         //   } catch (error) {
//         //     console.error('Error parsing education:', error);
//         //     this.educationList = [];
//         //   }
//         // }

//         // Parse skills/domains if exists
//         if (this.resumeData.userDomain) {
//           try {
//             const domains = JSON.parse(this.resumeData.userDomain);
//             this.skillsList = domains.map((d: any) => d.domainTitle || d);
//           } catch (error) {
//             console.error('Error parsing domains:', error);
//             this.skillsList = [];
//           }
//         }

//         console.log('Parsed resume data:', this.resumeData);
//         console.log('Education list:', this.educationList);
//         console.log('Skills list:', this.skillsList);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching resume:', error);
//         this.errorMessage = 'Failed to load resume. Please try again.';
//       }
//     );
//   }

//   goBack(): void {
//     this.router.navigate(['/candidate-profile'], {
//       state: { userID: this.userID }
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { adminCompanyService } from '../../../Services/Admin Companies/admincompanies.service';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// @Component({
//   selector: 'app-resume',
//   templateUrl: './resume.component.html',
//   styleUrl: './resume.component.css'
// })
// export class ResumeComponent implements OnInit {
//   isLoading: boolean = false;
//   userID: number | null = null;
//   resumeData: any = null;
//   errorMessage: string | null = null;
//   educationList: any[] = [];
//   skillsList: any[] = [];

   
//   isDownloading: boolean = false;

//   constructor(
//     private router: Router,
//     private adminservice: adminCompanyService
//   ) {
//     // Get userID from navigation state
//     const navigation = this.router.getCurrentNavigation();
//     this.userID = navigation?.extras.state?.['userID'];
//     console.log('Received userID in resume:', this.userID);
//   }

//   ngOnInit(): void {
//     if (!this.userID) {
//       console.error('No userID received');
//       this.errorMessage = 'No user selected. Redirecting...';
//       setTimeout(() => {
//         this.router.navigate(['/candidates']);
//       }, 2000);
//       return;
//     }

//     this.getResumeData(this.userID);
//   }

//   getResumeData(userID: number): void {
//     this.isLoading = true;
//     console.log('Fetching resume for userID:', userID);

//     this.adminservice.getUserInfo(userID).subscribe(
//       (response: any) => {
//         this.isLoading = false;
//         console.log('Resume data response:', response);
        
//         // Handle array or object response
//         if (Array.isArray(response) && response.length > 0) {
//           this.resumeData = response[0];
//         } else {
//           this.resumeData = response;
//         }

//         // Parse skills/domains from json field
//         if (this.resumeData.json) {
//           try {
//             const domains = JSON.parse(this.resumeData.json);
//             this.skillsList = domains.map((d: any) => d.domainTitle || d);
//           } catch (error) {
//             console.error('Error parsing domains:', error);
//             this.skillsList = [];
//           }
//         }

//         // Set education from studyLevelTitle
//         if (this.resumeData.studyLevelTitle) {
//           this.educationList = [{
//             degree: this.resumeData.studyLevelTitle,
//             institution: 'Not specified',
//             year: 'Not specified'
//           }];
//         }

//         console.log('Parsed resume data:', this.resumeData);
//         console.log('Education list:', this.educationList);
//         console.log('Skills list:', this.skillsList);
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching resume:', error);
//         this.errorMessage = 'Failed to load resume. Please try again.';
//       }
//     );
//   }

  

//   goBack(): void {
//     this.router.navigate(['/candidate-profile'], {
//       state: { userID: this.userID }
//     });
//   }

//     downloadAsPDF(): void {
//     this.isDownloading = true;
    
//     const resumeElement = document.getElementById('resume-content');
    
//     if (!resumeElement) {
//       console.error('Resume content not found');
//       this.isDownloading = false;
//       return;
//     }

//     // Store original styles
//     const originalStyles = {
//       width: resumeElement.style.width,
//       height: resumeElement.style.height
//     };

//     // Set fixed dimensions for PDF
//     resumeElement.style.width = '794px'; // A4 width in pixels
//     resumeElement.style.height = 'auto';

//     const options = {
//       scale: 2,
//       useCORS: true,
//       allowTaint: true,
//       logging: false,
//       width: 794, // A4 width
//       windowWidth: 794
//     };

//     html2canvas(resumeElement, options).then((canvas) => {
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       const contentDataURL = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
      
//       pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      
//       // Generate filename
//       const fileName = `${this.resumeData.userName || 'resume'}_${new Date().getTime()}.pdf`;
      
//       pdf.save(fileName);
      
//       // Restore original styles
//       resumeElement.style.width = originalStyles.width;
//       resumeElement.style.height = originalStyles.height;
      
//       this.isDownloading = false;
//     }).catch((error) => {
//       console.error('Error generating PDF:', error);
//       this.isDownloading = false;
      
//       // Restore original styles even on error
//       resumeElement.style.width = originalStyles.width;
//       resumeElement.style.height = originalStyles.height;
//     });
//   }

//   // Download original resume file
//   downloadOriginalResume(): void {
//     if (this.resumeData.eResume) {
//       window.open(this.resumeData.eResume, '_blank');
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminCompanyService } from '../../../Services/Admin Companies/admincompanies.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  isLoading: boolean = false;
  userID: number | null = null;
  resumeData: any = null;
  errorMessage: string | null = null;
  educationList: any[] = [];
  skillsList: any[] = [];
  isDownloadingPDF: boolean = false;

  constructor(
    private router: Router,
    private adminservice: adminCompanyService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.userID = navigation?.extras.state?.['userID'];
    console.log('Received userID in resume:', this.userID);
  }

  ngOnInit(): void {
    if (!this.userID) {
      console.error('No userID received');
      this.errorMessage = 'No user selected. Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/candidates']);
      }, 2000);
      return;
    }

    this.getResumeData(this.userID);
  }

  getResumeData(userID: number): void {
    this.isLoading = true;
    console.log('Fetching resume for userID:', userID);

    this.adminservice.getUserInfo(userID).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Resume data response:', response);
        
        if (Array.isArray(response) && response.length > 0) {
          this.resumeData = response[0];
        } else {
          this.resumeData = response;
        }

        // Parse skills/domains from json field
        if (this.resumeData.json) {
          try {
            const domains = JSON.parse(this.resumeData.json);
            this.skillsList = [...new Set(domains.map((d: any) => d.domainTitle || d))];
          } catch (error) {
            console.error('Error parsing domains:', error);
            this.skillsList = [];
          }
        }

        // Set education from studyLevelTitle
        if (this.resumeData.studyLevelTitle) {
          this.educationList = [{
            degree: this.resumeData.studyLevelTitle
          }];
        }

        console.log('Parsed resume data:', this.resumeData);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching resume:', error);
        this.errorMessage = 'Failed to load resume. Please try again.';
      }
    );
  }

  // downloadPDF(): void {
  //   this.isDownloadingPDF = true;
  //   const element = document.getElementById('resume-content');
    
  //   if (!element) {
  //     console.error('Resume content element not found');
  //     this.isDownloadingPDF = false;
  //     return;
  //   }

  //   html2canvas(element, {
  //     scale: 2,
  //     useCORS: true,
  //     logging: false,
  //     backgroundColor: '#ffffff'
  //   }).then(canvas => {
  //     const imgWidth = 210; // A4 width in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgData = canvas.toDataURL('image/png');
      
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= 297; // A4 height

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= 297;
  //     }

  //     pdf.save(`${this.resumeData.userName}_Resume.pdf`);
  //     this.isDownloadingPDF = false;
  //   }).catch(error => {
  //     console.error('Error generating PDF:', error);
  //     alert('Failed to generate PDF. Please try again.');
  //     this.isDownloadingPDF = false;
  //   });
  // }

  // downloadOriginalResume(): void {
  //   if (!this.resumeData.eResume) {
  //     alert('Resume file not available');
  //     return;
  //   }
  //   window.open(this.resumeData.eResume, '_blank');
  // }

  
   downloadPDF(): void {
    this.isDownloadingPDF = true;
    const element = document.getElementById('resume-content');
    
    if (!element) {
      console.error('Resume content element not found');
      this.isDownloadingPDF = false;
      return;
    }

    // Convert external image to base64 first
    this.convertImageToBase64(this.resumeData.eDoc).then(base64Image => {
      // Temporarily replace image src with base64
      const imgElement = element.querySelector('img') as HTMLImageElement;
      const originalSrc = imgElement?.src;
      
      if (imgElement && base64Image) {
        imgElement.src = base64Image;
      }

      // Small delay to ensure image is rendered
      setTimeout(() => {
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(canvas => {
          // Restore original image src
          if (imgElement && originalSrc) {
            imgElement.src = originalSrc;
          }

          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgData = canvas.toDataURL('image/png');
          
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= 297; // A4 height

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= 297;
          }

          pdf.save(`${this.resumeData.userName}_Resume.pdf`);
          this.isDownloadingPDF = false;
        }).catch(error => {
          console.error('Error generating PDF:', error);
          alert('Failed to generate PDF. Please try again.');
          this.isDownloadingPDF = false;
          
          // Restore original image src on error
          if (imgElement && originalSrc) {
            imgElement.src = originalSrc;
          }
        });
      }, 100);
    }).catch(error => {
      console.error('Error converting image:', error);
      // Continue without image
      this.generatePDFWithoutImageConversion(element);
    });
  }

  private convertImageToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!imageUrl || imageUrl.includes('employe.svg')) {
        reject('No valid image URL');
        return;
      }

      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        
        try {
          const base64 = canvas.toDataURL('image/png');
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject('Failed to load image');
      img.src = imageUrl;
    });
  }

  private generatePDFWithoutImageConversion(element: HTMLElement): void {
    html2canvas(element, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save(`${this.resumeData.userName}_Resume.pdf`);
      this.isDownloadingPDF = false;
    }).catch(error => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      this.isDownloadingPDF = false;
    });
  }

  downloadOriginalResume(): void {
    if (!this.resumeData.eResume) {
      alert('Resume file not available');
      return;
    }
    window.open(this.resumeData.eResume, '_blank');
  }
  goBack(): void {
    this.router.navigate(['/candidateprofile'], {
      state: { userID: this.userID }
    });
  }
}
