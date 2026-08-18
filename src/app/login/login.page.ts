import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  carSportOutline,
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  arrowForwardOutline,
  logoGoogle,
  logoFacebook,
  logoApple,
  shieldCheckmarkOutline,
  waterOutline,
  timeOutline,
  arrowBackOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage {
  identifier: string = ''; // Can be email or phone number
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;
  identifierFocused: boolean = false;
  passwordFocused: boolean = false;
  imageError: boolean = false; // Added for image error handling

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      arrowBackOutline,
      carSportOutline,
      personOutline,
      lockClosedOutline,
      arrowForwardOutline,
      logoGoogle,
      logoFacebook,
      logoApple,
      eyeOutline,
      eyeOffOutline,
      shieldCheckmarkOutline,
      waterOutline,
      timeOutline,
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Validate if the identifier is either an email or a valid phone number
   */
  isValidIdentifier(): boolean {
    if (!this.identifier) return false;
    
    // Check if it's an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.identifier)) {
      return true;
    }
    
    // Check if it's a phone number (supports various formats)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneRegex.test(this.identifier.replace(/\s/g, ''))) {
      return true;
    }
    
    // Check if it's a simple numeric phone number (9-15 digits)
    const simplePhoneRegex = /^[0-9]{9,15}$/;
    if (simplePhoneRegex.test(this.identifier.replace(/\s/g, ''))) {
      return true;
    }
    
    return false;
  }

  /**
   * Handle image loading errors
   */
  handleImageError(event: any): void {
    this.imageError = true;
    console.log('Image failed to load, using fallback');
    // You can set a fallback image here
    // event.target.src = 'assets/images/logo_fallback.png';
    // Or hide the image
    event.target.style.display = 'none';
  }

  login(): void {
    this.submitted = true;
    
    if (!this.identifier || !this.password) {
      return;
    }

    if (!this.isValidIdentifier()) {
      return;
    }

    this.isLoading = true;
    console.log('[Login] Attempting login:', { 
      identifier: this.identifier, 
      rememberMe: this.rememberMe 
    });
    
    // Determine if it's email or phone
    const isEmail = this.identifier.includes('@');
    console.log('[Login] Login with:', isEmail ? 'Email' : 'Phone');
    
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1500);
  }

  forgotPassword(): void {
    console.log('[Login] Navigating to Forgot Password');
    this.router.navigate(['/forgot-password']);
  }

  goToSignup(): void {
    console.log('[Login] Navigating to Sign Up');
    this.router.navigate(['/signup']);
  }

  loginWithGoogle(): void {
    console.log('[Login] Logging in with Google');
    this.router.navigate(['/home']);
  }

  loginWithFacebook(): void {
    console.log('[Login] Logging in with Facebook');
    this.router.navigate(['/home']);
  }

  loginWithApple(): void {
    console.log('[Login] Logging in with Apple');
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.navCtrl.back();
  }
}