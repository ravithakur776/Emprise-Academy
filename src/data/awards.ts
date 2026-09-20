import { AwardEntry } from "@/types/awards";

/**
 * Centralized Awards Data Model for Emprise Academy Mathura.
 * Verified Official Records & Felicitation Archive.
 * Exactly 8 authentic honors received by Emprise Academy and its founding leadership.
 */
export const AWARDS_DATA: AwardEntry[] = [
  {
    id: 1,
    number: "01",
    name: "Avantika Acharya Shiromani Samman",
    organization: "Avantika — A Group of Contemporary Artists & Intellectuals",
    year: "2017",
    location: "Hindi Bhawan, New Delhi",
    category: "National Educational Honor",
    description:
      "Conferred at Hindi Bhawan, New Delhi, honoring distinguished leadership and outstanding pedagogical contribution to competitive education and student mentorship.",
    image: "/images/awards/acharya-shiromani-samman.jpg",
    imagePosition: "object-top",
  },
  {
    id: 2,
    number: "02",
    name: "Best Coaching Institute Award — Agra Region",
    organization: "The Times of India (The Times Group Brand Icons)",
    year: "2017",
    location: "Agra Region, Uttar Pradesh",
    category: "Regional Excellence Award",
    description:
      "Honored by The Times of India at The Times Group Brand Icons ceremony as the leading competitive coaching institution across the Agra region for stellar results in IIT-JEE & NEET.",
    image: "/images/awards/times-of-india-best-coaching-award.jpg",
  },
  {
    id: 3,
    number: "03",
    name: "Best of My City Award",
    organization: "Amar Ujala",
    year: "2023",
    location: "Uttar Pradesh",
    category: "State Educational Honor",
    description:
      "Presented by Amar Ujala and felicitated by Mr. Yogendra Upadhyay (Hon'ble Minister of State for Higher Education, Government of Uttar Pradesh), celebrating transformative educational impact and leadership.",
    image: "/images/awards/amar-ujala-best-of-my-city-award.jpeg",
  },
  {
    id: 4,
    number: "04",
    name: "Golden Star Award — Best Promising Institute in IIT-JEE & NEET",
    organization: "APS Research & Media",
    year: "2018",
    location: "New Delhi",
    category: "National Excellence Award",
    description:
      "Prestigious national recognition presented by renowned actress and Member of Parliament Kirron Kher at New Delhi, celebrating benchmark academic excellence in engineering and medical entrance coaching.",
    image: "/images/awards/golden-star-award-new-delhi.jpg",
  },
  {
    id: 5,
    number: "05",
    name: "Education Excellence & Partnership Felicitation",
    organization: "i30 Learning Centre / Blended 2.0 Education Summit",
    year: "2022",
    location: "National Education Summit",
    category: "Academic Partnership & Innovation",
    description:
      "Special honor presented by acclaimed Bollywood actor and education philanthropist Mr. Vivek Anand Oberoi at the National Education Summit, recognizing excellence in collaborative learning.",
    image: "/images/awards/education-summit-vivek-oberoi.jpg",
  },
  {
    id: 6,
    number: "06",
    name: "The Legend of Uttar Pradesh Award (Mathura)",
    organization: "Bharat 24 News Channel",
    year: "2023",
    location: "Mathura, Uttar Pradesh",
    category: "State Honors & Distinction",
    description:
      "Presented by Bharat 24 News Channel and felicitated by Mr. Yogendra Upadhyay (Hon'ble Minister of State for Higher Education, Govt. of UP), acknowledging over a decade of sustained excellence in competitive mentoring in Mathura.",
    image: "/images/awards/legend-of-uttar-pradesh-award.jpeg",
  },
  {
    id: 7,
    number: "07",
    name: "Education Summit Felicitation at Raj Bhavan",
    organization: "Governor's Secretariat, Raj Bhavan Uttar Pradesh",
    year: "2019",
    location: "Raj Bhavan, Lucknow",
    category: "Gubernatorial Honor",
    description:
      "Distinguished felicitation by Shri Ram Naik, Hon'ble Governor of Uttar Pradesh, during the Education Summit at Raj Bhavan, Lucknow, acknowledging selfless dedication to student academic empowerment.",
    image: "/images/awards/raj-bhavan-governor-ram-naik.jpg",
  },
  {
    id: 8,
    number: "08",
    name: "Hindustan Young Achievers Award",
    organization: "Hindustan Newspaper (HT Media Group)",
    year: "2024",
    location: "Uttar Pradesh",
    category: "Media & Academic Recognition",
    description:
      "Honored by Hindustan Newspaper at the Young Achievers Felicitation ceremony, applauding Emprise Academy's steadfast commitment and proven track record in nurturing regional talent for national competitive exams.",
    image: "/images/awards/hindustan-young-achievers-award.png",
    imagePosition: "object-top",
  },
];

export const hasVerifiedAwards = (): boolean => {
  return AWARDS_DATA.length > 0 && AWARDS_DATA.some((award) => award.name.trim() !== "");
};

export const getVerifiedAwards = (): AwardEntry[] => {
  return AWARDS_DATA.filter((award) => award.name.trim() !== "");
};
