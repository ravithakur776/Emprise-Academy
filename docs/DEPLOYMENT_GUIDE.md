# Emprise Academy — Production Deployment & Launch Guide

---

## 1. System Architecture & Prerequisites
The Emprise Academy platform is built on Next.js with Turbopack, Tailwind CSS, TypeScript, and Supabase (PostgreSQL 15+, Auth, Storage, and Row Level Security).

### Required Environment Variables:
```env
# Public Client Variables
NEXT_PUBLIC_SITE_URL=https://empriseacademy.com
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Server-Only Private Secrets (Never expose client-side)
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
NODE_ENV=production
```

---

## 2. Supabase Database Setup & Migration Sequence
Run migrations in exact sequential order on a clean Supabase project:
1. `supabase/migrations/20260826000001_initial_emprise_schema.sql` (Creates 28 core tables, enums, triggers, RLS policies, and indexes).
2. `supabase/migrations/20260826000002_hardening_corrections.sql` (Enforces immutable application numbers, cryptographic token verification, and strict RLS boundaries).
3. `supabase/seed/production_seed.sql` (Populates official institutional business settings, standard academic courses, exam centres, and the live ETSE 2026 campaign).

---

## 3. Storage Bucket Configuration & Access Policies
Configure 4 dedicated Supabase storage buckets:
- **`public-media`** (`PUBLIC`): Campus images, director photos, and academy logos.
- **`student-documents`** (`PRIVATE`): Candidate identity proofs, transfer certificates, and category certificates.
- **`admit-cards`** (`PRIVATE`): Generated examination admit card PDF snapshots.
- **`result-scorecards`** (`PRIVATE`): High-resolution scorecard and certificate documents.

---

## 4. Custom Domain & DNS Mapping
1. **Primary Canonical Host**: `https://empriseacademy.com`
2. **Alternative Host Redirect**: Configure DNS / Edge reverse proxy to permanently redirect `http://*` and `https://www.empriseacademy.com` $\to$ `https://empriseacademy.com` (301 Moved Permanently).
3. **SSL/TLS**: Ensure modern TLS 1.3 certificate with HSTS enabled (configured via `next.config.ts`).

---

## 5. Rollback Plan
- **Application Rollback**: If a deployment issue occurs, instantly revert the deployment commit in Vercel/Docker to the previously verified stable build (`afae263` / `01f4cd7`).
- **Database Safety**: Never run destructive rollbacks against a live production database. All schema changes must follow additive/forward-compatible migration patterns.

---

## 6. Backup & Disaster Recovery
- Automated daily PostgreSQL backups configured via Supabase Pro point-in-time recovery (PITR).
- Manual snapshot recommended prior to high-volume campaigns (e.g. ETSE result publication day).

---

## 7. Post-Launch Operational Monitoring Checklist
- [ ] Monitor Supabase Auth error logs for failed student/admin logins.
- [ ] Verify ETSE candidate registration rate and application ID sequential progression.
- [ ] Test public QR verification token scans on physical admit cards.
- [ ] Monitor admissions enquiry intake in `/admin/leads`.
- [ ] Audit Google Search Console index coverage for canonical sitemap routes.
