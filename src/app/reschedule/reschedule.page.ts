import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.page.html',
  styleUrls: ['./reschedule.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReschedulePage {
  
  // Loading state
  isLoading: boolean = true;

  // Booking data from navigation state
  bookingData: any = null;

  // Selected date and time
  selectedDate: string = '';
  selectedTime: any = null;

  // Available dates (next 7 days)
  availableDates: any[] = [];
  
  // Available times
  availableTimes: any[] = [];

  // Current route
  currentRoute: string = 'reschedule';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'reschedule';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'reschedule';
    });
  }

  ngOnInit(): void {
    // Get booking data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.bookingData = navigation.extras.state['booking'];
      console.log('[Reschedule] Booking data:', this.bookingData);
    }
    
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      // Generate next 7 days
      const today = new Date();
      this.availableDates = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        
        const isToday = i === 0;
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        this.availableDates.push({
          day: dayNames[date.getDay()],
          number: date.getDate().toString().padStart(2, '0'),
          month: monthNames[date.getMonth()],
          value: date.toISOString().split('T')[0],
          isToday: isToday,
          disabled: false
        });
      }

      // Generate available times (9 AM - 5 PM)
      this.availableTimes = [];
      const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
      
      timeSlots.forEach((slot, index) => {
        const hour = parseInt(slot.split(':')[0]);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        
        // Randomly mark some times as booked
        const isBooked = Math.random() > 0.7;
        
        this.availableTimes.push({
          value: slot,
          display: `${displayHour}:00 ${ampm}`,
          available: !isBooked,
          disabled: isBooked
        });
      });

      // Set default selected date (today)
      this.selectedDate = this.availableDates[0]?.value || '';

      this.isLoading = false;
    }, 1500);
  }

  /**
   * Select a date
   */
  selectDate(date: any): void {
    if (date.disabled) return;
    this.selectedDate = date.value;
  }

  /**
   * Select a time
   */
  selectTime(time: any): void {
    if (time.disabled) return;
    this.selectedTime = time;
  }

  /**
   * Confirm reschedule
   */
  confirmReschedule(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select a new date and time');
      return;
    }

    const newBookingData = {
      ...this.bookingData,
      date: this.selectedDate,
      time: this.selectedTime.display
    };

    // Show confirmation
    if (confirm(`Are you sure you want to reschedule your booking?\n\nNew Date: ${this.selectedDate}\nNew Time: ${this.selectedTime.display}`)) {
      console.log('[Reschedule] Confirmed:', newBookingData);
      
      // Show success message
      alert(`✅ Your booking has been rescheduled successfully!\n\nNew Date: ${this.selectedDate}\nNew Time: ${this.selectedTime.display}`);
      
      // Navigate back to history
      this.navCtrl.navigateBack('/booking-history');
    }
  }

  /**
   * Navigate to a page
   */
  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  /**
   * Check if a tab is active
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
}