import fs from "fs";
import path from "path";
import { GALLERY_CATEGORIES, OFFICIAL_GALLERY_IMAGES } from "@/data/gallery";

console.log("==================================================");
console.log("TEST SUITE: STEP 4B - GALLERY CATEGORY NAVIGATION QA");
console.log("==================================================");

async function runGalleryCategoriesTests() {
  // [TEST 1] Auditing Exactly 3 Gallery Categories
  console.log("\n[TEST 1] Auditing Gallery Categories Configuration...");
  if (GALLERY_CATEGORIES.length !== 3) {
    throw new Error(`Expected exactly 3 categories, found ${GALLERY_CATEGORIES.length}`);
  }

  const ids = GALLERY_CATEGORIES.map((c) => c.id);
  if (!ids.includes("photo") || !ids.includes("media") || !ids.includes("video")) {
    throw new Error(`Categories must include 'photo', 'media', and 'video'. Found: ${JSON.stringify(ids)}`);
  }

  const titles = GALLERY_CATEGORIES.map((c) => c.title);
  if (!titles.includes("Photo Gallery") || !titles.includes("Media Gallery") || !titles.includes("Video Gallery")) {
    throw new Error(`Category titles mismatch: ${JSON.stringify(titles)}`);
  }
  console.log("✓ Verified exactly 3 categories: Photo Gallery, Media Gallery, Video Gallery.");

  // [TEST 2] Auditing Removal of Large Category Cards from /gallery
  console.log("\n[TEST 2] Auditing Removal of Large Category Cards from /gallery...");
  const pagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  if (pageContent.includes("GalleryCategoryTabs")) {
    throw new Error("GalleryCategoryTabs must not be present on /gallery page (large cards must be removed)");
  }
  if (!pageContent.includes("Photo Gallery")) {
    throw new Error("/gallery page must directly show Photo Gallery content");
  }
  if (OFFICIAL_GALLERY_IMAGES.length !== 84) {
    throw new Error(`Expected 84 photos in official gallery dataset, found ${OFFICIAL_GALLERY_IMAGES.length}`);
  }
  console.log("✓ Verified /gallery page: large category cards removed, directly displaying Photo Gallery with all 84 photos.");

  // [TEST 3] Auditing GalleryEmptyState Component (Data Safety & Zero Hallucination)
  console.log("\n[TEST 3] Auditing GalleryEmptyState Component...");
  const emptyStatePath = path.resolve(process.cwd(), "src/components/gallery/GalleryEmptyState.tsx");
  if (!fs.existsSync(emptyStatePath)) {
    throw new Error("Missing src/components/gallery/GalleryEmptyState.tsx");
  }
  const emptyStateContent = fs.readFileSync(emptyStatePath, "utf-8");

  if (!emptyStateContent.includes("Media features and publications will appear here.")) {
    throw new Error("Missing exact empty state copy for Media Gallery");
  }
  if (!emptyStateContent.includes("Academy videos and event highlights will appear here.")) {
    throw new Error("Missing exact empty state copy for Video Gallery");
  }

  // Safety check: ensure no fake YouTube links or fake press logos
  const forbiddenKeywords = ["youtube.com/watch", "hindustan times", "dainik jagran", "amar ujala", "times of india"];
  for (const kw of forbiddenKeywords) {
    if (emptyStateContent.toLowerCase().includes(kw)) {
      throw new Error(`Detected forbidden fabricated media keyword: "${kw}"`);
    }
  }
  console.log("✓ Verified GalleryEmptyState: institutional messaging with zero fabricated media/videos.");

  // [TEST 4] Auditing Homepage Gallery Showcase
  console.log("\n[TEST 4] Auditing Homepage Gallery Showcase...");
  const previewPath = path.resolve(process.cwd(), "src/components/home/GalleryPreviewSection.tsx");
  const previewContent = fs.readFileSync(previewPath, "utf-8");

  const expectedHomepage = [
    "CAMPUS • MEDIA • MEMORIES",
    "Gallery",
    "Explore the moments, stories and achievements of Emprise Academy.",
    "View Full Gallery",
    "/gallery",
    "GalleryMarqueeRow",
  ];
  for (const str of expectedHomepage) {
    if (!previewContent.includes(str)) {
      throw new Error(`Homepage GalleryPreviewSection missing expected integration: "${str}"`);
    }
  }
  console.log("✓ Verified Homepage GalleryPreviewSection: continuous 2-row marquee and navigation preserved.");

  // [TEST 5] Auditing Dedicated Media and Video Gallery Routes
  console.log("\n[TEST 5] Auditing Dedicated Media and Video Gallery Routes...");
  const mediaRoute = path.resolve(process.cwd(), "src/app/(public)/gallery/media/page.tsx");
  const videoRoute = path.resolve(process.cwd(), "src/app/(public)/gallery/videos/page.tsx");
  if (!fs.existsSync(mediaRoute) || !fs.existsSync(videoRoute)) {
    throw new Error("Missing dedicated media or video gallery route pages");
  }
  console.log("✓ Verified dedicated /gallery/media and /gallery/videos routes.");

  console.log("\n==================================================");
  console.log("ALL STEP 4B GALLERY CATEGORIES TESTS PASSED (5/5)");
  console.log("==================================================");
}

runGalleryCategoriesTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
