# Bay to Bay Express Inc.

Bay to Bay Express Inc. is a Northern Ontario logistics and courier web platform specializing in scheduled, dedicated, and small-goods transportation across the Highway 11 corridor. The application connects North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac with real-time routing visualizations, an interactive multi-step quote request wizard, and an administrative control panel for content management.

---

## Overview

The platform serves businesses, medical facilities, pharmacies, legal firms, and individuals across Northern Ontario. It incorporates dynamic 60fps canvas particle rendering, scroll-triggered route map animations, structured data for search engine optimization (SEO), and persistent PostgreSQL database storage powered by Neon and Prisma ORM.

---

## Key Features

### Customer-Facing Experience
* **Hero Banner and Route Summary**: Interactive route card featuring real-time stop counts, route durations, and quick call-to-action triggers.
* **Animated Route Map**: Interactive Canvas and GSAP animated map showcasing 7 strategic regional waypoints along Highway 11 with custom delivery van motion paths.
* **Delivery Solutions Grid**: Comprehensive display of delivery services including medical courier, small-goods transport, scheduled runs, and dedicated business solutions.
* **Interactive Quote Request Wizard**: Three-step modal request form with client-side validation, sessionStorage draft recovery, honeypot spam protection, and custom date pickers.
* **Snowfall Canvas Effect**: Configurable multi-layered canvas particle animation featuring 6-spoke crystalline star snowflakes and cyan ambient dots.
* **Comprehensive FAQ Accordion**: Expandable common questions section with search engine structured data integration.

### Administrative Control Panel
* **Protected Admin Routes**: Cookie-based session authentication guarding administrative routes (`/admin/*`).
* **Quote Lead Management**: Interactive table for viewing, searching, filtering, and updating inbound customer quote requests.
* **Content Management System (CMS)**:
  * About Section Editor
  * Services & Delivery Solutions Editor
  * Industry Tags & Target Audience Manager
  * Why Us Value Propositions Editor
  * How It Works Step Manager
  * Common Questions (FAQ) Editor
  * Pre-Footer CTA Banner Configuration

### Search Engine Optimization (SEO) & Standards
* **Comprehensive Metadata**: Pre-configured meta tags, canonical links, OpenGraph, and Twitter Cards targeting major Northern Ontario courier searches.
* **JSON-LD Schema**: Embedded `CourierService` and `LocalBusiness` schema graphs.
* **Sitemap and Robots Directives**: Built-in `sitemap.xml` and `robots.txt` generation via Next.js App Router metadata routes.

---

## Technology Stack

* **Framework**: Next.js (App Router, Server Components)
* **Language**: TypeScript
* **Styling**: Tailwind CSS, Vanilla CSS, Inter / Space Grotesk / Plus Jakarta Sans fonts
* **Database & ORM**: Neon PostgreSQL (Serverless), Prisma ORM
* **Animation**: GSAP (GreenSock Animation Platform), Canvas 2D API
* **Icons**: Lucide React
* **Form & Validation**: React Hook Form, Zod

---

## Project Structure

```text
bay-to-bay/
├── app/
│   ├── admin/               # Admin panel pages and layouts
│   ├── api/                 # Serverless API routes (admin & quote endpoints)
│   ├── globals.css          # Global CSS utilities and design tokens
│   ├── layout.tsx           # Root layout with font definitions and metadata
│   ├── page.tsx             # Public landing page entry
│   ├── robots.ts            # Search engine robots.txt route
│   └── sitemap.ts           # Search engine sitemap.xml route
├── components/
│   ├── about/               # About section subcomponents
│   ├── business-solutions/  # Business solutions components
│   ├── faq/                 # FAQ accordion subcomponents
│   ├── hero/                # Hero banner, route card, and canvas snowfall
│   ├── how-it-works/        # Process step components
│   ├── sections/            # Quote CTA and service highlight bars
│   ├── service-area/        # Interactive route map and waypoints
│   ├── services/            # Delivery solutions grid cards
│   ├── ui/                  # Reusable UI primitives (buttons, form fields)
│   ├── who-we-serve/        # Industry tags components
│   ├── AnnouncementBar.tsx  # Top notification bar
│   ├── Footer.tsx           # Site footer
│   ├── JsonLd.tsx           # Search engine structured data schema
│   ├── Navbar.tsx           # Navigation header
│   └── QuoteForm.tsx        # Multi-step quote request wizard
├── lib/
│   ├── gsap.ts              # GSAP plugin initialization
│   ├── prisma.ts            # Prisma client instance & fallback getters
│   └── schemas/             # Zod validation schemas
├── prisma/
│   ├── schema.prisma        # Database schema definitions
│   └── seed.ts              # Seed script for initial content
├── public/                  # Static assets and brand imagery
└── package.json             # Package manifests and scripts
```

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```env
# Database Connection URL (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Admin Authentication Credentials
ADMIN_EMAIL="baytobayexpress@gmail.com"
ADMIN_PASSWORD="YourSecureAdminPasswordHere"
ADMIN_SESSION_SECRET="your-super-secret-session-key-here"
```

---

## Getting Started

### 1. Prerequisites
* Node.js 18.x or later
* npm 9.x or later

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/IsacSmile/bay-to-bay.git
cd bay-to-bay
npm install
```

### 3. Database Setup
Sync the database schema and populate initial content defaults:

```bash
npx prisma db push
npm run seed
```

### 4. Development Server
Start the Next.js local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. Access the admin login at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

### 5. Production Build
To create an optimized production build:

```bash
npm run build
npm run start
```

---

## License and Support

Copyright 2026 Bay to Bay Express Inc. All rights reserved. Proprietary software for Bay to Bay Express Inc. operations.
