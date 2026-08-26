/**
 * Result Management, Dynamic Subjects, and Excel Import Types (Phase 1.1 Hardened)
 */

export interface ResultExam {
  id: string;
  examCode: string;
  examTitle: string;
  academicYear: string;
  examType: "ETSE" | "SCHOLARSHIP" | "INTERNAL_TEST" | "BOARD_MOCK";
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  subjects?: ExamSubject[];
}

export interface ExamSubject {
  id: string;
  examId: string;
  subjectName: string;
  subjectCode: string;
  maximumMarks: number;
  passMarks?: number | null;
  displayOrder: number;
  isOptional: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResultSubject {
  id: string;
  resultId: string;
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  subjectRank?: number | null;
  createdAt: string;
}

export type StudentMatchStatus = "MATCHED" | "NEW_STUDENT" | "REVIEW_REQUIRED" | "CONFLICT";

export interface StudentResult {
  id: string;
  examId: string;
  academicYear: string;
  rollNumber: string;
  studentProfileId?: string | null;
  candidateName: string;
  fatherName: string;
  dob: string;
  classEnrolled: string;
  stream?: string | null;
  totalMarksObtained: number;
  maxMarks: number;
  percentage: number;
  percentile?: number | null;
  rank?: number | null;
  categoryRank?: number | null;
  scholarshipPercentageAwarded?: number | null;
  qualifyingStatus: "QUALIFIED" | "NOT_QUALIFIED" | "AWAITING";
  remarks?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  exam?: ResultExam;
  subjects?: ResultSubject[];
}

export interface StudentResultHistoryItem {
  id: string;
  studentProfileId: string;
  resultId: string;
  examTitle: string;
  academicYear: string;
  scoreSummary: {
    totalMarks: number;
    maxMarks: number;
    percentage: number;
    rank?: number | null;
    qualifyingStatus: string;
    scholarshipAwarded?: number | null;
    subjects?: {
      name: string;
      marksObtained: number;
      maxMarks: number;
    }[];
  };
  createdAt: string;
}

/**
 * Raw Row parsed from Excel/CSV before validation
 */
export interface RawExcelResultRow {
  roll_number?: string | number;
  candidate_name?: string;
  father_name?: string;
  dob?: string | number | Date;
  class?: string | number;
  stream?: string;
  phone?: string | number;
  email?: string;
  student_profile_id?: string;
  total_marks?: number | string;
  max_marks?: number | string;
  percentage?: number | string;
  percentile?: number | string;
  rank?: number | string;
  category_rank?: number | string;
  scholarship_awarded?: number | string;
  qualifying_status?: string;
  remarks?: string;
  [key: string]: unknown;
}

/**
 * Validated row ready for database upsert
 */
export interface ValidatedResultRow {
  rowNumber: number;
  rollNumber: string;
  candidateName: string;
  fatherName: string;
  dob: string; // YYYY-MM-DD
  classEnrolled: string;
  stream?: string;
  phone?: string;
  email?: string;
  subjects: {
    name: string;
    code: string;
    marksObtained: number;
    maxMarks: number;
  }[];
  totalMarksObtained: number;
  maxMarks: number;
  percentage: number;
  percentile?: number;
  rank?: number;
  categoryRank?: number;
  scholarshipPercentageAwarded?: number;
  qualifyingStatus: "QUALIFIED" | "NOT_QUALIFIED" | "AWAITING";
  remarks?: string;
  // Cautious Student Identity Matching
  matchStatus: StudentMatchStatus;
  matchedStudentProfileId?: string | null;
  matchDetails?: string;
}

export interface ExcelImportRowError {
  rowNumber: number;
  rollNumber?: string;
  column?: string;
  message: string;
  value?: unknown;
  severity?: "ERROR" | "WARNING";
}

export interface ExcelImportPreviewReport {
  examId: string;
  examTitle: string;
  academicYear: string;
  configuredSubjects: ExamSubject[];
  totalRows: number;
  validRowsCount: number;
  invalidRowsCount: number;
  warningCount: number;
  matchedCount: number;
  newStudentCount: number;
  reviewRequiredCount: number;
  conflictCount: number;
  errors: ExcelImportRowError[];
  validRows: ValidatedResultRow[];
  duplicateRollNumbersInFile: string[];
}

export interface ExcelImportExecutionResult {
  examId: string;
  academicYear: string;
  insertedCount: number;
  updatedCount: number;
  failedCount: number;
  reviewRequiredCount: number;
  totalProcessed: number;
  errors: ExcelImportRowError[];
}
