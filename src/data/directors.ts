/**
 * Official Authoritative Directors Data for Emprise Academy
 * Single Source of Truth for Phase 5.3 Directors & Academic Leadership
 */

import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface ProfessionalStep {
  companyOrContext: string;
  roleSummary: string;
  description: string;
}

export interface AcademicDomain {
  area: string;
  description: string;
}

export interface DirectorFullProfile {
  id: string;
  slug: string;
  name: string;
  designation: string;
  qualification: string;
  institution: string;
  almaMater: string;
  photoUrl: string | null;
  quote: string;
  shortBio: string;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  professionalJourney: ProfessionalStep[];
  academicDomains: AcademicDomain[];
  teachingPhilosophy: string[];
  leadershipPerspective: string;
  visionForStudents: string;
  contributionToEmprise: string[];
  programmesGuided: string[];
}

export const DIRECTORS_DATA: {
  sushilDagur: DirectorFullProfile;
  rakeshKumar: DirectorFullProfile;
} = {
  sushilDagur: {
    id: "dir-sushil-dagur",
    slug: "sushil-dagur",
    name: "Sushil Dagur",
    designation: "Director | Educationist | Academic Entrepreneur",
    qualification: "B.E. (Hons.) Mechanical Engineering",
    institution: "University of Derby, England, U.K.",
    almaMater: "University of Derby, England, U.K.",
    photoUrl: "/images/directors/sushil-dagur.jpg",
    quote:
      "True education is not about memorising formulas; it is about building the intellectual endurance to think independently, analyze critically, and solve real challenges.",
    shortBio:
      "Co-founder and Director of Emprise Academy. Engineering graduate from the University of Derby (UK) with project engineering experience at Ford Group UK and extensive competitive coaching mentorship.",
    displayOrder: 1,
    isFeatured: true,
    isPublished: true,
    professionalJourney: [
      {
        companyOrContext: "University of Derby, England, U.K.",
        roleSummary: "B.E. (Hons.) Mechanical Engineering Graduate",
        description:
          "Completed rigorous engineering honours education with a focus on mechanical systems, analytical problem modeling, and structured engineering design.",
      },
      {
        companyOrContext: "Ford Group, UK",
        roleSummary: "Project Engineering & Industrial Experience",
        description:
          "Gained industrial and project engineering experience with the Ford Group in the United Kingdom, applying disciplined problem-solving methodologies and precision engineering workflows.",
      },
      {
        companyOrContext: "Premier Coaching Ecosystems (Kota)",
        roleSummary: "Academic Mentorship & Institutional Teaching",
        description:
          "Brought classroom teaching and academic management experience from premier competitive coaching institutes in Kota, guiding students in concept-first competitive methodologies.",
      },
      {
        companyOrContext: "Emprise Academy (Est. 2011)",
        roleSummary: "Founding Director & Academic Entrepreneur",
        description:
          "Co-founded Emprise Academy in Mathura to establish a structured, transparent, and student-first competitive coaching institution with national-standard academic rigor.",
      },
    ],
    academicDomains: [
      {
        area: "Academic Direction & Curriculum Strategy",
        description:
          "Designs the pedagogical framework, syllabus pacing schedules, and diagnostic testing systems across IIT-JEE, NEET-UG, and Foundation programmes.",
      },
      {
        area: "Author & Academic Publications",
        description:
          "Author of academic study materials, concept sheets, and competitive entrance publications focusing on structured fundamental problem solving.",
      },
      {
        area: "Mentorship & Academic Leadership",
        description:
          "Provides individual strategic guidance to students navigating the psychological demands of high-stakes competitive examinations.",
      },
    ],
    teachingPhilosophy: [
      "Education must prioritize fundamental understanding over rote formula memorization.",
      "Every complex engineering or scientific problem can be solved by breaking it down into first principles.",
      "Academic consistency and disciplined daily practice outweigh sporadic bursts of intense cramming.",
      "A supportive, pressure-free environment brings out the highest intellectual potential in students.",
    ],
    leadershipPerspective:
      "At Emprise Academy, we believe Mathura's students possess tremendous intellectual potential. Our role is to provide them with the same world-class pedagogical systems, disciplined testing routines, and transparent mentorship that top national coaching hubs offer, right here in their hometown.",
    visionForStudents:
      "To empower students not only to secure top ranks in IIT-JEE and NEET, but also to build the foundational analytical discipline, resilience, and curiosity required to become pioneering engineers, doctors, and leaders of tomorrow.",
    contributionToEmprise: [
      "Established the core concept-first pedagogical philosophy of Emprise Academy in 2011.",
      "Spearheaded the design of Emprise Talent Search Examination (ETSE) to discover and reward meritorious talent across Western UP.",
      "Created transparent academic reporting and diagnostic test analysis protocols for parents and students.",
      "Continuous faculty mentoring and pedagogical quality assurance across all academic departments.",
    ],
    programmesGuided: [
      "IIT-JEE (Main & Advanced) Academic Strategy",
      "NEET-UG Foundation & Biology Rigor",
      "Foundation (Classes 8–10) Scientific Inquiry",
      "ETSE 2026 Scholarship Mentorship",
    ],
  },
  rakeshKumar: {
    id: "dir-rakesh-kumar",
    slug: "rakesh-kumar",
    name: "Rakesh Kumar",
    designation: "Director | Mathematics Mentor | IIT-JEE Faculty",
    qualification: "B.E. (Hons.) Mechanical Engineering",
    institution: "University of Derby, England, U.K.",
    almaMater: "University of Derby, England, U.K.",
    photoUrl: "/images/directors/rakesh-kumar.jpg",
    quote:
      "Mathematics is not a subject of rules; it is the art of logical deduction. When a student learns to visualize a problem geometrically and algebraically, fear turns into confidence.",
    shortBio:
      "Co-founder, Director and Head of Mathematics at Emprise Academy. Engineering graduate from the University of Derby (UK) with precision engineering background at Rolls-Royce Limited.",
    displayOrder: 2,
    isFeatured: true,
    isPublished: true,
    professionalJourney: [
      {
        companyOrContext: "University of Derby, England, U.K.",
        roleSummary: "B.E. (Hons.) Mechanical Engineering Graduate",
        description:
          "Completed honours engineering education in mechanical systems, mathematical modeling, calculus, and computational analytical techniques.",
      },
      {
        companyOrContext: "Rolls-Royce Limited",
        roleSummary: "Project Engineering & Mechanical Design",
        description:
          "Worked on engineering design, project management, and high-precision technical systems at Rolls-Royce Limited, honing an uncompromising standard for accuracy and analytical discipline.",
      },
      {
        companyOrContext: "IIT-JEE Mathematics Faculty",
        roleSummary: "Senior Advanced Mathematics Mentor",
        description:
          "Extensive experience teaching advanced Mathematics for IIT-JEE Main and Advanced, mentoring hundreds of students into premier engineering institutions.",
      },
      {
        companyOrContext: "Emprise Academy (Est. 2011)",
        roleSummary: "Director & Lead Mathematics Faculty",
        description:
          "Co-founded Emprise Academy, personally heading the Mathematics department and shaping the institute's problem-solving and testing methodologies.",
      },
    ],
    academicDomains: [
      {
        area: "IIT-JEE Advanced Mathematics Pedagogy",
        description:
          "Specializes in multi-concept synthesis across Differential & Integral Calculus, Coordinate Geometry, Complex Numbers, and Vectors & 3D.",
      },
      {
        area: "Analytical Problem Modeling",
        description:
          "Trains students to approach unfamiliar JEE Advanced questions through multiple solution paths: algebraic proofs, geometric visualization, and boundary value checks.",
      },
      {
        area: "Foundation Mathematical Logic",
        description:
          "Guides middle-school Foundation students in developing strong number theory intuition, algebraic fluency, and Euclidean geometric deduction.",
      },
    ],
    teachingPhilosophy: [
      "Mathematics should be visualized before algebraic equations are written.",
      "Mastering fundamental derivations gives students the versatility to tackle any unexpected question format.",
      "Solving 10 challenging multi-step problems with full conceptual understanding is more valuable than solving 100 repetitive formulas.",
      "Accuracy and speed in mathematics come naturally when foundational steps are solid and systematic.",
    ],
    leadershipPerspective:
      "Precision is the common thread between aerospace engineering and IIT-JEE Advanced Mathematics. At Emprise, we cultivate that exact precision in our students through structured proofs, rigorous doubt clearing, and timed testing.",
    visionForStudents:
      "To build fearless mathematical thinkers who approach complex problems with structured logic, creative curiosity, and the endurance to excel at the highest national competitive levels.",
    contributionToEmprise: [
      "Developed the comprehensive IIT-JEE Mathematics curriculum and graded problem-solving sheets at Emprise Academy.",
      "Mentored students from Mathura to top ranks in JEE Main, JEE Advanced, and Mathematics Olympiads since 2011.",
      "Formulated the 'Measure. Analyse. Improve.' testing and question-level diagnostic review framework.",
      "Direct one-on-one doubt resolution desks and personalized academic roadmap sessions for JEE aspirants.",
    ],
    programmesGuided: [
      "IIT-JEE Advanced Mathematics (Classes 11, 12 & Droppers)",
      "JEE Main Speed & Accuracy Workshops",
      "Foundation Mathematics & Olympiad Reasoning (Classes 8–10)",
    ],
  },
};

export const getCanonicalDirectorsList = (): DirectorFullProfile[] => {
  return [DIRECTORS_DATA.sushilDagur, DIRECTORS_DATA.rakeshKumar].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
};

export const getDirectorBySlug = (slug: string): DirectorFullProfile | undefined => {
  if (slug === "sushil-dagur") return DIRECTORS_DATA.sushilDagur;
  if (slug === "rakesh-kumar") return DIRECTORS_DATA.rakeshKumar;
  return undefined;
};

export const MAIN_DIRECTORS_DATA = {
  meta: {
    title: "Directors of Emprise Academy | Academic Leadership in Mathura",
    description:
      "Meet the Directors of Emprise Academy Mathura: Sushil Dagur and Rakesh Kumar (University of Derby UK engineering graduates with Ford UK & Rolls-Royce background). Structured concept-based leadership established 2011.",
    keywords: [
      "Directors of Emprise Academy",
      "Sushil Dagur Emprise Academy",
      "Rakesh Kumar Emprise Academy",
      "Academic Leadership Mathura",
      "Emprise Academy Founders",
      "IIT JEE Faculty Mathura",
    ],
    canonical: "https://www.empriseacademy.com/directors",
  },
  hero: {
    eyebrow: "ACADEMIC LEADERSHIP",
    h1: "Leadership Behind Emprise Academy",
    subheading: "Experienced Engineering & Academic Direction Shaped in the U.K. and Kota",
    paragraph:
      "Emprise Academy was founded in 2011 by University of Derby (UK) engineering alumni Sushil Dagur and Rakesh Kumar. Combining international industrial engineering experience at Ford UK and Rolls-Royce Limited with extensive competitive teaching backgrounds, they bring structured pedagogy, academic discipline, and student-first mentorship to Mathura.",
    primaryCta: { label: "Explore Our Academic Approach", href: "#leadership-synergy" },
    secondaryCta: { label: "Explore Programmes", href: "/courses" },
  },
  leadershipSynergy: {
    heading: "Industrial Engineering Precision Meets Classroom Pedagogy",
    subheading:
      "Our directors bring a unique blend of international engineering discipline and extensive Indian competitive coaching experience to the classroom.",
    pillars: [
      {
        title: "International Engineering Standards",
        desc: "Both directors hold B.E. (Hons.) Mechanical Engineering degrees from the University of Derby, England, bringing global analytical rigor to curriculum design.",
      },
      {
        title: "Industrial Project Experience",
        desc: "Professional tenures with engineering giants Ford Group UK and Rolls-Royce Limited ingrained an uncompromising culture of precision and structured execution.",
      },
      {
        title: "Competitive Teaching Experience",
        desc: "Extensive teaching in leading coaching hubs (including Kota) translates complex competitive syllabi into accessible, student-friendly learning modules.",
      },
      {
        title: "15+ Years Mathura Commitment",
        desc: "Established in 2011, Emprise Academy represents a permanent, dedicated commitment to elevating the educational opportunities for students in Mathura.",
      },
    ],
  },
  coreValues: [
    {
      title: "Concept-First Learning",
      desc: "Derivations from first principles rather than mechanical formula memorization.",
    },
    {
      title: "Diagnostic Testing Rigor",
      desc: "Continuous performance measurement and error analysis to eliminate recurring mistakes.",
    },
    {
      title: "Accessible Faculty Mentorship",
      desc: "Directors and senior mentors remain directly accessible to students every single day for doubt clearance.",
    },
    {
      title: "Transparent Parent Communication",
      desc: "Regular, honest reporting on attendance, mock percentiles, and academic growth without false promises.",
    },
  ],
};
