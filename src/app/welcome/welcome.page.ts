import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomePage {

  // Optional: Track loading states
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  /**
   * Sign in with Email (Login)
   */
  signInWithEmail(): void {
    console.log('[Welcome] Navigating to Login');
    this.navCtrl.navigateForward('/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  /**
   * Sign in with Google
   */
  signInWithGoogle(): void {
    console.log('[Welcome] Signing in with Google');
    this.isLoading = true;
    
    // Simulate authentication process
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/dashboard', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  /**
   * Sign in with Facebook
   */
  signInWithFacebook(): void {
    console.log('[Welcome] Signing in with Facebook');
    this.isLoading = true;
    
    // Simulate authentication process
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/dashboard', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  /**
   * Sign in with Apple
   */
  signInWithApple(): void {
    console.log('[Welcome] Signing in with Apple');
    this.isLoading = true;
    
    // Simulate authentication process
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/dashboard', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  /**
   * Navigate to Signup page
   */
  register(): void {
    console.log('[Welcome] Navigating to Signup');
    this.navCtrl.navigateForward('/signup', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  /**
   * Open Terms of Service
   */
  openTerms(): void {
    console.log('[Welcome] Opening Terms of Service');
    // In a real app, you would open a modal or navigate to the terms page
    // this.navCtrl.navigateForward('/terms');
  }

  /**
   * Open Privacy Policy
   */
  openPrivacy(): void {
    console.log('[Welcome] Opening Privacy Policy');
    // In a real app, you would open a modal or navigate to the privacy page
    // this.navCtrl.navigateForward('/privacy');
  }

  /**
   * Handle any errors during authentication
   */
  handleAuthError(error: any): void {
    console.error('[Welcome] Authentication error:', error);
    this.isLoading = false;
    // Show error message to user
  }

  /**
   * Clean up on page leave
   */
  ionViewWillLeave(): void {
    this.isLoading = false;
  }
}