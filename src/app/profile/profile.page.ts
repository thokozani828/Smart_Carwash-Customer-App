import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage {
  
  // Loading state for skeleton
  isLoading: boolean = true;
  
  // App Features Menu
  appMenus = [
    { title: 'Book a Wash', desc: 'Schedule your car wash', icon: 'calendar-outline', route: 'booking', color: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
    { title: 'My Vehicles', desc: 'Manage your vehicles', icon: 'car-outline', route: 'vehicles', color: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { title: 'Booking History', desc: 'View all your bookings', icon: 'time-outline', route: 'booking-history', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { title: 'Payments', desc: 'Payment methods and history', icon: 'card-outline', route: 'payments', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { title: 'VIP Membership', desc: 'Exclusive VIP benefits', icon: 'star-outline', route: 'vip-membership', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { title: 'Loyalty Rewards', desc: 'Earn and redeem points', icon: 'gift-outline', route: 'loyalty', color: 'linear-gradient(135deg, #ec4899, #db2777)' },
    { title: 'Digital Indemnity', desc: 'Sign indemnity form', icon: 'document-text-outline', route: 'indemnity', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { title: 'Services', desc: 'View all services', icon: 'construct-outline', route: 'services', color: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
    { title: 'Packages', desc: 'Compare wash packages', icon: 'cube-outline', route: 'packages', color: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    { title: 'Live Tracking', desc: 'Track your active booking', icon: 'location-outline', route: 'live-tracking', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { title: 'Reviews & Feedback', desc: 'Rate and review services', icon: 'star-outline', route: 'reviews', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { title: 'Notifications', desc: 'View all notifications', icon: 'notifications-outline', route: 'notifications', color: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { title: 'Support', desc: 'Get help and support', icon: 'chatbubble-outline', route: 'support', color: 'linear-gradient(135deg, #22c55e, #16a34a)' }
  ];

  // Account Settings Menu
  accountMenus = [
    { title: 'Settings', desc: 'App settings and preferences', icon: 'settings-outline', route: 'settings', color: 'linear-gradient(135deg, #64748b, #475569)' },
    { title: 'Change Password', desc: 'Update your password', icon: 'lock-closed-outline', route: 'change-password', color: 'linear-gradient(135deg, #f59e0b, #d97706)' }
  ];

  // Current route for bottom nav
  currentRoute: string = 'profile';

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'profile';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'profile';
      if (this.currentRoute === 'profile') {
        this.loadData();
      }
    });
  }

  /**
   * Initialize - Load data with skeleton
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load data with skeleton loading
   */
  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Navigate to a page (for bottom nav)
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
   * Go back to previous page
   */
  goBack(): void {
    this.navCtrl.back();
  }

  /**
   * Edit profile
   */
  editProfile(): void {
    console.log('[Profile] Editing profile');
    this.navCtrl.navigateForward('/edit-profile');
  }

  /**
   * Logout
   */
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      console.log('[Profile] Logging out');
      this.navCtrl.navigateRoot('/login');
    }
  }
}