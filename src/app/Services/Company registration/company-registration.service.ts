// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environmentts/environment';
// import { UserSessionService } from '../userSession/userSession.Service';


// @Injectable({
//   providedIn: 'root',
// })
// export class CompanyRegistrationService  {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient,private userSessionService: UserSessionService ) {}


  

// // getIndustriesTypes(): Observable<any> {
// //     return this.http.get<any[]>(`${this.apiUrl}job-api/company/getIndustryType`);
// //   }

//   getIndustriesTypes(): Observable<any> {

  
    

//     return this.http.get<any[]>(`${this.apiUrl}job-api/company/getIndustryType`, { headers });
//   }

//   getEmployees(): Observable<any> {

  
    

//     return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyEmpolyee`, { headers });
//   }


// getCountries(): Observable<any> {


//   return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`, { headers });
// }

// getCompanyDomain(): Observable<any> {


//   return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCompanyDomain`, { headers });
// }

// getCitiesByCountry(): Observable<any> {
 

//   return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`, { headers });
// }
// getCities(): Observable<any[]> {
 
//   return this.http.get<any[]>(`${this.apiUrl}job-api/company/getCountry`, { headers });
// }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

   
 saveCompany(companyData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}job-api/company/saveCompanyUser`, companyData);
}
}
