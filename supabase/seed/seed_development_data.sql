-- ==========================================================
-- EMPRISE ACADEMY DIGITAL PLATFORM
-- Technical Development Seed Data (Strictly for Local/Dev Verification)
-- ==========================================================

-- Insert verified Mathura Exam Centre
INSERT INTO public.exam_centres (id, centre_code, centre_name, address, city, pincode, capacity, is_active)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'MATHURA-CENTRE-01',
    'Emprise Academy Main Campus',
    'Main Academic Block, Mathura',
    'Mathura',
    '281001',
    600,
    TRUE
) ON CONFLICT (centre_code) DO NOTHING;

-- Insert ETSE 2026 Exam definition
INSERT INTO public.etse_exams (
    id,
    exam_code,
    title,
    year,
    exam_date,
    exam_time,
    reporting_time,
    registration_start_date,
    registration_end_date,
    eligible_classes,
    instructions,
    is_active,
    results_published
) VALUES (
    'e0000000-0000-0000-0000-000000000001',
    'ETSE-2026-PHASE-1',
    'Emprise Talent Search Examination (ETSE) 2026',
    2026,
    '2026-10-18',
    '10:00 AM - 01:00 PM',
    '09:15 AM',
    '2026-08-01',
    '2026-10-10',
    ARRAY['Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11'],
    ARRAY[
        'Carry a printed copy of your Admit Card and a valid school ID proof.',
        'Use only blue/black ballpoint pens for OMR sheets.',
        'Calculators, mobile phones, and smart watches are strictly prohibited inside the exam hall.',
        'Report at least 45 minutes prior to exam commencement.'
    ],
    TRUE,
    FALSE
) ON CONFLICT (exam_code) DO NOTHING;

-- Insert Result Exam definition for historical/mock imports
INSERT INTO public.result_exams (
    id,
    exam_code,
    exam_title,
    academic_year,
    exam_type,
    is_published,
    published_at
) VALUES (
    'r0000000-0000-0000-0000-000000000001',
    'ETSE-2025-ANNUAL',
    'Emprise Talent Search Exam 2025 Results',
    '2025-2026',
    'ETSE',
    TRUE,
    NOW()
) ON CONFLICT (exam_code) DO NOTHING;

-- Seed Dynamic Exam Subjects for ETSE-2025
INSERT INTO public.exam_subjects (id, exam_id, subject_name, subject_code, maximum_marks, pass_marks, display_order)
VALUES
    ('s0000000-0000-0000-0000-000000000001', 'r0000000-0000-0000-0000-000000000001', 'Physics', 'PHY', 100, 35, 1),
    ('s0000000-0000-0000-0000-000000000002', 'r0000000-0000-0000-0000-000000000001', 'Chemistry', 'CHEM', 100, 35, 2),
    ('s0000000-0000-0000-0000-000000000003', 'r0000000-0000-0000-0000-000000000001', 'Mathematics', 'MATH', 100, 35, 3)
ON CONFLICT (exam_id, subject_code) DO NOTHING;

-- Insert Core Academic Courses (Verified Pillars)
INSERT INTO public.courses (
    id,
    slug,
    name,
    target_exam,
    eligible_classes,
    duration,
    description,
    features,
    is_active,
    display_order
) VALUES 
(
    'c0000000-0000-0000-0000-000000000001',
    'iit-jee-two-year-program',
    '2-Year Integrated JEE (Main + Advanced) Program',
    'IIT_JEE',
    ARRAY['Class 11'],
    '2 Years',
    'Intensive classroom program covering complete 11th & 12th syllabus with advanced problem solving for JEE Main & Advanced.',
    ARRAY['Top faculty mentorship', 'Daily Practice Problems (DPPs)', 'Comprehensive All-India Test Series', 'Dedicated Doubt Clearing Sessions'],
    TRUE,
    1
),
(
    'c0000000-0000-0000-0000-000000000002',
    'neet-ug-two-year-program',
    '2-Year Integrated NEET-UG Medical Program',
    'NEET_UG',
    ARRAY['Class 11'],
    '2 Years',
    'Targeted medical entrance training with line-by-line NCERT analysis, rigorous speed tests, and concept mastery in Physics, Chemistry & Biology.',
    ARRAY['NCERT-centric modules', 'Regular OMR mock drills', 'Physics concept booster workshops', 'Detailed analytical performance reports'],
    TRUE,
    2
),
(
    'c0000000-0000-0000-0000-000000000003',
    'foundation-classes-8-9-10',
    'Junior Science & Math Foundation Program',
    'FOUNDATION',
    ARRAY['Class 8', 'Class 9', 'Class 10'],
    '1 to 3 Years',
    'Building early analytical depth, scientific reasoning, and competitive aptitude for Olympiads, NTSE, and strong fundamentals for 11th prep.',
    ARRAY['Olympiad & NTSE prep', 'Mental ability training', 'School curriculum sync', 'Interactive problem solving labs'],
    TRUE,
    3
)
ON CONFLICT (slug) DO NOTHING;
