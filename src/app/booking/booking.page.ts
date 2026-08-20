import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
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
  diamondOutline,
  closeOutline,
  personOutline,
  shieldCheckmarkOutline,
  flashOutline,
  giftOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingPage implements OnInit {
  
  isLoading: boolean = true;
  currentRoute: string = 'booking';

  // Carwash data
  carwash: any = {
    name: 'Washfy Central',
    address: '123 Main Street, Durban',
    logo: 'https://via.placeholder.com/60x60',
    rating: 4.8,
    waitTime: 15
  };

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

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    // Register all icons
    addIcons({
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
      diamondOutline,
      closeOutline,
      personOutline,
      shieldCheckmarkOutline,
      flashOutline,
      giftOutline
    });

    // Track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url.split('/')[1] || 'booking';
    });
  }

  ngOnInit(): void {
    // Get carwash data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.carwash = navigation.extras.state['carwash'] || this.carwash;
    }
    this.loadData();
  }

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
    }, 1500);
  }

  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  goBack(): void {
    this.navCtrl.back();
  }

  toggleVehicleSelector(): void {
    this.showVehicles = !this.showVehicles;
  }

  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
    this.showVehicles = false;
  }

  addVehicle(): void {
    this.showVehicles = false;
    this.navCtrl.navigateForward('/vehicles');
  }

  selectService(service: any): void {
    this.selectedService = service;
  }

  selectWashType(type: string): void {
    this.washType = type;
    if (type === 'mobile' && this.paymentMethod === 'cash') {
      this.paymentMethod = '';
    }
  }

  isCashAvailable(): boolean {
    return this.washType === 'onsite';
  }

  getLocation(): void {
    this.userLocation = '123 Main Street, Sandton';
  }

  selectDate(date: string): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  selectPaymentMethod(method: string): void {
    if (method === 'cash' && !this.isCashAvailable()) {
      return;
    }
    this.paymentMethod = method;
  }

  getTotalAmount(): string {
    return this.selectedService ? this.selectedService.price : 'R0.00';
  }

  isFormValid(): boolean {
    if (!this.selectedVehicle || !this.selectedService || !this.selectedTime || !this.paymentMethod) {
      return false;
    }
    if (this.washType === 'mobile' && !this.userLocation) {
      return false;
    }
    return true;
  }

  confirmBooking(): void {
    if (!this.isFormValid()) return;

    const bookingData = {
      vehicle: this.selectedVehicle,
      service: this.selectedService,
      washType: this.washType,
      date: this.selectedDate,
      time: this.selectedTime,
      paymentMethod: this.paymentMethod,
      notes: this.notes,
      location: this.washType === 'mobile' ? this.userLocation : null
    };

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