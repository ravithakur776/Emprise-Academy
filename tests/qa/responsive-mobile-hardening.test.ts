import fs from "fs";
import path from "path";

async function runResponsiveHardeningTests() {
  console.log("==================================================");
  console.log("TEST SUITE: COMPLETE MOBILE RESPONSIVE & ADAPTIVE UI HARDENING");
  console.log("==================================================");

  const rootDir = process.cwd();

  // [TEST 1] Global CSS Rules
  console.log("\n[TEST 1] Auditing Global CSS Responsive Foundations (box-sizing, text-size-adjust, media bounding, overflow-wrap)...");
  const cssPath = path.join(rootDir, "src/app/globals.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  if (!css.includes("box-sizing: border-box")) {
    throw new Error("globals.css must enforce box-sizing: border-box on all elements");
  }
  if (!css.includes("-webkit-text-size-adjust: 100%")) {
    throw new Error("globals.css must include text-size-adjust: 100%");
  }
  if (!css.includes("max-width: 100%")) {
    throw new Error("globals.css must restrict max-width: 100% on media");
  }
  if (!css.includes("overflow-wrap: break-word")) {
    throw new Error("globals.css must include overflow-wrap: break-word on headings");
  }
  if (!css.includes("prefers-reduced-motion: reduce")) {
    throw new Error("globals.css must respect prefers-reduced-motion");
  }
  console.log("✓ Global CSS responsive foundational rules verified.");

  // [TEST 2] Navbar Mobile Menu & Touch Target
  console.log("\n[TEST 2] Auditing Navbar Mobile Drawer & Touch Targets...");
  const navPath = path.join(rootDir, "src/components/navigation/Navbar.tsx");
  const navCode = fs.readFileSync(navPath, "utf-8");

  if (!navCode.includes("min-w-[44px]") || !navCode.includes("min-h-[44px]")) {
    throw new Error("Navbar mobile button must have minimum 44x44px touch target");
  }
  if (!navCode.includes("aria-expanded={isMobileOpen}")) {
    throw new Error("Navbar mobile button must have aria-expanded attribute");
  }
  if (!navCode.includes('aria-label="Open mobile navigation menu"')) {
    throw new Error("Navbar mobile button must have accessible aria-label");
  }
  console.log("✓ Navbar mobile drawer, touch targets, and ARIA attributes verified.");

  // [TEST 3] Student & Admin Layout Responsive Shells
  console.log("\n[TEST 3] Auditing Student & Admin Layouts Responsive Shells & Viewport Bounds...");
  const studentLayoutPath = path.join(rootDir, "src/components/student/StudentLayout.tsx");
  const studentLayoutCode = fs.readFileSync(studentLayoutPath, "utf-8");

  if (!studentLayoutCode.includes("w-11 h-11") || !studentLayoutCode.includes("aria-expanded={mobileMenuOpen}")) {
    throw new Error("StudentLayout mobile menu toggle must be 44px with aria-expanded");
  }
  if (!studentLayoutCode.includes("max-h-[calc(100vh-4rem)] overflow-y-auto")) {
    throw new Error("StudentLayout mobile menu must be bounded with overflow-y-auto");
  }
  if (!studentLayoutCode.includes("pb-[calc(4.5rem+env(safe-area-inset-bottom))]")) {
    throw new Error("StudentLayout main content must pad for safe-area fixed bottom nav");
  }

  const adminLayoutPath = path.join(rootDir, "src/components/admin/AdminLayout.tsx");
  const adminLayoutCode = fs.readFileSync(adminLayoutPath, "utf-8");

  if (!adminLayoutCode.includes("w-11 h-11") || !adminLayoutCode.includes("aria-expanded={mobileOpen}")) {
    throw new Error("AdminLayout mobile menu toggle must be 44px with aria-expanded");
  }
  if (!adminLayoutCode.includes("max-h-[calc(100vh-4rem)] overflow-y-auto")) {
    throw new Error("AdminLayout mobile menu must be bounded with overflow-y-auto");
  }
  console.log("✓ Student & Admin responsive layout shells, safe-area bounds, and drawers verified.");

  // [TEST 4] Safe-Area Bottom Fixed CTAs
  console.log("\n[TEST 4] Auditing Mobile Bottom Fixed CTA Safe Area Support...");
  const footerPath = path.join(rootDir, "src/components/navigation/Footer.tsx");
  const footerCode = fs.readFileSync(footerPath, "utf-8");

  if (!footerCode.includes("pb-[calc(0.625rem+env(safe-area-inset-bottom))]")) {
    throw new Error("MobileBottomCTA must support env(safe-area-inset-bottom)");
  }
  if (!footerCode.includes("min-h-[44px]")) {
    throw new Error("MobileBottomCTA actions must have minimum 44px touch targets");
  }
  console.log("✓ Mobile sticky bottom bar safe-area insets and 44px touch targets verified.");

  // [TEST 5] Modal and Drawer Viewport Height Bounding
  console.log("\n[TEST 5] Auditing Modal and Drawer Height Constraints...");
  const modalPath = path.join(rootDir, "src/components/ui/modal/Modal.tsx");
  const modalCode = fs.readFileSync(modalPath, "utf-8");
  if (!modalCode.includes("max-h-[90vh]") || !modalCode.includes("overflow-y-auto")) {
    throw new Error("Modal must bound height with max-h-[90vh] overflow-y-auto");
  }

  const drawerPath = path.join(rootDir, "src/components/ui/modal/Drawer.tsx");
  const drawerCode = fs.readFileSync(drawerPath, "utf-8");
  if (!drawerCode.includes("overflow-y-auto")) {
    throw new Error("Drawer must support overflow-y-auto scrolling");
  }
  console.log("✓ Modals and Drawers verified with viewport height bounding and smooth scroll.");

  // [TEST 6] FormField Message Wrapping
  console.log("\n[TEST 6] Auditing FormField Responsive Error & Helper Wrapping...");
  const fieldPath = path.join(rootDir, "src/components/ui/form/FormField.tsx");
  const fieldCode = fs.readFileSync(fieldPath, "utf-8");

  if (!fieldCode.includes("break-words")) {
    throw new Error("FormField error and helper text must include break-words");
  }
  console.log("✓ FormField message wrapping verified.");

  // [TEST 7] Authentication Card Responsive Padding
  console.log("\n[TEST 7] Auditing Auth Card Padding for 320px/360px Small Mobile Viewports...");
  const studentLoginPath = path.join(rootDir, "src/app/(student)/student/login/page.tsx");
  const studentLoginCode = fs.readFileSync(studentLoginPath, "utf-8");
  if (!studentLoginCode.includes("px-4 sm:px-10")) {
    throw new Error("Student login card must use px-4 sm:px-10 padding");
  }

  const studentRegisterPath = path.join(rootDir, "src/app/(student)/student/register/page.tsx");
  const studentRegisterCode = fs.readFileSync(studentRegisterPath, "utf-8");
  if (!studentRegisterCode.includes("px-4 sm:px-10")) {
    throw new Error("Student register card must use px-4 sm:px-10 padding");
  }

  const adminLoginPath = path.join(rootDir, "src/app/(admin)/admin/login/page.tsx");
  const adminLoginCode = fs.readFileSync(adminLoginPath, "utf-8");
  if (!adminLoginCode.includes("px-4 sm:px-10")) {
    throw new Error("Admin login card must use px-4 sm:px-10 padding");
  }
  console.log("✓ Auth screens verified for 320px mobile viewport padding safety.");

  // [TEST 8] Bounded Table Wrappers
  console.log("\n[TEST 8] Auditing Bounded Table Wrappers (overflow-x-auto)...");
  const tablePath = path.join(rootDir, "src/components/ui/table/Table.tsx");
  const tableCode = fs.readFileSync(tablePath, "utf-8");
  if (!tableCode.includes("overflow-x-auto")) {
    throw new Error("Table component must wrap <table> in overflow-x-auto");
  }

  const adminLeadsPath = path.join(rootDir, "src/app/(admin)/admin/leads/page.tsx");
  const adminLeadsCode = fs.readFileSync(adminLeadsPath, "utf-8");
  if (!adminLeadsCode.includes("overflow-x-auto")) {
    throw new Error("Admin leads table must be inside overflow-x-auto");
  }

  const importPreviewPath = path.join(rootDir, "src/app/(admin)/admin/results/import/preview/page.tsx");
  const importPreviewCode = fs.readFileSync(importPreviewPath, "utf-8");
  if (!importPreviewCode.includes("overflow-x-auto")) {
    throw new Error("Admin results import preview table must be inside overflow-x-auto");
  }
  console.log("✓ Data tables verified with bounded horizontal scrolling.");

  // [TEST 9] 3D Hero Mobile Graceful Degradation
  console.log("\n[TEST 9] Auditing 3D Hero Mobile Degradation & Reduced Motion...");
  const heroVisualPath = path.join(rootDir, "src/components/home/Hero3DVisual.tsx");
  const heroVisualCode = fs.readFileSync(heroVisualPath, "utf-8");

  if (!heroVisualCode.includes("prefers-reduced-motion")) {
    throw new Error("Hero3DVisual must support prefers-reduced-motion");
  }
  if (!heroVisualCode.includes("p-4 sm:p-6 lg:p-8")) {
    throw new Error("Hero3DVisual must use responsive card padding p-4 sm:p-6 lg:p-8");
  }
  console.log("✓ 3D Hero visual mobile degradation and motion preferences verified.");

  // [TEST 10] Typography Scales
  console.log("\n[TEST 10] Auditing Typography Heading Scales...");
  const headingPath = path.join(rootDir, "src/components/ui/typography/Heading.tsx");
  const headingCode = fs.readFileSync(headingPath, "utf-8");

  if (!headingCode.includes("text-3xl sm:text-5xl md:text-6xl")) {
    throw new Error("Heading display variant must scale from text-3xl on mobile");
  }
  if (!headingCode.includes("text-2xl sm:text-4xl md:text-5xl")) {
    throw new Error("Heading h1 variant must scale from text-2xl on mobile");
  }
  console.log("✓ Typography scales verified.");

  console.log("\n==================================================");
  console.log("ALL MOBILE RESPONSIVE HARDENING TESTS PASSED (10/10)");
  console.log("==================================================");
}

runResponsiveHardeningTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
