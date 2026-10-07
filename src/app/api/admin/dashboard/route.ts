import { NextResponse } from "next/server";
import { DashboardService } from "@/services/dashboard.service";
import { requireAnyRole } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    await requireAnyRole([
      "SUPER_ADMIN",
      "DIRECTOR",
      "ADMISSION_ADMIN",
      "COUNSELLOR",
      "EXAM_ADMIN",
      "CONTENT_MANAGER",
    ]);

    const [metrics, recentLeads, sourceBreakdown] = await Promise.all([
      DashboardService.getMetrics(),
      DashboardService.getRecentLeads(5),
      DashboardService.getSourceStats(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        recentLeads,
        sourceBreakdown,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
