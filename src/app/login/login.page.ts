import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
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

// Declare lottie for CDN
declare var lottie: any;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements AfterViewInit {
  identifier: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;
  identifierFocused: boolean = false;
  passwordFocused: boolean = false;
  imageError: boolean = false;

  private animationItem: any;

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

  ngAfterViewInit() {
    this.loadLottieAnimation();
  }

  loadLottieAnimation() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const container = document.getElementById('lottie-container');
      if (container && typeof lottie !== 'undefined') {
        try {
          this.animationItem = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            // Use the local file you downloaded
            path: 'assets/animations/car-wash-login.json'
          });
          console.log('[Lottie] Animation loaded successfully from local file');
        } catch (error) {
          console.error('[Lottie] Error loading animation:', error);
          // Fallback to CDN if local file fails
          this.loadFallbackAnimation(container);
        }
      } else {
        console.warn('[Lottie] Container not found or lottie not loaded');
        // Try again after a delay
        setTimeout(() => this.loadLottieAnimation(), 500);
      }
    }, 200);
  }

  loadFallbackAnimation(container: any) {
    try {
      this.animationItem = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_1pczf4sl.json'
      });
      console.log('[Lottie] Fallback animation loaded from CDN');
    } catch (error) {
      console.error('[Lottie] Fallback also failed:', error);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isValidIdentifier(): boolean {
    if (!this.identifier) return false;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.identifier)) {
      return true;
    }
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneRegex.test(this.identifier.replace(/\s/g, ''))) {
      return true;
    }
    
    const simplePhoneRegex = /^[0-9]{9,15}$/;
    if (simplePhoneRegex.test(this.identifier.replace(/\s/g, ''))) {
      return true;
    }
    
    return false;
  }

  handleImageError(event: any): void {
    this.imageError = true;
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