import { createClientServer } from "@/lib/supabase/server";
import { AppRole, AuthUserProfile } from "@/types/auth";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";

/**
 * Retrieves the currently authenticated user profile with active roles.
 */
export async function getCurrentUser(): Promise<AuthUserProfile | null> {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch profile
  const { data: profile } = await (supabase
    .from("user_profiles") as any)
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch active roles
  const { data: roleRecords } = await (supabase
    .from("user_roles") as any)
    .select("role")
    .eq("user_id", user.id)
    .eq("is_active", true);

  const roles = ((roleRecords as any[])?.map((r) => r.role as AppRole) || []) as AppRole[];

  // Fetch linked student profile ID if any
  const { data: studentRecord } = await (supabase
    .from("student_profiles") as any)
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    userId: user.id,
    email: user.email || (profile as any)?.email || "",
    fullName: (profile as any)?.full_name || user.user_metadata?.full_name || "User",
    phone: (profile as any)?.phone || null,
    avatarUrl: (profile as any)?.avatar_url || null,
    roles,
    isActive: (profile as any)?.status === "ACTIVE" || true,
    studentProfileId: (studentRecord as any)?.id || null,
    createdAt: (profile as any)?.created_at || new Date().toISOString(),
    updatedAt: (profile as any)?.updated_at || new Date().toISOString(),
  };
}

/**
 * Enforces that a user is authenticated. Throws UnauthorizedError if not.
 */
export async function requireAuth(): Promise<AuthUserProfile> {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError("You must be logged in to access this resource.");
  }
  return user;
}

/**
 * Enforces that a user has a specific role. Throws ForbiddenError if unauthorized.
 */
export async function requireRole(requiredRole: AppRole): Promise<AuthUserProfile> {
  const user = await requireAuth();
  if (!user.roles.includes(requiredRole) && !user.roles.includes("SUPER_ADMIN")) {
    throw new ForbiddenError(
      `Access denied. Requires '${requiredRole}' permissions.`
    );
  }
  return user;
}

/**
 * Enforces that a user has at least one of the specified roles.
 */
export async function requireAnyRole(allowedRoles: AppRole[]): Promise<AuthUserProfile> {
  const user = await requireAuth();
  const hasAllowed =
    user.roles.includes("SUPER_ADMIN") ||
    allowedRoles.some((role) => user.roles.includes(role));

  if (!hasAllowed) {
    throw new ForbiddenError("Access denied. Insufficient role permissions.");
  }
  return user;
}

/**
 * Enforces that a user is a student and returns their profile ID.
 */
export async function requireStudent(): Promise<{ user: AuthUserProfile; studentProfileId: string }> {
  const user = await requireAuth();
  if (!user.studentProfileId) {
    throw new ForbiddenError("No student profile is linked to this account.");
  }
  return { user, studentProfileId: user.studentProfileId };
}
