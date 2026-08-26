-- ==========================================================
-- EMPRISE ACADEMY DIGITAL PLATFORM
-- Phase 1.1: Production Hardening & Architectural Corrections Migration
-- ==========================================================

-- 1. ADMIT CARD STATUS ENUM
DO $$ BEGIN
    CREATE TYPE admit_card_status_enum AS ENUM (
        'DRAFT',
        'GENERATED',
        'PUBLISHED',
        'REVOKED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. EXAM APPLICATION COUNTERS (FOR CONCURRENCY-SAFE ETSE APPLICATION NUMBERS)
CREATE TABLE IF NOT EXISTS public.exam_application_counters (
    exam_id UUID PRIMARY KEY REFERENCES public.etse_exams(id) ON DELETE CASCADE,
    current_sequence INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Transaction-Safe, Collision-Proof Application Number Generator
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

    -- Atomic row-level lock and increment
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

-- 3. HARDEN ETSE REGISTRATIONS TABLE
-- Add Account Claiming columns if not exist
ALTER TABLE public.etse_registrations
    ADD COLUMN IF NOT EXISTS claim_token_hash VARCHAR(100),
    ADD COLUMN IF NOT EXISTS claim_token_expires_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ;

-- Prevent Application Number mutation on updates
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

-- Ensure unique registration per student per exam
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_student_exam_registration
    ON public.etse_registrations(exam_id, student_profile_id)
    WHERE student_profile_id IS NOT NULL;

-- 4. HARDEN ADMIT CARDS TABLE WITH SNAPSHOT IMMUTABILITY & STATUS
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

-- 5. DYNAMIC EXAM SUBJECTS TABLE (FOR EXAM-SPECIFIC RESULT SUBJECT CONFIGURATION)
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
ALTER TABLE public.exam_subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read exam subjects" ON public.exam_subjects FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage exam subjects" ON public.exam_subjects FOR ALL USING (public.is_admin_user());

-- 6. HARDEN ADMIT CARD PUBLIC VERIFICATION RPC (STATUS AWARE)
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
