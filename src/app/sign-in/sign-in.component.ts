// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { AuthService } from '../Services/auth/auth.service';
// import { vertcalnavService } from '../Services/verticalnav/verticalnav.service';
// import { AuthSharedService } from '../Services/auth-shared/authShared.service';

// declare const google: any;

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'],
// })
// export class SignInComponent implements OnInit, AfterViewInit {
//   @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;

//   showPassword: boolean = false;
//   loginForm: FormGroup;
//   isLoading = false;
//   errorMessage = '';
//   successMessage = '';
//   showSuccess = false;
//   showError = false;
//   menu: any[] = [];
//   routeTile: any[] = [];
//   menuTitle: any[] = [];

//   constructor(
//     private userService: AuthService,
//     private vertcalnavservice: vertcalnavService,
//     private sessionService: UserSessionService,
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private authSharedService: AuthSharedService,
//     private ngZone: NgZone
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
//   }

//   ngOnInit(): void {
//     // Load Google Sign-In SDK
//     this.loadGoogleSignInScript();
//   }

//   ngAfterViewInit(): void {
//     // Wait for script to load before rendering button
//     this.waitForGoogleSDK();
//   }

//   // Load Google Sign-In Script Dynamically
//   loadGoogleSignInScript(): void {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       console.log('Google Sign-In SDK loaded successfully');
//     };
//     script.onerror = () => {
//       console.error('Failed to load Google Sign-In SDK');
//       this.errorMessage = 'Failed to load Google Sign-In. Please refresh the page.';
//       this.showError = true;
//     };
//     document.head.appendChild(script);
//   }

//   // Wait for Google SDK to be available
//   waitForGoogleSDK(): void {
//     const checkGoogle = setInterval(() => {
//       if (typeof google !== 'undefined' && google.accounts) {
//         clearInterval(checkGoogle);
//         this.ngZone.run(() => {
//           this.initializeGoogleSignIn();
//         });
//       }
//     }, 100);

//     // Timeout after 10 seconds
//     setTimeout(() => {
//       clearInterval(checkGoogle);
//       if (typeof google === 'undefined') {
//         console.error('Google SDK failed to load within timeout');
//       }
//     }, 10000);
//   }

//   // Initialize Google Sign-In
//   initializeGoogleSignIn(): void {
//     try {
//       google.accounts.id.initialize({
//         client_id: '955844459904-6qfsnjmap4npdt35h07t3j5bpdefvamf.apps.googleusercontent.com',
//         callback: this.handleGoogleSignIn.bind(this),
//         auto_select: false,
//         cancel_on_tap_outside: true
//       });

//       // Render the button
//       if (this.googleButton && this.googleButton.nativeElement) {
//         google.accounts.id.renderButton(
//           this.googleButton.nativeElement,
//           {
//             theme: 'outline',
//             size: 'large',
//             width: this.googleButton.nativeElement.offsetWidth,
//             text: 'signin_with',
//             shape: 'rectangular',
//             logo_alignment: 'left'
//           }
//         );
//         console.log('Google button rendered successfully');
//       }
//     } catch (error) {
//       console.error('Error initializing Google Sign-In:', error);
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   getMenu(roleID: any): void {
//     this.isLoading = true;
//     this.vertcalnavservice.getMenu(roleID).subscribe(
//       (response: any[]) => {
//         console.log('getmenu:', response);
//         this.isLoading = false;
//         this.menu = response;
//         this.sessionService.saveMenuSession(response);
//         this.authSharedService.triggerMenu();
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching menu:', error);
//       }
//     );
//   }

//   // Handle Google Sign-In callback
//   // handleGoogleSignIn(response: any): void {
//   //   console.log('Google Sign-In response:', response);
    
//   //   this.ngZone.run(() => {
//   //     this.isLoading = true;
//   //     this.errorMessage = '';
//   //     this.showError = false;

//   //     // Send Google token to your backend
//   //     this.userService.loginWithGoogle(response.credential).subscribe({
//   //       next: (backendResponse: any) => {
//   //         this.handleLoginSuccess(backendResponse);
//   //       },
//   //       error: (error: any) => {
//   //         this.isLoading = false;
//   //         this.errorMessage = error.error?.message || 'Google sign-in failed. Please try again.';
//   //         this.showError = true;
//   //         console.error('Google login error:', error);
//   //       }
//   //     });
//   //   });
//   // }


//   decodeGoogleToken(token: string) {
//   const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//   return JSON.parse(atob(base64));
// }

//   // Handle successful login (both regular and Google)

  
//   handleLoginSuccess(response: any): void {
//     this.isLoading = false;
//     console.log(response, 'signin');

//     if (response.token) {
//       this.sessionService.saveUserSession(response);
//       this.successMessage = 'Login successful! Redirecting...';
//       this.showSuccess = true;

//       const roleId = this.sessionService.getRoleId();
//       this.getMenu(roleId);

//       setTimeout(() => {
//         if (response.roleId === 2) {
//           this.router.navigate(['/companyDashboard']);
//         } else if (response.roleId === 3) {
//           this.router.navigate(['/adminDashboard']);
//         } else {
//           this.router.navigate(['/']);
//         }
//       }, 1000);
//     } else {
//       this.errorMessage = response.message || 'Login failed. Please try again.';
//       this.showError = true;
//     }
//   }


//   handleGoogleSignIn(response: any): void {
//   const decoded = this.decodeGoogleToken(response.credential);

//   const googleUser = {
//     email: decoded.email,
//     name: decoded.name,
//     picture: decoded.picture
//   };

//   console.log("Google User:", googleUser);

//   this.isLoading = true;

//   // Step 1: Check if user exists in DB
//   this.userService.googleLoginFlow(googleUser).subscribe({
//     next: (existingUser: any) => {

//       if (existingUser && existingUser.token) {
//         // User exists → login
//         this.handleLoginSuccess(existingUser);
//         return;
//       }

//       // Step 2: User does not exist → Save user
//       this.userService.saveGoogleUser(googleUser).subscribe({
//         next: (savedUser: any) => {
//           // Now login again after saving
//           this.userService.googleLoginFlow(googleUser).subscribe({
//             next: (loginUser: any) => this.handleLoginSuccess(loginUser),
//             error: (err2) => this.showGoogleError(err2)
//           });
//         },
//         error: (err1) => this.showGoogleError(err1)
//       });

//     },
//     error: (err) => {
//       console.log(err);
//       this.showGoogleError(err);
//     }
//   });
// }


// showGoogleError(err: any) {
//   this.isLoading = false;
//   this.errorMessage = 'Google sign-in failed. Please try again.';
//   this.showError = true;
//   console.error(err);
// }


//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = '';
//     this.successMessage = '';
//     this.showError = false;
//     this.showSuccess = false;

//     const authData = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password,
//     };

//     console.log(authData, 'new');

//     this.userService.login(authData).subscribe({
//       next: (response: any) => {
//         this.handleLoginSuccess(response);
//       },
//       error: (error: any) => {
//         this.isLoading = false;
//         this.errorMessage =
//           error.error?.message ||
//           error.message ||
//           'Login failed. Please try again.';
//         this.showError = true;
//       },
//     });
//   }
// }

// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { AuthService } from '../Services/auth/auth.service';
// import { vertcalnavService } from '../Services/verticalnav/verticalnav.service';
// import { AuthSharedService } from '../Services/auth-shared/authShared.service';

// declare const google: any;

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'],
// })
// export class SignInComponent implements OnInit, AfterViewInit {
//   @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;

//   showPassword: boolean = false;
//   loginForm: FormGroup;
//   isLoading = false;
//   errorMessage = '';
//   successMessage = '';
//   showSuccess = false;
//   showError = false;
//   menu: any[] = [];

//   constructor(
//     private userService: AuthService,
//     private vertcalnavservice: vertcalnavService,
//     private sessionService: UserSessionService,
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private authSharedService: AuthSharedService,
//     private ngZone: NgZone
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadGoogleSignInScript();
//   }

//   ngAfterViewInit(): void {
//     this.waitForGoogleSDK();
//   }

//   loadGoogleSignInScript(): void {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       console.log('Google Sign-In SDK loaded successfully');
//     };
//     script.onerror = () => {
//       console.error('Failed to load Google Sign-In SDK');
//       this.errorMessage = 'Failed to load Google Sign-In. Please refresh the page.';
//       this.showError = true;
//     };
//     document.head.appendChild(script);
//   }

//   waitForGoogleSDK(): void {
//     const checkGoogle = setInterval(() => {
//       if (typeof google !== 'undefined' && google.accounts) {
//         clearInterval(checkGoogle);
//         this.ngZone.run(() => {
//           this.initializeGoogleSignIn();
//         });
//       }
//     }, 100);

//     setTimeout(() => {
//       clearInterval(checkGoogle);
//       if (typeof google === 'undefined') {
//         console.error('Google SDK failed to load within timeout');
//       }
//     }, 10000);
//   }

//   initializeGoogleSignIn(): void {
//     try {
//       google.accounts.id.initialize({
//         client_id: '955844459904-6qfsnjmap4npdt35h07t3j5bpdefvamf.apps.googleusercontent.com',
//         callback: this.handleGoogleSignIn.bind(this),
//         auto_select: false,
//         cancel_on_tap_outside: true
//       });

//       if (this.googleButton && this.googleButton.nativeElement) {
//         google.accounts.id.renderButton(
//           this.googleButton.nativeElement,
//           {
//             theme: 'outline',
//             size: 'large',
//             width: this.googleButton.nativeElement.offsetWidth,
//             text: 'signin_with',
//             shape: 'rectangular',
//             logo_alignment: 'left'
//           }
//         );
//         console.log('Google button rendered successfully');
//       }
//     } catch (error) {
//       console.error('Error initializing Google Sign-In:', error);
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   getMenu(roleID: any): void {
//     this.isLoading = true;
//     this.vertcalnavservice.getMenu(roleID).subscribe(
//       (response: any[]) => {
//         console.log('getmenu:', response);
//         this.isLoading = false;
//         this.menu = response;
//         this.sessionService.saveMenuSession(response);
//         this.authSharedService.triggerMenu();
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('Error fetching menu:', error);
//       }
//     );
//   }

//   decodeGoogleToken(token: string) {
//     try {
//       const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//       return JSON.parse(atob(base64));
//     } catch (error) {
//       console.error('Error decoding Google token:', error);
//       return null;
//     }
//   }

//   handleLoginSuccess(response: any): void {
//     this.isLoading = false;
//     console.log('Login Success Response:', response);

//     if (response && response.token) {
//       this.sessionService.saveUserSession(response);
//       this.successMessage = 'Login successful! Redirecting...';
//       this.showSuccess = true;
//       this.showError = false;

//       const roleId = this.sessionService.getRoleId();
//       this.getMenu(roleId);

//       setTimeout(() => {
//         if (response.roleId === 2) {
//           this.router.navigate(['/companyDashboard']);
//         } else if (response.roleId === 3) {
//           this.router.navigate(['/adminDashboard']);
//         } else {
//           this.router.navigate(['/']);
//         }
//       }, 1000);
//     } else {
//       this.errorMessage = response?.message || 'Login failed. Please try again.';
//       this.showError = true;
//       this.showSuccess = false;
//     }
//   }

//   handleGoogleSignIn(response: any): void {
//     console.log('=== Google Sign-In Callback Triggered ===');
//     console.log('Raw Google Response:', response);

//     const decoded = this.decodeGoogleToken(response.credential);
    
//     if (!decoded) {
//       this.showGoogleError({ message: 'Failed to decode Google token' });
//       return;
//     }

//     console.log('Decoded Token:', decoded);

//     const googleUser = {
//       email: decoded.email,
//       name: decoded.name,
//       picture: decoded.picture,
//       phone: '' // Google doesn't provide phone by default
//     };

//     console.log('Formatted Google User:', googleUser);

//     this.ngZone.run(() => {
//       this.isLoading = true;
//       this.errorMessage = '';
//       this.showError = false;

//       // Step 1: Try to login with existing user
//       this.userService.googleLoginFlow(googleUser).subscribe({
//         next: (loginResponse: any) => {
//           console.log('Google Login Response:', loginResponse);

//           // Check if user exists and has token
//           if (loginResponse && loginResponse.token) {
//             console.log('User exists - Login successful');
//             this.handleLoginSuccess(loginResponse);
//           } else {
//             console.log('User does not exist - Creating new user');
//             // Step 2: User doesn't exist, create new user
//             this.createAndLoginGoogleUser(googleUser);
//           }
//         },
//         error: (loginError) => {
//           console.error('Login Flow Error:', loginError);
          
//           // If 404 or user not found, create new user
//           if (loginError.status === 404 || 
//               loginError.error?.message?.toLowerCase().includes('not found') ||
//               loginError.error?.message?.toLowerCase().includes('does not exist')) {
//             console.log('User not found - Creating new user');
//             this.createAndLoginGoogleUser(googleUser);
//           } else {
//             this.showGoogleError(loginError);
//           }
//         }
//       });
//     });
//   }

//   createAndLoginGoogleUser(googleUser: any): void {
//     console.log('=== Creating New Google User ===');
    
//     this.userService.saveGoogleUser(googleUser).subscribe({
//       next: (saveResponse: any) => {
//         console.log('User Created Successfully:', saveResponse);
        
//         // Step 3: Login after creating user
//         setTimeout(() => {
//           this.userService.googleLoginFlow(googleUser).subscribe({
//             next: (loginResponse: any) => {
//               console.log('Login After Creation:', loginResponse);
//               this.handleLoginSuccess(loginResponse);
//             },
//             error: (loginError) => {
//               console.error('Login after creation failed:', loginError);
//               this.showGoogleError(loginError);
//             }
//           });
//         }, 500); // Small delay to ensure DB commit
//       },
//       error: (saveError) => {
//         console.error('User Creation Failed:', saveError);
        
//         // Check if user already exists error
//         if (saveError.status === 409 || 
//             saveError.error?.message?.toLowerCase().includes('already exists')) {
//           console.log('User already exists, trying login again');
//           // Try login one more time
//           setTimeout(() => {
//             this.userService.googleLoginFlow(googleUser).subscribe({
//               next: (response) => this.handleLoginSuccess(response),
//               error: (err) => this.showGoogleError(err)
//             });
//           }, 500);
//         } else {
//           this.showGoogleError(saveError);
//         }
//       }
//     });
//   }

//   showGoogleError(err: any): void {
//     this.isLoading = false;
    
//     let errorMsg = 'Google sign-in failed. Please try again.';
    
//     if (err.error?.message) {
//       errorMsg = err.error.message;
//     } else if (err.message) {
//       errorMsg = err.message;
//     }
    
//     this.errorMessage = errorMsg;
//     this.showError = true;
//     this.showSuccess = false;
    
//     console.error('Google Sign-In Error:', {
//       status: err.status,
//       statusText: err.statusText,
//       message: errorMsg,
//       fullError: err
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = '';
//     this.successMessage = '';
//     this.showError = false;
//     this.showSuccess = false;

//     const authData = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password,
//     };

//     console.log('Regular Login:', authData);

//     this.userService.login(authData).subscribe({
//       next: (response: any) => {
//         this.handleLoginSuccess(response);
//       },
//       error: (error: any) => {
//         this.isLoading = false;
//         this.errorMessage =
//           error.error?.message ||
//           error.message ||
//           'Login failed. Please try again.';
//         this.showError = true;
//       },
//     });
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../Services/userSession/userSession.Service';
// import { AuthService } from '../Services/auth/auth.service';
// import { vertcalnavService } from '../Services/verticalnav/verticalnav.service';
// import { AuthSharedService } from '../Services/auth-shared/authShared.service';

// declare const google: any;

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'],
// })
// export class SignInComponent implements OnInit, AfterViewInit {
//   @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;

//   showPassword: boolean = false;
//   loginForm: FormGroup;
//   isLoading = false;
//   errorMessage = '';
//   successMessage = '';
//   showSuccess = false;
//   showError = false;
//   menu: any[] = [];

//   constructor(
//     private userService: AuthService,
//     private vertcalnavservice: vertcalnavService,
//     private sessionService: UserSessionService,
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private authSharedService: AuthSharedService,
//     private ngZone: NgZone
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
    
//     console.log('🔧 Sign-In Component Initialized');
//   }

//   ngOnInit(): void {
//     console.log('🔧 Sign-In ngOnInit called');
//     this.loadGoogleSignInScript();
//   }

//   ngAfterViewInit(): void {
//     console.log('🔧 Sign-In ngAfterViewInit called');
//     this.waitForGoogleSDK();
//   }

//   loadGoogleSignInScript(): void {
//     console.log('🔧 Loading Google Sign-In Script...');
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       console.log('✅ Google Sign-In SDK loaded successfully');
//     };
//     script.onerror = (error) => {
//       console.error('❌ Failed to load Google Sign-In SDK:', error);
//       this.errorMessage = 'Failed to load Google Sign-In. Please refresh the page.';
//       this.showError = true;
//     };
//     document.head.appendChild(script);
//   }

//   waitForGoogleSDK(): void {
//     console.log('⏳ Waiting for Google SDK to load...');
//     const checkGoogle = setInterval(() => {
//       if (typeof google !== 'undefined' && google.accounts) {
//         clearInterval(checkGoogle);
//         console.log('✅ Google SDK is ready');
//         this.ngZone.run(() => {
//           this.initializeGoogleSignIn();
//         });
//       } else {
//         console.log('⏳ Google SDK not ready yet...');
//       }
//     }, 100);

//     setTimeout(() => {
//       clearInterval(checkGoogle);
//       if (typeof google === 'undefined') {
//         console.error('❌ Google SDK failed to load within timeout');
//         this.errorMessage = 'Google Sign-In failed to load. Please refresh.';
//         this.showError = true;
//       }
//     }, 10000);
//   }

//   initializeGoogleSignIn(): void {
//     console.log('🔧 Initializing Google Sign-In...');
//     try {
//       google.accounts.id.initialize({
//         client_id: '955844459904-6qfsnjmap4npdt35h07t3j5bpdefvamf.apps.googleusercontent.com',
//         callback: this.handleGoogleSignIn.bind(this),
//         auto_select: false,
//         cancel_on_tap_outside: true
//       });

//       if (this.googleButton && this.googleButton.nativeElement) {
//         console.log('🎨 Rendering Google button...');
//         google.accounts.id.renderButton(
//           this.googleButton.nativeElement,
//           {
//             theme: 'outline',
//             size: 'large',
//             width: this.googleButton.nativeElement.offsetWidth,
//             text: 'signin_with',
//             shape: 'rectangular',
//             logo_alignment: 'left'
//           }
//         );
//         console.log('✅ Google button rendered successfully');
//       } else {
//         console.error('❌ Google button element not found');
//       }
//     } catch (error) {
//       console.error('❌ Error initializing Google Sign-In:', error);
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//     console.log('👁️ Password visibility:', this.showPassword ? 'visible' : 'hidden');
//   }

//   getMenu(roleID: any): void {
//     console.log('📋 Getting menu for role:', roleID);
//     this.isLoading = true;
//     this.vertcalnavservice.getMenu(roleID).subscribe(
//       (response: any[]) => {
//         console.log('✅ Menu Response:', response);
//         this.isLoading = false;
//         this.menu = response;
//         this.sessionService.saveMenuSession(response);
//         this.authSharedService.triggerMenu();
//       },
//       (error: any) => {
//         this.isLoading = false;
//         console.error('❌ Error fetching menu:', error);
//       }
//     );
//   }

//   decodeGoogleToken(token: string) {
//     console.log('🔑 Decoding Google token...');
//     try {
//       const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//       const decoded = JSON.parse(atob(base64));
//       console.log('✅ Token decoded successfully');
//       return decoded;
//     } catch (error) {
//       console.error('❌ Error decoding Google token:', error);
//       return null;
//     }
//   }

//   handleLoginSuccess(response: any): void {
//     console.log('🎉 === Login Success Handler ===');
//     console.log('📋 Login Success Response:', response);
    
//     this.isLoading = false;

//     if (response && response.token) {
//       console.log('✅ Token found, saving session...');
//       this.sessionService.saveUserSession(response);
//       this.successMessage = 'Login successful! Redirecting...';
//       this.showSuccess = true;
//       this.showError = false;

//       const roleId = this.sessionService.getRoleId();
//       console.log('🎯 User Role ID:', roleId);
      
//       // Get menu based on role
//       this.getMenu(roleId);

//       // Redirect based on role
//       setTimeout(() => {
//         console.log('🔄 Redirecting user...');
//         if (response.roleId === 2) {
//           console.log('➡️ Redirecting to companyDashboard');
//           this.router.navigate(['/companyDashboard']);
//         } else if (response.roleId === 3) {
//           console.log('➡️ Redirecting to adminDashboard');
//           this.router.navigate(['/adminDashboard']);
//         } else {
//           console.log('➡️ Redirecting to home');
//           this.router.navigate(['/']);
//         }
//       }, 1000);
//     } else {
//       console.error('❌ Login failed - No token in response');
//       this.errorMessage = response?.message || 'Login failed. No token received.';
//       this.showError = true;
//       this.showSuccess = false;
//     }
//   }

//   handleGoogleSignIn(response: any): void {
//     console.log('🚀 === Google Sign-In Callback Triggered ===');
//     console.log('📋 Raw Google Response Object:', response);
//     console.log('🔑 Credential Length:', response.credential?.length || 0);

//     if (!response.credential) {
//       console.error('❌ No credential in Google response');
//       this.showGoogleError({ message: 'No credential received from Google' });
//       return;
//     }

//     const decoded = this.decodeGoogleToken(response.credential);
    
//     if (!decoded) {
//       console.error('❌ Failed to decode token');
//       this.showGoogleError({ message: 'Failed to decode Google token' });
//       return;
//     }

//     console.log('✅ Decoded Token Details:', decoded);
//     console.log('📧 Email:', decoded.email);
//     console.log('👤 Name:', decoded.name);
//     console.log('✅ Email Verified:', decoded.email_verified);

//     const googleUser = {
//       email: decoded.email,
//       name: decoded.name,
//       picture: decoded.picture,
//       phone: '' // Google doesn't provide phone by default
//     };

//     console.log('📋 Formatted Google User:', googleUser);
//     console.log('🎯 Ready to process Google login...');

//     this.ngZone.run(() => {
//       this.isLoading = true;
//       this.errorMessage = '';
//       this.showError = false;
//       this.showSuccess = false;

//       // Step 1: Try to login with existing user
//       console.log('📞 STEP 1: Calling googleLoginFlow API...');
//       this.userService.googleLoginFlow(googleUser).subscribe({
//         next: (loginResponse: any) => {
//           console.log('✅ Google Login API Response Received');
//           console.log('📋 Login Response:', loginResponse);

//           // Check if user exists and has token
//           if (loginResponse && loginResponse.token) {
//             console.log('✅ User exists - Login successful with token');
//             this.handleLoginSuccess(loginResponse);
//           } else {
//             console.log('⚠️ User does not exist or no token received');
//             console.log('📋 Response without token:', loginResponse);
            
//             // Step 2: User doesn't exist, create new user
//             this.createAndLoginGoogleUser(googleUser);
//           }
//         },
//         error: (loginError) => {
//           console.error('❌ Login Flow Error Occurred');
//           console.error('📋 Error Details:', {
//             status: loginError.status,
//             statusText: loginError.statusText,
//             message: loginError.error?.message || loginError.message,
//             errorCode: loginError.error?.code
//           });
          
//           // If 400, 404 or user not found, create new user
//           const errorMsg = loginError.error?.message?.toLowerCase() || '';
//           if (loginError.status === 400 || 
//               loginError.status === 404 || 
//               errorMsg.includes('not found') ||
//               errorMsg.includes('does not exist') ||
//               errorMsg.includes('bad request') ||
//               errorMsg.includes('user not')) {
//             console.log('📝 User not found - Creating new user');
//             this.createAndLoginGoogleUser(googleUser);
//           } else {
//             console.log('❌ Other error - showing error message');
//             this.showGoogleError(loginError);
//           }
//         }
//       });
//     });
//   }

//   createAndLoginGoogleUser(googleUser: any): void {
//     console.log('🚀 === Creating New Google User ===');
//     console.log('📋 User Data for Creation:', googleUser);
    
//     console.log('📞 STEP 2: Calling saveGoogleUser API...');
//     this.userService.saveGoogleUser(googleUser).subscribe({
//       next: (saveResponse: any) => {
//         console.log('✅ User Creation API Response');
//         console.log('📋 Save Response:', saveResponse);
        
//         // Check if save was successful
//         if (saveResponse && (saveResponse.success || saveResponse.message || saveResponse.userID)) {
//           console.log('✅ User saved successfully');
//           console.log('📋 Save Response Details:', saveResponse);
          
//           // Step 3: Login after creating user
//           console.log('⏳ Waiting 1 second before login...');
//           setTimeout(() => {
//             console.log('📞 STEP 3: Logging in after user creation...');
//             this.userService.googleLoginFlow(googleUser).subscribe({
//               next: (loginResponse: any) => {
//                 console.log('✅ Login After Creation Success');
//                 console.log('📋 Login Response:', loginResponse);
//                 this.handleLoginSuccess(loginResponse);
//               },
//               error: (loginError) => {
//                 console.error('❌ Login after creation failed');
//                 console.error('📋 Error:', loginError);
//                 this.showGoogleError(loginError);
//               }
//             });
//           }, 1000);
//         } else {
//           console.error('❌ User creation response indicates failure');
//           console.error('📋 Response:', saveResponse);
//           this.showGoogleError({ message: 'User creation failed - invalid response' });
//         }
//       },
//       error: (saveError) => {
//         console.error('❌ User Creation API Failed');
//         console.error('📋 Save Error Details:', {
//           status: saveError.status,
//           statusText: saveError.statusText,
//           message: saveError.error?.message || saveError.message,
//           error: saveError.error
//         });
        
//         const errorMsg = saveError.error?.message?.toLowerCase() || '';
        
//         // Check if user already exists error
//         if (saveError.status === 409 || 
//             errorMsg.includes('already exists') ||
//             errorMsg.includes('duplicate') ||
//             errorMsg.includes('unique constraint')) {
//           console.log('⚠️ User already exists in database');
//           console.log('⏳ Trying login again...');
          
//           // Try login one more time
//           setTimeout(() => {
//             console.log('📞 Retrying login for existing user...');
//             this.userService.googleLoginFlow(googleUser).subscribe({
//               next: (response) => {
//                 console.log('✅ Existing user login success');
//                 this.handleLoginSuccess(response);
//               },
//               error: (err) => {
//                 console.error('❌ Existing user login failed');
//                 this.showGoogleError(err);
//               }
//             });
//           }, 500);
//         } else {
//           console.error('❌ Other save error');
//           this.showGoogleError(saveError);
//         }
//       }
//     });
//   }

//   showGoogleError(err: any): void {
//     console.error('🔴 === Displaying Google Sign-In Error ===');
//     this.isLoading = false;
    
//     let errorMsg = 'Google sign-in failed. Please try again.';
    
//     // Try to extract meaningful error message
//     if (err.error?.message) {
//       errorMsg = err.error.message;
//     } else if (err.error?.error) {
//       errorMsg = err.error.error;
//     } else if (err.message) {
//       errorMsg = err.message;
//     } else if (err.statusText) {
//       errorMsg = err.statusText;
//     } else if (typeof err === 'string') {
//       errorMsg = err;
//     }
    
//     console.error('🔴 Error Message to Display:', errorMsg);
//     console.error('🔴 Full Error Object:', {
//       status: err.status,
//       statusText: err.statusText,
//       message: errorMsg,
//       fullError: err
//     });
    
//     this.errorMessage = errorMsg;
//     this.showError = true;
//     this.showSuccess = false;
    
//     // Auto-hide error after 5 seconds
//     setTimeout(() => {
//       this.showError = false;
//       this.errorMessage = '';
//     }, 5000);
//   }

//   onSubmit() {
//     console.log('📝 Regular Form Submit');
//     if (this.loginForm.invalid) {
//       console.error('❌ Form is invalid');
//       this.errorMessage = 'Please enter valid email and password.';
//       this.showError = true;
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = '';
//     this.successMessage = '';
//     this.showError = false;
//     this.showSuccess = false;

//     const authData = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password,
//     };

//     console.log('📤 Regular Login Data:', authData);

//     this.userService.login(authData).subscribe({
//       next: (response: any) => {
//         console.log('✅ Regular Login Success');
//         this.handleLoginSuccess(response);
//       },
//       error: (error: any) => {
//         console.error('❌ Regular Login Error');
//         this.isLoading = false;
//         this.errorMessage =
//           error.error?.message ||
//           error.message ||
//           'Login failed. Please check your credentials.';
//         this.showError = true;
//       },
//     });
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from '../Services/userSession/userSession.Service';
import { AuthService } from '../Services/auth/auth.service';
import { vertcalnavService } from '../Services/verticalnav/verticalnav.service';
import { AuthSharedService } from '../Services/auth-shared/authShared.service';

declare const google: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;

  showPassword: boolean = false;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showSuccess = false;
  showError = false;
  menu: any[] = [];

  constructor(
    private userService: AuthService,
    private vertcalnavservice: vertcalnavService,
    private sessionService: UserSessionService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authSharedService: AuthSharedService,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    
    console.log('🔧 Sign-In Component Initialized');
  }

  ngOnInit(): void {
    console.log('🔧 Sign-In ngOnInit called');
    this.loadGoogleSignInScript();
  }

  ngAfterViewInit(): void {
    console.log('🔧 Sign-In ngAfterViewInit called');
    this.waitForGoogleSDK();
  }

  loadGoogleSignInScript(): void {
    console.log('🔧 Loading Google Sign-In Script...');
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ Google Sign-In SDK loaded successfully');
    };
    script.onerror = (error) => {
      console.error('❌ Failed to load Google Sign-In SDK:', error);
      this.errorMessage = 'Failed to load Google Sign-In. Please refresh the page.';
      this.showError = true;
    };
    document.head.appendChild(script);
  }

  waitForGoogleSDK(): void {
    console.log('⏳ Waiting for Google SDK to load...');
    const checkGoogle = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts) {
        clearInterval(checkGoogle);
        console.log('✅ Google SDK is ready');
        this.ngZone.run(() => {
          this.initializeGoogleSignIn();
        });
      } else {
        console.log('⏳ Google SDK not ready yet...');
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkGoogle);
      if (typeof google === 'undefined') {
        console.error('❌ Google SDK failed to load within timeout');
        this.errorMessage = 'Google Sign-In failed to load. Please refresh.';
        this.showError = true;
      }
    }, 10000);
  }

  initializeGoogleSignIn(): void {
    console.log('🔧 Initializing Google Sign-In...');
    try {
      google.accounts.id.initialize({
        client_id: '955844459904-6qfsnjmap4npdt35h07t3j5bpdefvamf.apps.googleusercontent.com',
        callback: this.handleGoogleSignIn.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      if (this.googleButton && this.googleButton.nativeElement) {
        console.log('🎨 Rendering Google button...');
        google.accounts.id.renderButton(
          this.googleButton.nativeElement,
          {
            theme: 'outline',
            size: 'large',
            width: this.googleButton.nativeElement.offsetWidth,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
        console.log('✅ Google button rendered successfully');
      } else {
        console.error('❌ Google button element not found');
      }
    } catch (error) {
      console.error('❌ Error initializing Google Sign-In:', error);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log('👁️ Password visibility:', this.showPassword ? 'visible' : 'hidden');
  }

  getMenu(roleID: any): void {
    console.log('📋 Getting menu for role:', roleID);
    this.isLoading = true;
    this.vertcalnavservice.getMenu(roleID).subscribe(
      (response: any[]) => {
        console.log('✅ Menu Response:', response);
        this.isLoading = false;
        this.menu = response;
        this.sessionService.saveMenuSession(response);
        this.authSharedService.triggerMenu();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('❌ Error fetching menu:', error);
      }
    );
  }

  decodeGoogleToken(token: string) {
    console.log('🔑 Decoding Google token...');
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      console.log('✅ Token decoded successfully');
      return decoded;
    } catch (error) {
      console.error('❌ Error decoding Google token:', error);
      return null;
    }
  }

  handleLoginSuccess(response: any): void {
    console.log('🎉 === Login Success Handler ===');
    console.log('📋 Login Success Response:', response);
    
    this.isLoading = false;

    if (response && response.token) {
      console.log('✅ Token found, saving session...');
      this.sessionService.saveUserSession(response);
      this.successMessage = 'Login successful! Redirecting...';
      this.showSuccess = true;
      this.showError = false;

      const roleId = this.sessionService.getRoleId();
      console.log('🎯 User Role ID:', roleId);
      
      // Get menu based on role
      this.getMenu(roleId);

      // Redirect based on role
      setTimeout(() => {
        console.log('🔄 Redirecting user...');
        if (response.roleId === 2) {
          console.log('➡️ Redirecting to companyDashboard');
          this.router.navigate(['/companyDashboard']);
        } else if (response.roleId === 3) {
          console.log('➡️ Redirecting to adminDashboard');
          this.router.navigate(['/adminDashboard']);
        } else {
          console.log('➡️ Redirecting to home');
          this.router.navigate(['/']);
        }
      }, 1000);
    } else {
      console.error('❌ Login failed - No token in response');
      this.errorMessage = response?.message || 'Login failed. No token received.';
      this.showError = true;
      this.showSuccess = false;
    }
  }

  handleGoogleSignIn(response: any): void {
    console.log('🚀 === Google Sign-In Callback Triggered ===');
    console.log('📋 Raw Google Response Object:', response);
    console.log('🔑 Credential Length:', response.credential?.length || 0);

    if (!response.credential) {
      console.error('❌ No credential in Google response');
      this.showGoogleError({ message: 'No credential received from Google' });
      return;
    }

    const decoded = this.decodeGoogleToken(response.credential);
    
    if (!decoded) {
      console.error('❌ Failed to decode token');
      this.showGoogleError({ message: 'Failed to decode Google token' });
      return;
    }

    console.log('✅ Decoded Token Details:', decoded);
    console.log('📧 Email:', decoded.email);
    console.log('👤 Name:', decoded.name);
    console.log('✅ Email Verified:', decoded.email_verified);

    const googleUser = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      phone: '' // Google doesn't provide phone by default
    };

    console.log('📋 Formatted Google User:', googleUser);
    console.log('🎯 Ready to process Google login...');

    this.ngZone.run(() => {
      this.isLoading = true;
      this.errorMessage = '';
      this.showError = false;
      this.showSuccess = false;

      // Use the new completeGoogleSignIn method that saves first, then logs in
      console.log('📞 Calling completeGoogleSignIn (Save → Login)...');
      this.userService.completeGoogleSignIn(googleUser).subscribe({
        next: (loginResponse: any) => {
          console.log('✅ Complete Google Sign-In Success');
          console.log('📋 Login Response:', loginResponse);
          this.handleLoginSuccess(loginResponse);
        },
        error: (error) => {
          console.error('❌ Complete Google Sign-In Failed');
          
          // If login still fails after saving, show error
          this.showGoogleError(error);
        }
      });
    });
  }

  showGoogleError(err: any): void {
    console.error('🔴 === Displaying Google Sign-In Error ===');
    this.isLoading = false;
    
    let errorMsg = 'Google sign-in failed. Please try again.';
    
    // Try to extract meaningful error message
    if (err.error?.message) {
      errorMsg = err.error.message;
    } else if (err.error?.error) {
      errorMsg = err.error.error;
    } else if (err.message) {
      errorMsg = err.message;
    } else if (err.statusText) {
      errorMsg = err.statusText;
    } else if (typeof err === 'string') {
      errorMsg = err;
    }
    
    console.error('🔴 Error Message to Display:', errorMsg);
    console.error('🔴 Full Error Object:', {
      status: err.status,
      statusText: err.statusText,
      message: errorMsg,
      fullError: err
    });
    
    this.errorMessage = errorMsg;
    this.showError = true;
    this.showSuccess = false;
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 5000);
  }

  onSubmit() {
    console.log('📝 Regular Form Submit');
    if (this.loginForm.invalid) {
      console.error('❌ Form is invalid');
      this.errorMessage = 'Please enter valid email and password.';
      this.showError = true;
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
    };

    console.log('📤 Regular Login Data:', authData);

    this.userService.login(authData).subscribe({
      next: (response: any) => {
        console.log('✅ Regular Login Success');
        this.handleLoginSuccess(response);
      },
      error: (error: any) => {
        console.error('❌ Regular Login Error');
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          error.message ||
          'Login failed. Please check your credentials.';
        this.showError = true;
      },
    });
  }
}