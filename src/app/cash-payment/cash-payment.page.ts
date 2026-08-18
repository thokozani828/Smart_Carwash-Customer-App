import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.page.html',
  styleUrls: ['./cash-payment.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CashPaymentPage implements OnInit {
  
  bookingData: any = null;
  bookingReference: string = '';
  totalAmount: string = 'R350.00';
  bookingCreated: boolean = false;
  isLoading: boolean = true; // Add loading state for skeleton
  
  priceBreakdown: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Load data with skeleton
    this.loadData();
  }

  /**
   * Load data with skeleton loading
   */
  loadData(): void {
    // Show skeleton
    this.isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
      // Get booking data from navigation state
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.bookingData = navigation.extras.state['booking'];
        this.totalAmount = this.calculateTotal();
      }
      
      // Generate booking reference
      this.bookingReference = this.generateReference();
      
      // Build price breakdown
      this.buildPriceBreakdown();
      
      // Hide skeleton
      this.isLoading = false;
    }, 1500); // 1.5 second loading simulation
  }

  /**
   * Build price breakdown
   */
  buildPriceBreakdown(): void {
    const servicePrice = this.bookingData?.service?.price || 'R350.00';
    const packagePrice = this.bookingData?.package?.price || null;
    
    this.priceBreakdown = [
      { label: 'Service Fee', value: servicePrice, isDiscount: false, isTotal: false }
    ];
    
    if (packagePrice) {
      this.priceBreakdown.push({ 
        label: 'Package Discount', 
        value: `-${packagePrice}`, 
        isDiscount: true, 
        isTotal: false 
      });
    }
    
    this.priceBreakdown.push({ 
      label: 'VAT (15%)', 
      value: this.calculateVAT(), 
      isDiscount: false, 
      isTotal: false 
    });
    
    this.priceBreakdown.push({ 
      label: 'Total Amount', 
      value: this.totalAmount, 
      isDiscount: false, 
      isTotal: true 
    });
  }

  /**
   * Generate booking reference
   */
  generateReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SCW-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Calculate VAT
   */
  calculateVAT(): string {
    const servicePrice = this.bookingData?.service?.price || 'R350.00';
    const price = parseFloat(servicePrice.replace('R', ''));
    const vat = price * 0.15;
    return 'R' + vat.toFixed(2);
  }

  /**
   * Calculate total
   */
  calculateTotal(): string {
    const servicePrice = this.bookingData?.service?.price || 'R350.00';
    const price = parseFloat(servicePrice.replace('R', ''));
    const total = price + (price * 0.15);
    return 'R' + total.toFixed(2);
  }

  /**
   * Confirm cash payment - Create booking with pending status
   */
  confirmCashPayment(): void {
    // Show loading on button
    this.isLoading = true;
    
    setTimeout(() => {
      // Create the booking with pending payment status
      const booking = {
        reference: this.bookingReference,
        customer: 'John Doe', // This would come from user data
        vehicle: this.bookingData?.vehicle?.name || 'BMW X5',
        service: this.bookingData?.service?.name || 'Premium Wash',
        package: this.bookingData?.package?.name || 'Premium',
        branch: this.bookingData?.branch?.name || 'Sandton City',
        date: this.bookingData?.date || '17 July 2026',
        time: this.bookingData?.time || '10:30 AM',
        washType: this.bookingData?.washType === 'mobile' ? 'Mobile Wash' : 'On-site Wash',
        location: this.bookingData?.location || null,
        totalAmount: this.totalAmount,
        paymentMethod: 'Cash',
        paymentStatus: 'Pending',
        bookingStatus: 'Confirmed - Awaiting Payment',
        createdAt: new Date().toISOString(),
        notes: this.bookingData?.notes || null
      };

      console.log('[CashPayment] Booking created with pending payment:', booking);
      
      // Show confirmation message
      this.bookingCreated = true;
      
      // Navigate to booking confirmation with pending status
      this.navCtrl.navigateForward('/booking-confirmation', {
        state: {
          booking: {
            ...this.bookingData,
            paymentMethod: 'cash',
            paymentStatus: 'pending',
            bookingReference: this.bookingReference,
            totalAmount: this.totalAmount,
            isCashPayment: true
          }
        }
      });
      
      // Reset loading state
      this.isLoading = false;
    }, 800);
  }

  /**
   * Change payment method
   */
  changePaymentMethod(): void {
    console.log('[CashPayment] Changing payment method');
    this.navCtrl.back();
  }

  /**
   * Go to home
   */
  goHome(): void {
    console.log('[CashPayment] Going home');
    this.navCtrl.navigateRoot('/home');
  }

  /**
   * Go back
   */
  goBack(): void {
    this.navCtrl.back();
  }
}