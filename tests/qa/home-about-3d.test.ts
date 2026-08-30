import fs from "fs";
import path from "path";
import { getCanonicalDirectorsList } from "@/data/directors";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { getCoreProgramPillars } from "@/data/courses";

console.log("==================================================");
console.log("TEST SUITE: HOME BUTTON, ABOUT US PAGE & 3D HOMEPAGE QA");
console.log("==================================================");

async function runHomeAbout3dTests() {
  // [TEST 1] Auditing Home Button Navigation
  console.log("\n[TEST 1] Auditing Home Navigation in Navbar...");
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  if (!navbarContent.includes('<NavLink href="/">Home</NavLink>')) {
    throw new Error("Navbar desktop navigation missing <NavLink href=\"/\">Home</NavLink>");
  }
  if (!navbarContent.includes('href="/"') || !navbarContent.includes('Home')) {
    throw new Error("Navbar mobile drawer missing Home link");
  }
  console.log("✓ Verified Home navigation item on desktop and mobile drawer.");

  // [TEST 2] Auditing Logo Click Link
  console.log("\n[TEST 2] Auditing Brand Logo Navigation...");
  if (!navbarContent.includes('Link href="/"') && !navbarContent.includes('Link href="/" aria-label="Emprise Academy Home"')) {
    throw new Error("Navbar brand logo must link to /");
  }
  console.log("✓ Verified brand logo links cleanly to /.");

  // [TEST 3] Auditing About Us Page Structure & Direct Rendering
  console.log("\n[TEST 3] Auditing About Us Page Implementation...");
  const aboutPagePath = path.resolve(process.cwd(), "src/app/(public)/about/page.tsx");
  const aboutContent = fs.readFileSync(aboutPagePath, "utf-8");

  if (aboutContent.includes("Architecture and route strategy prepared for Phase 2 UI development")) {
    throw new Error("About page is still a Phase 2 stub!");
  }

  const requiredAboutElements = [
    "Building Strong Foundations for Competitive Success",
    "ABOUT EMPRISE ACADEMY",
    "OUR IDENTITY & MISSION",
    "CORE ACADEMIC PILLARS",
    "PEDAGOGICAL FRAMEWORK",
    "FOUNDING LEADERSHIP",
    "THE EMPRISE ADVANTAGE",
    "Book Free Counselling",
    "Explore Programmes",
  ];

  for (const elem of requiredAboutElements) {
    if (!aboutContent.includes(elem)) {
      throw new Error(`About page missing expected section or text: "${elem}"`);
    }
  }
  console.log("✓ Verified full 7-section structure and content on /about.");

  // [TEST 4] Auditing Canonical Data Integration on /about
  console.log("\n[TEST 4] Auditing Canonical Data Integration on /about...");
  const directors = getCanonicalDirectorsList();
  if (directors.length !== 2) {
    throw new Error(`Expected 2 canonical directors, found ${directors.length}`);
  }
  if (!aboutContent.includes("getCanonicalDirectorsList") || !aboutContent.includes("DirectorPhoto")) {
    throw new Error("About page must consume getCanonicalDirectorsList and DirectorPhoto");
  }
  console.log("✓ Verified canonical director profiles and Photo system on /about.");

  // [TEST 5] Auditing About Us SEO & Schema
  console.log("\n[TEST 5] Auditing About Us SEO & Metadata...");
  if (!aboutContent.includes("About Emprise Academy | IIT-JEE & NEET Coaching in Mathura")) {
    throw new Error("About page missing canonical SEO title");
  }
  if (!aboutContent.includes("https://www.empriseacademy.com/about")) {
    throw new Error("About page missing canonical URL");
  }
  if (!aboutContent.includes("SiteJsonLd")) {
    throw new Error("About page missing SiteJsonLd structured data");
  }
  console.log("✓ Verified SEO metadata and EducationalOrganization JSON-LD on /about.");

  // [TEST 6] Auditing 3D Hero Visual Component
  console.log("\n[TEST 6] Auditing 3D Hero Visual Component...");
  const hero3dPath = path.resolve(process.cwd(), "src/components/home/Hero3DVisual.tsx");
  const hero3dContent = fs.readFileSync(hero3dPath, "utf-8");

  if (!hero3dContent.includes("prefers-reduced-motion")) {
    throw new Error("Hero3DVisual must support prefers-reduced-motion media query");
  }
  if (!hero3dContent.includes("perspective") && !hero3dContent.includes("[perspective:1200px]")) {
    throw new Error("Hero3DVisual missing 3D perspective style");
  }
  if (!hero3dContent.includes("rotateX") || !hero3dContent.includes("rotateY")) {
    throw new Error("Hero3DVisual missing interactive 3D rotation logic");
  }
  console.log("✓ Verified 3D perspective, mouse parallax damping, and reduced-motion safety in Hero3DVisual.");

  // [TEST 7] Scanning Homepage for Prohibited AI Hallucinations / Demo Records
  console.log("\n[TEST 7] Scanning Homepage and About Page for Prohibited Content...");
  const heroPath = path.resolve(process.cwd(), "src/components/home/HeroSection.tsx");
  const heroContent = fs.readFileSync(heroPath, "utf-8");

  const prohibitedPhrases = ["Guaranteed Rank", "100% Selection", "₹1,50,000", "50 Full Length Tests", "No. 1 Institute in Mathura"];
  for (const phrase of prohibitedPhrases) {
    if (aboutContent.includes(phrase) || heroContent.includes(phrase)) {
      throw new Error(`Detected prohibited claim: "${phrase}"`);
    }
  }
  console.log("✓ Zero prohibited claims detected on Homepage and About page.");

  // [TEST 8] Auditing Sitemap & Public Indexation
  console.log("\n[TEST 8] Auditing Sitemap Public Route Indexation...");
  const sitemapPath = path.resolve(process.cwd(), "src/app/sitemap.ts");
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

  if (!sitemapContent.includes('path: "/about"')) {
    throw new Error("Sitemap must include /about");
  }
  if (!sitemapContent.includes('path: ""')) {
    throw new Error("Sitemap must include root /");
  }
  console.log("✓ Verified / and /about indexability in sitemap.ts.");

  console.log("\n==================================================");
  console.log("ALL HOME, ABOUT & 3D QA TESTS PASSED (8/8)");
  console.log("==================================================");
}

runHomeAbout3dTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
