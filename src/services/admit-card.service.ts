import { createClientServer } from "@/lib/supabase/server";
import { AdmitCardVerificationResult } from "@/types/etse";
import { NotFoundError } from "@/lib/errors";

export class AdmitCardService {
  /**
   * Verifies an admit card publicly using its unique verification token.
   * Strips all non-essential personal information for privacy.
   */
  public static async verifyPublicAdmitCard(
    token: string
  ): Promise<AdmitCardVerificationResult> {
    const supabase = await createClientServer();

    const { data, error } = await (supabase as any).rpc("verify_admit_card_public", {
      p_token: token,
    });

    if (error || !data || (data as any).isValid === false) {
      throw new NotFoundError("Admit Card", token);
    }

    return data as unknown as AdmitCardVerificationResult;
  }

  /**
   * Fetches the full admit card for an authenticated student
   */
  public static async getStudentAdmitCards(studentUserId: string) {
    const supabase = await createClientServer();

    const { data, error } = await supabase
      .from("admit_cards")
      .select(`
        *,
        registration:etse_registrations(*),
        exam:etse_exams(*),
        centre:exam_centres(*)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to load admit cards: ${error.message}`);
    }

    return data;
  }
}
