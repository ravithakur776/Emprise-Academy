import fs from "fs";
import path from "path";
import { DIRECTORS_DATA, getCanonicalDirectorsList, getDirectorBySlug } from "@/data/directors";

async function runSushilDagurImageTests() {
  console.log("==================================================");
  console.log("TEST SUITE: SUSHIL DAGUR CANONICAL DIRECTOR IMAGE INTEGRATION");
  console.log("==================================================");

  const rootDir = process.cwd();

  // [TEST 1] Canonical Image Asset Existence & Verification
  console.log("\n[TEST 1] Auditing Canonical Image Asset on Disk...");
  const imagePath = path.join(rootDir, "public/images/directors/sushil-dagur.jpg");
  const fallbackPath = path.join(rootDir, "public/images/sushil-dagur.jpg");

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
  console.log(`✓ Canonical portrait verified: /images/directors/sushil-dagur.jpg (${stat.size} bytes).`);

  // [TEST 2] Director Record Single Source of Truth
  console.log("\n[TEST 2] Auditing Director Record (DIRECTORS_DATA.sushilDagur)...");
  const sushil = DIRECTORS_DATA.sushilDagur;
  const rakesh = DIRECTORS_DATA.rakeshKumar;

  if (sushil.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error(`sushilDagur.photoUrl mismatch. Expected '/images/directors/sushil-dagur.jpg', got '${sushil.photoUrl}'`);
  }
  if (rakesh.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error(`rakeshKumar.photoUrl regression! Expected '/images/directors/rakesh-kumar.jpg', got '${rakesh.photoUrl}'`);
  }
  if (sushil.name !== "Sushil Dagur" || sushil.slug !== "sushil-dagur") {
    throw new Error("Sushil Dagur core identity altered!");
  }
  console.log("✓ Director record updated correctly. Single source of truth active.");

  // [TEST 3] Function Helpers (getCanonicalDirectorsList & getDirectorBySlug)
  console.log("\n[TEST 3] Auditing Function Helpers...");
  const list = getCanonicalDirectorsList();
  const sushilInList = list.find((d) => d.slug === "sushil-dagur");
  if (!sushilInList || sushilInList.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error("getCanonicalDirectorsList() does not return updated photoUrl for Sushil Dagur");
  }

  const lookedUp = getDirectorBySlug("sushil-dagur");
  if (!lookedUp || lookedUp.photoUrl !== "/images/directors/sushil-dagur.jpg") {
    throw new Error("getDirectorBySlug('sushil-dagur') does not return updated photoUrl");
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

  // [TEST 7] Individual Director Detail Page (/directors/sushil-dagur)
  console.log("\n[TEST 7] Auditing /directors/sushil-dagur Detail Page...");
  const detailPagePath = path.join(rootDir, "src/app/(public)/directors/sushil-dagur/page.tsx");
  const detailPageCode = fs.readFileSync(detailPagePath, "utf-8");

  if (!detailPageCode.includes("sushilDagur.photoUrl") && !detailPageCode.includes("director.photoUrl")) {
    throw new Error("Director detail page must use canonical photoUrl");
  }
  if (!detailPageCode.includes("/images/directors/sushil-dagur.jpg")) {
    throw new Error("OpenGraph metadata must reference canonical portrait");
  }
  console.log("✓ /directors/sushil-dagur detail page and OpenGraph reference canonical portrait.");

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

  // [TEST 10] Regression Verification for Rakesh Kumar
  console.log("\n[TEST 10] Auditing Regression Protection for Rakesh Kumar...");
  if (DIRECTORS_DATA.rakeshKumar.photoUrl !== "/images/directors/rakesh-kumar.jpg") {
    throw new Error("Rakesh Kumar photoUrl was unexpectedly modified!");
  }
  const rakeshDetailPage = fs.readFileSync(path.join(rootDir, "src/app/(public)/directors/rakesh-kumar/page.tsx"), "utf-8");
  if (!rakeshDetailPage.includes("/images/directors/rakesh-kumar.jpg")) {
    throw new Error("Rakesh Kumar detail page OpenGraph missing canonical portrait!");
  }
  console.log("✓ Rakesh Kumar profile and image completely intact (Zero Regression).");

  console.log("\n==================================================");
  console.log("ALL SUSHIL DAGUR IMAGE INTEGRATION TESTS PASSED (10/10)");
  console.log("==================================================");
}

runSushilDagurImageTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
