/**
 * Verified Brand & Academic Constants for Emprise Academy
 * NOTE: DO NOT invent fake data. Fields marked with `pending_configuration` must be set via CMS/Admin.
 */

export interface AcademicPillar {
  id: string;
  name: string;
  targetClasses: string[];
  targetExams: string[];
  description: string;
}

export const VERIFIED_BRAND_DATA = {
  institutionName: "Emprise Academy",
  headquarters: "Mathura, Uttar Pradesh",
  yearEstablished: 2011,
  primaryPillars: [
    {
      id: "jee",
      name: "IIT-JEE (Main + Advanced)",
      targetClasses: ["Class 11", "Class 12", "12th Pass / Dropper"],
      targetExams: ["JEE Main", "JEE Advanced"],
      description: "Comprehensive coaching focused on concept clarity, multi-step problem solving, and intensive test series.",
    },
    {
      id: "neet",
      name: "NEET-UG (Medical Entrance)",
      targetClasses: ["Class 11", "Class 12", "12th Pass / Dropper"],
      targetExams: ["NEET-UG"],
      description: "Rigorous biology, physics & chemistry coaching emphasizing NCERT deep-dives and timed accuracy testing.",
    },
    {
      id: "foundation",
      name: "Foundation (Pre-Foundation)",
      targetClasses: ["Class 8", "Class 9", "Class 10"],
      targetExams: ["NTSE", "Olympiads", "School Boards", "Early JEE/NEET Prep"],
      description: "Strengthening analytical thinking, scientific curiosity, and mathematics fundamentals at an early stage.",
    },
  ] as AcademicPillar[],
  etse: {
    name: "Emprise Talent Search Examination",
    shortName: "ETSE 2026",
    eligibleClasses: ["Class 7", "Class 8", "Class 9", "Class 10", "Class 11"],
    scholarshipUpTo: "100%", // Pending exact scholarship matrix configuration
    examMode: "Offline (Pen & Paper)",
  },
  roles: {
    SUPER_ADMIN: "Super Administrator",
    DIRECTOR: "Director / Academic Head",
    ADMISSION_ADMIN: "Admissions Administrator",
    COUNSELLOR: "Academic Counsellor",
    EXAM_ADMIN: "Examination Administrator",
    CONTENT_MANAGER: "Content & CMS Manager",
    FACULTY: "Faculty Member",
    STUDENT: "Student",
  } as const,
} as const;
