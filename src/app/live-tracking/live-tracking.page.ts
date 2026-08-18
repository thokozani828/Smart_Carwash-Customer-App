import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircle, 
  listOutline,
  personOutline,
  carOutline,
  locationOutline,
  timeOutline,
  refreshOutline,
  chatbubbleOutline,
  homeOutline,
  calendarOutline,
  starOutline,
  arrowBackOutline,
  checkmark
} from 'ionicons/icons';

@Component({
  selector: 'app-live-tracking',
  templateUrl: './live-tracking.page.html',
  styleUrls: ['./live-tracking.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiveTrackingPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;
  
  bookingStatus: string = 'In Progress';
  estimatedTime: string = '15-20 min';
  washerAssigned: string = 'Thabo M';
  queuePosition: number = 3;
  progressPercentage: number = 65;

  vehicleName: string = 'BMW X5';
  vehicleDesc: string = 'Blue · 2022 Model';
  vehicleLocation: string = 'Wash Bay 2';
  vehicleColor: string = 'linear-gradient(135deg, #2563eb, #1d4ed8)';

  progressSteps = [
    { number: 1, label: 'Booked', completed: true, active: false },
    { number: 2, label: 'Washing', completed: true, active: false },
    { number: 3, label: 'Drying', completed: false, active: true },
    { number: 4, label: 'Complete', completed: false, active: false }
  ];

  liveUpdates = [
    { time: '10:30', message: 'Booking confirmed', type: 'info' },
    { time: '10:35', message: 'Vehicle arrived at wash bay', type: 'info' },
    { time: '10:40', message: 'Pre-wash inspection complete', type: 'success' },
    { time: '10:45', message: 'Washing in progress', type: 'info' },
    { time: '10:50', message: 'Washer assigned: Thabo M', type: 'info' },
    { time: '10:55', message: 'Rinse cycle complete', type: 'success' },
    { time: '11:00', message: 'Drying in progress', type: 'warning' }
  ];

  // Current route for bottom nav
  currentRoute: string = 'live-tracking';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    // Register icons directly in this component
    addIcons({
      'checkmark-circle': checkmarkCircle,
      'list-outline': listOutline,
      'person-outline': personOutline,
      'car-outline': carOutline,
      'location-outline': locationOutline,
      'time-outline': timeOutline,
      'refresh-outline': refreshOutline,
      'chatbubble-outline': chatbubbleOutline,
      'home-outline': homeOutline,
      'calendar-outline': calendarOutline,
      'star-outline': starOutline,
      'arrow-back-outline': arrowBackOutline,
      'checkmark': checkmark
    });
    
    this.currentRoute = this.router.url.split('/')[1] || 'live-tracking';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'live-tracking';
      if (this.currentRoute === 'live-tracking') {
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
   * Go back to previous page
   */
  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  /**
   * Refresh tracking
   */
  refreshTracking(): void {
    console.log('[LiveTracking] Refreshing...');
    // Simulate refresh
    this.progressPercentage = Math.min(this.progressPercentage + 5, 100);
    // Update status if complete
    if (this.progressPercentage >= 100) {
      this.bookingStatus = 'Completed';
      this.progressSteps[3].active = true;
      this.progressSteps[2].completed = true;
    }
  }

  /**
   * Contact support
   */
  contactSupport(): void {
    console.log('[LiveTracking] Contacting support');
    this.navCtrl.navigateForward('/support');
  }

  /**
   * View summary
   */
  viewSummary(): void {
    console.log('[LiveTracking] Viewing summary');
    this.navCtrl.navigateForward('/booking-summary');
  }
}