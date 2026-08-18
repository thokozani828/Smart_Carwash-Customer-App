import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vip-payment',
  templateUrl: './vip-payment.page.html',
  styleUrls: ['./vip-payment.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VipPaymentPage implements OnInit {
  
  isLoading: boolean = true;
  planData: any = null;
  subscriptionData: any = null;
  selectedPayment: string | null = null;
  processing: boolean = false;
  paymentSuccess: boolean = false;
  
  // Default plan if no data is passed
  private defaultPlan = {
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
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * Load data from navigation state
   */
  loadData(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state as { subscription?: any };
      
      console.log('[VIP Payment] 🔍 Navigation state:', state);
      
      if (state?.subscription) {
        this.subscriptionData = state.subscription;
        this.planData = this.subscriptionData.plan || this.defaultPlan;
        
        console.log('[VIP Payment] ✅ Received subscription data:', this.subscriptionData);
        console.log('[VIP Payment] 📊 Plan:', this.planData?.name);
        console.log('[VIP Payment] 📅 Days selected:', this.subscriptionData.totalWashes);
        console.log('[VIP Payment] ⏰ Time:', this.subscriptionData.selectedTime);
      } else {
        // Try to get from history state
        const historyState = window.history.state as any;
        if (historyState?.subscription) {
          this.subscriptionData = historyState.subscription;
          this.planData = this.subscriptionData.plan || this.defaultPlan;
          console.log('[VIP Payment] ✅ Received from history state');
        } else {
          console.warn('[VIP Payment] ⚠️ No subscription data found, using default');
          this.planData = this.defaultPlan;
          this.subscriptionData = {
            plan: this.defaultPlan,
            totalWashes: 4,
            selectedDays: ['Monday', 'Wednesday', 'Friday'],
            selectedTime: '08:00',
            weeks: [{ weekNumber: 1, days: [] }]
          };
        }
      }
      
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Select payment method
   */
  selectPayment(method: string): void {
    this.selectedPayment = this.selectedPayment === method ? null : method;
    console.log('[VIP Payment] Payment method selected:', this.selectedPayment);
  }

  /**
   * Calculate VAT
   */
  calculateVAT(): string {
    const price = parseFloat((this.planData?.price || 'R399').replace('R', ''));
    const vat = price * 0.15;
    return 'R' + vat.toFixed(2);
  }

  /**
   * Calculate total
   */
  calculateTotal(): string {
    const price = parseFloat((this.planData?.price || 'R399').replace('R', ''));
    const total = price + (price * 0.15);
    return 'R' + total.toFixed(2);
  }

  /**
   * Get selected days display
   */
  getSelectedDaysDisplay(): string {
    if (!this.subscriptionData?.selectedDays) return 'Not specified';
    
    const days = this.subscriptionData.selectedDays;
    if (days.length === 0) return 'No days selected';
    
    if (days.length <= 3) {
      return days.join(', ');
    }
    
    return days.slice(0, 3).join(', ') + ` +${days.length - 3} more`;
  }

  /**
   * Process payment
   */
  processPayment(): void {
    if (!this.selectedPayment || this.processing) {
      return;
    }
    
    this.processing = true;
    console.log('[VIP Payment] Processing payment with method:', this.selectedPayment);
    
    // Simulate payment processing
    setTimeout(() => {
      this.processing = false;
      this.paymentSuccess = true;
      
      console.log('[VIP Payment] ✅ Payment successful!');
      
      // Navigate to success or VIP home after animation
      setTimeout(() => {
        this.router.navigate(['/vip-home'], {
          state: {
            subscription: this.subscriptionData,
            paymentMethod: this.selectedPayment
          }
        });
      }, 3000);
    }, 3000);
  }

  /**
   * Go back
   */
  goBack(): void {
    this.navCtrl.back();
  }
}

export default VipPaymentPage;