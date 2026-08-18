# 🚗 Smart Carwash

### Smart Carwash Management & Booking Platform

**Smart Carwash** is a multi-business digital platform designed to modernize the car wash industry by connecting **customers, car wash businesses, owners, receptionists, washers, mobile washers, drivers, and platform administrators** through one connected ecosystem.

The platform supports both **physical car wash locations** and **mobile car wash services**, allowing customers to discover nearby businesses, compare services and ratings, make bookings, track their vehicles, and receive real-time updates.

> 🚀 **Built as an intern-developed project at SmartXchange**

---

## 🛠️ Technology Stack

![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-7%2B-3880FF?style=for-the-badge\&logo=ionic\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge\&logo=sass\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![REST API](https://img.shields.io/badge/API-REST-02569B?style=for-the-badge)

---

## 📑 Table of Contents

* [About Smart Carwash](#-about-smart-carwash)
* [Main Goal](#-main-goal)
* [How the Platform Works](#-how-the-platform-works)
* [System Architecture](#-system-architecture)
* [Smart Business](#-smart-business)
* [User Types](#-user-types)
* [Key Features](#-key-features)
* [Physical vs Mobile Carwash](#-physical-vs-mobile-carwash)
* [Ratings & Reviews](#-ratings--reviews)
* [Multi-Tenant Architecture](#-multi-tenant-architecture)
* [Technical Architecture](#-technical-architecture)
* [Authentication & Authorization](#-authentication--authorization)
* [API Architecture](#-api-architecture)
* [Database Structure](#-database-structure)
* [Project Structure](#-project-structure)
* [Technology Stack](#-technology-stack)
* [Future Vision](#-future-vision)
* [Project Principle](#-project-principle)

---

# ✨ About Smart Carwash

Smart Carwash is a digital car wash management and booking platform created to solve common challenges within the traditional car wash industry.

Instead of customers having to manually search for car washes, visit different locations, or wait in physical queues, Smart Carwash provides a centralized platform where customers can:

* 📍 Discover nearby car washes
* ⭐ Compare ratings and reviews
* 💰 Compare services and prices
* 📅 Book a car wash
* 🚗 Manage their vehicles
* 🔔 Receive booking notifications
* 🧼 Track washing progress
* 📍 Request mobile car wash services
* ✍️ Review completed services

At the same time, car wash businesses receive their own management environment through **Smart Business**.

---

# 🎯 Main Goal

The goal of Smart Carwash is to create a centralized ecosystem that makes car wash services:

| Goal                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⚡ Faster             | Customers can discover and book services quickly   |
| 📋 Organized         | Digital bookings, queues, employees and operations |
| 📱 Accessible        | Available through mobile and web applications      |
| 👁️ Transparent      | Clear prices, services, ratings and reviews        |
| 😊 Customer-Friendly | Simple and convenient booking experience           |
| 📊 Data-Driven       | Business analytics and performance insights        |
| 📈 Scalable          | Supports multiple businesses and cities            |
| 🚗 Flexible          | Supports physical and mobile car wash services     |

---

# 🔄 How the Platform Works

The Smart Carwash ecosystem connects multiple applications to one centralized backend.

```text
                    ┌──────────────────────┐
                    │   SMART CARWASH      │
                    │      PLATFORM        │
                    └──────────┬───────────┘
                               │
                     ┌─────────▼─────────┐
                     │   CENTRAL API     │
                     │   & SERVICES      │
                     └─────────┬─────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌────────────┐    ┌────────────┐    ┌────────────┐
      │ Customers  │    │ Businesses │    │   Admin    │
      │    App     │    │   Smart    │    │ Dashboard  │
      │            │    │  Business  │    │            │
      └────────────┘    └────────────┘    └────────────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                      ┌────────▼────────┐
                      │ CENTRAL DATABASE│
                      │     MySQL       │
                      └─────────────────┘
```

---

# 🏗️ System Architecture

Smart Carwash consists of multiple applications that communicate through a shared backend/API and centralized database.

```text
                         SMART CARWASH
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   Customer App        Smart Business      Admin Dashboard
          │                   │                   │
          ├───────────────┬───┴───────────┬───────┤
          │               │               │
          ▼               ▼               ▼
   Receptionist       Washer App      Mobile Washer
      Dashboard        Dashboard          App
          │               │               │
          └───────────────┼───────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  REST API    │
                   │  Backend     │
                   └──────┬───────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   MySQL DB   │
                   └──────────────┘
```

### Core Principle

> **Separate applications, centralized services and data.**

Each application has a specific responsibility, but they all communicate through the same backend.

---

# 🏢 Smart Business

## What is Smart Business?

**Smart Business** is the business-facing application of Smart Carwash.

It allows multiple independent car wash businesses to register, configure, and manage their operations from one platform.

Instead of building a separate system for every car wash, Smart Carwash provides one scalable business platform.

```text
                     SMART CARWASH
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ABC Carwash       Durban Shine       Premium Auto
        │                  │                  │
   ┌────┼────┐        ┌────┼────┐        ┌────┼────┐
   │    │    │        │    │    │        │    │    │
Staff Services       Staff Services     Staff Services
Bookings Customers   Bookings Customers Bookings Customers
```

### Smart Business allows owners to manage:

* 🏢 Business information
* 📍 Business locations
* 🛠️ Services
* 💰 Pricing
* 🕐 Operating hours
* 👥 Employees
* 🧼 Washers
* 🧑‍💼 Receptionists
* 🚗 Customers
* 🚘 Vehicles
* 📅 Bookings
* 📋 Queues
* 💳 Payments
* 📊 Analytics
* ⭐ Reviews
* 🚐 Mobile services

---

# 👥 User Types

Smart Carwash supports several user roles.

## 1. 🧑 Customer

Customers use the Smart Carwash application to:

* Create and manage their account
* Add vehicles
* Discover nearby car washes
* View services and prices
* Compare ratings
* Make bookings
* Request mobile services
* Receive notifications
* View booking history
* Review completed services

---

## 2. 🏢 Business Owner

Business owners use Smart Business to:

* Register their business
* Manage business locations
* Configure services
* Set prices
* Manage operating hours
* Manage employees
* Manage washers and receptionists
* Manage customers
* Manage vehicles
* Manage bookings
* Manage queues
* Monitor revenue
* View analytics
* Manage reviews
* Configure mobile services

---

## 3. 🧑‍💼 Receptionist

Receptionists manage physical car wash operations.

```text
Booking
   ↓
Customer Arrival
   ↓
Check-In
   ↓
Queue
   ↓
Assign Washer
   ↓
Washing
   ↓
Quality Check
   ↓
Payment
   ↓
Check-Out
```

Responsibilities include:

* View bookings
* Register walk-ins
* Check customers in
* Manage queues
* Assign vehicles
* Assign washers
* Update booking status
* Process payments
* Check vehicles out

---

## 4. 🧼 Washer

Washers manage assigned washing jobs.

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

Washers can:

* View assigned jobs
* View vehicle information
* View service information
* Update washing status
* Complete assigned jobs

---

## 5. 🚐 Mobile Washer / Driver

Mobile washers travel to customers.

```text
New Job
   ↓
Accept Job
   ↓
On The Way
   ↓
Arrived
   ↓
Start Washing
   ↓
Complete Service
```

They can:

* View available jobs
* Accept bookings
* View customer locations
* View vehicle information
* Navigate to customers
* Mark arrival
* Start washing
* Complete services

---

## 6. ⚙️ Platform Administrator

The platform administrator manages the overall Smart Carwash ecosystem.

Responsibilities include:

* Approving businesses
* Managing registered businesses
* Managing users
* Monitoring platform activity
* Viewing platform analytics
* Managing reports
* Monitoring transactions
* Managing subscriptions
* Platform configuration
* System-wide reporting

---

# 🌟 Key Features

## 📍 Nearby Car Wash Discovery

Customers can use their location to discover registered businesses nearby.

```text
Customer Location
       ↓
GPS / Location Service
       ↓
Smart Carwash API
       ↓
Find Nearby Businesses
       ↓
Calculate Distance
       ↓
Check Availability
       ↓
Display Results
```

Example:

```text
Nearby Carwashes

🚗 WashPro
📍 1.2 km away
⭐ 4.8 / 5
💰 From R80
🚐 Physical + Mobile

🚗 Durban Auto Wash
📍 2.1 km away
⭐ 4.6 / 5
💰 From R70
🏢 Physical

🚗 Premium Shine
📍 3.4 km away
⭐ 4.9 / 5
💰 From R100
🚐 Mobile
```

---

# 📅 Digital Booking

Customers can:

1. Select a car wash
2. Select a vehicle
3. Select a service
4. Select a date and time
5. Select physical or mobile service
6. Confirm the booking
7. Receive notifications
8. Track the booking status

---

# ⭐ Ratings & Reviews

Customers can rate their experience after completing a service.

```text
Service Completed

How was your experience?

★★★★★

Rate Business
Rate Washer
Rate Service

Write a Review
```

The platform can maintain:

* ⭐ Business rating
* ⭐ Washer rating
* ⭐ Service rating
* 📝 Customer reviews

---

# 🚗 Physical vs Mobile Carwash

| Feature           | Physical Carwash  | Mobile Carwash    |
| ----------------- | ----------------- | ----------------- |
| Customer travels  | ✅                 | ❌                 |
| Washer travels    | ❌                 | ✅                 |
| Location required | Business location | Customer location |
| Booking           | ✅                 | ✅                 |
| GPS               | Optional          | Required          |
| Washer assignment | ✅                 | ✅                 |
| Queue management  | ✅                 | Optional          |
| Live tracking     | Future            | Future            |

### Physical Carwash

```text
Customer
   ↓
Find Carwash
   ↓
View Services
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

### Mobile Carwash

```text
Customer
   ↓
Select Mobile Service
   ↓
Confirm Location
   ↓
Select Service
   ↓
Book
   ↓
Mobile Washer Assigned
   ↓
Washer Travels
   ↓
Arrival
   ↓
Vehicle Washed
   ↓
Service Completed
```

---

# 🗄️ Database Structure

The central database contains the main entities used throughout the platform.

| Table                  | Purpose                       |
| ---------------------- | ----------------------------- |
| `users`                | Platform user accounts        |
| `businesses`           | Registered businesses         |
| `business_locations`   | Business branches/locations   |
| `employees`            | Business staff                |
| `customers`            | Customer records              |
| `vehicles`             | Customer vehicles             |
| `services`             | Car wash services             |
| `bookings`             | Customer bookings             |
| `booking_items`        | Services included in bookings |
| `queues`               | Physical car wash queues      |
| `wash_jobs`            | Washing jobs                  |
| `payments`             | Payment records               |
| `notifications`        | System notifications          |
| `reviews`              | Customer reviews              |
| `subscriptions`        | Business subscriptions        |
| `mobile_service_areas` | Mobile service coverage       |

### Core Relationships

```text
Business
   │
   ├── Locations
   ├── Employees
   ├── Services
   ├── Bookings
   ├── Customers
   └── Mobile Service Areas
          │
          └── Vehicles

Booking
   │
   ├── Customer
   ├── Vehicle
   ├── Service
   ├── Payment
   └── Wash Job
```

---

# 🔐 Multi-Tenant Architecture

Smart Carwash is designed as a **multi-tenant platform**.

Each business receives its own isolated operational environment while using the same platform infrastructure.

```text
Smart Carwash
      │
      ├── Business A
      │      └── business_id = 101
      │
      ├── Business B
      │      └── business_id = 102
      │
      └── Business C
             └── business_id = 103
```

Every business-owned record should contain a `business_id`.

For example:

```text
business_id = 101
```

When Business A logs in, the system should only return data belonging to Business A.

### Business A can access:

* ✅ Its customers
* ✅ Its bookings
* ✅ Its employees
* ✅ Its services
* ✅ Its vehicles
* ✅ Its revenue
* ✅ Its reviews
* ✅ Its internal business information

### Business A cannot access:

* ❌ Business B customers
* ❌ Business B bookings
* ❌ Business B employees
* ❌ Business B revenue
* ❌ Business B internal data

This separation is enforced by the backend/API rather than relying only on the frontend.

---

# 🔑 Authentication & Authorization

Smart Carwash uses **Role-Based Access Control (RBAC)**.

| Role             | Application            |
| ---------------- | ---------------------- |
| `SUPER_ADMIN`    | Admin Dashboard        |
| `BUSINESS_OWNER` | Smart Business         |
| `MANAGER`        | Smart Business         |
| `RECEPTIONIST`   | Receptionist Dashboard |
| `WASHER`         | Washer Dashboard       |
| `MOBILE_WASHER`  | Mobile Washer App      |
| `DRIVER`         | Driver App             |
| `CUSTOMER`       | Customer App           |

Authentication should be centralized so that the same platform identity can be used across the different applications.

---

# 📡 API Architecture

All frontend applications communicate with the central backend through REST APIs.

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| `POST` | `/auth/login`            | Authenticate user           |
| `POST` | `/businesses`            | Register business           |
| `GET`  | `/businesses`            | List businesses             |
| `GET`  | `/businesses/nearby`     | Find nearby businesses      |
| `GET`  | `/businesses/{id}`       | Business details            |
| `GET`  | `/services`              | List services               |
| `POST` | `/services`              | Add service                 |
| `GET`  | `/bookings`              | List bookings               |
| `POST` | `/bookings`              | Create booking              |
| `PUT`  | `/bookings/{id}`         | Update booking              |
| `POST` | `/vehicles`              | Add vehicle                 |
| `GET`  | `/vehicles`              | List vehicles               |
| `GET`  | `/wash-jobs`             | List washing jobs           |
| `PUT`  | `/wash-jobs/{id}/status` | Update job status           |
| `GET`  | `/mobile-washers/nearby` | Find nearby washers         |
| `GET`  | `/reviews`               | List reviews                |
| `POST` | `/reviews`               | Create review               |
| `GET`  | `/analytics`             | Business/platform analytics |
| `GET`  | `/notifications`         | User notifications          |

---

# 📱 Frontend Applications

The platform consists of several independent frontend applications.

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
├── driver-app/
│
└── backend/
```

### Applications

| Application              | Purpose                                |
| ------------------------ | -------------------------------------- |
| `customer-app`           | Customer bookings and discovery        |
| `smart-business`         | Business management                    |
| `admin-dashboard`        | Platform administration                |
| `receptionist-dashboard` | Front-desk operations                  |
| `washer-dashboard`       | Washing job management                 |
| `mobile-washer-app`      | Mobile washing operations              |
| `driver-app`             | Driver/mobile job management           |
| `backend`                | API, authentication and business logic |

---

# ⚙️ Technical Architecture

```text
┌─────────────────────────────────────────────┐
│              FRONTEND LAYER                 │
├─────────────────────────────────────────────┤
│ Customer │ Smart Business │ Admin │ Staff  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 API LAYER                   │
├─────────────────────────────────────────────┤
│ REST API │ Authentication │ Authorization   │
│ Booking  │ Notifications │ Payments        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              BUSINESS LOGIC                │
├─────────────────────────────────────────────┤
│ Booking │ Queue │ Services │ Wash Jobs     │
│ Reviews │ Mobile Services │ Analytics      │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│               DATA LAYER                    │
├─────────────────────────────────────────────┤
│                  MySQL                     │
└─────────────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

| Layer           | Technology             |
| --------------- | ---------------------- |
| Frontend        | Ionic + Angular        |
| Language        | TypeScript             |
| Styling         | SCSS                   |
| Backend         | REST API               |
| Backend Options | Node.js / PHP          |
| Database        | MySQL                  |
| Authentication  | RBAC                   |
| Mobile          | Ionic + Capacitor      |
| Location        | GPS / Geolocation APIs |
| Communication   | REST APIs              |
| Version Control | Git + GitHub           |

---

# 📂 Recommended Project Structure

```text
smart-carwash/
│
├── customer-app/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── smart-business/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── admin-dashboard/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── receptionist-dashboard/
│   ├── src/
│   └── package.json
│
├── washer-dashboard/
│   ├── src/
│   └── package.json
│
├── mobile-washer-app/
│   ├── src/
│   └── package.json
│
├── driver-app/
│   ├── src/
│   └── package.json
│
└── backend/
    ├── src/
    ├── routes/
    ├── controllers/
    ├── services/
    ├── middleware/
    ├── models/
    └── database/
```

---

# 🚀 Future Vision & Scalability

Smart Carwash is designed to expand beyond a single city.

```text
                    SMART CARWASH
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
      Durban        Johannesburg      Cape Town
        │                │                │
    Businesses       Businesses       Businesses
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                 Central Platform
```

The same platform can eventually support **hundreds or thousands of businesses** without creating a completely separate system for every business.

---

# 🔮 Future Features

### 🏢 Business

* Multiple branches
* Subscription plans
* Advanced reporting
* Employee management
* Business performance dashboards

### 🎁 Customer

* Loyalty programs
* Memberships
* Promotions
* Saved favourite car washes
* Vehicle service history

### 📅 Booking

* Live mobile washer tracking
* Automated booking reminders
* Queue position tracking
* Recurring bookings

### 💳 Payments

* Online payments
* Payment gateway integration
* Digital receipts
* Transaction history

### 🤖 Analytics & AI

* Customer behaviour analytics
* Revenue forecasting
* Demand prediction
* AI-powered business insights
* Smart recommendations

### 📍 Location

* Live washer tracking
* Service radius management
* Route optimization
* Location-based recommendations

---

# 📈 Scalability Model

Smart Carwash follows a scalable platform model:

```text
             ONE PLATFORM
                  │
        ┌─────────┼─────────┐
        │         │         │
     Business   Business   Business
        A          B          C
        │          │          │
     Staff       Staff       Staff
     Services    Services    Services
     Bookings    Bookings    Bookings
        │          │          │
        └──────────┼──────────┘
                   │
             CENTRAL API
                   │
            CENTRAL DATABASE
```

This approach allows new businesses to join the platform without requiring a completely new application.

---

# 📌 Project Principle

> ### **Separate the applications. Centralize the platform.**

Smart Carwash separates applications according to user responsibilities while maintaining one centralized backend and data ecosystem.

This approach provides:

* 🔧 **Maintainability** — Centralized business logic
* 🔒 **Security** — Centralized authentication and authorization
* 📈 **Scalability** — New businesses can join easily
* 🔗 **Integration** — Applications communicate through APIs
* 📊 **Monitoring** — Centralized analytics and logging
* ➕ **Extensibility** — New applications and features can be added

---

# 🎯 Long-Term Vision

### Customers

> Find a nearby car wash, compare services and ratings, book a service, track the booking, and review the experience.

### Businesses

> Manage customers, employees, services, bookings, payments, vehicles, queues, mobile services and business performance from one platform.

### Mobile Washers

> Receive jobs, navigate to customers, perform services, update job progress and build a professional service rating.

### Platform Administrators

> Manage the entire ecosystem, approve businesses, monitor activity, manage subscriptions and maintain platform security.

---

# 🚗 Smart Carwash

### One Platform. Multiple Businesses. Physical & Mobile Services.

Smart Carwash brings the entire car wash ecosystem into one connected digital platform.

**Built with passion as an intern project at SmartXchange.**

---

## ⭐ Project Status

**Development Status:** 🚧 Active Development

The platform architecture is being developed incrementally, with individual applications for customers, businesses, administrators, receptionists, washers and mobile service providers.

---

## 👨‍💻 Development

Built using modern web and mobile technologies with a focus on:

* Modular architecture
* Multi-tenant business management
* API-driven communication
* Secure authentication
* Scalable database design
* Mobile-first user experiences
* Real-world business workflows

---
