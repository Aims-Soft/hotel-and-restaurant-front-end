import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getJobCategory`);
  }
  getJobType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getJobType`);
  }
  getWorkSpace(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getWorkspaceType`);
  }

    getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getExperience`);
  }

  

   getBenefits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getBenefit`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`);
  }

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/job/getskills`);
  }

 
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCity`);
  }

saveJob(payload: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post<any>(
    `${this.apiUrl}job-api/Job/saveJob`, 
    payload, 
    { headers }
  );
}
   
//  saveCompany(payload: any): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}job-api/company/saveCompanyUser`, payload);
// }
}