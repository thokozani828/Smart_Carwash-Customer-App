import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.page.html',
  styleUrls: ['./loyalty.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoyaltyPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;
  
  // Available Rewards
  availableRewards: any[] = [];
  
  // Free Washes
  freeWashes: any[] = [];

  // Earn Methods
  earnMethods = [
    { icon: 'calendar-outline', title: 'Book a Wash', points: '+50 pts', color: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
    { icon: 'star-outline', title: 'VIP Membership', points: '+100 pts', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { icon: 'gift-outline', title: 'Refer a Friend', points: '+200 pts', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { icon: 'chatbubble-outline', title: 'Leave Review', points: '+25 pts', color: 'linear-gradient(135deg, #22c55e, #16a34a)' }
  ];

  // Current route for bottom nav
  currentRoute: string = 'loyalty';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'loyalty';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'loyalty';
      if (this.currentRoute === 'loyalty') {
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

    // Simulate API call with 1.5 second delay
    setTimeout(() => {
      this.availableRewards = [
        {
          icon: 'water-outline',
          title: 'Free Premium Wash',
          desc: 'One free premium car wash',
          points: '500',
          expiry: '30 days',
          color: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
        },
        {
          icon: 'car-outline',
          title: 'Free Tyre Shine',
          desc: 'Professional tyre shine service',
          points: '200',
          expiry: '15 days',
          color: 'linear-gradient(135deg, #22c55e, #16a34a)'
        },
        {
          icon: 'sparkles-outline',
          title: 'Interior Clean',
          desc: 'Deep interior cleaning service',
          points: '350',
          expiry: '30 days',
          color: 'linear-gradient(135deg, #ec4899, #db2777)'
        },
        {
          icon: 'star-outline',
          title: 'VIP Upgrade',
          desc: '1 Month VIP membership upgrade',
          points: '800',
          expiry: '7 days',
          color: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
        },
        {
          icon: 'gift-outline',
          title: 'Birthday Bonus',
          desc: 'Free premium wash on your birthday',
          points: '0',
          expiry: '365 days',
          color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        }
      ];

      this.freeWashes = [
        {
          title: 'Premium Wash',
          desc: 'One free premium car wash',
          status: 'available'
        },
        {
          title: 'Tyre Shine',
          desc: 'Professional tyre shine service',
          status: 'available'
        },
        {
          title: 'Interior Detail',
          desc: 'Deep interior cleaning',
          status: 'used'
        }
      ];
      
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
   * Go back to previous page - FIXED
   */
  goBack(): void {
    try {
      // Try to use location back
      this.location.back();
    } catch (error) {
      // If that fails, navigate to home
      this.navCtrl.navigateRoot('/home');
    }
  }

  /**
   * Redeem a reward
   */
  redeemReward(reward: any): void {
    console.log('[Loyalty] Redeeming reward:', reward);
    if (confirm(`Redeem ${reward.title} for ${reward.points} points?`)) {
      alert(`✅ ${reward.title} redeemed successfully!`);
    }
  }

  /**
   * View all rewards
   */
  viewAllRewards(): void {
    console.log('[Loyalty] Viewing all rewards');
    this.navCtrl.navigateForward('/all-rewards');
  }

  /**
   * View all free washes
   */
  viewAllFreeWashes(): void {
    console.log('[Loyalty] Viewing all free washes');
    this.navCtrl.navigateForward('/free-washes');
  }
}