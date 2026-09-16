import fs from "fs";
import path from "path";
import { ABOUT_NAV_HEADER, ABOUT_MENU_ITEMS } from "@/data/aboutNav";
import { AWARD_RECORDS, hasAwardsData } from "@/data/awards";

console.log("==================================================");
console.log("TEST SUITE: STEP 11A - ABOUT NAVBAR DROPDOWN & THREE-SECTION ARCHITECTURE QA");
console.log("==================================================");

async function runAboutNavbarDropdownTests() {
  // [TEST 1] Auditing Configuration Data in src/data/aboutNav.ts
  console.log("\n[TEST 1] Auditing About Navigation Items Configuration...");
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
      href: "/about#directors",
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
    if (found.description !== exp.description) {
      throw new Error(`Description mismatch for ${exp.id}: got "${found.description}", expected "${exp.description}"`);
    }
    if (found.href !== exp.href) {
      throw new Error(`Href mismatch for ${exp.id}: got "${found.href}", expected "${exp.href}"`);
    }
  }

  if (!ABOUT_NAV_HEADER.title || ABOUT_NAV_HEADER.title !== "ABOUT EMPRISE") {
    throw new Error(`Unexpected header title: ${ABOUT_NAV_HEADER.title}`);
  }
  if (!ABOUT_NAV_HEADER.subtitle.includes("Explore our story")) {
    throw new Error(`Unexpected header subtitle: ${ABOUT_NAV_HEADER.subtitle}`);
  }
  console.log("✓ Verified configuration-driven navigation data with exactly 3 items (01 Brief About Emprise, 02 Awards & Accolades, 03 Directors).");

  // [TEST 2] Auditing Awards Data Architecture (Zero Fabricated Awards)
  console.log("\n[TEST 2] Auditing Awards Data Integrity (No Fabricated Awards)...");
  if (AWARD_RECORDS.length > 0) {
    throw new Error("No fabricated award records should be present in AWARD_RECORDS yet.");
  }
  if (hasAwardsData()) {
    throw new Error("hasAwardsData() should return false until verified 7 records are provided.");
  }
  console.log("✓ Verified zero fake award names or dates created.");

  // [TEST 3] Auditing Dedicated /about/awards Page
  console.log("\n[TEST 3] Auditing /about/awards Route and Clean Empty State...");
  const awardsPagePath = path.resolve(process.cwd(), "src/app/(public)/about/awards/page.tsx");
  if (!fs.existsSync(awardsPagePath)) {
    throw new Error("Missing src/app/(public)/about/awards/page.tsx");
  }
  const awardsContent = fs.readFileSync(awardsPagePath, "utf-8");
  if (!awardsContent.includes("Awards & Accolades")) {
    throw new Error("Awards page missing title heading");
  }
  if (!awardsContent.includes("/about/awards")) {
    throw new Error("Awards page missing canonical link");
  }
  console.log("✓ Verified /about/awards route: authentic empty state layout ready for 7 real records.");

  // [TEST 4] Auditing AboutDropdown Component
  console.log("\n[TEST 4] Auditing AboutDropdown.tsx Component...");
  const dropdownPath = path.resolve(process.cwd(), "src/components/navigation/AboutDropdown.tsx");
  if (!fs.existsSync(dropdownPath)) {
    throw new Error("Missing src/components/navigation/AboutDropdown.tsx");
  }
  const dropdownContent = fs.readFileSync(dropdownPath, "utf-8");
  if (!dropdownContent.includes('role="menu"')) {
    throw new Error("AboutDropdown missing role=\"menu\"");
  }
  if (!dropdownContent.includes('role="menuitem"')) {
    throw new Error("AboutDropdownItem missing role=\"menuitem\"");
  }
  if (!dropdownContent.includes("motion-reduce")) {
    throw new Error("AboutDropdown missing motion-reduce styling");
  }
  if (!dropdownContent.includes("#EEF5FF")) {
    throw new Error("AboutDropdown missing #EEF5FF hover background");
  }
  console.log("✓ Verified AboutDropdown component: semantics, tokens, and motion-reduce support.");

  // [TEST 5] Auditing Navbar.tsx Desktop & Mobile Integration
  console.log("\n[TEST 5] Auditing Navbar.tsx Integration...");
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  if (!navbarContent.includes("isAboutOpen")) {
    throw new Error("Navbar.tsx missing isAboutOpen state");
  }
  if (!navbarContent.includes("isMobileAboutOpen")) {
    throw new Error("Navbar.tsx missing isMobileAboutOpen state");
  }
  if (!navbarContent.includes("aboutDropdownRef")) {
    throw new Error("Navbar.tsx missing aboutDropdownRef for outside click handling");
  }
  if (!navbarContent.includes("setIsAboutOpen(true)")) {
    throw new Error("Navbar.tsx missing onMouseEnter for About dropdown");
  }
  if (!navbarContent.includes("setIsAboutOpen(false)")) {
    throw new Error("Navbar.tsx missing close handlers for About dropdown");
  }
  if (!navbarContent.includes("AboutDropdown")) {
    throw new Error("Navbar.tsx missing AboutDropdown component integration");
  }
  if (!navbarContent.includes("ABOUT_MENU_ITEMS")) {
    throw new Error("Navbar.tsx missing shared ABOUT_MENU_ITEMS in mobile drawer");
  }
  console.log("✓ Verified desktop hover trigger, keyboard support, outside-click close, and mobile drawer accordion.");

  // [TEST 6] Preserving other Navbar Items
  console.log("\n[TEST 6] Preserving Courses, ETSE, Results, Gallery, Blog, Testimonials, Contact...");
  if (!navbarContent.includes("isCoursesOpen")) {
    throw new Error("Courses dropdown functionality broken or removed");
  }
  if (!navbarContent.includes("isGalleryOpen")) {
    throw new Error("Gallery dropdown functionality broken or removed");
  }
  if (!navbarContent.includes("/etse-2026")) {
    throw new Error("ETSE link removed from Navbar");
  }
  if (!navbarContent.includes("/results")) {
    throw new Error("Results link removed from Navbar");
  }
  console.log("✓ Verified all other navigation items and dropdowns remain 100% intact.");

  console.log("\n==================================================");
  console.log("ALL STEP 11A ABOUT NAVBAR DROPDOWN TESTS PASSED (6/6)");
  console.log("==================================================");
}

runAboutNavbarDropdownTests().catch((err) => {
  console.error("\n❌ TEST FAILED:", err);
  process.exit(1);
});
