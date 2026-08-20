import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController, AnimationController, Animation } from '@ionic/angular';
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
export class HomePage implements OnInit {
  
  isLoading: boolean = true;
  currentRoute: string = 'home';
  private animationController: AnimationController;

  services = [
    { name: 'Exterior', icon: 'water-outline', price: 'R180', color: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
    { name: 'Interior', icon: 'sparkles-outline', price: 'R220', color: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    { name: 'Premium', icon: 'star-outline', price: 'R350', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { name: 'VIP', icon: 'diamond-outline', price: 'R450', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    animationCtrl: AnimationController
  ) {
    this.animationController = animationCtrl;
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const route = event.url.split('/')[1] || 'home';
      this.currentRoute = route;
      if (route === 'home' || route === '') {
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

  // Fixed: Native Ionic Animation for navigation with proper null checks
  private createPageTransition(): Animation | null {
    const element = document.querySelector('ion-router-outlet') || document.querySelector('ion-content');
    
    // Return null if element not found
    if (!element) {
      return null;
    }
    
    const animation = this.animationController.create()
      .addElement(element as HTMLElement)
      .duration(400)
      .easing('cubic-bezier(0.4, 0, 0.2, 1)')
      .fromTo('opacity', 0, 1)
      .fromTo('transform', 'translateY(20px) scale(0.98)', 'translateY(0) scale(1)');
    
    return animation;
  }

  // Optional: Custom animated navigation
  navigateWithAnimation(page: string): void {
    const animation = this.createPageTransition();
    
    if (animation) {
      // Play animation then navigate
      animation.play();
      setTimeout(() => {
        this.navCtrl.navigateForward(`/${page}`, {
          animated: true,
          animationDirection: 'forward'
        });
      }, 300);
    } else {
      // Fallback navigation without custom animation
      this.navCtrl.navigateForward(`/${page}`, {
        animated: true,
        animationDirection: 'forward'
      });
    }
  }

  navigateToCarWashMap(): void {
    console.log('[Home] Navigating to carwash-map');
    
    // Use native Ionic navigation with animation
    this.navCtrl.navigateForward('/carwash-map', {
      animated: true,
      animationDirection: 'forward'
    });
  }

  navigateTo(page: string): void {
    console.log('[Home] Navigating to:', page);
    
    if (page === 'carwash-map') {
      this.navigateToCarWashMap();
      return;
    }
    
    if (this.currentRoute === page) {
      return;
    }
    
    // Use native Ionic navigation with animation
    this.navCtrl.navigateForward(`/${page}`, {
      animated: true,
      animationDirection: 'forward'
    });
  }

  // Back navigation with animation
  goBack(): void {
    this.navCtrl.back({
      animated: true,
      animationDirection: 'back'
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    const navMap: { [key: string]: string } = {
      '1': 'home',
      '2': 'booking',
      '3': 'booking-history',
      '4': 'vehicles'
    };
    
    if (key in navMap) {
      this.navigateTo(navMap[key]);
      event.preventDefault();
    }
    
    // Back button support
    if (key === 'Escape' || key === 'Backspace') {
      this.goBack();
      event.preventDefault();
    }
  }
}