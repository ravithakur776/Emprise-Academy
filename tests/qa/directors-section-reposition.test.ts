import fs from "fs";
import path from "path";
import { getCanonicalDirectorsList } from "@/data/directors";

console.log("==================================================");
console.log("TEST SUITE: DIRECTORS SECTION REPOSITION & CONTENT AUDIT");
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

  // [TEST 2] Auditing DirectorsSection Header & Content
  console.log("\n[TEST 2] Auditing DirectorsSection Header & Content...");
  const directorsPath = path.resolve(process.cwd(), "src/components/home/DirectorsSection.tsx");
  const directorsContent = fs.readFileSync(directorsPath, "utf-8");

  const expectedStrings = [
    "ACADEMIC LEADERSHIP",
    "Meet the",
    "Directors",
    "Academic leadership built on engineering expertise, industry experience, and a deep commitment to student growth.",
    'id="directors"',
    "KEY BACKGROUND HIGHLIGHTS",
    "Read Full Profile",
    "Mathura Campus",
  ];

  for (const str of expectedStrings) {
    if (!directorsContent.includes(str)) {
      throw new Error(`DirectorsSection missing expected string: "${str}"`);
    }
  }
  console.log("✓ Verified DirectorsSection header, eyebrow, copy, and structural anchors.");

  // [TEST 3] Auditing Canonical Directors Data & Highlights
  console.log("\n[TEST 3] Auditing Canonical Directors Records...");
  const directors = getCanonicalDirectorsList();
  if (directors.length !== 2) {
    throw new Error(`Expected exactly 2 canonical directors, found ${directors.length}`);
  }

  const [dir1, dir2] = directors;
  if (dir1.name !== "Sushil Dagur") {
    throw new Error(`Director 1 must be Sushil Dagur, got ${dir1.name}`);
  }
  if (dir2.name !== "Rakesh Kumar") {
    throw new Error(`Director 2 must be Rakesh Kumar, got ${dir2.name}`);
  }

  // Check quotes
  if (!dir1.quote.includes("True education is not about memorising formulas")) {
    throw new Error("Sushil Dagur quote mismatch");
  }
  if (!dir2.quote.includes("Mathematics is not a subject of rules")) {
    throw new Error("Rakesh Kumar quote mismatch");
  }

  // Check photos on disk
  for (const dir of directors) {
    const photoPath = path.resolve(process.cwd(), `public${dir.photoUrl}`);
    if (!fs.existsSync(photoPath)) {
      throw new Error(`Director photo missing on disk: ${photoPath}`);
    }
  }
  console.log("✓ Verified both directors: Sushil Dagur and Rakesh Kumar with verified quotes and existing photos.");

  // [TEST 4] Auditing TrustIntroSection Anchor Link
  console.log("\n[TEST 4] Auditing TrustIntroSection 'Meet Directors' CTA Anchor...");
  const trustPath = path.resolve(process.cwd(), "src/components/home/TrustIntroSection.tsx");
  const trustContent = fs.readFileSync(trustPath, "utf-8");

  if (!trustContent.includes('href="#directors"')) {
    throw new Error("TrustIntroSection 'Meet Directors' button must link to #directors anchor!");
  }
  console.log("✓ Verified TrustIntroSection 'Meet Directors' button links cleanly to #directors.");

  console.log("\n==================================================");
  console.log("ALL DIRECTORS REPOSITION AUDIT CHECKS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runDirectorsRepositionAudit().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
