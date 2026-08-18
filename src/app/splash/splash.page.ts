import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SplashPage implements OnInit, OnDestroy {
  
  private timer: any = null;
  private readonly SPLASH_DURATION: number = 5000; // 5 seconds
  private targetRoute: string = '/welcome'; // Change to your welcome page route
  
  constructor(
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.initializeSplash();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initializeSplash(): void {
    console.log('[SmartCarWash] Splash screen initialized');
    
    // Navigate after 2 seconds
    this.timer = setTimeout(() => {
      this.navigateToTarget();
    }, this.SPLASH_DURATION);
  }

  private navigateToTarget(): void {
    try {
      this.navCtrl.navigateRoot(this.targetRoute, {
        animated: true,
        animationDirection: 'forward'
      });
    } catch (error) {
      console.error('[SmartCarWash] Navigation failed:', error);
      this.router.navigate([this.targetRoute], { replaceUrl: true });
    }
  }

  private cleanup(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}