import { NextRequest } from "next/server";
import { resultSearchSchema } from "@/validations/result.validation";
import { ResultSearchService } from "@/services/result-search.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = resultSearchSchema.parse(body);

    const result = await ResultSearchService.searchPublicResult(validatedInput);

    return apiSuccess(result, {
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
