import { z } from "zod";

export const leadIntakeSchema = z.object({
  studentName: z.string().trim().min(2, "Student name must be at least 2 characters").max(150).optional(),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(150).optional(),
  parentName: z.string().trim().max(150).optional().nullable(),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please provide a valid email address").optional().nullable().or(z.literal("")),
  class: z.string().trim().max(100).optional().nullable(),
  school: z.string().trim().max(255).optional().nullable(),
  courseInterest: z.string().trim().max(100).optional().nullable(),
  targetExam: z.string().trim().max(100).optional().nullable(),
  preferredMode: z.enum(["PHONE", "WHATSAPP", "IN_PERSON", "ONLINE"]).optional().nullable(),
  preferredDate: z.string().trim().max(50).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  source: z
    .enum([
      "WEBSITE",
      "ADMISSIONS",
      "COUNSELLING",
      "CONTACT",
      "INSTAGRAM",
      "FACEBOOK",
      "GOOGLE",
      "WHATSAPP",
      "PHONE",
      "ETSE",
      "SCHOLARSHIP",
      "REFERRAL",
      "WALK_IN",
      "OTHER",
    ])
    .default("WEBSITE"),
  utmSource: z.string().trim().max(100).optional().nullable(),
  utmMedium: z.string().trim().max(100).optional().nullable(),
  utmCampaign: z.string().trim().max(100).optional().nullable(),
  utmContent: z.string().trim().max(100).optional().nullable(),
  utmTerm: z.string().trim().max(100).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const leadUpdateStatusSchema = z.object({
  status: z.enum([
    "NEW",
    "CONTACTED",
    "INTERESTED",
    "COUNSELLING_SCHEDULED",
    "CAMPUS_VISIT",
    "CONVERTED",
    "NOT_INTERESTED",
    "LOST",
  ]),
  assignedCounsellorId: z.string().uuid().optional().nullable(),
  nextFollowupAt: z.string().datetime().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

export const leadFollowupSchema = z.object({
  leadId: z.string().uuid("Invalid lead ID"),
  followupType: z.enum(["CALL", "WHATSAPP", "EMAIL", "COUNSELLING_SESSION", "CAMPUS_MEETING"]),
  remarks: z.string().trim().min(3, "Followup remarks are required").max(2000),
  nextAction: z.string().trim().max(200).optional().nullable(),
  nextFollowupDate: z.string().datetime().optional().nullable(),
});

export type LeadIntakeInput = z.infer<typeof leadIntakeSchema>;
export type LeadUpdateStatusInput = z.infer<typeof leadUpdateStatusSchema>;
export type LeadFollowupInput = z.infer<typeof leadFollowupSchema>;
