

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

    getCompanyTypeDomain(): Observable<any> {
    return this.http.get(`${this.apiUrl}job-api/Admin/getCompanyTypeDomain`);
  }

    saveIndustry(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}job-api/Admin/saveCompanyType`, data);
  }

    saveDomain(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}job-api/Admin/saveDomain`, data);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyEmpolyee`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`);
  }

  getCompanyDomain(companyTypeID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyDomain?companyTypeID=${companyTypeID}`);
  }

  

getUserDomain(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}user-api/User/getUserDomain`);
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
