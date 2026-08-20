import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  
  // Loading state
  isLoading: boolean = true;

  services = [
    { name: 'Exterior', icon: 'water-outline', price: 'R180', color: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
    { name: 'Interior', icon: 'sparkles-outline', price: 'R220', color: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    { name: 'Premium', icon: 'star-outline', price: 'R350', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { name: 'VIP', icon: 'diamond-outline', price: 'R450', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/')[1] || 'home';
      // Reload data when navigating to home
      if (currentRoute === 'home' || currentRoute === '') {
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
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Navigate to Carwash Map
   */
  goToCarwashMap(): void {
    console.log('[Home] Navigating to carwash map');
    this.navCtrl.navigateForward('/carwash-map');
  }

  navigateTo(page: string): void {
    console.log('[Home] Navigating to:', page);
    this.navCtrl.navigateForward(`/${page}`);
  }
}