/**
 * ETSE 2026 and Admit Card Type Definitions
 */

export type ETSEStatus = "REGISTERED" | "ADMIT_CARD_GENERATED" | "APPEARED" | "ABSENT" | "RESULT_DECLARED" | "CANCELLED";

export interface ExamCentre {
  id: string;
  centreCode: string;
  centreName: string;
  address: string;
  city: string;
  pincode: string;
  googleMapUrl?: string | null;
  capacity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ETSEExam {
  id: string;
  examCode: string;
  title: string;
  year: number;
  examDate: string;
  examTime: string;
  reportingTime: string;
  registrationStartDate: string;
  registrationEndDate: string;
  eligibleClasses: string[];
  syllabusUrl?: string | null;
  samplePaperUrl?: string | null;
  instructions: string[];
  isActive: boolean;
  resultsPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ETSERegistration {
  id: string;
  applicationNumber: string;
  studentProfileId?: string | null;
  userId?: string | null;
  examId: string;
  studentName: string;
  fatherName: string;
  motherName?: string | null;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  email?: string | null;
  currentClass: string;
  schoolName: string;
  streamInterest: "IIT_JEE" | "NEET_UG" | "FOUNDATION";
  examCentreId: string;
  photoUrl?: string | null;
  status: ETSEStatus;
  registeredAt: string;
  createdAt: string;
  updatedAt: string;
  exam?: ETSEExam;
  centre?: ExamCentre;
}

export interface AdmitCard {
  id: string;
  registrationId: string;
  examId: string;
  rollNumber: string;
  verificationToken: string;
  qrVerificationUrl: string;
  examDate: string;
  examTime: string;
  reportingTime: string;
  examCentreId: string;
  isGenerated: boolean;
  generatedAt: string;
  downloadCount: number;
  lastDownloadedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  registration?: ETSERegistration;
  exam?: ETSEExam;
  centre?: ExamCentre;
}

export interface AdmitCardVerificationResult {
  isValid: boolean;
  candidateName: string;
  applicationNumber: string;
  rollNumber: string;
  examTitle: string;
  examDate: string;
  examCentre: string;
  status: string;
  verifiedAt: string;
}
