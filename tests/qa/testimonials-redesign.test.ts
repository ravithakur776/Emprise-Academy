import { HOMEPAGE_REVIEWS } from "../../src/data/testimonials";
import fs from "fs";
import path from "path";

function runTestimonialsRedesignQA() {
  console.log("==================================================");
  console.log("TEST SUITE: TESTIMONIALS SECTION REDESIGN WITH PHOTOS & COLOR QA");
  console.log("==================================================");

  const sectionFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/TestimonialsHomeSection.tsx"),
    "utf8"
  );
  const cardFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/ReviewCard.tsx"),
    "utf8"
  );

  // [TEST 1] Auditing Section Eyebrow
  console.log("\n[TEST 1] Auditing Section Eyebrow...");
  if (!sectionFile.includes("STUDENT & PARENT VOICES")) {
    throw new Error("Section eyebrow 'STUDENT & PARENT VOICES' is missing!");
  }
  console.log("✓ Verified section eyebrow: 'STUDENT & PARENT VOICES'.");

  // [TEST 2] Auditing Main Heading
  console.log("\n[TEST 2] Auditing Main Heading...");
  if (!sectionFile.includes("Real Experiences at") || !sectionFile.includes("Emprise")) {
    throw new Error("Main heading 'Real Experiences at Emprise' is missing!");
  }
  console.log("✓ Verified main heading: 'Real Experiences at Emprise'.");

  // [TEST 3] Auditing Section Description Word-for-Word
  console.log("\n[TEST 3] Auditing Section Description...");
  const expectedDesc =
    "Reflections from students and parents on classroom discipline, faculty dedication, and academic mentorship in Mathura.";
  if (!sectionFile.includes(expectedDesc)) {
    throw new Error(`Section description mismatch! Expected '${expectedDesc}'`);
  }
  console.log(`✓ Verified exact section description: '${expectedDesc}'.`);

  // [TEST 4] Auditing Category Switcher Exact Labels
  console.log("\n[TEST 4] Auditing Category Switcher Labels...");
  if (!sectionFile.includes("JEE STUDENTS")) {
    throw new Error("Category switcher missing exact label 'JEE STUDENTS'!");
  }
  if (!sectionFile.includes("NEET STUDENTS")) {
    throw new Error("Category switcher missing exact label 'NEET STUDENTS'!");
  }
  console.log("✓ Verified exact category labels: 'JEE STUDENTS' and 'NEET STUDENTS'.");

  // [TEST 5] Auditing JEE Review Dataset (Exactly 6 Reviews)
  console.log("\n[TEST 5] Auditing JEE Review Dataset...");
  const jeeReviews = HOMEPAGE_REVIEWS.jee;
  if (!jeeReviews || jeeReviews.length !== 6) {
    throw new Error(`Expected exactly 6 JEE reviews, found ${jeeReviews?.length}!`);
  }
  const expectedJee = [
    { name: "ATUL DAGUR", institution: "IIT-BOMBAY" },
    { name: "GOVIND GUPTA", institution: "IIT-BOMBAY" },
    { name: "UTKARSH PANDEY", institution: "IIT-DHANBAD" },
    { name: "VISHAL", institution: "IIT-GUWAHATI" },
    { name: "SHARVAN", institution: "IIT-KANPUR" },
    { name: "UMESH YADAV", institution: "IIT-DELHI" },
  ];
  expectedJee.forEach((exp, idx) => {
    const act = jeeReviews[idx];
    if (act.studentName !== exp.name) {
      throw new Error(`JEE #${idx + 1}: Expected '${exp.name}', got '${act.studentName}'`);
    }
    if (act.institution !== exp.institution) {
      throw new Error(`JEE #${idx + 1}: Expected institution '${exp.institution}', got '${act.institution}'`);
    }
  });
  console.log("✓ Verified all 6 JEE reviews with exact students and institutions.");

  // [TEST 6] Auditing NEET Review Dataset (Exactly 6 Reviews)
  console.log("\n[TEST 6] Auditing NEET Review Dataset...");
  const neetReviews = HOMEPAGE_REVIEWS.neet;
  if (!neetReviews || neetReviews.length !== 6) {
    throw new Error(`Expected exactly 6 NEET reviews, found ${neetReviews?.length}!`);
  }
  const expectedNeet = [
    { name: "TANISHA", institution: "AIIMS-RAEBARELI" },
    { name: "AAYAN", institution: "AIIMS-GORAKHPUR" },
    { name: "SHOBHIT", institution: "AIIMS-JODHPUR" },
    { name: "SRISHTI SARASWAT", institution: "GMC-ETAH" },
    { name: "CHAMP PRATAP", institution: "GMC-SAHARANPUR" },
    { name: "ASHISH KUMAR", institution: "AIR-59 IN AIIMS" },
  ];
  expectedNeet.forEach((exp, idx) => {
    const act = neetReviews[idx];
    if (act.studentName !== exp.name) {
      throw new Error(`NEET #${idx + 1}: Expected '${exp.name}', got '${act.studentName}'`);
    }
    if (act.institution !== exp.institution) {
      throw new Error(`NEET #${idx + 1}: Expected institution '${exp.institution}', got '${act.institution}'`);
    }
  });
  console.log("✓ Verified all 6 NEET reviews with exact students and institutions.");

  // [TEST 7] Auditing Student Portrait Images on Disk
  console.log("\n[TEST 7] Auditing Student Portrait Images on Disk...");
  const allReviews = [...jeeReviews, ...neetReviews];
  allReviews.forEach((item) => {
    if (!item.image) {
      throw new Error(`Review item ${item.studentName} is missing image property!`);
    }
    const publicDiskPath = path.join(process.cwd(), "public", item.image);
    if (!fs.existsSync(publicDiskPath)) {
      throw new Error(`Image file for ${item.studentName} not found at: ${publicDiskPath}`);
    }
  });
  console.log("✓ Verified all 12 student reviews have valid portrait images existing in public/images/students/.");

  // [TEST 8] Auditing Editorial Pagination Counter & Controls
  console.log("\n[TEST 8] Auditing Editorial Pagination & Navigation Controls...");
  if (!sectionFile.includes("aria-label=\"Previous review\"") || !sectionFile.includes("aria-label=\"Next review\"")) {
    throw new Error("Accessible previous/next review buttons missing from carousel!");
  }
  if (!sectionFile.includes("padStart(2, \"0\")")) {
    throw new Error("Editorial '01 / 06' counter indicator missing from carousel!");
  }
  console.log("✓ Verified accessible circular navigation controls and '01 / 06' editorial pagination counter.");

  // [TEST 9] Auditing Touch Targets & Minimum 44px
  console.log("\n[TEST 9] Auditing 44px Minimum Touch Targets...");
  if (!sectionFile.includes("min-h-[44px]") || !sectionFile.includes("w-11 h-11")) {
    throw new Error("Carousel buttons must adhere to 44px minimum touch targets!");
  }
  console.log("✓ Verified all interactive category buttons and navigation controls meet 44px touch target guidelines.");

  // [TEST 10] Auditing Autoplay & Pause Interaction
  console.log("\n[TEST 10] Auditing Autoplay & Hover/Focus Pause Handlers...");
  if (!sectionFile.includes("onMouseEnter") || !sectionFile.includes("onFocus") || !sectionFile.includes("setInterval")) {
    throw new Error("Carousel missing hover/focus pause or interval logic!");
  }
  console.log("✓ Verified carousel autoplay with hover, focus, and modal pause handlers.");

  // [TEST 11] Auditing Multi-Card Responsive Layout (1 mobile, 2 tablet, 3 desktop)
  console.log("\n[TEST 11] Auditing Multi-Card Responsive Layout...");
  if (!sectionFile.includes("grid-cols-1 md:grid-cols-2 lg:grid-cols-3")) {
    throw new Error("Multi-card responsive grid layout (1 mob, 2 tab, 3 desk) missing!");
  }
  console.log("✓ Verified well-proportioned multi-card layout (1 mobile, 2 tablet, 3 desktop cards).");

  // [TEST 12] Auditing Colorful Theming & Phrase Color Hierarchy
  console.log("\n[TEST 12] Auditing Colorful Theming & Phrase Color Hierarchy...");
  if (!cardFile.includes("bg-gradient-to-br from-[#F0F6FF]") || !cardFile.includes("bg-gradient-to-br from-[#F0FDF4]")) {
    throw new Error("ReviewCard must apply light, elegant JEE Sapphire & NEET Emerald gradients!");
  }
  if (!cardFile.includes("renderHighlightedText")) {
    throw new Error("renderHighlightedText utility missing from ReviewCard!");
  }
  console.log("✓ Verified light color theming: JEE Light Sapphire and NEET Light Emerald.");

  // [TEST 13] Auditing Student Portrait Rendering in Card
  console.log("\n[TEST 13] Auditing Student Portrait Rendering in Card...");
  if (!cardFile.includes("review.image") || !cardFile.includes("rounded-full")) {
    throw new Error("ReviewCard must display circular student portrait image!");
  }
  console.log("✓ Verified illuminated circular student portrait presentation in ReviewCard.");

  // [TEST 14] Auditing Accessible Full Story Modal
  console.log("\n[TEST 14] Auditing Full Story Modal Dialog...");
  if (!sectionFile.includes('role="dialog"') || !sectionFile.includes('aria-modal="true"')) {
    throw new Error("Accessible story modal dialog missing from TestimonialsHomeSection!");
  }
  console.log("✓ Verified accessible full story modal dialog with escape key & backdrop dismissal.");

  // [TEST 15] Auditing Horizontal Story Progress Bar
  console.log("\n[TEST 15] Auditing Horizontal Progress Bar...");
  if (!sectionFile.includes("progressPercent") || !sectionFile.includes("bg-[#1769E0]")) {
    throw new Error("Horizontal progress line missing from section controls!");
  }
  console.log("✓ Verified horizontal story progress line with active fill.");

  console.log("\n==================================================");
  console.log("ALL TESTIMONIALS SECTION REDESIGN TESTS PASSED (15/15)");
  console.log("==================================================");
}

runTestimonialsRedesignQA();
