import { AwardRecord } from "@/types/awards";

/**
 * Verified Awards & Institutional Accolades of Emprise Academy Mathura.
 * NOTE: As per specifications, real award records (01–07) will be populated
 * here once the verified archive documentation is provided.
 * No fabricated records or simulated dates are included.
 */
export const AWARD_RECORDS: AwardRecord[] = [];

export const getApprovedAwards = (): AwardRecord[] => {
  return AWARD_RECORDS;
};

export const hasAwardsData = (): boolean => {
  return AWARD_RECORDS.length > 0;
};
