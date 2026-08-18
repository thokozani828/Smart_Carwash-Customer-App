import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vip-home',
  templateUrl: './vip-home.page.html',
  styleUrls: ['./vip-home.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VipHomePage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // User Info
  userName: string = 'John Doe';

  // VIP Data
  vipData = {
    planName: 'VIP Premium',
    washesUsed: 18,
    washesRemaining: 6,
    totalWashes: 24,
    points: 2450,
    tier: 'Gold',
    nextBilling: '2026-08-15',
    savings: 'R350',
    usagePercentage: 75
  };

  // Current route for bottom nav
  currentRoute: string = 'vip-home';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'vip-home';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'vip-home';
      if (this.currentRoute === 'vip-home') {
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
   * Navigate to a page
   */
  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  /**
   * Check if a tab is active (for bottom nav)
   */
  isActive(page: string): boolean {
    return this.currentRoute === page;
  }

  /**
   * Scan QR code
   */
  scanQR(): void {
    console.log('[VIP Home] Scanning QR code');
    alert('📷 Camera would open to scan QR code for instant access');
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
}