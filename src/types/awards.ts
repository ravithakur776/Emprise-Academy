export interface AwardRecord {
  id: string;
  number: string; // "01" through "07"
  title: string;
  year: string;
  awardingOrganization: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  location?: string;
  featured?: boolean;
}
