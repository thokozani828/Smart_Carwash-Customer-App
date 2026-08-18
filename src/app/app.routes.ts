import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.page').then((m) => m.BookingPage),
  },
  {
    path: 'vehicles',
    loadComponent: () => import('./vehicles/vehicles.page').then((m) => m.VehiclesPage),
  },
  {
    path: 'vip-membership',
    loadComponent: () => import('./vip-membership/vip-membership.page').then((m) => m.VipMembershipPage),
  },
  {
    path: 'booking-history',
    loadComponent: () => import('./booking-history/booking-history.page').then((m) => m.BookingHistoryPage),
  },
  {
    path: 'indemnity',
    loadComponent: () => import('./indemnity/indemnity.page').then((m) => m.IndemnityPage),
  },
  {
    path: 'payments',
    loadComponent: () => import('./payments/payments.page').then((m) => m.PaymentsPage),
  },
   {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
   {
    path: 'live-tracking',
    loadComponent: () => import('./live-tracking/live-tracking.page').then((m) => m.LiveTrackingPage),
  },
  {
    path: 'loyalty',
    loadComponent: () => import('./loyalty/loyalty.page').then((m) => m.LoyaltyPage),
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.page').then((m) => m.SupportPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then((m) => m.NotificationsPage),
  },
  {
    path: 'reviews',
    loadComponent: () => import('./reviews/reviews.page').then((m) => m.ReviewsPage),
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.page').then((m) => m.ServicesPage),
  },
   {
    path: 'packages',
    loadComponent: () => import('./packages/packages.page').then((m) => m.PackagesPage),
  },
  {
    path: 'booking-confirmation',
    loadComponent: () => import('./booking-confirmation/booking-confirmation.page').then((m) => m.BookingConfirmationPage),
  },
  {
    path: 'cash-payment',
    loadComponent: () => import('./cash-payment/cash-payment.page').then((m) => m.CashPaymentPage),
  },
  {
    path: 'booking-details',
    loadComponent: () => import('./booking-details/booking-details.page').then((m) => m.BookingDetailsPage),
  },
  {
    path: 'vip-payment',
    loadComponent: () => import('./vip-payment/vip-payment.page').then((m) => m.VipPaymentPage),
  },
  {
  path: 'change-password',
  loadComponent: () => import('./change-password/change-password.page').then(m => m.ChangePasswordPage)
},
{
  path: 'chat',
  loadComponent: () => import('./chat/chat.page').then(m => m.ChatPage)
},
 {
    path: 'vip-home',
    loadComponent: () => import('./vip-home/vip-home.page').then(m => m.VipHomePage)
  },
  {
  path: 'reschedule',
  loadComponent: () => import('./reschedule/reschedule.page').then(m => m.ReschedulePage)
},
{
    path: 'branch-details',
    loadComponent: () => import('./branch-details/branch-details.page').then(m => m.BranchDetailsPage)
  },
  {
    path: 'customize-subscription',
    loadComponent: () => import('./customize-subscription/customize-subscription.page').then(m => m.CustomizeSubscriptionPage)
  },  
  {
  path: 'forgot-password',
  loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
},

  {
    path: '**',
    redirectTo: 'splash',
  }
];