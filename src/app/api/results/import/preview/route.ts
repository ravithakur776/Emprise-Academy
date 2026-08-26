import { NextRequest } from "next/server";
import { ResultImportEngine } from "@/services/result-import.service";
import { requireAnyRole } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce Role Authorization
    await requireAnyRole(["EXAM_ADMIN", "DIRECTOR"]);

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const examId = formData.get("examId") as string | null;
    const academicYear = formData.get("academicYear") as string | null;

    if (!file) throw new ValidationError("No Excel or CSV file uploaded");
    if (!examId) throw new ValidationError("Exam ID is required");
    if (!academicYear) throw new ValidationError("Academic year is required");

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new ValidationError("File size exceeds maximum limit of 5MB");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Generate preview and validation report
    const report = await ResultImportEngine.parseAndValidate(buffer, examId, academicYear);

    return apiSuccess(report, {
      totalRows: report.totalRows,
      validRows: report.validRowsCount,
      errorsCount: report.invalidRowsCount,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
