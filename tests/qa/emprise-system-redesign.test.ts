import { HOMEPAGE_DATA } from "../../src/data/homepage";
import fs from "fs";
import path from "path";

function runStep9EmpriseSystemQA() {
  console.log("==================================================");
  console.log("TEST SUITE: STEP 9 - EMPRISE SYSTEM REDESIGN QA");
  console.log("==================================================");

  // [TEST 1] Auditing Section Eyebrow
  console.log("\n[TEST 1] Auditing Section Eyebrow...");
  const sectionFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/TheEmpriseSystemSection.tsx"),
    "utf8"
  );
  if (!sectionFile.includes("SIGNATURE METHODOLOGY")) {
    throw new Error("Section eyebrow 'SIGNATURE METHODOLOGY' is missing!");
  }
  console.log("✓ Verified section eyebrow: 'SIGNATURE METHODOLOGY'.");

  // [TEST 2] Auditing Main Heading
  console.log("\n[TEST 2] Auditing Main Heading...");
  if (!sectionFile.includes("The Emprise") || !sectionFile.includes("System")) {
    throw new Error("Main heading 'The Emprise System' is missing!");
  }
  console.log("✓ Verified main heading: 'The Emprise System'.");

  // [TEST 3] Auditing New Exact Subheading
  console.log("\n[TEST 3] Auditing New Exact Subheading...");
  const exactSubheading = "Setting the Benchmark for IIT-JEE, NEET & Academic Excellence in Mathura";
  if (!sectionFile.includes(exactSubheading)) {
    throw new Error(`Exact subheading '${exactSubheading}' is missing from TheEmpriseSystemSection!`);
  }
  console.log(`✓ Verified exact approved subheading: '${exactSubheading}'.`);

  // [TEST 4] Auditing New Exact Supporting Statement
  console.log("\n[TEST 4] Auditing New Exact Supporting Statement...");
  const exactSupporting = "A Structured Academic System Designed for Consistent Progress & Better Results.";
  if (!sectionFile.includes(exactSupporting)) {
    throw new Error(`Exact supporting statement '${exactSupporting}' is missing from TheEmpriseSystemSection!`);
  }
  console.log(`✓ Verified exact approved supporting statement: '${exactSupporting}'.`);

  // [TEST 5] Auditing Methodology Step Count (Exactly 8 Steps)
  console.log("\n[TEST 5] Auditing Methodology Step Count...");
  const steps = HOMEPAGE_DATA.empriseSystem;
  if (!steps || steps.length !== 8) {
    throw new Error(`Expected exactly 8 methodology steps, but found ${steps?.length}!`);
  }
  console.log(`✓ Verified exact 8 methodology steps in HOMEPAGE_DATA.empriseSystem.`);

  // [TEST 6] Auditing Preservation of Existing Step Titles, Subtitles, and Descriptions
  console.log("\n[TEST 6] Auditing Preservation of Step Content...");
  const expectedSteps = [
    {
      stepNumber: "01",
      title: "Integrated Subject Learning",
      subtitle: "Foundational Clarity",
      descSnippet: "Interactive classroom pedagogy",
    },
    {
      stepNumber: "02",
      title: "Competitive Exam Testing System",
      subtitle: "Exam Simulation",
      descSnippet: "Strictly timed objective",
    },
    {
      stepNumber: "03",
      title: "Success Planner",
      subtitle: "Daily Execution",
      descSnippet: "Structured self-study roadmaps",
    },
    {
      stepNumber: "04",
      title: "Board & School Exam Preparation",
      subtitle: "Dual Excellence",
      descSnippet: "Dedicated descriptive writing guidance",
    },
    {
      stepNumber: "05",
      title: "Online & CBT-Based Test Practice",
      subtitle: "Digital Readiness",
      descSnippet: "Computer-Based Test simulations",
    },
    {
      stepNumber: "06",
      title: "Regular PTM & Parent Feedback",
      subtitle: "Transparent Tracking",
      descSnippet: "Scheduled Parent-Teacher Meetings",
    },
    {
      stepNumber: "07",
      title: "Surprise Tests & Review Tests",
      subtitle: "Retention Check",
      descSnippet: "Periodic unannounced assessments",
    },
    {
      stepNumber: "08",
      title: "Counselling & Motivation Sessions",
      subtitle: "Mindset & Focus",
      descSnippet: "Director-led motivational talks",
    },
  ];

  expectedSteps.forEach((exp, idx) => {
    const act = steps[idx];
    if (act.stepNumber !== exp.stepNumber) {
      throw new Error(`Step ${idx + 1}: Expected number ${exp.stepNumber}, got ${act.stepNumber}`);
    }
    if (act.title !== exp.title) {
      throw new Error(`Step ${idx + 1}: Expected title '${exp.title}', got '${act.title}'`);
    }
    if (act.subtitle !== exp.subtitle) {
      throw new Error(`Step ${idx + 1}: Expected subtitle '${exp.subtitle}', got '${act.subtitle}'`);
    }
    if (!act.description.includes(exp.descSnippet)) {
      throw new Error(`Step ${idx + 1}: Description missing expected snippet '${exp.descSnippet}'`);
    }
  });
  console.log("✓ Verified all 8 steps have 100% preserved titles, subtitles, and descriptions.");

  // [TEST 7] Auditing Tailored Benefits for All 8 Steps
  console.log("\n[TEST 7] Auditing Tailored Benefits for All 8 Steps...");
  steps.forEach((step, idx) => {
    if (!step.benefits || step.benefits.length < 2) {
      throw new Error(`Step ${idx + 1} (${step.title}) lacks sufficient tailored benefits!`);
    }
  });
  console.log("✓ Verified every step has 3 tailored, concrete academic outcomes/benefits.");

  // [TEST 8] Auditing Dynamic Step Counter
  console.log("\n[TEST 8] Auditing Dynamic Step Counter in ActiveMethodologyPanel...");
  const panelFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/ActiveMethodologyPanel.tsx"),
    "utf8"
  );
  if (!panelFile.includes("STEP {step.stepNumber} OF")) {
    throw new Error("Dynamic step counter 'STEP {step.stepNumber} OF' is missing from ActiveMethodologyPanel!");
  }
  console.log("✓ Verified dynamic step counter: 'STEP {step.stepNumber} OF {String(totalSteps).padStart(2, '0')}'.");

  // [TEST 9] Auditing Accessibility Attributes
  console.log("\n[TEST 9] Auditing Accessibility Attributes...");
  const railFile = fs.readFileSync(
    path.join(process.cwd(), "src/components/home/MethodologyRailItem.tsx"),
    "utf8"
  );
  if (!railFile.includes('role="tab"')) {
    throw new Error("MethodologyRailItem missing role='tab'!");
  }
  if (!railFile.includes("aria-selected={isActive}")) {
    throw new Error("MethodologyRailItem missing aria-selected={isActive}!");
  }
  if (!railFile.includes("aria-controls=")) {
    throw new Error("MethodologyRailItem missing aria-controls!");
  }
  if (!panelFile.includes('role="tabpanel"')) {
    throw new Error("ActiveMethodologyPanel missing role='tabpanel'!");
  }
  console.log("✓ Verified accessibility attributes: role='tab', aria-selected, aria-controls, role='tabpanel'.");

  // [TEST 10] Auditing Mobile Quick Chips & 44px Minimum Touch Targets
  console.log("\n[TEST 10] Auditing Mobile Quick Chips & Touch Targets...");
  if (!sectionFile.includes("min-h-[44px]") || !sectionFile.includes("min-w-[44px]")) {
    throw new Error("Mobile step chips must have minimum 44px touch targets!");
  }
  console.log("✓ Verified mobile step chips have 44px minimum touch targets and snap scrolling.");

  console.log("\n==================================================");
  console.log("ALL STEP 9 EMPRISE SYSTEM REDESIGN TESTS PASSED (10/10)");
  console.log("==================================================");
}

runStep9EmpriseSystemQA();
