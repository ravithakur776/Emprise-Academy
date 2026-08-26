import { NextResponse } from "next/server";
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from "@/types/api";
import { AppError } from "@/lib/errors";
import { ZodError } from "zod";

/**
 * Creates a standardized JSON success response.
 */
export function apiSuccess<T>(data: T, meta?: ApiSuccessResponse<T>["meta"], status = 200) {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
  return NextResponse.json(payload, { status });
}

/**
 * Creates a standardized JSON error response.
 */
export function apiError(
  message: string,
  statusCode = 500,
  code = "INTERNAL_SERVER_ERROR",
  details?: unknown
) {
  const payload: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  };
  return NextResponse.json(payload, { status: statusCode });
}

/**
 * Global Error Handler for Next.js Route Handlers and Server Actions
 */
export function handleApiError(error: unknown) {
  // Zod Validation Errors
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join("."),
      code: err.code,
      message: err.message,
    }));
    return apiError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
  }

  // Known Custom Application Errors
  if (error instanceof AppError) {
    return apiError(error.message, error.statusCode, error.code, error.details);
  }

  // Generic Error / Internal Server Error (Hide internal details in production)
  const isDev = process.env.NODE_ENV === "development";
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected server error occurred";

  console.error("[Unhandled API Error]:", error);

  return apiError(
    isDev ? errorMessage : "An unexpected internal server error occurred. Please try again later.",
    500,
    "INTERNAL_SERVER_ERROR",
    isDev && error instanceof Error ? { stack: error.stack } : undefined
  );
}
