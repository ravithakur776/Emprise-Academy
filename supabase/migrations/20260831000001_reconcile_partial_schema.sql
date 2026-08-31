-- ==========================================================
-- EMPRISE ACADEMY DIGITAL PLATFORM
-- Safe Idempotent Schema Reconciliation Migration
-- Reconciles all tables, types, triggers, RPCs, and RLS policies
-- ==========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE app_role_enum AS ENUM (
        'SUPER_ADMIN',
        'DIRECTOR',
        'ADMISSION_ADMIN',
        'COUNSELLOR',
        'EXAM_ADMIN',
        'CONTENT_MANAGER',
        'FACULTY',
        'STUDENT'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE gender_enum AS ENUM ('MALE', 'FEMALE', 'OTHER');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE etse_status_enum AS ENUM (
        'REGISTERED',
        'ADMIT_CARD_GENERATED',
        'APPEARED',
        'ABSENT',
        'RESULT_DECLARED',
        'CANCELLED'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE lead_status_enum AS ENUM (
        'NEW',
        'CONTACTED',
        'INTERESTED',
        'COUNSELLING_SCHEDULED',
        'CAMPUS_VISIT',
        'CONVERTED',
        'NOT_INTERESTED',
        'LOST'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE lead_source_enum AS ENUM (
        'WEBSITE',
        'INSTAGRAM',
        'FACEBOOK',
        'GOOGLE',
        'WHATSAPP',
        'PHONE',
        'ETSE',
        'SCHOLARSHIP',
        'REFERRAL',
        'WALK_IN',
        'OTHER'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE qualifying_status_enum AS ENUM (
        'QUALIFIED',
        'NOT_QUALIFIED',
        'AWAITING'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE priority_enum AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE admit_card_status_enum AS ENUM (
        'DRAFT',
        'GENERATED',
        'PUBLISHED',
        'REVOKED'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. SEQUENCES
CREATE SEQUENCE IF NOT EXISTS etse_application_seq START WITH 1001 INCREMENT BY 1;

-- 4. BASE HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. TABLES & CONSTRAINTS

-- User Profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    avatar_url TEXT,
    status VARCHAR(30) DEFAULT 'ACTIVE' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- User Roles
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role app_role_enum NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    assigned_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Student Profiles
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    admission_number VARCHAR(50) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    category VARCHAR(50),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    current_class VARCHAR(50) NOT NULL,
    target_exam VARCHAR(50),
    school_name VARCHAR(255),
    address TEXT,
    city VARCHAR(100) DEFAULT 'Mathura' NOT NULL,
    state VARCHAR(100) DEFAULT 'Uttar Pradesh' NOT NULL,
    pincode VARCHAR(10),
    photo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_student_profiles_phone ON public.student_profiles(phone);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON public.student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_student_profiles_dob ON public.student_profiles(dob);
CREATE INDEX IF NOT EXISTS idx_student_profiles_admission_no ON public.student_profiles(admission_number);

-- Parent Profiles
CREATE TABLE IF NOT EXISTS public.parent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    father_name VARCHAR(150) NOT NULL,
    father_occupation VARCHAR(100),
    father_phone VARCHAR(20) NOT NULL,
    mother_name VARCHAR(150),
    mother_occupation VARCHAR(100),
    mother_phone VARCHAR(20),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_student_parent UNIQUE (student_id)
);
CREATE INDEX IF NOT EXISTS idx_parent_profiles_student_id ON public.parent_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_profiles_father_phone ON public.parent_profiles(father_phone);

-- Directors
CREATE TABLE IF NOT EXISTS public.directors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    photo_url TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Faculty
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    experience_years_text VARCHAR(50),
    photo_url TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_faculty_subject ON public.faculty(subject);
CREATE INDEX IF NOT EXISTS idx_faculty_active ON public.faculty(is_active);

-- Courses
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    target_exam VARCHAR(50) NOT NULL,
    eligible_classes TEXT[] NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}' NOT NULL,
    syllabus_url TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_target ON public.courses(target_exam);

-- Course Programs
CREATE TABLE IF NOT EXISTS public.course_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    program_name VARCHAR(150) NOT NULL,
    mode VARCHAR(50) DEFAULT 'OFFLINE_CLASSROOM' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Batches
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    batch_name VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    timings VARCHAR(100),
    is_enrolling BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Leads & CRM
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(150) NOT NULL,
    parent_name VARCHAR(150),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    class VARCHAR(50),
    school VARCHAR(255),
    course_interest VARCHAR(100),
    source lead_source_enum DEFAULT 'WEBSITE' NOT NULL,
    status lead_status_enum DEFAULT 'NEW' NOT NULL,
    assigned_counsellor_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    notes TEXT,
    next_followup_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_counsellor ON public.leads(assigned_counsellor_id);
CREATE INDEX IF NOT EXISTS idx_leads_next_followup ON public.leads(next_followup_at);

CREATE TABLE IF NOT EXISTS public.lead_followups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    counsellor_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    followup_type VARCHAR(50) NOT NULL,
    remarks TEXT NOT NULL,
    next_action VARCHAR(200),
    followup_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lead_followups_lead_id ON public.lead_followups(lead_id);

CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    admission_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'CONFIRMED' NOT NULL,
    enrolled_at DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admissions_student_id ON public.admissions(student_id);
CREATE INDEX IF NOT EXISTS idx_admissions_no ON public.admissions(admission_number);

-- Exam Centres
CREATE TABLE IF NOT EXISTS public.exam_centres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    centre_code VARCHAR(50) NOT NULL UNIQUE,
    centre_name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) DEFAULT 'Mathura' NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    google_map_url TEXT,
    capacity INT DEFAULT 500 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ETSE Exams
CREATE TABLE IF NOT EXISTS public.etse_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    year INT NOT NULL,
    exam_date DATE NOT NULL,
    exam_time VARCHAR(50) NOT NULL,
    reporting_time VARCHAR(50) NOT NULL,
    registration_start_date DATE NOT NULL,
    registration_end_date DATE NOT NULL,
    eligible_classes TEXT[] NOT NULL,
    syllabus_url TEXT,
    sample_paper_url TEXT,
    instructions TEXT[] DEFAULT '{}' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    results_published BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_etse_exams_year ON public.etse_exams(year);
CREATE INDEX IF NOT EXISTS idx_etse_exams_active ON public.etse_exams(is_active);

-- ETSE Exam Application Counters (Hardening)
CREATE TABLE IF NOT EXISTS public.exam_application_counters (
    exam_id UUID PRIMARY KEY REFERENCES public.etse_exams(id) ON DELETE CASCADE,
    current_sequence INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Concurrency-Safe Application Number Generator
CREATE OR REPLACE FUNCTION public.get_next_etse_application_number(p_exam_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_year INT;
    v_next_val INT;
    v_app_no TEXT;
BEGIN
    SELECT year INTO v_year FROM public.etse_exams WHERE id = p_exam_id;
    IF v_year IS NULL THEN
        RAISE EXCEPTION 'ETSE Exam ID % not found', p_exam_id;
    END IF;

    INSERT INTO public.exam_application_counters (exam_id, current_sequence, updated_at)
    VALUES (p_exam_id, 1, NOW())
    ON CONFLICT (exam_id)
    DO UPDATE SET
        current_sequence = exam_application_counters.current_sequence + 1,
        updated_at = NOW()
    RETURNING current_sequence INTO v_next_val;

    v_app_no := 'ETSE' || v_year || '-' || LPAD(v_next_val::TEXT, 6, '0');
    RETURN v_app_no;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ETSE Registrations
CREATE TABLE IF NOT EXISTS public.etse_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(50) NOT NULL UNIQUE,
    student_profile_id UUID REFERENCES public.student_profiles(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    exam_id UUID NOT NULL REFERENCES public.etse_exams(id) ON DELETE RESTRICT,
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    mother_name VARCHAR(150),
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    current_class VARCHAR(50) NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    stream_interest VARCHAR(50) NOT NULL,
    exam_centre_id UUID NOT NULL REFERENCES public.exam_centres(id) ON DELETE RESTRICT,
    photo_url TEXT,
    status etse_status_enum DEFAULT 'REGISTERED' NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_etse_reg_app_no ON public.etse_registrations(application_number);
CREATE INDEX IF NOT EXISTS idx_etse_reg_phone ON public.etse_registrations(phone);
CREATE INDEX IF NOT EXISTS idx_etse_reg_exam_id ON public.etse_registrations(exam_id);
CREATE INDEX IF NOT EXISTS idx_etse_reg_student_profile ON public.etse_registrations(student_profile_id);

-- Hardening Columns for etse_registrations
ALTER TABLE public.etse_registrations
    ADD COLUMN IF NOT EXISTS claim_token_hash VARCHAR(100),
    ADD COLUMN IF NOT EXISTS claim_token_expires_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION public.trg_protect_etse_application_number()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.application_number IS NOT NULL AND NEW.application_number <> OLD.application_number THEN
        RAISE EXCEPTION 'Application number cannot be altered once assigned.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_before_update_etse_reg_protect_app_no ON public.etse_registrations;
CREATE TRIGGER trg_before_update_etse_reg_protect_app_no
    BEFORE UPDATE ON public.etse_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_protect_etse_application_number();

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_student_exam_registration
    ON public.etse_registrations(exam_id, student_profile_id)
    WHERE student_profile_id IS NOT NULL;

-- Admit Cards
CREATE TABLE IF NOT EXISTS public.admit_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL UNIQUE REFERENCES public.etse_registrations(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES public.etse_exams(id) ON DELETE RESTRICT,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    verification_token VARCHAR(100) NOT NULL UNIQUE,
    qr_verification_url TEXT NOT NULL,
    exam_date DATE NOT NULL,
    exam_time VARCHAR(50) NOT NULL,
    reporting_time VARCHAR(50) NOT NULL,
    exam_centre_id UUID NOT NULL REFERENCES public.exam_centres(id) ON DELETE RESTRICT,
    is_generated BOOLEAN DEFAULT TRUE NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    download_count INT DEFAULT 0 NOT NULL,
    last_downloaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admit_cards_roll_no ON public.admit_cards(roll_number);
CREATE INDEX IF NOT EXISTS idx_admit_cards_token ON public.admit_cards(verification_token);
CREATE INDEX IF NOT EXISTS idx_admit_cards_exam_id ON public.admit_cards(exam_id);

-- Hardening Columns for admit_cards
ALTER TABLE public.admit_cards
    ADD COLUMN IF NOT EXISTS status admit_card_status_enum DEFAULT 'PUBLISHED' NOT NULL,
    ADD COLUMN IF NOT EXISTS student_name_snapshot VARCHAR(150),
    ADD COLUMN IF NOT EXISTS father_name_snapshot VARCHAR(150),
    ADD COLUMN IF NOT EXISTS mother_name_snapshot VARCHAR(150),
    ADD COLUMN IF NOT EXISTS dob_snapshot DATE,
    ADD COLUMN IF NOT EXISTS class_snapshot VARCHAR(50),
    ADD COLUMN IF NOT EXISTS school_name_snapshot VARCHAR(255),
    ADD COLUMN IF NOT EXISTS centre_name_snapshot VARCHAR(200),
    ADD COLUMN IF NOT EXISTS centre_address_snapshot TEXT,
    ADD COLUMN IF NOT EXISTS instructions_snapshot TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS regenerated_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS revocation_reason TEXT;

CREATE INDEX IF NOT EXISTS idx_admit_cards_status ON public.admit_cards(status);

-- Trigger: Automatically Generate Admit Card
CREATE OR REPLACE FUNCTION trg_auto_generate_admit_card()
RETURNS TRIGGER AS $$
DECLARE
    v_exam RECORD;
    v_roll_number VARCHAR(50);
    v_token VARCHAR(100);
BEGIN
    SELECT * INTO v_exam FROM public.etse_exams WHERE id = NEW.exam_id;
    
    v_roll_number := v_exam.year || LPAD(REGEXP_REPLACE(NEW.current_class, '\D', '', 'g'), 2, '0') || LPAD(nextval('etse_application_seq')::text, 5, '0');
    v_token := encode(digest(NEW.id::text || NEW.phone || NOW()::text || gen_random_uuid()::text, 'sha256'), 'hex');

    INSERT INTO public.admit_cards (
        registration_id,
        exam_id,
        roll_number,
        verification_token,
        qr_verification_url,
        exam_date,
        exam_time,
        reporting_time,
        exam_centre_id,
        is_generated,
        generated_at,
        student_name_snapshot,
        father_name_snapshot,
        mother_name_snapshot,
        dob_snapshot,
        class_snapshot,
        school_name_snapshot
    ) VALUES (
        NEW.id,
        NEW.exam_id,
        v_roll_number,
        v_token,
        '/verify-admit-card/' || v_token,
        v_exam.exam_date,
        v_exam.exam_time,
        v_exam.reporting_time,
        NEW.exam_centre_id,
        TRUE,
        NOW(),
        NEW.student_name,
        NEW.father_name,
        NEW.mother_name,
        NEW.dob,
        NEW.current_class,
        NEW.school_name
    ) ON CONFLICT (registration_id) DO NOTHING;

    UPDATE public.etse_registrations
    SET status = 'ADMIT_CARD_GENERATED'
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS after_etse_registration_insert ON public.etse_registrations;
CREATE TRIGGER after_etse_registration_insert
    AFTER INSERT ON public.etse_registrations
    FOR EACH ROW
    EXECUTE FUNCTION trg_auto_generate_admit_card();

-- Result Exams
CREATE TABLE IF NOT EXISTS public.result_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_code VARCHAR(50) NOT NULL UNIQUE,
    exam_title VARCHAR(200) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    exam_type VARCHAR(50) DEFAULT 'ETSE' NOT NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_result_exams_year ON public.result_exams(academic_year);
CREATE INDEX IF NOT EXISTS idx_result_exams_published ON public.result_exams(is_published);

-- Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES public.result_exams(id) ON DELETE CASCADE,
    academic_year VARCHAR(20) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    student_profile_id UUID REFERENCES public.student_profiles(id) ON DELETE SET NULL,
    candidate_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    class_enrolled VARCHAR(50) NOT NULL,
    stream VARCHAR(50),
    total_marks_obtained NUMERIC(6, 2) NOT NULL,
    max_marks NUMERIC(6, 2) NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    percentile NUMERIC(5, 2),
    rank INT,
    category_rank INT,
    scholarship_percentage_awarded NUMERIC(5, 2) DEFAULT 0,
    qualifying_status qualifying_status_enum DEFAULT 'QUALIFIED' NOT NULL,
    remarks TEXT,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT unique_exam_year_roll UNIQUE (exam_id, academic_year, roll_number)
);
CREATE INDEX IF NOT EXISTS idx_results_roll_number ON public.results(roll_number);
CREATE INDEX IF NOT EXISTS idx_results_dob ON public.results(dob);
CREATE INDEX IF NOT EXISTS idx_results_exam_year ON public.results(exam_id, academic_year);
CREATE INDEX IF NOT EXISTS idx_results_student_profile ON public.results(student_profile_id);

-- Result Subjects
CREATE TABLE IF NOT EXISTS public.result_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    result_id UUID NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    marks_obtained NUMERIC(6, 2) NOT NULL,
    max_marks NUMERIC(6, 2) NOT NULL,
    subject_rank INT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_result_subjects_result_id ON public.result_subjects(result_id);

-- Dynamic Exam Subjects (Hardening)
CREATE TABLE IF NOT EXISTS public.exam_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES public.result_exams(id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(50) NOT NULL,
    maximum_marks NUMERIC(6, 2) NOT NULL,
    pass_marks NUMERIC(6, 2),
    display_order INT DEFAULT 0 NOT NULL,
    is_optional BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_exam_subject_code UNIQUE (exam_id, subject_code)
);
CREATE INDEX IF NOT EXISTS idx_exam_subjects_exam_id ON public.exam_subjects(exam_id);

-- Student Result History
CREATE TABLE IF NOT EXISTS public.student_result_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    result_id UUID NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
    exam_title VARCHAR(200) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    score_summary JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_student_result_history UNIQUE (student_profile_id, result_id)
);
CREATE INDEX IF NOT EXISTS idx_result_history_student ON public.student_result_history(student_profile_id);

CREATE OR REPLACE FUNCTION trg_link_result_history()
RETURNS TRIGGER AS $$
DECLARE
    v_exam RECORD;
BEGIN
    IF NEW.student_profile_id IS NOT NULL THEN
        SELECT * INTO v_exam FROM public.result_exams WHERE id = NEW.exam_id;
        INSERT INTO public.student_result_history (
            student_profile_id,
            result_id,
            exam_title,
            academic_year,
            score_summary
        ) VALUES (
            NEW.student_profile_id,
            NEW.id,
            COALESCE(v_exam.exam_title, 'Academic Test'),
            NEW.academic_year,
            jsonb_build_object(
                'totalMarksObtained', NEW.total_marks_obtained,
                'maxMarks', NEW.max_marks,
                'percentage', NEW.percentage,
                'percentile', NEW.percentile,
                'rank', NEW.rank,
                'qualifyingStatus', NEW.qualifying_status,
                'scholarshipAwarded', NEW.scholarship_percentage_awarded
            )
        )
        ON CONFLICT (student_profile_id, result_id)
        DO UPDATE SET
            score_summary = EXCLUDED.score_summary;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS after_result_upsert ON public.results;
CREATE TRIGGER after_result_upsert
    AFTER INSERT OR UPDATE ON public.results
    FOR EACH ROW
    EXECUTE FUNCTION trg_link_result_history();

-- Scholarship Programs & Applications
CREATE TABLE IF NOT EXISTS public.scholarship_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    eligibility_criteria TEXT NOT NULL,
    criteria_details JSONB DEFAULT '[]' NOT NULL,
    max_scholarship_percent NUMERIC(5, 2) DEFAULT 100 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.scholarship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES public.scholarship_programs(id) ON DELETE RESTRICT,
    student_profile_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    marks_obtained NUMERIC(6, 2),
    proof_document_url TEXT,
    status VARCHAR(50) DEFAULT 'PENDING' NOT NULL,
    awarded_percentage NUMERIC(5, 2) DEFAULT 0,
    reviewed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Testimonials, Gallery, Blog, Announcements, Notifications, Audit
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(150) NOT NULL,
    exam_cleared VARCHAR(100) NOT NULL,
    rank_text VARCHAR(100) NOT NULL,
    course_attended VARCHAR(150) NOT NULL,
    year INT NOT NULL,
    quote TEXT NOT NULL,
    photo_url TEXT,
    video_url TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category VARCHAR(50) NOT NULL,
    author_name VARCHAR(150) DEFAULT 'Emprise Academic Team' NOT NULL,
    tags TEXT[] DEFAULT '{}' NOT NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    link_url TEXT,
    priority priority_enum DEFAULT 'NORMAL' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    start_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'GENERAL' NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    metadata JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_name, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- 6. SECURITY HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.current_user_has_role(required_role app_role_enum)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
          AND role = required_role
          AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
          AND role IN ('SUPER_ADMIN', 'DIRECTOR', 'ADMISSION_ADMIN', 'EXAM_ADMIN', 'CONTENT_MANAGER', 'COUNSELLOR')
          AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.etse_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.etse_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.result_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.result_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_result_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 8. RECONCILE ALL RLS POLICIES (IDEMPOTENT DROP & RECREATE)

-- Courses Policies
DROP POLICY IF EXISTS "Public read active courses" ON public.courses;
CREATE POLICY "Public read active courses" ON public.courses FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage courses" ON public.courses;
CREATE POLICY "Admin manage courses" ON public.courses FOR ALL USING (public.is_admin_user());

-- Faculty Policies
DROP POLICY IF EXISTS "Public read active faculty" ON public.faculty;
CREATE POLICY "Public read active faculty" ON public.faculty FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage faculty" ON public.faculty;
CREATE POLICY "Admin manage faculty" ON public.faculty FOR ALL USING (public.is_admin_user());

-- Directors Policies
DROP POLICY IF EXISTS "Public read active directors" ON public.directors;
CREATE POLICY "Public read active directors" ON public.directors FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage directors" ON public.directors;
CREATE POLICY "Admin manage directors" ON public.directors FOR ALL USING (public.is_admin_user());

-- Testimonials Policies
DROP POLICY IF EXISTS "Public read active testimonials" ON public.testimonials;
CREATE POLICY "Public read active testimonials" ON public.testimonials FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage testimonials" ON public.testimonials;
CREATE POLICY "Admin manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin_user());

-- Gallery Policies
DROP POLICY IF EXISTS "Public read active gallery" ON public.gallery_items;
CREATE POLICY "Public read active gallery" ON public.gallery_items FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage gallery" ON public.gallery_items;
CREATE POLICY "Admin manage gallery" ON public.gallery_items FOR ALL USING (public.is_admin_user());

-- Blog Posts Policies
DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
CREATE POLICY "Public read published blog posts" ON public.blog_posts FOR SELECT USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admin manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin manage blog posts" ON public.blog_posts FOR ALL USING (public.is_admin_user());

-- Announcements Policies
DROP POLICY IF EXISTS "Public read active announcements" ON public.announcements;
CREATE POLICY "Public read active announcements" ON public.announcements FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage announcements" ON public.announcements;
CREATE POLICY "Admin manage announcements" ON public.announcements FOR ALL USING (public.is_admin_user());

-- Exam Centres Policies
DROP POLICY IF EXISTS "Public read active exam centres" ON public.exam_centres;
CREATE POLICY "Public read active exam centres" ON public.exam_centres FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage exam centres" ON public.exam_centres;
CREATE POLICY "Admin manage exam centres" ON public.exam_centres FOR ALL USING (public.is_admin_user());

-- ETSE Exams Policies
DROP POLICY IF EXISTS "Public read active etse exams" ON public.etse_exams;
CREATE POLICY "Public read active etse exams" ON public.etse_exams FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage etse exams" ON public.etse_exams;
CREATE POLICY "Admin manage etse exams" ON public.etse_exams FOR ALL USING (public.is_admin_user());

-- Exam Subjects Policies (Hardening)
DROP POLICY IF EXISTS "Public read exam subjects" ON public.exam_subjects;
CREATE POLICY "Public read exam subjects" ON public.exam_subjects FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage exam subjects" ON public.exam_subjects;
CREATE POLICY "Admin manage exam subjects" ON public.exam_subjects FOR ALL USING (public.is_admin_user());

-- Student Profile Policies (Isolated to Owner)
DROP POLICY IF EXISTS "Students read own profile" ON public.student_profiles;
CREATE POLICY "Students read own profile" ON public.student_profiles FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Students update own profile" ON public.student_profiles;
CREATE POLICY "Students update own profile" ON public.student_profiles FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin manage all student profiles" ON public.student_profiles;
CREATE POLICY "Admin manage all student profiles" ON public.student_profiles FOR ALL USING (public.is_admin_user());

-- ETSE Registration Policies
DROP POLICY IF EXISTS "Students read own etse registration" ON public.etse_registrations;
CREATE POLICY "Students read own etse registration" ON public.etse_registrations FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can register for ETSE" ON public.etse_registrations;
CREATE POLICY "Anyone can register for ETSE" ON public.etse_registrations FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin manage etse registrations" ON public.etse_registrations;
CREATE POLICY "Admin manage etse registrations" ON public.etse_registrations FOR ALL USING (public.is_admin_user());

-- Admit Card Policies
DROP POLICY IF EXISTS "Students read own admit card" ON public.admit_cards;
CREATE POLICY "Students read own admit card" ON public.admit_cards FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.etse_registrations r
        WHERE r.id = admit_cards.registration_id
          AND r.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Admin manage admit cards" ON public.admit_cards;
CREATE POLICY "Admin manage admit cards" ON public.admit_cards FOR ALL USING (public.is_admin_user());

-- Results & Result History Policies
DROP POLICY IF EXISTS "Students read own results" ON public.results;
CREATE POLICY "Students read own results" ON public.results FOR SELECT USING (
    is_published = TRUE AND (
        student_profile_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Admin manage results" ON public.results;
CREATE POLICY "Admin manage results" ON public.results FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Students read own result history" ON public.student_result_history;
CREATE POLICY "Students read own result history" ON public.student_result_history FOR SELECT USING (
    student_profile_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admin manage result history" ON public.student_result_history;
CREATE POLICY "Admin manage result history" ON public.student_result_history FOR ALL USING (public.is_admin_user());

-- Leads & CRM Policies
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin manage leads" ON public.leads;
CREATE POLICY "Admin manage leads" ON public.leads FOR ALL USING (public.is_admin_user());

-- Audit Log Policies
DROP POLICY IF EXISTS "Super admin read audit logs" ON public.audit_logs;
CREATE POLICY "Super admin read audit logs" ON public.audit_logs FOR SELECT USING (
    public.current_user_has_role('SUPER_ADMIN')
);

DROP POLICY IF EXISTS "Service insert audit logs" ON public.audit_logs;
CREATE POLICY "Service insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (TRUE);

-- 9. SECURE RPC LOOKUP FUNCTIONS

-- Hardened Public Admit Card Verification RPC
CREATE OR REPLACE FUNCTION public.verify_admit_card_public(p_token TEXT)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'isValid', (ac.status IN ('PUBLISHED', 'GENERATED')),
        'candidateName', COALESCE(ac.student_name_snapshot, r.student_name),
        'applicationNumber', r.application_number,
        'rollNumber', ac.roll_number,
        'examTitle', e.title,
        'examDate', ac.exam_date,
        'examCentre', COALESCE(ac.centre_name_snapshot, c.centre_name),
        'centreAddress', COALESCE(ac.centre_address_snapshot, c.address),
        'status', ac.status::TEXT,
        'revocationReason', ac.revocation_reason,
        'verifiedAt', NOW()
    ) INTO v_result
    FROM public.admit_cards ac
    JOIN public.etse_registrations r ON r.id = ac.registration_id
    JOIN public.etse_exams e ON e.id = ac.exam_id
    JOIN public.exam_centres c ON c.id = ac.exam_centre_id
    WHERE ac.verification_token = p_token;

    IF v_result IS NULL THEN
        RETURN jsonb_build_object(
            'isValid', FALSE,
            'message', 'Invalid or expired admit card verification token'
        );
    END IF;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Secure Student Result Search by Roll Number + DOB
CREATE OR REPLACE FUNCTION public.search_student_result_secure(
    p_roll_number TEXT,
    p_dob DATE,
    p_exam_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_res RECORD;
    v_subjects JSONB;
BEGIN
    SELECT * INTO v_res
    FROM public.results
    WHERE roll_number = UPPER(TRIM(p_roll_number))
      AND dob = p_dob
      AND exam_id = p_exam_id
      AND is_published = TRUE
      AND deleted_at IS NULL;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    SELECT jsonb_agg(
        jsonb_build_object(
            'subjectName', subject_name,
            'marksObtained', marks_obtained,
            'maxMarks', max_marks,
            'subjectRank', subject_rank
        )
    ) INTO v_subjects
    FROM public.result_subjects
    WHERE result_id = v_res.id;

    RETURN jsonb_build_object(
        'candidateName', v_res.candidate_name,
        'fatherName', v_res.father_name,
        'rollNumber', v_res.roll_number,
        'classEnrolled', v_res.class_enrolled,
        'stream', v_res.stream,
        'academicYear', v_res.academic_year,
        'totalMarksObtained', v_res.total_marks_obtained,
        'maxMarks', v_res.max_marks,
        'percentage', v_res.percentage,
        'percentile', v_res.percentile,
        'rank', v_res.rank,
        'categoryRank', v_res.category_rank,
        'scholarshipPercentageAwarded', v_res.scholarship_percentage_awarded,
        'qualifyingStatus', v_res.qualifying_status,
        'remarks', v_res.remarks,
        'subjects', COALESCE(v_subjects, '[]'::jsonb)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
