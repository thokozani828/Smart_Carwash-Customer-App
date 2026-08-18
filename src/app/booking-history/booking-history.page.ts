import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingHistoryPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  activeTab: string = 'upcoming';

  upcomingBookings: any[] = [];
  completedBookings: any[] = [];
  cancelledBookings: any[] = [];

  // Current route for bottom nav
  currentRoute: string = 'booking-history';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'booking-history';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'booking-history';
      if (this.currentRoute === 'booking-history') {
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
      this.upcomingBookings = [
        {
          id: 'B001',
          service: 'Premium Wash',
          date: '2026-07-20',
          time: '10:30 AM',
          branch: 'Sandton City',
          vehicle: 'BMW X5',
          price: 'R350',
          status: 'upcoming'
        },
        {
          id: 'B002',
          service: 'Interior Detail',
          date: '2026-07-22',
          time: '2:00 PM',
          branch: 'Rosebank',
          vehicle: 'Mercedes C-Class',
          price: 'R280',
          status: 'upcoming'
        },
        {
          id: 'B003',
          service: 'Exterior Wash',
          date: '2026-07-25',
          time: '9:00 AM',
          branch: 'Fourways',
          vehicle: 'Toyota Corolla',
          price: 'R180',
          status: 'upcoming'
        }
      ];

      this.completedBookings = [
        {
          id: 'B004',
          service: 'VIP Detail',
          date: '2026-07-15',
          time: '11:00 AM',
          branch: 'Sandton City',
          vehicle: 'BMW X5',
          price: 'R550',
          status: 'completed'
        },
        {
          id: 'B005',
          service: 'Premium Wash',
          date: '2026-07-10',
          time: '3:30 PM',
          branch: 'Rosebank',
          vehicle: 'Audi A4',
          price: 'R350',
          status: 'completed'
        },
        {
          id: 'B006',
          service: 'Interior Detail',
          date: '2026-07-05',
          time: '10:00 AM',
          branch: 'Fourways',
          vehicle: 'Toyota Corolla',
          price: 'R280',
          status: 'completed'
        }
      ];

      this.cancelledBookings = [
        {
          id: 'B007',
          service: 'Full Detail',
          date: '2026-07-12',
          time: '1:00 PM',
          branch: 'Sandton City',
          vehicle: 'Mercedes C-Class',
          price: 'R550',
          status: 'cancelled'
        },
        {
          id: 'B008',
          service: 'Exterior Wash',
          date: '2026-07-08',
          time: '9:30 AM',
          branch: 'Rosebank',
          vehicle: 'BMW X5',
          price: 'R180',
          status: 'cancelled'
        }
      ];

      this.isLoading = false;
    }, 1500);
  }

  /**
   * Get filtered bookings based on active tab
   */
  get filteredBookings(): any[] {
    switch (this.activeTab) {
      case 'upcoming':
        return this.upcomingBookings;
      case 'completed':
        return this.completedBookings;
      case 'cancelled':
        return this.cancelledBookings;
      default:
        return [];
    }
  }

  /**
   * Switch active tab
   */
  switchTab(tab: string): void {
    this.activeTab = tab;
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
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  /**
   * View booking details
   */
  viewBookingDetails(booking: any): void {
    console.log('[History] Viewing booking:', booking);
    this.navCtrl.navigateForward('/booking-details', {
      state: { booking: booking }
    });
  }

  /**
   * Reschedule a booking - Navigate to reschedule page
   */
  rescheduleBooking(booking: any): void {
    // Check if booking is within 2 hours of scheduled time
    const bookingDate = new Date(`${booking.date} ${booking.time}`);
    const now = new Date();
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursDifference < 2) {
      // Show alert that rescheduling is not allowed within 2 hours
      alert(`❌ Cannot reschedule ${booking.service}\n\nYou can only reschedule bookings at least 2 hours before the scheduled time.\n\nYour booking is scheduled for ${booking.date} at ${booking.time}.`);
      return;
    }

    // Navigate to reschedule page with booking data
    console.log('[History] Navigating to reschedule page for booking:', booking);
    this.navCtrl.navigateForward('/reschedule', {
      state: { 
        booking: booking,
        reschedule: true
      }
    });
  }

  /**
   * Rebook a booking
   */
  rebookBooking(booking: any): void {
    console.log('[History] Rebooking:', booking);
    if (confirm(`Would you like to rebook your ${booking.service}?`)) {
      this.navCtrl.navigateForward('/booking', {
        state: { rebook: booking }
      });
    }
  }

  /**
   * Download receipt
   */
  downloadReceipt(booking: any): void {
    console.log('[History] Downloading receipt for:', booking);
    alert(`📄 Downloading receipt for ${booking.service}\nBooking #${booking.id}`);
  }

  /**
   * Cancel a booking with confirmation
   */
  cancelBooking(booking: any): void {
    console.log('[History] Cancelling booking:', booking);
    
    // Check if booking is within 2 hours
    const bookingDate = new Date(`${booking.date} ${booking.time}`);
    const now = new Date();
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    let warningMessage = '';
    if (hoursDifference < 2) {
      warningMessage = '\n\n⚠️ Note: This booking is within 2 hours. Cancellation may be subject to fees.';
    }
    
    if (confirm(`Are you sure you want to cancel your ${booking.service} on ${booking.date} at ${booking.time}?${warningMessage}`)) {
      // Move booking from upcoming to cancelled
      const index = this.upcomingBookings.findIndex(b => b.id === booking.id);
      if (index !== -1) {
        const cancelledBooking = { ...this.upcomingBookings[index], status: 'cancelled' };
        this.upcomingBookings.splice(index, 1);
        this.cancelledBookings.push(cancelledBooking);
        
        // Show success message
        alert(`✅ Booking #${booking.id} has been cancelled successfully.`);
        
        // If on upcoming tab, refresh the list
        if (this.activeTab === 'upcoming') {
          // Force refresh of filtered list
        }
      }
    }
  }
}