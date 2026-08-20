import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  // ==========================
  // AUTH & WELCOME PAGE ICONS
  // ==========================
  logoGoogle, 
  logoFacebook, 
  logoApple, 
  mailOutline, 
  logInOutline,
  personAddOutline,
  personOutline,
  arrowForwardOutline,
  arrowBackOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  checkmarkOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  callOutline,
  locationOutline,
  cardOutline,
  
  // ==========================
  // SPLASH & DASHBOARD ICONS
  // ==========================
  carOutline,
  sparklesOutline,
  waterOutline,
  timeOutline,
  cashOutline,
  shieldCheckmarkOutline,
  
  // ==========================
  // HOME PAGE ICONS
  // ==========================
  sunnyOutline,
  notificationsOutline,
  starOutline,
  calendarOutline,
  homeOutline,
  personCircleOutline,
  chatbubbleOutline,
  logoWhatsapp,
  chevronForwardOutline,
  diamondOutline,
  colorPaletteOutline,
  navigateOutline,
  flashOutline,
  peopleOutline,
  giftOutline,
  
  // ==========================
  // VEHICLES PAGE ICONS
  // ==========================
  carSportOutline,
  trashOutline,
  createOutline,
  addOutline,
  
  // ==========================
  // PAYMENTS PAGE ICONS
  // ==========================
  swapHorizontalOutline,
  globeOutline,
  
  // ==========================
  // PROFILE PAGE ICONS
  // ==========================
  scanOutline,
  settingsOutline,
  logOutOutline,
  
  // ==========================
  // LIVE TRACKING PAGE ICONS
  // ==========================
  checkmarkCircle,
  listOutline,
  
  // ==========================
  // BOOKING DETAILS PAGE ICONS
  // ==========================
  qrCodeOutline,
  refreshOutline,
  downloadOutline,
  cameraOutline,
  locateOutline,
  chevronDownOutline,
  
  // ==========================
  // VIP MEMBERSHIP ICONS
  // ==========================
  cubeOutline,
  
  // ==========================
  // SERVICES & PACKAGES ICONS
  // ==========================
  constructOutline,
  gridOutline,
  walkOutline,
  busOutline,
  calendarNumberOutline,
  pricetagOutline,
  peopleCircleOutline,
  hardwareChipOutline,
  barChartOutline,
  analyticsOutline,
  videocamOutline,
  documentTextOutline,
  clipboardOutline,
  
  // ==========================
  // TOP BAR & NAVIGATION ICONS
  // ==========================
  menuOutline,
  searchOutline,
  chatbubbleEllipsesOutline,
  printOutline,
  closeOutline,
  repeatOutline,
  starHalfOutline,
  
  // ==========================
  // CASH PAYMENT ICONS
  // ==========================
  phonePortraitOutline,
  
  // ==========================
  // NOTIFICATIONS ICONS
  // ==========================
  notificationsOffOutline,
  
  // ==========================
  // REVIEWS ICONS
  // ==========================
  thumbsUpOutline,
  bulbOutline,
  
  // ==========================
  // SETTINGS ICONS
  // ==========================
  moonOutline,
  languageOutline,
  fingerPrintOutline,
  shieldOutline,
  
  // ==========================
  // INDEMNITY ICONS
  // ==========================
  qrCodeOutline as qrIcon,
  refreshOutline as refreshIcon,
  downloadOutline as downloadIcon,
  cameraOutline as cameraIcon,
  
  // ==========================
  // VIP PAYMENT ICONS
  // ==========================
  reloadOutline,
  
  // ==========================
  // PAYMENT METHODS ICONS
  // ==========================
  phonePortraitOutline as phoneIcon,
  
  // ==========================
  // CHAT PAGE ICONS
  // ==========================
  ellipsisVerticalOutline,
  attachOutline,
  happyOutline,
  sendOutline,
  checkmarkDoneOutline,
  chevronUpOutline,
  
  // ==========================
  // CUSTOMIZE SUBSCRIPTION ICONS (NEW)
  // ==========================
  banOutline,
  informationCircleOutline,
  closeCircleOutline,
  addCircleOutline,
  // Additional icons needed for Customize Subscription
  chevronBackOutline,
  calendarClearOutline,
  checkmarkDoneCircleOutline,
  ribbonOutline,
  trophyOutline,
  wifiOutline,
  cloudOutline,
  pinOutline,
  mapOutline,
  businessOutline,
  todayOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, 
    IonRouterOutlet,
  ],
})
export class AppComponent {
  constructor() {
    // Register all icons used across the app
    addIcons({
      // ==========================
      // AUTH & WELCOME PAGE ICONS
      // ==========================
      'logo-google': logoGoogle,
      'logo-facebook': logoFacebook,
      'logo-apple': logoApple,
      'mail-outline': mailOutline,
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline,
      'person-outline': personOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'arrow-back-outline': arrowBackOutline,
      'lock-closed-outline': lockClosedOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'checkmark-outline': checkmarkOutline,
      'alert-circle-outline': alertCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'call-outline': callOutline,
      'location-outline': locationOutline,
      'card-outline': cardOutline,
      
      // ==========================
      // SPLASH PAGE ICONS
      // ==========================
      'car-outline': carOutline,
      'sparkles-outline': sparklesOutline,
      'water-outline': waterOutline,
      'time-outline': timeOutline,
      'cash-outline': cashOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      
      // ==========================
      // HOME PAGE ICONS
      // ==========================
      'sunny-outline': sunnyOutline,
      'notifications-outline': notificationsOutline,
      'star-outline': starOutline,
      'calendar-outline': calendarOutline,
      'home-outline': homeOutline,
      'person-circle-outline': personCircleOutline,
      'chatbubble-outline': chatbubbleOutline,
      'logo-whatsapp': logoWhatsapp,
      'chevron-forward-outline': chevronForwardOutline,
      'diamond-outline': diamondOutline,
      'color-palette-outline': colorPaletteOutline,
      'navigate-outline': navigateOutline,
      'flash-outline': flashOutline,
      'people-outline': peopleOutline,
      'gift-outline': giftOutline,
      
      // ==========================
      // VEHICLES PAGE ICONS
      // ==========================
      'car-sport-outline': carSportOutline,
      'trash-outline': trashOutline,
      'create-outline': createOutline,
      'add-outline': addOutline,
      
      // ==========================
      // PAYMENTS PAGE ICONS
      // ==========================
      'swap-horizontal-outline': swapHorizontalOutline,
      'globe-outline': globeOutline,
      
      // ==========================
      // PROFILE PAGE ICONS
      // ==========================
      'scan-outline': scanOutline,
      'settings-outline': settingsOutline,
      'log-out-outline': logOutOutline,
      
      // ==========================
      // LIVE TRACKING PAGE ICONS
      // ==========================
      'checkmark-circle': checkmarkCircle,
      'list-outline': listOutline,
      
      // ==========================
      // BOOKING DETAILS PAGE ICONS
      // ==========================
      'qr-code-outline': qrCodeOutline,
      'refresh-outline': refreshOutline,
      'download-outline': downloadOutline,
      'camera-outline': cameraOutline,
      'locate-outline': locateOutline,
      'chevron-down-outline': chevronDownOutline,
      
      // ==========================
      // VIP MEMBERSHIP ICONS
      // ==========================
      'cube-outline': cubeOutline,
      
      // ==========================
      // VIP PAYMENT ICONS
      // ==========================
      'reload-outline': reloadOutline,
      
      // ==========================
      // SERVICES & PACKAGES ICONS
      // ==========================
      'construct-outline': constructOutline,
      'grid-outline': gridOutline,
      'walk-outline': walkOutline,
      'bus-outline': busOutline,
      'calendar-number-outline': calendarNumberOutline,
      'pricetag-outline': pricetagOutline,
      'people-circle-outline': peopleCircleOutline,
      'hardware-chip-outline': hardwareChipOutline,
      'bar-chart-outline': barChartOutline,
      'analytics-outline': analyticsOutline,
      'videocam-outline': videocamOutline,
      'document-text-outline': documentTextOutline,
      'clipboard-outline': clipboardOutline,
      
      // ==========================
      // TOP BAR & NAVIGATION ICONS
      // ==========================
      'menu-outline': menuOutline,
      'search-outline': searchOutline,
      'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
      'print-outline': printOutline,
      'close-outline': closeOutline,
      'repeat-outline': repeatOutline,
      'star-half-outline': starHalfOutline,
      
      // ==========================
      // CASH PAYMENT ICONS
      // ==========================
      'phone-portrait-outline': phonePortraitOutline,
      
      // ==========================
      // NOTIFICATIONS ICONS
      // ==========================
      'notifications-off-outline': notificationsOffOutline,
      
      // ==========================
      // REVIEWS ICONS
      // ==========================
      'thumbs-up-outline': thumbsUpOutline,
      'bulb-outline': bulbOutline,
      
      // ==========================
      // SETTINGS ICONS
      // ==========================
      'moon-outline': moonOutline,
      'language-outline': languageOutline,
      'finger-print-outline': fingerPrintOutline,
      'shield-outline': shieldOutline,
      
      // ==========================
      // CHAT PAGE ICONS
      // ==========================
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'attach-outline': attachOutline,
      'happy-outline': happyOutline,
      'send-outline': sendOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'chevron-up-outline': chevronUpOutline,
      
      // ==========================
      // CUSTOMIZE SUBSCRIPTION ICONS
      // ==========================
      'ban-outline': banOutline,
      'information-circle-outline': informationCircleOutline,
      'close-circle-outline': closeCircleOutline,
      'add-circle-outline': addCircleOutline,
      'chevron-back-outline': chevronBackOutline,
      'calendar-clear-outline': calendarClearOutline,
      'checkmark-done-circle-outline': checkmarkDoneCircleOutline,
      'ribbon-outline': ribbonOutline,
      'trophy-outline': trophyOutline,
      'wifi-outline': wifiOutline,
      'cloud-outline': cloudOutline,
      'pin-outline': pinOutline,
      'map-outline': mapOutline,
      'business-outline': businessOutline,
      'today-outline': todayOutline
    });
  }
}