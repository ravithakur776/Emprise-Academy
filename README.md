# Emprise Academy — Digital Platform (Phase 1: Architecture & Foundation)

> **Premier Institute for IIT-JEE, NEET-UG & Foundation Classes 8–10 in Mathura**  
> Established 2011 • 15+ Years of Academic Excellence

---

## 🏛️ Project Overview

The **Emprise Academy** digital platform is an end-to-end institutional ecosystem built to manage student admissions, scholarship examinations (ETSE 2026), automated admit card generation, Excel-driven result publishing, lead management CRM, and student performance tracking.

This repository contains the **Phase 1 Production Architecture & Foundation**, providing fully normalized PostgreSQL schemas, Supabase SSR Auth with Row Level Security (RLS), Zod validation schemas, business services, and App Router route structures.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + TypeScript
- **Styling & Design System**: Tailwind CSS with custom Emprise brand tokens:
  - Deep Navy: `#0A192F` / `#0D2342`
  - Vibrant Orange: `#FF6B00` / `#FA5A00`
  - Clean Slate / Off-White backgrounds
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL with RLS, Supabase Auth, Storage)
- **Validation**: [Zod](https://zod.dev/)
- **Data Ingestion**: [SheetJS (xlsx)](https://sheetjs.com/) for Excel/CSV parsing and validation

---

## 🏗️ Core Architecture & Features

### 1. Database Schema & Row Level Security (28 Tables)
- **RBAC**: `user_profiles`, `user_roles` (`SUPER_ADMIN`, `DIRECTOR`, `ADMISSION_ADMIN`, `COUNSELLOR`, `EXAM_ADMIN`, `CONTENT_MANAGER`, `FACULTY`, `STUDENT`).
- **Academic & Students**: `student_profiles`, `parent_profiles`, `courses`, `course_programs`, `batches`, `faculty`, `directors`.
- **ETSE 2026 & Admit Cards**: `exam_centres`, `etse_exams`, `etse_registrations`, `admit_cards` (with automated sequence generation and SHA-256 verification tokens).
- **Result Management**: `result_exams`, `results`, `result_subjects`, `student_result_history` (with unique constraint `(exam_id, academic_year, roll_number)`).
- **CRM & Admissions**: `leads`, `lead_followups`, `admissions` (with phone deduplication).
- **CMS**: `scholarship_programs`, `scholarship_applications`, `testimonials`, `gallery_items`, `blog_posts`, `announcements`.
- **Governance**: `audit_logs`, `notifications`.

### 2. Excel Result Import Engine
- Accepts `.xlsx`, `.xls`, and `.csv` files up to 5MB.
- Normalizes column variations ("Roll No", "Phy", "Chem", "Total Marks", "AIR").
- Two-phase import: `/api/results/import/preview` (validation report) $\rightarrow$ `/api/results/import/confirm` (atomic PostgreSQL upsert).
- Batch duplicate detection and marks validity boundaries.

### 3. Public Result & Admit Card Verification
- Secure Result Lookup by Roll Number + Date of Birth without exposing private student records.
- Public Admit Card verification endpoint at `/api/verify-admit-card/[token]`.
- Enforces `noindex` headers on personalized search views for student data privacy.

---

## 📂 Project Directory Structure

```
src/
├── app/
│   ├── (public)/          # Public routes (about, courses, results, faculty, etse-2026, etc.)
│   ├── (student)/         # Protected student portal (dashboard, profile, admit-cards, results)
│   ├── (admin)/           # Protected admin portal (leads, results, etse, admit-cards, cms)
│   ├── api/               # Standardized REST API handlers
│   ├── layout.tsx         # Root layout with SEO and brand metadata
│   └── globals.css        # Tailwind theme tokens
├── config/                # Site config & brand constants
├── data/                  # Verified academic pillars (JEE, NEET, Foundation 8-10)
├── lib/
│   ├── supabase/          # SSR, Client, Server, and Admin Service-Role clients
│   ├── api-response.ts    # Standard API response envelopes
│   ├── auth-helpers.ts    # Server-side RBAC utilities
│   ├── audit.ts           # Administrative audit logging
│   └── errors.ts          # Centralized error classes
├── services/              # Business logic (result import, etse, admit card, leads, storage, cms)
├── types/                 # Database and domain TypeScript types
└── validations/           # Zod validation schemas
supabase/
├── migrations/            # Complete PostgreSQL DDL with RLS, triggers & RPCs
└── seed/                  # Development testing seed data
tests/
└── phase1-foundation.test.ts # Automated test suite
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- npm / pnpm / yarn

### 2. Installation
```bash
git clone https://github.com/ravithakur776/Emprise-Academy.git
cd Emprise-Academy
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL, Anon Key, and Service Role Key.

### 4. Apply Database Migrations (Supabase)
Run the SQL migration in `supabase/migrations/20260826000001_initial_emprise_schema.sql` via Supabase SQL Editor or Supabase CLI:
```bash
npx supabase db push
```

### 5. Run Automated Verification Tests
```bash
npx tsx tests/phase1-foundation.test.ts
```

### 6. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Privacy Practices

- **Row Level Security (RLS)** is enabled on all tables in PostgreSQL.
- The `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server-side tasks and is never exposed to browser bundles.
- Client inputs are validated through **Zod** prior to database execution.
- Personal results and admit cards are hidden from search engine indexing using `noindex` directives.
- All sensitive admin actions are recorded in the `audit_logs` table.

---

## 📜 License

Private & Proprietary © 2011–2026 Emprise Academy. All rights reserved.
