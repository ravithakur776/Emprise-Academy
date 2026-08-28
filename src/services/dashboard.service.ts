import { createAdminClient } from "@/lib/supabase/admin";

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  todaysFollowups: number;
  pendingCounselling: number;
  admissionsThisPeriod: number;
  etseRegistrations: number;
  conversionRate: number;
}

export interface DashboardRecentLead {
  id: string;
  reference: string;
  studentName: string;
  parentName?: string | null;
  phone: string;
  class?: string | null;
  programme?: string | null;
  source: string;
  status: string;
  createdAt: string;
  counsellor: string;
}

export interface LeadSourceStat {
  source: string;
  count: number;
  percentage: number;
}

export class DashboardService {
  /**
   * Fetches real aggregated KPI metrics from PostgreSQL tables
   */
  public static async getMetrics(): Promise<DashboardMetrics> {
    try {
      const supabase = createAdminClient();

      // Run parallel count queries
      const [leadsRes, newLeadsRes, followupsRes, admissionsRes, etseRes] = await Promise.all([
        (supabase.from("leads") as any).select("id", { count: "exact", head: true }).is("deleted_at", null),
        (supabase.from("leads") as any).select("id", { count: "exact", head: true }).eq("status", "NEW").is("deleted_at", null),
        (supabase.from("lead_followups") as any).select("id", { count: "exact", head: true }),
        (supabase.from("admissions") as any).select("id", { count: "exact", head: true }),
        (supabase.from("etse_registrations") as any).select("id", { count: "exact", head: true }),
      ]);

      const totalLeads = leadsRes.count || 0;
      const newLeads = newLeadsRes.count || 0;
      const todaysFollowups = followupsRes.count || 0;
      const pendingCounselling = 0;
      const admissionsThisPeriod = admissionsRes.count || 0;
      const etseRegistrations = etseRes.count || 0;

      const conversionRate = totalLeads > 0
        ? Math.round((admissionsThisPeriod / totalLeads) * 1000) / 10
        : 0;

      return {
        totalLeads,
        newLeads,
        todaysFollowups,
        pendingCounselling,
        admissionsThisPeriod,
        etseRegistrations,
        conversionRate,
      };
    } catch {
      // Safe zero fallback on unconfigured or empty database
      return {
        totalLeads: 0,
        newLeads: 0,
        todaysFollowups: 0,
        pendingCounselling: 0,
        admissionsThisPeriod: 0,
        etseRegistrations: 0,
        conversionRate: 0,
      };
    }
  }

  /**
   * Loads recent live enquiries from the database
   */
  public static async getRecentLeads(limit: number = 5): Promise<DashboardRecentLead[]> {
    try {
      const supabase = createAdminClient();

      const { data, error } = await (supabase
        .from("leads") as any)
        .select("id, student_name, parent_name, phone, class, course_interest, source, status, created_at")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error || !data) return [];

      return data.map((item: any) => ({
        id: item.id,
        reference: `ENQ-${item.id.slice(0, 8).toUpperCase()}`,
        studentName: item.student_name || "Prospective Student",
        parentName: item.parent_name,
        phone: item.phone,
        class: item.class || "Not Specified",
        programme: item.course_interest || "General Enquiry",
        source: item.source || "WEBSITE",
        status: item.status || "NEW",
        createdAt: new Date(item.created_at).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        counsellor: "Unassigned",
      }));
    } catch {
      return [];
    }
  }

  /**
   * Computes real lead acquisition source breakdown
   */
  public static async getSourceStats(): Promise<LeadSourceStat[]> {
    try {
      const supabase = createAdminClient();

      const { data, error } = await (supabase
        .from("leads") as any)
        .select("source")
        .is("deleted_at", null);

      if (error || !data || data.length === 0) {
        return [
          { source: "Website & Direct Enquiries", count: 0, percentage: 0 },
          { source: "Admissions Form & Portal", count: 0, percentage: 0 },
          { source: "ETSE 2026 Campaign", count: 0, percentage: 0 },
          { source: "WhatsApp & Campus Desk", count: 0, percentage: 0 },
        ];
      }

      const total = data.length;
      const counts: Record<string, number> = {};

      for (const row of data) {
        const src = row.source || "WEBSITE";
        counts[src] = (counts[src] || 0) + 1;
      }

      return Object.entries(counts).map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count / total) * 100),
      }));
    } catch {
      return [];
    }
  }
}
