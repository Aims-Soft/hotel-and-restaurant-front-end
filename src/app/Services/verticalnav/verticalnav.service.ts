import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class vertcalnavService {
  private apiUrlauth = environment.apiUrlauth;

  constructor(private http: HttpClient) {}

  // getTotalJobs(companyID: number): Observable<any> {
  //   return this.http.get<any>(
  //     `${this.apiUrl}job-api/Dashboard/getTotalJobCount?companyID=${companyID}`
  //   );
  // }

  //   getMenu(roleID: any): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:16001/Role/getMenu?roleID=${roleID}`);
  // }

  //   login(loginData: any): Observable<any> {

  //     return this.http.post(`${this.apiUrlauth}auth-api/mobile-auth`, loginData);
  //   }

  getMenu(roleID: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrlauth}user-api/Role/getMenu?roleID=${roleID}`
    );
  }
}
