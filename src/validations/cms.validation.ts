import { z } from "zod";

export const courseSchema = z.object({
  slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().trim().min(3).max(200),
  targetExam: z.enum(["IIT_JEE", "NEET_UG", "FOUNDATION", "OTHER"]),
  eligibleClasses: z.array(z.string().min(1)).min(1, "At least one eligible class is required"),
  duration: z.string().trim().min(1).max(100),
  description: z.string().trim().min(10),
  features: z.array(z.string()).default([]),
  syllabusUrl: z.string().url().optional().nullable(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const facultySchema = z.object({
  name: z.string().trim().min(2).max(150),
  subject: z.enum(["Physics", "Chemistry", "Mathematics", "Biology", "Mental Ability", "Other"]),
  designation: z.string().trim().min(2).max(150),
  experienceYearsText: z.string().trim().max(50).optional().nullable(),
  photoUrl: z.string().url().optional().nullable(),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const directorSchema = z.object({
  name: z.string().trim().min(2).max(150),
  designation: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10),
  photoUrl: z.string().url().optional().nullable(),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  studentName: z.string().trim().min(2).max(150),
  examCleared: z.string().trim().min(2).max(100),
  rankText: z.string().trim().min(1).max(100),
  courseAttended: z.string().trim().min(2).max(150),
  year: z.number().int().min(2011).max(2035),
  quote: z.string().trim().min(10),
  photoUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const announcementSchema = z.object({
  title: z.string().trim().min(3).max(255),
  content: z.string().trim().min(5),
  category: z.enum(["ADMISSION", "EXAM", "RESULT", "HOLIDAY", "GENERAL"]),
  linkUrl: z.string().url().optional().nullable(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  isActive: z.boolean().default(true),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
});

export const blogPostSchema = z.object({
  slug: z.string().trim().min(3).max(200).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(5).max(255),
  excerpt: z.string().trim().min(10).max(500),
  content: z.string().trim().min(20),
  coverImageUrl: z.string().url().optional().nullable(),
  category: z.enum(["PREPARATION_TIPS", "EXAM_UPDATES", "ACADEMIC_INSIGHTS", "STUDENT_STORIES"]),
  authorName: z.string().trim().min(2).max(150).default("Emprise Academic Team"),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
});
