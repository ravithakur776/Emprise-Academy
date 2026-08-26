import { CMSService } from "@/services/cms.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const courses = await CMSService.getCourses();
    return apiSuccess(courses);
  } catch (error) {
    return handleApiError(error);
  }
}
