import { NextRequest } from "next/server";
import { etseRegistrationSchema } from "@/validations/etse.validation";
import { ETSEService } from "@/services/etse.service";
import { getCurrentUser } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = etseRegistrationSchema.parse(body);

    const currentUser = await getCurrentUser();
    const result = await ETSEService.registerStudent(
      validatedInput,
      currentUser?.userId || null
    );

    return apiSuccess(
      {
        applicationNumber: result.applicationNumber,
        status: result.registration ? (result.registration as any).status : "REGISTERED",
        admitCardReady: !!result.admitCard,
        admitCardToken: result.admitCard ? (result.admitCard as any).verification_token : undefined,
      },
      {
        message: "ETSE 2026 Registration successful. Admit card generated.",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
