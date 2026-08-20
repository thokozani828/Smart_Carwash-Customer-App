import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

interface Service {
  name: string;
  icon: string;
  price: string;
  color: string;
}

interface ActiveBooking {
  serviceName: string;
  vehicle: string;
  location: string;
  status: string;
  queueNumber: number;
  step: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  
  // ==========================
  // STATE
  // ==========================
  
  isLoading: boolean = true;
  activeTab: string = 'home';
  customerName: string = 'John Doe';
  notificationCount: number = 3;
  loyaltyPoints: number = 2450;
  vipTier: string = 'Gold';
  
  // Active booking data
  activeBooking: ActiveBooking | null = {
    serviceName: 'Premium Wash',
    vehicle: 'BMW X5 · Blue',
    location: 'Kwamashu',
    status: 'In Progress',
    queueNumber: 3,
    step: 2
  };
  
  // Services
  services: Service[] = [
    { 
      name: 'Exterior', 
      icon: 'water-outline', 
      price: 'R180', 
      color: 'linear-gradient(135deg, #60a5fa, #2563eb)' 
    },
    { 
      name: 'Interior', 
      icon: 'sparkles-outline', 
      price: 'R220', 
      color: 'linear-gradient(135deg, #f472b6, #ec4899)' 
    },
    { 
      name: 'Premium', 
      icon: 'star-outline', 
      price: 'R350', 
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
    },
    { 
      name: 'VIP', 
      icon: 'diamond-outline', 
      price: 'R450', 
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' 
    }
  ];

  // ==========================
  // CONSTRUCTOR
  // ==========================
  
  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    // Listen for route changes to update active tab
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url.split('/')[1] || 'home';
      this.updateActiveTab(url);
      
      // Reload data when returning to home
      if (url === 'home') {
        this.loadData();
      }
    });
  }

  // ==========================
  // LIFECYCLE
  // ==========================
  
  ngOnInit(): void {
    this.loadData();
  }

  // ==========================
  // DATA LOADING
  // ==========================
  
  loadData(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 1200);
  }

  // ==========================
  // NAVIGATION
  // ==========================
  
  goToCarwashMap(): void {
    console.log('[Home] Navigating to carwash map');
    this.navCtrl.navigateForward('/carwash-map');
  }

  navigateTo(page: string): void {
    console.log('[Home] Navigating to:', page);
    this.navCtrl.navigateForward(`/${page}`);
  }

  // ==========================
  // TAB MANAGEMENT
  // ==========================
  
  switchTab(tab: string): void {
    if (tab === this.activeTab) {
      // If already on this tab, scroll to top
      // You can implement scroll to top here
      return;
    }
    
    this.activeTab = tab;
    this.navigateTo(tab);
  }

  private updateActiveTab(url: string): void {
    const tabMap: { [key: string]: string } = {
      'booking': 'booking',
      'booking-history': 'history',
      'home': 'home',
      'vehicles': 'vehicles',
      'vip-membership': 'vip'
    };
    
    this.activeTab = tabMap[url] || 'home';
  }
}