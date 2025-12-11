// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environmentts/environment';
// import { UserSessionService } from '../userSession/userSession.Service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrlauth = environment.apiUrlauth;

//   constructor(
//     private http: HttpClient,
//     private userSessionService: UserSessionService
//   ) {}

//   // Regular login
//   login(loginData: any): Observable<any> {
//     return this.http.post(`${this.apiUrlauth}auth-api/mobile-auth`, loginData);
//   }

//   // Google Sign-In - Send token to backend
//   // loginWithGoogle(googleToken: string): Observable<any> {
//   //   return this.http.post(`${this.apiUrlauth}auth-api/google-auth`, {
//   //     token: googleToken
//   //   });
//   // }

// //   googleLoginFlow(googleData: any) {
// //   const email = googleData.email;
// //   const name = googleData.name;
// //   const roleID = 1; // set default role or based on your logic

// //   // Step 1: Check if user exists
// //   return this.http.post(`${this.apiUrlauth}auth-api/googleAuth`, {
// //     loginname: email,
// //     roleID: roleID
// //   });
// // }

// // Save new Google user
// // saveGoogleUser(googleData: any) {
// //   return this.http.post(`${this.apiUrlauth}auth-api/googleSaveUser`, {
// //     userID: 0,
// //     userRoleID: 0,
// //     userName: googleData.name,
// //     contact: "",
// //     email: googleData.email,
// //     roleID: 1,
// //     spType: "insert"
    
// //   });
// // }

// // }

// googleLoginFlow(googleData: any) {
//   const email = googleData.email;
//   const name = googleData.name;
//   const roleID = 1; // set default role or based on your logic

//   console.log('=== Google Login Flow Started ===');
//   console.log('Google Data Received:', googleData);
//   console.log('Extracted Email:', email);
//   console.log('Extracted Name:', name);
//   console.log('Role ID:', roleID);
//   console.log('API URL:', `${this.apiUrlauth}auth-api/googleAuth`);
//   console.log('Request Payload:', {
//     loginname: email,
//     roleID: roleID
//   });

//   // Step 1: Check if user exists
//   return this.http.post(`${this.apiUrlauth}auth-api/googleAuth`, {
//     loginname: email,
//     roleID: roleID
//   });
// }


// saveGoogleUser(googleData: any) {
//   console.log('=== Save Google User Function Called ===');
//   console.log('Google Data:', googleData);
//   console.log('API URL:', `${this.apiUrlauth}auth-api/googleSaveUser`);
  
//   const payload = {
//     userID: 0,
//     userRoleID: 0,
//     userName: googleData.name,
//     contact: "",
//     email: googleData.email,
//     roleID: 1,
//     spType: "insert"
//   };
  
//   console.log('Request Payload for user save:', payload);
  
//   return this.http.post(`${this.apiUrlauth}auth-api/googleSaveUser`, payload);
// }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environmentts/environment';
import { UserSessionService } from '../userSession/userSession.Service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlauth = environment.apiUrlauth;

  constructor(
    private http: HttpClient,
    private userSessionService: UserSessionService
  ) {}

  // Regular login
  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrlauth}auth-api/mobile-auth`, loginData);
  }

  // Check if Google user exists and login
 googleLoginFlow(googleData: any): Observable<any> {
  const email = googleData.email;
  const roleID = 1;

  console.log('=== Google Login Flow Started ===');
  console.log('Google Data:', googleData);
  console.log('Full API URL:', `${this.apiUrlauth}auth-api/googleAuth`);
  console.log('Request Payload:', {
    loginname: email,
    roleID: roleID
  });

  return this.http.post(`${this.apiUrlauth}auth-api/googleAuth`, {
    loginname: email,
    roleID: roleID
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).pipe(
    tap((response) => {
      console.log('✅ Google Auth SUCCESS Response:', response);
    }),
    catchError((error) => {
      console.error('❌ Google Auth ERROR:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.error?.message || error.message,
        error: error.error,
        headers: error.headers,
        requestPayload: {
          loginname: email,
          roleID: roleID
        }
      });
      return throwError(() => error);
    })
  );
}

// Save new Google user
saveGoogleUser(googleData: any): Observable<any> {
  console.log('=== Save Google User Function Called ===');
  console.log('Google Data:', googleData);
  
  const payload = {
    userID: 0,
    userRoleID: 0,
    userName: googleData.name || 'Google User',
    contact: googleData.phone || '', 
    email: googleData.email,
    roleID: 1,
    spType: 'insert'
  };
  
  console.log('Save User Payload:', JSON.stringify(payload, null, 2));
  console.log('Full API URL:', `${this.apiUrlauth}auth-api/googleSaveUser`);
  
  return this.http.post(`${this.apiUrlauth}auth-api/googleSaveUser`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).pipe(
    tap((response) => {
      console.log('✅ Save User SUCCESS Response:', response);
    }),
    catchError((error) => {
      console.error('❌ Save User ERROR:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.error?.message || error.message,
        error: error.error,
        headers: error.headers,
        requestPayload: payload
      });
      return throwError(() => error);
    })
  );
}

  completeGoogleSignIn(googleData: any): Observable<any> {
    console.log('🔄 === Complete Google Sign-In Process ===');
    console.log('📋 Starting with Google Data:', googleData);
    
    // Step 1: Save user (or ignore if already exists)
    return this.saveGoogleUser(googleData).pipe(
      // Step 2: After saving, attempt to login
      switchMap((saveResponse) => {
        console.log('✅ User save completed, now attempting login...');
        console.log('📋 Save Response:', saveResponse);
        
        // Delay slightly to ensure DB commit
        return new Observable(observer => {
          setTimeout(() => {
            this.googleLoginFlow(googleData).subscribe({
              next: (loginResponse) => {
                observer.next(loginResponse);
                observer.complete();
              },
              error: (loginError) => {
                observer.error(loginError);
              }
            });
          }, 500); // 500ms delay
        });
      }),
      catchError((saveError) => {
        console.log('⚠️ Save returned error, checking if user already exists...');
        
        // If user already exists (409 Conflict), try to login anyway
        if (saveError.status === 409 || 
            (saveError.error?.message?.toLowerCase() || '').includes('already exists') ||
            (saveError.error?.message?.toLowerCase() || '').includes('duplicate')) {
          
          console.log('🔄 User already exists, attempting login...');
          return this.googleLoginFlow(googleData);
        }
        
        // For other errors, rethrow
        return throwError(() => saveError);
      })
    );
  }
}