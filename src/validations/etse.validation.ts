import { z } from "zod";

export const etseRegistrationSchema = z.object({
  examId: z.string().uuid("Invalid Exam ID").optional().nullable(),
  studentName: z.string().trim().min(2, "Student name must be at least 2 characters").max(150),
  fatherName: z.string().trim().min(2, "Father's name is required").max(150),
  motherName: z.string().trim().max(150).optional().nullable(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please provide a valid email address").optional().nullable(),
  currentClass: z.string().min(1, "Please select your current class"),
  schoolName: z.string().trim().min(2, "School name is required").max(255),
  streamInterest: z.enum(["IIT_JEE", "NEET_UG", "FOUNDATION"]),
  examCentreId: z.string().uuid("Please select a valid exam centre").optional().nullable(),
  photoUrl: z.string().url("Invalid photo URL").optional().nullable(),
});

export const admitCardVerifySchema = z.object({
  token: z.string().trim().min(10, "Invalid verification token"),
});

export type ETSERegistrationInput = z.infer<typeof etseRegistrationSchema>;
export type AdmitCardVerifyInput = z.infer<typeof admitCardVerifySchema>;
