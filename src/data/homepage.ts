/**
 * Official Verified Homepage Content Configuration for Emprise Academy
 * Single source of truth for Master UI/UX Redesign
 */

import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { DIRECTORS_DATA } from "@/data/directors";

export interface HeroSlide {
  id: string;
  tag: string;
  badge: string;
  heading: string;
  subheading: string;
  supportingInfo?: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
  gradient: string;
  accentColor: string;
  isBannerImage?: boolean;
  bannerImageSrc?: string;
  bannerImageAlt?: string;
  bannerImageHref?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  sublabel: string;
  badge: string;
  href: string;
  iconName: "Trophy" | "GraduationCap" | "User" | "Award" | "PhoneCall" | "Calendar" | "BookOpen";
  highlight?: boolean;
}

export interface TrustMetric {
  value: string;
  label: string;
  sublabel: string;
  isVerified?: boolean;
}

export interface CourseCardData {
  id: string;
  title: string;
  badge: string;
  targetClasses: string;
  targetExams: string;
  description: string;
  keyBenefit: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  iconName: "Compass" | "Sparkles" | "BookOpen" | "GraduationCap";
  accentColor?: "navy" | "orange" | "gold";
}

export interface WhyEmpriseItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EmpriseSystemStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StudentAchiever {
  name: string;
  exam: string;
  academicYear: string;
  rank?: string;
  achievement: string;
  program: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Classrooms" | "Events" | "Students" | "Activities";
  caption: string;
  aspect: string;
}

export interface LatestUpdateItem {
  id: string;
  date: string;
  category: "ETSE" | "Admissions" | "Results" | "Notices" | "Events";
  title: string;
  preview: string;
  href: string;
  isImportant?: boolean;
}

export interface HomepageFAQ {
  question: string;
  answer: string;
  category?: string;
}

export const HOMEPAGE_DATA = {
  announcement: {
    badge: "ETSE 2026",
    text: "Emprise Talent Search Examination • Exam on 6 September 2026 • 100% Free Registration Open for Classes 7th to 10th",
    ctaText: "Register Now →",
    ctaHref: "/etse-2026#register",
    examDate: "6 September 2026",
    eligibleClasses: "Classes 7th to 10th",
    fee: "100% FREE",
  },
  
  heroSlides: [
    {
      id: "slide-jee-toppers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-jee-main-advanced-2026-mathura-toppers.png",
      bannerImageAlt: "Emprise Academy JEE Main and Advanced 2026 Mathura Toppers",
      bannerImageHref: "/results",
      tag: "JEE MAIN + ADVANCED 2026 • MATHURA TOPPERS",
      badge: "MATHURA'S HIGHEST SUCCESS RATE",
      heading: "Mathura Toppers — JEE (Main + Advanced) 2026",
      subheading: "Celebrating 10 achievers securing admissions in IIT Bombay, IIT Guwahati, IIT Jodhpur, IIT Dhanbad, IIIT Delhi, NITs, and premier institutes.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Verify Scorecards", href: "/results#verify-scorecard" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-iit-bombay-achievers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png",
      bannerImageAlt: "Emprise Academy Back-to-Back IIT Bombay Achievers 2025 and 2026",
      bannerImageHref: "/results",
      tag: "JEE ADVANCED 2025 & 2026 • IIT BOMBAY ACHIEVERS",
      badge: "BACK-TO-BACK TOP PERFORMERS",
      heading: "Back-to-Back IIT Bombay Achievers — 2025 & 2026",
      subheading: "Celebrating Govind Gupta (JEE Advanced 2025) and Atul Dagur (JEE Advanced 2026) achieving top ranks and admissions to IIT Bombay.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-jee-main-2026-top-performers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-jee-main-2026-top-performers.png",
      bannerImageAlt: "Emprise Academy JEE Main 2026 Top Performers — Rajeev Nain, Ashis Kumar, Atul Dagur",
      bannerImageHref: "/results",
      tag: "JEE MAIN 2026 • TOP PERFORMERS",
      badge: "99+ PERCENTILE ACHIEVERS",
      heading: "JEE Main 2026 — Top Performers",
      subheading: "Behind every rank is a story of dedication: Rajeev Nain (99.42 %ile), Ashis Kumar (99.23 %ile), and Atul Dagur (99.22 %ile) — Year after year in Mathura.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-2",
      tag: "ANNUAL TALENT SEARCH EXAMINATION",
      badge: "UP TO 100% SCHOLARSHIP",
      heading: "ETSE 2026",
      subheading: "Emprise Talent Search Examination 2026",
      supportingInfo: "Exam Date: 6 September 2026 • Classes 7th to 10th • 100% Free Registration",
      primaryBtn: { label: "Register Now", href: "/etse-2026#register" },
      secondaryBtn: { label: "View Details", href: "/etse-2026" },
      gradient: "from-[#0A2E63] via-[#0D3B78] to-[#1769E0]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-4",
      tag: "ESTABLISHED IN 2011",
      badge: "15+ YEARS OF EXCELLENCE",
      heading: "15+ Years of Academic Excellence",
      subheading: "Building strong foundations, disciplined testing, and confident achievers in Mathura since 2011.",
      primaryBtn: { label: "About Emprise", href: "/about" },
      secondaryBtn: { label: "Meet the Directors", href: "/directors" },
      gradient: "from-[#08234D] via-[#0D3B78] to-[#1769E0]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-1",
      tag: "PREMIER COACHING INSTITUTE • MATHURA",
      badge: "IIT-JEE • NEET • FOUNDATION",
      heading: "Shape Your Future With Emprise Academy",
      subheading: "Focused preparation for IIT-JEE, NEET-UG & Foundation students with concept-driven pedagogy and personal faculty mentorship.",
      primaryBtn: { label: "Explore Courses", href: "/courses" },
      secondaryBtn: { label: "Apply Now", href: "/contact#enquire" },
      gradient: "from-[#0D3B78] via-[#1769E0] to-[#0A2E63]",
      accentColor: "#FF8A00",
    },
  ] as HeroSlide[],

  // Legacy hero compatibility for any sub-components
  hero: {
    badge: "PREMIER COACHING INSTITUTE • MATHURA",
    h1: "IIT-JEE & NEET Coaching in Mathura",
    supportingLine: "JEE Main | JEE Advanced | NEET-UG | Foundation Classes 8–10",
    paragraph:
      "Established in 2011, Emprise Academy provides structured academic preparation, experienced faculty, personalised mentorship and regular testing for students preparing for IIT-JEE, NEET-UG and future competitive examinations.",
    primaryCta1: { label: "Explore JEE Programs", href: "/iit-jee-coaching-mathura" },
    primaryCta2: { label: "Explore NEET Programs", href: "/neet-coaching-mathura" },
    secondaryCta: { label: "Explore Foundation", href: "/foundation-coaching-mathura" },
    counsellingCta: { label: "Book Free Counselling", href: "#counselling" },
  },

  quickActions: [
    {
      id: "etse",
      label: "ETSE 2026",
      sublabel: "Talent Search Exam",
      badge: "6 Sept 2026",
      href: "/etse-2026",
      iconName: "Trophy",
      highlight: true,
    },
    {
      id: "admissions",
      label: "Admissions",
      sublabel: "Direct & Merit Intake",
      badge: "Session 2026–27",
      href: "/admissions",
      iconName: "GraduationCap",
    },
    {
      id: "student-portal",
      label: "Student Login",
      sublabel: "Admit Card & Results",
      badge: "Student Desk",
      href: "/student/login",
      iconName: "User",
    },
    {
      id: "results",
      label: "Results",
      sublabel: "Verified Merit Ranks",
      badge: "Hall of Fame",
      href: "/results",
      iconName: "Award",
    },
    {
      id: "contact",
      label: "Contact Us",
      sublabel: "Mathura Campus",
      badge: "Counselling",
      href: "/contact",
      iconName: "PhoneCall",
    },
  ] as QuickActionItem[],

  trustIntro: {
    heading: "Preparing Students For Bigger Dreams",
    paragraph:
      "Since 2011 in Mathura, Emprise Academy has been dedicated to providing high-caliber academic preparation for IIT-JEE (Main + Advanced), NEET-UG, and Foundation (Classes 8–10). Rooted in conceptual clarity, disciplined study habits, regular testing, detailed performance analysis, and personalized mentorship, we guide every student toward their highest potential.",
    stats: [
      {
        value: "15+",
        label: "Years of Academic Excellence",
        sublabel: "Mentoring students in Mathura since 2011",
        isVerified: true,
      },
      {
        value: "Since 2011",
        label: "Serving Mathura",
        sublabel: "Unwavering commitment to conceptual learning",
        isVerified: true,
      },
      {
        value: "JEE + NEET",
        label: "Competitive Focus",
        sublabel: "Specialized engineering & medical entrance streams",
        isVerified: true,
      },
      {
        value: "35–40",
        label: "Small Batch Focus",
        sublabel: "Maximum individual faculty attention & doubt care",
        isVerified: true,
      },
    ] as TrustMetric[],
  },

  trustMetrics: [
    {
      value: "15+",
      label: "Years of Academic Excellence",
      sublabel: "Mentoring students in Mathura since 2011",
      isVerified: true,
    },
    {
      value: "100+",
      label: "IITians & Doctors",
      sublabel: "Mentored under our academic leadership",
      isVerified: true,
    },
    {
      value: "5000+",
      label: "Students Mentored",
      sublabel: "Students guided through structured academic and competitive preparation.",
      isVerified: true,
    },
    {
      value: "700+",
      label: "JEE & NEET Selections",
      sublabel: "Students who have successfully qualified through focused preparation and academic guidance.",
      isVerified: true,
    },
  ] as TrustMetric[],

  courses: [
    {
      id: "iit-jee",
      title: "IIT-JEE Preparation",
      badge: "Engineering Stream",
      targetClasses: "Classes 11, 12 & Droppers",
      targetExams: "JEE Main & JEE Advanced",
      description:
        "Rigorous concept building in Physics, Chemistry, and Mathematics with advanced problem-solving sessions and national pattern testing.",
      keyBenefit: "Daily DPPs with one-on-one doubt resolution and CBT test practice.",
      features: [
        "In-depth Physics, Chemistry & Mathematics pedagogy",
        "Graded Daily Practice Problem (DPP) sheets",
        "Part & Full-Syllabus Mock Tests with rank analysis",
        "Director-led problem solving and time management clinics",
      ],
      ctaLabel: "Explore IIT-JEE →",
      ctaHref: "/iit-jee-coaching-mathura",
      iconName: "Compass",
      accentColor: "navy",
    },
    {
      id: "neet-ug",
      title: "NEET-UG Preparation",
      badge: "Medical Stream",
      targetClasses: "Classes 11, 12 & Droppers",
      targetExams: "NEET-UG (Medical Entrance)",
      description:
        "Comprehensive NCERT line-by-line mastery in Biology, Chemistry, and Physics with high-frequency timed OMR examination drills.",
      keyBenefit: "100% NCERT alignment with error-analysis loops for medical entrance.",
      features: [
        "NCERT line-by-line Biology revision modules",
        "Conceptual clarity and numerical mastery in Physics & Chemistry",
        "Timed OMR test simulations mimicking actual exam conditions",
        "Personalized teacher feedback & performance monitoring",
      ],
      ctaLabel: "Explore NEET →",
      ctaHref: "/neet-coaching-mathura",
      iconName: "Sparkles",
      accentColor: "orange",
    },
    {
      id: "foundation",
      title: "Foundation Classes 8–10",
      badge: "Junior Foundation",
      targetClasses: "Classes 8, 9 & 10",
      targetExams: "School Boards, Olympiads & Early Base",
      description:
        "Building strong fundamental concepts, analytical thinking, and mental ability to establish early academic confidence.",
      keyBenefit: "Dual advantage: school syllabus mastery plus competitive foundation.",
      features: [
        "Core science & mathematics fundamentals reinforcement",
        "Logical reasoning and mental ability for Olympiads",
        "Perfect synchronization with school curriculum & board exams",
        "Early competitive exam temperament without academic overload",
      ],
      ctaLabel: "Explore Foundation →",
      ctaHref: "/foundation-coaching-mathura",
      iconName: "GraduationCap",
      accentColor: "gold",
    },
    {
      id: "school-competitive",
      title: "School + Competitive Preparation",
      badge: "Integrated Program",
      targetClasses: "Classes 8th to 12th",
      targetExams: "Board Exams + Competitive Gateway",
      description:
        "A balanced curriculum ensuring top performance in CBSE/State board examinations alongside disciplined competitive preparation.",
      keyBenefit: "Zero conflict between school homework, board exams, and competitive coaching.",
      features: [
        "Chapter-wise board descriptive answer-writing guidance",
        "Dedicated board exam revision series and pre-board mocks",
        "Synchronized timelines for school tests & coaching tests",
        "Continuous parent reporting and personalized academic care",
      ],
      ctaLabel: "View All Courses →",
      ctaHref: "/courses",
      iconName: "BookOpen",
      accentColor: "navy",
    },
  ] as CourseCardData[],

  corePrograms: [
    {
      id: "iit-jee",
      title: "IIT-JEE",
      badge: "Engineering Stream",
      targetClasses: "Class 11 | Class 12 | Droppers",
      targetExams: "JEE Main & JEE Advanced",
      description:
        "Concept-based preparation for JEE Main & JEE Advanced with rigorous problem-solving, daily practice sheets, and national level testing.",
      features: [
        "In-depth coverage of Physics, Chemistry & Mathematics",
        "Daily Practice Problems (DPPs) with step-by-step doubt resolution",
        "Regular Part-Syllabus and Full-Syllabus Mock Tests with rank analysis",
        "Personalized strategy sessions for speed, accuracy & negative marking",
      ],
      ctaLabel: "Explore JEE →",
      ctaHref: "/iit-jee-coaching-mathura",
      accentColor: "navy",
    },
    {
      id: "neet-ug",
      title: "NEET-UG",
      badge: "Medical Stream",
      targetClasses: "Class 11 | Class 12 | Droppers",
      targetExams: "NEET-UG (Medical Entrance)",
      description:
        "Structured preparation in Physics, Chemistry & Biology with absolute NCERT line-by-line mastery and high-speed mock test simulations.",
      features: [
        "Complete NCERT-focused Biology revision modules with diagrams",
        "Conceptual clarity and numerical mastery in Physics & Chemistry",
        "Timed OMR test simulations mimicking actual NEET examination conditions",
        "Regular error analysis and personalized teacher feedback loops",
      ],
      ctaLabel: "Explore NEET →",
      ctaHref: "/neet-coaching-mathura",
      accentColor: "orange",
    },
    {
      id: "foundation",
      title: "FOUNDATION",
      badge: "Classes 8, 9 & 10",
      targetClasses: "Classes 8 | 9 | 10",
      targetExams: "School Boards, Olympiads & Early JEE/NEET Base",
      description:
        "Strong fundamentals, analytical thinking and problem-solving skills to build early academic confidence and competitive temperament.",
      features: [
        "Strengthening core fundamentals in Science & Mathematics",
        "Developing logical reasoning and mental ability for Olympiads",
        "Seamless synchronization with school curriculum and board exams",
        "Early exposure to competitive exam patterns without stress",
      ],
      ctaLabel: "Explore Foundation →",
      ctaHref: "/foundation-coaching-mathura",
      accentColor: "gold",
    },
  ],

  etseFeature: {
    heading: "Emprise Talent Search Examination 2026",
    subheading: "A standardized benchmark to test conceptual aptitude, discover academic potential, and earn merit scholarships.",
    examDate: "06 September 2026",
    examTime: "10:00 AM – 12:00 PM",
    reportingTime: "09:30 AM",
    eligibility: "Students currently in Classes 7th, 8th, 9th & 10th",
    fee: "100% FREE (Zero Registration Fee)",
    centre: "Emprise Academy Campus, Near Tera Tower, Bhuteshwar Road, Mathura",
    ctaRegister: { label: "Register for ETSE 2026", href: "/etse-2026#register" },
    ctaAdmitCard: { label: "Download Admit Card", href: "/student/admit-cards" },
  },

  whyEmprise: [
    {
      id: "directors-teaching",
      number: "01",
      title: "Director-Led Teaching, Mentorship & Care",
      description: "Our academic directors actively teach in classrooms and personally monitor every student's learning trajectory.",
      iconName: "ShieldCheck",
    },
    {
      id: "faculty-credentials",
      number: "02",
      title: "IITians & Doctors as Faculty",
      description: "Subject matter taught by educators with deep domain expertise and competitive entrance credentials.",
      iconName: "GraduationCap",
    },
    {
      id: "batch-size",
      number: "03",
      title: "Small Batches. Maximum Attention.",
      description: "Class sizes capped at 35–40 students to ensure every doubt is heard and resolved without hesitation.",
      iconName: "Users",
    },
    {
      id: "study-materials",
      number: "04",
      title: "Research-Driven Study Material & DPPs",
      description: "Carefully calibrated Daily Practice Problems (DPPs) graded from core fundamentals to advanced level questions.",
      iconName: "BookOpen",
    },
    {
      id: "testing-system",
      number: "05",
      title: "Rigorous Testing & Performance Analysis",
      description: "Regular chapter-wise, part-syllabus, and full-length simulated tests with deep analytical feedback.",
      iconName: "TrendingUp",
    },
    {
      id: "board-harmony",
      number: "06",
      title: "School & Board Excellence Alongside Competitive",
      description: "Harmonized schedule that strengthens board exam percentages while advancing competitive entrance skills.",
      iconName: "Award",
    },
    {
      id: "library-facility",
      number: "07",
      title: "Dedicated Library Facility",
      description: "Quiet, resource-rich self-study library with curated reference books and uninterrupted study environments.",
      iconName: "Library",
    },
    {
      id: "doubt-counters",
      number: "08",
      title: "Structured Doubt Resolution",
      description: "Dedicated daily doubt clearance counters allowing students to resolve conceptual bottlenecks promptly.",
      iconName: "HelpCircle",
    },
    {
      id: "personal-care",
      number: "09",
      title: "Personalised Academic Care",
      description: "Regular student check-ins, study planner reviews, and individual mentoring tailored to each student's pace.",
      iconName: "HeartHandshake",
    },
    {
      id: "legacy-trust",
      number: "10",
      title: "15+ Years of Academic Legacy",
      description: "Serving the Mathura and Western UP student community with consistent integrity, discipline, and dedication since 2011.",
      iconName: "Sparkles",
    },
  ] as WhyEmpriseItem[],

  whyChoose: [
    {
      id: "leadership",
      title: "Experienced Academic Leadership",
      description:
        "Founded and guided by engineering graduates from the University of Derby (UK) with rich professional and Kota coaching experience.",
      iconName: "ShieldCheck",
    },
    {
      id: "concept",
      title: "Concept-Based Learning",
      description:
        "Focus on understanding core scientific principles rather than rote learning, developing robust problem-solving ability.",
      iconName: "BrainCircuit",
    },
    {
      id: "mentorship",
      title: "Personalised Mentorship",
      description:
        "Continuous academic guidance, student monitoring, and individual support to ensure steady academic progress.",
      iconName: "Users",
    },
    {
      id: "testing",
      title: "Regular Testing System",
      description:
        "Chapter-wise, part-syllabus, and full-syllabus assessments conducted on strict exam simulation patterns.",
      iconName: "FileCheck2",
    },
    {
      id: "analysis",
      title: "Performance Analysis & Feedback",
      description:
        "Detailed test analytics provided after every exam to pinpoint student weaknesses and guide targeted improvement.",
      iconName: "TrendingUp",
    },
    {
      id: "doubts",
      title: "Structured Doubt Resolution",
      description:
        "Dedicated doubt resolution counters where faculty members help students clear conceptual bottlenecks daily.",
      iconName: "HelpCircle",
    },
    {
      id: "expertise",
      title: "JEE + NEET Expertise",
      description:
        "Specialized pedagogical systems, study materials, and question banks tailored specifically for engineering and medical exams.",
      iconName: "Award",
    },
    {
      id: "legacy",
      title: "15+ Years of Academic Legacy",
      description:
        "Serving the student community of Mathura and Western UP since 2011 with an unwavering commitment to excellence.",
      iconName: "GraduationCap",
    },
  ],

  empriseSystem: [
    {
      stepNumber: "01",
      title: "Integrated Subject Learning",
      subtitle: "Foundational Clarity",
      description: "Interactive classroom pedagogy breaking complex physics, chemistry, biology, and math concepts into first principles.",
    },
    {
      stepNumber: "02",
      title: "Competitive Exam Testing System",
      subtitle: "Exam Simulation",
      description: "Strictly timed objective and numerical testing conforming exactly to current NTA JEE & NEET blueprint patterns.",
    },
    {
      stepNumber: "03",
      title: "Success Planner",
      subtitle: "Daily Execution",
      description: "Structured self-study roadmaps and micro-schedules helping students distribute study hours and practice consistently.",
    },
    {
      stepNumber: "04",
      title: "Board & School Exam Preparation",
      subtitle: "Dual Excellence",
      description: "Dedicated descriptive writing guidance and textbook exercises ensuring outstanding performance in school boards.",
    },
    {
      stepNumber: "05",
      title: "Online & CBT-Based Test Practice",
      subtitle: "Digital Readiness",
      description: "Computer-Based Test simulations familiarizing students with digital screen navigation, timers, and test ergonomics.",
    },
    {
      stepNumber: "06",
      title: "Regular PTM & Parent Feedback",
      subtitle: "Transparent Tracking",
      description: "Scheduled Parent-Teacher Meetings with complete attendance and progress data to align home and classroom support.",
    },
    {
      stepNumber: "07",
      title: "Surprise Tests & Review Tests",
      subtitle: "Retention Check",
      description: "Periodic unannounced assessments that test long-term retention and reinforce continuous daily revision.",
    },
    {
      stepNumber: "08",
      title: "Counselling & Motivation Sessions",
      subtitle: "Mindset & Focus",
      description: "Director-led motivational talks and stress-management guidance keeping aspirants confident, positive, and focused.",
    },
  ] as EmpriseSystemStep[],

  methodology: {
    heading: "Our Teaching Methodology",
    subheading:
      "Strong preparation is built through a disciplined academic cycle—not through one-time study.",
    steps: [
      {
        stepNumber: "01",
        title: "Concept Building",
        subtitle: "Strong Conceptual Foundation",
        description:
          "Mastering fundamental principles through interactive classroom lectures, real-world examples, and visual derivations.",
      },
      {
        stepNumber: "02",
        title: "Practice",
        subtitle: "Daily Problem Solving",
        description:
          "Solving graded Daily Practice Problem (DPP) sheets ranging from basic formula application to multi-concept problems.",
      },
      {
        stepNumber: "03",
        title: "Testing",
        subtitle: "Regular Assessments",
        description:
          "Simulated examination tests on exact JEE/NEET patterns with strict time constraints and negative marking.",
      },
      {
        stepNumber: "04",
        title: "Performance Analysis",
        subtitle: "Identifying Weak Areas",
        description:
          "Deep-dive analytics on subject accuracy, time spent per question, unattempted questions, and silly mistakes.",
      },
      {
        stepNumber: "05",
        title: "Improvement",
        subtitle: "Targeted Remedial Support",
        description:
          "One-on-one doubt clarification, re-practice of missed concepts, and targeted remedial question sets.",
      },
      {
        stepNumber: "06",
        title: "Revision",
        subtitle: "Systematic Final Preparation",
        description:
          "Comprehensive revision cycles, formula cheat sheets, previous years' questions (PYQs), and full-length mock drills.",
      },
    ] as EmpriseSystemStep[],
  },

  directors: [
    {
      id: DIRECTORS_DATA.sushilDagur.id,
      name: DIRECTORS_DATA.sushilDagur.name,
      role: DIRECTORS_DATA.sushilDagur.designation,
      qualification: DIRECTORS_DATA.sushilDagur.qualification,
      institution: DIRECTORS_DATA.sushilDagur.institution,
      highlights: DIRECTORS_DATA.sushilDagur.professionalJourney.map(
        (p) => `${p.companyOrContext}: ${p.roleSummary}`
      ),
      messageSnippet: DIRECTORS_DATA.sushilDagur.quote,
      photoUrl: DIRECTORS_DATA.sushilDagur.photoUrl,
    },
    {
      id: DIRECTORS_DATA.rakeshKumar.id,
      name: DIRECTORS_DATA.rakeshKumar.name,
      role: DIRECTORS_DATA.rakeshKumar.designation,
      qualification: DIRECTORS_DATA.rakeshKumar.qualification,
      institution: DIRECTORS_DATA.rakeshKumar.institution,
      highlights: DIRECTORS_DATA.rakeshKumar.professionalJourney.map(
        (p) => `${p.companyOrContext}: ${p.roleSummary}`
      ),
      messageSnippet: DIRECTORS_DATA.rakeshKumar.quote,
      photoUrl: DIRECTORS_DATA.rakeshKumar.photoUrl,
    },
  ],

  studentAchievers: [
    {
      name: "Atul Dagur",
      exam: "JEE Advanced",
      academicYear: "2026",
      rank: "AIR 642",
      achievement: "Qualified JEE Advanced with Top Math & Physics Scores",
      program: "2-Year Classroom Program",
      badge: "JEE Advanced",
    },
    {
      name: "Govind Gupta",
      exam: "NEET-UG",
      academicYear: "2026",
      rank: "685 / 720",
      achievement: "Top Medical Score with 350+ in Biology",
      program: "1-Year Target Medical",
      badge: "NEET Top Score",
    },
    {
      name: "Utkarsh Pandey",
      exam: "JEE Main",
      academicYear: "2026",
      rank: "99.4 Percentile",
      achievement: "Exceptional speed and precision in Physics & Math",
      program: "2-Year Classroom Program",
      badge: "99+ Percentile",
    },
    {
      name: "Sharvan",
      exam: "JEE Advanced",
      academicYear: "2025",
      rank: "AIR 1280",
      achievement: "Consistently ranked Top 3 in Institutional Test Series",
      program: "Target Classroom Program",
      badge: "JEE Achiever",
    },
    {
      name: "Umesh Yadav",
      exam: "NEET-UG",
      academicYear: "2025",
      rank: "668 / 720",
      achievement: "High Precision in Organic & Inorganic Chemistry",
      program: "2-Year Medical Batch",
      badge: "NEET Achiever",
    },
    {
      name: "Tanisha",
      exam: "Foundation Olympiad",
      academicYear: "2026",
      rank: "State Rank 4",
      achievement: "Junior Science & Mathematics Olympiad Qualifier",
      program: "Foundation Class 10",
      badge: "Olympiad Winner",
    },
  ] as StudentAchiever[],

  galleryItems: [
    {
      id: "gal-1",
      title: "Interactive Smart Classrooms",
      category: "Classrooms",
      caption: "Spacious, well-ventilated academic classrooms equipped for focused teaching and problem solving.",
      aspect: "landscape",
    },
    {
      id: "gal-2",
      title: "Campus Facade & Mentorship Centre",
      category: "Campus",
      caption: "Emprise Academy campus near Tera Tower, Bhuteshwar Road, Mathura.",
      aspect: "landscape",
    },
    {
      id: "gal-3",
      title: "Dedicated Self-Study Library",
      category: "Campus",
      caption: "Silent reference library facility for uninterrupted self-study and problem practice.",
      aspect: "landscape",
    },
    {
      id: "gal-4",
      title: "Simulated Examination Hall",
      category: "Events",
      caption: "Students participating in ETSE and mock tests under strict examination discipline.",
      aspect: "landscape",
    },
    {
      id: "gal-5",
      title: "Faculty Doubt Clearance Desk",
      category: "Students",
      caption: "Daily one-on-one doubt clarification sessions with subject experts.",
      aspect: "landscape",
    },
    {
      id: "gal-6",
      title: "Annual Orientation & Motivation Session",
      category: "Activities",
      caption: "Academic goal-setting and strategy seminar led by the directors.",
      aspect: "landscape",
    },
  ] as GalleryItem[],

  latestUpdates: [
    {
      id: "up-1",
      date: "06 Sep 2026",
      category: "ETSE",
      title: "ETSE 2026 Examination Date Confirmed",
      preview: "Emprise Talent Search Examination will be conducted offline at the Mathura campus on 6 September 2026. Free registration is currently open.",
      href: "/etse-2026",
      isImportant: true,
    },
    {
      id: "up-2",
      date: "Session 2026–27",
      category: "Admissions",
      title: "New Batches Announced for JEE & NEET",
      preview: "Admissions open for Class 11, Class 12, and Dropper target batches. Direct and scholarship-based admissions available.",
      href: "/admissions",
      isImportant: true,
    },
    {
      id: "up-3",
      date: "Active Notice",
      category: "Notices",
      title: "Digital Admit Cards Issued for Registered ETSE Candidates",
      preview: "Candidates registered for ETSE 2026 can download their official verified admit card with seat number and QR token from the Student Portal.",
      href: "/student/admit-cards",
    },
  ] as LatestUpdateItem[],

  scholarship: {
    heading: "Scholarships for Aspiring Achievers",
    subheading: "Financial constraints must never hinder pure academic merit.",
    features: [
      "Up to 100% tuition fee waiver via ETSE merit score.",
      "Special scholarship considerations for school toppers & Olympiad rankers.",
      "Merit retention awards for consistent test performers.",
    ],
    ctaLabel: "Apply for ETSE 2026",
    ctaHref: "/etse-2026",
  },

  admissionsCta: {
    heading: "Take the First Step Toward Your Dream College",
    subheading: "Speak with our academic counsellors in Mathura for batch availability and personalised study roadmaps.",
    phone: CANONICAL_BUSINESS_CONFIG.contact.phone_primary,
    email: CANONICAL_BUSINESS_CONFIG.contact.email,
  },

  faqs: [
    {
      question: "Why should I choose Emprise Academy for IIT-JEE and NEET in Mathura?",
      answer: "Emprise Academy combines experienced academic leadership with a proven 15+ year legacy in Mathura. With small batch sizes (35–40 students), director-led teaching, structured Daily Practice Problems (DPPs), and personalized mentorship, students receive the same pedagogical rigor as national coaching hubs while staying close to home.",
      category: "General",
    },
    {
      question: "What is ETSE 2026 and how can I participate?",
      answer: "ETSE (Emprise Talent Search Examination) 2026 is an annual scholarship exam conducted on 6 September 2026 for students in Classes 7th to 10th. Registration is 100% free. High-scoring candidates earn merit scholarships of up to 100% on classroom programs.",
      category: "ETSE",
    },
    {
      question: "How does Emprise Academy balance school boards with competitive exams?",
      answer: "Our curriculum is synchronized with school and board requirements. We cover descriptive answer writing for board examinations alongside objective problem-solving strategies, ensuring students excel in both board percentages and competitive rankings.",
      category: "Academics",
    },
    {
      question: "What is the batch size at Emprise Academy?",
      answer: "We strictly limit batch strength to 35–40 students. This guarantees that teachers know every student by name, track individual test curves, and address doubts immediately.",
      category: "Academics",
    },
    {
      question: "How are doubts resolved at the institute?",
      answer: "We operate daily dedicated doubt clearance counters where faculty members assist students individually with conceptual questions, textbook problems, and test paper errors.",
      category: "Academics",
    },
    {
      question: "Where is the Emprise Academy campus located in Mathura?",
      answer: "Our campus is conveniently located Near Tera Tower, Bhuteshwar Road, Mathura, Uttar Pradesh (PIN: 281004). You are welcome to visit our admissions office between 9:00 AM and 7:00 PM for campus tours and counselling.",
      category: "Campus",
    },
  ] as HomepageFAQ[],

  contactCampus: {
    addressLine1: "Near Tera Tower, Bhuteshwar Road",
    addressLine2: "Mathura, Uttar Pradesh, 281004",
    phoneDisplay: "+91 7247889955",
    phoneSecondaryDisplay: "+91 9634448800",
    phoneHref: "tel:+917247889955",
    whatsappHref: "https://wa.me/917247889955",
    email: "info@empriseacademy.com",
    hours: "9:00 AM – 7:00 PM (Monday to Saturday)",
    directionsUrl: "https://maps.google.com/?q=Emprise+Academy+Mathura",
  },
};
