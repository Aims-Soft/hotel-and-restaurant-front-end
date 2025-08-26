
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { AuthService } from '../Services/auth/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'] 
})
export class SignInComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showSuccess = false;
  showError = false;

  constructor(
    private userService: AuthService,
    private sessionService: UserSessionService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[A-Z]).*')
      ]],
    }, {});
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 onSubmit() {
  // debugger
  if (this.loginForm.invalid) {
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.successMessage = '';
  this.showError = false;
  this.showSuccess = false;

  const authData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password,
    roleID: 3
    
  };

  console.log(authData,'new')

  this.userService.login(authData).subscribe({
    next: (response: any) => {
      this.isLoading = false;
      console.log(response ,'signin');

      if (response.token) {
        this.sessionService.saveUserSession(response);
        console.log(response,'login')
        this.successMessage = 'Login successful! Redirecting...';
        this.showSuccess = true;

       this.router.navigate(['/companyDashboard']);


      } else {
        this.errorMessage = response.message || 'Login failed. Please try again.';
        this.showError = true;
      }
    },
    error: (error: any) => {
      this.isLoading = false;
      this.errorMessage = error.error?.message || error.message || 'Login failed. Please try again.';
      this.showError = true;
    }
  });
}
}



// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { AuthService } from '../Services/auth/auth.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'] 
// })
// export class SignInComponent {

//   isLoading = false;
//   errorMessage = '';
//   successMessage = '';
//   showSuccess = false;
//   showError = false;


//   loginData = {
//     email: '',
//     password: '',
//   };

//     constructor(
//     private Authservice: AuthService,
   

//     private http: HttpClient,
//     private router: Router
//   ) {
   
   
//   }

//   onLogin() {
//     // Your login logic here
//     console.log('Login data:', this.loginData);

    
//     this.Authservice.login()
//       .subscribe({
//         next: (response: any) => {
//           this.isLoading = false;
//           console.log(response);
          
       

//         error: (error: any) => {
//           this.isLoading = false;
//           this.errorMessage = error.error?.message || error.message || 'Login failed. Please try again.';
//           this.showError = true;
//         }

    
  
//   }
// }

// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { AuthService, LoginPayload } from '../Services/auth/auth.service'; // Add import
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'] 
// })
// export class SignInComponent {

//   isLoading = false;
//   errorMessage = '';
//   successMessage = '';
//   showSuccess = false;
//   showError = false;

//   loginData: LoginPayload = {
//     email: '',
//     password: '',
//     roleID: 0
//   };

//   constructor(
//     private authService: AuthService, 
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   onLogin() {
//     console.log('Login data:', this.loginData);
//     this.isLoading = true;
//     this.errorMessage = '';
//     this.showError = false;

//     this.authService.login(this.loginData)
//       .subscribe({
//         next: (response: any) => {
//           this.isLoading = false;
//           console.log(response);
//           this.successMessage = 'Login successful!';
//           this.showSuccess = true;
          
//           // Navigate to dashboard or home page
//           this.router.navigate(['/companyDashboard']);
//         },
//         error: (error: any) => {
//           this.isLoading = false;
//           this.errorMessage = error.error?.message || error.message || 'Login failed. Please try again.';
//           this.showError = true;
//         }
//       });
//   }
// }