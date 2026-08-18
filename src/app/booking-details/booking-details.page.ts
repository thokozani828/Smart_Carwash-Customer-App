import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import QRCode library
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingDetailsPage implements OnInit {
  
  bookingData: any = null;
  bookingReference: string = 'SCW-2026-001';
  bookingDate: string = '17 July 2026';
  bookingStatus: string = 'Confirmed';
  isLoading: boolean = true; // Add loading state for skeleton
  
  // QR Code
  qrCodeData: string = '';

  // Vehicle Details
  vehicleName: string = 'BMW X5';
  vehiclePlate: string = 'ABC 123 GP';
  vehicleMake: string = 'BMW';
  vehicleModel: string = 'X5';
  vehicleColor: string = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
  
  // Service Details
  serviceName: string = 'Premium Wash';
  servicePrice: string = 'R350.00';
  serviceIcon: string = 'star-outline';
  serviceColor: string = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
  
  // Package Details
  packageName: string = 'Premium';
  packagePrice: string = 'R699/mo';
  
  // Branch Details
  branchName: string = 'Sandton City';
  branchAddress: string = 'Shop 45, Sandton City Mall, Sandton';
  
  // Payment Details
  paymentMethod: string = 'Card Payment';
  paymentStatus: string = 'Paid';
  totalAmount: string = 'R350.00';
  
  bookingDetails: any[] = [];
  timelineEvents: any[] = [];

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
        if (this.bookingData) {
          this.populateDataFromBooking();
        }
      }
      
      // Build booking details
      this.buildBookingDetails();
      this.buildTimeline();
      
      // Generate QR Code
      this.generateQRCode();
      
      // Hide skeleton
      this.isLoading = false;
    }, 1500); // 1.5 second loading simulation
  }

  /**
   * Populate data from booking object
   */
  populateDataFromBooking(): void {
    const data = this.bookingData;
    
    this.bookingReference = data.reference || 'SCW-2026-001';
    this.bookingDate = data.date || '17 July 2026';
    this.bookingStatus = data.status || 'Confirmed';
    
    this.vehicleName = data.vehicle || 'BMW X5';
    this.vehiclePlate = data.plate || 'ABC 123 GP';
    
    this.serviceName = data.service || 'Premium Wash';
    this.servicePrice = data.servicePrice || 'R350.00';
    
    this.branchName = data.branch || 'Sandton City';
    this.branchAddress = data.branchAddress || 'Shop 45, Sandton City Mall, Sandton';
    
    this.paymentMethod = data.paymentMethod || 'Card Payment';
    this.paymentStatus = data.paymentStatus || 'Paid';
    this.totalAmount = data.totalAmount || 'R350.00';
  }

  /**
   * Build booking details for display
   */
  buildBookingDetails(): void {
    this.bookingDetails = [
      { label: 'Vehicle', value: this.vehicleName },
      { label: 'Service', value: this.serviceName },
      { label: 'Package', value: this.packageName || 'None' },
      { label: 'Branch', value: this.branchName },
      { label: 'Date & Time', value: this.bookingDate },
      { label: 'Payment Method', value: this.paymentMethod, isPayment: true },
      { label: 'Payment Status', value: this.paymentStatus, isPayment: true }
    ];
  }

  /**
   * Build timeline events
   */
  buildTimeline(): void {
    this.timelineEvents = [
      { time: '10:30 AM', event: 'Booking Created', status: 'Completed', active: true },
      { time: '10:35 AM', event: 'Payment Confirmed', status: 'Completed', active: true },
      { time: '10:40 AM', event: 'Vehicle Arrived', status: 'Completed', active: true },
      { time: '10:45 AM', event: 'Wash Started', status: 'In Progress', active: true },
      { time: '11:30 AM', event: 'Service Complete', status: 'Pending', active: false }
    ];
  }

  /**
   * Generate QR Code for booking
   */
  generateQRCode(): void {
    const qrData = JSON.stringify({
      reference: this.bookingReference,
      customer: 'John Doe',
      vehicle: this.vehicleName,
      service: this.serviceName,
      date: this.bookingDate,
      branch: this.branchName
    });
    
    QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1a3a8a',
        light: '#ffffff'
      }
    }, (err, url) => {
      if (err) {
        console.error('QR Code generation failed:', err);
        // Fallback - use API
        this.qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
        return;
      }
      this.qrCodeData = url;
      console.log('[BookingDetails] QR Code generated');
    });
  }

  /**
   * Download QR Code
   */
  downloadQRCode(): void {
    if (!this.qrCodeData) {
      alert('Please wait for QR code to generate');
      return;
    }
    
    console.log('[BookingDetails] Downloading QR Code');
    
    if (this.qrCodeData.startsWith('data:image')) {
      const link = document.createElement('a');
      link.download = `QR-${this.bookingReference}.png`;
      link.href = this.qrCodeData;
      link.click();
    } else {
      window.open(this.qrCodeData, '_blank');
    }
  }

  /**
   * Get status icon
   */
  getStatusIcon(): string {
    const icons: { [key: string]: string } = {
      'Confirmed': 'checkmark-circle-outline',
      'Completed': 'checkmark-circle',
      'Pending': 'time-outline',
      'Cancelled': 'close-circle-outline'
    };
    return icons[this.bookingStatus] || 'information-circle-outline';
  }

  /**
   * Get payment status class
   */
  get paymentStatusClass(): string {
    return this.paymentStatus.toLowerCase();
  }

  /**
   * Get directions to branch
   */
  getDirections(): void {
    console.log('[BookingDetails] Getting directions to branch');
    alert('📍 Opening Google Maps to branch location');
  }

  /**
   * Rebook booking
   */
  rebookBooking(): void {
    console.log('[BookingDetails] Rebooking');
    this.navCtrl.navigateForward('/booking');
  }

  /**
   * Download receipt
   */
  downloadReceipt(): void {
    console.log('[BookingDetails] Downloading receipt');
    alert('📄 Downloading receipt for booking ' + this.bookingReference);
  }

  /**
   * Cancel booking
   */
  cancelBooking(): void {
    console.log('[BookingDetails] Cancelling booking');
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingStatus = 'Cancelled';
      alert('Booking cancelled successfully');
    }
  }

  /**
   * Go back
   */
  goBack(): void {
    this.navCtrl.back();
  }
}