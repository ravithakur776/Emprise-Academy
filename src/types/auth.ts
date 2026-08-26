/**
 * Authentication and Role-Based Authorization Types
 */

export type AppRole =
  | "SUPER_ADMIN"
  | "DIRECTOR"
  | "ADMISSION_ADMIN"
  | "COUNSELLOR"
  | "EXAM_ADMIN"
  | "CONTENT_MANAGER"
  | "FACULTY"
  | "STUDENT";

export interface UserRoleRecord {
  id: string;
  userId: string;
  role: AppRole;
  isActive: boolean;
  assignedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUserProfile {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  roles: AppRole[];
  isActive: boolean;
  studentProfileId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SessionContext {
  user: AuthUserProfile | null;
  isAuthenticated: boolean;
  hasRole: (role: AppRole) => boolean;
  hasAnyRole: (roles: AppRole[]) => boolean;
}
