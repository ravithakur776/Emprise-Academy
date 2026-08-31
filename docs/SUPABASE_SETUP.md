# Emprise Academy — Supabase Backend Foundation & Setup Guide

This document provides complete, step-by-step instructions for provisioning, configuring, and verifying the Supabase backend for Emprise Academy's authentication, role-based access control (RBAC), and student portal.

---

## 1. Architecture Overview

Emprise Academy employs a strict relational identity hierarchy linked directly to Supabase Auth:

```
                  ┌──────────────────────────────┐
                  │      Supabase Auth User      │
                  │        (auth.users.id)       │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │     public.user_profiles     │
                  │   (id = auth.users.id, FK)   │
                  └──────────────┬───────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │      public.user_roles       │ │   public.student_profiles    │
  │   (role = 'STUDENT', FK)     │ │   (user_id = auth.users.id)  │
  └──────────────────────────────┘ └──────────────┬───────────────┘
                                                  │
                 ┌────────────────────────────────┴──────────────────────────────┐
                 ▼                               ▼                               ▼
  ┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │  public.etse_registrations   │ │     public.admit_cards       │ │    public.student_results    │
  │ (student_profile_id = FK)    │ │   (registration_id = FK)     │ │  (student_profile_id = FK)   │
  └──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
```

---

## 2. Step-by-Step Setup

### Step 1: Create a Supabase Project
1. Log in to [Supabase Dashboard](https://app.supabase.com).
2. Click **New Project** and select your organization.
3. Name your project (e.g., `emprise-academy-production` or `emprise-academy-staging`).
4. Set a strong database password and select the region nearest to your audience (e.g., `ap-south-1` Mumbai).

---

### Step 2: Obtain API Credentials
1. Navigate to **Project Settings** → **API**.
2. Copy the **Project URL** (e.g., `https://[your-project-ref].supabase.co`).
3. Copy the **anon / public key** (`ey...`).
4. Copy the **service_role key** (keep this confidential; used strictly in server-side administrative contexts).

---

### Step 3: Configure Local Environment Variables
Create or update `.env.local` in your project root:

```bash
# 1. Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 2. Public Supabase Configuration (Browser + Server SSR)
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-public-key]

# 3. Privileged Admin Service Role Key (SERVER ONLY - NEVER EXPOSE TO CLIENT)
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

> **Security Rule**: Never commit `.env.local` to source control. Ensure it is listed in `.gitignore`.

---

### Step 4: Run Database Migrations
In the Supabase Dashboard, open the **SQL Editor** and run the migration scripts in sequential order:

1. **Initial Schema & RLS Policies**:
   - Open and execute: `supabase/migrations/20260826000001_initial_emprise_schema.sql`
   - This creates all enumerations, core tables (`user_profiles`, `user_roles`, `student_profiles`, `courses`, `etse_registrations`, `admit_cards`, `results`), indexes, and Row Level Security (RLS) policies.

2. **Hardening & Corrections**:
   - Open and execute: `supabase/migrations/20260826000002_hardening_corrections.sql`

---

### Step 5: (Optional) Seed Foundational Data
To populate foundational academic courses and administrative roles, execute:
- `supabase/seed/production_seed.sql`

---

### Step 6: Create a Development/Test Student Account

You can create a test student account directly via the Supabase Auth UI or via SQL:

#### Option A: Via Supabase Dashboard
1. Go to **Authentication** → **Users** → **Add User**.
2. Enter email: `student.test@empriseacademy.com` and a secure password.
3. Check **Auto Confirm User?** to bypass email confirmation for local testing.
4. Copy the generated `User ID` (UUID).
5. In SQL Editor, link the student profile and role:

```sql
-- Insert User Profile
INSERT INTO public.user_profiles (id, email, full_name, role)
VALUES ('<USER_UUID>', 'student.test@empriseacademy.com', 'Test Student', 'STUDENT')
ON CONFLICT (id) DO NOTHING;

-- Assign STUDENT Role
INSERT INTO public.user_roles (user_id, role, is_active)
VALUES ('<USER_UUID>', 'STUDENT', true)
ON CONFLICT DO NOTHING;

-- Create Linked Student Profile
INSERT INTO public.student_profiles (
    user_id,
    full_name,
    email,
    phone,
    dob,
    gender,
    current_class,
    is_active
) VALUES (
    '<USER_UUID>',
    'Test Student',
    'student.test@empriseacademy.com',
    '9876543210',
    '2010-05-15',
    'MALE',
    'Class 10',
    true
)
ON CONFLICT (user_id) DO NOTHING;
```

---

## 3. Verifying the Student Authentication Flow

Once configured, verify the complete authentication lifecycle:

1. **Launch Local Server**:
   ```bash
   npm run dev
   ```

2. **Access Login Page**:
   - Navigate to `http://localhost:3000/student/login`
   - Enter `student.test@empriseacademy.com` and password.
   - Click **Sign In to Portal**.

3. **Verify Expected Behaviors**:
   - Authentication succeeds against Supabase Auth.
   - Session cookie is securely established.
   - Profile verification confirms active `STUDENT` role and `student_profiles` row.
   - Toast displays `"Signed in successfully."`.
   - Browser navigates to `/student/dashboard`.
   - Page refresh retains authenticated session.
   - Logout clears session cookies and redirects to `/student/login`.

---

## 4. Security & RLS Compliance

- **Cross-Student Isolation**: Students can only access their own profile, applications, admit cards, and results via `user_id = auth.uid()`.
- **Administrative Segregation**: Staff and admin users attempting student login are safely rejected and directed to `/admin/login`.
- **Zero Client Service Key**: `SUPABASE_SERVICE_ROLE_KEY` is strictly constrained to server-side route handlers and administration services.
- **Open-Redirect Hardening**: All `redirectTo` query parameters are sanitized to internal `/student/*` paths.
