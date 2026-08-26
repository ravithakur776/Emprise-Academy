/**
 * Supabase Database Definitions & Type Contract (Phase 1.1 Hardened)
 * Matching PostgreSQL Schema for Emprise Academy
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          is_active: boolean;
          assigned_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: string;
          is_active?: boolean;
          assigned_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          is_active?: boolean;
          assigned_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      student_profiles: {
        Row: {
          id: string;
          user_id: string | null;
          admission_number: string | null;
          full_name: string;
          dob: string;
          gender: string;
          category: string | null;
          phone: string;
          email: string | null;
          current_class: string;
          target_exam: string | null;
          school_name: string | null;
          address: string | null;
          city: string;
          state: string;
          pincode: string | null;
          photo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          admission_number?: string | null;
          full_name: string;
          dob: string;
          gender: string;
          category?: string | null;
          phone: string;
          email?: string | null;
          current_class: string;
          target_exam?: string | null;
          school_name?: string | null;
          address?: string | null;
          city?: string;
          state?: string;
          pincode?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          admission_number?: string | null;
          full_name?: string;
          dob?: string;
          gender?: string;
          category?: string | null;
          phone?: string;
          email?: string | null;
          current_class?: string;
          target_exam?: string | null;
          school_name?: string | null;
          address?: string | null;
          city?: string;
          state?: string;
          pincode?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      parent_profiles: {
        Row: {
          id: string;
          student_id: string;
          father_name: string;
          father_occupation: string | null;
          father_phone: string;
          mother_name: string | null;
          mother_occupation: string | null;
          mother_phone: string | null;
          emergency_contact: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          father_name: string;
          father_occupation?: string | null;
          father_phone: string;
          mother_name?: string | null;
          mother_occupation?: string | null;
          mother_phone?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          father_name?: string;
          father_occupation?: string | null;
          father_phone?: string;
          mother_name?: string | null;
          mother_occupation?: string | null;
          mother_phone?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exam_centres: {
        Row: {
          id: string;
          centre_code: string;
          centre_name: string;
          address: string;
          city: string;
          pincode: string;
          google_map_url: string | null;
          capacity: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          centre_code: string;
          centre_name: string;
          address: string;
          city: string;
          pincode: string;
          google_map_url?: string | null;
          capacity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          centre_code?: string;
          centre_name?: string;
          address?: string;
          city?: string;
          pincode?: string;
          google_map_url?: string | null;
          capacity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exam_application_counters: {
        Row: {
          exam_id: string;
          current_sequence: number;
          updated_at: string;
        };
        Insert: {
          exam_id: string;
          current_sequence?: number;
          updated_at?: string;
        };
        Update: {
          exam_id?: string;
          current_sequence?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      etse_exams: {
        Row: {
          id: string;
          exam_code: string;
          title: string;
          year: number;
          exam_date: string;
          exam_time: string;
          reporting_time: string;
          registration_start_date: string;
          registration_end_date: string;
          eligible_classes: string[];
          syllabus_url: string | null;
          sample_paper_url: string | null;
          instructions: string[];
          is_active: boolean;
          results_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          exam_code: string;
          title: string;
          year: number;
          exam_date: string;
          exam_time: string;
          reporting_time: string;
          registration_start_date: string;
          registration_end_date: string;
          eligible_classes: string[];
          syllabus_url?: string | null;
          sample_paper_url?: string | null;
          instructions?: string[];
          is_active?: boolean;
          results_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          exam_code?: string;
          title?: string;
          year?: number;
          exam_date?: string;
          exam_time?: string;
          reporting_time?: string;
          registration_start_date?: string;
          registration_end_date?: string;
          eligible_classes?: string[];
          syllabus_url?: string | null;
          sample_paper_url?: string | null;
          instructions?: string[];
          is_active?: boolean;
          results_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      etse_registrations: {
        Row: {
          id: string;
          application_number: string;
          student_profile_id: string | null;
          user_id: string | null;
          exam_id: string;
          student_name: string;
          father_name: string;
          mother_name: string | null;
          dob: string;
          gender: string;
          phone: string;
          email: string | null;
          current_class: string;
          school_name: string;
          stream_interest: string;
          exam_centre_id: string;
          photo_url: string | null;
          status: string;
          claim_token_hash: string | null;
          claim_token_expires_at: string | null;
          claimed_at: string | null;
          registered_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_number: string;
          student_profile_id?: string | null;
          user_id?: string | null;
          exam_id: string;
          student_name: string;
          father_name: string;
          mother_name?: string | null;
          dob: string;
          gender: string;
          phone: string;
          email?: string | null;
          current_class: string;
          school_name: string;
          stream_interest: string;
          exam_centre_id: string;
          photo_url?: string | null;
          status?: string;
          claim_token_hash?: string | null;
          claim_token_expires_at?: string | null;
          claimed_at?: string | null;
          registered_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          application_number?: string;
          student_profile_id?: string | null;
          user_id?: string | null;
          exam_id?: string;
          student_name?: string;
          father_name?: string;
          mother_name?: string | null;
          dob?: string;
          gender?: string;
          phone?: string;
          email?: string | null;
          current_class?: string;
          school_name?: string;
          stream_interest?: string;
          exam_centre_id?: string;
          photo_url?: string | null;
          status?: string;
          claim_token_hash?: string | null;
          claim_token_expires_at?: string | null;
          claimed_at?: string | null;
          registered_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admit_cards: {
        Row: {
          id: string;
          registration_id: string;
          exam_id: string;
          roll_number: string;
          verification_token: string;
          qr_verification_url: string;
          exam_date: string;
          exam_time: string;
          reporting_time: string;
          exam_centre_id: string;
          status: string;
          student_name_snapshot: string | null;
          father_name_snapshot: string | null;
          mother_name_snapshot: string | null;
          dob_snapshot: string | null;
          class_snapshot: string | null;
          school_name_snapshot: string | null;
          centre_name_snapshot: string | null;
          centre_address_snapshot: string | null;
          instructions_snapshot: string[];
          is_generated: boolean;
          generated_at: string;
          regenerated_at: string | null;
          revoked_at: string | null;
          revocation_reason: string | null;
          download_count: number;
          last_downloaded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          registration_id: string;
          exam_id: string;
          roll_number: string;
          verification_token: string;
          qr_verification_url: string;
          exam_date: string;
          exam_time: string;
          reporting_time: string;
          exam_centre_id: string;
          status?: string;
          student_name_snapshot?: string | null;
          father_name_snapshot?: string | null;
          mother_name_snapshot?: string | null;
          dob_snapshot?: string | null;
          class_snapshot?: string | null;
          school_name_snapshot?: string | null;
          centre_name_snapshot?: string | null;
          centre_address_snapshot?: string | null;
          instructions_snapshot?: string[];
          is_generated?: boolean;
          generated_at?: string;
          regenerated_at?: string | null;
          revoked_at?: string | null;
          revocation_reason?: string | null;
          download_count?: number;
          last_downloaded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          registration_id?: string;
          exam_id?: string;
          roll_number?: string;
          verification_token?: string;
          qr_verification_url?: string;
          exam_date?: string;
          exam_time?: string;
          reporting_time?: string;
          exam_centre_id?: string;
          status?: string;
          student_name_snapshot?: string | null;
          father_name_snapshot?: string | null;
          mother_name_snapshot?: string | null;
          dob_snapshot?: string | null;
          class_snapshot?: string | null;
          school_name_snapshot?: string | null;
          centre_name_snapshot?: string | null;
          centre_address_snapshot?: string | null;
          instructions_snapshot?: string[];
          is_generated?: boolean;
          generated_at?: string;
          regenerated_at?: string | null;
          revoked_at?: string | null;
          revocation_reason?: string | null;
          download_count?: number;
          last_downloaded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      result_exams: {
        Row: {
          id: string;
          exam_code: string;
          exam_title: string;
          academic_year: string;
          exam_type: string;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          exam_code: string;
          exam_title: string;
          academic_year: string;
          exam_type?: string;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          exam_code?: string;
          exam_title?: string;
          academic_year?: string;
          exam_type?: string;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exam_subjects: {
        Row: {
          id: string;
          exam_id: string;
          subject_name: string;
          subject_code: string;
          maximum_marks: number;
          pass_marks: number | null;
          display_order: number;
          is_optional: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          exam_id: string;
          subject_name: string;
          subject_code: string;
          maximum_marks: number;
          pass_marks?: number | null;
          display_order?: number;
          is_optional?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          exam_id?: string;
          subject_name?: string;
          subject_code?: string;
          maximum_marks?: number;
          pass_marks?: number | null;
          display_order?: number;
          is_optional?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      results: {
        Row: {
          id: string;
          exam_id: string;
          academic_year: string;
          roll_number: string;
          student_profile_id: string | null;
          candidate_name: string;
          father_name: string;
          dob: string;
          class_enrolled: string;
          stream: string | null;
          total_marks_obtained: number;
          max_marks: number;
          percentage: number;
          percentile: number | null;
          rank: number | null;
          category_rank: number | null;
          scholarship_percentage_awarded: number | null;
          qualifying_status: string;
          remarks: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          exam_id: string;
          academic_year: string;
          roll_number: string;
          student_profile_id?: string | null;
          candidate_name: string;
          father_name: string;
          dob: string;
          class_enrolled: string;
          stream?: string | null;
          total_marks_obtained: number;
          max_marks: number;
          percentage: number;
          percentile?: number | null;
          rank?: number | null;
          category_rank?: number | null;
          scholarship_percentage_awarded?: number | null;
          qualifying_status?: string;
          remarks?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          exam_id?: string;
          academic_year?: string;
          roll_number?: string;
          student_profile_id?: string | null;
          candidate_name?: string;
          father_name?: string;
          dob?: string;
          class_enrolled?: string;
          stream?: string | null;
          total_marks_obtained?: number;
          max_marks?: number;
          percentage?: number;
          percentile?: number | null;
          rank?: number | null;
          category_rank?: number | null;
          scholarship_percentage_awarded?: number | null;
          qualifying_status?: string;
          remarks?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      result_subjects: {
        Row: {
          id: string;
          result_id: string;
          subject_name: string;
          marks_obtained: number;
          max_marks: number;
          subject_rank: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          result_id: string;
          subject_name: string;
          marks_obtained: number;
          max_marks: number;
          subject_rank?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          result_id?: string;
          subject_name?: string;
          marks_obtained?: number;
          max_marks?: number;
          subject_rank?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      student_result_history: {
        Row: {
          id: string;
          student_profile_id: string;
          result_id: string;
          exam_title: string;
          academic_year: string;
          score_summary: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_profile_id: string;
          result_id: string;
          exam_title: string;
          academic_year: string;
          score_summary: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_profile_id?: string;
          result_id?: string;
          exam_title?: string;
          academic_year?: string;
          score_summary?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          name: string;
          target_exam: string;
          eligible_classes: string[];
          duration: string;
          description: string;
          features: string[];
          syllabus_url: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          target_exam: string;
          eligible_classes?: string[];
          duration: string;
          description: string;
          features?: string[];
          syllabus_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          target_exam?: string;
          eligible_classes?: string[];
          duration?: string;
          description?: string;
          features?: string[];
          syllabus_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      course_programs: {
        Row: {
          id: string;
          course_id: string;
          program_name: string;
          mode: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          program_name: string;
          mode?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          program_name?: string;
          mode?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      batches: {
        Row: {
          id: string;
          course_id: string;
          batch_name: string;
          start_date: string;
          timings: string | null;
          is_enrolling: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          batch_name: string;
          start_date: string;
          timings?: string | null;
          is_enrolling?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          batch_name?: string;
          start_date?: string;
          timings?: string | null;
          is_enrolling?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      directors: {
        Row: {
          id: string;
          name: string;
          designation: string;
          message: string;
          photo_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          designation: string;
          message: string;
          photo_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string;
          message?: string;
          photo_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      faculty: {
        Row: {
          id: string;
          name: string;
          subject: string;
          designation: string;
          experience_years_text: string | null;
          photo_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject: string;
          designation: string;
          experience_years_text?: string | null;
          photo_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subject?: string;
          designation?: string;
          experience_years_text?: string | null;
          photo_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          student_name: string;
          parent_name: string | null;
          phone: string;
          email: string | null;
          class: string | null;
          school: string | null;
          course_interest: string | null;
          source: string;
          status: string;
          assigned_counsellor_id: string | null;
          notes: string | null;
          next_followup_at: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          student_name: string;
          parent_name?: string | null;
          phone: string;
          email?: string | null;
          class?: string | null;
          school?: string | null;
          course_interest?: string | null;
          source?: string;
          status?: string;
          assigned_counsellor_id?: string | null;
          notes?: string | null;
          next_followup_at?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          student_name?: string;
          parent_name?: string | null;
          phone?: string;
          email?: string | null;
          class?: string | null;
          school?: string | null;
          course_interest?: string | null;
          source?: string;
          status?: string;
          assigned_counsellor_id?: string | null;
          notes?: string | null;
          next_followup_at?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      lead_followups: {
        Row: {
          id: string;
          lead_id: string;
          counsellor_id: string;
          followup_type: string;
          remarks: string;
          next_action: string | null;
          followup_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          counsellor_id: string;
          followup_type: string;
          remarks: string;
          next_action?: string | null;
          followup_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          counsellor_id?: string;
          followup_type?: string;
          remarks?: string;
          next_action?: string | null;
          followup_date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      admissions: {
        Row: {
          id: string;
          lead_id: string | null;
          student_id: string;
          course_id: string;
          batch_id: string | null;
          admission_number: string;
          status: string;
          enrolled_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          student_id: string;
          course_id: string;
          batch_id?: string | null;
          admission_number: string;
          status?: string;
          enrolled_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          student_id?: string;
          course_id?: string;
          batch_id?: string | null;
          admission_number?: string;
          status?: string;
          enrolled_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      scholarship_programs: {
        Row: {
          id: string;
          title: string;
          description: string;
          eligibility_criteria: string;
          criteria_details: Json;
          max_scholarship_percent: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          eligibility_criteria: string;
          criteria_details?: Json;
          max_scholarship_percent?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          eligibility_criteria?: string;
          criteria_details?: Json;
          max_scholarship_percent?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      scholarship_applications: {
        Row: {
          id: string;
          program_id: string;
          student_profile_id: string;
          marks_obtained: number | null;
          proof_document_url: string | null;
          status: string;
          awarded_percentage: number;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          student_profile_id: string;
          marks_obtained?: number | null;
          proof_document_url?: string | null;
          status?: string;
          awarded_percentage?: number;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          program_id?: string;
          student_profile_id?: string;
          marks_obtained?: number | null;
          proof_document_url?: string | null;
          status?: string;
          awarded_percentage?: number;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          student_name: string;
          exam_cleared: string;
          rank_text: string;
          course_attended: string;
          year: number;
          quote: string;
          photo_url: string | null;
          video_url: string | null;
          display_order: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_name: string;
          exam_cleared: string;
          rank_text: string;
          course_attended: string;
          year: number;
          quote: string;
          photo_url?: string | null;
          video_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_name?: string;
          exam_cleared?: string;
          rank_text?: string;
          course_attended?: string;
          year?: number;
          quote?: string;
          photo_url?: string | null;
          video_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          media_url: string;
          thumbnail_url: string | null;
          caption: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          media_url: string;
          thumbnail_url?: string | null;
          caption?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          media_url?: string;
          thumbnail_url?: string | null;
          caption?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image_url: string | null;
          category: string;
          author_name: string;
          tags: string[];
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image_url?: string | null;
          category: string;
          author_name?: string;
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          cover_image_url?: string | null;
          category?: string;
          author_name?: string;
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          link_url: string | null;
          priority: string;
          is_active: boolean;
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category: string;
          link_url?: string | null;
          priority?: string;
          is_active?: boolean;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: string;
          link_url?: string | null;
          priority?: string;
          is_active?: boolean;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          action_url: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_name: string;
          entity_id: string | null;
          metadata: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_name: string;
          entity_id?: string | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_name?: string;
          entity_id?: string | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_next_etse_application_number: {
        Args: {
          p_exam_id: string;
        };
        Returns: string;
      };
      verify_admit_card_public: {
        Args: {
          p_token: string;
        };
        Returns: Json;
      };
      search_student_result_secure: {
        Args: {
          p_roll_number: string;
          p_dob: string;
          p_exam_id: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      app_role_enum:
        | "SUPER_ADMIN"
        | "DIRECTOR"
        | "ADMISSION_ADMIN"
        | "COUNSELLOR"
        | "EXAM_ADMIN"
        | "CONTENT_MANAGER"
        | "FACULTY"
        | "STUDENT";
      admit_card_status_enum: "DRAFT" | "GENERATED" | "PUBLISHED" | "REVOKED";
      gender_enum: "MALE" | "FEMALE" | "OTHER";
      etse_status_enum:
        | "REGISTERED"
        | "ADMIT_CARD_GENERATED"
        | "APPEARED"
        | "ABSENT"
        | "RESULT_DECLARED"
        | "CANCELLED";
      lead_status_enum:
        | "NEW"
        | "CONTACTED"
        | "INTERESTED"
        | "COUNSELLING_SCHEDULED"
        | "CAMPUS_VISIT"
        | "CONVERTED"
        | "NOT_INTERESTED"
        | "LOST";
      lead_source_enum:
        | "WEBSITE"
        | "INSTAGRAM"
        | "FACEBOOK"
        | "GOOGLE"
        | "WHATSAPP"
        | "PHONE"
        | "ETSE"
        | "SCHOLARSHIP"
        | "REFERRAL"
        | "WALK_IN"
        | "OTHER";
      qualifying_status_enum: "QUALIFIED" | "NOT_QUALIFIED" | "AWAITING";
      priority_enum: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
