import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  arrowForwardOutline,
  logoGoogle,
  logoFacebook,
  logoApple,
  callOutline,
  mailOutline,
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupPage implements AfterViewInit, OnDestroy {

  @ViewChild('lottieContainer', { static: false }) lottieRef!: ElementRef;

  form: FormGroup;
  isLoading: boolean = false;
  
  // Focus states
  nameFocused: boolean = false;
  surnameFocused: boolean = false;
  emailFocused: boolean = false;
  phoneFocused: boolean = false;
  passwordFocused: boolean = false;
  confirmPasswordFocused: boolean = false;
  
  // Password visibility
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private animationItem!: AnimationItem;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    addIcons({
      arrowBackOutline,
      arrowForwardOutline,
      logoGoogle,
      logoFacebook,
      logoApple,
      callOutline,
      mailOutline,
      personOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline
    });

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
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
        console.error('[Signup] Lottie error:', error);
      }
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get terms() { return this.form.get('terms'); }

  isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit(): void {
    this.form.markAllAsTouched();
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    console.log('[Signup] Form submitted:', this.form.value);
    
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home', {
        animated: true,
        animationDirection: 'forward'
      });
    }, 1500);
  }

  signupWithGoogle(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  signupWithFacebook(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  signupWithApple(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/home');
    }, 1500);
  }

  goBack(): void {
    this.navCtrl.back();
  }

  goToLogin(): void {
    this.navCtrl.navigateForward('/login');
  }

  openTerms(): void {
    console.log('[Signup] Opening Terms');
  }

  openPrivacy(): void {
    console.log('[Signup] Opening Privacy Policy');
  }

  ngOnDestroy(): void {
    if (this.animationItem) {
      this.animationItem.destroy();
    }
  }
}