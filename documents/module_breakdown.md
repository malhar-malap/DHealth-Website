# DH Acquisitions — Healthcare Marketplace
## Project Module Breakdown & Scope Document

---

**Prepared by:** Malhar  
**Date:** 3rd June 2026  
**Project:** DH Acquisitions Marketplace — Web Application  
**Client:** DH Acquisitions  
**Version:** 1.0

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Module Breakdown](#module-breakdown)
4. [Deliverables Summary](#deliverables-summary)
5. [Pricing Summary](#pricing-summary)
6. [Terms & Conditions](#terms--conditions)

---

## Project Overview

DH Acquisitions Marketplace is a **full-stack web application** designed to serve as a comprehensive platform for buying, selling, and leasing healthcare businesses — including hospitals, pharmaceutical companies, diagnostic centres, and medical equipment. The platform also features an integrated **job board** for healthcare professionals.

**Key highlights:**
- Multi-role user system (Buyer, Seller, Employer, Job Seeker, Admin)
- 4 healthcare business categories with specialised listing forms
- Integrated payment gateway for premium features
- Full-featured admin control panel
- Email notification system
- Production-grade deployment with Docker

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Tailwind CSS, React Router v6, Recharts |
| **Backend** | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| **Database** | MySQL 8 (20+ tables, indexed, with SQL views) |
| **Authentication** | JWT (JSON Web Tokens) with role-based access control |
| **Payments** | Razorpay Payment Gateway (Live Integration) |
| **Email** | Spring Mail (Gmail SMTP) |
| **File Storage** | Server-side file upload & management |
| **API Docs** | Springdoc OpenAPI (Swagger UI) |
| **DevOps** | Docker, Docker Compose, Nginx reverse proxy |

---

## Module Breakdown

---

### Module 1 — User Authentication & Registration

Complete user onboarding system with secure authentication.

| # | Feature | Description |
|---|---------|-------------|
| 1.1 | User Registration | Multi-role registration form with field validation (Buyer, Seller, Employer, Job Seeker) |
| 1.2 | User Login | Secure JWT-based login with encrypted password storage (BCrypt) |
| 1.3 | Forgot Password | Email-based password reset flow with OTP verification |
| 1.4 | Reset Password | Secure token-validated password reset page |
| 1.5 | Session Management | Persistent JWT tokens with automatic expiry & refresh handling |
| 1.6 | Role-Based Access | Route protection — different views & permissions per user role |

**Pages delivered:** Login, Register, Forgot Password, Reset Password

---

### Module 2 — User Profile & Account Management

| # | Feature | Description |
|---|---------|-------------|
| 2.1 | Profile Dashboard | Personalised dashboard showing user's listings, jobs, and activity |
| 2.2 | Profile Editing | Update name, email, phone, company name, city, profile photo |
| 2.3 | Profile Photo Upload | Image upload with server-side storage and URL management |
| 2.4 | Buyer Verification | Document upload (Aadhaar / PAN / Passport) for verified buyer badge |
| 2.5 | CV Management | Upload & manage CV for job applications |

**Pages delivered:** Dashboard, Profile Settings

---

### Module 3 — Healthcare Marketplace (Core Module)

The primary module — supports 4 healthcare business categories, each with unique listing forms and detail schemas.

| # | Feature | Description |
|---|---------|-------------|
| 3.1 | **Hospital Listings** | List hospitals for sale/lease with details: bed count, type, NABH accreditation, monthly revenue, OPD count, land area, year established |
| 3.2 | **Pharma Company Listings** | Full/partial stake sale with details: annual turnover, stake %, GMP/FDA/WHO certifications, SKU count, manufacturing capacity |
| 3.3 | **Diagnostic Centre Listings** | Pathology labs, imaging centres with details: diagnostic type, machines, daily footfall, NABL accreditation, tests offered |
| 3.4 | **Medical Equipment Listings** | New/used equipment with details: equipment type, brand, model, manufacture year, condition rating, warranty, service history |
| 3.5 | Multi-Image Upload | Upload up to 10 images per listing with primary image selection |
| 3.6 | Listing Search & Filters | Filter by category, city, price range, deal type with pagination |
| 3.7 | Listing Detail Page | Full listing view with image gallery, specifications, seller info, and inquiry form |
| 3.8 | Confidential Listings | Option to hide seller identity — display alternate title for privacy |
| 3.9 | Listing Management | Create, edit, withdraw listings from seller dashboard |
| 3.10 | Partial Properties | Browse partial stake / investment opportunities |
| 3.11 | Featured Listings | Premium placement for featured listings on homepage |

**Pages delivered:** Listings Page, Create Listing, Listing Detail, Partial Properties

**Database tables involved:** `listings`, `listing_images`, `hospital_details`, `pharma_details`, `diagnostic_details`, `equipment_details`, `categories`, `deal_types`, `equipment_types`, `hospital_types`

---

### Module 4 — Inquiry System

| # | Feature | Description |
|---|---------|-------------|
| 4.1 | Send Inquiry | Verified buyers can send inquiries to sellers on any listing |
| 4.2 | Inquiry Tracking | Status workflow: New → Read → Replied → Closed |
| 4.3 | Email Notifications | Automatic email to seller when a new inquiry is received |
| 4.4 | Inquiry Dashboard | Sellers can view and manage all received inquiries |

**Database tables involved:** `inquiries`

---

### Module 5 — Job Board

Full-featured healthcare job portal integrated into the marketplace.

| # | Feature | Description |
|---|---------|-------------|
| 5.1 | Job Posting | Employers can post jobs with category, specialisation, salary range, experience level, employment type, deadline |
| 5.2 | Job Search & Filters | Search by category, city, experience, employment type with pagination |
| 5.3 | Job Detail Page | Full job description with employer info and apply button |
| 5.4 | Job Application | Job seekers can apply with CV upload and cover letter |
| 5.5 | Application Tracking | Status workflow: Submitted → Viewed → Shortlisted → Rejected → Hired |
| 5.6 | Job Management | Employers can manage postings, view applications, update statuses |

**Pages delivered:** Jobs Page, Create Job, Job Detail

**Database tables involved:** `jobs`, `job_applications`, `job_categories`, `user_cvs`

---

### Module 6 — Payment Integration (Razorpay)

Live payment gateway integration for premium features.

| # | Feature | Description |
|---|---------|-------------|
| 6.1 | Razorpay Order Creation | Server-side order generation via Razorpay API |
| 6.2 | Frontend Checkout | Razorpay checkout modal integration in React |
| 6.3 | Payment Verification | Server-side signature verification for tamper-proof transactions |
| 6.4 | Payment Records | Complete payment history stored in database |
| 6.5 | Payment Status Tracking | Real-time status: Created → Paid → Failed |

**Database tables involved:** `payments`

---

### Module 7 — Email Notification System

Automated transactional email system using Gmail SMTP.

| # | Feature | Description |
|---|---------|-------------|
| 7.1 | Welcome Email | Sent upon successful registration |
| 7.2 | OTP Verification | 6-digit OTP emails for identity verification |
| 7.3 | Password Reset | Secure password reset links via email |
| 7.4 | Listing Status Notifications | Email alerts when listing is approved or rejected |
| 7.5 | Inquiry Notifications | Email to seller when new inquiry is received |
| 7.6 | Job Application Alerts | Email to employer when new application is submitted |

---

### Module 8 — Admin Control Panel

Comprehensive administration dashboard for complete platform management.

| # | Feature | Description |
|---|---------|-------------|
| 8.1 | **Admin Dashboard** | Real-time statistics — total users, listings, jobs, inquiries, pending verifications with charts (Recharts) |
| 8.2 | **User Management** | View all users, search/filter, view detail modal, suspend/activate accounts |
| 8.3 | **Listing Management** | View all listings with filters, approve/reject with reason, view full detail modal with images |
| 8.4 | **Job Management** | View all jobs, approve/reject with reason, view detail modal with applications |
| 8.5 | **Payment Management** | View all payment transactions, filter by status, track revenue |
| 8.6 | **Verification Management** | Review buyer verification requests, approve/reject documents, view uploaded ID documents |

**Pages delivered:** Admin Dashboard, Admin Users, Admin Listings, Admin Jobs, Admin Payments, Admin Verifications (+ 3 detail modals)

**Database tables involved:** `admin_audit_logs`, `site_settings`

---

### Module 9 — Static & Content Pages

| # | Feature | Description |
|---|---------|-------------|
| 9.1 | Homepage | Hero section, category showcase, featured listings, call-to-action sections |
| 9.2 | About Us | Company information, mission, team details |
| 9.3 | Contact Us | Contact form with email delivery, office address, phone, map |
| 9.4 | Privacy Policy | Legal privacy policy page |
| 9.5 | Terms of Service | Legal terms & conditions page |

**Pages delivered:** Home, About Us, Contact Us, Privacy Policy, Terms of Service

---

### Module 10 — Database, DevOps & Deployment

| # | Feature | Description |
|---|---------|-------------|
| 10.1 | Database Schema | 20+ tables with foreign key relationships, constraints, and ENUMs |
| 10.2 | Database Indexes | 15+ performance indexes on frequently queried columns |
| 10.3 | Database Views | 3 SQL views for listing summary, job summary, admin statistics |
| 10.4 | Master Data Seeding | Pre-loaded data: 30 states, 30 cities, categories, equipment types, hospital types, job categories |
| 10.5 | Backend Dockerfile | Containerised Spring Boot application |
| 10.6 | Frontend Dockerfile | Containerised React build served via Nginx |
| 10.7 | Nginx Configuration | Reverse proxy, static file serving, API routing |
| 10.8 | Docker Compose | Multi-container orchestration (frontend + backend + database) |
| 10.9 | Server Deployment | Production deployment on live server |
| 10.10 | Domain & SSL Setup | Domain configuration, DNS records, HTTPS certificate |

---

## Deliverables Summary

| Category | Count |
|----------|-------|
| Frontend Pages | 26+ |
| Backend REST Controllers | 8 |
| Backend Services | 11 |
| Database Entities / Models | 22 |
| Database Tables | 20+ |
| Database Views | 3 |
| API Endpoints | 50+ |
| Dockerfiles | 2 |
| Email Templates | 6 |

---

## Pricing Summary

| Module | Description | Cost (₹) |
|--------|-------------|-----------|
| Module 1 | Authentication & Registration | ₹20,000 |
| Module 2 | Profile & Account Management | ₹18,000 |
| Module 3 | Healthcare Marketplace (Core) | ₹55,000 |
| Module 4 | Inquiry System | ₹10,000 |
| Module 5 | Job Board | ₹30,000 |
| Module 6 | Payment Integration (Razorpay) | ₹20,000 |
| Module 7 | Email Notification System | ₹12,000 |
| Module 8 | Admin Control Panel | ₹40,000 |
| Module 9 | Static & Content Pages | ₹10,000 |
| Module 10 | Database, DevOps & Deployment | ₹20,000 |
| | | |
| | **Total Project Cost** | **₹2,35,000** |

---

## Terms & Conditions

1. **Warranty Period:** 30 days of free bug fixes from the date of final delivery.
2. **Maintenance:** Post-warranty maintenance & support available at ₹8,000/month.
3. **Scope Changes:** Any features or changes not listed in this document will be quoted separately.
4. **Source Code:** Complete source code will be handed over upon full payment.
5. **Payment Terms:**
   - 30% advance before project commencement
   - 40% upon completion of development
   - 30% upon final deployment & handover
6. **Hosting & Domain:** Server hosting and domain renewal costs are borne by the client.
7. **Third-Party Costs:** Razorpay transaction fees, email service costs, and cloud hosting charges are borne by the client.
8. **Intellectual Property:** Full IP rights transfer to the client upon complete payment.
9. **Confidentiality:** All project information and client data will be kept strictly confidential.

---

> **Note:** This document outlines the complete scope of work delivered for the DH Acquisitions Healthcare Marketplace project. The pricing reflects the full development lifecycle including design, development, testing, deployment, and knowledge transfer.

---

*Prepared with care. For any queries, please reach out directly.*
