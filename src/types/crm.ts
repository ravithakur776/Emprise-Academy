/**
 * CRM, Lead Management, and Admissions Types
 */

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "INTERESTED"
  | "COUNSELLING_SCHEDULED"
  | "CAMPUS_VISIT"
  | "CONVERTED"
  | "NOT_INTERESTED"
  | "LOST";

export type LeadSource =
  | "WEBSITE"
  | "INSTAGRAM"
  | "FACEBOOK"
  | "GOOGLE"
  | "WHATSAPP"
  | "PHONE"
  | "ETSE"
  | "SCHOLARSHIP"
  | "REFERRAL"
  | "WALK_IN"
  | "OTHER";

export type FollowupType = "CALL" | "WHATSAPP" | "EMAIL" | "COUNSELLING_SESSION" | "CAMPUS_MEETING";

export interface LeadRecord {
  id: string;
  studentName: string;
  parentName?: string | null;
  phone: string;
  email?: string | null;
  class?: string | null;
  school?: string | null;
  courseInterest?: string | null;
  source: LeadSource;
  status: LeadStatus;
  assignedCounsellorId?: string | null;
  notes?: string | null;
  nextFollowupAt?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface LeadFollowupRecord {
  id: string;
  leadId: string;
  counsellorId: string;
  followupType: FollowupType;
  remarks: string;
  nextAction?: string | null;
  followupDate: string;
  createdAt: string;
}

export interface AdmissionRecord {
  id: string;
  leadId?: string | null;
  studentId: string;
  courseId: string;
  batchId?: string | null;
  admissionNumber: string;
  status: "APPLIED" | "VERIFIED" | "CONFIRMED" | "WITHDRAWN";
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
}
