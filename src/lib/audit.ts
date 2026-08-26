import { createAdminClient } from "@/lib/supabase/admin";
import { headers } from "next/headers";

export interface AuditEventParams {
  userId?: string | null;
  action: string;
  entityName: string;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Persists an audit log entry for sensitive administrative and academic actions.
 */
export async function logAuditEvent(params: AuditEventParams) {
  try {
    const adminSupabase = createAdminClient();
    const headerList = await headers();
    const ipAddress =
      headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
      headerList.get("x-real-ip") ||
      "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    await (adminSupabase.from("audit_logs") as any).insert({
      user_id: params.userId || null,
      action: params.action,
      entity_name: params.entityName,
      entity_id: params.entityId || null,
      metadata: params.metadata ? JSON.parse(JSON.stringify(params.metadata)) : null,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
  } catch (err) {
    // Audit logging should not crash the primary flow, but log to server stderr
    console.error("[Audit Logging Failed]:", err, params);
  }
}
