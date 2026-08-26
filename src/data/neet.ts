/**
 * Official Verified NEET-UG Academic Content Configuration for Emprise Academy
 * Single source of truth for Phase 4.2 NEET-UG Programme Ecosystem
 *
 * Pages Covered:
 * 1. /neet-coaching-mathura (Main Hub)
 * 2. /neet-coaching-mathura/class-11 (Class 11 2-Year Program)
 * 3. /neet-coaching-mathura/class-12 (Class 12 1-Year Program & Board Balance)
 * 4. /neet-coaching-mathura/dropper (Target / Repeater 1-Year Intensive Program)
 */

export interface NeetProgramCard {
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

export interface NeetSubjectBlock {
  subject: string;
  subtitle: string;
  description: string;
  keyPillars: string[];
  topicsCovered: string[];
}

export interface NeetFaqItem {
  question: string;
  answer: string;
}

export const MAIN_NEET_DATA = {
  meta: {
    title: "NEET Coaching in Mathura | NEET-UG Preparation | Emprise Academy",
    description:
      "Emprise Academy offers structured NEET-UG coaching in Mathura with NCERT-aligned conceptual clarity, regular test series in Physics, Chemistry & Biology, and personalized mentorship.",
    keywords: [
      "NEET Coaching in Mathura",
      "NEET-UG Coaching in Mathura",
      "NEET Preparation in Mathura",
      "NEET Coaching for Class 11",
      "NEET Coaching for Class 12",
      "NEET Dropper Coaching in Mathura",
      "NEET Physics",
      "NEET Chemistry",
      "NEET Biology",
      "NCERT Preparation for NEET",
    ],
    canonical: "https://empriseacademy.com/neet-coaching-mathura",
  },
  hero: {
    eyebrow: "NEET-UG ACADEMIC PROGRAMME",
    h1: "NEET Coaching in Mathura",
    subheading: "NEET-UG | Physics | Chemistry | Biology",
    paragraph:
      "At Emprise Academy, our medical entrance preparation is centered on rigorous NCERT alignment, conceptual depth in Physics and Chemistry, high-speed biology recall, and diagnostic testing. Founded in 2011, we provide medical aspirants in Mathura with a calm, disciplined, and evidence-led academic ecosystem.",
    primaryCta: { label: "Explore NEET Programmes", href: "#programmes" },
    counsellingCta: { label: "Book Free Counselling", href: "#counselling" },
  },
  programCards: [
    {
      id: "class-11",
      title: "Class 11 — 2-Year Medical Foundation",
      badge: "Class 11 Students",
      targetAudience: "Students moving from Class 10 to Class 11",
      duration: "2 Academic Years",
      objective: "Build strong conceptual fundamentals early in Physics, Chemistry & NCERT Biology.",
      description:
        "Designed to help students adapt smoothly to the extensive senior secondary syllabus with gradual difficulty progression, line-by-line NCERT mastery, and fundamental problem-solving habits.",
      highlights: [
        "In-depth NCERT Biology line-by-line coverage and concept mapping",
        "Physics numerical problem-solving training with formula derivations",
        "Physical, Organic & Inorganic chemistry conceptual foundations",
        "Balanced pacing synchronized with school term examinations",
      ],
      href: "/neet-coaching-mathura/class-11",
    },
    {
      id: "class-12",
      title: "Class 12 — 1-Year Integrated Programme",
      badge: "Class 12 Students",
      targetAudience: "Students moving to Class 12",
      duration: "1 Academic Year",
      objective: "Master Class 12 syllabus, systematically revise Class 11 backlogs, and ace Board & NEET exams.",
      description:
        "An integrated program balancing Board examination requirements with high-speed NEET question practice, diagrammatic retention, and timed 720-mark mock drills.",
      highlights: [
        "Timely Class 12 syllabus completion with board derivation workshops",
        "Concurrent Class 11 high-yield revision modules and formula recaps",
        "Extensive NEET Previous Years' Questions (PYQs) solving",
        "Full-syllabus 720-mark mock tests mimicking NTA exam patterns",
      ],
      href: "/neet-coaching-mathura/class-12",
    },
    {
      id: "dropper",
      title: "Target / Dropper — 1-Year Dedicated Batch",
      badge: "12th Pass / Droppers",
      targetAudience: "12th Pass students taking a dedicated preparation year",
      duration: "1 Academic Year (Intensive)",
      objective: "Diagnose previous score gaps, eliminate conceptual errors, and maximize speed and accuracy.",
      description:
        "A full-time, rigorous medical preparation batch free from school distractions. Focused on targeted error analysis, repetitive NCERT revision, and high-frequency mock drills.",
      highlights: [
        "Diagnostic analysis of previous attempt weaknesses and calculation slips",
        "Fast-track conceptual review with heavy numerical and MCQ drills",
        "Daily NCERT factual and diagrammatic retention checks",
        "Regular 720-mark full-syllabus simulations with percentile ranking",
      ],
      href: "/neet-coaching-mathura/dropper",
    },
  ] as NeetProgramCard[],
  whoIsThisFor: [
    {
      title: "Students Starting in Class 11",
      description:
        "Aspiring medical students looking to build steady 2-year conceptual foundations in Botany, Zoology, Chemistry, and Physics without last-minute examination stress.",
    },
    {
      title: "Students Continuing in Class 12",
      description:
        "Students needing a balanced structure to secure top board examination percentages while sharpening speed and accuracy for NEET 720-mark testing.",
    },
    {
      title: "Dropper Students Taking a Focused Year",
      description:
        "Dedicated repeaters seeking a disciplined, distraction-free environment to correct exam temperament, eliminate weak topics, and secure government medical college seats.",
    },
    {
      title: "Parents Seeking Transparent Guidance",
      description:
        "Families looking for authentic, transparent academic monitoring, verified mentorship, and regular performance reporting in Mathura.",
    },
  ],
  subjectSystem: [
    {
      subject: "Physics for NEET",
      subtitle: "Conceptual Clarity & Fast Numerical Problem Solving",
      description:
        "Physics is often the rank-decider for medical aspirants. We demystify physics by breaking down formulas into fundamental physical principles, teaching dimensional analysis, approximation techniques, and time-efficient problem setups.",
      keyPillars: [
        "Step-by-step free body diagrams and vector problem setups",
        "Calculus and algebraic derivations explained with practical examples",
        "Extensive numerical drills focusing on 45-second question execution",
        "Direct error correction for common formula traps and calculation slips",
      ],
      topicsCovered: [
        "Mechanics & Properties of Matter",
        "Thermodynamics & Kinetic Theory",
        "Electrostatics & Current Electricity",
        "Magnetism & Electromagnetic Induction",
        "Optics & Modern Physics",
      ],
    },
    {
      subject: "Chemistry for NEET",
      subtitle: "Physical Calculations, Organic Mechanisms & NCERT Inorganic",
      description:
        "Chemistry requires a tripartite approach: numerical problem-solving accuracy for Physical Chemistry, reaction mechanisms and functional group transformations for Organic, and line-by-line NCERT retention for Inorganic Chemistry.",
      keyPillars: [
        "Mole concept, thermodynamics, and equilibrium numerical mastery",
        "Named reactions, electrophilic/nucleophilic mechanisms, and reagents",
        "NCERT-grounded inorganic trends, coordination compounds, and periodic tables",
        "Periodic revision sheets for quick formula and reaction recall",
      ],
      topicsCovered: [
        "Physical Chemistry (Equilibrium, Kinetics, Thermodynamics)",
        "Organic Chemistry (Reaction Mechanisms, Biomolecules, Polymers)",
        "Inorganic Chemistry (Coordination, Chemical Bonding, p-Block, d-Block)",
        "Environmental & Analytical Chemistry",
      ],
    },
    {
      subject: "Biology for NEET (Botany & Zoology)",
      subtitle: "Line-by-Line NCERT Mastery & Concept Mapping",
      description:
        "Biology carries 50% of the total NEET marks (360 out of 720). Our pedagogy ensures total mastery over NCERT definitions, diagrams, flowcharts, and comparative tables through repeated revision cycles and diagrammatic recall tests.",
      keyPillars: [
        "Line-by-line NCERT text analysis and concept mapping",
        "Detailed dissection of textbook diagrams, labels, and summaries",
        "Statement-based, assertion-reason, and matching-type MCQ drills",
        "Daily active-recall quizzes to eliminate factual memory decay",
      ],
      topicsCovered: [
        "Cell Biology, Genetics & Molecular Basis of Inheritance",
        "Human Physiology & Plant Physiology",
        "Ecology, Environment & Biodiversity",
        "Reproduction, Growth & Development",
        "Biotechnology & Its Applications",
      ],
    },
  ] as NeetSubjectBlock[],
  ncertStrategy: {
    heading: "NCERT as the Foundational Pillar",
    subheading:
      "A successful NEET preparation strategy must place NCERT at its core, particularly for Biology and Chemistry, while building analytical problem-solving depth for Physics.",
    points: [
      {
        title: "Line-by-Line Textual Familiarity",
        desc: "Every NCERT paragraph, table, footnote, and summary is analyzed in the classroom to ensure complete familiarity with standard scientific definitions.",
      },
      {
        title: "Diagram & Flowchart Retention",
        desc: "Specialized visual sessions train students to accurately identify textbook diagram labels, physiological cycles, and biological classification trees.",
      },
      {
        title: "Concept-Linked Question Banks",
        desc: "Every chapter is supported by hundreds of NCERT-grounded MCQs, including statement-based and assertion-reason questions commonly featured in NEET.",
      },
      {
        title: "Repeated Cyclical Re-Reading",
        desc: "NCERT textbooks are revisited multiple times across the academic year to prevent factual memory decay before the final examination.",
      },
    ],
  },
  preparationSystem: [
    {
      title: "Concept Building",
      desc: "Detailed classroom lectures breaking down core principles with clarity and scientific rigor.",
    },
    {
      title: "Question Practice",
      desc: "Daily graded problem sheets moving from fundamental textbook questions to advanced competitive MCQs.",
    },
    {
      title: "NCERT Revision",
      desc: "Systematic line-by-line textual and diagrammatic revision cycles across Biology and Chemistry.",
    },
    {
      title: "Timed Testing",
      desc: "Chapter-wise, part-syllabus, and full 720-mark mock tests simulating official OMR exam environments.",
    },
    {
      title: "Performance Analysis",
      desc: "Diagnostic review of test scorecards to categorize errors into conceptual gaps, memory slips, or negative marks.",
    },
    {
      title: "Error Correction & Doubts",
      desc: "Dedicated daily doubt support and error logging to ensure recurring mistakes are permanently eliminated.",
    },
  ],
  testingSystem: {
    heading: "Test. Analyse. Improve.",
    subheading:
      "Our continuous medical assessment framework is calibrated to develop high-speed accuracy, eliminate negative marking, and build 3-hour exam endurance.",
    tiers: [
      {
        title: "Weekly Topic Tests",
        desc: "Evaluates immediate grasp of newly completed chapters in Physics, Chemistry, and Biology.",
      },
      {
        title: "Fortnightly Part-Syllabus Tests",
        desc: "Combines 3–4 recent chapters across all three subjects to test multi-topic retention.",
      },
      {
        title: "Full 720-Mark Mock Drills",
        desc: "Full-length tests with OMR bubble-sheet practice mimicking exact NTA examination timing and rules.",
      },
      {
        title: "Detailed Error Analysis",
        desc: "Diagnostic review tracking unattempted questions, calculation slips, and negative marks to guide targeted practice.",
      },
    ],
  },
  parentGuidance: {
    heading: "For Parents: What Supports Better NEET Preparation?",
    subheading:
      "Preparing for a medical career requires consistent dedication, emotional resilience, and a supportive, pressure-free domestic atmosphere.",
    points: [
      {
        title: "Balanced Daily Routine",
        desc: "Support your child in maintaining healthy sleep, balanced nutrition, and structured study hours without burnout.",
      },
      {
        title: "Focus on Continuous Growth",
        desc: "Encourage steady improvement in concept understanding and error reduction rather than comparing mock scores.",
      },
      {
        title: "Transparent Communication",
        desc: "Regular consultations with our mentors will keep you informed of your child's genuine progress and areas needing support.",
      },
      {
        title: "Calm & Encouraging Atmosphere",
        desc: "A calm, positive home environment helps medical aspirants build steady psychological endurance for competitive exams.",
      },
    ],
  },
  faqs: [
    {
      question: "What is NEET-UG and who conducts the examination?",
      answer:
        "NEET-UG (National Eligibility cum Entrance Test) is the single national entrance examination in India for admission to undergraduate medical (MBBS), dental (BDS), and AYUSH programmes in government and private institutions. It is conducted annually by the National Testing Agency (NTA).",
    },
    {
      question: "When should a student ideally start preparing for NEET-UG?",
      answer:
        "The ideal time to begin is at the start of Class 11. A two-year preparation runway allows students to thoroughly master the extensive NCERT Biology and Chemistry curriculum while building strong numerical problem-solving skills in Physics.",
    },
    {
      question: "How important is NCERT for scoring high in NEET Biology and Chemistry?",
      answer:
        "NCERT is the foundational pillar for NEET. A substantial portion of questions in Biology and Inorganic/Organic Chemistry are directly linked to NCERT textual concepts, definitions, tables, and diagrams. Emprise Academy's curriculum emphasizes thorough NCERT line-by-line mastery.",
    },
    {
      question: "Does Emprise Academy offer separate batches for Class 11, Class 12, and Droppers?",
      answer:
        "Yes. Emprise Academy operates separate, dedicated batches for Class 11 (2-Year Medical Foundation), Class 12 (1-Year Integrated Board + NEET), and 12th Pass Droppers (Full-time Intensive Preparation).",
    },
    {
      question: "How does Emprise Academy help students overcome difficulties in NEET Physics?",
      answer:
        "Physics is often challenging for medical students. We teach Physics through conceptual derivations, visual free body diagrams, and simplified algebraic steps, backed by daily practice sheets and one-on-one doubt resolution desks.",
    },
    {
      question: "How are tests conducted and performance analyzed?",
      answer:
        "We conduct weekly topic tests, fortnightly part-syllabus tests, and full 720-mark mock examinations on official OMR answer sheets. Test scorecards provide detailed insights into subject-wise accuracy, time allocation, and negative marking.",
    },
    {
      question: "Where is Emprise Academy located in Mathura?",
      answer:
        "Emprise Academy is located at the Main Academic Block, Mathura, Uttar Pradesh - 281001. Contact our admissions desk at +91 98765 43210 or admissions@empriseacademy.com for campus directions and consultation.",
    },
  ] as NeetFaqItem[],
} as const;

export const NEET_CLASS_11_DATA = {
  meta: {
    title: "NEET Coaching for Class 11 in Mathura | Emprise Academy",
    description:
      "Start your 2-year medical entrance journey in Class 11 at Emprise Academy, Mathura. Comprehensive NCERT Biology, Physics derivations, and Chemistry fundamentals.",
    keywords: [
      "NEET Coaching for Class 11 in Mathura",
      "Class 11 NEET Coaching Mathura",
      "2 Year Medical Foundation Mathura",
      "Class 11 Medical Coaching Mathura",
      "Emprise Academy Class 11 NEET",
    ],
    canonical: "https://empriseacademy.com/neet-coaching-mathura/class-11",
  },
  hero: {
    eyebrow: "2-YEAR MEDICAL FOUNDATION",
    h1: "NEET Coaching for Class 11 in Mathura",
    subheading: "Two-Year Integrated NEET-UG Foundation & Senior Secondary Preparation",
    paragraph:
      "Class 11 is the essential foundation for medical entrance. At Emprise Academy, we help students build strong conceptual clarity in Physics, Chemistry, and NCERT Biology, making the transition from Class 10 smooth, disciplined, and confident.",
    primaryCta: { label: "Enroll in Class 11 NEET", href: "#counselling" },
    secondaryCta: { label: "View Curriculum Structure", href: "#curriculum" },
  },
  whyStartInClass11: [
    {
      title: "Master High-Weightage Fundamentals Early",
      desc: "Class 11 covers core foundational topics like Cell Biology, Plant/Human Physiology, Mechanics, and Chemical Bonding that form the prerequisite base for all senior topics.",
    },
    {
      title: "Build Habitual NCERT Re-Reading",
      desc: "Develop the disciplined habit of reading, marking, and diagrammatically mapping NCERT Biology chapters early, preventing last-minute rote memorization.",
    },
    {
      title: "Overcome Physics Anxiety Early",
      desc: "Ample time in Class 11 allows medical aspirants to build numerical confidence in kinematics, work-energy, and thermodynamics through step-by-step problem solving.",
    },
    {
      title: "Smooth 2-Year Testing Timeline",
      desc: "A two-year timeline allows complete syllabus completion by November of Class 12, leaving 5 months for full-syllabus 720-mark mock drills and revision.",
    },
  ],
  subjectDetails: [
    {
      subject: "Biology in Class 11",
      focus: "Cell Structure, Biomolecules, Plant & Human Physiology, Diversity",
      desc: "Detailed line-by-line NCERT exploration, focusing on biological classification, cell division, plant transport, respiration, and human organ systems with diagrammatic retention.",
      topics: [
        "Diversity in Living World & Biological Classification",
        "Structural Organisation in Animals & Plants",
        "Cell: Structure & Function and Biomolecules",
        "Plant Physiology (Photosynthesis, Respiration, Plant Growth)",
        "Human Physiology (Digestion, Breathing, Circulation, Excretion, Locomotion, Neural & Chemical Coordination)",
      ],
    },
    {
      subject: "Physics in Class 11",
      focus: "Mechanics, Gravitation, Fluid Dynamics & Thermodynamics",
      desc: "Bridging mathematical tools (basic differentiation, integration, and vectors) with Newtonian mechanics, work-energy theorem, and thermal physics through structured numerical practice.",
      topics: [
        "Mathematical Tools, Units & Dimensions",
        "Kinematics & Laws of Motion",
        "Work, Energy & Power",
        "System of Particles & Rotational Motion",
        "Gravitation & Mechanical Properties of Solids/Fluids",
        "Thermodynamics & Kinetic Theory of Gases",
      ],
    },
    {
      subject: "Chemistry in Class 11",
      focus: "Atomic Structure, Chemical Bonding, Thermodynamics & Basic Organic",
      desc: "Establishing strong roots in stoichiometry, quantum chemistry, molecular orbital theory, chemical equilibrium, and General Organic Chemistry (GOC) reaction fundamentals.",
      topics: [
        "Some Basic Concepts of Chemistry (Mole Concept)",
        "Structure of Atom & Periodic Classification",
        "Chemical Bonding & Molecular Structure",
        "Chemical Thermodynamics & Equilibrium",
        "Redox Reactions & Hydrogen",
        "Organic Chemistry: Basic Principles, Techniques & Hydrocarbons",
      ],
    },
  ],
  schoolNeetBalance: {
    heading: "Balancing School Academics and NEET Preparation",
    subheading:
      "Our curriculum is designed to support students in excelling at their school board examinations while building competitive NEET speed and precision.",
    points: [
      {
        title: "Aligned Topic Schedules",
        desc: "Classroom teaching is synchronized with standard CBSE and school term syllabi, ensuring students perform with confidence in school internal tests.",
      },
      {
        title: "Dual Subjective & MCQ Training",
        desc: "Students learn formal descriptive answer writing and diagram presentation for school exams alongside rapid MCQ elimination techniques for NEET.",
      },
      {
        title: "Flexible Revision Windows",
        desc: "Coaching test schedules accommodate school term exams and practical assessments, minimizing academic stress for students.",
      },
    ],
  },
  faqs: [
    {
      question: "Is Class 11 too early to start coaching for NEET-UG?",
      answer:
        "No. Class 11 is the optimal time to begin. The breadth of syllabus expands significantly compared to Class 10, and starting early ensures students develop sound study habits and deep conceptual clarity without feeling rushed.",
    },
    {
      question: "How should a Class 11 medical student approach Physics?",
      answer:
        "Medical students should focus first on mathematical fundamentals: basic calculus, trigonometry, and vector algebra. Understanding derivations and solving 20–30 graded numerical problems daily builds lasting confidence.",
    },
    {
      question: "How are school practicals and board syllabi accommodated?",
      answer:
        "Our teaching directly incorporates NCERT laboratory concepts, diagrams, and theoretical derivations, ensuring students excel in both their school practicals and competitive entrance exams.",
    },
    {
      question: "How can parents support their child during Class 11 NEET preparation?",
      answer:
        "Parents can provide a calm, encouraging domestic environment, ensure consistent daily sleep routines, and focus on steady effort and concept understanding rather than immediate test rankings during the adjustment period.",
    },
  ] as NeetFaqItem[],
} as const;

export const NEET_CLASS_12_DATA = {
  meta: {
    title: "NEET Coaching for Class 12 in Mathura | Emprise Academy",
    description:
      "Master Class 12 NCERT syllabus, revise Class 11 topics, and prepare for NEET-UG with Emprise Academy Mathura. Integrated board and medical entrance coaching.",
    keywords: [
      "NEET Coaching for Class 12 in Mathura",
      "Class 12 Medical Coaching Mathura",
      "Class 12 Board and NEET Coaching",
      "NEET 1 Year Course Mathura",
      "Emprise Academy Class 12 NEET",
    ],
    canonical: "https://empriseacademy.com/neet-coaching-mathura/class-12",
  },
  hero: {
    eyebrow: "1-YEAR INTEGRATED PROGRAMME",
    h1: "NEET Coaching for Class 12 in Mathura",
    subheading: "Class 12 Board Mastery + Parallel Class 11 Revision + NEET-UG 720-Mark Mock Series",
    paragraph:
      "Class 12 requires a disciplined, strategic balance: completing the senior secondary syllabus on time, systematically revising Class 11 backlogs, and training for high-speed 720-mark mock drills while securing excellent board marks.",
    primaryCta: { label: "Enroll in Class 12 NEET", href: "#counselling" },
    secondaryCta: { label: "Explore Revision Plan", href: "#revision" },
  },
  corePriorities: [
    {
      title: "Timely Class 12 Syllabus Completion",
      desc: "Completing the entire Class 12 NEET and Board curriculum by October/November to dedicate 5 months to full-syllabus mock drills and revision.",
    },
    {
      title: "Systematic Class 11 Backlog Revision",
      desc: "Parallel weekend revision modules covering high-yield Class 11 topics such as Human Physiology, Plant Physiology, Mechanics, and Chemical Bonding.",
    },
    {
      title: "Board Examination Synchronization",
      desc: "Structured subjective answer writing sessions, NCERT diagram drawings, and derivation practice ensuring 90%+ board achievement.",
    },
    {
      title: "Extensive NEET PYQ Solving",
      desc: "Solving the last 15 years of NEET and AIPMT question papers to internalize question formats, common traps, and time allocation.",
    },
  ],
  boardNeetBalance: {
    heading: "How We Balance Board Exams and NEET in Class 12",
    subheading:
      "Medical aspirants need not choose between Board marks and NEET ranks. Our integrated pedagogical framework addresses both simultaneously.",
    strategies: [
      {
        title: "NCERT Textual Mastery",
        desc: "NCERT line-by-line coverage guarantees full marks in Board subjective questions while directly securing 85–90% of NEET Biology and Chemistry questions.",
      },
      {
        title: "Subjective Derivation & Diagram Practice",
        desc: "Dedicated sessions where students practice formal biological diagrams, labeled pathways, and Physics derivations required for board exam formats.",
      },
      {
        title: "Dual Mock Testing Series",
        desc: "Alternating between subjective 3-hour Board model tests and timed 720-mark OMR NEET simulations to build versatile academic performance.",
      },
    ],
  },
  faqs: [
    {
      question: "Can a student who did not join coaching in Class 11 succeed in Class 12 NEET?",
      answer:
        "Yes. Dedicated students who commit to disciplined study can succeed. Our Class 12 program incorporates structured Class 11 revision modules to help students cover prerequisite topics systematically.",
    },
    {
      question: "How is Class 11 backlog addressed during Class 12?",
      answer:
        "We conduct dedicated weekend revision lectures and topic-specific tests for Class 11 subjects, allowing students to clear accumulated backlogs without disturbing their ongoing Class 12 syllabus.",
    },
    {
      question: "How important are Previous Years' Questions (PYQs) for Class 12 NEET?",
      answer:
        "PYQs are essential. Practicing authentic past examination questions from the last 10–15 years is the most effective way to understand exam trends, repeat topics, and question phrasing.",
    },
    {
      question: "How frequently are full-syllabus 720-mark mock tests conducted?",
      answer:
        "Following syllabus completion in late autumn, full-length 720-mark mock tests are conducted weekly on official OMR sheets, increasing in frequency leading up to the NEET-UG examination.",
    },
  ] as NeetFaqItem[],
} as const;

export const NEET_DROPPER_DATA = {
  meta: {
    title: "NEET Dropper Coaching in Mathura | Emprise Academy",
    description:
      "Dedicated 1-year intensive NEET-UG dropper coaching in Mathura at Emprise Academy. Diagnostic error correction, NCERT mastery, and full-length mock drills.",
    keywords: [
      "NEET Dropper Coaching in Mathura",
      "NEET Repeater Batch Mathura",
      "1 Year NEET Dropper Course Mathura",
      "Target Batch NEET Mathura",
      "Emprise Academy Dropper NEET",
    ],
    canonical: "https://empriseacademy.com/neet-coaching-mathura/dropper",
  },
  hero: {
    eyebrow: "INTENSIVE 1-YEAR TARGET BATCH",
    h1: "NEET Dropper Coaching in Mathura",
    subheading: "Analyse. Correct. Practise. Test. Revise. Improve.",
    paragraph:
      "A drop year for NEET is a strategic decision that demands uncompromised focus, disciplined daily routines, and surgical error correction. At Emprise Academy, our full-time Target Batch eliminates previous preparation blindspots and transforms student potential into rank-winning precision.",
    primaryCta: { label: "Join NEET Dropper Batch", href: "#counselling" },
    secondaryCta: { label: "View Diagnostic Blueprint", href: "#blueprint" },
  },
  whoShouldDrop: {
    heading: "Who Should Consider a NEET Drop Year?",
    subheading:
      "Taking a drop year is a significant academic and personal decision. We encourage students and parents to evaluate readiness objectively.",
    profiles: [
      {
        title: "Students with Concept Gaps",
        desc: "Aspirants whose preparation was hindered by board exams or lack of structured guidance, but who possess strong foundational aptitude and dedication.",
      },
      {
        title: "Students with Strategy Deficits",
        desc: "Students who understood theory but lost marks due to poor time management, uncalibrated negative marking, or panic in their previous attempt.",
      },
      {
        title: "Determined Goal-Oriented Aspirants",
        desc: "Students with the mental stamina to commit 10–12 months of focused, full-time study solely toward securing admission to a government medical college.",
      },
    ],
  },
  diagnosisFramework: [
    {
      step: "01",
      title: "Previous Attempt Diagnostic Audit",
      desc: "We analyze previous NEET scorecards and question papers to classify lost marks into: Conceptual Gaps, NCERT Textual Lapses, Calculation Errors, or Negative Marking.",
    },
    {
      step: "02",
      title: "Individualized Remedial Plan",
      desc: "Designing a targeted study schedule prioritizing weak subjects—typically Physics numericals or Organic Chemistry mechanisms—while maintaining sharp recall in Biology.",
    },
    {
      step: "03",
      title: "Fast-Track Concept Recap & High-Volume MCQs",
      desc: "Replacing repetitive basic lectures with concise formula derivations followed by rigorous, timed question-solving sessions across all 3 subjects.",
    },
    {
      step: "04",
      title: "Continuous Full-Syllabus OMR Simulations",
      desc: "High-frequency 720-mark mock tests conducted under official exam conditions, building psychological resilience and time-management mastery.",
    },
  ],
  parentGuidance: {
    heading: "Parent Guidance for the NEET Drop Year",
    subheading:
      "A drop year can be emotionally demanding. Parental support plays a vital role in keeping students motivated and resilient.",
    points: [
      {
        title: "Supportive, Pressure-Free Domestic Space",
        desc: "Focus on encouraging daily study discipline rather than obsessing over immediate mock test scores in the initial months.",
      },
      {
        title: "Encourage a Healthy Routine",
        desc: "Ensure consistent sleep schedules, balanced nutrition, and brief physical breaks to maintain steady academic stamina.",
      },
      {
        title: "Trust the Structured Academic Process",
        desc: "Regular consultations with our mentors will keep you informed of steady improvements and areas needing positive encouragement.",
      },
    ],
  },
  faqs: [
    {
      question: "Is taking a drop year for NEET-UG a good decision?",
      answer:
        "For a committed student who understands where their previous preparation fell short, a drop year provides the dedicated time and full-time environment needed to make substantial score and rank improvements.",
    },
    {
      question: "How is the Dropper batch different from Class 12 coaching?",
      answer:
        "Dropper batches are full-time and free from school schedules. Lectures move faster through basic theory and dedicate significantly more hours to advanced problem solving, NCERT review, mock tests, and error elimination.",
    },
    {
      question: "How does Emprise Academy handle student morale during the drop year?",
      answer:
        "Our faculty mentors hold regular one-on-one progress reviews and motivation sessions to ensure students maintain steady confidence and mental focus throughout the academic year.",
    },
    {
      question: "When do NEET Dropper batches commence at Emprise Academy?",
      answer:
        "Dropper batches typically commence following the declaration of NEET-UG results. Please contact our admissions desk at the Mathura campus for current batch commencement schedules and registration details.",
    },
  ] as NeetFaqItem[],
} as const;
