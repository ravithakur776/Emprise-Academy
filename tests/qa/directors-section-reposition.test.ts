import fs from "fs";
import path from "path";
import {
  SUSHIL_DAGUR_LEADERSHIP,
  RAKESH_KUMAR_LEADERSHIP,
  SUSHIL_BIO,
  RAKESH_BIO,
  SUSHIL_PHILOSOPHY,
  RAKESH_PHILOSOPHY,
  SUSHIL_SIGNATURE,
  RAKESH_SIGNATURE,
  DIRECTORS_EDUCATION_LINE,
} from "@/data/directors";

console.log("==================================================");
console.log("TEST SUITE: STEP 5I - GLOBAL DIRECTOR CONTENT NORMALIZATION & IDENTITY LOCK");
console.log("==================================================");

async function runDirectorsRepositionAudit() {
  // [TEST 1] Auditing src/app/page.tsx Sequence
  console.log("\n[TEST 1] Auditing src/app/page.tsx Section Flow...");
  const pagePath = path.resolve(process.cwd(), "src/app/page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  const heroIdx = pageContent.indexOf("<HeroSlider />");
  const trustIdx = pageContent.indexOf("<TrustIntroSection />");
  const directorsIdx = pageContent.indexOf("<DirectorsSection />");
  const coursesIdx = pageContent.indexOf("<CoursesGridSection />");

  if (heroIdx === -1 || trustIdx === -1 || directorsIdx === -1 || coursesIdx === -1) {
    throw new Error("Missing required sections in src/app/page.tsx");
  }

  if (!(heroIdx < trustIdx && trustIdx < directorsIdx && directorsIdx < coursesIdx)) {
    throw new Error(
      `Invalid sequence in src/app/page.tsx! Expected Hero (${heroIdx}) -> TrustIntro (${trustIdx}) -> Directors (${directorsIdx}) -> Courses (${coursesIdx})`
    );
  }

  // Ensure no interstitial components between TrustIntroSection and DirectorsSection
  const betweenIntroAndDirectors = pageContent.substring(
    trustIdx + "<TrustIntroSection />".length,
    directorsIdx
  );
  const nonComment = betweenIntroAndDirectors.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").trim();
  if (nonComment.length > 0) {
    throw new Error(`Unexpected content between TrustIntroSection and DirectorsSection: ${nonComment}`);
  }
  console.log("✓ Verified exact section flow: HeroSlider -> TrustIntroSection -> DirectorsSection -> CoursesGridSection.");

  // [TEST 2] Auditing DirectorsSection Header & Content (Step 5H)
  console.log("\n[TEST 2] Auditing DirectorsSection Header & Content...");
  const directorsPath = path.resolve(process.cwd(), "src/components/home/DirectorsSection.tsx");
  const directorsContent = fs.readFileSync(directorsPath, "utf-8");

  // Verify ACADEMIC LEADERSHIP badge box is completely removed
  if (directorsContent.includes("ACADEMIC LEADERSHIP")) {
    throw new Error("Old 'ACADEMIC LEADERSHIP' badge box must be completely removed from DirectorsSection!");
  }

  const expectedStrings = [
    "Leadership Behind",
    "Success",
    "Our vision, experience, and unwavering commitment empower students to turn their potential into proven success.",
    'id="directors"',
    "Explore Complete Academic Leadership",
  ];

  for (const str of expectedStrings) {
    if (!directorsContent.includes(str)) {
      throw new Error(`DirectorsSection missing expected string: "${str}"`);
    }
  }

  // Verify complete removal of old "KEY BACKGROUND HIGHLIGHTS"
  if (directorsContent.includes("KEY BACKGROUND HIGHLIGHTS")) {
    throw new Error("Old format 'KEY BACKGROUND HIGHLIGHTS' must be completely removed!");
  }
  console.log("✓ Verified ACADEMIC LEADERSHIP box removed, heading begins directly with 'Leadership Behind Success', and approved copy verified.");

  // [TEST 3] Auditing Dedicated Source of Truth Objects (Step 5H Section 16 Validation)
  console.log("\n[TEST 3] Auditing Dedicated Source of Truth Objects & Strict Equality...");
  
  // Sushil Dagur dedicated object verification
  if (SUSHIL_DAGUR_LEADERSHIP.name !== "Sushil Dagur") {
    throw new Error(`Sushil name mismatch: ${SUSHIL_DAGUR_LEADERSHIP.name}`);
  }
  if (SUSHIL_DAGUR_LEADERSHIP.role !== "Director | Educationist | Physics Mentor") {
    throw new Error(`Sushil role mismatch: ${SUSHIL_DAGUR_LEADERSHIP.role}`);
  }
  if (SUSHIL_DAGUR_LEADERSHIP.bio !== SUSHIL_BIO) {
    throw new Error("Sushil bio !== SUSHIL_BIO validation failed!");
  }
  if (SUSHIL_DAGUR_LEADERSHIP.biography !== SUSHIL_BIO) {
    throw new Error("Sushil biography !== SUSHIL_BIO validation failed!");
  }
  if (SUSHIL_DAGUR_LEADERSHIP.philosophy !== SUSHIL_PHILOSOPHY) {
    throw new Error("Sushil philosophy !== SUSHIL_PHILOSOPHY validation failed!");
  }
  if (SUSHIL_DAGUR_LEADERSHIP.signature !== SUSHIL_SIGNATURE) {
    throw new Error("Sushil signature !== SUSHIL_SIGNATURE validation failed!");
  }
  if (SUSHIL_DAGUR_LEADERSHIP.education !== DIRECTORS_EDUCATION_LINE) {
    throw new Error("Sushil education !== DIRECTORS_EDUCATION_LINE validation failed!");
  }

  // Rakesh Kumar dedicated object verification
  if (RAKESH_KUMAR_LEADERSHIP.name !== "Rakesh Kumar") {
    throw new Error(`Rakesh name mismatch: ${RAKESH_KUMAR_LEADERSHIP.name}`);
  }
  if (RAKESH_KUMAR_LEADERSHIP.role !== "Director | Mathematics Mentor | IIT-JEE Faculty") {
    throw new Error(`Rakesh role mismatch: ${RAKESH_KUMAR_LEADERSHIP.role}`);
  }
  if (RAKESH_KUMAR_LEADERSHIP.bio !== RAKESH_BIO) {
    throw new Error("Rakesh bio !== RAKESH_BIO validation failed!");
  }
  if (RAKESH_KUMAR_LEADERSHIP.biography !== RAKESH_BIO) {
    throw new Error("Rakesh biography !== RAKESH_BIO validation failed!");
  }
  if (RAKESH_KUMAR_LEADERSHIP.philosophy !== RAKESH_PHILOSOPHY) {
    throw new Error("Rakesh philosophy !== RAKESH_PHILOSOPHY validation failed!");
  }
  if (RAKESH_KUMAR_LEADERSHIP.signature !== RAKESH_SIGNATURE) {
    throw new Error("Rakesh signature !== RAKESH_SIGNATURE validation failed!");
  }
  if (RAKESH_KUMAR_LEADERSHIP.education !== DIRECTORS_EDUCATION_LINE) {
    throw new Error("Rakesh education !== DIRECTORS_EDUCATION_LINE validation failed!");
  }

  // STEP 5I Critical Identity Mapping Check & Strict Data Assertions:
  // RULE 1: Sushil = FORD + Physics + 15+ years
  if (!SUSHIL_DAGUR_LEADERSHIP.bio.includes("FORD, England")) {
    throw new Error("Sushil Dagur bio must contain 'FORD, England'");
  }
  if (!SUSHIL_DAGUR_LEADERSHIP.bio.includes("Physics Faculty")) {
    throw new Error("Sushil Dagur bio must contain 'Physics Faculty'");
  }
  if (!SUSHIL_DAGUR_LEADERSHIP.bio.includes("over 15 years")) {
    throw new Error("Sushil Dagur bio must contain 'over 15 years'");
  }
  if (SUSHIL_DAGUR_LEADERSHIP.bio.includes("Rolls-Royce") || SUSHIL_DAGUR_LEADERSHIP.bio.includes("200+ students")) {
    throw new Error("Sushil Dagur bio must NOT contain Rolls-Royce or 200+ students!");
  }
  if (!SUSHIL_DAGUR_LEADERSHIP.signature.startsWith("SD")) {
    throw new Error("Sushil Dagur signature must begin with 'SD'");
  }

  // RULE 2: Rakesh = Rolls-Royce + Mathematics + 200+ students
  if (!RAKESH_KUMAR_LEADERSHIP.bio.includes("Rolls-Royce Limited, England")) {
    throw new Error("Rakesh Kumar bio must contain 'Rolls-Royce Limited, England'");
  }
  if (!RAKESH_KUMAR_LEADERSHIP.bio.includes("Mathematics")) {
    throw new Error("Rakesh Kumar bio must contain 'Mathematics'");
  }
  if (!RAKESH_KUMAR_LEADERSHIP.bio.includes("200+ students")) {
    throw new Error("Rakesh Kumar bio must contain '200+ students'");
  }
  if (RAKESH_KUMAR_LEADERSHIP.bio.includes("FORD") || RAKESH_KUMAR_LEADERSHIP.bio.includes("Physics Faculty")) {
    throw new Error("Rakesh Kumar bio must NOT contain FORD or Physics Faculty!");
  }
  if (!RAKESH_KUMAR_LEADERSHIP.signature.startsWith("RK")) {
    throw new Error("Rakesh Kumar signature must begin with 'RK'");
  }

  // Check photos on disk
  for (const dir of [SUSHIL_DAGUR_LEADERSHIP, RAKESH_KUMAR_LEADERSHIP]) {
    const photoPath = path.resolve(process.cwd(), `public${dir.photoUrl}`);
    if (!fs.existsSync(photoPath)) {
      throw new Error(`Director photo missing on disk: ${photoPath}`);
    }
  }
  console.log("✓ Verified 100% source-level equality (Sushil bio === SUSHIL_BIO, Rakesh bio === RAKESH_BIO, philosophies, signatures, and photos).");

  // [TEST 4] Auditing Left-to-Right Ordering & No Badge in Card
  console.log("\n[TEST 4] Auditing Dual Card Ordering & Card Cleanliness...");
  const sushilPos = directorsContent.indexOf("SUSHIL_DAGUR_LEADERSHIP");
  const rakeshPos = directorsContent.indexOf("RAKESH_KUMAR_LEADERSHIP");
  if (sushilPos === -1 || rakeshPos === -1 || sushilPos > rakeshPos) {
    throw new Error("DirectorsSection must render Sushil Dagur on Left (first) and Rakesh Kumar on Right (second)!");
  }

  const cardPath = path.resolve(process.cwd(), "src/components/home/DirectorLeadershipCard.tsx");
  const cardContent = fs.readFileSync(cardPath, "utf-8");
  if (cardContent.includes("director.badge")) {
    throw new Error("DirectorLeadershipCard must not contain director.badge!");
  }
  console.log("✓ Verified left (Sushil) to right (Rakesh) order and no badge inside card.");

  // [TEST 5] Auditing DirectorLeadershipCard 3D Tilt & Accessibility
  console.log("\n[TEST 5] Auditing DirectorLeadershipCard 3D Tilt & Accessibility...");
  if (!cardContent.includes("perspective") || !cardContent.includes("rotateX") || !cardContent.includes("rotateY")) {
    throw new Error("DirectorLeadershipCard missing 3D perspective rotation");
  }
  if (!cardContent.includes("prefers-reduced-motion")) {
    throw new Error("DirectorLeadershipCard must respect prefers-reduced-motion");
  }
  if (!cardContent.includes("pointer: coarse")) {
    throw new Error("DirectorLeadershipCard must disable tilt on touch devices");
  }
  if (!cardContent.includes("LEADERSHIP PHILOSOPHY")) {
    throw new Error("DirectorLeadershipCard missing dedicated LEADERSHIP PHILOSOPHY panel");
  }
  console.log("✓ Verified 3D perspective tilt, touch degradation, and dedicated leadership philosophy panel.");

  console.log("\n==================================================");
  console.log("ALL STEP 5I DIRECTORS SECTION TESTS PASSED (5/5)");
  console.log("==================================================");
}

runDirectorsRepositionAudit().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
