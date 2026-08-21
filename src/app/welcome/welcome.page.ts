import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  mailOutline, 
  arrowForwardOutline, 
  logoGoogle, 
  logoFacebook, 
  logoApple,
  shieldCheckmarkOutline,
  waterOutline,
  timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomePage {

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    // Register icons
    addIcons({
      mailOutline,
      arrowForwardOutline,
      logoGoogle,
      logoFacebook,
      logoApple,
      shieldCheckmarkOutline,
      waterOutline,
      timeOutline
    });
  }

  signInWithEmail(): void {
    console.log('[Welcome] Navigating to Login');
    this.navCtrl.navigateForward('/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  signInWithGoogle(): void {
    console.log('[Welcome] Signing in with Google');
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  signInWithFacebook(): void {
    console.log('[Welcome] Signing in with Facebook');
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  signInWithApple(): void {
    console.log('[Welcome] Signing in with Apple');
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  register(): void {
    console.log('[Welcome] Navigating to Signup');
    this.navCtrl.navigateForward('/signup', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  openTerms(): void {
    console.log('[Welcome] Opening Terms of Service');
  }

  openPrivacy(): void {
    console.log('[Welcome] Opening Privacy Policy');
  }

  handleAuthError(error: any): void {
    console.error('[Welcome] Authentication error:', error);
    this.isLoading = false;
  }

  ionViewWillLeave(): void {
    this.isLoading = false;
  }
}