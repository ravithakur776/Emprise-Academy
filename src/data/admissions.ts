/**
 * Official Verified Admissions & Contact Configuration for Emprise Academy
 * Single source of truth for Phase 4.7 Admissions & Lead Conversion Ecosystem
 */

export interface AdmissionProgrammeChoice {
  id: string;
  title: string;
  badge: string;
  targetAudience: string;
  description: string;
  features: string[];
  href: string;
  ctaLabel: string;
}

export interface AdmissionStep {
  step: string;
  title: string;
  description: string;
}

export interface AdmissionFaqItem {
  question: string;
  answer: string;
}

export const MAIN_ADMISSIONS_DATA = {
  meta: {
    title: "Admissions | IIT-JEE, NEET & Foundation Coaching in Mathura | Emprise Academy",
    description:
      "Apply for admissions at Emprise Academy Mathura. Structured preparation for IIT-JEE (Main & Advanced), NEET-UG Medical, and Foundation (Classes 8–10). Book free academic counselling.",
    keywords: [
      "Admissions in Emprise Academy",
      "IIT JEE Coaching Admission Mathura",
      "NEET Coaching Admission Mathura",
      "Foundation Coaching Admission Mathura",
      "Academic Counselling Mathura",
      "Emprise Academy Mathura Fees and Batches",
    ],
    canonical: "https://empriseacademy.com/admissions",
  },
  hero: {
    eyebrow: "ADMISSIONS OPEN 2026–27",
    h1: "Admissions at Emprise Academy",
    subheading: "Find the Right Programme for Your Academic Journey.",
    paragraph:
      "At Emprise Academy, admissions begin with honest academic guidance. Whether preparing for IIT-JEE, NEET-UG, or middle-school Foundation, we evaluate each student's current conceptual grasp and recommend the optimal learning pathway without commercial pressure.",
    primaryCta: { label: "Book Free Counselling", href: "#counselling" },
    secondaryCta: { label: "Explore Programmes", href: "#programmes" },
  },
  programmeChoices: [
    {
      id: "jee-admissions",
      title: "IIT-JEE Engineering Programme",
      badge: "Classes 11, 12 & Droppers",
      targetAudience: "Engineering aspirants aiming for JEE Main & JEE Advanced",
      description:
        "Comprehensive 2-Year, 1-Year, and Dropper batches focused on physical derivations, calculus visualization, and multi-concept problem solving.",
      features: [
        "In-depth Physics, Chemistry & Mathematics syllabus coverage",
        "Daily Practice Problems (DPPs) with personal doubt desks",
        "National-standard full-syllabus mock tests with rank analysis",
      ],
      href: "/iit-jee-coaching-mathura",
      ctaLabel: "Explore JEE Programmes →",
    },
    {
      id: "neet-admissions",
      title: "NEET-UG Medical Programme",
      badge: "Classes 11, 12 & Droppers",
      targetAudience: "Medical aspirants aiming for government MBBS / BDS seats",
      description:
        "Rigorous medical entrance training with line-by-line NCERT Biology mastery, conceptual physics numericals, and high-frequency 720-mark mock drills.",
      features: [
        "Complete NCERT textbook dissection for Botany & Zoology",
        "Extensive assertion-reason and diagrammatic MCQ drills",
        "OMR-based timed mock series mirroring the official NTA pattern",
      ],
      href: "/neet-coaching-mathura",
      ctaLabel: "Explore NEET Programmes →",
    },
    {
      id: "foundation-admissions",
      title: "Foundation Coaching Programme",
      badge: "Classes 8, 9 & 10",
      targetAudience: "Middle-school & secondary students building strong fundamentals",
      description:
        "Age-appropriate academic enrichment in Mathematics, Science, and Logical Reasoning, nurturing curiosity and disciplined habits without exam pressure.",
      features: [
        "Concept derivations from first principles in Science & Maths",
        "School board syllabus harmony with higher-order thinking (HOTS)",
        "Smooth academic bridge for senior secondary JEE and NEET",
      ],
      href: "/foundation-coaching-mathura",
      ctaLabel: "Explore Foundation Programmes →",
    },
  ] as AdmissionProgrammeChoice[],
  process: [
    {
      step: "01",
      title: "Explore the Programme",
      description: "Review syllabus structure, batch options, and curriculum pacing for your target class and competitive stream.",
    },
    {
      step: "02",
      title: "Book Academic Counselling",
      description: "Schedule an in-person or telephonic consultation with our academic mentorship team in Mathura.",
    },
    {
      step: "03",
      title: "Discuss Academic Goals",
      description: "Evaluate your child's current science/maths proficiency, target examinations, and optimal study routines.",
    },
    {
      step: "04",
      title: "Understand Batch & Schedule",
      description: "Receive detailed information on class timings, study material distribution, doubt desks, and test series.",
    },
    {
      step: "05",
      title: "Campus Visit & Consultation",
      description: "Visit our Mathura campus to meet academic faculties and discuss preparation pathways.",
    },
    {
      step: "06",
      title: "Complete Admission Formalities",
      description: "Submit registration documentation, verify eligible scholarship concessions, and receive your welcome kit.",
    },
  ] as AdmissionStep[],
  parentGuidance: {
    heading: "For Parents: A Transparent, Supportive Admission Process",
    subheading:
      "We believe selecting a coaching institute should be an informed, stress-free decision centered on your child's long-term growth.",
    points: [
      {
        title: "No Mandatory Commitments Before Counselling",
        desc: "We encourage parents to attend a free counselling session first to understand our methodology before making any admission decisions.",
      },
      {
        title: "Transparent Fee & Scholarship Slabs",
        desc: "All tuition fees and merit concessions are clearly documented with zero hidden charges or ambiguous terms.",
      },
      {
        title: "Direct Interaction with Leadership",
        desc: "Founding directors Sushil Dagur and Rakesh Kumar are actively available at the Mathura campus to advise parents and students.",
      },
      {
        title: "Continuous Academic Reporting",
        desc: "Parents receive regular attendance notifications, test performance scorecards, and constructive feedback throughout the session.",
      },
    ],
  },
  faqs: [
    {
      question: "What is the admission procedure at Emprise Academy?",
      answer:
        "The admission procedure starts with a free academic consultation where our mentors review your child's academic goals. Following the discussion, you can complete enrolment by submitting basic student details and marksheet verification at our Mathura campus.",
    },
    {
      question: "Is an entrance test mandatory for admission?",
      answer:
        "An entrance test is not mandatory for standard batch enrolment, but students wishing to avail merit-based fee concessions are encouraged to appear in our annual ETSE test or take an in-person diagnostic assessment.",
    },
    {
      question: "When do new batches commence at Emprise Academy?",
      answer:
        "New academic sessions typically begin in April and May for foundation and senior secondary classes, with dedicated dropper batches starting post-board and entrance examination results.",
    },
    {
      question: "Can outstation or nearby district students enroll?",
      answer:
        "Yes. Students from Mathura and surrounding districts (Vrindavan, Kosi Kalan, Bharatpur, Hathras, Agra) enroll regularly. Our counselling desk assists with batch schedules and nearby hostel/transportation guidance.",
    },
    {
      question: "What documents are required during admission?",
      answer:
        "Students need to provide a copy of their previous class marksheet, 2 passport-sized photographs, and a valid photo ID (such as an Aadhaar card or school ID).",
    },
    {
      question: "How can parents schedule a campus visit?",
      answer:
        "Parents can schedule a campus visit by submitting the academic counselling form on this website or visiting our campus in Mathura.",
    },
    {
      question: "What is the batch size at Emprise Academy?",
      answer:
        "We maintain optimal, manageable batch sizes to ensure every student receives individual attention, regular homework checks, and direct access to faculty for doubt resolution.",
    },
    {
      question: "Where is Emprise Academy located in Mathura?",
      answer:
        "Our campus is located in Mathura, Uttar Pradesh. Admissions counselling and classroom programs operate throughout the academic session.",
    },
  ] as AdmissionFaqItem[],
};

export const MAIN_CONTACT_DATA = {
  meta: {
    title: "Contact Emprise Academy | IIT-JEE & NEET Coaching in Mathura",
    description:
      "Get in touch with Emprise Academy Mathura. Explore IIT-JEE, NEET-UG, and Foundation courses or schedule an in-person academic counselling session.",
    keywords: [
      "Contact Emprise Academy",
      "Emprise Academy Mathura Address",
      "IIT JEE Coaching in Mathura Contact",
      "NEET Coaching in Mathura Admissions",
      "Mathura Coaching Centre Location",
    ],
    canonical: "https://empriseacademy.com/contact",
  },
  hero: {
    eyebrow: "GET IN TOUCH",
    h1: "Contact Emprise Academy",
    subheading: "Mathura Campus • Dedicated Academic Guidance Desk",
    paragraph:
      "Have questions about batch schedules, course syllabi, scholarship eligibility, or admission formalities? Speak directly with our academic counsellors or visit our Mathura campus.",
  },
  contactDetails: {
    institutionName: "Emprise Academy",
    address: {
      line1: "Mathura Campus",
      city: "Mathura",
      state: "Uttar Pradesh",
      pincode: "281001",
      country: "India",
      fullAddress: "Mathura, Uttar Pradesh",
    },
    phone: null as string | null,
    phoneTel: null as string | null,
    email: null as string | null,
    whatsapp: null as string | null,
    whatsappLink: null as string | null,
    workingHours: null as string | null,
    googleMapsEmbedUrl: null as string | null,
    googleMapsDirectionsUrl: null as string | null,
  },
};

