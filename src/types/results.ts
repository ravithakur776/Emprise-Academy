/**
 * Result Management and Excel Import Types
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
  physics_marks?: number | string;
  chemistry_marks?: number | string;
  maths_marks?: number | string;
  biology_marks?: number | string;
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
  rollNumber: string;
  candidateName: string;
  fatherName: string;
  dob: string; // YYYY-MM-DD
  classEnrolled: string;
  stream?: string;
  subjects: {
    name: string;
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
}

export interface ExcelImportRowError {
  rowNumber: number;
  rollNumber?: string;
  column?: string;
  message: string;
  value?: unknown;
}

export interface ExcelImportPreviewReport {
  examId: string;
  academicYear: string;
  totalRows: number;
  validRowsCount: number;
  invalidRowsCount: number;
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
  totalProcessed: number;
  errors: ExcelImportRowError[];
}
