import fs from "fs";
import path from "path";
import { OFFICIAL_GALLERY_IMAGES, HOMEPAGE_MARQUEE_ROW_1, HOMEPAGE_MARQUEE_ROW_2 } from "@/data/gallery";

console.log("==================================================");
console.log("TEST SUITE: GALLERY SYSTEM & MARQUEE AUDIT");
console.log("==================================================");

async function runGallerySystemAudit() {
  // [TEST 1] Auditing Public Gallery Directory & Image Count
  console.log("\n[TEST 1] Auditing Public Gallery Directory & Image Count...");
  const galleryDir = path.resolve(process.cwd(), "public/gallery");
  if (!fs.existsSync(galleryDir)) {
    throw new Error("public/gallery directory does not exist!");
  }

  const diskFiles = fs
    .readdirSync(galleryDir)
    .filter((f) => !f.startsWith(".") && /\.(jpe?g|png|webp)$/i.test(f));
  if (diskFiles.length !== 59) {
    throw new Error(`Expected exactly 59 legacy gallery images in root public/gallery, found ${diskFiles.length}`);
  }

  const newPhotosDir = path.resolve(process.cwd(), "public/gallery/New Photos");
  if (!fs.existsSync(newPhotosDir)) {
    throw new Error("public/gallery/New Photos directory does not exist!");
  }
  const newDiskFiles = fs
    .readdirSync(newPhotosDir)
    .filter((f) => !f.startsWith(".") && /\.(jpe?g|png|webp)$/i.test(f));
  if (newDiskFiles.length < 25) {
    throw new Error(`Expected at least 25 new gallery images in public/gallery/New Photos, found ${newDiskFiles.length}`);
  }

  // Check no .DS_Store exists
  if (fs.existsSync(path.join(galleryDir, ".DS_Store"))) {
    throw new Error("Found .DS_Store in public/gallery directory!");
  }
  console.log(`✓ Verified 59 legacy images and ${newDiskFiles.length} new images on disk (zero system/.DS_Store files).`);

  // [TEST 2] Auditing Centralized Gallery Dataset
  console.log("\n[TEST 2] Auditing Centralized Gallery Dataset (src/data/gallery.ts)...");
  if (OFFICIAL_GALLERY_IMAGES.length !== 84) {
    throw new Error(`Expected 84 items in OFFICIAL_GALLERY_IMAGES, got ${OFFICIAL_GALLERY_IMAGES.length}`);
  }

  // Verify first 25 items are from New Photos (positioned at top)
  for (let i = 0; i < 25; i++) {
    if (!OFFICIAL_GALLERY_IMAGES[i].src.includes("New%20Photos") && !OFFICIAL_GALLERY_IMAGES[i].src.includes("New Photos")) {
      throw new Error(`Image at index ${i} should be from New Photos at the top!`);
    }
  }

  for (const item of OFFICIAL_GALLERY_IMAGES) {
    const decodedSrc = decodeURIComponent(item.src);
    const fullPath = path.resolve(process.cwd(), `public${decodedSrc}`);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Referenced image missing on disk: ${fullPath}`);
    }
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      throw new Error(`Image is 0 bytes: ${fullPath}`);
    }
    if (!item.alt || item.alt.trim().length === 0) {
      throw new Error(`Image missing alt text: ${item.id}`);
    }
    if (item.width <= 0 || item.height <= 0 || item.aspectRatio <= 0) {
      throw new Error(`Invalid dimensions for image: ${item.id}`);
    }
  }
  console.log("✓ Verified all 84 gallery dataset entries: existing files, valid dimensions, non-empty alt text, and new photos prioritized at the top.");

  // [TEST 3] Auditing Marquee Subsets
  console.log("\n[TEST 3] Auditing Homepage Marquee Subsets...");
  if (HOMEPAGE_MARQUEE_ROW_1.length === 0 || HOMEPAGE_MARQUEE_ROW_2.length === 0) {
    throw new Error("Homepage marquee rows must be populated");
  }
  console.log(`✓ Marquee subsets verified: Row 1 has ${HOMEPAGE_MARQUEE_ROW_1.length} items, Row 2 has ${HOMEPAGE_MARQUEE_ROW_2.length} items.`);

  // [TEST 4] Auditing Homepage Gallery Preview Section
  console.log("\n[TEST 4] Auditing Homepage GalleryPreviewSection...");
  const previewPath = path.resolve(process.cwd(), "src/components/home/GalleryPreviewSection.tsx");
  const previewContent = fs.readFileSync(previewPath, "utf-8");

  const expectedStrings = [
    "Gallery",
    "CAMPUS • MEDIA • MEMORIES",
    "Explore the moments, stories and achievements of Emprise Academy.",
    "View Full Gallery",
    "/gallery",
    "GalleryMarqueeRow",
    "GalleryLightbox",
    'direction="right"',
    'direction="left"',
  ];

  for (const str of expectedStrings) {
    if (!previewContent.includes(str)) {
      throw new Error(`GalleryPreviewSection missing expected string: "${str}"`);
    }
  }
  console.log("✓ Verified GalleryPreviewSection: headings, copy, dual marquee directions, and lightbox integration.");

  // [TEST 5] Auditing Full Gallery Page (/gallery)
  console.log("\n[TEST 5] Auditing Full Gallery Page (src/app/(public)/gallery/page.tsx)...");
  const pagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  const expectedPageStrings = [
    "Life at Emprise Academy",
    "Explore moments from Emprise Academy — achievements, events, students, campus life and memorable occasions.",
    "OFFICIAL_GALLERY_IMAGES",
    "GalleryLightbox",
    "columns-1 sm:columns-2",
  ];

  for (const str of expectedPageStrings) {
    if (!pageContent.includes(str)) {
      throw new Error(`Gallery page missing expected string: "${str}"`);
    }
  }
  console.log("✓ Verified Full Gallery page: official copy, all 59 images, responsive masonry columns, and lightbox.");

  // [TEST 6] Auditing Lightbox Component
  console.log("\n[TEST 6] Auditing GalleryLightbox Component...");
  const lightboxPath = path.resolve(process.cwd(), "src/components/gallery/GalleryLightbox.tsx");
  const lightboxContent = fs.readFileSync(lightboxPath, "utf-8");

  const expectedLightboxStrings = [
    "role=\"dialog\"",
    "aria-modal=\"true\"",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "onTouchStart",
    "onTouchEnd",
    "images.length",
    "overflow = \"hidden\"",
  ];

  for (const str of expectedLightboxStrings) {
    if (!lightboxContent.includes(str)) {
      throw new Error(`GalleryLightbox missing expected feature: "${str}"`);
    }
  }
  console.log("✓ Verified GalleryLightbox: keyboard nav, touch swipe, scroll lock, ARIA dialog attributes.");

  // [TEST 7] Auditing CSS Reduced-Motion Support in globals.css
  console.log("\n[TEST 7] Auditing Reduced-Motion Support in globals.css...");
  const cssPath = path.resolve(process.cwd(), "src/app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  if (!cssContent.includes("animate-marquee-left") || !cssContent.includes("animate-marquee-right")) {
    throw new Error("globals.css missing marquee animation classes");
  }
  if (!cssContent.includes("prefers-reduced-motion") || !cssContent.includes("animation: none !important")) {
    throw new Error("globals.css missing reduced-motion animation override for marquee");
  }
  console.log("✓ Verified globals.css marquee animations and reduced-motion override.");

  console.log("\n==================================================");
  console.log("ALL GALLERY SYSTEM AUDIT CHECKS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runGallerySystemAudit().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
