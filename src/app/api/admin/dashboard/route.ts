import { NextResponse } from "next/server";
import { DashboardService } from "@/services/dashboard.service";

export async function GET() {
  try {
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
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load dashboard metrics",
        data: {
          metrics: {
            totalLeads: 0,
            newLeads: 0,
            todaysFollowups: 0,
            pendingCounselling: 0,
            admissionsThisPeriod: 0,
            etseRegistrations: 0,
            conversionRate: 0,
          },
          recentLeads: [],
          sourceBreakdown: [],
        },
      },
      { status: 500 }
    );
  }
}
