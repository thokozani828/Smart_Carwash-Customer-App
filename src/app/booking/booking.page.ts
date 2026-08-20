import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  carOutline, 
  constructOutline, 
  locationOutline, 
  navigateOutline, 
  calendarOutline, 
  timeOutline, 
  cardOutline, 
  cashOutline, 
  createOutline, 
  homeOutline,
  starOutline,
  phonePortraitOutline,
  swapHorizontalOutline,
  locateOutline,
  checkmarkOutline,
  addCircleOutline,
  arrowForwardOutline,
  chevronDownOutline,
  lockClosedOutline,
  sparklesOutline,
  waterOutline,
  diamondOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingPage implements OnInit {
  
  // Loading state
  isLoading: boolean = true;
  
  // ✅ Holds the clicked car wash data from the map page
  carwash: any = null;

  // Vehicles
  vehicles: any[] = [];
  selectedVehicle: any = null;
  showVehicles: boolean = false;

  // Services
  services: any[] = [];
  selectedService: any = null;

  // Wash Type
  washType: string = 'onsite';
  userLocation: string = '';

  // Payment Method
  paymentMethod: string = '';

  // Date & Time
  availableDates: any[] = [];
  selectedDate: string = '';

  availableTimes: string[] = [];
  selectedTime: string = '';

  // Notes
  notes: string = '';

  // Current route for bottom nav
  currentRoute: string = 'booking';

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    // ✅ Register icons
    addIcons({
      arrowBackOutline, carOutline, constructOutline, locationOutline, navigateOutline, 
      calendarOutline, timeOutline, cardOutline, cashOutline, createOutline, homeOutline,
      starOutline, phonePortraitOutline, swapHorizontalOutline, locateOutline, 
      checkmarkOutline, addCircleOutline, arrowForwardOutline, chevronDownOutline, 
      lockClosedOutline, sparklesOutline, waterOutline, diamondOutline
    });

    // Track current route
    this.currentRoute = this.router.url.split('/')[1] || 'booking';
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'booking';
    });
  }

  /**
   * Initialize - Load data with skeleton
   */
  ngOnInit(): void {
    // ✅ FIX: Use this.router.getCurrentNavigation() instead of navCtrl
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.carwash = navigation.extras.state['carwash'];
    }

    // Then load the form data
    this.loadData();
  }

  /**
   * Load all data with skeleton loading
   */
  loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.vehicles = [
        { id: 1, name: 'BMW X5', plate: 'ABC 123 GP' },
        { id: 2, name: 'Mercedes C-Class', plate: 'DEF 456 GP' },
        { id: 3, name: 'Toyota Corolla', plate: 'GHI 789 GP' },
        { id: 4, name: 'Audi A4', plate: 'JKL 012 GP' }
      ];

      this.services = [
        { id: 1, name: 'Exterior Wash', icon: 'water-outline', price: 'R180', duration: '30 min', color: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
        { id: 2, name: 'Interior Detail', icon: 'sparkles-outline', price: 'R280', duration: '45 min', color: 'linear-gradient(135deg, #f472b6, #ec4899)' },
        { id: 3, name: 'Premium Wash', icon: 'star-outline', price: 'R350', duration: '60 min', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
        { id: 4, name: 'Full Detail', icon: 'diamond-outline', price: 'R550', duration: '90 min', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
      ];

      this.availableDates = [
        { day: 'Mon', number: '17', value: '2026-07-17' },
        { day: 'Tue', number: '18', value: '2026-07-18' },
        { day: 'Wed', number: '19', value: '2026-07-19' },
        { day: 'Thu', number: '20', value: '2026-07-20' },
        { day: 'Fri', number: '21', value: '2026-07-21' },
        { day: 'Sat', number: '22', value: '2026-07-22' },
        { day: 'Sun', number: '23', value: '2026-07-23' }
      ];

      this.availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
      
      // Set default selections
      this.selectedDate = '2026-07-17';
      this.isLoading = false;
    }, 2000);
  }

  /**
   * Navigate to a page (for bottom nav)
   */
  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.navCtrl.back();
  }

  /**
   * Toggle vehicle selector
   */
  toggleVehicleSelector(): void {
    this.showVehicles = !this.showVehicles;
  }

  /**
   * Select vehicle
   */
  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
    this.showVehicles = false;
  }

  /**
   * Add new vehicle - Navigate to vehicles page
   */
  addVehicle(): void {
    this.showVehicles = false;
    console.log('[Booking] Navigating to vehicles page to add vehicle');
    this.router.navigate(['/vehicles']);
  }

  /**
   * Select service
   */
  selectService(service: any): void {
    this.selectedService = service;
  }

  /**
   * Select wash type
   */
  selectWashType(type: string): void {
    this.washType = type;
    // Reset payment method if mobile is selected and cash was selected
    if (type === 'mobile' && this.paymentMethod === 'cash') {
      this.paymentMethod = '';
    }
  }

  /**
   * Check if cash payment is available
   * Cash is only available for on-site wash
   */
  isCashAvailable(): boolean {
    return this.washType === 'onsite';
  }

  /**
   * Get user location
   */
  getLocation(): void {
    console.log('[Booking] Getting location');
    this.userLocation = '123 Main Street, Sandton';
  }

  /**
   * Select date
   */
  selectDate(date: string): void {
    this.selectedDate = date;
  }

  /**
   * Select time
   */
  selectTime(time: string): void {
    this.selectedTime = time;
  }

  /**
   * Select payment method
   */
  selectPaymentMethod(method: string): void {
    // Prevent cash selection for mobile wash
    if (method === 'cash' && !this.isCashAvailable()) {
      console.log('[Booking] Cash payment not available for mobile wash');
      return;
    }
    this.paymentMethod = method;
  }

  /**
   * Get payment method name
   */
  getPaymentMethodName(): string {
    const methods: { [key: string]: string } = {
      card: 'Card Payment',
      eft: 'EFT Payment',
      mobile: 'Mobile Payment',
      cash: 'Cash Payment'
    };
    return methods[this.paymentMethod] || '';
  }

  /**
   * Get total amount
   */
  getTotalAmount(): string {
    if (this.selectedService) {
      return this.selectedService.price;
    }
    return 'R0.00';
  }

  /**
   * Check if form is valid
   */
  isFormValid(): boolean {
    // Base validations
    if (!this.selectedVehicle || !this.selectedService || !this.selectedTime || !this.paymentMethod) {
      return false;
    }
    
    // Mobile specific validation - location required for mobile wash
    if (this.washType === 'mobile' && !this.userLocation) {
      return false;
    }
    
    return true;
  }

  /**
   * Get booking details for confirmation
   */
  getBookingDetails(): any {
    const details: any = {
      vehicle: this.selectedVehicle,
      service: this.selectedService,
      washType: this.washType,
      date: this.selectedDate,
      time: this.selectedTime,
      paymentMethod: this.paymentMethod,
      notes: this.notes
    };
    
    // Add location only for mobile wash
    if (this.washType === 'mobile') {
      details.location = this.userLocation;
    }
    
    return details;
  }

  /**
   * Confirm booking - Navigate based on payment method
   */
  confirmBooking(): void {
    if (!this.isFormValid()) {
      console.log('[Booking] Form is invalid');
      return;
    }

    const bookingData = this.getBookingDetails();
    console.log('[Booking] Booking data:', bookingData);

    // Navigate based on payment method
    if (this.paymentMethod === 'cash') {
      this.navCtrl.navigateForward('/cash-payment', {
        state: { booking: bookingData }
      });
    } else {
      this.navCtrl.navigateForward('/booking-confirmation', {
        state: { booking: bookingData }
      });
    }
  }
}