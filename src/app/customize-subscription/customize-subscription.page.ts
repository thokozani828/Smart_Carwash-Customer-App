import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customize-subscription',
  templateUrl: './customize-subscription.page.html',
  styleUrls: ['./customize-subscription.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomizeSubscriptionPage implements OnInit {
  
  isLoading: boolean = true;
  selectedPlan: any = null;
  maxDaysPerWeek: number = 1;
  selectedWeek: number = 0;
  isRenewal: boolean = false;
  
  // Service Type
  selectedServiceType: string = 'onsite'; // 'mobile' or 'onsite'
  serviceFee: number = 50; // R50 for mobile service
  
  // ==========================
  // ADDRESS PROPERTIES
  // ==========================
  serviceAddress: string = '';
  addressSuggestions: string[] = [];
  isAddressValid: boolean = false;
  
  // Weeks data - 4 weeks with dates
  weeks: any[] = [];
  
  // Time slots
  timeSlots = [
    { label: '8:00 AM', value: '08:00', period: 'Morning' },
    { label: '10:00 AM', value: '10:00', period: 'Morning' },
    { label: '1:00 PM', value: '13:00', period: 'Afternoon' },
    { label: '3:00 PM', value: '15:00', period: 'Afternoon' }
  ];
  
  selectedTime: string | null = null;

  // Fallback plans
  private fallbackPlans = [
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
      // Try to get the plan from navigation state
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state as { plan?: any, isRenewal?: boolean };
      
      console.log('[Customize] 🔍 Navigation state:', state);
      
      if (state?.plan) {
        this.selectedPlan = state.plan;
        this.isRenewal = state.isRenewal || false;
        
        console.log('[Customize] ✅ Received plan from state:', this.selectedPlan.name);
        console.log('[Customize] 📊 Plan details:', {
          id: this.selectedPlan.id,
          name: this.selectedPlan.name,
          price: this.selectedPlan.price,
          maxDays: this.selectedPlan.maxDays,
          features: this.selectedPlan.features
        });
        
        // Calculate max days per week
        this.maxDaysPerWeek = Math.ceil(this.selectedPlan.maxDays / 4);
        if (this.maxDaysPerWeek < 1) this.maxDaysPerWeek = 1;
        
        console.log('[Customize] 📋 Days per week:', this.maxDaysPerWeek);
      } else {
        // Try to get from history state (for reload scenarios)
        const historyState = window.history.state as any;
        if (historyState?.plan) {
          this.selectedPlan = historyState.plan;
          this.isRenewal = historyState.isRenewal || false;
          
          console.log('[Customize] ✅ Received plan from history state:', this.selectedPlan.name);
          
          // Calculate max days per week
          this.maxDaysPerWeek = Math.ceil(this.selectedPlan.maxDays / 4);
          if (this.maxDaysPerWeek < 1) this.maxDaysPerWeek = 1;
        } else {
          console.warn('[Customize] ⚠️ No plan found, using fallback');
          this.selectedPlan = this.fallbackPlans.find(p => p.id === 'premium') || this.fallbackPlans[0];
          this.maxDaysPerWeek = Math.ceil(this.selectedPlan.maxDays / 4);
          if (this.maxDaysPerWeek < 1) this.maxDaysPerWeek = 1;
        }
      }
      
      // Generate 4 weeks of dates
      this.generateWeeks();
      
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Generate 4 weeks of dates
   */
  generateWeeks(): void {
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Find the start of the current week (Sunday)
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    
    this.weeks = [];
    
    for (let week = 0; week < 4; week++) {
      const weekStart = new Date(startOfWeek);
      weekStart.setDate(startOfWeek.getDate() + (week * 7));
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const days = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + day);
        
        // Check if this day is in the past
        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
        
        days.push({
          name: dayNames[date.getDay()],
          date: date.getDate().toString().padStart(2, '0'),
          fullDate: date,
          selected: false,
          dayOfWeek: date.getDay(),
          isPast: isPast,
          fullDateString: date.toISOString().split('T')[0],
          month: date.getMonth() + 1,
          year: date.getFullYear()
        });
      }
      
      this.weeks.push({
        startDate: `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')}`,
        endDate: `${weekEnd.getDate().toString().padStart(2, '0')}/${(weekEnd.getMonth() + 1).toString().padStart(2, '0')}`,
        days: days,
        weekNumber: week + 1,
        startFullDate: weekStart,
        endFullDate: weekEnd
      });
    }
  }

  /**
   * Select a week tab
   */
  selectWeek(index: number): void {
    this.selectedWeek = index;
  }

  /**
   * Select service type
   */
  selectServiceType(type: string): void {
    this.selectedServiceType = type;
    console.log('[Customize] Service type selected:', type);
    
    // Reset address if switching to onsite
    if (type === 'onsite') {
      this.serviceAddress = '';
      this.addressSuggestions = [];
      this.isAddressValid = false;
    }
  }

  // ==========================
  // ADDRESS METHODS
  // ==========================

  /**
   * Handle address change
   */
  onAddressChange(): void {
    // You can add address autocomplete/suggestion logic here
    if (this.serviceAddress.length > 2) {
      // Example: fetch address suggestions from API
      // For now, just show some mock suggestions
      this.addressSuggestions = [
        `${this.serviceAddress}, Cape Town`,
        `${this.serviceAddress}, Johannesburg`,
        `${this.serviceAddress}, Durban`
      ];
      this.isAddressValid = false;
    } else {
      this.addressSuggestions = [];
      this.isAddressValid = false;
    }
  }

  /**
   * Select address suggestion
   */
  selectSuggestion(suggestion: string): void {
    this.serviceAddress = suggestion;
    this.addressSuggestions = [];
    this.isAddressValid = true;
    
    console.log('[Customize] Address selected:', this.serviceAddress);
  }

  /**
   * Clear address
   */
  clearAddress(): void {
    this.serviceAddress = '';
    this.addressSuggestions = [];
    this.isAddressValid = false;
  }

  /**
   * Toggle day selection for a specific week
   */
  toggleDay(weekIndex: number, date: string): void {
    const week = this.weeks[weekIndex];
    const day = week.days.find((d: any) => d.date === date);
    
    if (!day) return;
    
    // Don't allow selecting past days
    if (day.isPast) {
      this.showMessage('Cannot select past dates');
      return;
    }
    
    // Check if the total selected days has reached the plan limit
    if (!day.selected && this.totalSelectedDays >= this.selectedPlan.maxDays) {
      this.showMessage(`You've reached the maximum of ${this.selectedPlan.maxDays} days for your ${this.selectedPlan.name} package.`);
      return;
    }
    
    if (day.selected) {
      // Remove day if already selected
      day.selected = false;
    } else if (this.getWeekSelectedCount(weekIndex) < this.maxDaysPerWeek) {
      // Add day if under max limit for this week
      day.selected = true;
    } else {
      this.showMessage(`You can only select ${this.maxDaysPerWeek} day${this.maxDaysPerWeek > 1 ? 's' : ''} per week for your ${this.selectedPlan.name} package.`);
    }
  }

  /**
   * Show message
   */
  showMessage(message: string): void {
    // Using alert for simplicity - can be replaced with toast
    alert(message);
  }

  /**
   * Get selected count for a specific week
   */
  getWeekSelectedCount(weekIndex: number): number {
    return this.weeks[weekIndex]?.days.filter((d: any) => d.selected).length || 0;
  }

  /**
   * Get total selected days across all weeks
   */
  get totalSelectedDays(): number {
    let total = 0;
    this.weeks.forEach(week => {
      total += week.days.filter((d: any) => d.selected).length;
    });
    return total;
  }

  /**
   * Get all selected days across all weeks
   */
  getAllSelectedDays(): any[] {
    const selected: any[] = [];
    this.weeks.forEach((week, weekIndex) => {
      week.days.forEach((day: any) => {
        if (day.selected) {
          selected.push({
            week: weekIndex,
            weekNumber: week.weekNumber,
            dayName: day.name,
            date: day.date,
            fullDate: day.fullDate,
            fullDateString: day.fullDateString,
            month: day.month,
            year: day.year
          });
        }
      });
    });
    return selected;
  }

  /**
   * Remove a day from selection
   */
  removeDay(weekIndex: number, date: string): void {
    const week = this.weeks[weekIndex];
    const day = week.days.find((d: any) => d.date === date);
    if (day) {
      day.selected = false;
    }
  }

  /**
   * Select time slot
   */
  selectTime(time: string): void {
    this.selectedTime = this.selectedTime === time ? null : time;
  }

  /**
   * Get time label from value
   */
  getTimeLabel(value: string): string {
    const slot = this.timeSlots.find(t => t.value === value);
    return slot ? slot.label : value;
  }

  /**
   * Calculate total amount with service fee
   */
  calculateTotal(): string {
    if (!this.selectedPlan) return 'R0';
    
    let total = parseFloat(this.selectedPlan.price.replace('R', ''));
    
    if (this.selectedServiceType === 'mobile') {
      total += this.serviceFee;
    }
    
    return `R${total}`;
  }

  /**
   * Check if all requirements are met (updated)
   */
  canProceed(): boolean {
    if (!this.selectedServiceType) return false;
    if (this.selectedServiceType === 'mobile' && !this.serviceAddress) return false;
    if (this.totalSelectedDays === 0) return false;
    if (!this.selectedTime) return false;
    return true;
  }

  /**
   * Proceed to payment
   */
  proceedToPayment(): void {
    if (!this.canProceed()) {
      return;
    }
    
    // Get all selected days with full details
    const selectedDays = this.getAllSelectedDays();
    
    // Group selected days by week
    const weeksWithSelectedDays = this.weeks.map(week => ({
      weekNumber: week.weekNumber,
      startDate: week.startDate,
      endDate: week.endDate,
      days: week.days.filter((d: any) => d.selected).map((d: any) => ({
        name: d.name,
        date: d.date,
        fullDate: d.fullDate,
        fullDateString: d.fullDateString
      }))
    })).filter(week => week.days.length > 0);
    
    const subscriptionData = {
      plan: {
        id: this.selectedPlan.id,
        name: this.selectedPlan.name,
        price: this.selectedPlan.price,
        maxDays: this.selectedPlan.maxDays,
        color: this.selectedPlan.color,
        popular: this.selectedPlan.popular,
        features: this.selectedPlan.features
      },
      selectedDays: selectedDays,
      selectedTime: this.selectedTime,
      totalWashes: this.totalSelectedDays,
      totalAmount: this.calculateTotal(),
      isRenewal: this.isRenewal,
      weeks: weeksWithSelectedDays,
      maxDaysPerWeek: this.maxDaysPerWeek,
      packageName: this.selectedPlan.name,
      packageMaxDays: this.selectedPlan.maxDays,
      serviceType: this.selectedServiceType,
      serviceFee: this.selectedServiceType === 'mobile' ? this.serviceFee : 0,
      serviceAddress: this.selectedServiceType === 'mobile' ? this.serviceAddress : ''
    };
    
    console.log('[CustomizeSubscription] 📤 Proceeding to payment with package:', this.selectedPlan.name);
    console.log('[CustomizeSubscription] 📤 Service type:', this.selectedServiceType);
    console.log('[CustomizeSubscription] 📤 Service address:', this.serviceAddress);
    console.log('[CustomizeSubscription] 📤 Total amount:', this.calculateTotal());
    
    this.router.navigate(['/vip-payment'], {
      state: {
        subscription: subscriptionData
      }
    });
  }

  /**
   * Go back
   */
  goBack(): void {
    this.navCtrl.back();
  }
}

export default CustomizeSubscriptionPage;