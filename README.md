# Bay to Bay Express Inc. 🚚

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.21-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-black?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

**Bay to Bay Express Inc.** is a modern, high-performance web platform and logistics management system tailored for Northern Ontario's Highway 11 corridor. The application bridges communities including **North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac** with real-time routing visualizations, dedicated business logistics solutions, an interactive multi-step quote wizard, and a comprehensive administrative control panel with full CMS capabilities.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Customer Experience](#customer-experience)
  - [Dedicated Contact & Booking Experience](#dedicated-contact--booking-experience)
  - [Administrative Control Panel & CMS](#administrative-control-panel--cms)
  - [Transactional Email Pipeline](#transactional-email-pipeline)
  - [Search Engine Optimization (SEO) & Schema](#search-engine-optimization-seo--schema)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Installation](#2-installation)
  - [3. Database Setup](#3-database-setup)
  - [4. Running the Development Server](#4-running-the-development-server)
  - [5. Building for Production](#5-building-for-production)
- [Available Scripts](#-available-scripts)
- [Database Schema Reference](#-database-schema-reference)
- [Administrative Access](#-administrative-access)
- [Deployment Guidelines](#-deployment-guidelines)
- [License & Copyright](#-license--copyright)

---

## 🌟 Overview

Bay to Bay Express Inc. delivers regional small-goods transportation, scheduled runs, and dedicated delivery solutions across Northern Ontario. Designed specifically to meet the demands of medical suppliers, pharmacies, legal firms, regional suppliers, and retail businesses, this platform pairs a modern, tactile design aesthetic with resilient serverless cloud infrastructure.

Key engineering highlights include:
- **Silky 60fps animations** with GreenSock (GSAP), Lenis smooth scrolling, and hardware-accelerated Canvas 2D particle systems.
- **Dynamic Content Management System (CMS)** backed by Neon Serverless PostgreSQL and Prisma ORM, allowing operations teams to manage all landing page sections without code updates.
- **Asynchronous transactional email dispatch** powered by Resend, notifying staff instantly when quotes are requested.
- **Strict type safety and data integrity** across client and server with TypeScript and Zod schemas.

---

## 🚀 Key Features

### Customer Experience
* **Hero Route Showcase**: Interactive route cards highlighting live stop counts, route durations (12h options), and immediate call-to-action triggers.
* **Animated Route Map**: Interactive Canvas 2D and GSAP ScrollTrigger map tracing strategic regional waypoints along the Highway 11 corridor with animated delivery vehicle motion paths.
* **Delivery Solutions Grid**: Showcases specialized freight options, including medical courier, small-goods transport, scheduled runs, and dedicated business solutions.
* **Atmospheric Canvas Snowfall**: Multi-layered, GPU-accelerated canvas particle effect featuring 6-spoke crystalline star snowflakes and cyan ambient particles. Can be enabled or disabled dynamically from the admin panel.
* **Interactive Quote Request Wizard**:
  * 3-step intuitive booking process.
  * Form state persistence across steps with `sessionStorage` recovery.
  * Client and server-side Zod validation with phone and email formatting.
  * Honeypot anti-spam protection against bot submissions.
* **Comprehensive FAQ Accordion**: Expandable common questions section with embedded JSON-LD structured data for rich search engine snippets.

### Dedicated Contact & Booking Experience
* **Custom Interactive DatePicker**: Sleek, compact calendar popover replacing standard browser date inputs for seamless date selection.
* **Custom Form Dropdowns**: Fully styled, accessible select components matching brand aesthetics across desktop and mobile screens.
* **Direct Regional Dispatch Line**: Dedicated click-to-call (`705-978-3001`) and email routing to operations.

### Administrative Control Panel & CMS
* **Secure Cookie-Based Authentication**: Protected administrative routes under `/admin/*` guarded by session cookies.
* **Quote Lead Management (`/admin/quotes`)**:
  * Inbound quote request viewer with search, filtering, and status workflows (`new`, `contacted`, `in_progress`, `completed`, `archived`).
  * Deep-linkable quote detail inspect views.
* **Comprehensive Content Management System (CMS)**:
  * **Site Settings & Announcements**: Control site name, notification tickers, and theme toggles.
  * **Hero Section Editor**: Update headings, pill badges, descriptions, feature pills, and hero background imagery.
  * **Services & Solutions Editor**: Manage service cards, icons, descriptions, and priority sorting.
  * **Industries & Audience Manager**: Configure target industry tags (Medical, Retail, Automotive, Legal, etc.).
  * **Why Bay to Bay Editor**: Update core value propositions and benefit items.
  * **How It Works Editor**: Manage step-by-step process guides.
  * **FAQ Editor**: Add, edit, reorder, or delete common customer questions.
  * **Quote CTA Banner**: Configure pre-footer call-to-action headlines and contact numbers.
  * **Service Areas & Regions**: Manage regional waypoints, coordinates, and active statuses.

### Transactional Email Pipeline
* Powered by the **Resend API** with HTML transactional templates.
* Dispatches email notifications to designated administrative inboxes immediately upon quote submission.
* Non-blocking asynchronous execution ensures zero impact on user submission speeds.
* In-app fallback handling with support for custom recipient addresses set directly in the database.

### Search Engine Optimization (SEO) & Schema
* **Search Engine Structured Data**: Embedded `CourierService` and `LocalBusiness` JSON-LD schema graphs for enhanced Google search snippets.
* **Next.js Metadata API**: Semantic title tags, localized meta descriptions, OpenGraph imagery, and Twitter Cards tailored to Northern Ontario courier queries.
* **Dynamic Sitemap & Robots**: Automatic generation of `sitemap.xml` and `robots.txt` via Next.js App Router metadata handlers.
* **Branded SVG Favicon**: Multi-resolution branded vector icon and legacy `favicon.ico` support.

---

## 🛠 Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) | App Router, Server Components, API Route Handlers |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing across entire client & server |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling with custom typography tokens |
| **Animations** | [GSAP 3](https://greensock.com/) & Canvas 2D | Motion path animations, ScrollTrigger, canvas particles |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) | Lightweight, momentum-based smooth page scrolling |
| **Database** | [Neon PostgreSQL](https://neon.tech/) | Serverless cloud Postgres database with connection pooling |
| **ORM** | [Prisma ORM 5](https://www.prisma.io/) | Type-safe schema definition, migrations, and query client |
| **Email Service** | [Resend](https://resend.com/) | Modern transactional email delivery for lead notifications |
| **Forms & Validation** | React Hook Form & [Zod](https://zod.dev/) | Client and server validation schemas |
| **Iconography** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icons |
| **Image Processing** | [Sharp](https://sharp.pixelplumbing.com/) | High-performance server-side image processing |

---

## 📂 Project Structure

```text
bay-to-bay/
├── app/
│   ├── about/                   # About page
│   ├── about-us/                # About Us alternate route
│   ├── admin/                   # Administrative suite
│   │   ├── about/               # About CMS editor
│   │   ├── faq/                 # FAQ items manager
│   │   ├── how-it-works/        # Process step manager
│   │   ├── industries/          # Industry tags editor
│   │   ├── login/               # Secure admin login form
│   │   ├── quote-cta/           # Pre-footer CTA banner editor
│   │   ├── quotes/              # Inbound customer quote leads manager
│   │   ├── regions/             # Highway 11 corridor waypoint editor
│   │   ├── services/            # Delivery solutions editor
│   │   ├── why-us/              # Value proposition manager
│   │   ├── layout.tsx           # Admin navigation sidebar & header
│   │   └── page.tsx             # Admin dashboard entry
│   ├── api/
│   │   ├── admin/               # Admin auth & CMS mutation endpoints
│   │   └── quote/               # Public quote submission API endpoint
│   ├── contact/                 # Contact & direct booking page
│   ├── service-area/            # Interactive regional coverage page
│   ├── services/                # Services breakdown page
│   ├── favicon.ico              # Legacy favicon asset
│   ├── icon.svg                 # Vector brand favicon
│   ├── globals.css              # Design tokens and custom utilities
│   ├── layout.tsx               # Root layout, fonts, and global metadata
│   ├── page.tsx                 # Main public landing page
│   ├── robots.ts                # Dynamic robots.txt route
│   └── sitemap.ts               # Dynamic sitemap.xml route
├── components/
│   ├── about/                   # About section components
│   ├── business-solutions/      # Commercial courier components
│   ├── faq/                     # FAQ accordion subcomponents
│   ├── hero/                    # Hero banner, route card & snowfall canvas
│   ├── how-it-works/            # Process step cards
│   ├── sections/                # Pre-footer CTA and highlights
│   ├── service-area/            # Interactive route map & waypoints
│   ├── services/                # Delivery solutions grid cards
│   ├── ui/                      # Reusable UI primitives (buttons, date pickers)
│   ├── who-we-serve/            # Industry tags component
│   ├── AnnouncementBar.tsx      # Top announcement ticker
│   ├── ContactForm.tsx          # Contact page submission form
│   ├── Footer.tsx               # Global footer with admin shortcuts
│   ├── JsonLd.tsx               # Structured data schema component
│   ├── Navbar.tsx               # Sticky desktop & mobile header
│   └── QuoteForm.tsx            # Multi-step quote request modal
├── lib/
│   ├── email.ts                 # Resend email notification service
│   ├── gsap.ts                  # GSAP plugin initialization
│   ├── prisma.ts                # Prisma client singleton & DB fallbacks
│   └── schemas/                 # Zod validation schemas
├── prisma/
│   ├── schema.prisma            # PostgreSQL database models
│   └── seed.ts                  # Initial seed script for database setup
├── public/                      # Static assets and brand imagery
├── package.json                 # Project scripts and dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Database Connection (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Admin Authentication
ADMIN_EMAIL="baytobayexpress@gmail.com"
ADMIN_PASSWORD="YourSecureAdminPasswordHere"
ADMIN_SESSION_SECRET="your-super-secret-session-key-minimum-32-chars"

# Transactional Email (Resend)
RESEND_API_KEY="re_1234567890abcdef"
RESEND_FROM_EMAIL="Bay to Bay Express <onboarding@resend.dev>"

# Base Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js**: `v18.17.0` or later
* **npm**: `v9.x` or later (or `pnpm` / `yarn`)
* A **PostgreSQL** database instance (recommended: [Neon](https://neon.tech))

### 2. Installation
Clone the repository and install all required dependencies:

```bash
git clone https://github.com/IsacSmile/bay-to-bay.git
cd bay-to-bay
npm install
```

### 3. Database Setup
Synchronize the Prisma schema with your database and seed initial platform content:

```bash
# Push schema to database
npx prisma db push

# Populate initial default content and settings
npm run db:seed
```

### 4. Running the Development Server
Start the local Next.js development server:

```bash
npm run dev
```

Open your browser and navigate to:
* **Public Site**: [http://localhost:3000](http://localhost:3000)
* **Contact Page**: [http://localhost:3000/contact](http://localhost:3000/contact)
* **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### 5. Building for Production
Create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack/HMR |
| `npm run build` | Generates Prisma client and compiles the Next.js production build |
| `npm run start` | Boots the optimized Next.js production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run db:push` | Pushes the Prisma schema state directly to the database |
| `npm run db:seed` | Populates database with default content, routes, and FAQ items |
| `npm run postinstall` | Automatically runs `prisma generate` after package installation |

---

## 🗄 Database Schema Reference

The platform utilizes a structured relational database schema configured in `prisma/schema.prisma`:

| Model | Purpose |
| :--- | :--- |
| `SiteSettings` | Global configuration including site name and announcement bar ticker items |
| `ContactDetails` | Primary phone and email references displayed across headers and footers |
| `HeroContent` | Eyebrow label, badges, headings, subtext, feature pills, and hero image URL |
| `HeroRoute` & `HeroRouteStop` | Route title, estimated transit time, and individual waypoint stop details |
| `Region` | Regional hubs along Highway 11 (North Bay, Kirkland Lake, Timmins, etc.) |
| `ServiceAreaContent` | Copy, headlines, and badge text for the interactive map section |
| `ThemeSettings` | Global display switches (e.g., toggleable Canvas snowfall effect) |
| `ServicesSectionContent` & `ServiceItem` | Grid of available courier and freight services |
| `BusinessSolutionsContent` | Commercial logistics copy and call-to-action details |
| `WhoWeServeContent` & `IndustryTag` | Industry categories serviced (Medical, Retail, Auto, Legal) |
| `WhyUsContent` & `ReasonItem` | Value propositions highlighting regional reliability and speed |
| `HowItWorksContent` & `HowItWorksStep` | Step-by-step workflow guide from dispatch to delivery |
| `QuoteFormContent` | Modal request copy, disclaimers, and staff notification email recipient |
| `QuoteRequest` | Inbound customer quote leads with contact info, locations, and status |
| `AboutContent` & `AboutTagPill` | Company background story, regional focus, and mission statements |
| `FaqContent` & `FaqItem` | Search engine optimized frequently asked questions and answers |
| `QuoteCtaContent` | Bottom pre-footer call-to-action banner settings |
| `Image` | Database-backed binary image storage for uploaded media assets |

---

## 🛡 Administrative Access

The admin control panel is accessible at `/admin/login`.

- **Default Email**: Configured via `ADMIN_EMAIL` in `.env` (fallback: `baytobayexpress@gmail.com`)
- **Default Password**: Configured via `ADMIN_PASSWORD` in `.env`
- **Features**:
  - Review, filter, and update customer quote requests.
  - Live edit landing page content with instant site reflection.
  - Enable or disable visual effects such as canvas snowfall.
  - Update waypoint coordinates and regional service status.

---

## 🚢 Deployment Guidelines

### Vercel Deployment (Recommended)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Add all required **Environment Variables** in the Vercel project settings (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`, etc.).
4. The `postinstall` script will automatically run `prisma generate` during deployment.
5. Deploy and connect your custom domain.

---

## 📄 License & Copyright

Copyright © 2026 **Bay to Bay Express Inc.** All rights reserved.

Unauthorized copying, distribution, or modification of this code is strictly prohibited. Proprietary software built for Bay to Bay Express Inc.
