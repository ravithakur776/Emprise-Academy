import React from "react";
import { Badge, BadgeVariant } from "@/components/ui/badge/Badge";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "INTERESTED"
  | "COUNSELLING_SCHEDULED"
  | "CAMPUS_VISIT"
  | "CONVERTED"
  | "NOT_INTERESTED"
  | "LOST";

interface LeadStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  NEW: { label: "New Lead", variant: "primary" },
  CONTACTED: { label: "Contacted", variant: "info" },
  INTERESTED: { label: "Interested", variant: "accent" },
  COUNSELLING_SCHEDULED: { label: "Counselling Scheduled", variant: "warning" },
  CAMPUS_VISIT: { label: "Campus Visit", variant: "gold" },
  CONVERTED: { label: "Converted / Admitted", variant: "success" },
  NOT_INTERESTED: { label: "Not Interested", variant: "muted" },
  LOST: { label: "Lost", variant: "danger" },
};

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, size = "sm" }) => {
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
