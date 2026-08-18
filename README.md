🚗 Smart Carwash
Smart Carwash Management & Booking Platform
https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white
https://img.shields.io/badge/Ionic-7+-3880FF?style=for-the-badge&logo=ionic&logoColor=white
https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white
https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white
https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white

📋 Table of Contents
About Smart Carwash

Main Goal

System Architecture

Smart Business

User Types

How It Works

Key Features

Ratings & Reviews

Mobile Carwash

Location-Based Services

Technical Architecture

Central Database

Multi-Tenant Architecture

Authentication & Authorization

API Integration

Technology Stack

Project Structure

Future Vision & Scalability

✨ About Smart Carwash
Smart Carwash is an intern-developed digital car wash platform created as part of SmartXchange. The project explores how technology can modernize the car wash industry by connecting customers, car wash businesses, business owners, receptionists, washers, mobile washers, drivers, and platform administrators through one integrated ecosystem.

Role	Description
🧑‍🤝‍🧑 Customers	Discover nearby car washes, book services, track bookings, and leave reviews
🏢 Businesses	Manage operations, staff, bookings, and performance via Smart Business
👔 Owners	Register businesses, configure services, and monitor analytics
🖥️ Receptionists	Manage front-desk operations, check-ins, and payments
🧼 Washers	View and update assigned washing jobs
🚐 Mobile Washers	Travel to customers and perform mobile services
⚙️ Administrators	Manage the overall platform and approve businesses
The system is designed as a multi-business platform, meaning multiple independent car wash businesses can operate on the same Smart Carwash platform while maintaining separation of their business data.

🎯 Main Goal
The main goal of Smart Carwash is to create a centralized digital platform that makes car wash services:

Attribute	Description
⚡ Faster	Quick discovery and booking process
📋 Organized	Streamlined operations and queue management
📱 Accessible	Available anytime, anywhere via mobile and web
👁️ Transparent	Clear pricing, ratings, and service information
😊 Customer-Friendly	Easy-to-use interface and booking experience
📊 Data-Driven	Analytics and insights for businesses
📈 Scalable	Supports growth across multiple cities and businesses
🚗 Flexible	Both physical and mobile car wash services
Instead of customers having to manually search for car washes or visit different locations to check availability, Smart Carwash allows them to discover nearby businesses, compare ratings and services, and make bookings digitally.

🏗️ System Architecture
Smart Carwash consists of multiple applications that communicate through a shared backend/API and centralized database.























🏢 Smart Business
What is Smart Business?
Smart Business is the business-facing component of Smart Carwash. It provides car wash owners and authorized staff with the tools they need to manage their businesses digitally.

Instead of creating a completely separate system for every car wash owner, Smart Carwash provides one platform where multiple businesses can register and manage their operations.

text
Smart Carwash
      │
      ├── ABC Carwash
      │      ├── Receptionists
      │      ├── Washers
      │      ├── Customers
      │      └── Vehicles
      │
      ├── Durban Shine Carwash
      │      ├── Receptionists
      │      ├── Washers
      │      ├── Customers
      │      └── Vehicles
      │
      └── Premium Auto Wash
             ├── Receptionists
             ├── Washers
             ├── Customers
             └── Vehicles
Each business has its own operational data while remaining part of the wider Smart Carwash ecosystem.

👥 User Types
1. Customer
Customers use the Smart Carwash customer application to:

Feature	Description
🔐 Account	Create an account and manage profile
🚗 Vehicles	Add and manage vehicles
📍 Discovery	Find nearby car washes using GPS
⭐ Ratings	View business ratings and reviews
💰 Services	View available services and prices
📅 Booking	Make bookings and request mobile services
🔔 Notifications	Receive booking updates
📜 History	View booking and vehicle history
✍️ Reviews	Rate completed services and leave reviews
2. Business Owner
Business owners use Smart Business to manage their car wash:

Feature	Description
🏢 Registration	Register and manage business information
📍 Locations	Add business locations
🛠️ Services	Add services and set prices
🕐 Hours	Manage operating hours
📱 Mobile	Enable/disable and configure mobile services
👥 Staff	Manage employees, washers, and receptionists
👤 Customers	Manage customer information
🚗 Vehicles	Manage vehicle records
📅 Bookings	Manage bookings and queues
📊 Analytics	Track revenue and view performance metrics
⭐ Feedback	Monitor ratings and reviews
3. Receptionist
The receptionist manages front-desk operations for a physical car wash:

Feature	Description
📅 Bookings	View today's bookings
🚶 Walk-ins	Register walk-in customers
✅ Check-in	Check customers in
📋 Queue	Manage the queue
🚗 Vehicles	Assign vehicles
👨‍🔧 Washers	Assign washers
🔄 Status	Update booking status
💳 Payments	Process customer payments
🚪 Check-out	Check vehicles out
4. Washer
Washers use the washer dashboard to view and manage assigned washing jobs:

text
New Job
   ↓
Assigned
   ↓
Vehicle Received
   ↓
Washing
   ↓
Quality Check
   ↓
Completed
The washer can update the progress of the assigned service.

5. Mobile Washer / Driver
Mobile washers are responsible for travelling to customers and performing mobile car wash services:

Feature	Description
📋 Jobs	View available mobile jobs
✅ Accept	Accept mobile bookings
📍 Location	View customer locations
🚗 Vehicle	View vehicle information
🛠️ Service	View service information
🗺️ Navigate	Navigate to the customer
🔄 Status	Update job status
📍 Arrival	Mark arrival
🧼 Wash	Start and complete the service
text
New Mobile Job
      ↓
Accept Job
      ↓
On the Way
      ↓
Arrived
      ↓
Washing
      ↓
Completed
6. Platform Administrator
The platform administrator manages the overall Smart Carwash platform:

Feature	Description
✅ Approvals	Approve businesses
📋 Management	Manage registered businesses
👤 Users	Manage platform users
📊 Monitoring	Monitor system activity
📈 Analytics	View platform analytics
⚠️ Reports	Manage reported businesses
💳 Transactions	Monitor transactions
📋 Subscriptions	Manage subscriptions
⚙️ Settings	Manage platform settings
📑 Reports	View system-wide reports
🔄 How Smart Carwash Works
Step 1 — Business Registration
A car wash owner registers their business through Smart Business:

text
Business Name
Business Description
Location
Contact Information
Operating Hours
Services
Prices
Business Images
Mobile Service Availability
The platform administrator can review and approve the business.

Step 2 — Business Setup
Once approved, the business owner configures the car wash:

text
Services
Employees
Washers
Receptionists
Prices
Operating Hours
Locations
Mobile Services
Mobile Service Radius
Step 3 — Customer Finds a Nearby Carwash
The customer opens the Smart Carwash application and uses their location to display nearby registered car washes:

text
Customer Location
       ↓
GPS / Location Service
       ↓
Smart Carwash Backend
       ↓
Find Nearby Carwashes
       ↓
Calculate Distance
       ↓
Check Availability
       ↓
Display Results
Example Results:

text
Nearby Carwashes

1. WashPro
   📍 1.2 km away
   ⭐ 4.8 (126 reviews)
   🚗 Physical + Mobile
   From R80

2. Durban Auto Wash
   📍 2.1 km away
   ⭐ 4.6 (89 reviews)
   🚗 Physical
   From R70

3. Premium Shine
   📍 3.4 km away
   ⭐ 4.9 (214 reviews)
   🚗 Mobile
   From R100
🌟 Key Features
⭐ Ratings & Reviews
Ratings and reviews are an important part of Smart Carwash. Customers can see a business's rating before selecting it:

text
WashPro

⭐ 4.8 / 5

★★★★★
126 Customer Reviews
After completing a booking:

text
Service Completed

How was your experience?

★★★★★

Rate the Business
Rate the Washer
Rate the Service
Leave a Review
Ratings contribute to:

Overall business rating

Individual washer rating

Service rating

🚗 Mobile Carwash
Smart Carwash supports Mobile Carwash services. Customers don't have to travel to a physical car wash; they can request an available mobile washer to come to their location:













🗺️ Location-Based Services
Physical Carwash: Customer travels to the business

text
Customer
   ↓
Nearby Carwash
   ↓
View Ratings & Services
   ↓
Book
   ↓
Travel to Business
   ↓
Check-In
   ↓
Vehicle Washed
   ↓
Check-Out
Mobile Carwash: Washer travels to the customer

text
Customer
   ↓
Mobile Carwash
   ↓
Enter / Confirm Location
   ↓
Available Mobile Washer
   ↓
Select Service
   ↓
Book
   ↓
Washer Travels to Customer
   ↓
Vehicle Washed
   ↓
Service Completed
⚙️ Technical Architecture
🗄️ Central Database
The database contains the core entities required by the platform:

Table	Description
users	Platform users
businesses	Registered businesses
business_locations	Business locations
employees	Staff members
customers	Platform customers
vehicles	Customer vehicles
services	Available services
bookings	Service bookings
booking_items	Booking line items
queues	Service queues
wash_jobs	Washing jobs
payments	Payment records
notifications	System notifications
reviews	Customer reviews
subscriptions	Business subscriptions
mobile_service_areas	Mobile service coverage
Data Relationships:

text
Business
   │
   ├── Employees
   ├── Services
   ├── Bookings
   ├── Locations
   └── Customers
          │
          └── Vehicles
Every business-owned record should be associated with a business_id:

text
business_id = 101
🔐 Multi-Tenant Architecture
Because Smart Carwash supports multiple independent businesses, the platform uses a multi-tenant architecture:

text
Business A
business_id = 101

Business B
business_id = 102

Business C
business_id = 103
When Business A logs in, it should only see Business A's information:

✅ Customers (only from Business A)

✅ Bookings (only from Business A)

✅ Employees (only from Business A)

✅ Vehicles (only from Business A)

✅ Revenue (only from Business A)

✅ Internal business data (only from Business A)

🔑 Authentication & Authorization
The central authentication system uses Role-Based Access Control (RBAC):

Role	Access
SUPER_ADMIN	Admin Dashboard
BUSINESS_OWNER	Smart Business
MANAGER	Smart Business (limited)
RECEPTIONIST	Receptionist Dashboard
WASHER	Washer Dashboard
MOBILE_WASHER	Mobile Washer / Driver App
CUSTOMER	Customer App
DRIVER	Mobile Washer / Driver App
📡 API Integration
All applications communicate with the central backend through REST APIs:

Method	Endpoint	Description
POST	/auth/login	User authentication
POST	/businesses	Register business
GET	/businesses	List businesses
GET	/businesses/nearby	Find nearby businesses
GET	/businesses/{id}	Get business details
GET	/services	List services
POST	/services	Add service
GET	/bookings	List bookings
POST	/bookings	Create booking
PUT	/bookings/{id}	Update booking
POST	/vehicles	Add vehicle
GET	/vehicles	List vehicles
GET	/wash-jobs	List wash jobs
PUT	/wash-jobs/{id}/status	Update job status
GET	/mobile-washers/nearby	Find nearby washers
GET	/reviews	List reviews
POST	/reviews	Add review
GET	/analytics	Get analytics
GET	/notifications	Get notifications
🛠️ Recommended Technology Structure
Frontend Applications
text
smart-carwash/
│
├── customer-app/
│   └── Ionic + Angular + TypeScript
│
├── smart-business/
│   └── Ionic + Angular + TypeScript
│
├── admin-dashboard/
│   └── Ionic + Angular + TypeScript
│
├── receptionist-dashboard/
│   └── Ionic + Angular + TypeScript
│
├── washer-dashboard/
│   └── Ionic + Angular + TypeScript
│
├── mobile-washer-app/
│   └── Ionic + Angular + TypeScript
│
└── backend/
    └── REST API + Node.js/PHP + MySQL
Technology Stack
Layer	Technology
Frontend	Ionic 7+, Angular 17+, TypeScript 5+, SCSS
Backend	REST API, Node.js / PHP, Authentication, Notifications
Database	MySQL, PostgreSQL, or Supabase PostgreSQL
📱 Frontend Applications
The project can be structured as multiple frontend applications, each with a specific purpose:

text
Customer App ───────┐
Smart Business ─────┤
Admin Dashboard ────┤
Receptionist ───────┤
Washer Dashboard ───┤──→ Central API ──→ Central Database
Mobile Washer App ──┤
Driver App ──────────┘
They do not need separate databases.

🚀 Future Vision & Scalability
📍 Geographic Expansion
The architecture allows Smart Carwash to grow beyond a single city:

text
Smart Carwash
│
├── Durban
│   ├── Business A
│   ├── Business B
│   └── Business C
│
├── Johannesburg
│   ├── Business D
│   └── Business E
│
├── Cape Town
│   ├── Business F
│   └── Business G
│
└── Other Cities
The same platform can eventually support thousands of businesses without requiring a completely new application for every business.

🔮 Future Features
Category	Features
Business	Multiple branches per business, Subscription plans, Advanced reporting
Services	Loyalty programs, Memberships, Promotions
Bookings	Live mobile washer tracking, AI-powered analytics, Automated notifications
Management	Employee management, Queue management, Vehicle history
Payments	Online payments, Payment gateway integration
Analytics	Customer analytics, Business analytics, AI-powered insights
📌 Project Principle
Separate the applications, but centralize the platform services and data.

The Customer App, Smart Business, Admin Dashboard, Receptionist Dashboard, Washer Dashboard, and Mobile Washer App remain separate applications. However, they communicate through the same Smart Carwash backend/API and central database.

This makes Smart Carwash easier to:

Benefit	Description
🔧 Maintain	Single source of truth, consistent updates
🔒 Secure	Centralized authentication and data protection
📈 Scale	Add new businesses without rebuilding
🔗 Integrate	Seamless communication between applications
📊 Monitor	Centralized logging and analytics
➕ Extend	Add new features without affecting others
🎯 Long-Term Vision
Stakeholder	Vision
Customers	Find a nearby carwash, compare ratings, choose a service, book it, and track your wash
Businesses	Manage your carwash, customers, staff, bookings, payments, and mobile services from one platform
Mobile Washers	Receive jobs, navigate to customers, update service status, complete washes, and build a service rating
🏢 Smart Carwash
One platform. Multiple businesses. Physical and mobile carwash services. One connected ecosystem.

Built with passion as an intern project at SmartXchange.

