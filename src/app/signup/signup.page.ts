import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  callOutline,
  lockClosedOutline,
  personAddOutline,
  eyeOutline,
  eyeOffOutline,
  arrowBackOutline,
  arrowForwardOutline,
  logoGoogle,
  logoFacebook,
  logoApple,
} from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupPage {
  form: FormGroup;
  isLoading = false;
  submitted = false;
  
  // Password visibility
  showPassword = false;
  showConfirmPassword = false;

  // Focus states
  nameFocused = false;
  surnameFocused = false;
  emailFocused = false;
  phoneFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      personOutline,
      mailOutline,
      callOutline,
      lockClosedOutline,
      personAddOutline,
      eyeOutline,
      eyeOffOutline,
      arrowBackOutline,
      arrowForwardOutline,
      logoGoogle,
      logoFacebook,
      logoApple,
    });

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    }, {
      validators: this.passwordMatchValidator,
    });
  }

  // Custom validator for password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Getters for form controls
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get terms() { return this.form.get('terms'); }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || this.submitted);
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    console.log('[Signup] Form submitted:', this.form.value);

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      
      // Save user data
      const userData = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        fullName: `${this.form.value.name} ${this.form.value.surname}`,
        email: this.form.value.email,
        phone: this.form.value.phone,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Navigate to Home page after successful registration
      this.router.navigate(['/home']);
    }, 1500);
  }

  goBack(): void {
    this.navCtrl.back();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  signupWithGoogle(): void {
    console.log('[Signup] Signing up with Google');
    this.router.navigate(['/home']);
  }

  signupWithFacebook(): void {
    console.log('[Signup] Signing up with Facebook');
    this.router.navigate(['/home']);
  }

  signupWithApple(): void {
    console.log('[Signup] Signing up with Apple');
    this.router.navigate(['/home']);
  }

  openTerms(): void {
    console.log('[Signup] Opening Terms of Service');
  }

  openPrivacy(): void {
    console.log('[Signup] Opening Privacy Policy');
  }
}