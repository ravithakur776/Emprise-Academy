import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const studentRegisterSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(150),
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters with letters & numbers"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  currentClass: z.string().min(1, "Please select your current class"),
  targetExam: z.enum(["IIT_JEE", "NEET_UG", "FOUNDATION"]).optional(),
  schoolName: z.string().trim().max(255).optional(),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
});

export const passwordResetConfirmSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
