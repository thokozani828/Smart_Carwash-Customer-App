# 🚗 Smart Carwash

## Smart Carwash Management & Booking Platform

**Smart Carwash** is an intern-developed digital car wash platform created as part of **SmartXchange**. The project is inspired by the SmartXchange name and explores how technology can modernize the car wash industry.

Smart Carwash connects **customers, car wash businesses, business owners, receptionists, washers, mobile washers, drivers, and platform administrators** through one integrated ecosystem.

The platform allows customers to:

* Discover nearby car washes using their location
* View car wash ratings and customer reviews
* Compare services and prices
* Book physical car wash services
* Request mobile car wash services
* Track their booking and service status
* Receive notifications
* Rate and review completed services

At the same time, car wash businesses can use **Smart Business** to manage their businesses, employees, bookings, customers, vehicles, services, queues, mobile services, payments, and business performance.

The system is designed as a **multi-business platform**, meaning multiple independent car wash businesses can operate on the same Smart Carwash platform while maintaining separation of their business data.

---

# 🏢 About the Project

Smart Carwash is being developed as an **intern project at SmartXchange**.

The name **Smart Carwash** is inspired by the **SmartXchange** identity, while the platform itself focuses specifically on solving problems within the car wash industry.

The project provides an opportunity to apply software development concepts to a real-world business solution, including:

* Mobile application development
* Web application development
* Backend/API development
* Database design
* Authentication and authorization
* Location-based services
* Booking management
* Business management
* Payment integration
* Notifications
* Ratings and reviews
* Multi-business architecture

---

# 🎯 Main Goal

The main goal of Smart Carwash is to create a centralized digital platform that makes car wash services:

* Faster
* More organized
* Easier to access
* More transparent
* Customer-friendly
* Data-driven
* Scalable
* Available through both physical and mobile services

Instead of customers having to manually search for car washes or visit different locations to check availability, Smart Carwash allows them to discover nearby businesses, compare ratings and services, and make bookings digitally.

The platform also supports **mobile car wash services**, where a washer can travel directly to the customer's location.

---

# 🏗️ System Architecture

Smart Carwash consists of multiple applications that communicate through a shared backend/API and centralized database.

```text
                         SMART CARWASH ECOSYSTEM
                                  │
                    ┌─────────────┴─────────────┐
                    │       CENTRAL BACKEND      │
                    │                            │
                    │  API + Database + Auth     │
                    │  Notifications + Services  │
                    └─────────────┬─────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌───────────────┐        ┌─────────────────┐       ┌────────────────┐
│ Customer App  │        │ Smart Business  │       │ Admin System   │
│               │        │                 │       │                │
│ Find Washes   │        │ Manage Business │       │ Platform Admin │
│ View Ratings  │        │ Manage Staff    │       │ Businesses     │
│ Book Services │        │ Bookings        │       │ Users          │
│ Mobile Wash   │        │ Mobile Services │       │ Reports        │
└───────┬───────┘        └────────┬────────┘       └────────────────┘
        │                         │
        │                         │
        ▼              ┌──────────┴───────────┐
┌──────────────┐       │                      │
│ Mobile /     │       ▼                      ▼
│ Driver App   │ ┌──────────────┐    ┌─────────────────┐
│              │ │ Receptionist │    │ Washer          │
│ Navigation   │ │ Dashboard    │    │ Dashboard       │
│ Mobile Jobs  │ │              │    │                 │
│ Job Status   │ │ Queue        │    │ Assigned Jobs   │
└──────────────┘ │ Bookings     │    │ Wash Status     │
                 │ Customers    │    │ Completion      │
                 └──────────────┘    └─────────────────┘
```

---

# 🏢 Smart Business

## What is Smart Business?

**Smart Business** is the business-facing component of Smart Carwash.

It provides car wash owners and authorized staff with the tools they need to manage their businesses digitally.

Instead of creating a completely separate system for every car wash owner, Smart Carwash provides one platform where multiple businesses can register and manage their operations.

For example:

```text
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
```

Each business has its own operational data while remaining part of the wider Smart Carwash ecosystem.

---

# 👥 User Types

Smart Carwash supports different user roles.

## 1. Customer

Customers use the Smart Carwash customer application to:

* Create an account
* Add vehicles
* Find nearby car washes
* View car wash locations
* View business ratings
* Read customer reviews
* View available services
* View prices
* Check availability
* Make bookings
* Request mobile car wash services
* Select preferred dates and times
* Track booking status
* Receive notifications
* View booking history
* View vehicle history
* Rate completed services
* Leave reviews

---

## 2. Business Owner

Business owners use **Smart Business** to manage their car wash.

They can:

* Register their business
* Manage business information
* Add business locations
* Add services
* Set service prices
* Manage operating hours
* Enable or disable mobile services
* Set mobile service areas
* Manage employees
* Manage washers
* Manage receptionists
* Manage customers
* Manage vehicles
* Manage bookings
* Manage queues
* Manage mobile bookings
* Track revenue
* View analytics
* Manage promotions
* View customer feedback
* Monitor ratings and reviews

---

## 3. Receptionist

The receptionist manages front-desk operations for a physical car wash.

They can:

* View today's bookings
* Register walk-in customers
* Check customers in
* Manage the queue
* Assign vehicles
* Assign washers
* Update booking status
* Process customer payments
* Check vehicles out
* View customer information

---

## 4. Washer

Washers use the washer dashboard to view and manage assigned washing jobs.

A typical physical wash flow is:

```text
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
```

The washer can update the progress of the assigned service.

---

## 5. Mobile Washer / Driver

Mobile washers are responsible for travelling to customers and performing mobile car wash services.

They can:

* View available mobile jobs
* Accept mobile bookings
* View customer locations
* View vehicle information
* View service information
* Navigate to the customer
* Update job status
* Mark arrival
* Start the wash
* Complete the service

Example:

```text
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
```

---

## 6. Platform Administrator

The platform administrator manages the overall Smart Carwash platform rather than an individual business.

The administrator can:

* Approve businesses
* Manage registered businesses
* Manage platform users
* Monitor system activity
* View platform analytics
* Manage reported businesses
* Monitor transactions
* Manage subscriptions
* Manage platform settings
* View system-wide reports

---

# 🔄 How Smart Carwash Works

## Step 1 — Business Registration

A car wash owner registers their business through **Smart Business**.

The owner provides information such as:

```text
Business Name
Business Description
Location
Contact Information
Operating Hours
Services
Prices
Business Images
Mobile Service Availability
```

The platform administrator can review and approve the business.

---

## Step 2 — Business Setup

Once approved, the business owner configures the car wash.

They can add:

```text
Services
Employees
Washers
Receptionists
Prices
Operating Hours
Locations
Mobile Services
Mobile Service Radius
```

---

# Step 3 — Customer Finds a Nearby Carwash

The customer opens the Smart Carwash application.

The application can use the customer's location to display nearby registered car washes.

```text
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
```

The customer can see:

```text
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
```

This allows customers to compare businesses before making a booking.

---

# ⭐ Ratings & Reviews

Ratings and reviews are an important part of Smart Carwash.

Customers should be able to see a business's rating before selecting it.

```text
WashPro

⭐ 4.8 / 5

★★★★★
126 Customer Reviews
```

After completing a booking, the customer can rate the business and service.

```text
Service Completed

How was your experience?

★★★★★

Rate the Business
Rate the Washer
Rate the Service
Leave a Review
```

Ratings can contribute to:

1. Overall business rating
2. Individual washer rating
3. Service rating

This helps customers identify highly-rated car washes and washers.

---

# 🚗 Mobile Carwash

Smart Carwash supports **Mobile Carwash** services.

Customers do not have to travel to a physical car wash. Instead, they can request an available mobile washer to come to their location.

```text
Customer
   ↓
Select "Mobile Carwash"
   ↓
Enter / Confirm Location
   ↓
Find Available Mobile Washers
   ↓
Select Service
   ↓
Select Date & Time
   ↓
Book
   ↓
Washer Receives Job
   ↓
Washer Travels to Customer
   ↓
Vehicle Washed
   ↓
Service Completed
   ↓
Customer Rates Service
```

---

# 🗺️ Location-Based Services

Smart Carwash supports both physical and mobile car wash services.

## Physical Carwash

The customer travels to the business.

```text
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
```

## Mobile Carwash

The washer travels to the customer.

```text
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
```

---

# 🔄 Integration With Smart Business

Mobile Carwash is integrated directly with **Smart Business**.

When a business owner enables mobile services, they can configure:

* Mobile service availability
* Service area/radius
* Mobile service prices
* Mobile washers
* Working hours
* Travel fees
* Minimum booking requirements

Example:

```text
Smart Business

Mobile Carwash: ENABLED

Service Radius: 15 km

Mobile Services:
✓ Basic Wash
✓ Full Wash
✓ Interior Cleaning
✓ Premium Detail

Travel Fee:
R30

Available Mobile Washers:
5
```

---

# 🧑‍💼 Business Management

Business owners can see both physical and mobile bookings from Smart Business.

```text
Today's Bookings

Physical
├── 18 Bookings
├── 3 Currently Washing
└── 4 Waiting

Mobile
├── 7 Bookings
├── 2 On the Way
├── 3 Washing
└── 2 Completed
```

This allows businesses to manage their physical and mobile operations from one platform.

---

# 🔗 Integration Between Systems

The different Smart Carwash applications should not operate as completely separate systems.

They communicate through a shared backend/API and centralized database.

```text
                    ┌───────────────────┐
                    │     DATABASE      │
                    │                   │
                    │ Users             │
                    │ Businesses        │
                    │ Vehicles          │
                    │ Bookings          │
                    │ Services          │
                    │ Payments          │
                    │ Employees         │
                    │ Reviews           │
                    │ Locations         │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
 Customer App          Smart Business         Admin App
        │                     │                     │
        ▼                     ▼                     ▼
 Mobile/Driver App     Receptionist App       Platform Admin
                              │
                              ▼
                        Washer App
```

---

# 🗄️ Central Database

The database contains the core entities required by the platform.

Possible tables include:

```text
users
businesses
business_locations
employees
customers
vehicles
services
bookings
booking_items
queues
wash_jobs
payments
notifications
reviews
subscriptions
mobile_service_areas
```

The records should be connected.

For example:

```text
Business
   │
   ├── Employees
   ├── Services
   ├── Bookings
   ├── Locations
   └── Customers
          │
          └── Vehicles
```

Every business-owned record should be associated with a `business_id`.

Example:

```text
business_id = 101
```

This allows Smart Carwash to separate one business's operational data from another business's data.

---

# 🔐 Multi-Tenant Architecture

Because Smart Carwash supports multiple independent businesses, the platform should use a **multi-tenant architecture**.

For example:

```text
Business A
business_id = 101

Business B
business_id = 102

Business C
business_id = 103
```

When Business A logs in, it should only see Business A's information.

Business B should not be able to access Business A's:

* Customers
* Bookings
* Employees
* Vehicles
* Revenue
* Internal business data

The backend must enforce this separation.

---

# 🔑 Authentication & Authorization

The central authentication system determines what each user is allowed to access.

Example roles:

```text
SUPER_ADMIN
BUSINESS_OWNER
MANAGER
RECEPTIONIST
WASHER
MOBILE_WASHER
CUSTOMER
DRIVER
```

Role-based access control should determine which applications and features each user can access.

```text
Business Owner
    ↓
Smart Business

Receptionist
    ↓
Receptionist Dashboard

Washer
    ↓
Washer Dashboard

Mobile Washer
    ↓
Mobile Washer / Driver App

Customer
    ↓
Customer App

Super Admin
    ↓
Admin Dashboard
```

---

# 📡 API Integration

All applications communicate with the central backend through APIs.

For example, when a customer creates a booking:

```text
Customer App
     │
     │ POST /bookings
     ▼
Backend API
     │
     ▼
Database
     │
     │ Booking Created
     ▼
Smart Business
     │
     ▼
Receptionist / Washer
```

Possible API endpoints include:

```text
POST   /auth/login

POST   /businesses
GET    /businesses
GET    /businesses/nearby
GET    /businesses/{id}

GET    /services
POST   /services

GET    /bookings
POST   /bookings
PUT    /bookings/{id}

POST   /vehicles
GET    /vehicles

GET    /wash-jobs
PUT    /wash-jobs/{id}/status

GET    /mobile-washers/nearby

GET    /reviews
POST   /reviews

GET    /analytics
GET    /notifications
```

---

# 🔔 Notifications

The central backend can manage notifications across the platform.

For example:

```text
Customer Creates Booking
          ↓
Backend
          ↓
Smart Business
          ↓
Receptionist Receives Notification
```

For a mobile booking:

```text
Customer Creates Mobile Booking
          ↓
Backend
          ↓
Available Mobile Washer
          ↓
Washer Receives Job
          ↓
Accepts Job
          ↓
Customer Receives Update
```

When the service is completed:

```text
Washer
   ↓
Status = Completed
   ↓
Backend
   ↓
Customer Notification
   ↓
Customer Rates Service
```

Notifications can eventually support:

* In-app notifications
* Push notifications
* Email
* SMS
* WhatsApp integration

---

# 💳 Payments

Payments can be integrated into the central Smart Carwash system.

```text
Customer
   ↓
Select Service
   ↓
Booking
   ↓
Payment
   ↓
Payment Gateway
   ↓
Payment Confirmation
   ↓
Booking Updated
   ↓
Business Revenue Updated
```

The business owner can then view transactions and revenue through Smart Business.

---

# 📊 Business Analytics

Smart Business should provide business-specific analytics.

Example:

```text
Today's Revenue
R2,450

Today's Bookings
28

Completed Washes
24

Customers
248

Active Queue
6

Mobile Bookings
7
```

The platform administrator can view aggregated platform-level information:

```text
Registered Businesses
45

Total Customers
8,420

Total Bookings
32,540

Mobile Bookings
7,820

Platform Revenue
R...
```

Business owners should only see analytics belonging to their own businesses.

---

# 🌍 Nearby Carwash Discovery

Nearby discovery is one of the major customer features of Smart Carwash.

The platform can use:

* GPS/location
* Business coordinates
* Search radius
* Business availability
* Operating hours
* Service availability
* Physical/mobile service type
* Business ratings

```text
Customer Location
       ↓
Location Service
       ↓
Find Businesses Within Radius
       ↓
Check Availability
       ↓
Calculate Distance
       ↓
Retrieve Ratings
       ↓
Display Nearby Carwashes
```

This makes Smart Carwash more than a business management system. It also acts as a **car wash discovery and booking platform**.

---

# 📱 Frontend Applications

The project can be structured as multiple frontend applications.

```text
smart-carwash/
│
├── customer-app/
│
├── smart-business/
│
├── admin-dashboard/
│
├── receptionist-dashboard/
│
├── washer-dashboard/
│
├── mobile-washer-app/
│
└── backend/
```

The applications can remain separate because each has a specific purpose.

They do **not** need separate databases.

Instead:

```text
Customer App ───────┐
Smart Business ─────┤
Admin Dashboard ────┤
Receptionist ───────┤
Washer Dashboard ───┤──→ Central API ──→ Central Database
Mobile Washer App ──┤
Driver App ──────────┘
```

---

# 🛠️ Recommended Technology Structure

The frontend applications can use the technologies selected for the project.

### Frontend

* Ionic
* Angular
* TypeScript
* HTML
* SCSS

### Backend

The backend provides REST APIs and handles:

* Authentication
* Business management
* Bookings
* Customers
* Vehicles
* Employees
* Mobile services
* Payments
* Notifications
* Ratings and reviews
* Analytics
* Location services

### Database

A centralized relational database such as:

* MySQL
* PostgreSQL
* Supabase PostgreSQL

can be used.

---

# 🔄 Complete Physical Booking Flow

```text
CUSTOMER
   │
   │ Find nearby carwash
   ▼
CARWASH LIST
   │
   │ View ratings
   ▼
BUSINESS PROFILE
   │
   │ Select service
   ▼
BOOKING
   │
   ▼
CENTRAL API
   │
   ▼
DATABASE
   │
   ▼
SMART BUSINESS
   │
   ▼
RECEPTIONIST
   │
   │ Check-in
   ▼
QUEUE
   │
   ▼
WASHER
   │
   │ Start wash
   ▼
WASH IN PROGRESS
   │
   │ Complete
   ▼
QUALITY CHECK
   │
   ▼
CHECK-OUT
   │
   ▼
PAYMENT
   │
   ▼
BOOKING COMPLETED
   │
   ├──────────────► CUSTOMER NOTIFICATION
   │
   ├──────────────► BUSINESS REVENUE
   │
   └──────────────► WASH HISTORY
```

---

# 🔄 Complete Mobile Booking Flow

```text
CUSTOMER
   │
   │ Select Mobile Carwash
   ▼
CONFIRM LOCATION
   │
   ▼
AVAILABLE MOBILE WASHERS
   │
   ▼
SELECT SERVICE
   │
   ▼
SELECT DATE & TIME
   │
   ▼
BOOKING
   │
   ▼
CENTRAL API
   │
   ▼
MOBILE WASHER
   │
   │ Accept Job
   ▼
ON THE WAY
   │
   ▼
ARRIVED
   │
   ▼
WASHING
   │
   ▼
COMPLETED
   │
   ▼
PAYMENT
   │
   ▼
CUSTOMER RATES SERVICE
```

---

# 🚀 Future Scalability

The architecture should allow Smart Carwash to grow beyond a single city.

For example:

```text
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
```

The same platform can eventually support thousands of businesses without requiring a completely new application for every business.

---

# 🔮 Future Features

Smart Carwash can eventually support:

* Multiple businesses
* Multiple branches per business
* Physical car wash bookings
* Mobile car wash bookings
* Online payments
* Loyalty programs
* Memberships
* Promotions
* Ratings and reviews
* Customer analytics
* Business analytics
* Employee management
* Queue management
* Vehicle history
* Automated notifications
* GPS/location services
* Live mobile washer tracking
* AI-powered business analytics
* Subscription plans for businesses
* Advanced reporting

---

# 📌 Project Principle

The most important architectural principle is:

> **Separate the applications, but centralize the platform services and data.**

The Customer App, Smart Business, Admin Dashboard, Receptionist Dashboard, Washer Dashboard, and Mobile Washer App can remain separate applications.

However, they should communicate through the **same Smart Carwash backend/API and central database**.

This makes Smart Carwash easier to:

* Maintain
* Secure
* Scale
* Integrate
* Monitor
* Extend with new features

---

# 🎯 Long-Term Vision

The long-term vision of Smart Carwash is to create a connected digital ecosystem for the car wash industry.

For customers:

> **Find a nearby carwash, compare ratings, choose a service, book it, and track your wash.**

For businesses:

> **Manage your carwash, customers, staff, bookings, payments, and mobile services from one platform.**

For mobile washers:

> **Receive jobs, navigate to customers, update service status, complete washes, and build a service rating.**

Smart Carwash brings all of these experiences together through one connected platform developed as an intern project at **SmartXchange**.

---

## 🚗 Smart Carwash

**One platform. Multiple businesses. Physical and mobile carwash services. One connected ecosystem.**
