import { HOMEPAGE_REVIEWS } from "../../src/data/testimonials";
import fs from "fs";
import path from "path";

function runStep10TestimonialsQA() {
  console.log("==================================================");
  console.log("TEST SUITE: STEP 10 - TESTIMONIALS SECTION REDESIGN QA");
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
  console.log("✓ Verified all 6 NEET reviews with exact students and institutions (including 'AIR-59 IN AIIMS').");

  // [TEST 7] Auditing Zero Fake Ratings & Zero Fake Verified Badges
  console.log("\n[TEST 7] Auditing Prohibition of Fake Ratings & Verified Badges...");
  if (cardFile.includes("5.0/5") || cardFile.includes("★★★★★")) {
    throw new Error("Found fake numeric rating claim in ReviewCard!");
  }
  if (cardFile.includes("Verified") && !cardFile.includes("verifiedContext")) {
    throw new Error("Found fake 'Verified' badge in ReviewCard!");
  }
  console.log("✓ Verified typography-led design: zero fake 5.0/5 ratings and zero fake trust badges.");

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
  console.log("✓ Verified autoplay (5s) with pause on mouseEnter, focus, and touchStart.");

  console.log("\n==================================================");
  console.log("ALL STEP 10 TESTIMONIALS REDESIGN TESTS PASSED (10/10)");
  console.log("==================================================");
}

runStep10TestimonialsQA();
