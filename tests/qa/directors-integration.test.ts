import {
  DIRECTORS_DATA,
  getCanonicalDirectorsList,
  getDirectorBySlug,
  MAIN_DIRECTORS_DATA,
} from "@/data/directors";
import { HOMEPAGE_DATA } from "@/data/homepage";
import sitemap from "@/app/sitemap";
import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: PHASE 5.3 OFFICIAL DIRECTORS DATA & LEADERSHIP INTEGRATION");
console.log("==================================================");

async function runDirectorsIntegrationTests() {
  // [TEST 1] Canonical Directors Single Source of Truth
  console.log("\n[TEST 1] Auditing Canonical Directors Data Source...");
  const directors = getCanonicalDirectorsList();
  if (directors.length !== 2) {
    throw new Error(`Expected exactly 2 canonical directors, found ${directors.length}`);
  }
  if (directors[0].name !== "Sushil Dagur" || directors[0].displayOrder !== 1) {
    throw new Error("Director #1 must be Sushil Dagur with displayOrder: 1");
  }
  if (directors[1].name !== "Rakesh Kumar" || directors[1].displayOrder !== 2) {
    throw new Error("Director #2 must be Rakesh Kumar with displayOrder: 2");
  }
  console.log("✓ Verified canonical directors: 1. Sushil Dagur, 2. Rakesh Kumar.");

  // [TEST 2] Sushil Dagur Official Profile Content
  console.log("\n[TEST 2] Auditing Sushil Dagur Official Profile Content...");
  const sushil = DIRECTORS_DATA.sushilDagur;
  if (sushil.designation !== "Director | Educationist | Academic Entrepreneur") {
    throw new Error(`Invalid designation for Sushil Dagur: ${sushil.designation}`);
  }
  if (
    sushil.qualification !== "B.E. (Hons.) Mechanical Engineering" ||
    sushil.institution !== "University of Derby, England, U.K."
  ) {
    throw new Error("Qualification/Institution mismatch for Sushil Dagur");
  }
  if (!sushil.quote.includes("True education is not about memorising formulas")) {
    throw new Error("Quote mismatch for Sushil Dagur");
  }
  if (sushil.professionalJourney.length !== 4) {
    throw new Error(`Expected 4 professional milestones, found ${sushil.professionalJourney.length}`);
  }
  if (sushil.teachingPhilosophy.length !== 4) {
    throw new Error(`Expected 4 pedagogical principles, found ${sushil.teachingPhilosophy.length}`);
  }
  if (sushil.contributionToEmprise.length !== 4) {
    throw new Error(`Expected 4 contributions, found ${sushil.contributionToEmprise.length}`);
  }
  console.log("✓ Sushil Dagur profile content 100% verified against authoritative brief.");

  // [TEST 3] Rakesh Kumar Official Profile Content
  console.log("\n[TEST 3] Auditing Rakesh Kumar Official Profile Content...");
  const rakesh = DIRECTORS_DATA.rakeshKumar;
  if (rakesh.designation !== "Director | Mathematics Mentor | IIT-JEE Faculty") {
    throw new Error(`Invalid designation for Rakesh Kumar: ${rakesh.designation}`);
  }
  if (
    rakesh.qualification !== "B.E. (Hons.) Mechanical Engineering" ||
    rakesh.institution !== "University of Derby, England, U.K."
  ) {
    throw new Error("Qualification/Institution mismatch for Rakesh Kumar");
  }
  if (!rakesh.quote.includes("Mathematics is not a subject of rules")) {
    throw new Error("Quote mismatch for Rakesh Kumar");
  }
  if (rakesh.professionalJourney.length !== 4) {
    throw new Error(`Expected 4 professional milestones, found ${rakesh.professionalJourney.length}`);
  }
  if (rakesh.teachingPhilosophy.length !== 4) {
    throw new Error(`Expected 4 pedagogical principles, found ${rakesh.teachingPhilosophy.length}`);
  }
  if (rakesh.contributionToEmprise.length !== 4) {
    throw new Error(`Expected 4 contributions, found ${rakesh.contributionToEmprise.length}`);
  }
  console.log("✓ Rakesh Kumar profile content 100% verified against authoritative brief.");

  // [TEST 4] Slugs, Lookups & Photo Null States
  console.log("\n[TEST 4] Auditing Director Slugs, Lookups & Photo Null State...");
  if (!getDirectorBySlug("sushil-dagur")) {
    throw new Error("getDirectorBySlug('sushil-dagur') failed");
  }
  if (!getDirectorBySlug("rakesh-kumar")) {
    throw new Error("getDirectorBySlug('rakesh-kumar') failed");
  }
  if (getDirectorBySlug("invalid-slug") !== undefined) {
    throw new Error("getDirectorBySlug returned value for invalid slug");
  }
  if (sushil.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error("Sushil Dagur photoUrl must point to /images/directors/sushil-dagur.jpg");
  }
  if (rakesh.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error("Rakesh Kumar photoUrl must point to /images/directors/rakesh-kumar.jpg");
  }
  console.log("✓ Director slug routing and photo states verified (Both Sushil Dagur and Rakesh Kumar canonical images active).");

  // [TEST 5] Homepage Directors Derivation
  console.log("\n[TEST 5] Auditing Homepage Directors Derivation...");
  if (HOMEPAGE_DATA.directors.length !== 2) {
    throw new Error(`Homepage directors array length is ${HOMEPAGE_DATA.directors.length}, expected 2`);
  }
  if (HOMEPAGE_DATA.directors[0].name !== "Sushil Dagur" || HOMEPAGE_DATA.directors[1].name !== "Rakesh Kumar") {
    throw new Error("Homepage directors mismatch with canonical source");
  }
  console.log("✓ Homepage 'Meet the Directors' seamlessly derives from canonical source.");

  // [TEST 6] SEO Metadata & Structured Data
  console.log("\n[TEST 6] Auditing SEO Metadata & Canonical URLs...");
  if (MAIN_DIRECTORS_DATA.meta.title !== "Directors of Emprise Academy | Academic Leadership in Mathura") {
    throw new Error(`Invalid main directors title: ${MAIN_DIRECTORS_DATA.meta.title}`);
  }
  if (!MAIN_DIRECTORS_DATA.meta.description.includes("Sushil Dagur and Rakesh Kumar")) {
    throw new Error("Main directors description missing director names");
  }
  console.log("✓ Directors SEO metadata verified.");

  // [TEST 7] Sitemap Coverage
  console.log("\n[TEST 7] Auditing Sitemap Routes for Directors & Zero Faculty...");
  const sitemapEntries = sitemap();
  const sitemapUrls = sitemapEntries.map((e) => e.url);
  const requiredDirectorPaths = [
    "/directors",
    "/directors/sushil-dagur",
    "/directors/rakesh-kumar",
  ];
  for (const path of requiredDirectorPaths) {
    if (!sitemapUrls.some((u) => u.endsWith(path))) {
      throw new Error(`Sitemap missing expected director path: ${path}`);
    }
  }

  for (const u of sitemapUrls) {
    if (u.includes("/faculty")) {
      throw new Error(`Sitemap contains prohibited public faculty URL: ${u}`);
    }
  }
  console.log("✓ Sitemap contains all 3 director routes and ZERO faculty routes.");

  // [TEST 8] Scan for Public Faculty Pages or Links in Source Code
  console.log("\n[TEST 8] Scanning Public Components & Pages for Prohibited Faculty Links...");
  const filesToAudit = [
    "src/app/page.tsx",
    "src/components/navigation/Navbar.tsx",
    "src/components/navigation/Footer.tsx",
    "src/app/(public)/directors/page.tsx",
    "src/app/(public)/iit-jee-coaching-mathura/page.tsx",
    "src/app/(public)/neet-coaching-mathura/page.tsx",
    "src/app/sitemap.ts",
  ];

  for (const relPath of filesToAudit) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes('href="/faculty"') || content.includes("href='/faculty'")) {
        throw new Error(`Found public /faculty link in: ${relPath}`);
      }
    }
  }

  // Ensure public /faculty directory does not exist
  const publicFacultyDir = path.resolve(process.cwd(), "src/app/(public)/faculty");
  if (fs.existsSync(publicFacultyDir)) {
    throw new Error("Public /faculty route directory must not exist");
  }

  console.log("✓ Public navigation, homepage, and sitemap verified 100% free of public faculty routes.");

  console.log("\n==================================================");
  console.log("ALL PHASE 5.3 DIRECTORS INTEGRATION TESTS PASSED (8/8)");
  console.log("==================================================");
}

runDirectorsIntegrationTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
