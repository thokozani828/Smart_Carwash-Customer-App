import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  chevronForwardOutline,
  logoGoogle,
  logoFacebook,
  logoApple,
  callOutline,
  mailOutline,
  addOutline,
  personOutline
} from 'ionicons/icons';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements AfterViewInit, OnDestroy {

  @ViewChild('lottieContainer', { static: false }) lottieRef!: ElementRef;

  isLoading: boolean = false;

  savedIdentifiers: string[] = [
    'thokozani@gmail.com',
    'sipho@washfy.co.za',
  ];

  private animationItem!: AnimationItem;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      arrowBackOutline,
      chevronForwardOutline,
      logoGoogle,
      logoFacebook,
      logoApple,
      callOutline,
      mailOutline,
      addOutline,
      personOutline
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initLottieAnimation();
    }, 300);
  }

  private initLottieAnimation(): void {
    if (this.lottieRef) {
      try {
        this.animationItem = lottie.loadAnimation({
          container: this.lottieRef.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets2.lottiefiles.com/packages/lf20_j1ad4yfb.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true,
            hideOnTransparent: true
          }
        });
        this.animationItem.setSpeed(0.8);
      } catch (error) {
        console.error('[Login] Lottie error:', error);
      }
    }
  }

  selectIdentifier(identifier: string): void {
    console.log('[Login] Selected:', identifier);
    this.navCtrl.navigateRoot('/home', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  addNewAccount(): void {
    console.log('[Login] Adding new account');
    this.navCtrl.navigateForward('/signup');
  }

  isEmail(identifier: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);
  }

  isPhone(identifier: string): boolean {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(identifier);
  }

  getIdentifierIcon(identifier: string): string {
    if (this.isEmail(identifier)) {
      return 'mail-outline';
    } else if (this.isPhone(identifier)) {
      return 'call-outline';
    }
    return 'person-outline';
  }

  goBack(): void {
    this.navCtrl.back();
  }

  goToSignup(): void {
    this.navCtrl.navigateForward('/signup');
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  loginWithFacebook(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  loginWithApple(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.animationItem) {
      this.animationItem.destroy();
    }
  }
}