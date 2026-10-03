-- Migration: Update ETSE 2026 Exam Date to Canonical 2026-10-25 (25 October 2026)
-- Timezone: Asia/Kolkata
-- Canonical single source of truth: 25 October 2026 (Sunday)

BEGIN;

-- 1. Update active ETSE 2026 exam record in public.etse_exams
UPDATE public.etse_exams
SET exam_date = '2026-10-25',
    updated_at = NOW()
WHERE exam_code = 'ETSE-2026'
   OR (year = 2026 AND is_active = TRUE);

-- 2. Update admit cards associated with the ETSE 2026 examination
UPDATE public.admit_cards
SET exam_date = '2026-10-25',
    updated_at = NOW()
WHERE exam_id IN (
    SELECT id FROM public.etse_exams
    WHERE exam_code = 'ETSE-2026' OR year = 2026
);

-- 3. If public.examinations table exists (used in seed/legacy schemas), update it safely
DO $$
BEGIN
    IF EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'examinations'
    ) THEN
        UPDATE public.examinations
        SET exam_date = '2026-10-25',
            updated_at = NOW()
        WHERE exam_code = 'ETSE-2026' OR exam_type = 'ETSE';
    END IF;
END $$;

COMMIT;
