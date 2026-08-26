import { z } from "zod";

export const resultSearchSchema = z.object({
  examId: z.string().uuid("Please select a valid examination"),
  rollNumber: z
    .string()
    .trim()
    .min(3, "Roll number must be at least 3 characters")
    .max(50, "Roll number too long")
    .transform((val) => val.toUpperCase()),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
});

export const excelResultRowSchema = z.object({
  rollNumber: z.string().trim().min(1, "Roll number is required").max(50),
  candidateName: z.string().trim().min(2, "Candidate name must be at least 2 characters").max(150),
  fatherName: z.string().trim().min(2, "Father's name is required").max(150),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format"),
  classEnrolled: z.string().trim().min(1, "Class is required"),
  stream: z.string().trim().optional(),
  totalMarksObtained: z.number().min(0, "Marks cannot be negative"),
  maxMarks: z.number().positive("Maximum marks must be greater than 0"),
  percentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
  percentile: z.number().min(0).max(100).optional(),
  rank: z.number().int().positive().optional(),
  categoryRank: z.number().int().positive().optional(),
  scholarshipPercentageAwarded: z.number().min(0).max(100).optional().default(0),
  qualifyingStatus: z.enum(["QUALIFIED", "NOT_QUALIFIED", "AWAITING"]).default("QUALIFIED"),
  remarks: z.string().trim().max(500).optional(),
  subjects: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Subject name required"),
        marksObtained: z.number().min(0, "Marks cannot be negative"),
        maxMarks: z.number().positive("Subject max marks must be > 0"),
      })
    )
    .default([]),
});

export const createResultExamSchema = z.object({
  examCode: z.string().trim().min(3).max(50).toUpperCase(),
  examTitle: z.string().trim().min(5).max(200),
  academicYear: z.string().regex(/^\d{4}-\d{4}$/, "Academic year must be in YYYY-YYYY format (e.g. 2025-2026)"),
  examType: z.enum(["ETSE", "SCHOLARSHIP", "INTERNAL_TEST", "BOARD_MOCK"]).default("ETSE"),
});

export type ResultSearchInput = z.infer<typeof resultSearchSchema>;
export type ExcelResultRowInput = z.infer<typeof excelResultRowSchema>;
export type CreateResultExamInput = z.infer<typeof createResultExamSchema>;
