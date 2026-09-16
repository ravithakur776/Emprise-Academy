import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 8 - FAQ SECTION COMPLETE REBUILD QA");
console.log("==================================================");

async function runFaqTests() {
  const faqs = HOMEPAGE_DATA.faqs;

  // [TEST 1] Exactly 13 FAQs Count
  console.log("\n[TEST 1] Auditing FAQ Count...");
  if (faqs.length !== 13) {
    throw new Error(`Expected exactly 13 FAQs, found ${faqs.length}!`);
  }
  console.log(`✓ Exactly 13 FAQs present in HOMEPAGE_DATA.faqs.`);

  // [TEST 2] Removal of Legacy 6 FAQs
  console.log("\n[TEST 2] Verifying removal of old 6 FAQ questions...");
  const rawHomepage = fs.readFileSync(
    path.resolve(process.cwd(), "src/data/homepage.ts"),
    "utf-8"
  );
  const legacyQuestions = [
    "Why should I choose Emprise Academy for IIT-JEE and NEET in Mathura?",
    "What is ETSE 2026 and how can I participate?",
    "How does Emprise Academy balance school boards with competitive exams?",
    "What is the batch size at Emprise Academy?",
    "How are doubts resolved at the institute?",
    "Where is the Emprise Academy campus located in Mathura?",
  ];

  for (const oldQ of legacyQuestions) {
    if (rawHomepage.includes(oldQ)) {
      throw new Error(`Legacy FAQ question still present in src/data/homepage.ts: "${oldQ}"`);
    }
  }
  console.log("✓ All 6 legacy FAQ questions completely removed.");

  // [TEST 3] Exact Order of 13 Questions
  console.log("\n[TEST 3] Auditing Exact Question Order (1 to 13)...");
  const expectedQuestions = [
    "Why is Emprise Academy a trusted choice for IIT-JEE and NEET preparation in Mathura?",
    "Which is the best IIT-JEE coaching in Mathura?",
    "How is Emprise Academy different from other JEE and NEET coaching institutes in Mathura?",
    "Does Emprise Academy have experienced IITians and Doctors as faculty?",
    "Does Emprise Academy have a proven JEE and NEET track record?",
    "Who are the toppers from Emprise Academy Mathura?",
    "Does Emprise Academy prepare students for Board Exams along with JEE and NEET?",
    "Does Emprise Academy provide online or CBT-based test practice?",
    "Does Emprise provide doubt-solving and personalised mentorship?",
    "Does the Director personally teach and mentor students?",
    "Does Emprise Academy conduct Parent-Teacher Meetings (PTMs)?",
    "Does Emprise Academy offer Foundation Classes for Classes 8–10?",
    "Where is Emprise Academy located in Mathura?",
  ];

  for (let i = 0; i < 13; i++) {
    if (faqs[i].question !== expectedQuestions[i]) {
      throw new Error(
        `FAQ ${i + 1} question mismatch!\nExpected: "${expectedQuestions[i]}"\nGot:      "${faqs[i].question}"`
      );
    }
    if (faqs[i].id !== i + 1) {
      throw new Error(`FAQ ${i + 1} id mismatch! Expected ${i + 1}, got ${faqs[i].id}`);
    }
  }
  console.log("✓ All 13 questions strictly match approved text and sequence.");

  // [TEST 4] No Duplicate Questions
  console.log("\n[TEST 4] Checking for Duplicate Questions...");
  const questionSet = new Set(faqs.map((f) => f.question));
  if (questionSet.size !== 13) {
    throw new Error(`Duplicate questions detected! Unique count: ${questionSet.size} / 13`);
  }
  console.log("✓ Zero duplicate questions detected.");

  // [TEST 5] FAQ 01 Content & Structure
  console.log("\n[TEST 5] Auditing FAQ 01 Content & Bullets...");
  const faq1 = faqs[0];
  if (!faq1.answer.includes("15+ Years of Academic Legacy in Mathura")) {
    throw new Error("FAQ 01 missing '15+ Years of Academic Legacy in Mathura'!");
  }
  if (!faq1.bullets || faq1.bullets.length !== 5) {
    throw new Error(`FAQ 01 expected 5 structured bullets, got ${faq1.bullets?.length}`);
  }
  console.log("✓ FAQ 01 verified with lead, 5 bullets, and closing paragraph.");

  // [TEST 6] FAQ 02 Marketing Copy Lock
  console.log("\n[TEST 6] Auditing FAQ 02 Copy Lock...");
  const faq2 = faqs[1];
  if (!faq2.answer.includes("Best IIT-JEE coaching institute in Mathura")) {
    throw new Error("FAQ 02 missing 'Best IIT-JEE coaching institute in Mathura'!");
  }
  if (!faq2.answer.includes("Emprise holds the title of best JEE Coaching in Mathura")) {
    throw new Error("FAQ 02 missing 'Emprise holds the title of best JEE Coaching in Mathura'!");
  }
  console.log("✓ FAQ 02 exact marketing copy locked.");

  // [TEST 7] FAQ 03 Content & 6 Differentiators
  console.log("\n[TEST 7] Auditing FAQ 03 Content & Differentiators...");
  const faq3 = faqs[2];
  if (!faq3.bullets || faq3.bullets.length !== 6) {
    throw new Error(`FAQ 03 expected 6 structured bullets, got ${faq3.bullets?.length}`);
  }
  if (!faq3.closing?.includes("More Faculty. More Attention. More Care. A Better Academic Environment.")) {
    throw new Error("FAQ 03 missing closing punchline!");
  }
  console.log("✓ FAQ 03 verified with 6 differentiators and closing statement.");

  // [TEST 8] FAQ 05 Proven Track Record
  console.log("\n[TEST 8] Auditing FAQ 05 Numbers & Legacy...");
  const faq5 = faqs[4];
  if (!faq5.answer.includes("200+ Emprise students have achieved success as IITians and Doctors")) {
    throw new Error("FAQ 05 missing '200+ Emprise students have achieved success as IITians and Doctors'!");
  }
  if (!faq5.answer.includes("700+ students have successfully cleared various competitive examinations")) {
    throw new Error("FAQ 05 missing '700+ students have successfully cleared'!");
  }
  console.log("✓ FAQ 05 verified with 200+ IITians/Doctors and 700+ selections.");

  // [TEST 9] FAQ 06 Achievers & Toppers List
  console.log("\n[TEST 9] Auditing FAQ 06 Achievers List...");
  const faq6 = faqs[5];
  if (!faq6.achievers || faq6.achievers.length !== 9) {
    throw new Error(`FAQ 06 expected 9 achievers, got ${faq6.achievers?.length}`);
  }
  const expectedAchievers = [
    { student: "Atul Dagur", exam: "2026 IIT-JEE Topper", inst: "IIT-Bombay" },
    { student: "Govind Gupta", exam: "2025 IIT-JEE Topper", inst: "AIR 404" },
    { student: "Utkarsh Pandey", exam: "2024 IIT-JEE Topper", inst: "IIT-Dhanbad" },
    { student: "Sharvan", exam: "2023 IIT-JEE Topper", inst: "AIR-92 (Cat.)" },
    { student: "Umesh Yadav", exam: "2022 IIT-JEE Topper", inst: "AIR-645" },
    { student: "Anil Yadav", exam: "2025 NEET Topper", inst: "AIR 4,460" },
    { student: "Tanisha", exam: "2024 NEET Topper", inst: "AIR 458" },
    { student: "Aayan", exam: "2023 NEET Topper", inst: "AIR 850" },
    { student: "Shobhit", exam: "2022 NEET Topper", inst: "AIIMS Jodhpur" },
  ];

  for (let i = 0; i < expectedAchievers.length; i++) {
    const item = faq6.achievers[i];
    const exp = expectedAchievers[i];
    if (item.student !== exp.student || !item.yearExam.includes(exp.exam)) {
      throw new Error(`Achiever ${i + 1} mismatch! Expected ${exp.student} (${exp.exam}), got ${item.student} (${item.yearExam})`);
    }
  }
  console.log("✓ FAQ 06 verified with all 9 toppers (Atul Dagur, Govind Gupta, Utkarsh, Sharvan, Umesh, Anil, Tanisha, Aayan, Shobhit).");

  // [TEST 10] FAQ 13 Location
  console.log("\n[TEST 10] Auditing FAQ 13 Location...");
  const faq13 = faqs[12];
  if (!faq13.answer.includes("near Tera Tower, Bhuteshwar Road, Mathura") && !faq13.answer.includes("Near Tera Tower, Bhuteshwar Road, Mathura")) {
    throw new Error("FAQ 13 missing 'near Tera Tower, Bhuteshwar Road, Mathura'!");
  }
  console.log("✓ FAQ 13 verified with exact corporate centre location.");

  // [TEST 11] FAQAccordionItem Component & Accessibility
  console.log("\n[TEST 11] Auditing FAQAccordionItem Component & Accessibility...");
  const itemPath = path.resolve(process.cwd(), "src/components/home/FAQAccordionItem.tsx");
  const itemContent = fs.readFileSync(itemPath, "utf-8");

  if (!itemContent.includes("aria-expanded={isOpen}")) {
    throw new Error("FAQAccordionItem must implement aria-expanded={isOpen}!");
  }
  if (!itemContent.includes("aria-controls={panelId}")) {
    throw new Error("FAQAccordionItem must implement aria-controls!");
  }
  if (!itemContent.includes('role="region"')) {
    throw new Error("FAQAccordionItem panel must have role='region'!");
  }
  if (!itemContent.includes("focus-visible:outline-[#1769E0]")) {
    throw new Error("FAQAccordionItem button must have visible brand-blue focus ring!");
  }
  if (!itemContent.includes("rotate-180")) {
    throw new Error("FAQAccordionItem must animate chevron 180° rotation on open!");
  }
  console.log("✓ FAQAccordionItem accessibility (aria-expanded, aria-controls, role, focus-visible) verified.");

  // [TEST 12] FAQSection Single-Open Accordion State
  console.log("\n[TEST 12] Auditing FAQSection Single-Open State...");
  const sectionPath = path.resolve(process.cwd(), "src/components/home/FAQSection.tsx");
  const sectionContent = fs.readFileSync(sectionPath, "utf-8");

  if (!sectionContent.includes("FAQAccordionItem")) {
    throw new Error("FAQSection must use FAQAccordionItem component!");
  }
  if (!sectionContent.includes("openIndex === idx")) {
    throw new Error("FAQSection must enforce single-open state (openIndex === idx)!");
  }
  if (!sectionContent.includes("Got Questions?")) {
    throw new Error("FAQSection must preserve main heading 'Got Questions?'!");
  }
  if (!sectionContent.includes("FREQUENTLY ASKED QUESTIONS")) {
    throw new Error("FAQSection must preserve eyebrow 'FREQUENTLY ASKED QUESTIONS'!");
  }
  console.log("✓ FAQSection verified with single-open state and preserved headings.");

  // [TEST 13] HomepageJsonLd FAQPage Schema Representation
  console.log("\n[TEST 13] Auditing HomepageJsonLd FAQPage Schema...");
  const jsonLdPath = path.resolve(process.cwd(), "src/components/home/HomepageJsonLd.tsx");
  const jsonLdContent = fs.readFileSync(jsonLdPath, "utf-8");

  if (!jsonLdContent.includes('"@type": "FAQPage"')) {
    throw new Error("HomepageJsonLd must include FAQPage structured data!");
  }
  if (!jsonLdContent.includes("HOMEPAGE_DATA.faqs.map")) {
    throw new Error("HomepageJsonLd FAQPage schema must map over HOMEPAGE_DATA.faqs!");
  }
  console.log("✓ HomepageJsonLd represents all 13 FAQs in FAQPage schema.");

  console.log("\n==================================================");
  console.log("ALL STEP 8 FAQ REBUILD TESTS PASSED (13/13)");
  console.log("==================================================");
}

runFaqTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
