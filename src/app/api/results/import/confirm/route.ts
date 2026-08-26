import { NextRequest } from "next/server";
import { ResultImportEngine } from "@/services/result-import.service";
import { requireAnyRole } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { ValidatedResultRow } from "@/types/results";
import { ValidationError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce Role Authorization
    const adminUser = await requireAnyRole(["EXAM_ADMIN", "DIRECTOR"]);

    const body = await request.json();
    const { validRows, examId, academicYear } = body as {
      validRows: ValidatedResultRow[];
      examId: string;
      academicYear: string;
    };

    if (!validRows || !Array.isArray(validRows) || validRows.length === 0) {
      throw new ValidationError("No valid rows provided for import confirmation");
    }
    if (!examId) throw new ValidationError("Exam ID is required");
    if (!academicYear) throw new ValidationError("Academic year is required");

    // 2. Execute Bulk Upsert Transaction
    const result = await ResultImportEngine.executeImport(
      validRows,
      examId,
      academicYear,
      adminUser.id
    );

    return apiSuccess(result, {
      totalProcessed: result.totalProcessed,
      insertedCount: result.insertedCount,
      failedCount: result.failedCount,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
