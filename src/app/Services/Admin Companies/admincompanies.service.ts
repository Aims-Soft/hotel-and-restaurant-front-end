import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class adminCompanyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getcompanyDetails(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/admin/getCompanyDetail`
    );
  }

   getcandidates(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/Admin/getApplicantInfo`
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

updatejobApplicationStatus(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/Job/saveJobApplicationStatus`, payload);
}


  getCompanyJobUser(jobID: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/admin/getCompanyJobUser?jobID=${jobID}`
    );
  }


getCandidatesDetails(userID: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}job-api/admin/getUserJobDetails?userID=${userID}`
    );
  }

  getUserInfo(userID: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}user-api/User/getUserInfo?userID=${userID}`
    );
  }
  // getUserDomain(userID: number): Observable<any> {
  //   return this.http.get<any>(
  //     `${this.apiUrl}job-api/admin/getUserJobDomain?userID=${userID}`
  //   );
  // }
}
