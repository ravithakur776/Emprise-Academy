/**
 * CMS Content Types: Courses, Faculty, Directors, Testimonials, Blog, Announcements
 */

export interface CourseRecord {
  id: string;
  slug: string;
  name: string;
  targetExam: "IIT_JEE" | "NEET_UG" | "FOUNDATION" | "OTHER";
  eligibleClasses: string[];
  duration: string;
  description: string;
  features: string[];
  syllabusUrl?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface FacultyRecord {
  id: string;
  name: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | "Mental Ability" | "Other";
  designation: string;
  experienceYearsText?: string | null;
  photoUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DirectorRecord {
  id: string;
  name: string;
  designation: string;
  message: string;
  photoUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialRecord {
  id: string;
  studentName: string;
  examCleared: string;
  rankText: string;
  courseAttended: string;
  year: number;
  quote: string;
  photoUrl?: string | null;
  videoUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  category: "CAMPUS" | "CLASSROOM" | "FELICITATION" | "EVENTS" | "LAB";
  mediaUrl: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  category: "PREPARATION_TIPS" | "EXAM_UPDATES" | "ACADEMIC_INSIGHTS" | "STUDENT_STORIES";
  authorName: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  content: string;
  category: "ADMISSION" | "EXAM" | "RESULT" | "HOLIDAY" | "GENERAL";
  linkUrl?: string | null;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ScholarshipProgramRecord {
  id: string;
  title: string;
  description: string;
  eligibilityCriteria: string;
  criteriaDetails: {
    minScorePercentage?: number;
    targetBoard?: string;
    concessionPercentage: number;
  }[];
  maxScholarshipPercent: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
