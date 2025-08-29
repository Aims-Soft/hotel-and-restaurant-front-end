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

  getActivejobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}job-api/Dashboard/getActiveJob`);
  }

}