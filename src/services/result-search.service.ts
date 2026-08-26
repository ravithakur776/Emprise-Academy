import { createClientServer } from "@/lib/supabase/server";
import { ResultSearchInput } from "@/validations/result.validation";
import { NotFoundError } from "@/lib/errors";

export interface SanitizedSearchResult {
  candidateName: string;
  fatherName: string;
  rollNumber: string;
  classEnrolled: string;
  stream?: string | null;
  academicYear: string;
  totalMarksObtained: number;
  maxMarks: number;
  percentage: number;
  percentile?: number | null;
  rank?: number | null;
  categoryRank?: number | null;
  scholarshipPercentageAwarded?: number | null;
  qualifyingStatus: string;
  remarks?: string | null;
  subjects: {
    subjectName: string;
    marksObtained: number;
    maxMarks: number;
    subjectRank?: number | null;
  }[];
}

export class ResultSearchService {
  /**
   * Performs a secure result search using Roll Number + Date of Birth.
   * Returns a sanitized result without exposing internal database IDs or student profile IDs.
   */
  public static async searchPublicResult(
    input: ResultSearchInput
  ): Promise<SanitizedSearchResult> {
    const supabase = await createClientServer();

    // Call PostgreSQL RPC search function for security isolation
    const { data, error } = await (supabase as any).rpc("search_student_result_secure", {
      p_roll_number: input.rollNumber,
      p_dob: input.dob,
      p_exam_id: input.examId,
    });

    if (error || !data) {
      throw new NotFoundError(
        "Result",
        `Roll Number ${input.rollNumber} with the provided Date of Birth`
      );
    }

    return data as unknown as SanitizedSearchResult;
  }

  /**
   * Fetches full result history for a logged-in student profile.
   */
  public static async getStudentResultHistory(studentProfileId: string) {
    const supabase = await createClientServer();

    const { data, error } = await supabase
      .from("student_result_history")
      .select("*")
      .eq("student_profile_id", studentProfileId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to retrieve student result history: ${error.message}`);
    }

    return data;
  }
}
