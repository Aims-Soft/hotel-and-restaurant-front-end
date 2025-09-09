import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTotalJobs(companyID: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/Dashboard/getTotalJobCount?companyID=${companyID}`
    );
  }

  getActivejobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Admin/getJobCountAdmin`);
  }

   getrecentjobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Dashboard/getActiveJob`);
  } 
  
  getcompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/admin/getCompanyDetailRequest`);
  }
  


  getJobApplications(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}job-api/Dashboard/getJobApplications`
    );
  }
  
 updateCompanyStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/admin/CompanyRequestStatus`, payload);
}

updatejobApplicationStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobApplicationStatus`, payload);
}
}
