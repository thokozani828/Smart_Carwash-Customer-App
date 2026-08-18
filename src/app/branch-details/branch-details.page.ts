import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.page.html',
  styleUrls: ['./branch-details.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BranchDetailsPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Branch data from navigation state or default
  branchData: any = {
    id: 1,
    name: 'Sandton City',
    address: 'Shop 45, Sandton City Mall, Sandton, 2196',
    phone: '+27 11 234 5678',
    hours: 'Mon-Sat: 8:00 AM - 6:00 PM, Sun: 9:00 AM - 4:00 PM',
    parking: 'Free parking available',
    capacity: 12,
    rating: 4.8,
    reviews: 156,
    isOpen: true,
    color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    coordinates: {
      lat: -26.1076,
      lng: 28.0567
    },
    services: [
      { name: 'Exterior Wash', price: 'R180', icon: 'water-outline', color: 'linear-gradient(135deg, #60a5fa, #2563eb)', available: true },
      { name: 'Interior Detail', price: 'R280', icon: 'sparkles-outline', color: 'linear-gradient(135deg, #f472b6, #ec4899)', available: true },
      { name: 'Premium Wash', price: 'R350', icon: 'star-outline', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)', available: true },
      { name: 'Full Detail', price: 'R550', icon: 'diamond-outline', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', available: true },
      { name: 'Engine Cleaning', price: 'R250', icon: 'hardware-chip-outline', color: 'linear-gradient(135deg, #374151, #1f2937)', available: false },
      { name: 'Tyre Shine', price: 'R80', icon: 'car-outline', color: 'linear-gradient(135deg, #22c55e, #16a34a)', available: true }
    ],
    reviewsList: [
      {
        name: 'John D.',
        rating: 5,
        date: '2026-07-15',
        text: 'Excellent service! The team was professional and thorough. My car looks brand new!',
        avatarColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
      },
      {
        name: 'Sarah M.',
        rating: 4,
        date: '2026-07-12',
        text: 'Great service, very convenient location. Will definitely come back again.',
        avatarColor: 'linear-gradient(135deg, #ec4899, #db2777)'
      },
      {
        name: 'David K.',
        rating: 5,
        date: '2026-07-10',
        text: 'Best car wash in town! Highly recommend the premium wash package.',
        avatarColor: 'linear-gradient(135deg, #22c55e, #16a34a)'
      }
    ]
  };

  // Current route
  currentRoute: string = 'branch-details';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'branch-details';
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'branch-details';
    });
  }

  ngOnInit(): void {
    // Get branch data from navigation state if available
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const branch = navigation.extras.state['branch'];
      if (branch) {
        this.branchData = { ...this.branchData, ...branch };
        console.log('[Branch Details] Branch data loaded:', this.branchData);
      }
    }
    
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Get Google Maps Static Map URL
   */
  getMapUrl(): string {
    const address = encodeURIComponent(this.branchData.address);
    // Using a placeholder map URL - replace with your actual Google Maps API key
    return `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=15&size=600x200&markers=color:red%7C${address}&key=YOUR_API_KEY`;
  }

  /**
   * Open map in external app
   */
  openMap(): void {
    console.log('[Branch Details] Opening map');
    const address = encodeURIComponent(this.branchData.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
  }

  /**
   * Get directions to branch
   */
  getDirections(): void {
    console.log('[Branch Details] Getting directions');
    const address = encodeURIComponent(this.branchData.address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  }

  /**
   * Call the branch
   */
  callBranch(): void {
    console.log('[Branch Details] Calling branch');
    window.location.href = `tel:${this.branchData.phone}`;
  }

  /**
   * View all reviews
   */
  viewAllReviews(): void {
    console.log('[Branch Details] Viewing all reviews');
    this.navCtrl.navigateForward('/branch-reviews', {
      state: { branch: this.branchData }
    });
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