import fs from "fs";
import path from "path";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

async function runOfficialLogoTests() {
  console.log("==================================================");
  console.log("TEST SUITE: OFFICIAL EMPRISE ACADEMY LOGO INTEGRATION");
  console.log("==================================================");

  // [TEST 1] Canonical Logo Asset Existence & Integrity
  console.log("\n[TEST 1] Auditing Canonical Logo Production Assets...");
  const pngPath = path.resolve(process.cwd(), "public/images/emprise-academy-logo.png");
  const fallbackPngPath = path.resolve(process.cwd(), "public/logo.png");

  if (!fs.existsSync(pngPath)) {
    throw new Error(`Canonical logo asset missing at ${pngPath}`);
  }
  if (!fs.existsSync(fallbackPngPath)) {
    throw new Error(`Root fallback logo missing at ${fallbackPngPath}`);
  }

  const pngStats = fs.statSync(pngPath);
  if (pngStats.size < 1000) {
    throw new Error(`Canonical logo PNG file too small (${pngStats.size} bytes)`);
  }
  console.log(`✓ Canonical logo assets verified: /images/emprise-academy-logo.png (${pngStats.size} bytes).`);

  // [TEST 2] Canonical Shared Logo Component
  console.log("\n[TEST 2] Auditing Canonical Shared Logo Component...");
  const logoCompPath = path.resolve(process.cwd(), "src/components/brand/EmpriseLogo.tsx");
  const uiLogoCompPath = path.resolve(process.cwd(), "src/components/ui/brand/EmpriseLogo.tsx");

  if (!fs.existsSync(logoCompPath) || !fs.existsSync(uiLogoCompPath)) {
    throw new Error("EmpriseLogo shared components missing");
  }

  const logoCompContent = fs.readFileSync(logoCompPath, "utf-8");
  if (!logoCompContent.includes("/images/emprise-academy-logo.png")) {
    throw new Error("EmpriseLogo must reference canonical /images/emprise-academy-logo.png");
  }
  if (!logoCompContent.includes("aspectRatio") || !logoCompContent.includes("1024 / 352")) {
    throw new Error("EmpriseLogo must preserve official aspect ratio (1024/352)");
  }
  if (!logoCompContent.includes("variant === \"on-dark\"")) {
    throw new Error("EmpriseLogo must support on-dark variant with clean light container");
  }
  console.log("✓ Shared EmpriseLogo component verified with aspect-ratio preservation and on-dark safety.");

  // [TEST 3] Public Navigation & Footer Logo Integration
  console.log("\n[TEST 3] Auditing Public Navbar and Footer Logo Integration...");
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");
  if (!navbarContent.includes("<EmpriseLogo")) {
    throw new Error("Navbar.tsx must render EmpriseLogo component");
  }

  const footerPath = path.resolve(process.cwd(), "src/components/navigation/Footer.tsx");
  const footerContent = fs.readFileSync(footerPath, "utf-8");
  if (!footerContent.includes("<EmpriseLogo variant=\"on-dark\"")) {
    throw new Error("Footer.tsx must render EmpriseLogo with variant='on-dark'");
  }
  console.log("✓ Public Navbar and Footer verified with canonical EmpriseLogo.");

  // [TEST 4] Admin Dashboard & Student Portal Logo Integration
  console.log("\n[TEST 4] Auditing Admin Dashboard and Student Portal Logo Integration...");
  const adminLayoutPath = path.resolve(process.cwd(), "src/components/admin/AdminLayout.tsx");
  const adminLayoutContent = fs.readFileSync(adminLayoutPath, "utf-8");
  if (!adminLayoutContent.includes("<EmpriseLogo variant=\"on-dark\"")) {
    throw new Error("AdminLayout.tsx must render EmpriseLogo on-dark");
  }

  const studentLayoutPath = path.resolve(process.cwd(), "src/components/student/StudentLayout.tsx");
  const studentLayoutContent = fs.readFileSync(studentLayoutPath, "utf-8");
  if (!studentLayoutContent.includes("<EmpriseLogo")) {
    throw new Error("StudentLayout.tsx must render EmpriseLogo");
  }
  console.log("✓ Admin Desk and Student Portal verified with canonical EmpriseLogo.");

  // [TEST 5] Authentication Pages (Admin & Student)
  console.log("\n[TEST 5] Auditing Authentication Pages (Admin & Student)...");
  const authFiles = [
    "src/app/(admin)/admin/login/page.tsx",
    "src/app/(student)/student/login/page.tsx",
    "src/app/(student)/student/register/page.tsx",
    "src/app/(student)/student/forgot-password/page.tsx",
    "src/app/(student)/student/reset-password/page.tsx",
  ];

  for (const relPath of authFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    const content = fs.readFileSync(fullPath, "utf-8");
    if (!content.includes("<EmpriseLogo")) {
      throw new Error(`${relPath} must render EmpriseLogo`);
    }
  }
  console.log("✓ All 5 authentication pages verified with canonical EmpriseLogo.");

  // [TEST 6] PDF & Printable Documents
  console.log("\n[TEST 6] Auditing PDF & Printable Document Headers...");
  const adminAdmitCardPath = path.resolve(process.cwd(), "src/app/(admin)/admin/admit-cards/[id]/page.tsx");
  const adminAdmitCardContent = fs.readFileSync(adminAdmitCardPath, "utf-8");
  if (!adminAdmitCardContent.includes("<EmpriseLogo")) {
    throw new Error("Printable Admit Card canvas must include EmpriseLogo");
  }

  const studentAdmitCardPath = path.resolve(process.cwd(), "src/app/(student)/student/admit-cards/page.tsx");
  const studentAdmitCardContent = fs.readFileSync(studentAdmitCardPath, "utf-8");
  if (!studentAdmitCardContent.includes("<EmpriseLogo")) {
    throw new Error("Student Admit Card pass must include EmpriseLogo");
  }
  console.log("✓ Printable Admit Cards and Student Passes verified with official logo.");

  // [TEST 7] Structured Data Schema (JSON-LD)
  console.log("\n[TEST 7] Auditing Structured Data & JSON-LD Logo References...");
  const siteJsonLdPath = path.resolve(process.cwd(), "src/components/seo/SiteJsonLd.tsx");
  const siteJsonLdContent = fs.readFileSync(siteJsonLdPath, "utf-8");
  if (!siteJsonLdContent.includes("images/emprise-academy-logo.png")) {
    throw new Error("SiteJsonLd must reference canonical images/emprise-academy-logo.png");
  }

  const homepageJsonLdPath = path.resolve(process.cwd(), "src/components/home/HomepageJsonLd.tsx");
  const homepageJsonLdContent = fs.readFileSync(homepageJsonLdPath, "utf-8");
  if (!homepageJsonLdContent.includes("images/emprise-academy-logo.png")) {
    throw new Error("HomepageJsonLd must reference canonical images/emprise-academy-logo.png");
  }

  const contactJsonLdPath = path.resolve(process.cwd(), "src/components/contact/ContactJsonLd.tsx");
  const contactJsonLdContent = fs.readFileSync(contactJsonLdPath, "utf-8");
  if (!contactJsonLdContent.includes("images/emprise-academy-logo.png")) {
    throw new Error("ContactJsonLd must reference canonical images/emprise-academy-logo.png");
  }
  console.log("✓ All JSON-LD structured schemas point to canonical official logo.");

  // [TEST 8] Canonical Business Config & App Icons
  console.log("\n[TEST 8] Auditing Business Config & App Icons...");
  if (CANONICAL_BUSINESS_CONFIG.logo_url !== "/images/emprise-academy-logo.png") {
    throw new Error("CANONICAL_BUSINESS_CONFIG.logo_url must match canonical logo path");
  }

  const layoutPath = path.resolve(process.cwd(), "src/app/layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");
  if (!layoutContent.includes("/images/emprise-academy-logo.png")) {
    throw new Error("layout.tsx must configure app icons with canonical logo");
  }
  console.log("✓ Canonical business config and layout app icons verified.");

  console.log("\n==================================================");
  console.log("ALL OFFICIAL LOGO INTEGRATION TESTS PASSED (8/8)");
  console.log("==================================================");
}

runOfficialLogoTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
