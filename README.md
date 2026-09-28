# Emprise Academy — Complete Institutional Digital Platform

> **Mathura's Premier Institute for IIT-JEE, NEET-UG & Foundation (Classes 8–10)**  
> *Established in 2011 • 15+ Years of Academic Excellence • 5,000+ Students Mentored • 700+ IIT & Medical Selections*

---

## 🏛️ Executive Overview

**Emprise Academy** is an enterprise-grade digital educational ecosystem engineered to power the institutional operations of Mathura's leading competitive coaching academy. The platform encompasses a high-performance public web portal, an interactive student examination hub, an automated admit-card generation engine, an Excel-driven result publishing system, an admissions CRM, and a comprehensive administrative Content Management System (CMS).

Built on **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Supabase (PostgreSQL with Row Level Security)**, the application delivers sub-second page loads, pixel-perfect 6K Ultra-HD visuals, and hardened enterprise data security.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Purpose & Capabilities |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.3.3](https://nextjs.org/) | App Router, Server Components (RSC), Turbopack compilation, Edge middleware proxy |
| **Runtime & Language** | React 19 + TypeScript 5 | Concurrent rendering, typed schemas, strict null checks |
| **Styling & Design System** | Tailwind CSS v4 | Custom institutional design tokens (Navy `#0A192F`, Royal Blue `#1769E0`, Accent Amber `#FF8A00`) |
| **Database & Auth** | [Supabase](https://supabase.com/) | PostgreSQL 15, Row Level Security (RLS), Supabase SSR Cookie Auth, Storage Buckets |
| **Validation** | [Zod 4](https://zod.dev/) | Strict runtime data contracts for APIs, form submissions, and database payloads |
| **Spreadsheet Ingestion** | [SheetJS (xlsx)](https://sheetjs.com/) | High-speed multi-sheet `.xlsx` / `.csv` parsing, column normalization, and error reporting |
| **Icons & Media** | [Lucide React](https://lucide.dev/) | Consistent iconography with accessible SVG rendering |
| **SEO & Social Graphs** | Schema.org JSON-LD | Rich snippets for `EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList` |

---

## 🖼️ Ultra-HD 6K Hero Showcase Carousel

The homepage hero slider features an automated, zero-lag pre-warming carousel displaying **6197 × 2478 pixels (300 DPI Ultra-HD)** master campaign assets:

1. **Slide 01**: **JEE Main + Advanced 2026 Mathura Toppers** — Selections in IIT Bombay, IIT Guwahati, IIT Dhanbad, IIIT Delhi, and NITs.
2. **Slide 02**: **Back-to-Back IIT Bombay Achievers (2025 & 2026)** — Atul Dagur and Govind Gupta consecutive admissions.
3. **Slide 03**: **JEE Main 2026 Top Performers** — Multiple 99+ Percentile achievers (Rajeev Nain 99.42, Ashis Kumar 99.23, Atul Dagur 99.22).
4. **Slide 04**: **NEET (UG) 2026 Official Mathura Results** — Bhanu Pratap Tomar (AIR 1794), Shreya Agrawal (AIR 8570), Ashwani Kr. Sahni (AIR 16734), Srishti Saraswat (AIR 18162).
5. **Slide 05**: **Top IIT-JEE Performers (Achievement Legacy)** — Utkarsh (IIT Dhanbad, 100%ile Physics), Shravan (IIT Kanpur, AIR 92), Umesh (IIT Delhi, AIR 645).
6. **Slide 06**: **A Legacy of NEET Excellence (AIIMS Admissions)** — Tanisha (AIIMS Raebareli), Aayan (AIIMS Gorakhpur), Shobhit (AIIMS Jodhpur).
7. **Slide 07**: **NEET 2025 Result (Glory of NEET)** — Anil Yadav (AIR 4460), Rahul (AIR 5209), Rahul Kumar (AIR 2036), Deepak Singh (AIR 8483), Chandrathan (AIR 27707).
8. **Slide 08**: **JEE Advanced 2025 (Govind Gupta)** — AIR 404 Gen. (EWS), 99.65 Percentile, Selected in IIT Bombay.

---

## 🌐 Complete Site Map & Route Hierarchy (102 Pages)

### 1. Public Institutional Portal (`/(public)`)
- **`/`**: Flagship Homepage (Hero Slider, Academic Metrics, Program Matrix, Why Emprise, Dynamic Results Carousel, ETSE CTA, Testimonials, Interactive FAQ, Location & Campus Reception).
- **`/iit-jee-coaching-mathura`**: Premier Engineering Coaching Hub:
  - `/iit-jee-coaching-mathura/class-11` — 2-Year Target Foundation
  - `/iit-jee-coaching-mathura/class-12` — 1-Year Fast-Track Mastery
  - `/iit-jee-coaching-mathura/dropper` — Intensive Repeater Rank Booster
- **`/neet-coaching-mathura`**: Dedicated Medical Entrance Hub:
  - `/neet-coaching-mathura/class-11` — Comprehensive Pre-Medical
  - `/neet-coaching-mathura/class-12` — Board + NEET Rigor
  - `/neet-coaching-mathura/dropper` — Dropper Special Intensive
- **`/foundation-coaching-mathura`**: Junior Science & Math Program:
  - `/foundation-coaching-mathura/class-8` — Concept Initiation & Curiosity
  - `/foundation-coaching-mathura/class-9` — Early Olympiad & NTSE Prep
  - `/foundation-coaching-mathura/class-10` — Board Excellence & Bridge to Senior Exams
- **`/courses`**: All-in-one Program Directory with syllabus, batch timings, and fee structures.
- **`/etse-2026`**: **Emprise Talent Search Examination (ETSE 2026)** — 100% Free registration portal, syllabus, scholarship slabs up to 100%, and instant digital admit card generator.
- **`/results`**: Official Scorecard & Achievement Archive:
  - `/results/[slug]` — Individual student verified profile & rank scorecard (e.g., `atul-dagur-jee-advanced-2026`).
- **`/directors`**: Leadership profiles & vision:
  - `/directors/rakesh-kumar` — Er. Rakesh Kumar (IIT Dhanbad Alumni, Physics Maestro).
  - `/directors/sushil-dagur` — Er. Sushil Dagur (IIT Roorkee Alumni, Mathematics Expert & IIT Bombay Mentor).
- **`/about`**: Institutional heritage, 15+ years timeline, teaching methodology:
  - `/about/directors` — Detailed academic leadership bios.
  - `/about/awards` — 7+ National and Regional Education Awards.
- **`/blog`**: Knowledge hub & educational roadmaps:
  - In-depth articles on IIT Bombay cutoffs, NEET MBBS government college seats, NIT placements, and early competitive strategy.
- **`/gallery`**: High-resolution campus tour, classrooms, lab facilities, celebration events (`/gallery/media`, `/gallery/videos`).
- **`/testimonials`**: Verified student and parent success testimonials.
- **`/admissions` & `/scholarship`**: Step-by-step admissions walkthrough, fee policies, scholarship rules.
- **`/contact`**: Campus visit booking, Google Maps directions, inquiry form, operational hours.
- **`/privacy-policy` & `/terms`**: Legal compliance, data protection, and student privacy policies.

### 2. Protected Student Portal (`/(student)`)
- **`/student/login`**, **`/student/register`**, **`/student/forgot-password`**, **`/student/reset-password`**: Secure authentication flows.
- **`/student/dashboard`**: Personalized student overview (enrolled batch, attendance, upcoming tests).
- **`/student/profile`**: Student academic and contact details.
- **`/student/admit-cards`**: Digital admit card retrieval for ETSE and internal mock tests.
- **`/student/results`**: Historical test series scores and detailed subject-wise percentile reports.
- **`/student/documents`**: Official receipts, scorecards, and study material downloads.
- **`/student/notifications`**: Real-time broadcast alerts and batch updates.

### 3. Protected Administrative Operations Portal (`/(admin)`)
- **`/admin`**: Executive Dashboard with real-time admission counters, lead velocity, and revenue indicators.
- **`/admin/leads` & `/admin/follow-ups`**: End-to-end CRM with lead stages (`NEW`, `CONTACTED`, `VISITED`, `REGISTERED`, `LOST`) and phone deduplication.
- **`/admin/admissions`**: Formal student onboarding and fee receipt generation.
- **`/admin/etse`**: ETSE 2026 registrant management, test center allocations, and roll number sequencing.
- **`/admin/admit-cards`**: Bulk admit card PDF generator, center allocation, and digital verification token generator.
- **`/admin/results` & `/admin/results/import`**: Two-stage Excel import engine with error reporting and atomic upsertion.
- **`/admin/batches` & `/admin/courses`**: Course scheduling, batch capacities, and teacher assignments.
- **`/admin/students` & `/admin/faculty`**: Institutional records and directory management.
- **`/admin/cms/*`**: Content manager for Announcements, Blog posts, Testimonials, FAQs, Gallery items, and SEO meta tags.

### 4. Public API Engine (`/api`)
- **`/api/etse/register`**: Public ETSE registration handler with automated roll number assignment.
- **`/api/leads`**: Direct lead capture from website inquiry forms.
- **`/api/results/search`**: Roll Number + DOB scorecard verification.
- **`/api/results/import/preview` & `/api/results/import/confirm`**: Excel import staging and atomic execution.
- **`/api/verify-admit-card/[token]`**: Public QR-code verification endpoint for examination admit cards.

---

## 🔒 Enterprise Security & Data Governance

1. **Row Level Security (RLS)**: Enforced on all 28 PostgreSQL database tables. Students can only query their own data; administrative roles are governed through strict Role-Based Access Control (RBAC).
2. **Server-Side Token Isolation**: `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server actions and route handlers; it is never bundled in clientside JavaScript.
3. **Data Protection & Privacy**: Personalized student scorecards and admit cards include `noindex, nofollow` headers to protect minor student privacy from public search engine indexes.
4. **Audit Logging**: Sensitive operations (role changes, result imports, lead updates) are immutably written to the `audit_logs` table with user ID, IP address, and timestamp.
5. **Input Sanitation & Validation**: All incoming requests are strictly validated using typed Zod schemas.

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+)
- **Git**

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/ravithakur776/Emprise-Academy.git
cd Emprise-Academy
npm install
```

### 2. Environment Variables Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

NEXT_PUBLIC_SITE_URL=https://empriseacademy.com
```

### 3. Launch Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized static and server-rendered production build with Turbopack.

---

## 🧪 Comprehensive Automated Test Suites

The codebase includes an extensive suite of automated unit, integration, security, and QA tests:

```bash
# Run all test suites
npm test

# Run specific testing modules
npm run test:qa           # QA audits, hero slider integrity, gallery system, responsive checks
npm run test:security     # RBAC verification, student auth flows, dashboard bindings
npm run test:integration  # ETSE concurrency, admit card lifecycle, dynamic result imports
npm run test:unit         # Zod schemas and validation logic
npm run test:seo          # Local SEO, meta tags, Schema.org audits
npm run test:launch       # Production pre-launch smoke checklist
```

---

## 📍 Institutional Headquarters & Contact

- **Campus Address**: Emprise Academy, Opp. BSA College Road / Mathura Bypass, Mathura, Uttar Pradesh, India
- **Helpline**: `+91 7247889955`
- **Official Website**: [https://empriseacademy.com](https://empriseacademy.com)
- **Competitive Streams**: IIT-JEE (Main + Advanced) • NEET-UG • Foundation (Classes 8–10) • Olympiads

---

## 📜 Intellectual Property & Copyright

Private & Proprietary © 2011–2026 Emprise Academy. All rights reserved.  
*Unauthorized copying, distribution, or reproduction of proprietary assets, curricula, and software is strictly prohibited.*
