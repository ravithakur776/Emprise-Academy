import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 5A - TRUST INTRO SECTION UPDATE QA");
console.log("==================================================");

async function runTrustIntroTests() {
  const componentPath = path.resolve(process.cwd(), "src/components/home/TrustIntroSection.tsx");
  const componentContent = fs.readFileSync(componentPath, "utf-8");

  const dataPath = path.resolve(process.cwd(), "src/data/homepage.ts");
  const dataContent = fs.readFileSync(dataPath, "utf-8");

  // [TEST 1] Verify old heading is completely removed
  console.log("\n[TEST 1] Verifying old heading removal...");
  if (componentContent.includes("Preparing Students For Bigger Dreams") || dataContent.includes("Preparing Students For Bigger Dreams")) {
    throw new Error("Old heading 'Preparing Students For Bigger Dreams' must be completely removed from component and data!");
  }
  console.log("✓ Verified old heading 'Preparing Students For Bigger Dreams' is completely removed.");

  // [TEST 2] Verify new exact heading in component and data
  console.log("\n[TEST 2] Verifying new exact heading...");
  const expectedHeading = "The Leader in IIT-JEE, NEET & Foundation Coaching in Mathura";
  if (HOMEPAGE_DATA.trustIntro.heading !== expectedHeading) {
    throw new Error(`HOMEPAGE_DATA.trustIntro.heading mismatch. Expected: "${expectedHeading}", Found: "${HOMEPAGE_DATA.trustIntro.heading}"`);
  }

  if (!componentContent.includes("The Leader in") ||
      !componentContent.includes("IIT-JEE, NEET &amp; Foundation") ||
      !componentContent.includes("Coaching in Mathura")) {
    throw new Error("Component missing formatted new heading segments!");
  }
  console.log("✓ Verified exact heading 'The Leader in IIT-JEE, NEET & Foundation Coaching in Mathura'.");

  // [TEST 3] Verify prohibited superlatives are NOT present
  console.log("\n[TEST 3] Auditing for prohibited superlative words...");
  const prohibitedSuperlatives = ["Leading", "Best", "No. 1", "India's Best"];
  // Check the heading specifically
  for (const word of prohibitedSuperlatives) {
    if (HOMEPAGE_DATA.trustIntro.heading.toLowerCase().includes(word.toLowerCase())) {
      throw new Error(`Detected prohibited word in heading: "${word}"`);
    }
  }
  console.log("✓ Verified no unauthorized superlative terms in brand heading.");

  // [TEST 4] Verify Credibility Highlights (Badges)
  console.log("\n[TEST 4] Verifying Credibility Highlights...");
  if (!componentContent.includes("7+") || !componentContent.includes("National Education Awards")) {
    throw new Error("Missing Highlight 1: '7+ National Education Awards'");
  }
  if (!componentContent.includes("IITians &amp; Doctors") || !componentContent.includes("as Faculty")) {
    throw new Error("Missing Highlight 2: 'IITians & Doctors as Faculty'");
  }
  if (!componentContent.includes("Trophy") || !componentContent.includes("GraduationCap")) {
    throw new Error("Missing Lucide icons Trophy and GraduationCap for credibility cards");
  }
  console.log("✓ Verified both credibility highlight cards with respective Lucide icons.");

  // [TEST 5] Verify Preserved Description
  console.log("\n[TEST 5] Verifying supporting description paragraph...");
  if (!HOMEPAGE_DATA.trustIntro.paragraph.includes("Since 2011 in Mathura, Emprise Academy has been dedicated")) {
    throw new Error("Supporting description paragraph was modified unexpectedly!");
  }
  if (!componentContent.includes("{trustIntro.paragraph}")) {
    throw new Error("TrustIntroSection missing {trustIntro.paragraph} binding");
  }
  console.log("✓ Verified supporting description paragraph preserved.");

  // [TEST 6] Verify Preserved Bullets
  console.log("\n[TEST 6] Verifying preserved bullet highlights...");
  const expectedBullets = [
    "Director-Led Classrooms & Mentorship",
    "Small Batches for 100% Doubt Coverage",
    "Graded DPPs & CBT Pattern Test Series",
    "Board Excellence Synchronized with JEE/NEET"
  ];
  for (const bullet of expectedBullets) {
    if (!componentContent.includes(bullet)) {
      throw new Error(`Missing expected bullet: "${bullet}"`);
    }
  }
  console.log("✓ Verified all 4 institutional bullet points preserved.");

  // [TEST 7] Verify Preserved CTA Buttons
  console.log("\n[TEST 7] Verifying CTA buttons...");
  if (!componentContent.includes("Learn More About Emprise") || !componentContent.includes('href="/about"')) {
    throw new Error("Missing 'Learn More About Emprise' CTA button pointing to /about");
  }
  if (!componentContent.includes("Meet Directors") || !componentContent.includes('href="#directors"')) {
    throw new Error("Missing 'Meet Directors' CTA button pointing to #directors anchor");
  }
  console.log("✓ Verified CTA buttons and anchors.");

  // [TEST 8] Verify Preserved 4 Stat Cards
  console.log("\n[TEST 8] Verifying preserved right-side 4 stat cards...");
  const expectedStats = [
    { value: "15+", label: "Years of Academic Excellence" },
    { value: "Since 2011", label: "Serving Mathura" },
    { value: "JEE + NEET", label: "Competitive Focus" },
    { value: "35–40", label: "Small Batch Focus" }
  ];
  for (const stat of expectedStats) {
    const found = HOMEPAGE_DATA.trustIntro.stats.find(s => s.value === stat.value && s.label === stat.label);
    if (!found) {
      throw new Error(`Missing stat card: ${stat.value} - ${stat.label}`);
    }
  }
  console.log("✓ Verified all 4 right-side stat cards preserved.");

  console.log("\n==================================================");
  console.log("ALL STEP 5A TRUST INTRO TESTS PASSED (8/8)");
  console.log("==================================================");
}

runTrustIntroTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
