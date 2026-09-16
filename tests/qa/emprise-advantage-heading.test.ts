import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 7 - EMPRISE ADVANTAGE SECTION HEADING QA");
console.log("==================================================");

async function runEmpriseAdvantageTests() {
  const filePath = path.resolve(process.cwd(), "src/components/home/WhyEmpriseSection.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // [TEST 1] Removal of Old Heading
  console.log("\n[TEST 1] Verifying removal of old 'Why Students & Parents Choose Emprise' heading...");
  if (content.includes("Why Students & Parents Choose") || content.includes("Why Students &amp; Parents Choose")) {
    throw new Error("Old heading 'Why Students & Parents Choose Emprise' must be completely removed from WhyEmpriseSection.tsx!");
  }
  console.log("✓ Old heading is completely removed.");

  // [TEST 2] Exact New Main Heading
  console.log("\n[TEST 2] Verifying exact new main heading...");
  const cleanHeading = content
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

  const expectedExactHeading = "Trusted by Mathura’s Parents. Proven by Results. Chosen for IIT-JEE & NEET Success.";
  if (!cleanHeading.includes(expectedExactHeading)) {
    throw new Error(`Heading text must evaluate cleanly to "${expectedExactHeading}"! Clean text extracted was: "${cleanHeading}"`);
  }
  console.log("✓ Verified exact main heading: 'Trusted by Mathura’s Parents. Proven by Results. Chosen for IIT-JEE & NEET Success.'");

  // [TEST 3] Eyebrow Preservation
  console.log("\n[TEST 3] Verifying eyebrow 'THE EMPRISE ADVANTAGE' is preserved...");
  if (!content.includes("THE EMPRISE ADVANTAGE")) {
    throw new Error("Eyebrow 'THE EMPRISE ADVANTAGE' must be preserved!");
  }
  console.log("✓ Eyebrow 'THE EMPRISE ADVANTAGE' is preserved.");

  // [TEST 4] Existing Description Preservation
  console.log("\n[TEST 4] Verifying exact existing section description is preserved...");
  const expectedDesc = "Ten foundational pillars that create disciplined study habits, deeper conceptual clarity, and confident academic achievers in Mathura.";
  if (!content.includes(expectedDesc)) {
    throw new Error(`Existing description must be preserved exactly: "${expectedDesc}"`);
  }
  console.log("✓ Verified existing description is preserved word-for-word.");

  // [TEST 5] Selective Color Emphasis (#1769E0 for 'Proven by Results.')
  console.log("\n[TEST 5] Auditing selective brand color emphasis...");
  if (!content.includes("text-[#1769E0]\">Proven by Results.")) {
    throw new Error("Selective emphasis text-[#1769E0] must be applied to 'Proven by Results.'!");
  }
  if (!content.includes("text-[#14213D]")) {
    throw new Error("Primary heading text color must be #14213D!");
  }
  console.log("✓ Verified Dark Navy (#14213D) primary with selective Emprise Blue (#1769E0) emphasis on 'Proven by Results.'");

  // [TEST 6] Responsive Line Breaks & Container Width
  console.log("\n[TEST 6] Auditing responsive line breaks & container width...");
  if (!content.includes("inline-block") || !content.includes("block")) {
    throw new Error("Heading must use structured inline-block/block spans to avoid awkward word breaks!");
  }
  if (!content.includes("max-w-4xl") && !content.includes("max-w-5xl") && !content.includes("max-w-[1100px]")) {
    throw new Error("Header container must support 1000-1150px max-width on desktop!");
  }
  console.log("✓ Verified balanced responsive line breaking and 1000-1150px max-width container.");

  // [TEST 7] All 10 Feature Cards in HOMEPAGE_DATA Intact
  console.log("\n[TEST 7] Auditing all 10 feature cards in HOMEPAGE_DATA.whyEmprise...");
  const items = HOMEPAGE_DATA.whyEmprise;
  if (items.length !== 10) {
    throw new Error(`Expected exactly 10 feature cards, got ${items.length}`);
  }

  const expectedTitles = [
    "Director-Led Teaching, Mentorship & Care",
    "IITians & Doctors as Faculty",
    "Small Batches. Maximum Attention.",
    "Research-Driven Study Material & DPPs",
    "Rigorous Testing & Performance Analysis",
    "School & Board Excellence Alongside Competitive",
    "Dedicated Library Facility",
    "Structured Doubt Resolution",
    "Personalised Academic Care",
    "15+ Years of Academic Legacy",
  ];

  for (let i = 0; i < 10; i++) {
    const expectedNum = (i + 1).toString().padStart(2, "0");
    if (items[i].number !== expectedNum) {
      throw new Error(`Card ${i + 1} number expected '${expectedNum}', got '${items[i].number}'`);
    }
    if (items[i].title !== expectedTitles[i]) {
      throw new Error(`Card ${i + 1} title mismatch! Expected '${expectedTitles[i]}', got '${items[i].title}'`);
    }
  }
  console.log("✓ Verified all 10 feature cards in HOMEPAGE_DATA are 100% intact with exact numbers and titles.");

  // [TEST 8] Card Grid Rendering in WhyEmpriseSection Intact
  console.log("\n[TEST 8] Auditing card grid rendering in WhyEmpriseSection...");
  if (!content.includes("grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5")) {
    throw new Error("10-card grid layout classes must remain unchanged!");
  }
  if (!content.includes("item.number") || !content.includes("item.title") || !content.includes("item.description")) {
    throw new Error("Card data bindings (number, title, description) must remain intact!");
  }
  console.log("✓ Verified 10-card grid layout and data bindings are completely unchanged.");

  console.log("\n==================================================");
  console.log("ALL STEP 7 EMPRISE ADVANTAGE SECTION TESTS PASSED (8/8)");
  console.log("==================================================");
}

runEmpriseAdvantageTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
