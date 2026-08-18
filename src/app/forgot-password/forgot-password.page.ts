import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  arrowBackOutline,
  checkmarkCircleOutline,
  arrowForwardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForgotPasswordPage {
  form: FormGroup;
  isLoading = false;
  submitted = false;
  successMessage = '';
  emailFocused = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      arrowBackOutline,
      checkmarkCircleOutline,
      arrowForwardOutline,
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
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
    this.successMessage = '';
    console.log('[ForgotPassword] Email submitted:', this.form.value.email);

    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Password reset link sent to your email!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 1500);
  }

  goBack(): void {
    this.navCtrl.back();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}