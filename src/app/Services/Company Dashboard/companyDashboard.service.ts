// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { environment } from '../../../environmentts/environment';
// import { UserSessionService } from '../userSession/userSession.Service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CompanyDashboardService {
//   private apiUrl = environment.apiUrl;

//   constructor(
//     private http: HttpClient,
//     private userSessionService: UserSessionService
//   ) {}

//   // Helper method to get headers with token
//   private getAuthHeaders(): HttpHeaders {
//     const token = this.userSessionService.getToken();
    
//     if (!token) {
//       console.error('No authentication token found');
//       throw new Error('No authentication token found');
//     }

//     console.log('Using token for request:', token);

//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//   }

//   getTotalJobs(companyID: number): Observable<any> {
//     return this.http.get<any>(
//       `${this.apiUrl}job-api/Dashboard/getTotalJobCount?companyID=${companyID}`
//     );
//   }

//   getActivejobs(companyID: number): Observable<any[]> {
//     console.log(`Fetching active jobs for company ID: ${companyID}`);
//     return this.http.get<any[]>(
//       `${this.apiUrl}job-api/Dashboard/getActiveJob?companyID=${companyID}`
//     );
//   }

//   getJobApplications(companyID: number): Observable<any[]> {
//     console.log(`Fetching job application for company ID: ${companyID}`);
//     return this.http.get<any[]>(
//       `${this.apiUrl}job-api/Dashboard/getJobApplications?companyID=${companyID}`
//     );
//   }

//   // Validate PIN with proper token handling
//   validatePin(payload: any): Observable<any> {
//     try {
//       const headers = this.getAuthHeaders();
//       console.log('PIN validation payload:', payload);
      
//       return this.http.post<any>(
//         `${this.apiUrl}pin-api/pin`, 
//         payload, 
//         { headers }
//       );
//     } catch (error) {
//       console.error('Error getting auth headers:', error);
//       return throwError(() => error);
//     }
//   }

//   updateJobStatus(payload: any): Observable<any> {
//     return this.http.post<any>(
//       `${this.apiUrl}job-api/Job/saveJobStatus`,
//       payload
//     );
//   }

//   updatejobApplicationStatus(payload: any): Observable<any> {
//     return this.http.post<any>(
//       `${this.apiUrl}job-api/Job/saveJobApplicationStatus`,
//       payload
//     );
//   }

//   deleteapplication(payload: any): Observable<any> {
//     return this.http.post<any>(
//       `${this.apiUrl}job-api/Job/saveJobApplication`,
//       payload
//     );
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTotalJobs(companyID: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/Dashboard/getTotalJobCount?companyID=${companyID}`
    );
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/Job/getJobStatus`
    );
  }
  
   getComapnyJobs(companyID: number): Observable<any[]> {
    console.log(`Fetching active jobs for company ID: ${companyID}`);
    return this.http.get<any[]>(
      `${this.apiUrl}job-api/Dashboard/getCompanyActiveJob?companyID=${companyID}`
    );
  }

  getActivejobs(companyID: number): Observable<any[]> {
    console.log(`Fetching active jobs for company ID: ${companyID}`);
    return this.http.get<any[]>(
      `${this.apiUrl}job-api/Dashboard/getActiveJob?companyID=${companyID}`
    );
  }

  getJobApplications(companyID: number): Observable<any[]> {
    console.log(`Fetching job application for company ID: ${companyID}`);
    return this.http.get<any[]>(
      `${this.apiUrl}job-api/Dashboard/getJobApplications?companyID=${companyID}`
    );
  }

  // getJobApplications(): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `${this.apiUrl}job-api/Dashboard/getJobApplications`
  //   );
  // }

  // validatePin(payload: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}pin-api/pin`, payload);
  // }

  // validatePin(payload: any): Observable<any> {

  //   const token = localStorage.getItem('authToken');
  //   console.log(token,'token console')
  //   if (!token) {
  //     throw new Error('No authentication token found');
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post<any>(`${this.apiUrl}pin-api/pin`, payload, { headers });
  //}
  validatePin(payload: any): Observable<any> {
    let token = localStorage.getItem('authToken');
    token = token?.replace(/"/g, '').trim() || '';

    if (!token) {
      console.error('No token found, please log in again');
      return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}pin-api/pin`, payload, {
      headers,
    });
  }

  updateJobStatus(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}job-api/Job/saveJobStatus`,
      payload
    );
  }

  updatejobApplicationStatus(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}job-api/Job/saveJobApplicationStatus`,
      payload
    );
  }

  deleteapplication(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}job-api/Job/saveJobApplication`,
      payload
    );
  }
}
