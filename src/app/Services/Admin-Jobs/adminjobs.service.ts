import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class adminJobsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getadminjobs(): Observable<any> {
  //   return this.http.get<any>(
  //     `${this.apiUrl}job-api/Admin/AllJobs`
  //   );
  // }

 getAdminJobs(companyID: number = 0): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}job-api/Admin/AllJobs?companyID=${companyID}`
  );
}

  getActivejobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Dashboard/getActiveJob`);
  }

  getJobApplications(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}job-api/Dashboard/getJobApplications`
    );
  }
  
 updateJobStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobStatus`, payload);
}

deleteJob(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJob`, payload);
}

updatejobApplicationStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobApplicationStatus`, payload);
}


}
