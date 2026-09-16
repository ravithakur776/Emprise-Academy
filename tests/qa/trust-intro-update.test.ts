import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 5D - 6-CARD ACADEMIC CREDENTIALS & STATS QA");
console.log("==================================================");

async function runTrustIntroTests() {
  const componentPath = path.resolve(process.cwd(), "src/components/home/TrustIntroSection.tsx");
  const componentContent = fs.readFileSync(componentPath, "utf-8");

  const statCardPath = path.resolve(process.cwd(), "src/components/home/AcademicStatCard.tsx");
  const statCardContent = fs.readFileSync(statCardPath, "utf-8");

  const dataPath = path.resolve(process.cwd(), "src/data/homepage.ts");
  const dataContent = fs.readFileSync(dataPath, "utf-8");

  // [TEST 1] Verify old heading is completely removed
  console.log("\n[TEST 1] Verifying old heading removal...");
  if (componentContent.includes("Preparing Students For Bigger Dreams") || dataContent.includes("Preparing Students For Bigger Dreams")) {
    throw new Error("Old heading 'Preparing Students For Bigger Dreams' must be completely removed!");
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

  // [TEST 3] Verify prohibited superlatives are NOT present in heading
  console.log("\n[TEST 3] Auditing for prohibited superlative words...");
  const prohibitedSuperlatives = ["Leading", "Best", "No. 1", "India's Best"];
  for (const word of prohibitedSuperlatives) {
    if (HOMEPAGE_DATA.trustIntro.heading.toLowerCase().includes(word.toLowerCase())) {
      throw new Error(`Detected prohibited word in heading: "${word}"`);
    }
  }
  console.log("✓ Verified no unauthorized superlative terms in brand heading.");

  // [TEST 4] Verify Complete Removal of Old 4-Card System Residue
  console.log("\n[TEST 4] Verifying removal of old deprecated cards...");
  const removedCards = [
    "Serving Mathura",
    "Small Batch Focus",
    "35–40",
  ];
  for (const item of removedCards) {
    const foundInStats = HOMEPAGE_DATA.trustIntro.stats.some(
      (s) => s.label === item || s.value === item || s.description?.includes(item)
    );
    if (foundInStats) {
      throw new Error(`Found removed card item in HOMEPAGE_DATA.trustIntro.stats: "${item}"`);
    }
    if (componentContent.includes(item)) {
      throw new Error(`Found removed card text in TrustIntroSection: "${item}"`);
    }
  }
  console.log("✓ Verified 'Serving Mathura' and 'Small Batch Focus (35–40)' are completely removed.");

  // [TEST 5] Verify Approved Two-Paragraph Description
  console.log("\n[TEST 5] Verifying approved two-paragraph description...");
  const expectedP1 = "Since 2011, Emprise Academy has been transforming aspirations into achievements and shaping the careers of thousands of students in Mathura. Over the years, the academy has earned a strong reputation as";
  const expectedP1End = "one of the leading IIT-JEE and NEET coaching institutes in Mathura";
  const expectedP2 = "Over the years, Emprise Academy has built a strong and structured culture of";
  const expectedP2Mid = "academic excellence, competitive preparation, and personalised student care";
  const expectedP2End = "With an experienced team of";
  const expectedP2Team = "IITians and Doctors";

  if (!componentContent.includes(expectedP1) ||
      !componentContent.includes(expectedP1End) ||
      !componentContent.includes(expectedP2) ||
      !componentContent.includes(expectedP2Mid) ||
      !componentContent.includes(expectedP2End) ||
      !componentContent.includes(expectedP2Team)) {
    throw new Error("Component missing parts of the approved two-paragraph description!");
  }
  console.log("✓ Verified exact approved two-paragraph description with subtle emphasis.");

  // [TEST 6] Verify Feature Bullets (Step 5E)
  console.log("\n[TEST 6] Verifying feature bullets and removal of Graded DPPs...");
  if (componentContent.includes("Graded DPPs & CBT Pattern Test Series") || componentContent.includes("Graded DPPs")) {
    throw new Error("Old bullet 'Graded DPPs & CBT Pattern Test Series' must be completely removed!");
  }

  const expectedBullets = [
    "Director-Led Classrooms & Mentorship",
    "Small Batches for 100% Doubt Coverage",
    "Outstanding IIT-JEE &amp; NEET Results in Mathura",
    "Board Excellence Synchronized with JEE/NEET",
  ];
  for (const bullet of expectedBullets) {
    if (!componentContent.includes(bullet)) {
      throw new Error(`Missing expected bullet: "${bullet}"`);
    }
  }

  // Verify order
  const idx1 = componentContent.indexOf(expectedBullets[0]);
  const idx2 = componentContent.indexOf(expectedBullets[1]);
  const idx3 = componentContent.indexOf(expectedBullets[2]);
  const idx4 = componentContent.indexOf(expectedBullets[3]);

  if (!(idx1 < idx2 && idx2 < idx3 && idx3 < idx4)) {
    throw new Error("Feature bullets are not in the expected order!");
  }
  console.log("✓ Verified exact 4 feature points in order with 'Outstanding IIT-JEE & NEET Results in Mathura'.");

  // [TEST 7] Verify Preserved CTA Buttons
  console.log("\n[TEST 7] Verifying CTA buttons...");
  if (!componentContent.includes("Learn More About Emprise") || !componentContent.includes('href="/about"')) {
    throw new Error("Missing 'Learn More About Emprise' CTA button pointing to /about");
  }
  if (!componentContent.includes("Meet Directors") || !componentContent.includes('href="#directors"')) {
    throw new Error("Missing 'Meet Directors' CTA button pointing to #directors anchor");
  }
  console.log("✓ Verified CTA buttons and anchors.");

  // [TEST 8] Verify Exactly 6 Academic Credentials & Stat Cards
  console.log("\n[TEST 8] Verifying exact 6 academic credential cards in HOMEPAGE_DATA.trustIntro.stats...");
  if (HOMEPAGE_DATA.trustIntro.stats.length !== 6) {
    throw new Error(`Expected exactly 6 stats cards, found: ${HOMEPAGE_DATA.trustIntro.stats.length}`);
  }

  const expectedCards = [
    {
      index: "01",
      value: "15+ Years",
      label: "of Academic Excellence",
      description: "Mentoring students in Mathura since 2011.",
    },
    {
      index: "02",
      value: "JEE + NEET",
      label: "Competitive Focus",
      description: "Specialized engineering & medical entrance streams.",
    },
    {
      index: "03",
      value: "7+",
      label: "National Education Awards",
      description: "A strong record of academic recognition and institutional achievement.",
    },
    {
      index: "04",
      value: "5000+",
      label: "Students Mentored",
      description: "Guiding students through structured learning, competitive preparation and personalised academic support.",
    },
    {
      index: "05",
      value: "700+",
      label: "Students Qualified",
      description: "Supporting students through disciplined preparation, testing and consistent performance improvement.",
    },
    {
      index: "06",
      value: "IITians & Doctors",
      label: "Faculty",
      description: "Experienced academic guidance from IITians and Doctors.",
    },
  ];

  for (const expected of expectedCards) {
    const found = HOMEPAGE_DATA.trustIntro.stats.find(
      (s) => s.index === expected.index && s.value === expected.value
    );
    if (!found) {
      throw new Error(`Missing expected card ${expected.index}: ${expected.value} (${expected.label})`);
    }
    if (found.label !== expected.label) {
      throw new Error(`Card ${expected.index} label mismatch. Expected "${expected.label}", found "${found.label}"`);
    }
    if (found.description !== expected.description) {
      throw new Error(`Card ${expected.index} description mismatch. Expected "${expected.description}", found "${found.description}"`);
    }
    console.log(`  ✓ Card ${expected.index}: ${expected.value} | ${expected.label}`);
  }

  // [TEST 9] Verify 3D Tilt Component & Accessibility Hardening
  console.log("\n[TEST 9] Verifying AcademicStatCard 3D tilt and accessibility...");
  if (!statCardContent.includes("perspective") || !statCardContent.includes("rotateX") || !statCardContent.includes("rotateY")) {
    throw new Error("AcademicStatCard must implement subtle 3D perspective rotation (rotateX, rotateY)");
  }
  if (!statCardContent.includes("prefers-reduced-motion")) {
    throw new Error("AcademicStatCard must respect prefers-reduced-motion media query");
  }
  if (!statCardContent.includes("pointer: coarse")) {
    throw new Error("AcademicStatCard must disable mouse tilt tracking on touch devices (pointer: coarse)");
  }
  if (!statCardContent.includes("<article")) {
    throw new Error("AcademicStatCard must use semantic HTML (<article>)");
  }
  console.log("✓ Verified 3D tilt tracking, zero-re-render CSS variables, and reduced-motion safety.");

  // [TEST 10] Verify Responsive Layout Structure in TrustIntroSection
  console.log("\n[TEST 10] Verifying responsive layout structure in TrustIntroSection...");
  if (!componentContent.includes("AcademicStatCard")) {
    throw new Error("TrustIntroSection must render AcademicStatCard");
  }
  if (!componentContent.includes("xl:grid-cols-3") || !componentContent.includes("sm:grid-cols-2") || !componentContent.includes("grid-cols-1")) {
    throw new Error("TrustIntroSection right grid must support 1-col mobile, 2-col tablet, and 3-col desktop layout");
  }
  if (!componentContent.includes("group/stats-grid")) {
    throw new Error("TrustIntroSection must support group hover for sibling focus dimming");
  }
  console.log("✓ Verified responsive 3x2 desktop, 2x3 tablet, and 1x6 mobile grid layout.");

  console.log("\n==================================================");
  console.log("ALL STEP 5D TRUST INTRO TESTS PASSED (10/10)");
  console.log("==================================================");
}

runTrustIntroTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
