import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupportPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // FAQs
  faqs = [
    {
      question: 'How do I book a car wash?',
      answer: 'You can book a car wash by going to the Book tab in the bottom navigation. Select your vehicle, service, branch, and preferred date and time.',
      expanded: false
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods including Credit/Debit Cards, EFT, Mobile Payments (Apple Pay/Google Pay), and Cash at the branch.',
      expanded: false
    },
    {
      question: 'How do I cancel my booking?',
      answer: 'To cancel a booking, go to your Booking History, find the booking you want to cancel, and tap the Cancel button. Please note that cancellations must be made at least 2 hours before the scheduled time.',
      expanded: false
    },
    {
      question: 'What is the VIP membership?',
      answer: 'VIP membership offers exclusive benefits including priority booking, free tyre shine, discounts on services, and dedicated support. You can join through the VIP section in the app.',
      expanded: false
    },
    {
      question: 'How do I earn loyalty points?',
      answer: 'You can earn loyalty points by booking washes, referring friends, leaving reviews, and having a VIP membership. Points can be redeemed for free washes and other rewards.',
      expanded: false
    }
  ];

  // Branch Hours
  branchHours = [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 5:00 PM' },
    { day: 'Sunday', time: '9:00 AM - 4:00 PM' }
  ];

  // Current route for bottom nav
  currentRoute: string = 'support';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'support';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'support';
      if (this.currentRoute === 'support') {
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
      this.isLoading = false;
    }, 1500);
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
   * Toggle FAQ expansion
   */
  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  /**
   * Call branch
   */
  callBranch(): void {
    console.log('[Support] Calling branch');
    window.location.href = 'tel:+27123456789';
  }

  /**
   * WhatsApp support
   */
  whatsappSupport(): void {
    console.log('[Support] WhatsApp support');
    window.open('https://wa.me/27123456789', '_blank');
  }

  /**
   * Email support
   */
  emailSupport(): void {
    console.log('[Support] Email support');
    window.location.href = 'mailto:support@carwashapp.com';
  }

  /**
   * Live chat - Navigate to chat page
   */
  liveChat(): void {
    console.log('[Support] Opening live chat');
    this.navCtrl.navigateForward('/chat');
  }

  /**
   * View all FAQs
   */
  viewAllFAQs(): void {
    console.log('[Support] Viewing all FAQs');
    this.navCtrl.navigateForward('/faqs');
  }
}