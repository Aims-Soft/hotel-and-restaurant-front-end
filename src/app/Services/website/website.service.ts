

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


  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Website/getCompanies`);
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



   

}
