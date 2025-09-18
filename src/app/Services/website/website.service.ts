

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWebsiteCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Website/getExploreJob`);
  }


  getCompaniesdetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/admin/getCompanyDetail`);
  }


  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Website/getCompanies`);
  }


   getAdminJobs(companyID: number): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}job-api/Admin/AllJobs?companyID=${companyID}`
  );
}

    getAlljobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Admin/AllJobs`);
  }

 getjobapply(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}user-api/User/getUserInfo?userID=${userId}`);
}

saveCompany(payload: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post<any>(
    `${this.apiUrl}job-api/company/saveCompanyUser`, 
    payload, 
    { headers }
  );

  
}



   
applyjob(payload: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post<any>(
    `${this.apiUrl}job-api/Job/saveJobApplication`, 
    payload, 
    { headers }
  );

  
}

}
