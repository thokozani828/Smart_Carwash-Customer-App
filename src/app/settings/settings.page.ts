import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Settings state
  darkMode: boolean = false;
  biometricLogin: boolean = false;
  selectedLanguage: string = 'English';

  // Current route for bottom nav
  currentRoute: string = 'settings';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'settings';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'settings';
      if (this.currentRoute === 'settings') {
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

  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  isActive(page: string): boolean {
    return this.currentRoute === page;
  }

  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  toggleDarkMode(event: any): void {
    this.darkMode = event.detail.checked;
    console.log('[Settings] Dark mode toggled:', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
  }

  changeLanguage(): void {
    console.log('[Settings] Changing language');
    this.navCtrl.navigateForward('/language-selector');
  }

  privacySettings(): void {
    console.log('[Settings] Opening privacy settings');
    this.navCtrl.navigateForward('/privacy-settings');
  }

  notificationSettings(): void {
    console.log('[Settings] Opening notification settings');
    this.navCtrl.navigateForward('/notification-settings');
  }

  toggleBiometric(event: any): void {
    this.biometricLogin = event.detail.checked;
    console.log('[Settings] Biometric login toggled:', this.biometricLogin);
  }

  viewTerms(): void {
    console.log('[Settings] Viewing terms and conditions');
    this.navCtrl.navigateForward('/terms');
  }

  viewPrivacy(): void {
    console.log('[Settings] Viewing privacy policy');
    this.navCtrl.navigateForward('/privacy-policy');
  }
}