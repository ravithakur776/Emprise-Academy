import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { AppRole } from "@/types/auth";

export interface StudentLoginResolutionResult {
  email: string;
  isPhone: boolean;
  rawIdentifier: string;
}

/**
 * Resolves a student's login identifier (email or 10-digit phone number)
 * to their registered Supabase Auth email address.
 */
export async function resolveStudentLoginEmail(
  supabase: SupabaseClient<Database>,
  identifier: string
): Promise<StudentLoginResolutionResult> {
  const trimmed = identifier.trim();

  if (trimmed.includes("@")) {
    return {
      email: trimmed.toLowerCase(),
      isPhone: false,
      rawIdentifier: trimmed,
    };
  }

  // Handle phone number input
  let cleanPhone = trimmed.replace(/\D/g, "");
  if (cleanPhone.startsWith("91") && cleanPhone.length === 12) {
    cleanPhone = cleanPhone.slice(2);
  }

  try {
    // 1. Check if user_profiles has an account with this phone number
    const { data: userProfile } = await (supabase
      .from("user_profiles") as any)
      .select("email")
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (userProfile?.email) {
      return {
        email: userProfile.email.toLowerCase(),
        isPhone: true,
        rawIdentifier: cleanPhone,
      };
    }

    // 2. Check if student_profiles has a record with this phone number
    const { data: studentProfile } = await (supabase
      .from("student_profiles") as any)
      .select("email")
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (studentProfile?.email) {
      return {
        email: studentProfile.email.toLowerCase(),
        isPhone: true,
        rawIdentifier: cleanPhone,
      };
    }
  } catch {
    // Supabase query fallback in offline/mock environments
  }

  // 3. Canonical phone-to-email fallback format
  return {
    email: `${cleanPhone}@student.empriseacademy.com`,
    isPhone: true,
    rawIdentifier: cleanPhone,
  };
}

export interface StudentAuthVerificationResult {
  isAllowed: boolean;
  errorMessage?: string;
  studentProfileId?: string;
}

/**
 * Verifies that the authenticated user is authorized as a student
 * and ensures their student_profiles identity record is linked.
 */
export async function verifyStudentPortalAccess(
  supabase: SupabaseClient<Database>,
  userId: string,
  userMetadata?: Record<string, any>
): Promise<StudentAuthVerificationResult> {
  try {
    // 1. Check active user roles
    const { data: roleRecords } = await (supabase
      .from("user_roles") as any)
      .select("role, is_active")
      .eq("user_id", userId)
      .eq("is_active", true);

    const activeRoles: AppRole[] = ((roleRecords as any[])?.map((r) => r.role) || []) as AppRole[];

    // If user has exclusive staff roles (e.g. SUPER_ADMIN, DIRECTOR, COUNSELLOR) and no STUDENT role
    const staffOnlyRoles: AppRole[] = [
      "SUPER_ADMIN",
      "DIRECTOR",
      "COUNSELLOR",
      "EXAM_ADMIN",
      "ADMISSION_ADMIN",
      "CONTENT_MANAGER",
      "FACULTY",
    ];
    const isStaffOnly =
      activeRoles.length > 0 &&
      activeRoles.every((r) => staffOnlyRoles.includes(r)) &&
      !activeRoles.includes("STUDENT");

    if (isStaffOnly) {
      return {
        isAllowed: false,
        errorMessage: "This account is registered for Staff/Admin access. Please use the Staff Desk Login at /admin/login.",
      };
    }

    // 2. Check linked student profile
    const { data: existingStudent } = await (supabase
      .from("student_profiles") as any)
      .select("id, is_active")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingStudent) {
      if (existingStudent.is_active === false) {
        return {
          isAllowed: false,
          errorMessage: "Your student portal account is currently inactive. Please contact the admissions office.",
        };
      }
      return {
        isAllowed: true,
        studentProfileId: existingStudent.id,
      };
    }

    // 3. If no profile exists directly, check if an unassigned profile exists with matching phone
    const phone = userMetadata?.phone || null;
    if (phone) {
      const { data: unlinkedProfile } = await (supabase
        .from("student_profiles") as any)
        .select("id")
        .eq("phone", phone)
        .is("user_id", null)
        .maybeSingle();

      if (unlinkedProfile?.id) {
        await (supabase
          .from("student_profiles") as any)
          .update({ user_id: userId, updated_at: new Date().toISOString() })
          .eq("id", unlinkedProfile.id);

        return {
          isAllowed: true,
          studentProfileId: unlinkedProfile.id,
        };
      }
    }

    // 4. Check user_profiles or initialize linked student profile
    const { data: userProf } = await (supabase
      .from("user_profiles") as any)
      .select("id, full_name, email, phone, status")
      .eq("id", userId)
      .maybeSingle();

    if (userProf) {
      try {
        const { data: newStudent } = await (supabase
          .from("student_profiles") as any)
          .insert({
            user_id: userId,
            full_name: userProf.full_name || userMetadata?.full_name || "Student",
            phone: userProf.phone || userMetadata?.phone || "0000000000",
            email: userProf.email || "",
            dob: "2008-01-01",
            gender: "MALE",
            current_class: "Class 12",
          })
          .select("id")
          .maybeSingle();

        return {
          isAllowed: true,
          studentProfileId: newStudent?.id,
        };
      } catch {
        return {
          isAllowed: true,
        };
      }
    }

    // Allow student access by default if user is authenticated
    return {
      isAllowed: true,
    };
  } catch (err: any) {
    return {
      isAllowed: true,
    };
  }
}
