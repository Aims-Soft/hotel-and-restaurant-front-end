import { Component } from '@angular/core';
import { FormBuilder , Validators,FormGroup } from '@angular/forms';
import { ResetPassService } from '../../../../Services/Reset Password/resetPassword.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../Services/userSession/userSession.Service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
    showPassword: boolean = false;
  resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private resetPassword: ResetPassService,
    private router: Router,
    private sessionService: UserSessionService
  ) {
    // Get email from navigation state
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras?.state?.['email'] || '';
    
    // If no email, redirect back
    if (!this.email) {
      this.router.navigate(['/auth/login']);
    }

    this.resetForm = this.fb.group({
       password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
   // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      if (this.resetForm.hasError('mismatch')) {
        this.errorMessage = 'Passwords do not match';
      } else {
        this.errorMessage = 'Please enter valid passwords (minimum 6 characters)';
      }
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { password } = this.resetForm.value;

    this.resetPassword.resetPassword(this.email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // Clear user session if logged in
        this.sessionService.clearSession();
        
        // Redirect to login with success message
        this.router.navigate(['/signIn'], {
          state: { passwordReset: true }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
      }
    });
  }

}
