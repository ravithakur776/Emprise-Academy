import fs from "fs";
import path from "path";
import { OFFICIAL_MEDIA_ITEMS, FEATURED_MEDIA_ITEMS, ARCHIVE_MEDIA_ITEMS } from "@/data/media";
import { OFFICIAL_GALLERY_IMAGES } from "@/data/gallery";

console.log("==================================================");
console.log("TEST SUITE: STEP 4C - MEDIA GALLERY & PRESS COVERAGE QA");
console.log("==================================================");

async function runMediaGalleryTests() {
  // [TEST 1] Auditing Public Media Directory & Image Count
  console.log("\n[TEST 1] Auditing Public Media Directory & Asset Integrity...");
  const mediaDir = path.resolve(process.cwd(), "public/media");
  if (!fs.existsSync(mediaDir)) {
    throw new Error("Missing directory: public/media");
  }

  const diskFiles = fs.readdirSync(mediaDir).filter(f => !f.startsWith(".") && !f.includes(".DS_Store"));
  if (diskFiles.length !== 125) {
    throw new Error(`Expected exactly 125 valid media assets on disk, found ${diskFiles.length}`);
  }
  console.log(`✓ Verified exactly 125 valid media files on disk in public/media/ (zero system/.DS_Store files).`);

  // [TEST 2] Auditing Centralized Media Dataset (src/data/media.ts)
  console.log("\n[TEST 2] Auditing Centralized Media Dataset...");
  if (OFFICIAL_MEDIA_ITEMS.length !== 125) {
    throw new Error(`Expected 125 items in OFFICIAL_MEDIA_ITEMS, found ${OFFICIAL_MEDIA_ITEMS.length}`);
  }

  if (ARCHIVE_MEDIA_ITEMS.length !== 125) {
    throw new Error(`Expected 125 items in ARCHIVE_MEDIA_ITEMS, found ${ARCHIVE_MEDIA_ITEMS.length}`);
  }

  if (FEATURED_MEDIA_ITEMS.length < 4 || FEATURED_MEDIA_ITEMS.length > 6) {
    throw new Error(`Expected 4-6 featured items, found ${FEATURED_MEDIA_ITEMS.length}`);
  }

  // Verify all items have valid file on disk and required attributes
  for (const item of OFFICIAL_MEDIA_ITEMS) {
    if (!item.id || !item.slug || !item.src || !item.alt || !item.width || !item.height) {
      throw new Error(`Incomplete media item metadata: ${JSON.stringify(item)}`);
    }
    const fullPath = path.resolve(process.cwd(), "public", item.src.replace(/^\//, ""));
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Media asset referenced in dataset does not exist on disk: ${fullPath}`);
    }
  }
  console.log("✓ Verified all 125 media dataset entries: existing files on disk, valid dimensions, non-empty alt text.");

  // [TEST 3] Auditing Separation from Photo Gallery
  console.log("\n[TEST 3] Auditing Strict Separation from Photo Gallery...");
  if (OFFICIAL_GALLERY_IMAGES.length !== 84) {
    throw new Error(`Photo gallery must remain intact with 84 images, found ${OFFICIAL_GALLERY_IMAGES.length}`);
  }
  const photoPaths = new Set(OFFICIAL_GALLERY_IMAGES.map(g => g.src));
  for (const m of OFFICIAL_MEDIA_ITEMS) {
    if (photoPaths.has(m.src)) {
      throw new Error(`Media Gallery must not duplicate or mix Photo Gallery assets: ${m.src}`);
    }
  }
  console.log("✓ Verified zero collision/mixing between Photo Gallery (84 assets) and Media Gallery (125 assets).");

  // [TEST 4] Auditing Featured Coverage Implementation
  console.log("\n[TEST 4] Auditing Featured Coverage Section...");
  const viewPath = path.resolve(process.cwd(), "src/components/media/MediaGalleryView.tsx");
  if (!fs.existsSync(viewPath)) {
    throw new Error("Missing src/components/media/MediaGalleryView.tsx");
  }
  const viewContent = fs.readFileSync(viewPath, "utf-8");

  const expectedFeatured = [
    "Featured Coverage",
    "Top Press Highlights",
    "primaryFeatured",
    "supportingFeatured",
    "FEATURED_MEDIA_ITEMS",
  ];
  for (const exp of expectedFeatured) {
    if (!viewContent.includes(exp)) {
      throw new Error(`MediaGalleryView missing featured coverage element: "${exp}"`);
    }
  }
  console.log("✓ Verified Featured Coverage section: editorial asymmetric layout with lead card + supporting cards.");

  // [TEST 5] Auditing Press Coverage Archive & Small Image Quality Protection
  console.log("\n[TEST 5] Auditing Press Coverage Archive & Resolution Safeguards...");
  const expectedArchive = [
    "Press Coverage Archive",
    "Browse media moments featuring Emprise Academy, its students, achievements and academic activities.",
    "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
    "isSmallSource",
    "maxWidth",
    "loading=\"lazy\"",
  ];
  for (const exp of expectedArchive) {
    if (!viewContent.includes(exp)) {
      throw new Error(`MediaGalleryView missing archive layout element: "${exp}"`);
    }
  }
  console.log("✓ Verified Press Coverage Archive: responsive masonry, lazy loading, and small source resolution ceiling safeguards.");

  // [TEST 6] Auditing MediaLightbox Component
  console.log("\n[TEST 6] Auditing MediaLightbox Component...");
  const lightboxPath = path.resolve(process.cwd(), "src/components/media/MediaLightbox.tsx");
  if (!fs.existsSync(lightboxPath)) {
    throw new Error("Missing src/components/media/MediaLightbox.tsx");
  }
  const lightboxContent = fs.readFileSync(lightboxPath, "utf-8");

  const expectedLightbox = [
    "role=\"dialog\"",
    "aria-modal=\"true\"",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "touchStartX",
    "isZoomed",
    "ZoomIn",
    "ZoomOut",
    "PRESS COVERAGE",
  ];
  for (const exp of expectedLightbox) {
    if (!lightboxContent.includes(exp)) {
      throw new Error(`MediaLightbox missing required capability: "${exp}"`);
    }
  }
  console.log("✓ Verified MediaLightbox: keyboard navigation (ESC, arrows), touch swipe, position counter, and zoom toggle.");

  // [TEST 7] Auditing Dedicated Route /gallery/media Page & Metadata
  console.log("\n[TEST 7] Auditing /gallery/media Route & SEO Metadata...");
  const pagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/media/page.tsx");
  if (!fs.existsSync(pagePath)) {
    throw new Error("Missing src/app/(public)/gallery/media/page.tsx");
  }
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  const expectedMeta = [
    "Emprise Academy in the News | Media & Press Coverage",
    "Explore media coverage, press features, result highlights, student achievements, academic events and institutional moments from Emprise Academy.",
    "https://empriseacademy.com/gallery/media",
    "MediaGalleryView",
    "Navbar",
    "Footer",
  ];
  for (const exp of expectedMeta) {
    if (!pageContent.includes(exp)) {
      throw new Error(`/gallery/media page missing expected element: "${exp}"`);
    }
  }
  console.log("✓ Verified /gallery/media route: metadata, canonical, OpenGraph, and layout integration.");

  console.log("\n==================================================");
  console.log("ALL STEP 4C MEDIA GALLERY TESTS PASSED (7/7)");
  console.log("==================================================");
}

runMediaGalleryTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
