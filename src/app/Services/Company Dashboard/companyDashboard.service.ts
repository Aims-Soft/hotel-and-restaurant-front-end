import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

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


validatePin(payload: any): Observable<any> {
  
  const token = localStorage.getItem('authToken'); 
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${this.apiUrl}pin-api/pin`, payload, { headers });
}
  
 updateJobStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobStatus`, payload);
}


updatejobApplicationStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobApplicationStatus`, payload);
}


deleteapplication(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobApplication`, payload);
}

}
