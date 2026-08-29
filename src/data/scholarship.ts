/**
 * Official Verified Scholarship Configuration for Emprise Academy
 * Single source of truth for Phase 4.6 Scholarship Programme Ecosystem
 */

export interface ScholarshipTypeItem {
  id: string;
  title: string;
  badge: string;
  targetAudience: string;
  description: string;
  evaluationMethod: string;
  highlights: string[];
}

export interface ScholarshipStep {
  step: string;
  title: string;
  description: string;
}

export interface ScholarshipFaqItem {
  question: string;
  answer: string;
}

export const MAIN_SCHOLARSHIP_DATA = {
  meta: {
    title: "JEE & NEET Scholarship Programme | Emprise Academy Mathura",
    description:
      "Explore merit-based scholarship opportunities for IIT-JEE, NEET-UG, and Foundation at Emprise Academy Mathura. Transparent eligibility, talent search evaluations, and academic counselling.",
    keywords: [
      "JEE Scholarship in Mathura",
      "NEET Scholarship in Mathura",
      "Emprise Academy Scholarship",
      "ETSE 2026 Scholarship",
      "Merit Scholarship Mathura",
      "Foundation Scholarship Mathura",
      "Coaching Fee Concession Mathura",
    ],
    canonical: "https://empriseacademy.com/scholarship",
  },
  hero: {
    eyebrow: "SCHOLARSHIP PROGRAMME",
    h1: "JEE & NEET Scholarship Programme – Emprise Academy",
    subheading: "Academic Potential Deserves the Right Opportunity.",
    paragraph:
      "At Emprise Academy, we believe that serious academic dedication should be recognized and supported. Our scholarship programme provides transparent, merit-based tuition fee concessions for deserving students preparing for IIT-JEE, NEET-UG, and Foundation courses in Mathura.",
    primaryCta: { label: "Check Eligibility", href: "#eligibility" },
    secondaryCta: { label: "Book Free Counselling", href: "#counselling" },
  },
  valueProposition: {
    heading: "Why We Offer Merit Scholarships",
    subheading:
      "Education should empower capable students to achieve their highest competitive potential through structured, transparent support.",
    pillars: [
      {
        title: "Recognizing Academic Effort",
        desc: "Rewarding consistent hard work, intellectual curiosity, and high performance in school and competitive evaluations.",
      },
      {
        title: "Reducing Financial Barriers",
        desc: "Helping deserving students access national-standard coaching and study materials without unnecessary financial strain.",
      },
      {
        title: "Transparent Evaluation Criteria",
        desc: "All scholarship decisions are strictly merit-based, objective, and communicated clearly to parents.",
      },
      {
        title: "Equal Opportunity in Mathura",
        desc: "Ensuring local students receive the same high-caliber mentorship that top national coaching hubs offer right in their hometown.",
      },
    ],
  },
  eligibility: {
    heading: "Who Can Apply for Scholarships?",
    subheading:
      "Our scholarship pathways are open to students across various academic stages and competitive aspirations.",
    categories: [
      {
        title: "Foundation Aspirants (Classes 8, 9 & 10)",
        eligibility: "Students currently enrolled in or moving to Classes 8, 9, or 10.",
        criteria: "Evaluated through the annual ETSE talent search exam or previous school academic records.",
      },
      {
        title: "IIT-JEE Aspirants (Classes 11, 12 & Droppers)",
        eligibility: "Students entering Class 11/12 (PCM) or 12th pass students preparing for JEE Main & Advanced.",
        criteria: "Evaluated through diagnostic scholarship assessments, Class 10 Board percentages, or JEE percentile benchmarks.",
      },
      {
        title: "NEET-UG Aspirants (Classes 11, 12 & Droppers)",
        eligibility: "Students entering Class 11/12 (PCB) or 12th pass students aiming for medical entrance.",
        criteria: "Evaluated through diagnostic scholarship assessments, Board science marks, or previous NEET scorecards.",
      },
      {
        title: "Olympiad & School Board Toppers",
        eligibility: "School rank holders, NTSE qualifiers, and Olympiad medalists.",
        criteria: "Direct merit-concession evaluation based on verified certificates and academic transcripts.",
      },
    ],
  },
  scholarshipTypes: [
    {
      id: "etse-merit",
      title: "ETSE Talent Search Merit Scholarship",
      badge: "Flagship Annual Pathway",
      targetAudience: "Students in Classes 7th to 10th",
      description:
        "Awarded through the annual Emprise Talent Search Examination (ETSE 2026), providing merit-based tuition fee concessions based on test performance.",
      evaluationMethod: "Objective Pen-and-Paper Assessment in Science, Mathematics & Mental Ability.",
      highlights: [
        "Completely free registration for all eligible candidates",
        "Transparent rank and percentile-based fee concession slabs",
        "Detailed performance scorecard and national benchmarking",
      ],
    },
    {
      id: "board-merit",
      title: "Board Academic Excellence Concession",
      badge: "Academic Merit",
      targetAudience: "Class 10 & 12 Board High Achievers",
      description:
        "Special academic concessions for students who have achieved top percentage marks in CBSE, ICSE, or State Board examinations.",
      evaluationMethod: "Document verification of official board marksheets during admission counselling.",
      highlights: [
        "Recognizes verified board examination percentage scores",
        "Applicable directly toward 1-Year and 2-Year classroom programmes",
        "Streamlined document verification at our Mathura campus",
      ],
    },
    {
      id: "diagnostic-merit",
      title: "Diagnostic Admission Scholarship",
      badge: "Rolling Evaluation",
      targetAudience: "JEE & NEET Droppers / Lateral Enrolments",
      description:
        "Rolling scholarship evaluations conducted through an in-person academic diagnostic test at our Mathura campus.",
      evaluationMethod: "Subject-wise diagnostic test and personal consultation with department mentors.",
      highlights: [
        "Evaluates conceptual strengths in Physics, Chemistry, Maths / Biology",
        "Personalized feedback and academic roadmap session included",
        "Fast-track decision within 48 hours of test completion",
      ],
    },
  ] as ScholarshipTypeItem[],
  process: [
    {
      step: "01",
      title: "Check Eligibility",
      description: "Review the criteria for your target class and competitive stream (JEE, NEET, or Foundation).",
    },
    {
      step: "02",
      title: "Register for Evaluation",
      description: "Apply online for ETSE 2026 or schedule a diagnostic assessment at our Mathura academic block.",
    },
    {
      step: "03",
      title: "Take the Assessment",
      description: "Appear for the scheduled scholarship examination or submit your verified board marksheets.",
    },
    {
      step: "04",
      title: "Merit Scorecard Review",
      description: "Our academic committee evaluates your performance, subject accuracy, and conceptual potential.",
    },
    {
      step: "05",
      title: "Scholarship Decision",
      description: "Receive a transparent official scholarship letter detailing the awarded tuition fee concession.",
    },
    {
      step: "06",
      title: "Enrolment & Onboarding",
      description: "Complete your admission with the applicable fee concession applied directly to your batch fees.",
    },
  ] as ScholarshipStep[],
  parentGuidance: {
    heading: "For Parents: Our Transparent Commitment",
    subheading:
      "We believe financial discussions regarding your child's education should be honest, straightforward, and pressure-free.",
    points: [
      {
        title: "No Hidden Conditions",
        desc: "All scholarship concessions apply directly to tuition fees as clearly stated in the official scholarship letter.",
      },
      {
        title: "Objective Evaluation",
        desc: "Scholarship decisions are based entirely on verified academic credentials or transparent test scores.",
      },
      {
        title: "Direct Access to Counsellors",
        desc: "Our academic counselling desk is always available to walk you through fee structures and batch schedules in person.",
      },
      {
        title: "Supportive Environment",
        desc: "Every student at Emprise receives the exact same high standard of teaching, doubt support, and study materials regardless of scholarship status.",
      },
    ],
  },
  etseRelationship: {
    eyebrow: "ANNUAL TALENT SEARCH TEST",
    title: "Emprise Talent Search Examination (ETSE 2026)",
    description:
      "ETSE is our flagship scholarship and talent discovery examination conducted annually for middle-school and secondary students across Western Uttar Pradesh. Outstanding performers earn merit-based fee concessions for our Foundation, JEE, and NEET classroom batches.",
    examDate: "6 September 2026",
    eligibleClasses: "Classes 7th to 10th",
    registrationFee: "FREE (Zero Application Fee)",
    ctaLabel: "Learn More About ETSE 2026",
    ctaHref: "/etse-2026",
  },
  faqs: [
    {
      question: "What is the Emprise Academy Scholarship Programme?",
      answer:
        "The Emprise Academy Scholarship Programme is a merit-based initiative designed to support dedicated and capable students preparing for IIT-JEE, NEET-UG, and Foundation courses through tuition fee concessions.",
    },
    {
      question: "How are scholarship decisions determined?",
      answer:
        "Scholarships are determined through objective criteria: performance in our annual talent search examination (ETSE), verified board exam percentages, or in-person diagnostic test assessments conducted at our Mathura campus.",
    },
    {
      question: "Is there a fee to apply for the scholarship test?",
      answer:
        "No. Registration for our flagship annual scholarship examination (ETSE 2026) is completely free of cost.",
    },
    {
      question: "Which classes are eligible for scholarship consideration?",
      answer:
        "Students currently in Classes 7th to 10th (Foundation & early competitive) as well as students in Classes 11th, 12th, and 12th-pass (JEE & NEET) are eligible under different scholarship categories.",
    },
    {
      question: "What documents are required for scholarship verification?",
      answer:
        "Depending on the category, students should provide their recent school/board marksheet, a valid student photo ID, and their ETSE admit card or scorecard.",
    },
    {
      question: "Can current students receive scholarship concessions on subsequent batches?",
      answer:
        "Yes. Internal students who demonstrate exceptional academic consistency and top scores in our internal mock test series are eligible for continuing academic merit support.",
    },
    {
      question: "How soon are scholarship results communicated?",
      answer:
        "ETSE scholarship results are published within the announced campaign timeline, while campus diagnostic evaluations are typically finalized within 48 to 72 hours.",
    },
    {
      question: "How can parents speak with an academic counsellor about fees?",
      answer:
        "Parents are welcome to visit our Mathura campus or submit the academic counselling form on this website to discuss batch fees and merit concessions.",
    },
  ] as ScholarshipFaqItem[],
};
