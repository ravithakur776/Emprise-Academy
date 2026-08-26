/**
 * Official Verified Homepage Content Configuration for Emprise Academy
 * Single source of truth for Phase 3 Homepage Experience
 *
 * All information strictly reflects the verified brief:
 * - Established 2011 in Mathura, UP
 * - 3 Core Pillars: IIT-JEE, NEET-UG, Foundation (Classes 8-10)
 * - ETSE 2026: Exam on 6 September 2026, Classes 7th to 10th, FREE registration
 * - Leadership: Sushil Dagur & Rakesh Kumar (Univ. of Derby UK, Rolls-Royce, Ford, Kota experience)
 */

export interface TrustMetric {
  value: string;
  label: string;
  sublabel: string;
  isVerified: boolean;
}

export interface CoreProgram {
  id: string;
  title: string;
  badge: string;
  targetClasses: string;
  targetExams: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: "navy" | "orange" | "gold";
}

export interface WhyChoosePoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MethodologyStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface VerifiedDirector {
  id: string;
  name: string;
  role: string;
  qualification: string;
  institution: string;
  highlights: string[];
  messageSnippet: string;
}

export interface VerifiedFacultyPreview {
  name: string;
  subject: string;
  role: string;
  experience: string;
  specialization: string;
}

export interface HomepageFAQ {
  question: string;
  answer: string;
}

export const HOMEPAGE_DATA = {
  announcement: {
    badge: "ETSE 2026",
    text: "Emprise Talent Search Examination • Exam on 6 September 2026 • Free Registration Open for Classes 7th to 10th",
    ctaText: "Apply Now →",
    ctaHref: "/etse-2026",
    examDate: "6 September 2026",
    eligibleClasses: "Classes 7th to 10th",
    fee: "FREE",
  },
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
      value: "XXXX+",
      label: "Students Mentored",
      sublabel: "In engineering & medical foundation",
      isVerified: false,
    },
    {
      value: "XXXX+",
      label: "JEE & NEET Selections",
      sublabel: "Qualified in premier competitive exams",
      isVerified: false,
    },
  ] as TrustMetric[],
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
  ] as CoreProgram[],
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
  ] as WhyChoosePoint[],
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
    ] as MethodologyStep[],
  },
  directors: [
    {
      id: "sushil-dagur",
      name: "Sushil Dagur",
      role: "Director | Educationist | Academic Entrepreneur",
      qualification: "B.E. (Hons.) Mechanical Engineering",
      institution: "University of Derby, England, U.K.",
      highlights: [
        "Professional engineering background with Ford Group, UK",
        "Extensive managerial & project engineering experience",
        "Rich teaching experience with premier coaching institutes in Kota",
        "Author of recognized academic & professional publications",
      ],
      messageSnippet:
        "Our objective at Emprise Academy is to provide Mathura students with the exact caliber of academic rigor and conceptual depth traditionally sought in distant coaching hubs.",
    },
    {
      id: "rakesh-kumar",
      name: "Rakesh Kumar",
      role: "Director | Mathematics Mentor | IIT-JEE Faculty",
      qualification: "B.E. (Hons.) Mechanical Engineering",
      institution: "University of Derby, England, U.K.",
      highlights: [
        "Professional engineering tenure with Rolls-Royce Limited",
        "Expertise in mechanical design & complex project management",
        "Dedicated IIT-JEE advanced mathematics mentor",
        "Passionate advocate of logical visualization in problem-solving",
      ],
      messageSnippet:
        "Mathematics in competitive exams is not about memorizing tricks; it is about recognizing patterns and executing solutions with disciplined logical clarity.",
    },
  ] as VerifiedDirector[],
  facultyPreview: [
    {
      name: "Rakesh Kumar",
      subject: "Mathematics",
      role: "Director & Head of Mathematics",
      experience: "Senior IIT-JEE Faculty",
      specialization: "Calculus, Coordinate Geometry & Algebra for JEE Advanced",
    },
    {
      name: "Sushil Dagur",
      subject: "Physics",
      role: "Director & Head of Academic Direction",
      experience: "Senior Academic Mentor & Author",
      specialization: "Classical Mechanics, Engineering Principles & Pedagogy",
    },
    {
      name: "Chemistry Faculty Team",
      subject: "Chemistry",
      role: "Physical, Organic & Inorganic Mentors",
      experience: "Experienced Competitive Mentors",
      specialization: "Organic Reaction Mechanisms & NCERT Inorganic Chemistry",
    },
    {
      name: "Biology Faculty Team",
      subject: "Biology",
      role: "Botany & Zoology Mentors",
      experience: "Experienced Medical Mentors",
      specialization: "NCERT Line-by-Line Mastery, Human Physiology & Genetics",
    },
  ] as VerifiedFacultyPreview[],
  scholarship: {
    heading: "Scholarships for Aspiring Achievers",
    subheading:
      "Emprise Academy believes financial constraints should never stand in the way of academic potential. Merit-based fee concessions are awarded through our annual Talent Search Examination (ETSE) and academic credentials.",
    features: [
      "Merit-based fee concessions evaluated on performance in ETSE 2026",
      "Special academic rewards for school toppers and Olympiad qualifiers",
      "Transparent fee concession slabs applied directly to academic tuition fees",
    ],
    ctaText: "Explore Scholarship Programme →",
    ctaHref: "/scholarship",
  },
  admissionsCta: {
    heading: "Your Future Deserves the Right Direction.",
    subheading:
      "Talk to our experienced academic counsellors to understand the optimal batch, syllabus schedule, and preparation strategy for your academic journey.",
    primaryCta: { label: "Book Free Counselling", href: "#counselling" },
    secondaryCta: { label: "Explore Admissions", href: "/admissions" },
    callAction: { label: "Call Campus Desk", href: "tel:+919876543210" },
    whatsappAction: {
      label: "WhatsApp Query",
      href: "https://wa.me/919876543210?text=Hello%20Emprise%20Academy,%20I%20want%20to%20inquire%20about%20IIT-JEE/NEET%20admissions.",
    },
  },
  faqs: [
    {
      question: "Which academic programs are offered at Emprise Academy, Mathura?",
      answer:
        "Emprise Academy offers three primary academic pillars: (1) IIT-JEE coaching for Classes 11, 12, and 12th Pass (Dropper) students targeting JEE Main and JEE Advanced; (2) NEET-UG coaching for medical aspirants; and (3) Foundation programs for Classes 8, 9, and 10 focusing on strong science and mathematics fundamentals and Olympiad preparation.",
    },
    {
      question: "Does Emprise Academy provide separate preparation for JEE Main and JEE Advanced?",
      answer:
        "Yes. Our curriculum is integrated to cover both JEE Main (accuracy and broad syllabus coverage) and JEE Advanced (deep conceptual derivation, multi-concept problem solving, and analytical rigor). Students undergo graded problem-solving sheets and mock tests for both formats.",
    },
    {
      question: "How does the NEET-UG preparation at Emprise Academy ensure high scores?",
      answer:
        "Our NEET preparation is anchored on line-by-line NCERT mastery for Biology and Chemistry, combined with extensive numerical practice in Physics. Students take regular timed OMR-based mock tests replicating the actual NEET examination environment, accompanied by error-analysis sessions.",
    },
    {
      question: "Which classes are eligible for the Foundation program?",
      answer:
        "Students currently studying in Classes 8, 9, and 10 are eligible for our Foundation programs. The curriculum synchronizes with school boards while introducing competitive problem-solving techniques for NTSE, Olympiads, and future JEE/NEET readiness.",
    },
    {
      question: "Does Emprise Academy offer dropper / repeater batches for JEE and NEET?",
      answer:
        "Yes, we conduct dedicated Target/Repeater batches for 12th Pass students. These batches feature intensive daily problem-solving workshops, rapid syllabus revision, full-length test series, and dedicated doubt clearance sessions.",
    },
    {
      question: "What is the Emprise Talent Search Examination (ETSE) 2026?",
      answer:
        "ETSE is Emprise Academy's flagship talent search and scholarship examination. For 2026, the exam is scheduled on 6 September 2026 for students in Classes 7th to 10th. Registration is completely free and top performers receive merit-based fee concessions.",
    },
    {
      question: "How frequently are tests conducted at Emprise Academy?",
      answer:
        "Testing is an integral component of our teaching methodology. Students appear for weekly chapter-wise tests, fortnightly part-syllabus tests, and monthly comprehensive full-syllabus test series. Detailed performance feedback is provided to students and parents.",
    },
    {
      question: "Where is Emprise Academy located in Mathura and how can I take admission?",
      answer:
        "Emprise Academy is located at the Main Academic Block in Mathura, Uttar Pradesh. Admissions can be initiated by visiting the campus, registering for ETSE 2026, or booking a free academic counselling session through our website.",
    },
  ] as HomepageFAQ[],
  contactCampus: {
    institution: "Emprise Academy",
    city: "Mathura, Uttar Pradesh",
    address: "Emprise Academy, Main Academic Block, Mathura, Uttar Pradesh - 281001",
    phoneDisplay: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    email: "admissions@empriseacademy.com",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (Sunday: 10:00 AM – 2:00 PM)",
    directionsUrl: "https://maps.google.com/?q=Emprise+Academy+Mathura",
  },
} as const;
