/**
 * Official Verified IIT-JEE Academic Content Configuration for Emprise Academy
 * Single source of truth for Phase 4.1 IIT-JEE Programme Ecosystem
 *
 * Pages Covered:
 * 1. /iit-jee-coaching-mathura (Main Hub)
 * 2. /iit-jee-coaching-mathura/class-11 (Class 11 2-Year Program)
 * 3. /iit-jee-coaching-mathura/class-12 (Class 12 1-Year Program & Board Balance)
 * 4. /iit-jee-coaching-mathura/dropper (Target / Repeater 1-Year Intensive Program)
 */

export interface JeeProgramCard {
  id: string;
  title: string;
  badge: string;
  targetAudience: string;
  duration: string;
  objective: string;
  description: string;
  highlights: string[];
  href: string;
}

export interface JeeSubjectBlock {
  subject: string;
  subtitle: string;
  description: string;
  keyPillars: string[];
  topicsCovered: string[];
}

export interface JeeFaqItem {
  question: string;
  answer: string;
}

export const MAIN_JEE_DATA = {
  meta: {
    title: "IIT-JEE Coaching in Mathura | JEE Main & Advanced | Emprise Academy",
    description:
      "Emprise Academy offers structured IIT-JEE coaching in Mathura for JEE Main and JEE Advanced. Concept-based learning, experienced mentors, regular testing, and personalized doubt resolution.",
    keywords: [
      "IIT-JEE Coaching in Mathura",
      "JEE Coaching in Mathura",
      "JEE Main Coaching in Mathura",
      "JEE Advanced Coaching in Mathura",
      "IIT-JEE Preparation in Mathura",
      "JEE Main & Advanced Preparation",
      "JEE Coaching for Class 11",
      "JEE Coaching for Class 12",
      "JEE Dropper Coaching in Mathura",
    ],
    canonical: "https://empriseacademy.com/iit-jee-coaching-mathura",
  },
  hero: {
    eyebrow: "IIT-JEE ACADEMIC PROGRAMME",
    h1: "IIT-JEE Coaching in Mathura",
    subheading: "JEE Main | JEE Advanced | Physics | Chemistry | Mathematics",
    paragraph:
      "At Emprise Academy, our IIT-JEE preparation is engineered around deep conceptual derivations, multi-step problem solving, and relentless testing rigor. Founded in 2011 by University of Derby (UK) alumni, we bring the disciplined pedagogy of premier coaching hubs directly to Mathura.",
    primaryCta: { label: "Explore JEE Programmes", href: "#programmes" },
    counsellingCta: { label: "Book Free Counselling", href: "#counselling" },
  },
  programCards: [
    {
      id: "class-11",
      title: "Class 11 — 2-Year Integrated Programme",
      badge: "Class 11 Students",
      targetAudience: "Students moving from Class 10 to Class 11",
      duration: "2 Academic Years",
      objective: "Build strong conceptual fundamentals early and develop competitive problem-solving habits.",
      description:
        "Designed to bridge the gap between Class 10 and advanced competitive problem solving. Covers the full Class 11 and 12 syllabus with gradual difficulty progression.",
      highlights: [
        "Fundamental theory derivations in Physics, Chemistry & Maths",
        "Gradual progression from textbook level to JEE Advanced difficulty",
        "Smooth synchronization with CBSE and state school curriculum",
        "Comprehensive 2-year testing and revision timeline",
      ],
      href: "/iit-jee-coaching-mathura/class-11",
    },
    {
      id: "class-12",
      title: "Class 12 — 1-Year Integrated Programme",
      badge: "Class 12 Students",
      targetAudience: "Students moving to Class 12",
      duration: "1 Academic Year",
      objective: "Master the Class 12 syllabus while systematically revising Class 11 backlogs and board exam requirements.",
      description:
        "An intensive 1-year program balancing Board exam mastery with high-speed JEE Main accuracy and JEE Advanced conceptual depth.",
      highlights: [
        "Targeted completion of Class 12 competitive and board syllabus",
        "Parallel structured Class 11 revision cycles and formula recaps",
        "Extensive Previous 15 Years' Question (PYQ) workshops",
        "Timed full-syllabus mock test series mimicking JEE interface",
      ],
      href: "/iit-jee-coaching-mathura/class-12",
    },
    {
      id: "dropper",
      title: "Target / Dropper — 1-Year Dedicated Batch",
      badge: "12th Pass / Droppers",
      targetAudience: "12th Pass students taking a dedicated preparation year",
      duration: "1 Academic Year (Intensive)",
      objective: "Diagnose previous attempt mistakes, eliminate concept blindspots, and maximize score through intensive problem drills.",
      description:
        "A full-time, high-rigor preparation ecosystem free from school distractions. Focused on error correction, speed optimization, and advanced question drills.",
      highlights: [
        "In-depth analysis of previous attempt weaknesses and errors",
        "Fast-track conceptual recap followed by rigorous problem solving",
        "Daily practice problem sets across all 3 subjects",
        "Frequent national-pattern full-length tests with percentile tracking",
      ],
      href: "/iit-jee-coaching-mathura/dropper",
    },
  ] as JeeProgramCard[],
  whoIsThisFor: [
    {
      title: "Students Starting in Class 11",
      description:
        "Students wanting to build early conceptual foundations in mechanics, calculus, and physical chemistry without the stress of last-minute cramming.",
    },
    {
      title: "Students Continuing in Class 12",
      description:
        "Students aiming to balance board examination marks with high-percentile JEE Main and Advanced rank preparation through structured revision.",
    },
    {
      title: "Dropper Students Taking a Focused Year",
      description:
        "Committed aspirants seeking a disciplined, distraction-free environment to correct exam strategies, eliminate backlogs, and achieve premier IIT admissions.",
    },
    {
      title: "Parents Seeking Structured Guidance",
      description:
        "Families looking for authentic, transparent academic monitoring, verified mentorship, and regular performance reporting in Mathura.",
    },
  ],
  subjectArchitecture: [
    {
      subject: "Physics",
      subtitle: "Conceptual Visualization & Mathematical Modeling",
      description:
        "Physics in IIT-JEE demands clear visualization of physical laws rather than memorization of formulas. We train students to dissect complex mechanics, electromagnetism, and modern physics problems into fundamental vector and energy equations.",
      keyPillars: [
        "Vector-based free body diagrams and force analysis",
        "Calculus-driven derivations of variable-force systems",
        "Extensive multi-concept problems linking mechanics with thermodynamics and electrostatics",
        "Step-by-step graphical analysis and dimension verification",
      ],
      topicsCovered: [
        "Mechanics & Rotational Dynamics",
        "Electrodynamics & Magnetism",
        "Optics & Wave Motion",
        "Thermodynamics & Kinetic Theory",
        "Modern Physics & Semiconductor Devices",
      ],
    },
    {
      subject: "Chemistry",
      subtitle: "Mechanistic Organic, Rigorous Physical & Structured Inorganic",
      description:
        "Chemistry is often the highest-scoring subject in JEE when approached systematically. We divide preparation into three distinct methodologies: numerical precision for Physical Chemistry, electron-flow mechanisms for Organic, and structured conceptual mastery for Inorganic.",
      keyPillars: [
        "Mechanism-based organic synthesis and stereochemistry",
        "Thermodynamic, equilibrium, and electrochemistry numerical mastery",
        "NCERT-grounded inorganic coordination compounds and periodic trends",
        "Error-free calculation habits and unit consistency checks",
      ],
      topicsCovered: [
        "Physical Chemistry (Equilibrium, Kinetics, Thermodynamics)",
        "Organic Reaction Mechanisms & Functional Groups",
        "Inorganic Chemistry (Coordination, Bonding, Metallurgy)",
        "Qualitative & Environmental Chemistry",
      ],
    },
    {
      subject: "Mathematics",
      subtitle: "Analytical Rigor, Algebraic Discipline & Multi-Step Logic",
      description:
        "Mathematics in JEE Advanced is the ultimate test of analytical endurance. We focus on teaching students multiple solution paths—algebraic, graphical, and geometric—enabling them to tackle unfamiliar problem formulations with confidence.",
      keyPillars: [
        "Graphical visualization of functions, limits, and areas",
        "Multi-step algebra, binomial expansions, and complex numbers",
        "Coordinate geometry transformations and 3D vector spaces",
        "Time-saving elimination strategies and boundary value checks",
      ],
      topicsCovered: [
        "Differential & Integral Calculus",
        "Coordinate Geometry & Conic Sections",
        "Algebra, Matrices & Complex Numbers",
        "Vectors & 3-Dimensional Geometry",
        "Trigonometry & Probability",
      ],
    },
  ] as JeeSubjectBlock[],
  jeeMainVsAdvanced: {
    main: {
      title: "JEE Main Preparation",
      focusAreas: [
        "Broad syllabus coverage across all prescribed NCERT chapters",
        "Speed and arithmetic accuracy under strict time limits (75 questions in 180 mins)",
        "Formula application and standard numerical problems",
        "High-percentile qualification for NITs, IIITs, and JEE Advanced eligibility",
      ],
    },
    advanced: {
      title: "JEE Advanced Preparation",
      focusAreas: [
        "Deep conceptual derivation and multi-chapter problem synthesis",
        "Multiple-choice questions with one or more than one correct options",
        "Comprehension passages, matrix matches, and numerical integer responses",
        "Exam strategy, disciplined question selection, and negative marking control",
      ],
    },
  },
  methodology: [
    {
      step: "01",
      title: "Concept Derivation",
      desc: "Every scientific law and mathematical theorem is derived from first principles in the classroom.",
    },
    {
      step: "02",
      title: "Daily Graded Practice",
      desc: "Students solve graded problem sets moving systematically from Level 1 (Fundamentals) to Level 3 (JEE Advanced).",
    },
    {
      step: "03",
      title: "Simulation Testing",
      desc: "Weekly chapter assessments and full-syllabus tests conducted under timed, real-exam conditions.",
    },
    {
      step: "04",
      title: "Diagnostic Analysis",
      desc: "Every test is analyzed to distinguish conceptual errors from calculation slips and unattempted questions.",
    },
    {
      step: "05",
      title: "Remedial Doubt Desk",
      desc: "Faculty mentors resolve individual student doubts daily to ensure zero accumulated conceptual debt.",
    },
    {
      step: "06",
      title: "Cyclic Revision",
      desc: "Previous chapters are continually reinforced through periodic mixed-topic mock tests and PYQs.",
    },
  ],
  testingSystem: {
    heading: "Measure. Analyse. Improve.",
    subheading:
      "Competitive exam preparation cannot rely on guesswork. Our multi-tier testing framework provides objective performance benchmarks at every stage.",
    tiers: [
      {
        title: "Weekly Chapter Assessments",
        desc: "Conducted immediately after topic completion to evaluate foundational grasp and formula application.",
      },
      {
        title: "Fortnightly Part-Syllabus Tests",
        desc: "Combines 3–4 recent chapters across Physics, Chemistry, and Maths to test multi-topic retention.",
      },
      {
        title: "Full-Syllabus Mock Simulations",
        desc: "Full 3-hour tests replicating exact JEE Main and Advanced formats with detailed percentile scorecards.",
      },
      {
        title: "Detailed Mistake Log & Analysis",
        desc: "Students maintain an error repository to systematically eliminate recurring calculation or conceptual errors.",
      },
    ],
  },
  parentGuidance: {
    heading: "What Parents Should Expect from Emprise Academy",
    subheading:
      "We believe that a student's success in IIT-JEE requires transparent coordination between the institute, the student, and the parents.",
    points: [
      {
        title: "Disciplined Academic Routine",
        desc: "A consistent schedule of lectures, daily problem solving, and testing that builds steady competitive stamina.",
      },
      {
        title: "Transparent Performance Reporting",
        desc: "Regular updates on attendance, test scores, subject-wise percentiles, and batch rank progression.",
      },
      {
        title: "Supportive, Pressure-Free Guidance",
        desc: "Our mentors encourage students to focus on continuous improvement rather than unhealthy comparison.",
      },
      {
        title: "Dedicated Faculty Accessibility",
        desc: "Parents can schedule consultations with faculty heads to review their child's academic trajectory.",
      },
    ],
  },
  faqs: [
    {
      question: "What is the primary difference between JEE Main and JEE Advanced?",
      answer:
        "JEE Main tests broad syllabus knowledge, numerical speed, and accuracy across standard question formats to determine eligibility for NITs, IIITs, and JEE Advanced. JEE Advanced tests deep analytical derivation, multi-concept problem solving, and complex multi-correct or paragraph question formats for admission to the Indian Institutes of Technology (IITs).",
    },
    {
      question: "When is the best time for a student to begin IIT-JEE preparation?",
      answer:
        "The ideal starting point is at the beginning of Class 11. A 2-year preparation timeline gives students ample time to absorb the vast syllabus, build strong foundational derivations, and complete multiple rounds of revision without exam panic.",
    },
    {
      question: "Does Emprise Academy offer separate batches for Class 11, Class 12, and Droppers?",
      answer:
        "Yes. Emprise Academy conducts separate, dedicated batches for Class 11 (2-Year Foundation), Class 12 (1-Year Syllabus + Revision), and 12th Pass Droppers (Full-time Intensive Preparation) to match the specific academic timeline of each student group.",
    },
    {
      question: "How does Emprise Academy support students with doubts and weak concepts?",
      answer:
        "We operate dedicated daily doubt resolution desks where faculty members provide one-on-one assistance to students. Test analytics also identify weak subject areas to guide targeted remedial question practice.",
    },
    {
      question: "Are tests conducted on the official JEE Main and Advanced exam pattern?",
      answer:
        "Yes. Our assessments range from weekly chapter-wise tests to full-length 3-hour computer-based and offline mock simulations with negative marking, exact section timings, and comprehensive percentile reports.",
    },
    {
      question: "How can a student take admission in the IIT-JEE programme at Emprise Academy?",
      answer:
        "Admissions can be initiated by visiting the Mathura campus for academic counselling or appearing in our annual scholarship test (ETSE 2026). You can also request a free counselling session directly through this website.",
    },
    {
      question: "Where is Emprise Academy located in Mathura?",
      answer:
        "Emprise Academy is located at the Main Academic Block, Mathura, Uttar Pradesh - 281001. Contact our desk at +91 98765 43210 or admissions@empriseacademy.com for directions and batch timings.",
    },
  ] as JeeFaqItem[],
} as const;

export const JEE_CLASS_11_DATA = {
  meta: {
    title: "JEE Coaching for Class 11 in Mathura | Emprise Academy",
    description:
      "Start your 2-year IIT-JEE preparation in Class 11 at Emprise Academy, Mathura. Build strong fundamentals in Physics, Chemistry, and Maths with balanced school support.",
    keywords: [
      "JEE Coaching for Class 11 in Mathura",
      "Class 11 IIT JEE Coaching Mathura",
      "2 Year JEE Preparation Mathura",
      "Class 11 Engineering Coaching Mathura",
      "Emprise Academy Class 11 JEE",
    ],
    canonical: "https://empriseacademy.com/iit-jee-coaching-mathura/class-11",
  },
  hero: {
    eyebrow: "2-YEAR INTEGRATED PROGRAMME",
    h1: "JEE Coaching for Class 11 in Mathura",
    subheading: "Two-Year Integrated IIT-JEE (Main & Advanced) Foundation",
    paragraph:
      "Class 11 is the crucial launchpad for IIT-JEE. At Emprise Academy, we help students make a smooth, confident transition from Class 10 board exams to rigorous competitive problem solving through fundamental conceptual derivations and daily practice.",
    primaryCta: { label: "Enroll in Class 11 JEE", href: "#counselling" },
    secondaryCta: { label: "View Syllabus Structure", href: "#syllabus" },
  },
  whyStartInClass11: [
    {
      title: "Build Fundamentals Early",
      desc: "Class 11 accounts for nearly 45–50% of the JEE syllabus. Mastering mechanics, chemical bonding, and calculus foundations early prevents overwhelming backlog in Class 12.",
    },
    {
      title: "Develop Real Problem-Solving Habits",
      desc: "Transition from textbook memorization to analytical problem solving with vector diagrams, mathematical proofs, and chemical reaction mechanisms.",
    },
    {
      title: "Sufficient Time for Dual Revision",
      desc: "A two-year timeline allows complete syllabus completion by November of Class 12, providing 4–5 months for full-length mock drills and revision.",
    },
    {
      title: "Gradual Difficulty Progression",
      desc: "Students build confidence through graded problem sheets: starting with basic concept checks and advancing to multi-correct JEE Advanced problems.",
    },
  ],
  subjectDetails: [
    {
      subject: "Physics in Class 11",
      focus: "Mechanics, Gravitation, Fluid Dynamics & Thermodynamics",
      desc: "Mechanics forms the backbone of all advanced physics. We emphasize vector algebra, free body diagrams, work-energy theorem, and rotational dynamics through conceptual derivations.",
      topics: [
        "Kinematics & Vectors",
        "Newton's Laws of Motion & Friction",
        "Work, Power & Energy",
        "Rotational Mechanics & Moment of Inertia",
        "Gravitation & Fluid Mechanics",
        "Thermodynamics & Kinetic Theory",
      ],
    },
    {
      subject: "Chemistry in Class 11",
      focus: "Atomic Structure, Bonding, Thermodynamics & Basic Organic Chemistry",
      desc: "We establish strong foundations in the Mole Concept, Quantum Mechanical Atomic Model, Chemical Bonding, and General Organic Chemistry (GOC) reaction mechanisms.",
      topics: [
        "Mole Concept & Stoichiometry",
        "Atomic Structure & Quantum Numbers",
        "Chemical Bonding & Molecular Structure",
        "Chemical Thermodynamics & Energetics",
        "Equilibrium (Chemical & Ionic)",
        "General Organic Chemistry (GOC) & Hydrocarbons",
      ],
    },
    {
      subject: "Mathematics in Class 11",
      focus: "Algebra, Trigonometry, Coordinate Geometry & Pre-Calculus",
      desc: "Class 11 mathematics introduces the algebraic discipline and geometric visualization essential for JEE Advanced coordinate geometry and calculus.",
      topics: [
        "Sets, Relations & Functions",
        "Trigonometric Functions & Equations",
        "Quadratic Equations & Complex Numbers",
        "Sequences, Series & Progression",
        "Permutations, Combinations & Binomial Theorem",
        "Straight Lines, Circles & Conic Sections (Parabola, Ellipse, Hyperbola)",
      ],
    },
  ],
  schoolJeeBalance: {
    heading: "Balancing School Curriculum and JEE Preparation",
    subheading:
      "A common worry for Class 11 parents is managing school exams alongside competitive coaching. Our academic plan is designed to harmonize both seamlessly.",
    points: [
      {
        title: "Synchronized Topic Flow",
        desc: "Our classroom syllabus is paced to align with school terms, ensuring students stay ahead in school unit tests while mastering advanced JEE depth.",
      },
      {
        title: "Dual Subjective & Objective Training",
        desc: "Students learn rigorous step-by-step derivation writing for school board examinations alongside speed tricks and elimination techniques for JEE.",
      },
      {
        title: "Dedicated Exam Break Windows",
        desc: "Coaching test schedules are adjusted during school half-yearly and annual examinations so students can excel in their school assessments without stress.",
      },
    ],
  },
  faqs: [
    {
      question: "Is Class 11 too early to start intensive IIT-JEE coaching?",
      answer:
        "No. Class 11 is the universally recommended starting point. The jump in difficulty from Class 10 to Class 11 Science is substantial, and starting early ensures students adapt smoothly without feeling overwhelmed.",
    },
    {
      question: "What should a Class 11 student focus on first?",
      answer:
        "The primary focus in the first three months should be on mastering fundamental tools: Vector Algebra and Basic Calculus in Physics, Mole Concept and Atomic Structure in Chemistry, and Functions and Trigonometry in Mathematics.",
    },
    {
      question: "How does Emprise Academy help students who fall behind?",
      answer:
        "Our faculty members conduct one-on-one doubt sessions and diagnostic test reviews. If a student misses concepts due to illness or school events, dedicated remedial guidance is provided.",
    },
    {
      question: "How can parents support their child in Class 11?",
      answer:
        "Parents should encourage consistency, ensure regular sleep and study habits, and focus on steady effort and concept understanding rather than immediate test scores during the initial adjustment phase.",
    },
  ] as JeeFaqItem[],
} as const;

export const JEE_CLASS_12_DATA = {
  meta: {
    title: "JEE Coaching for Class 12 in Mathura | Emprise Academy",
    description:
      "Master Class 12 syllabus, revise Class 11 backlogs, and ace JEE Main & Advanced with Emprise Academy Mathura. Integrated board and competitive entrance coaching.",
    keywords: [
      "JEE Coaching for Class 12 in Mathura",
      "Class 12 IIT JEE Preparation Mathura",
      "Class 12 Board and JEE Coaching",
      "JEE 1 Year Course Mathura",
      "Emprise Academy Class 12 JEE",
    ],
    canonical: "https://empriseacademy.com/iit-jee-coaching-mathura/class-12",
  },
  hero: {
    eyebrow: "1-YEAR INTEGRATED PROGRAMME",
    h1: "JEE Coaching for Class 12 in Mathura",
    subheading: "Class 12 Board Mastery + Parallel Class 11 Revision + JEE Main & Advanced",
    paragraph:
      "Class 12 requires a balanced, highly strategic approach: completing the senior secondary syllabus on time, systematically revising Class 11 concepts, and training for high-speed mock test execution while securing top board marks.",
    primaryCta: { label: "Enroll in Class 12 JEE", href: "#counselling" },
    secondaryCta: { label: "Explore Board + JEE Plan", href: "#strategy" },
  },
  corePriorities: [
    {
      title: "Timely Syllabus Completion",
      desc: "Completing the entire Class 12 competitive and board curriculum by October/November to unlock months of dedicated revision and test drills.",
    },
    {
      title: "Structured Class 11 Revision",
      desc: "Parallel weekend revision modules covering high-weightage Class 11 chapters like Mechanics, GOC, and Coordinate Geometry.",
    },
    {
      title: "Board Exam Synchronization",
      desc: "Focused subjective answer writing practice, NCERT derivations, and practical exam prep ensuring 90%+ board achievement.",
    },
    {
      title: "Extensive PYQ Solving",
      desc: "Solving the last 15 years of JEE Main and JEE Advanced papers to understand question patterns, trap options, and time allocation.",
    },
  ],
  boardJeeBalance: {
    heading: "How We Harmonize Board Exams and JEE in Class 12",
    subheading:
      "Students often feel torn between board examinations and competitive rank goals. Our structured pedagogical model handles both simultaneously.",
    strategies: [
      {
        title: "NCERT Deep-Dive for Chemistry & Physics",
        desc: "NCERT line-by-line coverage guarantees top marks in board exams while securing high-accuracy direct questions in JEE Main.",
      },
      {
        title: "Subjective Derivation Sessions",
        desc: "Dedicated weekly sessions where students practice formal subjective proofs, theorem derivations, and diagrammatic presentations for board marking schemes.",
      },
      {
        title: "Full-Length Mock Drills",
        desc: "Alternating between 3-hour subjective Board mock tests and 3-hour objective JEE computer-based simulations to build versatile mental agility.",
      },
    ],
  },
  faqs: [
    {
      question: "Can a student who did not take coaching in Class 11 join the Class 12 JEE program?",
      answer:
        "Yes. While prior preparation is beneficial, our Class 12 program includes integrated revision modules for essential Class 11 prerequisite chapters to help dedicated students catch up effectively.",
    },
    {
      question: "How is Class 11 backlog cleared during Class 12?",
      answer:
        "We schedule dedicated revision cycles and topic-specific test series for Class 11 subjects alongside regular Class 12 lectures, ensuring systematic backlog clearance without disrupting current topics.",
    },
    {
      question: "How important are previous years' questions (PYQs) for Class 12 JEE?",
      answer:
        "PYQs are essential. Solving authentic JEE Main and Advanced questions from the past 10–15 years is the single most effective way to calibrate preparation against official standards.",
    },
    {
      question: "How frequently are full-syllabus mock tests conducted for Class 12?",
      answer:
        "Following syllabus completion in late autumn, students appear for full-syllabus mock simulations weekly, increasing in frequency leading up to Session 1 and Session 2 of JEE Main.",
    },
  ] as JeeFaqItem[],
} as const;

export const JEE_DROPPER_DATA = {
  meta: {
    title: "JEE Dropper Coaching in Mathura | Emprise Academy",
    description:
      "Dedicated 1-year intensive IIT-JEE dropper coaching in Mathura at Emprise Academy. Targeted backlog elimination, advanced problem solving, and personalized mentorship.",
    keywords: [
      "JEE Dropper Coaching in Mathura",
      "JEE Repeater Batch Mathura",
      "1 Year JEE Dropper Course Mathura",
      "Target Batch IIT JEE Mathura",
      "Emprise Academy Dropper JEE",
    ],
    canonical: "https://empriseacademy.com/iit-jee-coaching-mathura/dropper",
  },
  hero: {
    eyebrow: "INTENSIVE 1-YEAR TARGET BATCH",
    h1: "JEE Dropper Coaching in Mathura",
    subheading: "Analyse. Correct. Practise. Test. Revise. Improve.",
    paragraph:
      "A drop year is a strategic decision that requires uncompromised discipline, structured daily routines, and surgical error correction. At Emprise Academy, our full-time Target Batch eliminates previous blindspots and transforms student potential into rank-winning precision.",
    primaryCta: { label: "Join JEE Dropper Batch", href: "#counselling" },
    secondaryCta: { label: "View Dropper Framework", href: "#framework" },
  },
  whoShouldDrop: {
    heading: "Who Should Consider a JEE Drop Year?",
    subheading:
      "Taking a drop year is a significant academic commitment. We believe students should make this decision based on objective readiness and clear goals.",
    profiles: [
      {
        title: "Students with Concept Gaps",
        desc: "Aspirants whose preparation was hindered by school exams or lack of structured coaching, but who possess strong foundational aptitude.",
      },
      {
        title: "Students with Strategy Deficits",
        desc: "Students who understood theory but lost marks due to poor time management, panic, or uncalibrated negative marking in their first attempt.",
      },
      {
        title: "Determined Goal-Oriented Aspirants",
        desc: "Students with the mental stamina to dedicate 10–12 months of focused, distraction-free study solely toward IIT-JEE admission.",
      },
    ],
  },
  diagnosisFramework: [
    {
      step: "01",
      title: "Previous Attempt Diagnostic Audit",
      desc: "We analyze the student's previous scorecards to classify lost marks into: Conceptual Gaps, Calculation Errors, Time Mismanagement, or Unattempted Sections.",
    },
    {
      step: "02",
      title: "Personalized Remedial Roadmap",
      desc: "Creating an individualized study plan prioritizing high-weightage weak chapters while maintaining sharp recall in already strong areas.",
    },
    {
      step: "03",
      title: "Fast-Track Theory & Heavy Problem Drills",
      desc: "Replacing repetitive basic lectures with concise formula derivations followed by massive multi-concept question solving sessions.",
    },
    {
      step: "04",
      title: "Continuous High-Frequency Mock Drills",
      desc: "Regular 3-hour tests with immediate post-test analysis to build psychological immunity to exam pressure and tricky question phrasing.",
    },
  ],
  parentGuidance: {
    heading: "Parent Guidance for the Drop Year",
    subheading:
      "A drop year can be emotionally demanding. Parental support plays a vital role in maintaining student morale.",
    points: [
      {
        title: "Maintain a Positive, Pressure-Free Home",
        desc: "Focus on daily effort and discipline rather than obsessing over test percentiles in the early months.",
      },
      {
        title: "Encourage a Healthy Daily Routine",
        desc: "Ensure consistent sleep schedules, balanced nutrition, and short physical breaks to avoid academic burnout.",
      },
      {
        title: "Trust the Structured Academic Process",
        desc: "Regular consultations with our mentors will keep you informed of steady improvements and areas needing encouragement.",
      },
    ],
  },
  faqs: [
    {
      question: "Is taking a drop year for IIT-JEE worth it?",
      answer:
        "For a dedicated student who understands where their previous preparation fell short, a drop year provides the uninterrupted time and focus needed to make substantial rank improvements.",
    },
    {
      question: "How is the Dropper batch different from Class 12 coaching?",
      answer:
        "Dropper batches are full-time and free from school schedules. Lectures move faster through basic theory and dedicate significantly more hours to advanced problem solving, mock tests, and error elimination.",
    },
    {
      question: "How does Emprise Academy handle student motivation during the drop year?",
      answer:
        "Our faculty directors and mentors hold regular one-on-one progress reviews and motivation sessions to ensure students maintain steady mental focus throughout the academic year.",
    },
    {
      question: "When do JEE Dropper batches start at Emprise Academy?",
      answer:
        "Dropper batches typically commence following the declaration of JEE Advanced results. Please contact our admissions desk for current batch commencement schedules and registration details.",
    },
  ] as JeeFaqItem[],
} as const;
