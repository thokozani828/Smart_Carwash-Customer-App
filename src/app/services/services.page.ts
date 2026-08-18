import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  activeCategory: string = 'all';

  // Common Car Wash Services
  services = [
    {
      id: 1,
      name: 'Exterior Wash',
      description: 'Professional exterior hand wash with premium shampoo',
      price: 'R180',
      duration: '25 min',
      category: 'wash',
      icon: 'water-outline',
      color: 'linear-gradient(135deg, #60a5fa, #2563eb)',
      popular: false
    },
    {
      id: 2,
      name: 'Interior Vacuum',
      description: 'Thorough vacuum cleaning of seats, carpets, and mats',
      price: 'R120',
      duration: '20 min',
      category: 'wash',
      icon: 'sparkles-outline',
      color: 'linear-gradient(135deg, #34d399, #10b981)',
      popular: false
    },
    {
      id: 3,
      name: 'Premium Wash',
      description: 'Complete exterior and interior cleaning with premium products',
      price: 'R350',
      duration: '45 min',
      category: 'wash',
      icon: 'star-outline',
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      popular: true
    },
    {
      id: 4,
      name: 'Interior Detail',
      description: 'Deep cleaning of all interior surfaces, leather treatment, and stain removal',
      price: 'R450',
      duration: '60 min',
      category: 'detail',
      icon: 'sparkles-outline',
      color: 'linear-gradient(135deg, #f472b6, #ec4899)',
      popular: false
    },
    {
      id: 5,
      name: 'Engine Cleaning',
      description: 'Professional engine bay degreasing and conditioning',
      price: 'R250',
      duration: '30 min',
      category: 'detail',
      icon: 'hardware-chip-outline',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      popular: false
    },
    {
      id: 6,
      name: 'Tyre Shine',
      description: 'Premium tyre dressing and shine treatment',
      price: 'R80',
      duration: '10 min',
      category: 'special',
      icon: 'car-outline',
      color: 'linear-gradient(135deg, #374151, #1f2937)',
      popular: false
    },
    {
      id: 7,
      name: 'Headlight Restoration',
      description: 'Professional headlight polishing and restoration',
      price: 'R220',
      duration: '35 min',
      category: 'special',
      icon: 'bulb-outline',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      popular: false
    },
    {
      id: 8,
      name: 'Full Detail',
      description: 'Complete interior and exterior detailing with paint protection',
      price: 'R850',
      duration: '120 min',
      category: 'detail',
      icon: 'diamond-outline',
      color: 'linear-gradient(135deg, #1e40af, #1d4ed8)',
      popular: true
    },
    {
      id: 9,
      name: 'Window Tinting',
      description: 'Professional window tinting for UV protection and style',
      price: 'R550',
      duration: '90 min',
      category: 'special',
      icon: 'eye-outline',
      color: 'linear-gradient(135deg, #1f2937, #111827)',
      popular: false
    },
    {
      id: 10,
      name: 'Paint Correction',
      description: 'Professional paint correction and swirl removal',
      price: 'R1,200',
      duration: '180 min',
      category: 'detail',
      icon: 'color-palette-outline',
      color: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      popular: false
    },
    {
      id: 11,
      name: 'Quick Wash',
      description: 'Fast exterior wash and dry for busy schedules',
      price: 'R100',
      duration: '15 min',
      category: 'wash',
      icon: 'flash-outline',
      color: 'linear-gradient(135deg, #22c55e, #16a34a)',
      popular: false
    },
    {
      id: 12,
      name: 'Ceramic Coating',
      description: 'Premium ceramic coating for long-lasting paint protection',
      price: 'R2,500',
      duration: '240 min',
      category: 'detail',
      icon: 'shield-checkmark-outline',
      color: 'linear-gradient(135deg, #0d9488, #0f766e)',
      popular: false
    }
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('/services')) {
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
   * Get filtered services based on category
   */
  get filteredServices(): any[] {
    if (this.activeCategory === 'all') {
      return this.services;
    }
    return this.services.filter(s => s.category === this.activeCategory);
  }

  /**
   * Set active category
   */
  setCategory(category: string): void {
    this.activeCategory = category;
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
   * View service details
   */
  viewService(service: any): void {
    console.log('[Services] Viewing service:', service);
    this.navCtrl.navigateForward('/service-details', {
      state: { service }
    });
  }

  /**
   * Book a service
   */
  bookService(service: any): void {
    console.log('[Services] Booking service:', service);
    this.navCtrl.navigateForward('/booking', {
      state: { selectedService: service }
    });
  }

  /**
   * View featured package
   */
  viewPackage(): void {
    console.log('[Services] Viewing featured package');
    this.navCtrl.navigateForward('/packages');
  }
}