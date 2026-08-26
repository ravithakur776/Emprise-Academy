import { z } from "zod";

export const leadIntakeSchema = z.object({
  studentName: z.string().trim().min(2, "Student name must be at least 2 characters").max(150),
  parentName: z.string().trim().max(150).optional().nullable(),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please provide a valid email address").optional().nullable(),
  class: z.string().trim().optional().nullable(),
  school: z.string().trim().max(255).optional().nullable(),
  courseInterest: z.string().trim().max(100).optional().nullable(),
  source: z
    .enum([
      "WEBSITE",
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
  notes: z.string().trim().max(1000).optional().nullable(),
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
