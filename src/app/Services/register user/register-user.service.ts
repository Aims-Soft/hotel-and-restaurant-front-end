
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDegreeLevel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}user-api/User/getStudyLevel`);
  }

  getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Job/getExperience`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`);
  }

//   getCompanyDomain(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyDomain`);
//   }

 
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCity`);
  }

saveUser(payload: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post<any>(
    `${this.apiUrl}auth-api/saveUser`, 
    payload, 
    { headers }
  );
}
   
//  saveCompany(payload: any): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}job-api/company/saveCompanyUser`, payload);
// }
}
