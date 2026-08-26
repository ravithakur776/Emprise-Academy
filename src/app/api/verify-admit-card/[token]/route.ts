import { NextRequest } from "next/server";
import { AdmitCardService } from "@/services/admit-card.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const resolvedParams = await params;
    const token = resolvedParams.token;

    if (!token || token.trim().length < 5) {
      throw new ValidationError("Invalid or missing verification token");
    }

    const verificationData = await AdmitCardService.verifyPublicAdmitCard(token);

    return apiSuccess(verificationData);
  } catch (error) {
    return handleApiError(error);
  }
}
