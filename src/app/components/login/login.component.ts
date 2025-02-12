// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // In real application, make API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // If login successful, navigate to dashboard
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = 'Invalid email or password';
    } finally {
      this.isLoading = false;
    }
  }

  validateForm(): boolean {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Please fill in all fields';
      return false;
    }
    if (!this.isValidEmail(this.loginForm.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }
    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}