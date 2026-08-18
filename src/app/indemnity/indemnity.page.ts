import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-indemnity',
  templateUrl: './indemnity.page.html',
  styleUrls: ['./indemnity.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndemnityPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Form state
  showFullForm: boolean = false;
  isSigned: boolean = false;
  signatureData: string | null = null;
  signatureDate: string = '';
  customerName: string = 'John Doe';
  qrCodeData: string | null = null;

  // Signature History
  signatureHistory = [
    {
      title: 'Annual Indemnity',
      desc: 'Vehicle wash agreement',
      date: '2026-01-15',
      status: 'Signed',
      icon: 'document-text-outline',
      color: 'linear-gradient(135deg, #22c55e, #16a34a)'
    },
    {
      title: 'Service Agreement',
      desc: 'Premium membership terms',
      date: '2025-12-01',
      status: 'Signed',
      icon: 'star-outline',
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
    },
    {
      title: 'Privacy Consent',
      desc: 'Data protection agreement',
      date: '2025-11-15',
      status: 'Signed',
      icon: 'shield-outline',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    }
  ];

  // Current route
  currentRoute: string = 'indemnity';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'indemnity';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'indemnity';
      if (this.currentRoute === 'indemnity') {
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
   * Toggle full form view
   */
  toggleForm(): void {
    this.showFullForm = !this.showFullForm;
  }

  /**
   * Open signature pad
   */
  openSignaturePad(): void {
    console.log('[Indemnity] Opening signature pad');
    // In a real app, this would open a signature pad
    // For demo, simulate a signature
    this.signatureData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iODAiPjxwYXRoIGQ9Ik0xMCw0MCBRNTAsMjAgOTAsNDAgUTEzMCw2MCAxNzAsMzAgUTE5MCwxNSAyMDAsMTAgTDE5MCw1MCBRMTUwLDcwIDExMCw1MCBRNzAsMzAgMzAsNTAgTDEwLDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNlYiIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+';
  }

  /**
   * Clear signature
   */
  clearSignature(): void {
    this.signatureData = null;
    this.isSigned = false;
  }

  /**
   * Save signature
   */
  saveSignature(): void {
    if (this.signatureData) {
      this.isSigned = true;
      this.signatureDate = new Date().toLocaleString();
      console.log('[Indemnity] Signature saved');
    }
  }

  /**
   * Generate QR Code
   */
  generateQRCode(): void {
    console.log('[Indemnity] Generating QR code');
    // Simulate QR code generation
    this.qrCodeData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZmZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=';
  }

  /**
   * Scan QR Code
   */
  scanQRCode(): void {
    console.log('[Indemnity] Scanning QR code');
    alert('📷 Camera would open to scan QR code');
  }

  /**
   * Download QR Code
   */
  downloadQRCode(): void {
    console.log('[Indemnity] Downloading QR code');
    alert('📥 QR Code downloaded successfully!');
  }

  /**
   * Download PDF
   */
  downloadPDF(): void {
    console.log('[Indemnity] Downloading PDF');
    alert('📄 PDF downloaded successfully!');
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.clearSignature();
    this.qrCodeData = null;
    this.showFullForm = false;
    console.log('[Indemnity] Form reset');
  }

  /**
   * View signature history
   */
  viewSignatureHistory(): void {
    console.log('[Indemnity] Viewing signature history');
    this.navCtrl.navigateForward('/signature-history');
  }
}