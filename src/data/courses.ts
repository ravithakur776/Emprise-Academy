/**
 * Official Authoritative Course & Programme Data for Emprise Academy
 * Single source of truth for Phase 5.4 Course & Programme Integration
 */

export type CanonicalProgrammeId = "JEE" | "NEET" | "FOUNDATION";

export interface CourseAcademicFocus {
  title: string;
  desc: string;
}

export interface CanonicalCourseItem {
  id: string;
  slug: string;
  name: string;
  programmeId: CanonicalProgrammeId;
  programmeName: string;
  targetClass: string;
  targetExam: string;
  shortDescription: string;
  subjects: string[];
  academicFocus: string[];
  methodologySummary: string;
  publicUrl: string;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  // Strictly null unless verified from official CMS
  fee: string | null;
  batchTimings: string | null;
  batchSize: number | null;
  startDate: string | null;
}

export interface CoreProgramPillar {
  id: string;
  programmeId: CanonicalProgrammeId;
  title: string;
  badge: string;
  targetClasses: string;
  targetExams: string;
  description: string;
  subjects: string[];
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: "navy" | "orange" | "gold";
}

export const CANONICAL_COURSES: CanonicalCourseItem[] = [
  // ==========================================
  // IIT-JEE PROGRAMMES
  // ==========================================
  {
    id: "jee-class-11",
    slug: "iit-jee-coaching-mathura/class-11",
    name: "JEE Class 11",
    programmeId: "JEE",
    programmeName: "IIT-JEE",
    targetClass: "Class 11",
    targetExam: "JEE Main & Advanced",
    shortDescription: "Build a strong conceptual base and problem-solving framework for JEE Main and Advanced.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    academicFocus: [
      "Concept Building",
      "Problem Solving",
      "Regular Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Derivations from first principles, step-by-step problem modeling, and diagnostic chapter-wise testing.",
    publicUrl: "/iit-jee-coaching-mathura/class-11",
    displayOrder: 1,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "jee-class-12",
    slug: "iit-jee-coaching-mathura/class-12",
    name: "JEE Class 12",
    programmeId: "JEE",
    programmeName: "IIT-JEE",
    targetClass: "Class 12",
    targetExam: "JEE Main & Advanced",
    shortDescription: "Advanced multi-concept problem synthesis with comprehensive Class 12 board and competitive exam synergy.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    academicFocus: [
      "Concept Building",
      "Problem Solving",
      "Regular Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Multi-chapter synthesis, timed examination drills, and systematic Class 11 revision integration.",
    publicUrl: "/iit-jee-coaching-mathura/class-12",
    displayOrder: 2,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "jee-dropper",
    slug: "iit-jee-coaching-mathura/dropper",
    name: "JEE Dropper",
    programmeId: "JEE",
    programmeName: "IIT-JEE",
    targetClass: "Dropper / 12th Passed",
    targetExam: "JEE Main & Advanced",
    shortDescription: "Intensive rank-improvement program focusing on high-yield question solving and error rectification.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    academicFocus: [
      "Concept Building",
      "Problem Solving",
      "Regular Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Fast-paced concept re-anchoring, high-frequency full-syllabus mock testing, and targeted weak-area correction.",
    publicUrl: "/iit-jee-coaching-mathura/dropper",
    displayOrder: 3,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },

  // ==========================================
  // NEET-UG PROGRAMMES
  // ==========================================
  {
    id: "neet-class-11",
    slug: "neet-coaching-mathura/class-11",
    name: "NEET Class 11",
    programmeId: "NEET",
    programmeName: "NEET-UG",
    targetClass: "Class 11",
    targetExam: "NEET-UG",
    shortDescription: "In-depth NCERT-centric medical foundation in Physics, Chemistry, Botany, and Zoology.",
    subjects: ["Physics", "Chemistry", "Biology"],
    academicFocus: [
      "Concept Clarity",
      "NCERT-oriented preparation",
      "Question Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Line-by-line NCERT Biology mastery, numerical physics problem modeling, and chemical reaction clarity.",
    publicUrl: "/neet-coaching-mathura/class-11",
    displayOrder: 4,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "neet-class-12",
    slug: "neet-coaching-mathura/class-12",
    name: "NEET Class 12",
    programmeId: "NEET",
    programmeName: "NEET-UG",
    targetClass: "Class 12",
    targetExam: "NEET-UG",
    shortDescription: "Complete Class 12 medical syllabus preparation with 720-mark speed-accuracy simulations.",
    subjects: ["Physics", "Chemistry", "Biology"],
    academicFocus: [
      "Concept Clarity",
      "NCERT-oriented preparation",
      "Question Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Full-length mock exam conditioning, NCERT diagrammatic drills, and negative-marking reduction strategies.",
    publicUrl: "/neet-coaching-mathura/class-12",
    displayOrder: 5,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "neet-dropper",
    slug: "neet-coaching-mathura/dropper",
    name: "NEET Dropper",
    programmeId: "NEET",
    programmeName: "NEET-UG",
    targetClass: "Dropper / 12th Passed",
    targetExam: "NEET-UG",
    shortDescription: "Dedicated repeater batch engineered for score optimization and comprehensive question mastery.",
    subjects: ["Physics", "Chemistry", "Biology"],
    academicFocus: [
      "Concept Clarity",
      "NCERT-oriented preparation",
      "Question Practice",
      "Testing",
      "Performance Analysis",
      "Revision",
      "Mentorship",
    ],
    methodologySummary: "Daily diagnostic drills, high-volume NCERT question practice, and personalized score tracking.",
    publicUrl: "/neet-coaching-mathura/dropper",
    displayOrder: 6,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },

  // ==========================================
  // FOUNDATION PROGRAMMES
  // ==========================================
  {
    id: "foundation-class-8",
    slug: "foundation-coaching-mathura/class-8",
    name: "Foundation Class 8",
    programmeId: "FOUNDATION",
    programmeName: "Foundation",
    targetClass: "Class 8",
    targetExam: "School Boards & Olympiads",
    shortDescription: "Early aptitude development building scientific curiosity, number theory intuition, and study discipline.",
    subjects: ["Mathematics", "Science"],
    academicFocus: [
      "Strong Fundamentals",
      "Concept Clarity",
      "Logical Thinking",
      "Analytical Ability",
      "Problem Solving",
      "Study Discipline",
    ],
    methodologySummary: "Interactive concept discovery, fundamental derivation practice, and pressure-free logical puzzles.",
    publicUrl: "/foundation-coaching-mathura/class-8",
    displayOrder: 7,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "foundation-class-9",
    slug: "foundation-coaching-mathura/class-9",
    name: "Foundation Class 9",
    programmeId: "FOUNDATION",
    programmeName: "Foundation",
    targetClass: "Class 9",
    targetExam: "School Boards & Olympiads",
    shortDescription: "Structured conceptual bridging across Physics, Chemistry, Biology, and Advanced Mathematics.",
    subjects: ["Mathematics", "Science"],
    academicFocus: [
      "Strong Fundamentals",
      "Concept Clarity",
      "Logical Thinking",
      "Analytical Ability",
      "Problem Solving",
      "Study Discipline",
    ],
    methodologySummary: "Systematic scientific modeling, multi-step algebraic fluency, and regular chapter assessments.",
    publicUrl: "/foundation-coaching-mathura/class-9",
    displayOrder: 8,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
  {
    id: "foundation-class-10",
    slug: "foundation-coaching-mathura/class-10",
    name: "Foundation Class 10",
    programmeId: "FOUNDATION",
    programmeName: "Foundation",
    targetClass: "Class 10",
    targetExam: "Board Examinations & NTSE / Olympiads",
    shortDescription: "Balanced academic training ensuring board exam excellence alongside analytical readiness for Class 11.",
    subjects: ["Mathematics", "Science"],
    academicFocus: [
      "Strong Fundamentals",
      "Concept Clarity",
      "Logical Thinking",
      "Analytical Ability",
      "Problem Solving",
      "Study Discipline",
    ],
    methodologySummary: "Board question presentation mastery paired with higher-order thinking skills (HOTS) and diagnostic feedback.",
    publicUrl: "/foundation-coaching-mathura/class-10",
    displayOrder: 9,
    isPublished: true,
    isFeatured: true,
    fee: null,
    batchTimings: null,
    batchSize: null,
    startDate: null,
  },
];

export const CORE_PROGRAMME_PILLARS: CoreProgramPillar[] = [
  {
    id: "iit-jee",
    programmeId: "JEE",
    title: "IIT-JEE Program",
    badge: "ENGINEERING",
    targetClasses: "Classes 11, 12 & Droppers",
    targetExams: "JEE Main & JEE Advanced",
    description:
      "Concept-first classroom coaching with multi-concept problem solving, diagnostic test series, and personalized mentor accessibility in Mathura.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    features: [
      "Concept derivations from first principles",
      "Regular testing & diagnostic performance feedback",
      "Dedicated doubt resolution with senior mentors",
      "Specialized Class 11, Class 12 & Dropper batches",
    ],
    ctaLabel: "Explore JEE Program",
    ctaHref: "/iit-jee-coaching-mathura",
    accentColor: "navy",
  },
  {
    id: "neet-ug",
    programmeId: "NEET",
    title: "NEET-UG Program",
    badge: "MEDICAL",
    targetClasses: "Classes 11, 12 & Droppers",
    targetExams: "NEET-UG (Medical Entrance)",
    description:
      "Rigorous NCERT-centric medical entrance preparation with line-by-line concept mastery, numerical problem practice, and timed full-length simulations.",
    subjects: ["Physics", "Chemistry", "Biology"],
    features: [
      "Exhaustive line-by-line NCERT Biology drills",
      "High-yield Physics and Chemistry numerical workshops",
      "720-mark simulated mock tests with error analysis",
      "Structured Class 11, Class 12 & Dropper pathways",
    ],
    ctaLabel: "Explore NEET Program",
    ctaHref: "/neet-coaching-mathura",
    accentColor: "orange",
  },
  {
    id: "foundation",
    programmeId: "FOUNDATION",
    title: "Foundation Program",
    badge: "FOUNDATION",
    targetClasses: "Classes 8, 9 & 10",
    targetExams: "School Boards & Olympiads",
    description:
      "Aptitude and scientific thinking program designed to build strong academic fundamentals and analytical problem-solving in a supportive environment.",
    subjects: ["Mathematics", "Science"],
    features: [
      "Emphasis on fundamental understanding & curiosity",
      "Logical deduction and mathematical reasoning",
      "Balanced school board support with Olympiad exposure",
      "Smooth academic transition into Class 11 competitive streams",
    ],
    ctaLabel: "Explore Foundation",
    ctaHref: "/foundation-coaching-mathura",
    accentColor: "gold",
  },
];

// Helper Functions
export const getCanonicalCourses = (): CanonicalCourseItem[] => {
  return CANONICAL_COURSES.filter((c) => c.isPublished).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
};

export const getCoursesByProgramme = (
  programmeId: CanonicalProgrammeId
): CanonicalCourseItem[] => {
  return CANONICAL_COURSES.filter(
    (c) => c.programmeId === programmeId && c.isPublished
  ).sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getCourseBySlug = (slug: string): CanonicalCourseItem | undefined => {
  return CANONICAL_COURSES.find((c) => c.slug === slug || c.id === slug);
};

export const getCoreProgramPillars = (): CoreProgramPillar[] => {
  return CORE_PROGRAMME_PILLARS;
};
