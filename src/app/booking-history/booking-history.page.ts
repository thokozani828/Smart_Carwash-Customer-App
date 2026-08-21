import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  timeOutline, 
  locationOutline, 
  carOutline, 
  cashOutline, 
  calendarOutline, 
  refreshOutline, 
  downloadOutline, 
  closeOutline,
  homeOutline,
  starOutline,
  addOutline,
  calendarOutline as calendarIcon
} from 'ionicons/icons';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingHistoryPage implements OnInit {
  
  isLoading: boolean = true;
  activeTab: string = 'upcoming';
  currentRoute: string = 'booking-history';
  vehicleCount: number = 2;

  upcomingBookings: any[] = [];
  completedBookings: any[] = [];
  cancelledBookings: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    // Register icons
    addIcons({
      arrowBackOutline,
      timeOutline,
      locationOutline,
      carOutline,
      cashOutline,
      calendarOutline,
      refreshOutline,
      downloadOutline,
      closeOutline,
      homeOutline,
      starOutline,
      addOutline,
      calendarIcon
    });

    this.currentRoute = this.router.url.split('/')[1] || 'booking-history';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'booking-history';
      if (this.currentRoute === 'booking-history') {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.upcomingBookings = [
        {
          id: 'WB-2024-001',
          service: 'Premium Wash',
          date: '2024-07-20',
          time: '10:30 AM',
          branch: 'Washfy Central',
          vehicle: 'BMW X5',
          price: 'R350.00',
          status: 'upcoming'
        },
        {
          id: 'WB-2024-002',
          service: 'Interior Detail',
          date: '2024-07-22',
          time: '2:00 PM',
          branch: 'Washfy North',
          vehicle: 'Mercedes C-Class',
          price: 'R280.00',
          status: 'upcoming'
        },
        {
          id: 'WB-2024-003',
          service: 'Exterior Wash',
          date: '2024-07-25',
          time: '9:00 AM',
          branch: 'Washfy South',
          vehicle: 'Toyota Corolla',
          price: 'R180.00',
          status: 'upcoming'
        }
      ];

      this.completedBookings = [
        {
          id: 'WB-2024-004',
          service: 'VIP Detail',
          date: '2024-07-15',
          time: '11:00 AM',
          branch: 'Washfy Central',
          vehicle: 'BMW X5',
          price: 'R550.00',
          status: 'completed'
        },
        {
          id: 'WB-2024-005',
          service: 'Premium Wash',
          date: '2024-07-10',
          time: '3:30 PM',
          branch: 'Washfy North',
          vehicle: 'Audi A4',
          price: 'R350.00',
          status: 'completed'
        },
        {
          id: 'WB-2024-006',
          service: 'Interior Detail',
          date: '2024-07-05',
          time: '10:00 AM',
          branch: 'Washfy South',
          vehicle: 'Toyota Corolla',
          price: 'R280.00',
          status: 'completed'
        }
      ];

      this.cancelledBookings = [
        {
          id: 'WB-2024-007',
          service: 'Full Detail',
          date: '2024-07-12',
          time: '1:00 PM',
          branch: 'Washfy Central',
          vehicle: 'Mercedes C-Class',
          price: 'R550.00',
          status: 'cancelled'
        },
        {
          id: 'WB-2024-008',
          service: 'Exterior Wash',
          date: '2024-07-08',
          time: '9:30 AM',
          branch: 'Washfy North',
          vehicle: 'BMW X5',
          price: 'R180.00',
          status: 'cancelled'
        }
      ];

      this.isLoading = false;
    }, 1500);
  }

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

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`, {
      animated: true,
      animationDirection: 'forward'
    });
  }

  isActive(page: string): boolean {
    return this.currentRoute === page;
  }

  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  viewBookingDetails(booking: any): void {
    console.log('[History] Viewing booking:', booking);
    this.navCtrl.navigateForward('/booking-details', {
      state: { booking: booking }
    });
  }

  rescheduleBooking(booking: any): void {
    const bookingDate = new Date(`${booking.date} ${booking.time}`);
    const now = new Date();
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursDifference < 2) {
      alert(`❌ Cannot reschedule ${booking.service}\n\nYou can only reschedule bookings at least 2 hours before the scheduled time.\n\nYour booking is scheduled for ${booking.date} at ${booking.time}.`);
      return;
    }

    console.log('[History] Navigating to reschedule page for booking:', booking);
    this.navCtrl.navigateForward('/reschedule', {
      state: { 
        booking: booking,
        reschedule: true
      }
    });
  }

  rebookBooking(booking: any): void {
    console.log('[History] Rebooking:', booking);
    if (confirm(`Would you like to rebook your ${booking.service}?`)) {
      this.navCtrl.navigateForward('/booking', {
        state: { rebook: booking }
      });
    }
  }

  downloadReceipt(booking: any): void {
    console.log('[History] Downloading receipt for:', booking);
    alert(`📄 Downloading receipt for ${booking.service}\nBooking #${booking.id}`);
  }

  cancelBooking(booking: any): void {
    console.log('[History] Cancelling booking:', booking);
    
    const bookingDate = new Date(`${booking.date} ${booking.time}`);
    const now = new Date();
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    let warningMessage = '';
    if (hoursDifference < 2) {
      warningMessage = '\n\n⚠️ Note: This booking is within 2 hours. Cancellation may be subject to fees.';
    }
    
    if (confirm(`Are you sure you want to cancel your ${booking.service} on ${booking.date} at ${booking.time}?${warningMessage}`)) {
      const index = this.upcomingBookings.findIndex(b => b.id === booking.id);
      if (index !== -1) {
        const cancelledBooking = { ...this.upcomingBookings[index], status: 'cancelled' };
        this.upcomingBookings.splice(index, 1);
        this.cancelledBookings.push(cancelledBooking);
        
        alert(`✅ Booking #${booking.id} has been cancelled successfully.`);
      }
    }
  }
}