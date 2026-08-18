import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationsPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  activeFilter: string = 'all';
  
  notifications: any[] = [];
  filteredNotifications: any[] = [];

  // Current route for bottom nav
  currentRoute: string = 'notifications';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'notifications';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'notifications';
      if (this.currentRoute === 'notifications') {
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
      this.notifications = [
        {
          id: 1,
          title: 'Booking Confirmed',
          message: 'Your premium wash has been confirmed for July 20th at 10:30 AM',
          time: '2 min ago',
          icon: 'checkmark-circle-outline',
          color: 'linear-gradient(135deg, #22c55e, #16a34a)',
          type: 'Booking',
          read: false
        },
        {
          id: 2,
          title: 'Special Offer',
          message: 'Get 20% off on all premium services this weekend! Use code VIP20',
          time: '1 hour ago',
          icon: 'gift-outline',
          color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          type: 'Promotion',
          read: false
        },
        {
          id: 3,
          title: 'VIP Upgrade',
          message: 'Congratulations! You\'ve been upgraded to VIP status. Enjoy exclusive benefits!',
          time: '3 hours ago',
          icon: 'star-outline',
          color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          type: 'VIP',
          read: true
        },
        {
          id: 4,
          title: 'Booking Reminder',
          message: 'Don\'t forget your interior detail appointment tomorrow at 2:00 PM',
          time: '5 hours ago',
          icon: 'time-outline',
          color: 'linear-gradient(135deg, #60a5fa, #2563eb)',
          type: 'Reminder',
          read: false
        },
        {
          id: 5,
          title: 'Payment Successful',
          message: 'Your payment of R350 for premium wash has been processed successfully',
          time: '1 day ago',
          icon: 'card-outline',
          color: 'linear-gradient(135deg, #34d399, #10b981)',
          type: 'Payment',
          read: true
        },
        {
          id: 6,
          title: 'Wash Completed',
          message: 'Your BMW X5 has been washed and is ready for pickup at Sandton City',
          time: '2 days ago',
          icon: 'car-outline',
          color: 'linear-gradient(135deg, #f472b6, #ec4899)',
          type: 'Booking',
          read: true
        }
      ];
      
      this.applyFilter();
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Get unread count
   */
  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  /**
   * Get total notifications
   */
  get totalNotifications(): number {
    return this.notifications.length;
  }

  /**
   * Get today's notifications
   */
  get todayNotifications(): number {
    return this.notifications.filter(n => {
      return n.time.includes('min') || n.time.includes('hour');
    }).length;
  }

  /**
   * Set filter
   */
  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  /**
   * Apply filter to notifications
   */
  applyFilter(): void {
    if (this.activeFilter === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else if (this.activeFilter === 'unread') {
      this.filteredNotifications = this.notifications.filter(n => !n.read);
    } else if (this.activeFilter === 'read') {
      this.filteredNotifications = this.notifications.filter(n => n.read);
    }
  }

  /**
   * Mark a notification as read
   */
  markAsRead(notification: any): void {
    if (!notification.read) {
      notification.read = true;
      // Update the notification in the main array
      const index = this.notifications.findIndex(n => n.id === notification.id);
      if (index !== -1) {
        this.notifications[index] = notification;
      }
      this.applyFilter();
    }
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.applyFilter();
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