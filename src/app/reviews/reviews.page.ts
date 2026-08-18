import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReviewsPage {
  
  // Loading state for skeleton
  isLoading: boolean = true;

  // Form state
  showForm: boolean = false;
  formMode: string = 'review';
  selectedRating: number = 0;
  feedbackTitle: string = '';
  feedbackContent: string = '';
  priority: string = 'medium';

  // My feedback history
  myFeedback: any[] = [];

  // User name (would come from auth service in real app)
  userName: string = 'John Doe';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('/reviews')) {
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
      // Load user's feedback history
      this.myFeedback = [
        {
          id: 1,
          name: this.userName,
          title: 'Excellent Service!',
          content: 'The team did an amazing job on my car. Very professional and thorough.',
          rating: 5,
          date: '2026-07-15',
          type: 'Review',
          status: 'Published',
          avatarColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
        },
        {
          id: 2,
          name: this.userName,
          title: 'Quick and Efficient',
          content: 'Great service, fast turnaround time. Highly recommend!',
          rating: 4,
          date: '2026-07-10',
          type: 'Review',
          status: 'Published',
          avatarColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
        },
        {
          id: 3,
          name: this.userName,
          title: 'Minor Issue with Booking',
          content: 'There was a small delay in scheduling. Otherwise good experience.',
          rating: 3,
          date: '2026-07-05',
          type: 'Review',
          status: 'Published',
          avatarColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
        }
      ];
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
   * Open feedback form
   */
  openForm(mode: string): void {
    this.formMode = mode;
    this.selectedRating = 0;
    this.feedbackTitle = '';
    this.feedbackContent = '';
    this.priority = 'medium';
    this.showForm = true;
  }

  /**
   * Close feedback form
   */
  closeForm(): void {
    this.showForm = false;
  }

  /**
   * Set rating
   */
  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  /**
   * Submit feedback
   */
  submitFeedback(): void {
    if (this.formMode === 'rate' && this.selectedRating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!this.feedbackTitle.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!this.feedbackContent.trim()) {
      alert('Please enter your feedback');
      return;
    }

    // Create new feedback entry
    const newFeedback = {
      id: Date.now(),
      name: this.userName,
      title: this.feedbackTitle.trim(),
      content: this.feedbackContent.trim(),
      rating: this.selectedRating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      type: this.formMode === 'complaint' ? 'Complaint' : 
            this.formMode === 'suggestion' ? 'Suggestion' : 
            this.formMode === 'rate' ? 'Rating' : 'Review',
      status: 'Pending',
      avatarColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
    };

    // Add to my feedback
    this.myFeedback.unshift(newFeedback);

    // Show success message
    const messages = {
      rate: 'Rating submitted successfully!',
      review: 'Review submitted successfully!',
      complaint: 'Complaint submitted successfully!',
      suggestion: 'Suggestion submitted successfully!'
    };
    alert(messages[this.formMode as keyof typeof messages] || 'Feedback submitted successfully!');

    // Close form
    this.closeForm();
  }

  /**
   * View all feedback
   */
  viewAllFeedback(): void {
    console.log('[Reviews] Viewing all feedback');
    // In a real app, navigate to full list
  }
}