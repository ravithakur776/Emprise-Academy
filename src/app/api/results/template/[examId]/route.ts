import { NextRequest, NextResponse } from "next/server";
import { ResultImportEngine } from "@/services/result-import.service";
import { requireAnyRole } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    await requireAnyRole(["EXAM_ADMIN", "DIRECTOR"]);

    const resolvedParams = await params;
    const examId = resolvedParams.examId;

    if (!examId) throw new ValidationError("Exam ID is required");

    const buffer = await ResultImportEngine.generateExcelTemplate(examId);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Emprise_Result_Template_${examId.slice(0, 8)}.xlsx"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
