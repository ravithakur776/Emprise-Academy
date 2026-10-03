/**
 * CANONICAL ETSE CONFIGURATION — Emprise Academy
 * Single Source of Truth for all ETSE 2026 Exam Dates and Scheduling.
 *
 * Official verified date: 25 October 2026 (Sunday)
 */

export interface EtseConfig {
  readonly examDate: string; // ISO date format YYYY-MM-DD
  readonly examDateDisplay: string; // Factual user-facing format: "25 October 2026"
  readonly examDay: string; // Day of week: "Sunday"
  readonly examDateIso: string; // ISO 8601 with Asia/Kolkata timezone (+05:30)
  readonly examTimeDisplay: string;
  readonly reportingTimeDisplay: string;
  readonly fullDisplay: string; // "Sunday, 25 October 2026"
  readonly fullDisplayWithTime: string; // "Sunday, 25 October 2026 (10:00 AM – 12:00 PM)"
  readonly shortDateDisplay: string; // "25 Oct 2026"
  readonly academicYear: string;
  readonly registrationFee: string;
  readonly mode: string;
}

export const ETSE_CONFIG: EtseConfig = {
  examDate: "2026-10-25",
  examDateDisplay: "25 October 2026",
  examDay: "Sunday",
  examDateIso: "2026-10-25T10:00:00+05:30",
  examTimeDisplay: "10:00 AM – 12:00 PM (2 Hours)",
  reportingTimeDisplay: "09:15 AM",
  fullDisplay: "Sunday, 25 October 2026",
  fullDisplayWithTime: "Sunday, 25 October 2026 (10:00 AM – 12:00 PM)",
  shortDateDisplay: "25 Oct 2026",
  academicYear: "2026-27",
  registrationFee: "FREE (Zero Application Fee)",
  mode: "Offline (Pen & Paper OMR Format)",
};

/**
 * Safe date formatter ensuring Indian Standard Time (Asia/Kolkata)
 * Prevents UTC conversion bugs where midnight UTC could shift 25 Oct to 24 Oct.
 */
export function formatEtseExamDate(
  rawDate?: string | Date | null,
  options?: { includeWeekday?: boolean; includeTime?: boolean }
): string {
  if (!rawDate) {
    return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
  }

  try {
    const dateStr = typeof rawDate === "string" ? rawDate : rawDate.toISOString();
    if (dateStr.startsWith("2026-10-25")) {
      if (options?.includeTime) {
        return ETSE_CONFIG.fullDisplayWithTime;
      }
      return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
    }

    const d = new Date(rawDate);
    if (isNaN(d.getTime())) {
      return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
    }

    const formatted = d.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: options?.includeWeekday ? "long" : undefined,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted;
  } catch {
    return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
  }
}
