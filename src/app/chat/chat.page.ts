import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatPage implements AfterViewChecked {
  
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  // Loading state for skeleton
  isLoading: boolean = true;

  // Chat state
  messages: any[] = [];
  newMessage: string = '';
  isTyping: boolean = false;
  showQuickReplies: boolean = true;

  // Quick Replies
  quickReplies = [
    'How do I book a wash?',
    'What are your hours?',
    'Payment methods',
    'Cancel booking'
  ];

  // Auto-reply responses
  autoReplies = [
    'Thank you for your message! How can I assist you today?',
    'I understand. Let me help you with that.',
    'That\'s a great question! Let me explain...',
    'I\'ll look into that for you right away.',
    'Is there anything else I can help you with?'
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('/chat')) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.messages = [
        {
          text: 'Hello! Welcome to Car Wash Support. How can I help you today?',
          time: this.getCurrentTime(),
          type: 'received',
          status: 'read'
        },
        {
          text: 'I need help with my booking. I want to reschedule.',
          time: this.getCurrentTime(),
          type: 'sent',
          status: 'read'
        },
        {
          text: 'Of course! I can help you reschedule your booking. What\'s your booking reference number?',
          time: this.getCurrentTime(),
          type: 'received',
          status: 'read'
        },
        {
          text: 'It\'s BK-2026-001',
          time: this.getCurrentTime(),
          type: 'sent',
          status: 'delivered'
        }
      ];
      this.isLoading = false;
      this.scrollToBottom();
    }, 1500);
  }

  /**
   * Send a message
   */
  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const message = {
      text: this.newMessage.trim(),
      time: this.getCurrentTime(),
      type: 'sent',
      status: 'sent'
    };

    this.messages.push(message);
    this.newMessage = '';
    this.showQuickReplies = false;
    this.scrollToBottom();

    // Simulate message being delivered
    setTimeout(() => {
      const lastSent = this.messages.filter(m => m.type === 'sent').pop();
      if (lastSent) {
        lastSent.status = 'delivered';
      }
    }, 500);

    // Simulate agent typing
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
      this.autoReply();
    }, 1500 + Math.random() * 2000);
  }

  /**
   * Auto reply from agent
   */
  autoReply(): void {
    const reply = this.autoReplies[Math.floor(Math.random() * this.autoReplies.length)];
    const message = {
      text: reply,
      time: this.getCurrentTime(),
      type: 'received',
      status: 'read'
    };
    this.messages.push(message);
    this.scrollToBottom();
  }

  /**
   * Send quick reply
   */
  sendQuickReply(reply: string): void {
    this.newMessage = reply;
    this.sendMessage();
  }

  /**
   * Get current time
   */
  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Scroll to bottom of chat
   */
  scrollToBottom(): void {
    try {
      if (this.chatMessages) {
        const element = this.chatMessages.nativeElement;
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    } catch (err) {}
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
   * Show options
   */
  showOptions(): void {
    console.log('[Chat] Showing options');
    // In a real app, this would show a popover with options
  }

  /**
   * Attach file
   */
  attachFile(): void {
    console.log('[Chat] Attaching file');
    // In a real app, this would open file picker
  }

  /**
   * Toggle emoji picker
   */
  toggleEmoji(): void {
    console.log('[Chat] Toggling emoji');
    // In a real app, this would open emoji picker
  }
}