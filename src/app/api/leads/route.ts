import { NextRequest } from "next/server";
import { leadIntakeSchema } from "@/validations/crm.validation";
import { LeadService } from "@/services/lead.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = leadIntakeSchema.parse(body);

    const result = await LeadService.captureLead(validatedInput);

    return apiSuccess(
      result,
      {
        message: "Your enquiry has been received. Our academic counsellor will contact you shortly.",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
