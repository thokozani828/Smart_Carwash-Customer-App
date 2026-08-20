import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  searchOutline, 
  locationOutline, 
  star, 
  timeOutline, 
  arrowBackOutline,
  starOutline,
  carSportOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-carwash-map',
  templateUrl: './carwash-map.page.html',
  styleUrls: ['./carwash-map.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarwashMapPage implements OnInit {
  
  isExpanded = false;
  searchQuery = '';
  selectedFilter = 'all';
  isLoading = true; // ✅ Skeleton trigger
  
  // Carwash Data
  carwashes: any[] = [
    { id: 1, name: 'Wash & Go Main', rating: 4.8, reviews: 234, distance: 0.8, waitTime: 5, isOpen: true, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202923.png', address: '123 Main Street' },
    { id: 2, name: 'Express Auto Spa', rating: 4.5, reviews: 189, distance: 1.2, waitTime: 10, isOpen: true, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202930.png', address: '45 Beach Road' },
    { id: 3, name: 'Premium Car Care Centre', rating: 4.9, reviews: 312, distance: 2.1, waitTime: 15, isOpen: true, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202932.png', address: '78 Garden Avenue' },
    { id: 4, name: 'VIP Detailing Studio', rating: 4.7, reviews: 156, distance: 3.0, waitTime: 20, isOpen: false, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', address: '12 Sunset Boulevard' },
    { id: 5, name: 'Quick Shine Express', rating: 4.3, reviews: 98, distance: 1.8, waitTime: 8, isOpen: true, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202931.png', address: '56 North Coast Road' },
    { id: 6, name: 'Splash & Dash', rating: 4.6, reviews: 201, distance: 2.5, waitTime: 12, isOpen: true, 
      logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202928.png', address: '34 Harbour Road' }
  ];
  
  filteredCarwashes: any[] = [];

  constructor(private navCtrl: NavController) {
    addIcons({
      searchOutline, locationOutline, star, timeOutline, arrowBackOutline, starOutline, carSportOutline
    });
  }

  ngOnInit() {
    // ✅ Show Skeleton for 1.5 seconds, then load data
    this.isLoading = true;
    setTimeout(() => {
      this.filteredCarwashes = [...this.carwashes];
      this.isLoading = false;
    }, 1500);
  }

  // SEARCH & FILTER LOGIC
  filterCarwashes() {
    if (this.isLoading) return; // Don't filter while skeleton is showing

    let filtered = [...this.carwashes];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(cw => 
        cw.name.toLowerCase().startsWith(query) ||
        cw.address.toLowerCase().includes(query)
      );
    }

    switch (this.selectedFilter) {
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'distance': filtered.sort((a, b) => a.distance - b.distance); break;
      case 'open': filtered = filtered.filter(cw => cw.isOpen === true); break;
      default: break;
    }

    this.filteredCarwashes = filtered;
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterCarwashes();
  }

  toggleSheet() {
    this.isExpanded = !this.isExpanded;
  }

  goBack() {
    this.navCtrl.back();
  }

  selectCarwash(carwash: any) {
    const items = document.querySelectorAll('.carwash-item');
    items.forEach((item: any) => {
      if (item.dataset?.id == carwash.id) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        item.style.borderColor = '#2563eb';
        item.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        setTimeout(() => {
          item.style.borderColor = '';
          item.style.boxShadow = '';
        }, 2500);
      }
    });
  }

  bookCarwash(carwash: any) {
    this.navCtrl.navigateForward('/booking', {
      state: { carwash: carwash }
    });
  }
}