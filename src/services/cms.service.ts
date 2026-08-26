import { createClientServer } from "@/lib/supabase/server";
import {
  CourseRecord,
  FacultyRecord,
  DirectorRecord,
  TestimonialRecord,
  AnnouncementRecord,
  BlogPostRecord,
} from "@/types/cms";

export class CMSService {
  /**
   * Fetches published academic courses
   */
  public static async getCourses(): Promise<CourseRecord[]> {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("courses") as any)
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      targetExam: row.target_exam,
      eligibleClasses: row.eligible_classes || [],
      duration: row.duration,
      description: row.description,
      features: row.features || [],
      syllabusUrl: row.syllabus_url || null,
      isActive: row.is_active,
      displayOrder: row.display_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Fetches faculty team
   */
  public static async getFaculty(): Promise<FacultyRecord[]> {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("faculty") as any)
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      subject: row.subject,
      designation: row.designation,
      experienceYearsText: row.experience_years_text || null,
      photoUrl: row.photo_url || null,
      displayOrder: row.display_order,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Fetches directors
   */
  public static async getDirectors(): Promise<DirectorRecord[]> {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("directors") as any)
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      designation: row.designation,
      message: row.message,
      photoUrl: row.photo_url || null,
      displayOrder: row.display_order,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Fetches student testimonials
   */
  public static async getTestimonials(featuredOnly = false): Promise<TestimonialRecord[]> {
    const supabase = await createClientServer();
    let query = (supabase.from("testimonials") as any).select("*").eq("is_active", true);

    if (featuredOnly) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query.order("display_order", { ascending: true });
    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      studentName: row.student_name,
      examCleared: row.exam_cleared,
      rankText: row.rank_text,
      courseAttended: row.course_attended,
      year: row.year,
      quote: row.quote,
      photoUrl: row.photo_url || null,
      videoUrl: row.video_url || null,
      displayOrder: row.display_order,
      isActive: row.is_active,
      isFeatured: row.is_featured,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Fetches active announcements
   */
  public static async getActiveAnnouncements(): Promise<AnnouncementRecord[]> {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("announcements") as any)
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      category: row.category,
      linkUrl: row.link_url || null,
      priority: row.priority,
      isActive: row.is_active,
      startDate: row.start_date || null,
      endDate: row.end_date || null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Fetches published blog posts
   */
  public static async getBlogPosts(): Promise<BlogPostRecord[]> {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("blog_posts") as any)
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      coverImageUrl: row.cover_image_url || null,
      category: row.category,
      authorName: row.author_name,
      tags: row.tags || [],
      isPublished: row.is_published,
      publishedAt: row.published_at || null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
}
