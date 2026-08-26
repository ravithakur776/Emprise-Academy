/**
 * Official Verified Foundation Academic Content Configuration for Emprise Academy
 * Single source of truth for Phase 4.3 Foundation Coaching Ecosystem
 *
 * Pages Covered:
 * 1. /foundation-coaching-mathura (Main Hub - Classes 8, 9 & 10)
 * 2. /foundation-coaching-mathura/class-8 (Class 8: Curiosity & Strong Fundamentals)
 * 3. /foundation-coaching-mathura/class-9 (Class 9: Analytical Thinking & Concept Depth)
 * 4. /foundation-coaching-mathura/class-10 (Class 10: Board Mastery & Transition to Class 11)
 */

export interface FoundationProgramCard {
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

export interface FoundationSubjectBlock {
  subject: string;
  subtitle: string;
  description: string;
  keyPillars: string[];
  topicsCovered: string[];
}

export interface FoundationFaqItem {
  question: string;
  answer: string;
}

export const MAIN_FOUNDATION_DATA = {
  meta: {
    title: "Foundation Coaching in Mathura | Classes 8, 9 & 10 | Emprise Academy",
    description:
      "Emprise Academy offers structured Foundation coaching in Mathura for Classes 8, 9 & 10. Strengthen Mathematics and Science concepts, build logical thinking, and prepare for future competitive exams without pressure.",
    keywords: [
      "Foundation Coaching in Mathura",
      "Foundation Classes in Mathura",
      "Foundation Coaching for Class 8",
      "Foundation Coaching for Class 9",
      "Foundation Coaching for Class 10",
      "JEE Foundation in Mathura",
      "NEET Foundation in Mathura",
      "Foundation Preparation for Competitive Exams",
      "Emprise Academy Foundation",
    ],
    canonical: "https://empriseacademy.com/foundation-coaching-mathura",
  },
  hero: {
    eyebrow: "FOUNDATION ACADEMIC PROGRAMME",
    h1: "Foundation Coaching for Classes 8, 9 & 10 in Mathura",
    subheading: "Strong Fundamentals • Analytical Thinking • Problem Solving",
    paragraph:
      "At Emprise Academy, our Foundation programme helps students develop a genuine understanding of Science and Mathematics, cultivate structured problem-solving habits, and build academic confidence. Founded in 2011, we nurture curiosity and logical thinking early—setting the stage for future competitive readiness without premature examination pressure.",
    primaryCta: { label: "Explore Foundation Programmes", href: "#programmes" },
    counsellingCta: { label: "Book Free Counselling", href: "#counselling" },
  },
  programCards: [
    {
      id: "class-8",
      title: "Class 8 Foundation — Curiosity & Core Fundamentals",
      badge: "Class 8 Students",
      targetAudience: "Students moving from Class 7 to Class 8",
      duration: "1 Academic Year",
      objective: "Build strong conceptual curiosity, numerical confidence, and basic scientific reasoning.",
      description:
        "Designed to help young learners discover the 'why' behind mathematical formulas and natural phenomena, establishing disciplined self-study habits before high school.",
      highlights: [
        "Interactive mathematical reasoning and arithmetic discipline",
        "Hands-on scientific principles in Physics, Chemistry & Biology",
        "Introduction to logical deduction, puzzles, and mental ability",
        "Age-appropriate pacing synchronized with school curriculum",
      ],
      href: "/foundation-coaching-mathura/class-8",
    },
    {
      id: "class-9",
      title: "Class 9 Foundation — Concept Depth & Analytical Rigor",
      badge: "Class 9 Students",
      targetAudience: "Students entering Class 9",
      duration: "1 Academic Year",
      objective: "Develop analytical problem-solving skills and master fundamental high school science.",
      description:
        "Class 9 introduces significant conceptual depth in Laws of Motion, Gravitation, Atomic Structure, and Coordinate Geometry. We train students to solve multi-step problems systematically.",
      highlights: [
        "Conceptual derivations in Classical Mechanics and Structure of Atom",
        "Algebraic discipline, geometric proofs, and graphical interpretation",
        "Step-by-step problem-solving worksheets moving beyond standard textbooks",
        "Early competitive orientation for Olympiads and talent search exams",
      ],
      href: "/foundation-coaching-mathura/class-9",
    },
    {
      id: "class-10",
      title: "Class 10 Foundation — Board Excellence & Transition Readiness",
      badge: "Class 10 Students",
      targetAudience: "Students entering Class 10",
      duration: "1 Academic Year",
      objective: "Achieve top Board examination marks while building a seamless bridge to Class 11 JEE / NEET.",
      description:
        "A dual-purpose programme ensuring complete mastery of Class 10 CBSE/State Board syllabi alongside advanced conceptual bridging modules for senior secondary science and mathematics.",
      highlights: [
        "Thorough Board exam subjective answer writing and diagram practice",
        "Advanced conceptual modules in Trigonometry, Calculus basics, and Optics",
        "Smooth academic bridge eliminating the sudden Class 11 difficulty jump",
        "Regular term assessments and full-syllabus board model test drills",
      ],
      href: "/foundation-coaching-mathura/class-10",
    },
  ] as FoundationProgramCard[],
  whyFoundationMatters: {
    heading: "Why Build Your Academic Foundation Early?",
    subheading:
      "A strong foundation is not about premature competitive stress. It is about equipping young minds with the conceptual clarity and cognitive discipline that make all future learning effortless.",
    points: [
      {
        title: "Strong Conceptual Roots",
        desc: "Students learn the fundamental 'why' and 'how' behind scientific laws and mathematical theorems rather than memorizing steps blindly.",
      },
      {
        title: "Mathematical Confidence",
        desc: "Overcome fear of numbers and equations through structured visualization, algebraic proofs, and geometry problem-solving.",
      },
      {
        title: "Scientific Inquiry & Logic",
        desc: "Develop logical deduction and hypothesis testing skills that form the bedrock of physics, chemistry, and biological sciences.",
      },
      {
        title: "Analytical Problem Solving",
        desc: "Train the brain to break down complex, unfamiliar word problems into logical, manageable calculation steps.",
      },
      {
        title: "Disciplined Study Habits",
        desc: "Establish consistent daily homework routines, neat note-taking habits, and regular revision cycles early in middle school.",
      },
      {
        title: "Seamless Transition to Class 11",
        desc: "Eliminate the shock of the sudden syllabus jump when transitioning from Class 10 board level to Class 11 JEE or NEET.",
      },
    ],
  },
  subjectFoundation: [
    {
      subject: "Mathematics Foundation",
      subtitle: "Logical Reasoning, Geometric Proofs & Algebraic Fluency",
      description:
        "Mathematics in our Foundation programme is taught as a language of logic. We emphasize conceptual proofs, algebraic manipulation, number theory, geometry visualization, and multi-step word problems.",
      keyPillars: [
        "Algebraic identities, equations, and factorization logic",
        "Geometric visualization, coordinate graphs, and theorem proofs",
        "Commercial mathematics, trigonometry foundations, and statistics",
        "Mental ability, number puzzles, and pattern recognition",
      ],
      topicsCovered: [
        "Number Systems & Polynomials",
        "Linear Equations & Quadratic Foundations",
        "Coordinate & Euclidean Geometry",
        "Trigonometry & Mensuration",
        "Statistics, Probability & Logic",
      ],
    },
    {
      subject: "Science Foundation",
      subtitle: "Physics Mechanics, Chemical Reactions & Biological Systems",
      description:
        "Science is taught through observation and first principles. Students learn the foundational physics laws, chemical atomic models, and biological cell structures that reappear in senior competitive exams.",
      keyPillars: [
        "Physics: Motion, Force, Energy, Light, and Electricity fundamentals",
        "Chemistry: Atomic structure, chemical bonding, acids/bases, and reactions",
        "Biology: Cell structure, plant/animal physiology, and environmental systems",
        "Scientific method: Observation, hypothesis formulation, and structured deduction",
      ],
      topicsCovered: [
        "Physics (Motion, Force, Gravitation, Work & Energy, Optics, Electricity)",
        "Chemistry (Matter, Atoms & Molecules, Chemical Reactions, Periodic Basics)",
        "Biology (Cell Biology, Tissues, Life Processes, Heredity & Environment)",
        "Scientific Inquiry & Experimental Observations",
      ],
    },
  ] as FoundationSubjectBlock[],
  methodology: [
    {
      step: "01",
      title: "Understand the Idea",
      desc: "Every concept is introduced with relatable physical examples and clear conceptual derivations.",
    },
    {
      step: "02",
      title: "Apply to Problems",
      desc: "Students practice graded problem sets moving from basic textbook questions to creative application problems.",
    },
    {
      step: "03",
      title: "Check Understanding",
      desc: "Short chapter checkpoints help students test their recall and formula application in a low-stress setting.",
    },
    {
      step: "04",
      title: "Identify Mistakes",
      desc: "Teachers guide students to recognize where their reasoning slipped: conceptual gap, misreading, or calculation slip.",
    },
    {
      step: "05",
      title: "Correct Weak Areas",
      desc: "One-on-one doubt guidance ensures no unresolved questions linger into subsequent chapters.",
    },
    {
      step: "06",
      title: "Strengthen Retention",
      desc: "Cyclic revision worksheets reinforce previous terms and prevent long-term memory decay.",
    },
  ],
  schoolPlusFoundation: {
    heading: "School Learning + Foundation = Stronger Academic Base",
    subheading:
      "Foundation coaching at Emprise Academy complements school education by adding conceptual depth and analytical problem solving without overloading the student.",
    points: [
      {
        title: "Complements School Syllabus",
        desc: "Our teaching pace aligns with school terms, ensuring students feel confident and prepared for school unit tests and term examinations.",
      },
      {
        title: "Deepens Problem Solving",
        desc: "While schools ensure syllabus coverage, our foundation sessions train students to solve non-routine and higher-order thinking (HOTS) questions.",
      },
      {
        title: "Balanced Daily Workload",
        desc: "Carefully calibrated homework sheets ensure students have ample time for school assignments, sports, and healthy family routines.",
      },
    ],
  },
  readinessNotPressure: {
    heading: "Foundation Is About Readiness, Not Premature Pressure",
    subheading:
      "We firmly believe that young students in Classes 8–10 should not be subjected to high-stress competitive environments. Learning must remain age-appropriate, encouraging, and intellectually joyful.",
    points: [
      {
        title: "Preserving Natural Curiosity",
        desc: "We encourage questions and exploratory thinking rather than rote formula drills and endless memorization.",
      },
      {
        title: "Gradual Difficulty Escalation",
        desc: "Problem difficulty increases smoothly over months, building authentic confidence rather than exam intimidation.",
      },
      {
        title: "Supportive Academic Culture",
        desc: "Our mentors celebrate effort, logical reasoning, and conceptual improvement over mere competitive rankings.",
      },
    ],
  },
  parentGuidance: {
    heading: "What Parents Should Look for in a Foundation Programme",
    subheading:
      "Choosing an academic foundation programme for a middle-school student is about long-term intellectual growth and healthy study habits.",
    points: [
      {
        title: "Emphasis on Understanding Over Memorization",
        desc: "Ensure the teaching builds genuine scientific curiosity rather than forcing children to memorize senior-level formulas blindly.",
      },
      {
        title: "Supportive, Stress-Free Atmosphere",
        desc: "A positive classroom environment where asking doubts is welcomed builds self-confidence in shy or hesitating students.",
      },
      {
        title: "Constructive Progress Feedback",
        desc: "Regular, meaningful feedback from teachers highlighting strengths and guiding improvement without comparison.",
      },
      {
        title: "Balanced Academic Lifestyle",
        desc: "Programmes should leave sufficient time for school academics, extracurriculars, physical activity, and adequate rest.",
      },
    ],
  },
  faqs: [
    {
      question: "What is Foundation Coaching at Emprise Academy?",
      answer:
        "Foundation coaching is an academic enrichment programme for students of Classes 8, 9, and 10. It focuses on building strong conceptual clarity in Science and Mathematics, developing logical reasoning, and establishing disciplined study habits to prepare students for future academic and competitive pursuits.",
    },
    {
      question: "Which classes are eligible for the Foundation programme?",
      answer:
        "Emprise Academy conducts separate, age-appropriate Foundation batches for students of Class 8, Class 9, and Class 10.",
    },
    {
      question: "Is Foundation coaching only meant for students aiming for IIT-JEE or NEET?",
      answer:
        "No. While Foundation coaching builds an excellent base for future engineering (JEE) and medical (NEET) entrance exams, it equally benefits students aiming for Olympiads, NTSE/talent search exams, top Board results, or simply wanting stronger analytical and mathematical confidence.",
    },
    {
      question: "How does Foundation coaching differ from regular school learning?",
      answer:
        "Foundation coaching complements school education by focusing on conceptual derivations, application-based problem solving, and logical thinking beyond standard textbook exercises, while keeping syllabus topics harmonized with school requirements.",
    },
    {
      question: "Does Foundation coaching create unnecessary academic pressure for young students?",
      answer:
        "Not at Emprise Academy. Our Foundation philosophy is built on 'Readiness, Not Pressure.' We emphasize age-appropriate learning, interactive problem solving, and supportive mentorship without high-stakes competitive ranking stress.",
    },
    {
      question: "Are tests conducted regularly in the Foundation programme?",
      answer:
        "Yes. We conduct periodic chapter checkpoints and term assessments designed to test conceptual understanding and provide constructive feedback to help students correct errors early.",
    },
    {
      question: "How can a student take admission in the Foundation programme?",
      answer:
        "Admissions can be initiated by visiting our Mathura campus for an academic consultation or appearing in our annual scholarship test (ETSE 2026). You can also request a free counselling session directly through this website.",
    },
    {
      question: "Where is Emprise Academy located in Mathura?",
      answer:
        "Emprise Academy is located at the Main Academic Block, Mathura, Uttar Pradesh - 281001. Contact our desk at +91 98765 43210 or admissions@empriseacademy.com for batch schedules and campus visits.",
    },
  ] as FoundationFaqItem[],
} as const;

export const FOUNDATION_CLASS_8_DATA = {
  meta: {
    title: "Class 8 Foundation Coaching in Mathura | Emprise Academy",
    description:
      "Nurture curiosity and strong academic fundamentals in Class 8 at Emprise Academy, Mathura. Science concepts, mathematical reasoning, and disciplined study habits.",
    keywords: [
      "Class 8 Foundation Coaching in Mathura",
      "Class 8 Science and Maths Coaching Mathura",
      "Class 8 Olympiad Coaching Mathura",
      "Foundation Programme Class 8 Mathura",
      "Emprise Academy Class 8 Foundation",
    ],
    canonical: "https://empriseacademy.com/foundation-coaching-mathura/class-8",
  },
  hero: {
    eyebrow: "CLASS 8 FOUNDATION PROGRAMME",
    h1: "Class 8 Foundation Coaching in Mathura",
    subheading: "Curiosity • Core Fundamentals • Mathematical Confidence",
    paragraph:
      "Class 8 is the ideal time to build strong learning habits and discover the joy of problem solving. At Emprise Academy, we help middle-school students strengthen core Mathematics and Science concepts, cultivate logical thinking, and develop confident academic routines before the jump to higher classes.",
    primaryCta: { label: "Enroll in Class 8 Foundation", href: "#counselling" },
    secondaryCta: { label: "View Curriculum Plan", href: "#curriculum" },
  },
  whyClass8Matters: [
    {
      title: "Transition to Abstract Concepts",
      desc: "Class 8 introduces foundational algebraic variables, linear equations, cell biology, and force concepts that require logical thinking rather than direct memorization.",
    },
    {
      title: "Overcome Fear of Mathematics",
      desc: "Young learners build arithmetic confidence and geometrical intuition through visual proofs, number puzzles, and step-by-step problem breakdowns.",
    },
    {
      title: "Scientific Curiosity & Observation",
      desc: "Students learn to ask 'why' natural phenomena occur—exploring pressure, friction, chemical changes, and living systems with genuine interest.",
    },
    {
      title: "Establish Daily Self-Study Habits",
      desc: "Setting up a regular 1–2 hour daily study routine in Class 8 makes the increased academic demands of Class 9 and 10 feel completely manageable.",
    },
  ],
  subjectDetails: [
    {
      subject: "Mathematics in Class 8",
      focus: "Rational Numbers, Linear Equations, Geometry & Mensuration",
      desc: "Building rock-solid arithmetic and algebraic fluency, understanding properties of quadrilaterals, exponents, factorization, and data handling with clear visual methods.",
      topics: [
        "Rational Numbers & Exponents",
        "Linear Equations in One Variable",
        "Understanding Quadrilaterals & Practical Geometry",
        "Algebraic Expressions & Factorization",
        "Mensuration (Surface Areas & Volumes)",
        "Direct & Inverse Proportions and Data Handling",
      ],
    },
    {
      subject: "Science in Class 8",
      focus: "Physics, Chemistry & Biology Core Fundamentals",
      desc: "Exploring forces, friction, pressure, chemical effects of current, metals and non-metals, cell structure, and conservation of plants and animals through conceptual clarity.",
      topics: [
        "Force & Pressure, Friction & Sound",
        "Chemical Effects of Electric Current & Light",
        "Synthetic Fibres, Plastics, Metals & Non-Metals",
        "Cell Structure & Functions",
        "Reproduction in Animals & Microorganisms",
        "Pollution of Air & Water and Natural Resources",
      ],
    },
    {
      subject: "Mental Ability & Logical Reasoning",
      focus: "Pattern Recognition, Logical Puzzles & Analytical Deduction",
      desc: "Introducing middle-school students to number series, coding-decoding, spatial patterns, and deductive logic that sharpen everyday cognitive agility.",
      topics: [
        "Number & Alphabet Series",
        "Coding-Decoding & Analogy",
        "Direction Sense & Blood Relations",
        "Venn Diagrams & Syllogisms Basics",
        "Spatial Reasoning & Mathematical Puzzles",
      ],
    },
  ],
  faqs: [
    {
      question: "Is Class 8 too early for a Foundation coaching programme?",
      answer:
        "Not at all, provided the coaching focuses on fundamental conceptual understanding and curiosity rather than exam pressure. In Class 8, our goal is simply to build mathematical confidence, clear scientific concepts, and disciplined study habits.",
    },
    {
      question: "What should a Class 8 student focus on primarily?",
      answer:
        "A Class 8 student should focus on algebraic manipulation, geometric theorem proofs, reading comprehension, and asking questions about scientific laws rather than memorizing definitions.",
    },
    {
      question: "How does Class 8 Foundation support school studies?",
      answer:
        "Our curriculum moves in harmony with school term syllabi, helping students achieve excellent marks in their school exams while building the analytical ability to solve advanced problems.",
    },
    {
      question: "How can parents best support a Class 8 student?",
      answer:
        "Parents should encourage consistent daily study times, celebrate curiosity and effort, and avoid creating premature competitive anxiety around future college entrance exams.",
    },
  ] as FoundationFaqItem[],
} as const;

export const FOUNDATION_CLASS_9_DATA = {
  meta: {
    title: "Class 9 Foundation Coaching in Mathura | Emprise Academy",
    description:
      "Strengthen concepts, analytical thinking, and higher-level problem solving in Class 9 at Emprise Academy, Mathura. Advanced Mathematics and Science foundation.",
    keywords: [
      "Class 9 Foundation Coaching in Mathura",
      "Class 9 Science Coaching Mathura",
      "Class 9 Maths Coaching Mathura",
      "Class 9 Olympiad Preparation Mathura",
      "Emprise Academy Class 9 Foundation",
    ],
    canonical: "https://empriseacademy.com/foundation-coaching-mathura/class-9",
  },
  hero: {
    eyebrow: "CLASS 9 FOUNDATION PROGRAMME",
    h1: "Class 9 Foundation Coaching in Mathura",
    subheading: "Conceptual Depth • Analytical Thinking • Higher-Level Problem Solving",
    paragraph:
      "Class 9 marks a decisive shift from descriptive middle-school science to rigorous analytical concepts. At Emprise Academy, we help students master Newtonian mechanics, atomic theory, and coordinate geometry through step-by-step problem solving and structured academic discipline.",
    primaryCta: { label: "Enroll in Class 9 Foundation", href: "#counselling" },
    secondaryCta: { label: "View Curriculum Plan", href: "#curriculum" },
  },
  academicDevelopment: [
    {
      title: "Master High School Science Depth",
      desc: "Class 9 introduces Laws of Motion, Gravitation, Work-Energy, and Atomic Structure—topics that form nearly 50% of senior physics and chemistry prerequisites.",
    },
    {
      title: "Develop Analytical Problem Solving",
      desc: "Train students to dissect complex, multi-step word problems into mathematical equations, vector diagrams, and logical proofs.",
    },
    {
      title: "Build Comfort with Geometry & Algebra",
      desc: "Deepen understanding of polynomials, linear equations in two variables, coordinate geometry, and Euclidean circle/triangle proofs.",
    },
    {
      title: "Early Competitive Exam Orientation",
      desc: "Introduce students to Olympiad and talent search exam question patterns, developing time management and analytical stamina.",
    },
  ],
  subjectDetails: [
    {
      subject: "Mathematics in Class 9",
      focus: "Polynomials, Coordinate Geometry, Triangles, Circles & Surface Areas",
      desc: "Rigorous algebraic foundations, coordinate geometry Cartesian planes, Euclidean geometric proofs, and advanced mensuration formulas.",
      topics: [
        "Number Systems & Real Numbers",
        "Polynomials & Algebraic Identities",
        "Coordinate Geometry & Linear Equations in Two Variables",
        "Lines, Angles, Triangles & Quadrilaterals (Proofs)",
        "Circles, Heron's Formula & Surface Areas/Volumes",
        "Statistics & Probability Basics",
      ],
    },
    {
      subject: "Physics in Class 9",
      focus: "Motion, Force, Gravitation, Work, Energy & Sound",
      desc: "Kinematics equations, graphical analysis of motion, Newton's Laws of Motion, universal gravitation, and work-energy theorem through conceptual derivations.",
      topics: [
        "Motion & Graphical Representation (v-t and s-t graphs)",
        "Force & Newton's Laws of Motion",
        "Gravitation, Mass, Weight & Flotation (Archimedes' Principle)",
        "Work, Energy & Power",
        "Sound & Wave Propagation",
      ],
    },
    {
      subject: "Chemistry in Class 9",
      focus: "Matter, Atoms, Molecules & Structure of the Atom",
      desc: "Fundamental particle models, Thomson/Rutherford/Bohr atomic models, chemical formulas, valency, and mole concept calculations.",
      topics: [
        "Matter in Our Surroundings & Purity of Matter",
        "Atoms & Molecules (Laws of Chemical Combination)",
        "Structure of the Atom (Electrons, Protons, Neutrons)",
        "Valency, Isotopes & Isobars",
      ],
    },
    {
      subject: "Biology in Class 9",
      focus: "Cell Structure, Tissues, Diversity & Natural Resources",
      desc: "Cellular organelles, plant and animal tissues, biological classification fundamentals, and food resource management.",
      topics: [
        "The Fundamental Unit of Life (Cell Organelles)",
        "Tissues (Meristematic, Permanent, Epithelial, Connective)",
        "Diversity in Living Organisms Basics",
        "Improvement in Food Resources",
      ],
    },
  ],
  faqs: [
    {
      question: "Why is Class 9 considered a critical transition year?",
      answer:
        "Class 9 is where science shifts from general descriptions to mathematical modeling: motion graphs, Newton's laws, and atomic calculations. Mastering these concepts early ensures students do not struggle in Class 10 boards or Class 11 competitive preparation.",
    },
    {
      question: "How does Class 9 Foundation help with problem solving?",
      answer:
        "We teach students structured problem-solving methodologies: identifying given quantities, drawing free-body/geometric diagrams, selecting the correct formula, and verifying units.",
    },
    {
      question: "How is school study balanced with Class 9 Foundation coaching?",
      answer:
        "Our syllabus flow directly mirrors school terms, ensuring that students perform at the top of their school classes while learning higher-order application skills.",
    },
    {
      question: "Are tests in Class 9 Foundation subjective or objective?",
      answer:
        "We conduct both: subjective tests to build clear derivation and proof writing for school exams, and objective MCQ quizzes to develop rapid logical deduction skills.",
    },
  ] as FoundationFaqItem[],
} as const;

export const FOUNDATION_CLASS_10_DATA = {
  meta: {
    title: "Class 10 Foundation Coaching in Mathura | Emprise Academy",
    description:
      "Ace Class 10 Board examinations while building a strong academic bridge to Class 11 JEE / NEET at Emprise Academy, Mathura. Board mastery and competitive foundation.",
    keywords: [
      "Class 10 Foundation Coaching in Mathura",
      "Class 10 Board and Foundation Mathura",
      "Class 10 Science Coaching Mathura",
      "Class 10 Maths Coaching Mathura",
      "Class 10 to 11 Bridge Course Mathura",
      "Emprise Academy Class 10 Foundation",
    ],
    canonical: "https://empriseacademy.com/foundation-coaching-mathura/class-10",
  },
  hero: {
    eyebrow: "CLASS 10 BOARD + FOUNDATION",
    h1: "Class 10 Foundation Coaching in Mathura",
    subheading: "Board Examination Mastery • Concept Deepening • Smooth Transition to Class 11",
    paragraph:
      "Class 10 requires dual focus: achieving top scores in your secondary school board examinations while building the advanced conceptual foundation needed for a smooth transition to senior science and mathematics.",
    primaryCta: { label: "Enroll in Class 10 Foundation", href: "#counselling" },
    secondaryCta: { label: "Explore Board + Foundation Plan", href: "#curriculum" },
  },
  transitionAdvantage: [
    {
      title: "Board Examination Mastery",
      desc: "Complete, line-by-line coverage of CBSE/State Board textbooks with structured subjective answer writing, diagram presentations, and sample papers.",
    },
    {
      title: "Eliminate the Class 11 Difficulty Shock",
      desc: "Class 11 Science presents a massive conceptual jump. Our bridging modules introduce essential prerequisite concepts so students enter Class 11 with confidence.",
    },
    {
      title: "Trigonometry, Optics & Carbon Chemistry",
      desc: "Deep conceptual mastery in high-yield topics like Trigonometric Identities, Light Reflection/Refraction, Electricity, and Carbon Compounds.",
    },
    {
      title: "Self-Study Stamina & Testing Rigor",
      desc: "Developing the mental endurance for 3-hour subjective examinations and timed objective question papers without burnout.",
    },
  ],
  subjectDetails: [
    {
      subject: "Mathematics in Class 10",
      focus: "Quadratic Equations, Trigonometry, Coordinate Geometry & Circles",
      desc: "Mastering standard board proofs, algebraic problem solving, arithmetic progressions, trigonometric applications (heights & distances), and circle theorems.",
      topics: [
        "Real Numbers & Polynomials",
        "Pair of Linear Equations & Quadratic Equations",
        "Arithmetic Progressions (AP)",
        "Introduction to Trigonometry & Applications",
        "Coordinate Geometry & Similar Triangles",
        "Circles, Areas Related to Circles & Surface Areas",
      ],
    },
    {
      subject: "Physics in Class 10",
      focus: "Light (Reflection & Refraction), Human Eye, Electricity & Magnetism",
      desc: "Ray diagrams, mirror and lens formulas, Ohm's law, circuit analysis, heating effects of current, and magnetic field lines with numerical problem solving.",
      topics: [
        "Light: Reflection & Refraction (Ray Optics)",
        "The Human Eye & The Colourful World",
        "Electricity (Resistance, Ohm's Law, Circuits, Power)",
        "Magnetic Effects of Electric Current (Fleming's Rules)",
      ],
    },
    {
      subject: "Chemistry in Class 10",
      focus: "Chemical Reactions, Acids/Bases, Metals & Carbon Compounds",
      desc: "Balancing chemical equations, pH scales, metallurgy processes, carbon bonding, functional groups, and homologous series.",
      topics: [
        "Chemical Reactions & Equations",
        "Acids, Bases & Salts",
        "Metals & Non-Metals (Extraction & Metallurgy)",
        "Carbon & Its Compounds (Covalent Bonding & Nomenclature)",
      ],
    },
    {
      subject: "Biology in Class 10",
      focus: "Life Processes, Control & Coordination, Reproduction & Heredity",
      desc: "Detailed physiological diagrams of human digestive, circulatory, and nervous systems, plant tropisms, genetics, and Mendel's laws of inheritance.",
      topics: [
        "Life Processes (Nutrition, Respiration, Transportation, Excretion)",
        "Control & Coordination (Nervous System & Hormones)",
        "How Do Organisms Reproduce?",
        "Heredity & Evolution Basics and Our Environment",
      ],
    },
  ],
  faqs: [
    {
      question: "How does Class 10 Foundation balance Board exam preparation with competitive fundamentals?",
      answer:
        "Our curriculum prioritizes 100% Board exam syllabus mastery first, using NCERT exercises, subjective derivation writing, and past board papers. Alongside this, we explore the conceptual depth behind each chapter, giving students an advanced foundation for Class 11.",
    },
    {
      question: "Can joining Foundation in Class 10 hurt a student's Board exam score?",
      answer:
        "No. By deepening conceptual understanding, students find Board examination questions significantly easier and more intuitive to answer accurately, leading to higher Board percentages.",
    },
    {
      question: "How does Class 10 Foundation help in deciding between PCM (Engineering) and PCB (Medical)?",
      answer:
        "Through structured exposure to advanced Mathematics, Physics, Chemistry, and Biology, students discover their genuine academic aptitude and interest, helping families make confident, informed stream choices for Class 11.",
    },
    {
      question: "How frequently are full-length Board model tests conducted?",
      answer:
        "Beginning in late autumn, students appear for regular 3-hour full-syllabus Board mock examinations with detailed teacher feedback on presentation, step-marking, and time allocation.",
    },
  ] as FoundationFaqItem[],
} as const;
