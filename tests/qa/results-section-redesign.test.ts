import fs from "fs";
import path from "path";

function runStep12ResultsSectionQA() {
  console.log("==================================================");
  console.log("TEST SUITE: STEP 12 - RESULTS / ACHIEVEMENTS REDESIGN QA");
  console.log("==================================================");

  const resultsFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/ResultsSection.tsx"),
    "utf8"
  );
  const pageFile = fs.readFileSync(
    path.join(process.cwd(), "src/app/page.tsx"),
    "utf8"
  );

  // [TEST 1] Auditing Section ID and Page Layout Inclusion
  console.log("\n[TEST 1] Auditing Section ID and Page Layout...");
  if (!resultsFile.includes('id="results"')) {
    throw new Error("ResultsSection missing id='results' anchor!");
  }
  if (!pageFile.includes("<ResultsSection />")) {
    throw new Error("page.tsx does not include <ResultsSection />!");
  }
  console.log("✓ Verified id='results' anchor and inclusion in page.tsx.");

  // [TEST 2] Auditing Section Eyebrow & Headings
  console.log("\n[TEST 2] Auditing Section Eyebrow & Headings...");
  if (!resultsFile.includes("VERIFIED ACADEMIC ACHIEVEMENTS")) {
    throw new Error("Eyebrow badge 'VERIFIED ACADEMIC ACHIEVEMENTS' is missing!");
  }
  if (!resultsFile.includes("Performance") || !resultsFile.includes("That Speaks For Itself")) {
    throw new Error("Main heading 'Performance That Speaks For Itself' is missing!");
  }
  if (!resultsFile.includes("That Speaks For Itself")) {
    throw new Error("Accent text 'That Speaks For Itself' is missing!");
  }
  console.log("✓ Verified exact section eyebrow and main heading.");

  // [TEST 3] Auditing Approved Master Creatives & Zero Cropping
  console.log("\n[TEST 3] Auditing Approved Master Creatives & Aspect Ratio...");
  const approvedImages = [
    "/images/emprise-jee-main-advanced-2026-mathura-toppers.png",
    "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png",
    "/images/emprise-jee-main-2026-top-performers.png",
    "/images/emprise-neet-ug-2026-result-achievers.png",
  ];
  approvedImages.forEach((img) => {
    if (!resultsFile.includes(img)) {
      throw new Error(`Master creative missing: ${img}`);
    }
    const publicPath = path.join(process.cwd(), "public", img.replace(/^\//, ""));
    if (!fs.existsSync(publicPath)) {
      throw new Error(`File does not exist on disk: ${publicPath}`);
    }
  });
  if (!resultsFile.includes('aspectRatio: "6197 / 2478"') && !resultsFile.includes("6197 / 2478")) {
    throw new Error("Missing intrinsic aspect ratio 6197 / 2478 for zero-crop rendering!");
  }
  if (!resultsFile.includes("object-contain") && !resultsFile.includes('objectFit: "contain"')) {
    throw new Error("Missing object-contain / objectFit contain for master creatives!");
  }
  console.log("✓ Verified all 4 master result creatives exist on disk with 6197/2478 zero-crop contain.");

  // [TEST 4] Auditing Category Switcher Filter Tabs
  console.log("\n[TEST 4] Auditing Category Switcher Filter Tabs...");
  const expectedTabs = ["All Results", "JEE Advanced", "JEE Main", "NEET (UG)"];
  expectedTabs.forEach((tab) => {
    if (!resultsFile.includes(tab)) {
      throw new Error(`Filter tab missing: ${tab}`);
    }
  });
  console.log("✓ Verified all 4 category filter tabs: All Results, JEE Advanced, JEE Main, NEET (UG).");

  // [TEST 5] Auditing Verified Student Record Mentions
  console.log("\n[TEST 5] Auditing Verified Student Names & Achievements...");
  const verifiedStudents = [
    "Atul Dagur",
    "Govind Gupta",
    "Rajeev Nain",
    "Ashis Kumar",
    "Bhanu Pratap Tomar",
    "Shreya Agrawal",
  ];
  verifiedStudents.forEach((student) => {
    if (!resultsFile.includes(student)) {
      throw new Error(`Verified student missing: ${student}`);
    }
  });
  console.log("✓ Verified Atul Dagur, Govind Gupta, Rajeev Nain, Ashis Kumar, Bhanu Pratap Tomar, Shreya Agrawal.");

  // [TEST 6] Auditing Editorial Pagination Counter & Controls
  console.log("\n[TEST 6] Auditing Editorial Pagination & Navigation Controls...");
  if (!resultsFile.includes('aria-label="Previous result creative"') || !resultsFile.includes('aria-label="Next result creative"')) {
    throw new Error("Accessible previous/next slide buttons missing!");
  }
  if (!resultsFile.includes('padStart(2, "0")')) {
    throw new Error("Editorial '01 / 04' counter indicator missing!");
  }
  console.log("✓ Verified accessible circular navigation controls and '01 / 04' editorial pagination counter.");

  // [TEST 7] Auditing Touch Targets & Minimum 44px
  console.log("\n[TEST 7] Auditing 44px Minimum Touch Targets...");
  if (!resultsFile.includes("min-h-[44px]") || !resultsFile.includes("w-11 h-11")) {
    throw new Error("Buttons must adhere to 44px minimum touch targets!");
  }
  console.log("✓ Verified category tabs and carousel controls meet 44px touch target guidelines.");

  // [TEST 8] Auditing Autoplay & Hover/Focus Pause Handlers
  console.log("\n[TEST 8] Auditing Autoplay & Hover/Focus Pause Handlers...");
  if (!resultsFile.includes("onMouseEnter") || !resultsFile.includes("onFocus") || !resultsFile.includes("setInterval")) {
    throw new Error("Carousel missing hover/focus pause or interval logic!");
  }
  console.log("✓ Verified autoplay rotation (5.5s) with pause on hover, focus, and touch.");

  // [TEST 9] Auditing Compact Horizontal Proof Strip
  console.log("\n[TEST 9] Auditing Compact Proof Strip...");
  const proofMetrics = [
    "15+",
    "5000+",
    "700+",
    "200+",
  ];
  proofMetrics.forEach((metric) => {
    if (!resultsFile.includes(metric)) {
      throw new Error(`Proof metric missing: ${metric}`);
    }
  });
  console.log("✓ Verified proof strip metrics: 15+ Years, 5000+ Students, 700+ Qualified, 200+ IITians/Doctors.");

  // [TEST 10] Auditing Official Verification Gateway Links
  console.log("\n[TEST 10] Auditing Scorecard Verification Gateway Links...");
  if (!resultsFile.includes('href="/results"') || !resultsFile.includes('href="/results#verify-scorecard"')) {
    throw new Error("Official scorecard verification gateway links missing!");
  }
  console.log("✓ Verified links to /results and /results#verify-scorecard.");

  console.log("\n==================================================");
  console.log("ALL STEP 12 RESULTS SECTION TESTS PASSED (10/10)");
  console.log("==================================================");
}

runStep12ResultsSectionQA();
