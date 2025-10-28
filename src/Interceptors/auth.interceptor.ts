import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    // Try to get token from authToken key (priority)
    let token = localStorage.getItem('authToken');
    
    // If not found, try getting from currentUser
    if (!token) {
      const currentUserString = localStorage.getItem('currentUser');
      const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
      token = currentUser?.token;
    }

    // Clean token - remove any quotes
    if (token) {
      token = token.replace(/"/g, '').trim();
      
      console.log('Interceptor - Adding token to request:', {
        url: request.url,
        tokenLength: token.length,
        tokenPreview: token.substring(0, 20) + '...'
      });

      // Clone request and add authorization header
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          // Use 'Bearer' instead of 'JWT' - most APIs expect Bearer
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      console.warn('Interceptor - No token found for request:', request.url);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Interceptor - HTTP Error:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          message: err.message
        });

        // Handle 401 (Unauthorized) or 403 (Forbidden)
        if (err.status === 401 || err.status === 403) {
          console.warn('Interceptor - Authentication failed, clearing session');
          
          // Clear all session data
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentMenus');

          // Show alert to user
          alert('Your session has expired. Please login again.');

          // Redirect to sign-in page
          this.router.navigate(['/signIn']);
        }

        // Handle token expiration in response body
        if (err.error?.message?.toLowerCase().includes('token expired')) {
          console.warn('Interceptor - Token expired message received');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentMenus');
          alert('Your session has expired. Please login again.');
          this.router.navigate(['/signIn']);
        }

        // Handle invalid token
        if (err.error?.message?.toLowerCase().includes('invalid token')) {
          console.warn('Interceptor - Invalid token message received');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentMenus');
          alert('Invalid session. Please login again.');
          this.router.navigate(['/signIn']);
        }

        return throwError(() => err);
      })
    );
  }
}



// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const currentUserString = localStorage.getItem('currentUser');
//     const currentUser = currentUserString
//       ? JSON.parse(currentUserString)
//       : null;

//     if (currentUser && currentUser.token) {
//       request = request.clone({
//         setHeaders: {
//           'Content-Type': 'application/json',
//           Authorization: `JWT ${currentUser.token}`,
//         },
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => {
//         if (err.status === 401 || err.status === 403) {
//           // Remove invalid token
//           localStorage.removeItem('currentUser');
//           localStorage.removeItem('authToken');

//           // Redirect to sign-in page
//           this.router.navigate(['/signIn']);
//         }

//         // Optional: check for token-expired message if status is 200 but body says expired
//         if (err.error?.message?.toLowerCase().includes('token expired')) {
//           localStorage.removeItem('currentUser');
//           this.router.navigate(['/signIn']);
//         }

//         return throwError(() => err);
//       })
//     );
//   }
// }
