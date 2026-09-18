import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 6, 6A & 6B - COURSES SECTION, 4TH CARD & ACADEMIC ICONS QA");
console.log("==================================================");

async function runCoursesTests() {
  const filePath = path.resolve(process.cwd(), "src/components/home/CoursesGridSection.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // [TEST 1] Removal of Old Heading and Description
  console.log("\n[TEST 1] Verifying removal of old 'Structured Courses' heading & description...");
  if (content.includes("Structured Courses") || content.includes("Structured <span")) {
    throw new Error("Old heading 'Structured Courses' must be completely removed!");
  }
  if (content.includes("Comprehensive classroom programs engineered for conceptual mastery")) {
    throw new Error("Old supporting description must be completely removed!");
  }
  console.log("✓ Old heading and old supporting description are completely removed.");

  // [TEST 2] Exact New Main Heading
  console.log("\n[TEST 2] Verifying exact new main heading '4 PROGRAMS TOWARDS SUCCESS'...");
  if (!content.includes("4 PROGRAMS") || !content.includes("TOWARDS SUCCESS")) {
    throw new Error("New heading must contain '4 PROGRAMS' and 'TOWARDS SUCCESS'!");
  }
  const cleanHeading = content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  if (!cleanHeading.includes("4 PROGRAMS TOWARDS SUCCESS")) {
    throw new Error("Main heading text must evaluate cleanly to '4 PROGRAMS TOWARDS SUCCESS'!");
  }
  console.log("✓ Verified exact main heading '4 PROGRAMS TOWARDS SUCCESS'.");

  // [TEST 3] Exact Eyebrow Preservation
  console.log("\n[TEST 3] Verifying eyebrow 'ACADEMIC PROGRAMS' is preserved...");
  if (!content.includes("ACADEMIC PROGRAMS")) {
    throw new Error("Eyebrow 'ACADEMIC PROGRAMS' must be preserved!");
  }
  console.log("✓ Eyebrow 'ACADEMIC PROGRAMS' is preserved.");

  // [TEST 4] Exact New Subheading
  console.log("\n[TEST 4] Verifying exact new subheading text...");
  const expectedSubheading =
    "Emprise Mathura offers structured classroom programs for IIT-JEE, NEET, and Foundation (Classes 8–10), designed for conceptual clarity, regular testing, and competitive success.";
  if (!content.includes(expectedSubheading)) {
    throw new Error(`Subheading must match exactly: "${expectedSubheading}"`);
  }
  console.log("✓ Verified exact subheading copy.");

  // [TEST 5] Cards 1, 2, 3 Content Intact & Unaltered
  console.log("\n[TEST 5] Verifying cards 1, 2, 3 content remains 100% intact & unaltered...");
  const card1 = HOMEPAGE_DATA.courses[0];
  const card2 = HOMEPAGE_DATA.courses[1];
  const card3 = HOMEPAGE_DATA.courses[2];

  if (card1.id !== "iit-jee" || card1.title !== "IIT-JEE Preparation" || card1.badge !== "Engineering Stream") {
    throw new Error("Card 1 (IIT-JEE Preparation) altered!");
  }
  if (card1.description !== "Become Engineer with IITians Faculty.") {
    throw new Error(`Card 1 description mismatch! Got: '${card1.description}'`);
  }
  if (card2.id !== "neet-ug" || card2.title !== "NEET-UG Preparation" || card2.badge !== "Medical Stream") {
    throw new Error("Card 2 (NEET-UG Preparation) altered!");
  }
  if (card2.description !== "Your First Step Towards Becoming Doctor.") {
    throw new Error(`Card 2 description mismatch! Got: '${card2.description}'`);
  }
  if (card3.id !== "foundation" || card3.title !== "Foundation Classes 8–10" || card3.badge !== "Junior Foundation") {
    throw new Error("Card 3 (Foundation Classes 8–10) altered!");
  }
  if (card3.description !== "Build Your Strong Base with experts at Emprise.") {
    throw new Error(`Card 3 description mismatch! Got: '${card3.description}'`);
  }
  console.log("✓ Verified Card 1, Card 2, Card 3 content and updated subheadings.");

  // [TEST 6] Step 6A: 4th Card Content & Exact Identity Lock
  console.log("\n[TEST 6] Auditing Step 6A: 4th Course Card Content...");
  const card4 = HOMEPAGE_DATA.courses[3];

  if (card4.id !== "digital-learning") {
    throw new Error(`Card 4 id expected 'digital-learning', got '${card4.id}'`);
  }
  if (card4.title !== "Digital Learning & Study Resources") {
    throw new Error(`Card 4 title expected 'Digital Learning & Study Resources', got '${card4.title}'`);
  }
  if (card4.badge !== "Digital Learning") {
    throw new Error(`Card 4 badge expected 'Digital Learning', got '${card4.badge}'`);
  }
  if (card4.tagline !== "Learn Online. Practice Smart. Succeed with Emprise.") {
    throw new Error(`Card 4 tagline expected 'Learn Online. Practice Smart. Succeed with Emprise.', got '${card4.tagline}'`);
  }
  if (card4.description && card4.description !== "") {
    throw new Error(`Card 4 description expected to be empty! Got: '${card4.description}'`);
  }
  if (card4.keyBenefit !== "Complete digital practice ecosystem combining online testing, structured study material and daily practice.") {
    throw new Error(`Card 4 keyBenefit mismatch! Got: '${card4.keyBenefit}'`);
  }
  if (card4.ctaLabel !== "View All Courses →" || card4.ctaHref !== "/courses") {
    throw new Error(`Card 4 CTA mismatch! Expected 'View All Courses →' -> '/courses'`);
  }

  // 5 Features check
  const expectedFeatures = [
    "JEE Main — Online Test Series",
    "JEE Advanced — Online Test Series",
    "NEET (UG) — Online Test Series",
    "Study Material — Structured, exam-oriented resources",
    "DPPs (Daily Practice Problems) — Regular practice for stronger concepts and better performance",
  ];

  if (card4.features.length !== 5) {
    throw new Error(`Expected exactly 5 features on card 4, got ${card4.features.length}`);
  }
  for (let i = 0; i < expectedFeatures.length; i++) {
    if (card4.features[i] !== expectedFeatures[i]) {
      throw new Error(`Feature ${i + 1} mismatch! Expected '${expectedFeatures[i]}', got '${card4.features[i]}'`);
    }
  }
  console.log("✓ Verified 4th card content: Title, Tagline, Description, Key Advantage, 5 Features, and CTA.");

  // [TEST 7] Removal of Stale 4th Card Content
  console.log("\n[TEST 7] Verifying complete removal of stale 4th card school/board copy...");
  const rawHomepage = fs.readFileSync(path.resolve(process.cwd(), "src/data/homepage.ts"), "utf-8");
  const staleStrings = [
    "School + Competitive Preparation",
    "Classes 8th to 12th",
    "Zero conflict between school homework, board exams, and competitive coaching",
    "Chapter-wise board descriptive answer-writing guidance",
    "Dedicated board exam revision series and pre-board mocks",
    "Synchronized timelines for school tests & coaching tests",
  ];

  for (const stale of staleStrings) {
    if (rawHomepage.includes(stale)) {
      throw new Error(`Stale string still found in src/data/homepage.ts: '${stale}'`);
    }
  }
  console.log("✓ Verified all legacy school/board copy is completely removed.");

  // [TEST 8] Component Feature Rendering (All 5 features rendered, zero slicing)
  console.log("\n[TEST 8] Verifying CoursesGridSection renders all features without slicing...");
  if (content.includes("course.features.slice(0, 3)")) {
    throw new Error("CoursesGridSection must not slice features to 3! All 5 features must render.");
  }
  if (!content.includes("course.tagline")) {
    throw new Error("CoursesGridSection must support distinct tagline rendering!");
  }
  console.log("✓ Verified CoursesGridSection renders complete 5-feature list and distinct tagline styling.");

  // [TEST 9] Step 6B: Course-Specific Academic Iconography Mapping in HOMEPAGE_DATA
  console.log("\n[TEST 9] Auditing Step 6B: Course-Specific Academic Iconography in HOMEPAGE_DATA...");
  if (card1.iconName !== "Atom") {
    throw new Error(`Card 1 (IIT-JEE) icon expected 'Atom', got '${card1.iconName}'`);
  }
  if (card2.iconName !== "Stethoscope") {
    throw new Error(`Card 2 (NEET-UG) icon expected 'Stethoscope', got '${card2.iconName}'`);
  }
  if (card3.iconName !== "GraduationCap") {
    throw new Error(`Card 3 (Foundation) icon expected 'GraduationCap', got '${card3.iconName}'`);
  }
  if (card4.iconName !== "Laptop") {
    throw new Error(`Card 4 (Digital Learning) icon expected 'Laptop', got '${card4.iconName}'`);
  }
  console.log("✓ Verified semantic icon mapping: IIT-JEE -> Atom, NEET-UG -> Stethoscope, Foundation -> GraduationCap, Digital Learning -> Laptop.");

  // [TEST 10] Step 6B: Component Icon Integration, Accessibility & Styling Consistency
  console.log("\n[TEST 10] Auditing CoursesGridSection Icon Integration & Accessibility...");
  if (!content.includes("Atom") || !content.includes("Stethoscope") || !content.includes("GraduationCap") || !content.includes("Laptop")) {
    throw new Error("CoursesGridSection missing imports for course icons (Atom, Stethoscope, GraduationCap, Laptop)");
  }
  if (!content.includes('aria-hidden="true"')) {
    throw new Error("Course icons must include aria-hidden='true' for accessible decorative icon usage");
  }
  if (!content.includes("w-12 h-12 rounded-xl")) {
    throw new Error("Icon containers must maintain identical dimensions (w-12 h-12 rounded-xl)");
  }
  console.log("✓ Verified CoursesGridSection iconMap, accessible aria-hidden, and container consistency.");

  // [TEST 11] Step 6C: 4th Course Card Tagline Color (#FF8A00)
  console.log("\n[TEST 11] Auditing Step 6C: 4th Course Card Tagline Color (#FF8A00)...");
  if (!content.includes("text-[#FF8A00]")) {
    throw new Error("4th course card tagline must be set to accent orange #FF8A00 (text-[#FF8A00])!");
  }
  if (content.includes("course.tagline\n                          ? \"font-medium text-[#1769E0]")) {
    throw new Error("4th course card tagline must not be blue #1769E0!");
  }
  if (!content.includes("font-semibold text-[var(--brand-accent)]")) {
    throw new Error("Cards 1–3 must preserve their existing subtitle styling (font-semibold text-[var(--brand-accent)])!");
  }
  console.log("✓ Verified 4th card tagline color is #FF8A00 and Cards 1–3 styling is 100% preserved.");

  // [TEST 12] Step 6C: Course CTA Button Hover Behavior & Non-Regression
  console.log("\n[TEST 12] Auditing Step 6C: Course CTA Button Hover State & Button.tsx...");
  const buttonFilePath = path.resolve(process.cwd(), "src/components/ui/button/Button.tsx");
  const buttonContent = fs.readFileSync(buttonFilePath, "utf-8");

  if (!buttonContent.includes("courseCta")) {
    throw new Error("Button.tsx must define 'courseCta' variant in ButtonVariant!");
  }
  if (!content.includes("variant=\"courseCta\"")) {
    throw new Error("CoursesGridSection must use variant='courseCta' for course card CTA buttons!");
  }
  if (content.includes("group-hover:text-white group-hover:border-transparent")) {
    throw new Error("CoursesGridSection must remove stale group-hover rule causing washed-out button text!");
  }
  if (!content.includes("hover:bg-[#1769E0]") || !content.includes("hover:text-white") || !content.includes("hover:border-[#1769E0]")) {
    throw new Error("Courses CTA button must explicitly define hover:bg-[#1769E0], hover:text-white, and hover:border-[#1769E0]!");
  }
  if (!content.includes("hover:-translate-y-px") && !content.includes("hover:-translate-y-[1px]")) {
    throw new Error("Courses CTA button must include subtle elevation (translateY(-1px)) on hover!");
  }
  console.log("✓ Verified Course CTA button hover state (#1769E0 bg, white text, #1769E0 border, subtle elevation, no washed out text).");

  console.log("\n==================================================");
  console.log("ALL STEP 6, 6A, 6B & 6C COURSES SECTION TESTS PASSED (12/12)");
  console.log("==================================================");
}

runCoursesTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

