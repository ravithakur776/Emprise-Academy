import { createClientServer } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ValidationError } from "@/lib/errors";

export type StorageBucket =
  | "student-photos"
  | "student-documents"
  | "faculty-photos"
  | "director-photos"
  | "gallery-images"
  | "blog-images"
  | "course-brochures";

export const STORAGE_CONFIG: Record<
  StorageBucket,
  { isPublic: boolean; maxSizeBytes: number; allowedMimeTypes: string[] }
> = {
  "student-photos": {
    isPublic: false,
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  "student-documents": {
    isPublic: false,
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
  },
  "faculty-photos": {
    isPublic: true,
    maxSizeBytes: 2 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  "director-photos": {
    isPublic: true,
    maxSizeBytes: 2 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  "gallery-images": {
    isPublic: true,
    maxSizeBytes: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  "blog-images": {
    isPublic: true,
    maxSizeBytes: 3 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  "course-brochures": {
    isPublic: true,
    maxSizeBytes: 10 * 1024 * 1024,
    allowedMimeTypes: ["application/pdf"],
  },
};

export class StorageService {
  /**
   * Validates file constraints before upload
   */
  public static validateFile(bucket: StorageBucket, file: { size: number; type: string }) {
    const config = STORAGE_CONFIG[bucket];
    if (!config) {
      throw new ValidationError(`Unknown storage bucket: ${bucket}`);
    }

    if (file.size > config.maxSizeBytes) {
      const maxMb = (config.maxSizeBytes / (1024 * 1024)).toFixed(1);
      throw new ValidationError(`File exceeds maximum allowed size of ${maxMb}MB`);
    }

    if (!config.allowedMimeTypes.includes(file.type)) {
      throw new ValidationError(
        `Invalid file type (${file.type}). Allowed formats: ${config.allowedMimeTypes.join(", ")}`
      );
    }
  }

  /**
   * Generates a temporary secure signed URL for private student assets
   */
  public static async getSignedUrl(
    bucket: StorageBucket,
    filePath: string,
    expiresInSeconds = 3600
  ): Promise<string> {
    const supabase = await createClientServer();
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresInSeconds);

    if (error || !data) {
      throw new Error(`Failed to generate signed URL: ${error?.message}`);
    }

    return data.signedUrl;
  }

  /**
   * Gets the public URL for public bucket assets
   */
  public static getPublicUrl(bucket: StorageBucket, filePath: string): string {
    const config = STORAGE_CONFIG[bucket];
    if (!config.isPublic) {
      throw new Error(`Cannot retrieve public URL for private bucket: ${bucket}`);
    }

    const admin = createAdminClient();
    const { data } = admin.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
}
