/**
 * Official Verified Faculty Configuration & Mentorship Storytelling for Emprise Academy
 * Single source of truth for Phase 4.4 Faculty Directory and Profiles
 */

export interface FacultyProfile {
  id: string;
  slug: string;
  name: string;
  designation: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | "Foundation";
  category: "JEE" | "NEET" | "FOUNDATION" | "ALL";
  qualification: string;
  experienceText: string;
  specialisation: string;
  photoUrl: string | null;
  bio: string;
  teachingApproach: string[];
  subjectExpertise: string[];
  academicSupport: string[];
  coursesTaught: string[];
  displayOrder: number;
  isFeatured: boolean;
}

export interface FacultySubjectStory {
  subject: string;
  iconName: string;
  tagline: string;
  description: string;
  pedagogicalFocus: string[];
}

export const FACULTY_DATA: FacultyProfile[] = [
  {
    id: "fac-rakesh-kumar",
    slug: "rakesh-kumar",
    name: "Rakesh Kumar",
    designation: "Director & Head of Mathematics",
    subject: "Mathematics",
    category: "JEE",
    qualification: "B.E. (Hons.) Mechanical Engineering, Univ. of Derby (UK)",
    experienceText: "Senior IIT-JEE Faculty",
    specialisation: "Calculus, Coordinate Geometry, Vectors & Advanced Algebra",
    photoUrl: null,
    bio: "Co-founder of Emprise Academy with industrial experience at Rolls-Royce Limited and extensive IIT-JEE advanced mathematics mentoring background.",
    teachingApproach: [
      "Visualizing mathematical functions geometrically before writing algebraic equations.",
      "Multi-step problem decomposition and proof-based concept derivations.",
      "Time-saving elimination techniques and boundary value analysis for JEE Main & Advanced.",
    ],
    subjectExpertise: [
      "Differential & Integral Calculus",
      "Coordinate Geometry & Conic Sections",
      "Complex Numbers, Matrices & Determinants",
      "Vectors & 3-Dimensional Geometry",
    ],
    academicSupport: [
      "One-on-one doubt resolution desks for advanced problem sets.",
      "Personalized test analysis and speed-accuracy calibration.",
      "Olympiad & talent search mathematics guidance.",
    ],
    coursesTaught: [
      "IIT-JEE (Main & Advanced) — Classes 11, 12 & Droppers",
      "Foundation Mathematics (Classes 9 & 10)",
    ],
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: "fac-sushil-dagur",
    slug: "sushil-dagur",
    name: "Sushil Dagur",
    designation: "Director & Head of Academic Direction",
    subject: "Physics",
    category: "ALL",
    qualification: "B.E. (Hons.) Mechanical Engineering, Univ. of Derby (UK)",
    experienceText: "Senior Academic Mentor & Author",
    specialisation: "Classical Mechanics, Engineering Principles & Pedagogy",
    photoUrl: null,
    bio: "Founding Director of Emprise Academy with industrial tenure at Ford Group UK and experience with leading coaching ecosystems in Kota.",
    teachingApproach: [
      "Deriving physical laws from first principles with real-world engineering analogies.",
      "Vector-based free body diagram analysis for variable-force systems.",
      "Disciplined error-logging to eliminate recurring calculation slips.",
    ],
    subjectExpertise: [
      "Newtonian Mechanics & Rotational Dynamics",
      "Thermodynamics & Kinetic Theory",
      "Curriculum Design & Diagnostic Testing Frameworks",
    ],
    academicSupport: [
      "Strategic academic counselling for competitive exam aspirants.",
      "Diagnostic test score reviews and personalized improvement plans.",
    ],
    coursesTaught: [
      "IIT-JEE & NEET Academic Mentorship",
      "Foundation Science Inquiry (Classes 8–10)",
    ],
    displayOrder: 2,
    isFeatured: true,
  },
];

export const FACULTY_SUBJECT_STORIES: FacultySubjectStory[] = [
  {
    subject: "Physics Mentorship",
    iconName: "Zap",
    tagline: "Demystifying Formulas Through Physical Visualization",
    description:
      "Our Physics mentors train students to visualize physical systems before applying mathematical formulas. By mastering free body diagrams, dimensional analysis, and calculus-driven derivations, students develop the analytical confidence required for both JEE Advanced multi-step problems and high-speed NEET numericals.",
    pedagogicalFocus: [
      "Concept derivations from first principles rather than formula memorization",
      "Step-by-step vector modeling and free body diagrams",
      "Extensive numerical drills calibrated for 45-second execution (NEET) and multi-concept synthesis (JEE)",
      "Daily doubt resolution to eliminate conceptual bottlenecks immediately",
    ],
  },
  {
    subject: "Chemistry Mentorship",
    iconName: "FlaskConical",
    tagline: "Mechanistic Organic, Rigorous Physical & NCERT Inorganic",
    description:
      "Chemistry is taught through three tailored methodologies: thermodynamic and kinetic numerical precision for Physical Chemistry, electron-pushing reaction mechanisms for Organic Chemistry, and line-by-line NCERT concept mapping for Inorganic Chemistry.",
    pedagogicalFocus: [
      "Reaction mechanism workflows and named reagent transformations",
      "Rigorous calculation discipline and unit consistency in Physical Chemistry",
      "Comprehensive NCERT periodic table and coordination compound charts",
      "Periodic active-recall quizzes to prevent factual memory decay",
    ],
  },
  {
    subject: "Mathematics Mentorship",
    iconName: "Compass",
    tagline: "Analytical Rigor, Algebraic Discipline & Multi-Step Logic",
    description:
      "Led by our Director Rakesh Kumar, Mathematics mentorship is focused on developing deep geometrical visualization and rigorous algebraic discipline. Students learn multiple approaches to solve unfamiliar problem formulations with speed and precision.",
    pedagogicalFocus: [
      "Graphical visualization of functions, limits, and areas under curves",
      "Proof-based Euclidean and coordinate geometry transformations",
      "Multi-concept problem synthesis linking algebra, trigonometry, and calculus",
      "Personalized mistake analysis to optimize question selection under timed test conditions",
    ],
  },
  {
    subject: "Biology Mentorship (Botany & Zoology)",
    iconName: "Dna",
    tagline: "Line-by-Line NCERT Mastery & Diagnostic Recall",
    description:
      "Biology accounts for 50% of the NEET score (360 marks). Our mentors guide students through line-by-line NCERT textual analysis, detailed diagram dissection, and heavy practice of assertion-reason and statement-based questions.",
    pedagogicalFocus: [
      "Complete line-by-line textual dissection of NCERT textbooks",
      "Visual diagram mapping, labeling drills, and flowchart memorization",
      "Extensive practice of assertion-reason and multi-statement MCQs",
      "High-frequency OMR mock drills replicating official NTA examination conditions",
    ],
  },
  {
    subject: "Foundation Mentorship (Classes 8–10)",
    iconName: "Lightbulb",
    tagline: "Cultivating Curiosity, Logic & Problem-Solving Habits",
    description:
      "Our Foundation mentors specialize in middle-school and secondary education, fostering intellectual curiosity and disciplined study routines without subjecting young students to premature competitive pressure.",
    pedagogicalFocus: [
      "Focusing on the 'why' and 'how' behind mathematical laws and scientific phenomena",
      "Gradual progression from textbook exercises to non-routine application problems",
      "Interactive mental ability puzzles and logical reasoning development",
      "Supportive, encouraging environment that builds long-term academic self-confidence",
    ],
  },
];

export const MAIN_FACULTY_DATA = {
  meta: {
    title: "JEE & NEET Faculty in Mathura | Emprise Academy",
    description:
      "Meet our experienced IIT-JEE, NEET-UG, and Foundation faculty mentors at Emprise Academy Mathura. Led by University of Derby UK engineering alumni with concept-based pedagogy.",
    keywords: [
      "JEE Faculty in Mathura",
      "NEET Faculty in Mathura",
      "Emprise Academy Faculty",
      "Maths Faculty Mathura",
      "Physics Faculty Mathura",
      "Chemistry Faculty Mathura",
      "Biology Faculty Mathura",
      "IIT JEE Mentors Mathura",
    ],
    canonical: "https://empriseacademy.com/faculty",
  },
  hero: {
    eyebrow: "ACADEMIC FACULTY & MENTORS",
    h1: "JEE & NEET Faculty at Emprise Academy",
    subheading: "Experienced Subject Specialists Committed to Concept Clarity & Student Growth",
    paragraph:
      "At Emprise Academy, our faculty team brings together experienced subject educators and engineering mentors who believe in teaching from first principles. Guided by University of Derby (UK) alumni, our mentors work directly with students daily—delivering structured lectures, solving doubts, and analyzing test performance.",
    primaryCta: { label: "Explore Mentorship Approach", href: "#mentorship-approach" },
    secondaryCta: { label: "View Subject Faculties", href: "#subject-faculties" },
  },
  mentorshipApproach: {
    heading: "What Good Mentorship Means at Emprise Academy",
    subheading:
      "We view teaching as an active partnership between the mentor and the student, built on four foundational pillars.",
    pillars: [
      {
        title: "Concept-First Classroom Teaching",
        desc: "Derivations and proofs explained with clarity so students understand the underlying scientific laws.",
      },
      {
        title: "Daily Accessible Doubt Support",
        desc: "Faculty members remain accessible every day at dedicated doubt counters to clear student queries.",
      },
      {
        title: "Diagnostic Performance Reviews",
        desc: "Mentors review individual test scorecards to identify recurring conceptual and calculation mistakes.",
      },
      {
        title: "Balanced, Supportive Guidance",
        desc: "Empowering students with steady discipline, emotional resilience, and constructive feedback.",
      },
    ],
  },
};
