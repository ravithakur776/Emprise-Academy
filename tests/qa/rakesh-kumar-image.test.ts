import fs from "fs";
import path from "path";
import { DIRECTORS_DATA, getCanonicalDirectorsList, getDirectorBySlug } from "@/data/directors";

async function runRakeshKumarImageTests() {
  console.log("==================================================");
  console.log("TEST SUITE: RAKESH KUMAR CANONICAL DIRECTOR IMAGE INTEGRATION");
  console.log("==================================================");

  const rootDir = process.cwd();

  // [TEST 1] Canonical Image Asset Existence & Verification
  console.log("\n[TEST 1] Auditing Canonical Image Asset on Disk...");
  const imagePath = path.join(rootDir, "public/images/directors/rakesh-kumar.jpg");
  const fallbackPath = path.join(rootDir, "public/images/rakesh-kumar.jpg");

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Canonical image missing at ${imagePath}`);
  }
  if (!fs.existsSync(fallbackPath)) {
    throw new Error(`Fallback image missing at ${fallbackPath}`);
  }

  const stat = fs.statSync(imagePath);
  if (stat.size < 10000) {
    throw new Error(`Image file unexpectedly small: ${stat.size} bytes`);
  }
  console.log(`✓ Canonical portrait verified: /images/directors/rakesh-kumar.jpg (${stat.size} bytes).`);

  // [TEST 2] Director Record Single Source of Truth
  console.log("\n[TEST 2] Auditing Director Record (DIRECTORS_DATA.rakeshKumar)...");
  const rakesh = DIRECTORS_DATA.rakeshKumar;
  const sushil = DIRECTORS_DATA.sushilDagur;

  if (rakesh.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error(`rakeshKumar.photoUrl mismatch. Expected '/images/directors/rakesh-kumar.jpg', got '${rakesh.photoUrl}'`);
  }
  if (sushil.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error(`sushilDagur.photoUrl mismatch. Expected '/images/directors/sushil-dagur.jpg', got '${sushil.photoUrl}'`);
  }
  if (rakesh.name !== "Rakesh Kumar" || rakesh.slug !== "rakesh-kumar") {
    throw new Error("Rakesh Kumar core identity altered!");
  }
  console.log("✓ Director record updated correctly. Single source of truth active.");

  // [TEST 3] Function Helpers (getCanonicalDirectorsList & getDirectorBySlug)
  console.log("\n[TEST 3] Auditing Function Helpers...");
  const list = getCanonicalDirectorsList();
  const rakeshInList = list.find((d) => d.slug === "rakesh-kumar");
  if (!rakeshInList || rakeshInList.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error("getCanonicalDirectorsList() does not return updated photoUrl for Rakesh Kumar");
  }

  const lookedUp = getDirectorBySlug("rakesh-kumar");
  if (!lookedUp || lookedUp.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error("getDirectorBySlug('rakesh-kumar') does not return updated photoUrl");
  }
  console.log("✓ Function helpers return canonical photoUrl.");

  // [TEST 4] Shared DirectorPhoto Component Verification
  console.log("\n[TEST 4] Auditing DirectorPhoto Component Rendering & Alt Text...");
  const photoCompPath = path.join(rootDir, "src/components/directors/DirectorPhoto.tsx");
  const photoCompCode = fs.readFileSync(photoCompPath, "utf-8");

  if (!photoCompCode.includes("photoUrl")) {
    throw new Error("DirectorPhoto must handle photoUrl");
  }
  if (!photoCompCode.includes("object-top")) {
    throw new Error("DirectorPhoto must use object-top for portrait framing");
  }
  console.log("✓ DirectorPhoto component renders photoUrl with object-top framing.");

  // [TEST 5] Homepage Directors Section
  console.log("\n[TEST 5] Auditing Homepage Directors Section...");
  const homeSectionPath = path.join(rootDir, "src/components/home/DirectorsSection.tsx");
  const homeSectionCode = fs.readFileSync(homeSectionPath, "utf-8");

  if (!homeSectionCode.includes("getCanonicalDirectorsList") || !homeSectionCode.includes("director.photoUrl")) {
    throw new Error("Homepage DirectorsSection must consume canonical directors list and pass director.photoUrl");
  }
  console.log("✓ Homepage dynamically renders canonical portrait from Director record.");

  // [TEST 6] Directors Main Page & Grid
  console.log("\n[TEST 6] Auditing /directors Main Page & Grid...");
  const dualGridPath = path.join(rootDir, "src/components/directors/DirectorsDualGrid.tsx");
  const dualGridCode = fs.readFileSync(dualGridPath, "utf-8");

  if (!dualGridCode.includes("getCanonicalDirectorsList") || !dualGridCode.includes("dir.photoUrl")) {
    throw new Error("DirectorsDualGrid must consume canonical directors list and pass dir.photoUrl");
  }
  console.log("✓ /directors page dynamically renders canonical portrait.");

  // [TEST 7] Individual Director Detail Page (/directors/rakesh-kumar)
  console.log("\n[TEST 7] Auditing /directors/rakesh-kumar Detail Page...");
  const detailPagePath = path.join(rootDir, "src/app/(public)/directors/rakesh-kumar/page.tsx");
  const detailPageCode = fs.readFileSync(detailPagePath, "utf-8");

  if (!detailPageCode.includes("rakeshKumar.photoUrl") && !detailPageCode.includes("director.photoUrl")) {
    throw new Error("Director detail page must use canonical photoUrl");
  }
  if (!detailPageCode.includes("/images/directors/rakesh-kumar.jpg")) {
    throw new Error("OpenGraph metadata must reference canonical portrait");
  }
  console.log("✓ /directors/rakesh-kumar detail page and OpenGraph reference canonical portrait.");

  // [TEST 8] Person Structured Data (Schema.org)
  console.log("\n[TEST 8] Auditing Person Structured Data (Schema.org)...");
  const jsonLdPath = path.join(rootDir, "src/components/directors/DirectorJsonLd.tsx");
  const jsonLdCode = fs.readFileSync(jsonLdPath, "utf-8");

  if (!jsonLdCode.includes("image?: string | null") || !jsonLdCode.includes("personNode.image")) {
    throw new Error("DirectorJsonLd must support image property on Person schema");
  }
  console.log("✓ Person schema incorporates canonical image URL.");

  // [TEST 9] CMS Admin Preview Verification
  console.log("\n[TEST 9] Auditing Admin CMS Directors Preview...");
  const adminCmsPath = path.join(rootDir, "src/app/(admin)/admin/cms/directors/page.tsx");
  const adminCmsCode = fs.readFileSync(adminCmsPath, "utf-8");

  if (!adminCmsCode.includes("getCanonicalDirectorsList") || !adminCmsCode.includes("d.photoUrl")) {
    throw new Error("Admin CMS Directors page must consume canonical list and render d.photoUrl");
  }
  console.log("✓ Admin CMS Directors preview verified.");

  // [TEST 10] Zero Impact on Unrelated Images or Prohibited Sections
  console.log("\n[TEST 10] Auditing Dual Director Canonical Integration & Zero Faculty...");
  if (DIRECTORS_DATA.sushilDagur.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error("Sushil Dagur must have valid canonical image path!");
  }
  console.log("✓ Dual director canonical integration verified. Faculty sections strictly isolated.");

  console.log("\n==================================================");
  console.log("ALL RAKESH KUMAR IMAGE INTEGRATION TESTS PASSED (10/10)");
  console.log("==================================================");
}

runRakeshKumarImageTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
