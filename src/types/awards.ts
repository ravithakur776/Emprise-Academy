export interface AwardEntry {
  id: number;
  number: string;
  name: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  category?: string;
  location?: string;
}
