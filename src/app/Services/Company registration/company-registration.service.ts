

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyRegistrationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getIndustriesTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getIndustryType`);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyEmpolyee`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`);
  }

  getCompanyDomain(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyDomain`);
  }

 
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCity`);
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


 getCompanyDetail(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/admin/getCompanyDetail`);
  }
   
//  saveCompany(payload: any): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}job-api/company/saveCompanyUser`, payload);
// }
}
