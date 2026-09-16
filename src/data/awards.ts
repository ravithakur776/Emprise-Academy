import { AwardEntry } from "@/types/awards";

/**
 * Centralized Awards Data Model for Emprise Academy Mathura.
 * NOTE: Exactly 7 award entries structured as requested in Step 11B.
 * All fields are initialized with empty values until official verified records
 * and photographs are provided. Zero fabricated awards or dates are included.
 */
export const AWARDS_DATA: AwardEntry[] = [
  {
    id: 1,
    number: "01",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 2,
    number: "02",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 3,
    number: "03",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 4,
    number: "04",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 5,
    number: "05",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 6,
    number: "06",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
  {
    id: 7,
    number: "07",
    name: "",
    organization: "",
    year: "",
    description: "",
    image: "",
  },
];

export const hasVerifiedAwards = (): boolean => {
  return AWARDS_DATA.some((award) => award.name.trim() !== "");
};

export const getVerifiedAwards = (): AwardEntry[] => {
  return AWARDS_DATA.filter((award) => award.name.trim() !== "");
};
