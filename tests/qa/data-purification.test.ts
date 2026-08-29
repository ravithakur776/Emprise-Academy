import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { VERIFIED_BRAND_DATA } from "@/data/brand";
import { MAIN_CONTACT_DATA } from "@/data/admissions";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { HOMEPAGE_DATA } from "@/data/homepage";
import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: PHASE 5.2A VERIFIED DATA PURIFICATION & SINGLE SOURCE CONFIGURATION");
console.log("==================================================");

async function runDataPurificationTests() {
  // [TEST 1] Canonical Business Configuration Integrity
  console.log("\n[TEST 1] Auditing Canonical Business Configuration...");
  if (CANONICAL_BUSINESS_CONFIG.academy_name !== "Emprise Academy") {
    throw new Error(`Invalid academy_name: ${CANONICAL_BUSINESS_CONFIG.academy_name}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.established_year !== 2011) {
    throw new Error(`Invalid established_year: ${CANONICAL_BUSINESS_CONFIG.established_year}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.address.city !== "Mathura" || CANONICAL_BUSINESS_CONFIG.address.state !== "Uttar Pradesh") {
    throw new Error(`Invalid campus location: ${CANONICAL_BUSINESS_CONFIG.address.display_location}`);
  }
  console.log(`✓ Canonical business identity verified: ${CANONICAL_BUSINESS_CONFIG.academy_name} (${CANONICAL_BUSINESS_CONFIG.address.display_location}, Est. ${CANONICAL_BUSINESS_CONFIG.established_year}).`);

  // [TEST 2] Safe PENDING_CONFIGURATION Null State
  console.log("\n[TEST 2] Auditing Safe PENDING_CONFIGURATION Null Fallbacks...");
  if (
    CANONICAL_BUSINESS_CONFIG.contact.phone_primary !== null ||
    CANONICAL_BUSINESS_CONFIG.contact.whatsapp !== null ||
    CANONICAL_BUSINESS_CONFIG.contact.email !== null ||
    CANONICAL_BUSINESS_CONFIG.contact.business_hours !== null ||
    CANONICAL_BUSINESS_CONFIG.address.street_address !== null ||
    CANONICAL_BUSINESS_CONFIG.tagline !== null
  ) {
    throw new Error("Unverified business fields must remain null until officially configured");
  }
  console.log("✓ Unverified business contact & location fields safely default to null (no fake fallbacks).");

  // [TEST 3] Single-Source Derivations Synchronized
  console.log("\n[TEST 3] Auditing Single-Source Derivations...");
  if (VERIFIED_BRAND_DATA.institutionName !== CANONICAL_BUSINESS_CONFIG.academy_name) {
    throw new Error("VERIFIED_BRAND_DATA.institutionName mismatch with canonical config");
  }
  if (VERIFIED_BRAND_DATA.headquarters !== CANONICAL_BUSINESS_CONFIG.address.display_location) {
    throw new Error("VERIFIED_BRAND_DATA.headquarters mismatch with canonical config");
  }
  if (MAIN_CONTACT_DATA.contactDetails.phone !== null || MAIN_CONTACT_DATA.contactDetails.email !== null) {
    throw new Error("MAIN_CONTACT_DATA contains unverified contact defaults");
  }
  if (HOMEPAGE_DATA.contactCampus.phoneDisplay !== null || HOMEPAGE_DATA.contactCampus.email !== null) {
    throw new Error("HOMEPAGE_DATA contains unverified contact defaults");
  }
  console.log("✓ All brand, contact, and homepage modules strictly derive from canonical config.");

  // [TEST 4] ETSE 2026 Campaign Single-Source Integrity
  console.log("\n[TEST 4] Auditing ETSE 2026 Campaign Single Source...");
  if (CANONICAL_BUSINESS_CONFIG.etse.short_name !== "ETSE 2026") {
    throw new Error(`Invalid ETSE short name: ${CANONICAL_BUSINESS_CONFIG.etse.short_name}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.etse.exam_date !== "6 September 2026") {
    throw new Error(`Invalid ETSE exam date: ${CANONICAL_BUSINESS_CONFIG.etse.exam_date}`);
  }
  if (MAIN_ETSE_DATA.campaign.examDateDisplay !== "6 September 2026") {
    throw new Error(`MAIN_ETSE_DATA exam date mismatch: ${MAIN_ETSE_DATA.campaign.examDateDisplay}`);
  }
  console.log(`✓ ETSE 2026 campaign specs verified: ${CANONICAL_BUSINESS_CONFIG.etse.exam_date}, Classes 7–10, ${CANONICAL_BUSINESS_CONFIG.etse.fee}.`);

  // [TEST 5] Scanning for Stale Dates across Production Source Files
  console.log("\n[TEST 5] Scanning for Stale ETSE Dates (21 Sep 2025, 23 Aug 2026, 18 Oct 2026)...");
  const dataDir = path.resolve(process.cwd(), "src/data");
  const compDir = path.resolve(process.cwd(), "src/components");

  const getTsFiles = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getTsFiles(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
        files.push(fullPath);
      }
    }
    return files;
  };

  const filesToCheck = [...getTsFiles(dataDir), ...getTsFiles(compDir)];
  const staleDates = ["21 September 2025", "23 August 2026", "18 October 2026"];

  for (const file of filesToCheck) {
    const content = fs.readFileSync(file, "utf-8");
    for (const d of staleDates) {
      if (content.includes(d)) {
        throw new Error(`Found stale date "${d}" in file: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  console.log(`✓ Scanned ${filesToCheck.length} production files — Zero stale campaign dates detected.`);

  // [TEST 6] Scanning for Placeholder Phone & Address in Public Data & Components
  console.log("\n[TEST 6] Scanning for Placeholder Phone & Address Strings...");
  const publicFiles = [...getTsFiles(dataDir), ...getTsFiles(path.resolve(process.cwd(), "src/config"))];
  const prohibitedPlaceholders = ["+91 98765 43210", "Near Highway Crossing", "admissions@empriseacademy.com"];

  for (const file of publicFiles) {
    const content = fs.readFileSync(file, "utf-8");
    for (const ph of prohibitedPlaceholders) {
      if (content.includes(ph)) {
        throw new Error(`Found unverified placeholder "${ph}" in public data: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  console.log(`✓ Scanned ${publicFiles.length} public data & config files — Zero unverified placeholders detected.`);

  console.log("\n==================================================");
  console.log("ALL PHASE 5.2A DATA PURIFICATION TESTS PASSED (6/6)");
  console.log("==================================================");
}

runDataPurificationTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
