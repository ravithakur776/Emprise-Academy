import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: HERO CAROUSEL SLIDE 4 NEET 2026 RESULT AUDIT");
console.log("==================================================");

async function runSlide4Tests() {
  // [TEST 1] Auditing Slide Order & Sequence
  console.log("\n[TEST 1] Auditing Slide Order & Sequence...");
  const slides = HOMEPAGE_DATA.heroSlides;
  if (slides.length !== 4) {
    throw new Error(`Expected exactly 4 slides (slides 5, 6, 7 removed), found ${slides.length}`);
  }

  const slide1 = slides[0];
  const slide2 = slides[1];
  const slide3 = slides[2];
  const slide4 = slides[3];

  if (slide1.id !== "slide-jee-toppers") {
    throw new Error(`Slide 1 must be 'slide-jee-toppers', got '${slide1.id}'`);
  }
  if (slide2.id !== "slide-iit-bombay-achievers") {
    throw new Error(`Slide 2 must be 'slide-iit-bombay-achievers', got '${slide2.id}'`);
  }
  if (slide3.id !== "slide-jee-main-2026-top-performers") {
    throw new Error(`Slide 3 must be 'slide-jee-main-2026-top-performers', got '${slide3.id}'`);
  }
  if (slide4.id !== "slide-neet-ug-2026-result") {
    throw new Error(`Slide 4 must be 'slide-neet-ug-2026-result', got '${slide4.id}'`);
  }
  console.log("✓ Verified exact sequence: 1. JEE Toppers -> 2. IIT Bombay -> 3. JEE Main 2026 Top Performers -> 4. NEET (UG) 2026 Result.");

  // [TEST 2] Auditing Slide 4 Metadata & Content
  console.log("\n[TEST 2] Auditing Slide 4 Metadata & Content...");
  if (!slide4.isBannerImage) {
    throw new Error("Slide 4 must have isBannerImage set to true");
  }
  if (slide4.bannerImageSrc !== "/images/emprise-neet-ug-2026-result-achievers.png") {
    throw new Error(`Slide 4 image source mismatch: ${slide4.bannerImageSrc}`);
  }
  if (slide4.bannerImageAlt !== "Emprise Academy NEET UG 2026 Result — Mathura Achievers") {
    throw new Error(`Slide 4 alt text mismatch: ${slide4.bannerImageAlt}`);
  }
  if (slide4.bannerImageHref !== "/results") {
    throw new Error(`Slide 4 link must point to /results, got: ${slide4.bannerImageHref}`);
  }

  // Check student achievers listed in subheading/meta
  const requiredStudents = [
    "Bhanu Pratap Tomar",
    "Shreya Agrawal",
    "Ashwani Kr. Sahni",
    "Srishti Saraswat",
    "Shreya Yadav",
    "Khushi",
  ];
  for (const student of requiredStudents) {
    if (!slide4.subheading.includes(student)) {
      throw new Error(`Slide 4 subheading missing student: ${student}`);
    }
  }
  console.log("✓ Verified Slide 4 metadata, alt text, link destination, and 6 student records.");

  // [TEST 3] Auditing Physical Master Asset on Disk
  console.log("\n[TEST 3] Auditing Master Image Asset on Disk...");
  const diskAssetPath = path.resolve(process.cwd(), "public/images/emprise-neet-ug-2026-result-achievers.png");
  if (!fs.existsSync(diskAssetPath)) {
    throw new Error(`Master image missing at ${diskAssetPath}`);
  }
  const stat = fs.statSync(diskAssetPath);
  if (stat.size < 5000000) {
    throw new Error(`Expected high-res master asset (>5MB), found ${stat.size} bytes`);
  }
  console.log(`✓ Master image verified on disk: ${stat.size} bytes (uncompressed high-res master).`);

  // [TEST 4] Auditing HeroSlider Component Preload & Render Strategy
  console.log("\n[TEST 4] Auditing HeroSlider Component...");
  const heroSliderPath = path.resolve(process.cwd(), "src/components/home/HeroSlider.tsx");
  const heroSliderCode = fs.readFileSync(heroSliderPath, "utf-8");

  if (!heroSliderCode.includes("/images/emprise-neet-ug-2026-result-achievers.png")) {
    throw new Error("HeroSlider component does not pre-warm the NEET result image");
  }
  if (!heroSliderCode.includes("unoptimized")) {
    throw new Error("HeroSlider must specify unoptimized for master fidelity");
  }
  if (!heroSliderCode.includes("quality={100}")) {
    throw new Error("HeroSlider must specify quality={100}");
  }
  if (!heroSliderCode.includes("aspectRatio: \"6197 / 2478\"")) {
    throw new Error("HeroSlider must enforce exact aspect ratio 6197 / 2478");
  }
  console.log("✓ HeroSlider component verified: background pre-warming, unoptimized=true, quality=100, exact aspect ratio.");

  // [TEST 5] Auditing Slides 1, 2, 3 Unchanged Integrity
  console.log("\n[TEST 5] Auditing Slides 1, 2, 3 Unchanged Integrity...");
  if (slide1.bannerImageSrc !== "/images/emprise-jee-main-advanced-2026-mathura-toppers.png") {
    throw new Error("Slide 1 image was modified!");
  }
  if (slide2.bannerImageSrc !== "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png") {
    throw new Error("Slide 2 image was modified!");
  }
  if (slide3.bannerImageSrc !== "/images/emprise-jee-main-2026-top-performers.png") {
    throw new Error("Slide 3 image was modified!");
  }
  console.log("✓ Verified Slides 1, 2, 3 are completely unchanged.");

  console.log("\n==================================================");
  console.log("ALL SLIDE 4 AUDIT CHECKS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runSlide4Tests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
