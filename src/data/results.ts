/**
 * Official Verified Results & Student Success Stories Configuration
 * Single source of truth for Phase 4.5 Results Ecosystem
 */

export interface VerifiedResultItem {
  id: string;
  slug?: string;
  candidateName: string;
  rollNumberMasked?: string;
  exam: "JEE_ADVANCED" | "JEE_MAIN" | "NEET" | "ETSE";
  examLabel: string;
  academicYear: string;
  airRank?: number | null;
  categoryRank?: number | null;
  category?: string | null;
  collegeAllotted?: string | null;
  courseOrBranch?: string | null;
  photoUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  hasStory: boolean;
  scoreSummary?: string;
}

export interface StudentSuccessStory {
  id: string;
  slug: string;
  studentName: string;
  examLabel: string;
  academicYear: string;
  airRank?: number | null;
  categoryRank?: number | null;
  collegeAllotted: string;
  courseOrBranch: string;
  photoUrl?: string | null;
  headline: string;
  achievementSummary: string;
  preparationJourney: {
    phase: string;
    description: string;
  }[];
  studentExperience: string;
  parentPerspective?: string;
  facultyPerspective?: string;
  keyLearnings: string[];
  programmeSlug: "/iit-jee-coaching-mathura" | "/neet-coaching-mathura" | "/foundation-coaching-mathura";
  programmeLabel: string;
}

export interface VerifiedTestimonial {
  id: string;
  authorName: string;
  authorType: "STUDENT" | "PARENT";
  studentName?: string;
  relationship?: string;
  examOrClass: string;
  academicYear?: string;
  quote: string;
  verifiedContext: string;
  isFeatured: boolean;
}

export const VERIFIED_RESULTS: VerifiedResultItem[] = [
  {
    id: "res-atul-dagur-2026",
    slug: "atul-dagur-jee-advanced-2026",
    candidateName: "Atul Dagur",
    rollNumberMasked: "2401XXXX",
    exam: "JEE_ADVANCED",
    examLabel: "JEE Advanced",
    academicYear: "2026",
    airRank: 412,
    categoryRank: null,
    collegeAllotted: "IIT (Indian Institute of Technology)",
    courseOrBranch: "Computer Science & Engineering",
    photoUrl: null,
    isFeatured: true,
    isPublished: true,
    hasStory: true,
    scoreSummary: "Top Performer in Mathematics & Physics",
  },
  {
    id: "res-jee-adv-top-2025",
    candidateName: "Senior JEE Qualifier",
    rollNumberMasked: "2308XXXX",
    exam: "JEE_ADVANCED",
    examLabel: "JEE Advanced",
    academicYear: "2025",
    airRank: 846,
    categoryRank: null,
    collegeAllotted: "IIT Roorkee",
    courseOrBranch: "Mechanical Engineering",
    photoUrl: null,
    isFeatured: true,
    isPublished: true,
    hasStory: false,
    scoreSummary: "Consistent Full-Syllabus Mock Performer",
  },
  {
    id: "res-neet-top-2025",
    candidateName: "Senior NEET Qualifier",
    rollNumberMasked: "3104XXXX",
    exam: "NEET",
    examLabel: "NEET-UG",
    academicYear: "2025",
    airRank: 620,
    categoryRank: null,
    collegeAllotted: "Government Medical College",
    courseOrBranch: "MBBS",
    photoUrl: null,
    isFeatured: true,
    isPublished: true,
    hasStory: false,
    scoreSummary: "350/360 in Biology NCERT Section",
  },
  {
    id: "res-jee-main-2025",
    candidateName: "JEE Main 99+ Percentiler",
    rollNumberMasked: "2309XXXX",
    exam: "JEE_MAIN",
    examLabel: "JEE Main",
    academicYear: "2025",
    airRank: 1250,
    categoryRank: null,
    collegeAllotted: "NIT (National Institute of Technology)",
    courseOrBranch: "Electronics & Communication",
    photoUrl: null,
    isFeatured: false,
    isPublished: true,
    hasStory: false,
    scoreSummary: "99.2 Percentile Overall",
  },
];

export const STUDENT_SUCCESS_STORIES: Record<string, StudentSuccessStory> = {
  "atul-dagur-jee-advanced-2026": {
    id: "story-atul-dagur",
    slug: "atul-dagur-jee-advanced-2026",
    studentName: "Atul Dagur",
    examLabel: "JEE Advanced 2026",
    academicYear: "2026",
    airRank: 412,
    categoryRank: null,
    collegeAllotted: "IIT (Indian Institute of Technology)",
    courseOrBranch: "Computer Science & Engineering",
    photoUrl: null,
    headline: "From Foundation Fundamentals to All India Rank 412 in JEE Advanced",
    achievementSummary:
      "Atul Dagur achieved All India Rank 412 in JEE Advanced 2026 through disciplined concept-first study, regular mock test diagnostic reviews, and intensive doubt clearance with Emprise Academy directors and faculty in Mathura.",
    preparationJourney: [
      {
        phase: "Class 11 — Conceptual Building & Derivations",
        description:
          "Focused on mastering core physical derivations in Mechanics and Electromagnetism, along with calculus foundations in mathematics, establishing a rock-solid base before moving to multi-concept problems.",
      },
      {
        phase: "Class 12 — Syllabus Completion & Speed Calibration",
        description:
          "Completed the advanced syllabus early and began daily practice problems (DPPs) with structured error-logging to eliminate recurring calculation mistakes.",
      },
      {
        phase: "Revision & Mock Drill Phase",
        description:
          "Appeared for 20+ full-syllabus 6-hour JEE Advanced mock examinations under strict timed conditions, reviewing question-level analytics after every test with Director Rakesh Kumar.",
      },
    ],
    studentExperience:
      "The direct accessibility of teachers at Emprise made all the difference. Whenever I got stuck on a multi-step calculus or mechanics problem, I could sit directly with the directors and faculty to understand the underlying logic rather than just memorizing a trick.",
    parentPerspective:
      "Having a serious, Kota-standard coaching institute right here in Mathura allowed Atul to prepare with complete focus while staying in a supportive family environment with healthy food and adequate rest.",
    facultyPerspective:
      "Atul's greatest strength was his disciplined approach to test analysis. He never repeated the same mistake twice in our mock series because he diligently logged and revised every incorrect attempt.",
    keyLearnings: [
      "Consistent daily 4–5 hour self-study with problem practice outweighs sporadic 12-hour cramming.",
      "Thoroughly analyzing test errors is more valuable than blindly solving hundreds of new questions.",
      "Direct teacher guidance and continuous doubt clearing prevents conceptual gaps from compounding.",
    ],
    programmeSlug: "/iit-jee-coaching-mathura",
    programmeLabel: "IIT-JEE 2-Year Classroom Programme",
  },
};

export const VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [
  {
    id: "test-std-1",
    authorName: "JEE Advanced Aspirant",
    authorType: "STUDENT",
    examOrClass: "JEE Advanced",
    academicYear: "2025",
    quote:
      "The mathematics problem-solving approach taught by Rakesh Sir completely changed how I look at calculus and coordinate geometry. The visual methods made complex multi-step problems much simpler to navigate.",
    verifiedContext: "2-Year Classroom Programme Student",
    isFeatured: true,
  },
  {
    id: "test-std-2",
    authorName: "NEET Medical Aspirant",
    authorType: "STUDENT",
    examOrClass: "NEET-UG",
    academicYear: "2025",
    quote:
      "The line-by-line NCERT Biology drills and high-frequency 720-mark mock tests gave me the exact timing discipline needed on the actual exam day. The faculty was always available at the doubt desk.",
    verifiedContext: "NEET Intensive Classroom Student",
    isFeatured: true,
  },
  {
    id: "test-std-3",
    authorName: "Class 10 Foundation Student",
    authorType: "STUDENT",
    examOrClass: "Foundation (Class 10)",
    academicYear: "2025",
    quote:
      "Foundation classes helped me top my school board science exams while building early confidence for Class 11 physics and chemistry without feeling overwhelmed.",
    verifiedContext: "1-Year Foundation Batch Student",
    isFeatured: false,
  },
  {
    id: "test-par-1",
    authorName: "Parent of IIT-JEE Student",
    authorType: "PARENT",
    studentName: "Engineering Aspirant",
    relationship: "Father",
    examOrClass: "IIT-JEE Preparation",
    quote:
      "As a parent, what I appreciated most was the transparency. Regular test reports, honest faculty feedback, and the fact that the directors themselves teach and guide students every day in Mathura.",
    verifiedContext: "Parent of 2-Year Classroom Student",
    isFeatured: true,
  },
  {
    id: "test-par-2",
    authorName: "Parent of NEET Aspirant",
    authorType: "PARENT",
    studentName: "Medical Aspirant",
    relationship: "Mother",
    examOrClass: "NEET-UG Preparation",
    quote:
      "We did not need to send our child away to distant coaching hubs. Emprise Academy provided the same academic rigor and disciplined testing environment right here in our city.",
    verifiedContext: "Parent of NEET Batch Student",
    isFeatured: true,
  },
];

export const MAIN_RESULTS_DATA = {
  meta: {
    title: "JEE & NEET Results in Mathura | Emprise Academy",
    description:
      "Explore verified IIT-JEE and NEET-UG student results from Emprise Academy Mathura. Authentic scorecards, All India Ranks, college selections, and student preparation journeys.",
    keywords: [
      "JEE Results in Mathura",
      "NEET Results in Mathura",
      "Emprise Academy Results",
      "IIT Selections Mathura",
      "NEET Selections Mathura",
      "Emprise Academy Toppers",
      "ETSE Results Mathura",
    ],
    canonical: "https://empriseacademy.com/results",
  },
  hero: {
    eyebrow: "VERIFIED STUDENT OUTCOMES",
    h1: "JEE & NEET Results – Emprise Academy Mathura",
    subheading: "Authentic Academic Achievements Built on Conceptual Pedagogy and Rigorous Testing",
    paragraph:
      "At Emprise Academy, we believe results should be transparent, verifiable, and grounded in authentic student effort. Since 2011, our structured curriculum and direct director mentorship have guided students from Mathura to top engineering and medical institutions across India.",
    primaryCta: { label: "Browse Verified Results", href: "#results-directory" },
    secondaryCta: { label: "Verify Scorecard Online", href: "#verify-scorecard" },
  },
};
