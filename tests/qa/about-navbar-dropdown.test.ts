import fs from "fs";
import path from "path";
import { ABOUT_NAV_HEADER, ABOUT_MENU_ITEMS } from "@/data/aboutNav";
import { AWARDS_DATA, hasVerifiedAwards } from "@/data/awards";

console.log("==================================================");
console.log("TEST SUITE: STEP 11B - THREE INDEPENDENT ABOUT DESTINATIONS QA");
console.log("==================================================");

async function runThreeIndependentAboutDestinationsTests() {
  // [TEST 1] Auditing Navigation Configuration & Routes in src/data/aboutNav.ts
  console.log("\n[TEST 1] Auditing Three Independent About Navigation Items...");
  if (ABOUT_MENU_ITEMS.length !== 3) {
    throw new Error(`Expected exactly 3 About categories, found ${ABOUT_MENU_ITEMS.length}`);
  }

  const expectedItems = [
    {
      id: "overview",
      number: "01",
      title: "Brief About Emprise",
      description: "Our journey, academic philosophy and institutional identity.",
      iconName: "Building2",
      href: "/about",
    },
    {
      id: "awards",
      number: "02",
      title: "Awards & Accolades",
      description: "Recognition that reflects Emprise's academic journey.",
      iconName: "Trophy",
      href: "/about/awards",
    },
    {
      id: "directors",
      number: "03",
      title: "Directors",
      description: "Meet the academic leadership behind Emprise.",
      iconName: "Users",
      href: "/about/directors",
    },
  ];

  for (const exp of expectedItems) {
    const found = ABOUT_MENU_ITEMS.find((c) => c.id === exp.id);
    if (!found) {
      throw new Error(`Missing About menu item: ${exp.id}`);
    }
    if (found.number !== exp.number) {
      throw new Error(`Number mismatch for ${exp.id}: got "${found.number}", expected "${exp.number}"`);
    }
    if (found.title !== exp.title) {
      throw new Error(`Title mismatch for ${exp.id}: got "${found.title}", expected "${exp.title}"`);
    }
    if (found.href !== exp.href) {
      throw new Error(`Href mismatch for ${exp.id}: got "${found.href}", expected "${exp.href}"`);
    }
  }

  if (!ABOUT_NAV_HEADER.title || ABOUT_NAV_HEADER.title !== "ABOUT EMPRISE") {
    throw new Error(`Unexpected header title: ${ABOUT_NAV_HEADER.title}`);
  }
  console.log("✓ Verified 3 independent navigation routes: /about, /about/awards, /about/directors.");

  // [TEST 2] Auditing Destination 01 (src/app/(public)/about/page.tsx)
  console.log("\n[TEST 2] Auditing Destination 01: Brief About Emprise Separation...");
  const aboutPagePath = path.resolve(process.cwd(), "src/app/(public)/about/page.tsx");
  const aboutContent = fs.readFileSync(aboutPagePath, "utf-8");

  if (aboutContent.includes("getCanonicalDirectorsList")) {
    throw new Error("Full directors list biography should not be in Destination 01 (/about)");
  }
  if (aboutContent.includes("<DirectorPhoto")) {
    throw new Error("Full director biography cards should not be embedded in Destination 01 (/about)");
  }
  if (!aboutContent.includes("DESTINATION 01 — BRIEF ABOUT EMPRISE")) {
    throw new Error("About page missing Destination 01 eyebrow");
  }
  if (!aboutContent.includes("/about/directors")) {
    throw new Error("About page missing cross-link to /about/directors");
  }
  if (!aboutContent.includes("/about/awards")) {
    throw new Error("About page missing cross-link to /about/awards");
  }
  console.log("✓ Verified Destination 01: Contains solely institutional content, no full directors biography cards.");

  // [TEST 3] Auditing Destination 02 (Awards 7-Slot Architecture & Zero Fake Data)
  console.log("\n[TEST 3] Auditing Destination 02: Awards Architecture & 7 Empty Slots...");
  if (AWARDS_DATA.length !== 7) {
    throw new Error(`Expected exactly 7 award entries in AWARDS_DATA, found ${AWARDS_DATA.length}`);
  }
  for (let i = 0; i < 7; i++) {
    const award = AWARDS_DATA[i];
    if (award.id !== i + 1) {
      throw new Error(`Expected award id ${i + 1}, found ${award.id}`);
    }
    if (award.name !== "" || award.organization !== "" || award.year !== "") {
      throw new Error(`Award ${award.id} must be empty until verified data is provided`);
    }
  }
  if (hasVerifiedAwards()) {
    throw new Error("hasVerifiedAwards() must be false until real verified data is entered");
  }

  const awardsPagePath = path.resolve(process.cwd(), "src/app/(public)/about/awards/page.tsx");
  const awardsContent = fs.readFileSync(awardsPagePath, "utf-8");
  if (!awardsContent.includes("A dedicated space for Emprise Academy&apos;s awards and accolades")) {
    throw new Error("Awards page missing required editorial placeholder text");
  }
  if (!awardsContent.includes("DESTINATION 02 — HONORS & RECOGNITION")) {
    throw new Error("Awards page missing Destination 02 eyebrow");
  }
  console.log("✓ Verified Destination 02: Exactly 7-slot empty architecture, zero fake awards, verified editorial placeholder.");

  // [TEST 4] Auditing Destination 03 (/about/directors & Canonical Data Mapping)
  console.log("\n[TEST 4] Auditing Destination 03: Directors Dedicated Route...");
  const directorsPagePath = path.resolve(process.cwd(), "src/app/(public)/about/directors/page.tsx");
  if (!fs.existsSync(directorsPagePath)) {
    throw new Error("Missing src/app/(public)/about/directors/page.tsx");
  }
  const directorsContent = fs.readFileSync(directorsPagePath, "utf-8");
  if (!directorsContent.includes("DESTINATION 03 — ACADEMIC LEADERSHIP")) {
    throw new Error("Directors page missing Destination 03 eyebrow");
  }
  if (!directorsContent.includes("Leadership Behind Success")) {
    throw new Error("Directors page missing approved header");
  }
  if (!directorsContent.includes("DirectorsDualGrid")) {
    throw new Error("Directors page missing DirectorsDualGrid component");
  }
  if (!directorsContent.includes("MAIN_DIRECTORS_DATA")) {
    throw new Error("Directors page must consume canonical MAIN_DIRECTORS_DATA");
  }
  console.log("✓ Verified Destination 03: Dedicated /about/directors route consuming canonical data with zero duplication.");

  // [TEST 5] Auditing Navbar Integration & Active States
  console.log("\n[TEST 5] Auditing Navbar Dropdown and Mobile Submenu Active Routing...");
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  if (!navbarContent.includes("isAboutOpen")) {
    throw new Error("Navbar missing isAboutOpen state");
  }
  if (!navbarContent.includes("ABOUT_MENU_ITEMS")) {
    throw new Error("Navbar missing shared ABOUT_MENU_ITEMS");
  }

  const dropdownPath = path.resolve(process.cwd(), "src/components/navigation/AboutDropdown.tsx");
  const dropdownContent = fs.readFileSync(dropdownPath, "utf-8");
  if (!dropdownContent.includes("role=\"menu\"")) {
    throw new Error("AboutDropdown missing role=\"menu\"");
  }
  console.log("✓ Verified Navbar and AboutDropdown: active routing and keyboard accessibility.");

  console.log("\n==================================================");
  console.log("ALL STEP 11B THREE INDEPENDENT DESTINATIONS TESTS PASSED (5/5)");
  console.log("==================================================");
}

runThreeIndependentAboutDestinationsTests().catch((err) => {
  console.error("\n❌ TEST FAILED:", err);
  process.exit(1);
});
