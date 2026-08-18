import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangePasswordPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  // Form data
  formData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Password visibility toggles
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Form state
  formError: string = '';
  formSuccess: string = '';

  // Current route for bottom nav
  currentRoute: string = 'change-password';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'change-password';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'change-password';
      if (this.currentRoute === 'change-password') {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(field: string): void {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  /**
   * Check if passwords match
   */
  passwordsMatch(): boolean {
    return this.formData.newPassword === this.formData.confirmPassword && 
           this.formData.newPassword.length > 0;
  }

  /**
   * Password validation methods
   */
  hasMinLength(): boolean {
    return this.formData.newPassword.length >= 6;
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.formData.newPassword);
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.formData.newPassword);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.formData.newPassword);
  }

  /**
   * Get password strength segments
   */
  getStrengthSegments(): { active: boolean }[] {
    const strength = this.getPasswordStrength();
    return Array(4).fill(0).map((_, index) => ({
      active: index < strength
    }));
  }

  /**
   * Calculate password strength (0-4)
   */
  getPasswordStrength(): number {
    let strength = 0;
    if (this.hasMinLength()) strength++;
    if (this.hasUpperCase()) strength++;
    if (this.hasLowerCase()) strength++;
    if (this.hasNumber()) strength++;
    return strength;
  }

  /**
   * Get password strength text
   */
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    const texts = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return texts[strength] || 'Weak';
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    this.formError = '';
    this.formSuccess = '';
    this.isSubmitting = true;

    // Validate current password (simulate API check)
    if (this.formData.currentPassword !== 'password123') {
      this.formError = 'Current password is incorrect';
      this.isSubmitting = false;
      return;
    }

    // Validate new password
    if (!this.hasMinLength()) {
      this.formError = 'Password must be at least 6 characters';
      this.isSubmitting = false;
      return;
    }

    // Check if passwords match
    if (!this.passwordsMatch()) {
      this.formError = 'Passwords do not match';
      this.isSubmitting = false;
      return;
    }

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.formSuccess = 'Password changed successfully!';
      
      // Reset form
      this.formData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };

      // Navigate back after success
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }, 2000);
  }
}