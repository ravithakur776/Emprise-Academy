import React from "react";
import { Badge, BadgeVariant } from "@/components/ui/badge/Badge";

export type AdmissionStatus =
  | "ENQUIRY"
  | "COUNSELLING"
  | "CAMPUS_VISIT"
  | "APPLICATION_STARTED"
  | "APPLICATION_SUBMITTED"
  | "ADMITTED"
  | "CANCELLED";

interface AdmissionStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  ENQUIRY: { label: "Enquiry", variant: "primary" },
  COUNSELLING: { label: "Counselling", variant: "info" },
  CAMPUS_VISIT: { label: "Campus Visit", variant: "warning" },
  APPLICATION_STARTED: { label: "App Started", variant: "accent" },
  APPLICATION_SUBMITTED: { label: "App Submitted", variant: "gold" },
  ADMITTED: { label: "Admitted", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "danger" },
};

export const AdmissionStatusBadge: React.FC<AdmissionStatusBadgeProps> = ({ status, size = "sm" }) => {
  const config = statusConfig[status.toUpperCase()] || {
    label: status,
    variant: "secondary",
  };

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
};
