
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

// saveUser(payload: any): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json'
//   });
  
//   return this.http.post<any>(
//     `${this.apiUrl}auth-api/saveUser`, 
//     payload, 
//     { headers }
//   );
// }

 saveUser(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // Use { responseType: 'text' } to handle plain text responses
    return this.http.post(
      `${this.apiUrl}auth-api/saveUser`, 
      payload, 
      { 
        headers: headers,
        responseType: 'text'  // This tells Angular to expect text, not JSON
      }
    );
  }

updateUser(payload: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post(
    `${this.apiUrl}auth-api/saveUser`, 
    payload, 
    { 
      headers,
      responseType: 'text' as 'json'  // This tells Angular to handle text as JSON
    }
  );
}


// updateUser(payload: any): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json'
//   });
  
//   // Use responseType: 'text' to handle text responses from backend
//   return this.http.post(
//     `${this.apiUrl}auth-api/saveUser`, 
//     payload, 
//     { 
//       headers,
//       responseType: 'text'  // This tells Angular to expect text, not JSON
//     }
//   ).pipe(
//     map((response: string) => {
//       console.log('Raw response from server:', response);
      
//       // Try to parse as JSON first, if it fails return as text
//       try {
//         return JSON.parse(response);
//       } catch (e) {
//         // If it's not JSON, return as text in a consistent format
//         return { message: response };
//       }
//     }),
//     catchError((error) => {
//       console.error('Service error:', error);
//       return throwError(() => error);
//     })
//   );
// }
   
//  saveCompany(payload: any): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}job-api/company/saveCompanyUser`, payload);
// }


}
