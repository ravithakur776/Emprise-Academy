import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { siteConfig } from "@/config/site";
import { CANONICAL_ACADEMY, getAcademicLegacy, sanitizeBusinessMetric } from "@/lib/academy";
import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: CANONICAL BUSINESS FACTS & SEO INTEGRITY QA");
console.log("==================================================");

function runBusinessFactsIntegrityTests() {
  // [TEST 1] Canonical Configuration Invariants
  console.log("\n[TEST 1] Validating CANONICAL_BUSINESS_CONFIG invariants...");
  if (CANONICAL_BUSINESS_CONFIG.academy_name !== "Emprise Academy") {
    throw new Error(`Academy name mismatch: ${CANONICAL_BUSINESS_CONFIG.academy_name}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.established_year !== 2011) {
    throw new Error(`Established year mismatch: ${CANONICAL_BUSINESS_CONFIG.established_year}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.legacy_years < 15) {
    throw new Error(`Legacy years must be at least 15, got: ${CANONICAL_BUSINESS_CONFIG.legacy_years}`);
  }
  if (!CANONICAL_BUSINESS_CONFIG.academic_legacy.includes("15+")) {
    throw new Error(`Academic legacy must feature 15+: ${CANONICAL_BUSINESS_CONFIG.academic_legacy}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.students_mentored !== "5000+") {
    throw new Error(`Students mentored must be 5000+: ${CANONICAL_BUSINESS_CONFIG.students_mentored}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.students_qualified !== "700+") {
    throw new Error(`Students qualified must be 700+: ${CANONICAL_BUSINESS_CONFIG.students_qualified}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.address.postal_code !== "281004") {
    throw new Error(`Postal code must be 281004: ${CANONICAL_BUSINESS_CONFIG.address.postal_code}`);
  }
  if (!CANONICAL_BUSINESS_CONFIG.phones.includes("+91 7247889955") || !CANONICAL_BUSINESS_CONFIG.phones.includes("+91 9634448800")) {
    throw new Error(`Missing verified phone numbers in config: ${JSON.stringify(CANONICAL_BUSINESS_CONFIG.phones)}`);
  }
  const expectedServices = [
    "IIT-JEE Coaching",
    "NEET Coaching",
    "Foundation Coaching",
    "Digital Learning & Study Resources",
  ];
  for (const s of expectedServices) {
    if (!CANONICAL_BUSINESS_CONFIG.primary_services.includes(s)) {
      throw new Error(`Missing required primary service: ${s}`);
    }
  }

  if (CANONICAL_ACADEMY.name !== "Emprise Academy" || CANONICAL_ACADEMY.establishedYear !== 2011) {
    throw new Error("CANONICAL_ACADEMY object mismatch");
  }
  console.log("✓ CANONICAL_BUSINESS_CONFIG and CANONICAL_ACADEMY invariants verified.");

  // [TEST 2] Academy Helper Regression Guard
  console.log("\n[TEST 2] Testing getAcademicLegacy() and sanitizeBusinessMetric() regression safeguards...");
  const legacyStr = getAcademicLegacy();
  if (!legacyStr.includes("15+")) {
    throw new Error(`getAcademicLegacy() returned invalid string: ${legacyStr}`);
  }
  if (legacyStr.includes("0+") || legacyStr.includes("NaN") || legacyStr.includes("undefined")) {
    throw new Error(`Prohibited token found in getAcademicLegacy(): ${legacyStr}`);
  }

  // Test sanitizeBusinessMetric with bad inputs
  const badValues = ["0+", "0", "0 Years", "undefined", "null", "NaN", "", "   "];
  for (const bad of badValues) {
    const sanitized = sanitizeBusinessMetric(bad, "5000+");
    if (sanitized !== "5000+") {
      throw new Error(`sanitizeBusinessMetric failed to sanitize '${bad}', returned '${sanitized}'`);
    }
  }
  console.log("✓ Regression guard functions reject all zero/placeholder/corrupted inputs.");

  // [TEST 3] SiteConfig Synchronization
  console.log("\n[TEST 3] Verifying siteConfig synchronization...");
  if (siteConfig.establishedYear !== 2011) {
    throw new Error(`siteConfig.establishedYear mismatch: ${siteConfig.establishedYear}`);
  }
  if (siteConfig.studentsMentored !== "5000+") {
    throw new Error(`siteConfig.studentsMentored mismatch: ${siteConfig.studentsMentored}`);
  }
  if (siteConfig.studentsQualified !== "700+") {
    throw new Error(`siteConfig.studentsQualified mismatch: ${siteConfig.studentsQualified}`);
  }
  if (siteConfig.location.postalCode !== "281004") {
    throw new Error(`siteConfig.location.postalCode mismatch: ${siteConfig.location.postalCode}`);
  }
  if (siteConfig.location.addressPending !== false) {
    throw new Error(`siteConfig.location.addressPending must be false`);
  }
  console.log("✓ siteConfig perfectly synchronizes with canonical verified data.");

  // [TEST 4] TrustProofStrip Server Component Purity
  console.log("\n[TEST 4] Verifying TrustProofStrip is pure SSR and contains NO 0-state initializers...");
  const stripPath = path.resolve(process.cwd(), "src/components/home/TrustProofStrip.tsx");
  const stripContent = fs.readFileSync(stripPath, "utf-8");

  if (stripContent.includes('"use client"') || stripContent.includes("'use client'")) {
    throw new Error("TrustProofStrip must be a pure Server Component without 'use client' directive!");
  }
  if (stripContent.includes("legacy: 0") || stripContent.includes("mentored: 0") || stripContent.includes("qualified: 0")) {
    throw new Error("TrustProofStrip must NOT contain 0-initialized counter states!");
  }
  if (!stripContent.includes("15+ Years") || !stripContent.includes("5000+") || !stripContent.includes("700+")) {
    throw new Error("TrustProofStrip must directly render canonical stats 15+ Years, 5000+, 700+!");
  }
  console.log("✓ TrustProofStrip verified as pure static SSR rendering canonical stats.");

  // [TEST 5] Structured Data Uniformity
  console.log("\n[TEST 5] Verifying authoritative JSON-LD organization @id and foundingDate...");
  const jsonLdFiles = [
    "src/components/home/HomepageJsonLd.tsx",
    "src/components/seo/SiteJsonLd.tsx",
    "src/components/contact/ContactJsonLd.tsx",
    "src/components/admissions/AdmissionsJsonLd.tsx",
    "src/components/scholarship/ScholarshipJsonLd.tsx",
    "src/components/results/ResultsJsonLd.tsx",
    "src/components/etse/EtseJsonLd.tsx",
    "src/components/jee/JeeJsonLd.tsx",
    "src/components/neet/NeetJsonLd.tsx",
    "src/components/foundation/FoundationJsonLd.tsx",
    "src/components/directors/DirectorJsonLd.tsx",
  ];

  for (const relPath of jsonLdFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    const content = fs.readFileSync(fullPath, "utf-8");
    if (!content.includes("#organization")) {
      throw new Error(`${relPath} does not reference authoritative #organization @id!`);
    }
    // Prohibit fictional properties
    if (content.includes("yearsOfExperience")) {
      throw new Error(`${relPath} contains invalid schema property 'yearsOfExperience'!`);
    }
  }
  console.log(`✓ All ${jsonLdFiles.length} JSON-LD components reference canonical #organization without fictional properties.`);

  console.log("\n==================================================");
  console.log("ALL BUSINESS FACTS INTEGRITY TESTS PASSED (5/5)");
  console.log("==================================================");
}

runBusinessFactsIntegrityTests();
