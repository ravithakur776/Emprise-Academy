# Emprise Academy — Admin Handover & Operations Guide

---

## 1. Access & Role Overview
The Emprise Academy administration platform is accessible at `/admin/login`. Access is partitioned by roles:
- **`SUPER_ADMIN`**: Full platform control, site settings, staff role management.
- **`DIRECTOR`**: Comprehensive institutional oversight, academic reviews, admissions approvals, and result sign-offs.
- **`ADMISSION_ADMIN`**: Admissions lead intake, counsellor allocation, student records, and batch enrollment.
- **`COUNSELLOR`**: Assigned lead follow-ups, communication logs, and campus visit scheduling.
- **`EXAM_ADMIN`**: ETSE registration management, Admit Card generation, Excel/CSV result imports, and exam centres.
- **`CONTENT_MANAGER`**: CMS management (Blog, Testimonials, Gallery, Announcements, FAQs).

---

## 2. Admissions CRM & Lead Management
- **Dashboard Location**: `/admin/leads` and `/admin/follow-ups`
- **Workflow**:
  1. New enquiries submitted through the website, WhatsApp, or phone automatically appear as `NEW` leads.
  2. The Admission Admin assigns leads to Counsellors.
  3. Counsellors record communication logs (`CALL`, `WHATSAPP`, `COUNSELLING_SESSION`, `CAMPUS_MEETING`) and update status (`CONTACTED` $\to$ `INTERESTED` $\to$ `COUNSELLING_SCHEDULED` $\to$ `CAMPUS_VISIT` $\to$ `CONVERTED`).
  4. Converted leads transition into official student admissions (`/admin/admissions`).

---

## 3. ETSE 2026 Examination & Admit Card Operations
- **Dashboard Location**: `/admin/admit-cards` and `/admin/etse`
- **Single Pass Generation** (`/admin/admit-cards/generate`):
  - Select candidate registration $\to$ assign Exam Centre $\to$ auto-allocate roll number $\to$ issue cryptographic QR-backed admit card.
- **Bulk Pass Generation** (`/admin/admit-cards/bulk`):
  - Generate passes for entire class cohorts with sequential roll numbering (`26080001`...).
- **Pass Verification & Revocation** (`/admin/admit-cards/[id]`):
  - View candidate registration snapshot, regenerate QR security tokens, or revoke passes if details need correction.

---

## 4. Result Management & Excel Import
- **Dashboard Location**: `/admin/results`
- **Step-by-Step Import Workflow** (`/admin/results/import`):
  1. Download the customized Excel template for the target examination (`/api/results/template/[examId]`).
  2. Fill in Roll Numbers, Candidate Names, Subject Marks, and Ranks.
  3. Upload XLSX/CSV $\to$ system validates column headers and score bounds.
  4. Review validation report on the Preview screen (`/admin/results/import/preview`).
  5. Click **Publish Results** to commit transactional upserts and generate public verification tokens.
- **Public Verification**: Candidates verify their scorecards using Roll Number + Date of Birth at `/results`.

---

## 5. Content Management System (CMS)
- **Dashboard Location**: `/admin/cms`
- **Homepage Copy & Statistics** (`/admin/cms/homepage`): Update Hero headlines, CTA buttons, and verified milestone numbers.
- **Faculty Directory** (`/admin/cms/faculty`): Manage teacher credentials, subjects, experience, and display order.
- **Leadership Profiles** (`/admin/cms/directors`): Edit academic director bios and teaching philosophies.
- **Announcements & Marquee** (`/admin/cms/announcements`): Publish time-gated notices and urgent banners with auto-expiration.
- **SEO & Metadata** (`/admin/cms/seo`): Customize page title tags, meta descriptions, and inspect live Google SERP previews.

---

## 6. Staff Security Guidelines
- Never share administrative credentials or login links.
- Password resets must be initiated only through `/admin/login` or by a `SUPER_ADMIN`.
- Operational logs are immutable and tracked in the audit trail (`public.audit_logs`).
