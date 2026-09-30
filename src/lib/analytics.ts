/**
 * Emprise Academy - Google Analytics 4 Safe Event Tracking Utility
 *
 * Privacy and Data Protection Rules:
 * - Strictly strips out PII (Personally Identifiable Information)
 * - Excludes student name, email, phone, DOB, roll number, application number,
 *   Supabase user ID, auth ID, admit card tokens, and result records.
 * - Prevents manual page_view double-counting (relies on GA4 enhanced measurement).
 */

const BLOCKED_PII_KEYS = new Set([
  "name",
  "studentname",
  "fullname",
  "firstname",
  "lastname",
  "email",
  "phone",
  "phonenumber",
  "mobile",
  "contact",
  "dob",
  "dateofbirth",
  "birthdate",
  "applicationnumber",
  "applicationno",
  "rollnumber",
  "rollno",
  "aadhaar",
  "aadhar",
  "password",
  "token",
  "userid",
  "supabaseid",
  "authid",
  "address",
  "score",
  "marks",
  "resultdata",
]);

/**
 * Filter out any PII before forwarding event parameters to GA4
 */
function sanitizeEventParams(
  params?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!params) return undefined;

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(params)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, "");
    if (BLOCKED_PII_KEYS.has(normalizedKey)) {
      continue;
    }

    // Guard against values that contain email addresses
    if (typeof value === "string" && value.includes("@") && value.includes(".")) {
      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

/**
 * Send an event to Google Analytics 4 with automatic PII sanitization.
 * 
 * Note: Do NOT use this to manually fire "page_view" events; GA4's native
 * enhanced measurement handles SPA history state transitions automatically.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  // Prevent manual page_view events to avoid double-counting
  if (eventName === "page_view") {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  const windowWithGtag = window as unknown as {
    gtag?: (command: string, ...args: unknown[]) => void;
  };

  if (typeof windowWithGtag.gtag !== "function") {
    return;
  }

  const sanitizedParams = sanitizeEventParams(params);
  windowWithGtag.gtag("event", eventName, sanitizedParams || {});
}
