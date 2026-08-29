/**
 * Verified Brand & Academic Constants for Emprise Academy
 * Single source of truth referencing canonical business configuration.
 */

import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export { CANONICAL_BUSINESS_CONFIG };

export interface AcademicPillar {
  id: string;
  name: string;
  targetClasses: string[];
  targetExams: string[];
  description: string;
}

export const VERIFIED_BRAND_DATA = {
  institutionName: CANONICAL_BUSINESS_CONFIG.academy_name,
  headquarters: CANONICAL_BUSINESS_CONFIG.address.display_location,
  yearEstablished: CANONICAL_BUSINESS_CONFIG.established_year,
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
    name: CANONICAL_BUSINESS_CONFIG.etse.name,
    shortName: CANONICAL_BUSINESS_CONFIG.etse.short_name,
    eligibleClasses: CANONICAL_BUSINESS_CONFIG.etse.eligible_classes,
    scholarshipUpTo: "100%",
    examMode: CANONICAL_BUSINESS_CONFIG.etse.mode,
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
