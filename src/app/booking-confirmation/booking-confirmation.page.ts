import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.page.html', // Changed to match file name
  styleUrls: ['./booking-confirmation.page.scss'], // Changed to match file name
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingConfirmationPage {  // Changed from ConfirmationPage to BookingConfirmationPage
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Booking data from navigation state
  bookingData: any = null;

  // Payment state
  paymentProcessed: boolean = false;
  paymentStatus: string = 'Initializing payment...';
  paymentProgress: number = 0;

  // Booking reference
  bookingReference: string = '';
  currentDate: string = '';
  transactionId: string = '';

  // Price breakdown
  priceBreakdown: any[] = [];

  // Booking details
  bookingDetails: any[] = [];

  // Current route
  currentRoute: string = 'booking-confirmation';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'booking-confirmation';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'booking-confirmation';
    });
  }

  ngOnInit(): void {
    // Get booking data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.bookingData = navigation.extras.state['booking'];
      console.log('[Confirmation] Booking data:', this.bookingData);
    }
    
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      // Generate booking reference
      this.bookingReference = 'BK' + Date.now().toString().slice(-6);
      this.currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      this.transactionId = 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase();

      // Build booking details
      this.bookingDetails = [
        { label: 'Service', value: this.bookingData?.service?.name || 'Premium Wash' },
        { label: 'Vehicle', value: this.bookingData?.vehicle?.name || 'BMW X5' },
        { label: 'Branch', value: this.bookingData?.branch?.name || 'Sandton City' },
        { label: 'Date', value: this.bookingData?.date || '2026-07-20' },
        { label: 'Time', value: this.bookingData?.time || '10:30 AM' },
        { label: 'Payment Method', value: this.bookingData?.paymentMethod || 'Card', isPayment: true }
      ];

      // Build price breakdown
      const servicePrice = this.bookingData?.service?.price || 'R350';
      const servicePriceNumber = parseInt(servicePrice.replace(/[^0-9]/g, ''));
      
      this.priceBreakdown = [
        { label: 'Service', value: servicePrice },
        { label: 'VAT (15%)', value: `R${Math.round(servicePriceNumber * 0.15)}` },
        { label: 'Discount', value: '- R0.00', isDiscount: true },
        { label: 'Total', value: `R${Math.round(servicePriceNumber * 1.15)}`, isTotal: true }
      ];

      // Start payment processing (if not cash)
      if (!this.bookingData?.isCashPayment) {
        this.processPayment();
      } else {
        this.paymentProcessed = true;
      }

      this.isLoading = false;
    }, 1500);
  }

  /**
   * Process payment with animation
   */
  processPayment(): void {
    this.paymentStatus = 'Initializing payment...';
    this.paymentProgress = 0;

    setTimeout(() => {
      this.paymentStatus = 'Processing card...';
      this.paymentProgress = 20;
    }, 1000);

    setTimeout(() => {
      this.paymentStatus = 'Verifying payment...';
      this.paymentProgress = 40;
    }, 2000);

    setTimeout(() => {
      this.paymentStatus = 'Authorizing transaction...';
      this.paymentProgress = 60;
    }, 3000);

    setTimeout(() => {
      this.paymentStatus = 'Completing payment...';
      this.paymentProgress = 80;
    }, 4000);

    setTimeout(() => {
      this.paymentStatus = 'Payment successful!';
      this.paymentProgress = 100;
      this.paymentProcessed = true;
    }, 5000);
  }

  /**
   * Calculate total
   */
  calculateTotal(): string {
    const total = this.priceBreakdown.find(item => item.isTotal);
    return total ? total.value : 'R0.00';
  }

  /**
   * View booking
   */
  viewBooking(): void {
    console.log('[Confirmation] Viewing booking');
    this.navCtrl.navigateForward('/booking-details', {
      state: { booking: this.bookingData }
    });
  }

  /**
   * Download receipt
   */
  downloadReceipt(): void {
    console.log('[Confirmation] Downloading receipt');
    alert('📄 Receipt downloaded successfully!');
  }

  /**
   * Get directions to branch
   */
  getDirections(): void {
    console.log('[Confirmation] Getting directions');
    alert('📍 Opening maps to branch location...');
  }

  /**
   * View branch details
   */
  viewBranchDetails(): void {
    console.log('[Confirmation] Viewing branch details');
    this.navCtrl.navigateForward('/branch-details', {
      state: { branch: this.bookingData?.branch }
    });
  }

  /**
   * Go to home page
   */
  goHome(): void {
    this.navCtrl.navigateRoot('/home');
  }

  /**
   * Navigate to a page
   */
  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }
}