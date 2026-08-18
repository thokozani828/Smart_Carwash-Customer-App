import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentsPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Saved Cards
  savedCards: any[] = [];
  
  // Payment History
  paymentHistory: any[] = [];
  
  // Add Card state
  showAddCard: boolean = false;
  newCard: any = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

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
      this.savedCards = [
        { id: 1, last4: '1234', expiry: '12/26', icon: 'card-outline', isDefault: true },
        { id: 2, last4: '5678', expiry: '08/27', icon: 'card-outline', isDefault: false },
        { id: 3, last4: '9012', expiry: '05/25', icon: 'card-outline', isDefault: false }
      ];

      this.paymentHistory = [
        { 
          id: 1, 
          title: 'Premium Wash', 
          desc: 'BMW X5 - Sandton City', 
          date: '2026-07-20', 
          amount: '350.00', 
          type: 'debit',
          icon: 'car-outline',
          color: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
        },
        { 
          id: 2, 
          title: 'VIP Detail', 
          desc: 'Mercedes C-Class - Rosebank', 
          date: '2026-07-15', 
          amount: '550.00', 
          type: 'debit',
          icon: 'star-outline',
          color: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
        },
        { 
          id: 3, 
          title: 'Refund', 
          desc: 'Cancelled booking - Fourways', 
          date: '2026-07-12', 
          amount: '180.00', 
          type: 'credit',
          icon: 'refresh-outline',
          color: 'linear-gradient(135deg, #22c55e, #16a34a)'
        },
        { 
          id: 4, 
          title: 'Interior Detail', 
          desc: 'Toyota Corolla - Fourways', 
          date: '2026-07-10', 
          amount: '280.00', 
          type: 'debit',
          icon: 'sparkles-outline',
          color: 'linear-gradient(135deg, #f472b6, #ec4899)'
        },
        { 
          id: 5, 
          title: 'Exterior Wash', 
          desc: 'BMW X5 - Sandton City', 
          date: '2026-07-08', 
          amount: '180.00', 
          type: 'debit',
          icon: 'water-outline',
          color: 'linear-gradient(135deg, #60a5fa, #2563eb)'
        }
      ];
      
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.navCtrl.back();
  }

  /**
   * Pay online
   */
  payOnline(): void {
    console.log('[Payments] Paying online');
    this.navCtrl.navigateForward('/payment-gateway');
  }

  /**
   * Card payment
   */
  cardPayment(): void {
    console.log('[Payments] Card payment');
    this.navCtrl.navigateForward('/card-payment');
  }

  /**
   * EFT payment
   */
  eftPayment(): void {
    console.log('[Payments] EFT payment');
    this.navCtrl.navigateForward('/eft-payment');
  }

  /**
   * Add card
   */
  addCard(): void {
    this.showAddCard = true;
  }

  /**
   * Cancel adding card
   */
  cancelAddCard(): void {
    this.showAddCard = false;
    this.newCard = { number: '', expiry: '', cvv: '', name: '' };
  }

  /**
   * Save card
   */
  saveCard(): void {
    if (!this.newCard.number || !this.newCard.expiry || !this.newCard.cvv || !this.newCard.name) {
      alert('Please fill in all fields');
      return;
    }
    
    const newCard = {
      id: Date.now(),
      last4: this.newCard.number.slice(-4),
      expiry: this.newCard.expiry,
      icon: 'card-outline',
      isDefault: this.savedCards.length === 0
    };
    
    this.savedCards.push(newCard);
    this.cancelAddCard();
    console.log('[Payments] Card saved:', newCard);
  }

  /**
   * Select card
   */
  selectCard(card: any): void {
    console.log('[Payments] Card selected:', card);
    // Set as default
    this.savedCards.forEach(c => c.isDefault = false);
    card.isDefault = true;
  }

  /**
   * Delete card
   */
  deleteCard(card: any): void {
    if (confirm(`Delete card ending in ${card.last4}?`)) {
      this.savedCards = this.savedCards.filter(c => c.id !== card.id);
      console.log('[Payments] Card deleted');
    }
  }

  /**
   * View payment details
   */
  viewPaymentDetails(payment: any): void {
    console.log('[Payments] Viewing payment details:', payment);
    this.navCtrl.navigateForward('/payment-details', {
      state: { payment }
    });
  }

  /**
   * View all history
   */
  viewAllHistory(): void {
    console.log('[Payments] Viewing all history');
    this.navCtrl.navigateForward('/payment-history');
  }

  /**
   * Download receipt
   */
  downloadReceipt(payment: any): void {
    console.log('[Payments] Downloading receipt for:', payment);
    alert(`Downloading receipt for ${payment.title}`);
  }
}