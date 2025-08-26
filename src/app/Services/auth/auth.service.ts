

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environmentts/environment';
import { UserSessionService } from '../userSession/userSession.Service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlauth = environment.apiUrlauth;

  constructor(private http: HttpClient,private userSessionService: UserSessionService ) {}






  login(loginData: any): Observable<any> {

    return this.http.post(`${this.apiUrlauth}auth-api/mobile-auth`, loginData);
  }


}

