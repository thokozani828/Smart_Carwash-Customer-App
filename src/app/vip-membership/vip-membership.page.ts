import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vip-membership',
  templateUrl: './vip-membership.page.html',
  styleUrls: ['./vip-membership.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VipMembershipPage implements OnInit {
  
  isLoading: boolean = true;
  isVIPActive: boolean = false;
  selectedPlan: any = null;

  // Schedule data
  schedule: any[] = [
    { name: 'Mon', date: '17', active: true, today: false },
    { name: 'Tue', date: '18', active: true, today: false },
    { name: 'Wed', date: '19', active: true, today: false },
    { name: 'Thu', date: '20', active: true, today: false },
    { name: 'Fri', date: '21', active: false, today: false },
    { name: 'Sat', date: '22', active: false, today: false },
    { name: 'Sun', date: '23', active: false, today: true }
  ];

  // Benefits data
  benefits: any[] = [
    { 
      icon: 'star-outline', 
      title: 'Priority Service', 
      desc: 'Skip the queue and get priority service',
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
    },
    { 
      icon: 'water-outline', 
      title: 'Premium Products', 
      desc: 'Use of premium cleaning products and wax',
      color: 'linear-gradient(135deg, #60a5fa, #2563eb)'
    },
    { 
      icon: 'cash-outline', 
      title: 'Discounts', 
      desc: 'Up to 20% off on all services',
      color: 'linear-gradient(135deg, #34d399, #059669)'
    },
    { 
      icon: 'calendar-outline', 
      title: 'Flexible Scheduling', 
      desc: 'Book any time with priority slots',
      color: 'linear-gradient(135deg, #a78bfa, #7c3aed)'
    },
    { 
      icon: 'people-outline', 
      title: 'Exclusive Events', 
      desc: 'Invitations to VIP car events',
      color: 'linear-gradient(135deg, #fb923c, #ea580c)'
    },
    { 
      icon: 'gift-outline', 
      title: 'Birthday Bonus', 
      desc: 'Free premium wash on your birthday',
      color: 'linear-gradient(135deg, #f472b6, #db2777)'
    }
  ];

  // Pricing plans
  plans: any[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'R199',
      maxDays: 2,
      color: 'linear-gradient(135deg, #94a3b8, #64748b)',
      popular: false,
      features: [
        '2 washes per month',
        'Standard service',
        'Priority booking',
        '5% discount on services'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R399',
      maxDays: 4,
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      popular: true,
      features: [
        '4 washes per month',
        'Premium service',
        'Priority booking + VIP slots',
        '15% discount on services',
        'Free interior cleaning',
        'Exclusive events access'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 'R699',
      maxDays: 8,
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      popular: false,
      features: [
        '8 washes per month',
        'Elite service',
        '24/7 priority booking',
        '25% discount on services',
        'Free interior + exterior detailing',
        'Exclusive events + VIP lounge',
        'Personal dedicated team'
      ]
    }
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * Load data with skeleton loading
   */
  loadData(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.isVIPActive = false;
      
      // Auto-select the popular plan by default
      if (!this.selectedPlan) {
        this.selectedPlan = this.plans.find(p => p.popular) || this.plans[0];
      }
      
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Select a plan (called when clicking "Select" button)
   * This updates the selected plan and shows the customize button
   */
  selectPlan(plan: any): void {
    if (!plan) {
      console.error('[VIP] ❌ No plan provided!');
      return;
    }
    
    this.selectedPlan = plan;
    console.log('[VIP] ✅ Plan selected:', plan.name);
    
    // Optional: Add haptic feedback or toast notification
    // this.showToast(`Selected ${plan.name} plan`);
  }

  /**
   * Open customize modal for a specific plan
   * This selects the plan and navigates to customization
   */
  openCustomizeModal(plan: any): void {
    if (!plan) {
      console.error('[VIP] ❌ No plan provided!');
      return;
    }
    
    // Select the plan first
    this.selectedPlan = plan;
    console.log('[VIP] ✅ Plan selected for customization:', plan.name);
    
    // Then navigate to customize subscription
    this.proceedToSubscription();
  }

  /**
   * Get selected plan features (first 3)
   */
  getSelectedPlanFeatures(): string[] {
    if (!this.selectedPlan) return [];
    return this.selectedPlan.features.slice(0, 3);
  }

  /**
   * Proceed to customize subscription using Router
   * Navigates to the customization page with the selected plan
   */
  proceedToSubscription(): void {
    if (!this.selectedPlan) {
      console.error('[VIP] ❌ No plan selected!');
      return;
    }
    
    console.log('[VIP] 🚀 Navigating to customize with plan:', this.selectedPlan.name);
    console.log('[VIP] 📦 Plan data:', JSON.stringify(this.selectedPlan));
    
    // Using Router with state
    this.router.navigate(['/customize-subscription'], {
      state: {
        plan: this.selectedPlan,
        source: 'vip-membership'
      }
    });
  }

  /**
   * Join VIP - Navigate to customize subscription
   */
  joinVIP(): void {
    if (!this.selectedPlan) {
      console.error('[VIP] ❌ No plan selected!');
      return;
    }
    
    console.log('[VIP] 🚀 Joining VIP with plan:', this.selectedPlan.name);
    this.router.navigate(['/customize-subscription'], {
      state: {
        plan: this.selectedPlan,
        isNewMember: true,
        source: 'join-vip'
      }
    });
  }

  /**
   * Renew membership - Navigate to customize subscription
   */
  renewMembership(): void {
    if (!this.selectedPlan) {
      console.error('[VIP] ❌ No plan selected!');
      return;
    }
    
    console.log('[VIP] 🚀 Renewing membership with plan:', this.selectedPlan.name);
    this.router.navigate(['/customize-subscription'], {
      state: {
        plan: this.selectedPlan,
        isRenewal: true,
        source: 'renew-membership'
      }
    });
  }

  /**
   * Cancel membership
   */
  cancelMembership(): void {
    console.log('[VIP] Cancelling membership');
    if (confirm('Are you sure you want to cancel your VIP membership?')) {
      this.isVIPActive = false;
      alert('VIP membership cancelled successfully');
    }
  }

  /**
   * View full schedule
   */
  viewFullSchedule(): void {
    console.log('[VIP] Viewing full schedule');
    // Navigate to schedule page if needed
  }

  /**
   * Go back
   */
  goBack(): void {
    this.navCtrl.back();
  }

  /**
   * Navigate to a page
   */
  navigateTo(page: string): void {
    this.navCtrl.navigateForward(`/${page}`);
  }

  /**
   * Check if route is active
   */
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  /**
   * Utility: Get plan by ID
   */
  getPlanById(id: string): any {
    return this.plans.find(p => p.id === id);
  }

  /**
   * Utility: Check if plan is selected
   */
  isPlanSelected(planId: string): boolean {
    return this.selectedPlan?.id === planId;
  }

  /**
   * Utility: Get plan features for display
   */
  getPlanFeatures(plan: any): string[] {
    return plan?.features || [];
  }

  /**
   * Utility: Get formatted price with currency
   */
  getFormattedPrice(plan: any): string {
    if (!plan) return '';
    return `${plan.price}/month`;
  }

  /**
   * Utility: Get max washes label
   */
  getMaxWashesLabel(plan: any): string {
    if (!plan || !plan.maxDays) return '';
    return `${plan.maxDays} washes/month`;
  }

  /**
   * Utility: Get plan color gradient
   */
  getPlanColor(plan: any): string {
    return plan?.color || 'linear-gradient(135deg, #94a3b8, #64748b)';
  }

  /**
   * Utility: Check if plan is popular
   */
  isPlanPopular(plan: any): boolean {
    return plan?.popular || false;
  }

  /**
   * Utility: Get plan features count
   */
  getPlanFeaturesCount(plan: any): number {
    return plan?.features?.length || 0;
  }
}

export default VipMembershipPage;