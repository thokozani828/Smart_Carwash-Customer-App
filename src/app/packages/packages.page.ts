import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PackagesPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  activeType: string = 'all';

  // All Packages
  packages = [
    {
      id: 1,
      name: 'Basic',
      price: 'R299',
      period: 'mo',
      popular: false,
      color: 'linear-gradient(135deg, #94a3b8, #64748b)',
      benefits: ['2 Exterior Washes', 'Basic Interior Clean', 'Tyre Shine', 'Email Support']
    },
    {
      id: 2,
      name: 'Premium',
      price: 'R599',
      period: 'mo',
      popular: true,
      color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      benefits: ['4 Premium Washes', 'Full Interior Detail', 'Engine Cleaning', 'Priority Booking', 'VIP Support']
    },
    {
      id: 3,
      name: 'VIP',
      price: 'R999',
      period: 'mo',
      popular: false,
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      benefits: ['8 VIP Washes', 'Full Detail Package', 'Express Queue', '24/7 Support', 'Free Tyre Shine', 'Exclusive Offers']
    }
  ];

  // Mobile Packages (for scrollable section)
  mobilePackages = [
    { name: 'Mobile Basic', price: 'R349', desc: 'Convenient mobile wash', color: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { name: 'Mobile Premium', price: 'R649', desc: 'Premium mobile detailing', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { name: 'Mobile VIP', price: 'R1099', desc: 'VIP mobile service', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }
  ];

  // On-site Packages (for scrollable section)
  onsitePackages = [
    { name: 'On-site Basic', price: 'R249', desc: 'Quick on-site wash', color: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
    { name: 'On-site Premium', price: 'R549', desc: 'Complete on-site detailing', color: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    { name: 'On-site VIP', price: 'R949', desc: 'VIP on-site experience', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }
  ];

  // Compare Packages List (for comparison table)
  comparePackagesList = [
    { id: 1, shortName: 'Basic' },
    { id: 2, shortName: 'Premium' },
    { id: 3, shortName: 'VIP' }
  ];

  // Compare Features
  compareFeatures = [
    { name: 'Washes/Month', values: { 1: '2', 2: '4', 3: '8' } },
    { name: 'Interior Detail', values: { 1: 'Basic', 2: 'Full', 3: 'Premium' } },
    { name: 'Engine Cleaning', values: { 1: 'No', 2: 'Yes', 3: 'Yes' } },
    { name: 'Priority Booking', values: { 1: 'No', 2: 'Yes', 3: 'Yes' } },
    { name: 'VIP Support', values: { 1: 'No', 2: 'Yes', 3: 'Yes' } },
    { name: 'Free Tyre Shine', values: { 1: 'No', 2: 'No', 3: 'Yes' } },
    { name: 'Exclusive Offers', values: { 1: 'No', 2: 'No', 3: 'Yes' } }
  ];

  // Current route
  currentRoute: string = 'packages';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'packages';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'packages';
      if (this.currentRoute === 'packages') {
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
   * Get filtered packages based on active type
   */
  get filteredPackages(): any[] {
    return this.packages;
  }

  /**
   * Set active type
   */
  setType(type: string): void {
    this.activeType = type;
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
   * Select a package
   */
  selectPackage(pkg: any): void {
    console.log('[Packages] Selecting package:', pkg);
    this.navCtrl.navigateForward('/package-details', {
      state: { package: pkg }
    });
  }

  /**
   * View package details
   */
  viewPackage(pkg: any): void {
    console.log('[Packages] Viewing package:', pkg);
    this.navCtrl.navigateForward('/package-details', {
      state: { package: pkg }
    });
  }

  /**
   * Compare packages
   */
  comparePackages(): void {
    console.log('[Packages] Comparing packages');
    this.navCtrl.navigateForward('/package-comparison');
  }

  /**
   * View mobile packages
   */
  viewMobilePackages(): void {
    console.log('[Packages] Viewing mobile packages');
    this.setType('mobile');
  }

  /**
   * View on-site packages
   */
  viewOnsitePackages(): void {
    console.log('[Packages] Viewing on-site packages');
    this.setType('onsite');
  }

  /**
   * Get feature value for a specific package
   */
  getFeatureValue(feature: any, packageId: number): string {
    return feature.values[packageId] || '—';
  }
}