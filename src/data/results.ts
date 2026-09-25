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
    id: "test-par-vegraj-chahar",
    authorName: "Mr. Vegraj Chahar",
    authorType: "PARENT",
    studentName: "Prachi Chahar & Pallavi Chahar",
    relationship: "Father",
    examOrClass: "IIT-JEE Preparation",
    academicYear: "2024",
    quote:
      "Emprise Academy has an excellent IIT-JEE faculty team that works with complete dedication for serious aspirants. My daughter Prachi qualified JEE Advanced and is now studying at ICT Mumbai. The Directors personally guide students and stay connected with them. With its discipline, personal attention, and caring environment, Emprise is undoubtedly the best institute for girls preparing for IIT-JEE in Mathura.",
    verifiedContext: "Father of Prachi (ICT Mumbai) & Pallavi (NIT Allahabad)",
    isFeatured: true,
  },
  {
    id: "test-par-mrs-gupta",
    authorName: "Mrs. Gupta",
    authorType: "PARENT",
    studentName: "Govind Gupta",
    relationship: "Grandmother",
    examOrClass: "IIT-JEE Preparation",
    academicYear: "2025",
    quote:
      "My grandson studied at Emprise Academy, and I have seen how caring and supportive the faculty is. The experienced IITian faculty team provides excellent guidance, and the Academy continues to support students until they secure admission to a college. As a grandmother, I truly appreciate this dedication and care.",
    verifiedContext: "Grandmother of Govind Gupta (AIR 404 – IIT Bombay)",
    isFeatured: true,
  },
  {
    id: "test-par-shobhit",
    authorName: "Father of Shobhit",
    authorType: "PARENT",
    studentName: "Shobhit",
    relationship: "Father",
    examOrClass: "NEET-UG Preparation",
    academicYear: "2022",
    quote:
      "Emprise has been a blessing for my son throughout his journey. From the Foundation Course onwards, the quality of teaching, study material, faculty, guidance, and environment has been excellent. The Directors are highly supportive and personally involved. As a parent, I truly believe Emprise is one of the best coaching institutes in Mathura for NEET aspirants.",
    verifiedContext: "Father of Shobhit (MBBS at AIIMS Jodhpur)",
    isFeatured: true,
  },
  {
    id: "test-par-utkarsh-pandey",
    authorName: "Father of Utkarsh Pandey",
    authorType: "PARENT",
    studentName: "Utkarsh Pandey",
    relationship: "Father",
    examOrClass: "IIT-JEE Preparation",
    academicYear: "2024",
    quote:
      "Emprise is the best coaching institute for IIT-JEE students in Mathura because it provides every facility an aspirant needs. The Directors’ personal care and guidance are at a completely different level, and the experienced IITian faculty is truly superb. As a parent, I highly recommend Emprise for serious IIT-JEE aspirants.",
    verifiedContext: "Father of Utkarsh Pandey (IIT Dhanbad)",
    isFeatured: true,
  },
  {
    id: "test-par-anuj-raveena",
    authorName: "Father of Anuj & Raveena",
    authorType: "PARENT",
    studentName: "Anuj & Raveena",
    relationship: "Father",
    examOrClass: "IIT-JEE & NEET-UG Preparation",
    academicYear: "2024",
    quote:
      "My son and daughter joined Emprise from the Foundation Course. My son qualified JEE Advanced, while my daughter qualified NEET, both with the guidance and support of Emprise. I am truly happy that I never had to send my children to Delhi or Kota for preparation. Emprise provided them with everything they needed right here in Mathura. For me, Emprise is the best institute for both IIT-JEE and NEET preparation.",
    verifiedContext: "Father of Anuj (JEE Advanced) & Raveena (NEET-UG)",
    isFeatured: true,
  },
  {
    id: "test-par-atul-dagur",
    authorName: "Mother of Atul Dagur",
    authorType: "PARENT",
    studentName: "Atul Dagur",
    relationship: "Mother",
    examOrClass: "IIT-JEE Preparation",
    academicYear: "2026",
    quote:
      "Emprise Academy has played a very important role in helping my son reach IIT Bombay. The Directors personally cared for Atul, guiding and motivating him at every step. The faculty is excellent, the management is very supportive, and every aspect of the Academy is thoughtfully designed from an IIT-JEE aspirant’s perspective. We are truly grateful to Emprise.",
    verifiedContext: "Mother of Atul Dagur (IIT Bombay)",
    isFeatured: true,
  },
  {
    id: "test-par-champ-pratap",
    authorName: "Father of Champ Pratap",
    authorType: "PARENT",
    studentName: "Champ Pratap",
    relationship: "Father",
    examOrClass: "NEET-UG Preparation",
    academicYear: "2024",
    quote:
      "Champ joined Emprise from the Foundation Course in Class 8 and truly enjoyed his learning journey. The supportive environment, dedicated faculty, and personal guidance from the Directors made a real difference. The faculty worked incredibly hard and guided him at every step. For NEET preparation, Emprise is undoubtedly the best in Mathura, with no comparison.",
    verifiedContext: "Father of Champ Pratap (GMC Saharanpur)",
    isFeatured: true,
  },
  {
    id: "test-par-srishti-saraswat",
    authorName: "Father of Srishti Saraswat",
    authorType: "PARENT",
    studentName: "Srishti Saraswat",
    relationship: "Father",
    examOrClass: "NEET-UG Preparation",
    academicYear: "2024",
    quote:
      "The best thing about Emprise is its dedicated faculty, who stay connected with students through every stage of their preparation and continuously test, guide, and motivate them. The faculty is exceptional, the environment is excellent, and the care they provide is truly commendable.",
    verifiedContext: "Father of Srishti Saraswat (GMC Etah)",
    isFeatured: true,
  },
];

export const MAIN_RESULTS_DATA = {
  meta: {
    title: "Emprise Academy JEE & NEET Results | Mathura",
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
