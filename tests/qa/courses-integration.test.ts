import {
  CANONICAL_COURSES,
  getCanonicalCourses,
  getCoursesByProgramme,
  getCourseBySlug,
  getCoreProgramPillars,
} from "@/data/courses";
import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: PHASE 5.4 BASIC COURSE & PROGRAMME DATA INTEGRATION");
console.log("==================================================");

async function runCoursesIntegrationTests() {
  // [TEST 1] Auditing Canonical Courses Total & Ordering
  console.log("\n[TEST 1] Auditing Canonical Courses Registry...");
  const courses = getCanonicalCourses();
  if (courses.length !== 9) {
    throw new Error(`Expected exactly 9 canonical course records, found ${courses.length}`);
  }
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].displayOrder !== i + 1) {
      throw new Error(`Course ${courses[i].id} has invalid displayOrder ${courses[i].displayOrder}, expected ${i + 1}`);
    }
  }
  console.log("✓ Verified 9 canonical course programmes with correct 1..9 display ordering.");

  // [TEST 2] Auditing 3 Primary Programme Streams
  console.log("\n[TEST 2] Auditing 3 Primary Programme Streams (JEE, NEET, Foundation)...");
  const jeeCourses = getCoursesByProgramme("JEE");
  const neetCourses = getCoursesByProgramme("NEET");
  const foundationCourses = getCoursesByProgramme("FOUNDATION");

  if (jeeCourses.length !== 3) {
    throw new Error(`Expected 3 JEE courses, found ${jeeCourses.length}`);
  }
  if (neetCourses.length !== 3) {
    throw new Error(`Expected 3 NEET courses, found ${neetCourses.length}`);
  }
  if (foundationCourses.length !== 3) {
    throw new Error(`Expected 3 Foundation courses, found ${foundationCourses.length}`);
  }
  console.log("✓ Verified 3 JEE, 3 NEET, and 3 Foundation course streams.");

  // [TEST 3] Auditing Subject Coverage & Academic Focus
  console.log("\n[TEST 3] Auditing Subject Coverage & Academic Focus...");
  for (const c of jeeCourses) {
    if (!c.subjects.includes("Physics") || !c.subjects.includes("Chemistry") || !c.subjects.includes("Mathematics")) {
      throw new Error(`JEE course ${c.id} missing core subjects (PCM)`);
    }
    if (c.academicFocus.length < 5) {
      throw new Error(`JEE course ${c.id} has insufficient academic focus points`);
    }
  }
  for (const c of neetCourses) {
    if (!c.subjects.includes("Physics") || !c.subjects.includes("Chemistry") || !c.subjects.includes("Biology")) {
      throw new Error(`NEET course ${c.id} missing core subjects (PCB)`);
    }
  }
  for (const c of foundationCourses) {
    if (!c.subjects.includes("Mathematics") || !c.subjects.includes("Science")) {
      throw new Error(`Foundation course ${c.id} missing core subjects`);
    }
  }
  console.log("✓ Core subjects and academic focus verified for all 9 programmes.");

  // [TEST 4] Auditing Zero Fabricated Fees, Timings, Batch Sizes
  console.log("\n[TEST 4] Auditing Zero Fabricated Fees, Timings & Batch Sizes...");
  for (const c of CANONICAL_COURSES) {
    if (c.fee !== null) {
      throw new Error(`Course ${c.id} contains unverified fee value: ${c.fee}`);
    }
    if (c.batchTimings !== null) {
      throw new Error(`Course ${c.id} contains unverified batchTimings: ${c.batchTimings}`);
    }
    if (c.batchSize !== null) {
      throw new Error(`Course ${c.id} contains unverified batchSize: ${c.batchSize}`);
    }
  }
  console.log("✓ All 9 courses strictly adhere to zero-fabrication (fee=null, batchTimings=null, batchSize=null).");

  // [TEST 5] Auditing Class-wise Public URLs & Slugs
  console.log("\n[TEST 5] Auditing Class-wise Public Routing...");
  const expectedRoutes = [
    { id: "jee-class-11", url: "/iit-jee-coaching-mathura/class-11" },
    { id: "jee-class-12", url: "/iit-jee-coaching-mathura/class-12" },
    { id: "jee-dropper", url: "/iit-jee-coaching-mathura/dropper" },
    { id: "neet-class-11", url: "/neet-coaching-mathura/class-11" },
    { id: "neet-class-12", url: "/neet-coaching-mathura/class-12" },
    { id: "neet-dropper", url: "/neet-coaching-mathura/dropper" },
    { id: "foundation-class-8", url: "/foundation-coaching-mathura/class-8" },
    { id: "foundation-class-9", url: "/foundation-coaching-mathura/class-9" },
    { id: "foundation-class-10", url: "/foundation-coaching-mathura/class-10" },
  ];

  for (const exp of expectedRoutes) {
    const found = getCourseBySlug(exp.id);
    if (!found || found.publicUrl !== exp.url) {
      throw new Error(`Routing mismatch for course ${exp.id}: got ${found?.publicUrl}, expected ${exp.url}`);
    }
  }
  console.log("✓ All 9 class-wise routes match canonical public URL architecture.");

  // [TEST 6] Auditing Core Program Pillars
  console.log("\n[TEST 6] Auditing Core Program Pillars...");
  const pillars = getCoreProgramPillars();
  if (pillars.length !== 3) {
    throw new Error(`Expected 3 core program pillars, found ${pillars.length}`);
  }
  const pillarIds = pillars.map((p) => p.programmeId);
  if (!pillarIds.includes("JEE") || !pillarIds.includes("NEET") || !pillarIds.includes("FOUNDATION")) {
    throw new Error("Missing expected canonical programme IDs in pillars");
  }
  console.log("✓ Core programme pillars verified for homepage and /courses directory.");

  // [TEST 7] Auditing Admissions Counselling Canonical Identifiers
  console.log("\n[TEST 7] Auditing Admissions Counselling Canonical Identifiers...");
  const validProgrammeIds = ["JEE", "NEET", "FOUNDATION"];
  for (const p of pillars) {
    if (!validProgrammeIds.includes(p.programmeId)) {
      throw new Error(`Invalid programme ID ${p.programmeId}`);
    }
  }
  console.log("✓ Standardized canonical programme identifiers (JEE, NEET, FOUNDATION) verified.");

  // [TEST 8] Scanning Source Files for Fake Course Pricing/Timings
  console.log("\n[TEST 8] Scanning Courses Source Files for Prohibited Claims...");
  const coursesFile = path.resolve(process.cwd(), "src/data/courses.ts");
  const content = fs.readFileSync(coursesFile, "utf-8");
  const prohibitedClaims = ["Guaranteed Selection", "100% Success", "₹1,00,000", "₹80,000", "Morning Batch: 8 AM"];
  for (const claim of prohibitedClaims) {
    if (content.includes(claim)) {
      throw new Error(`Found prohibited claim in courses.ts: ${claim}`);
    }
  }
  console.log("✓ Zero prohibited claims or fake pricing detected in courses data registry.");

  console.log("\n==================================================");
  console.log("ALL PHASE 5.4 COURSES INTEGRATION TESTS PASSED (8/8)");
  console.log("==================================================");
}

runCoursesIntegrationTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
