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
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString
      ? JSON.parse(currentUserString)
      : null;

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${currentUser.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          // Remove invalid token
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');

          // Redirect to sign-in page
          this.router.navigate(['/signIn']);
        }

        // Optional: check for token-expired message if status is 200 but body says expired
        if (err.error?.message?.toLowerCase().includes('token expired')) {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/signIn']);
        }

        return throwError(() => err);
      })
    );
  }
}
