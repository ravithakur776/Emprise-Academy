import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: HOMEPAGE QUICK ACTION CARDS REMOVAL AUDIT");
console.log("==================================================");

async function runQuickActionsRemovalAudit() {
  // [TEST 1] Auditing src/app/page.tsx
  console.log("\n[TEST 1] Auditing src/app/page.tsx...");
  const pagePath = path.resolve(process.cwd(), "src/app/page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  if (pageContent.includes("QuickActionsSection")) {
    throw new Error("src/app/page.tsx still contains QuickActionsSection reference!");
  }
  if (pageContent.includes("quickActions")) {
    throw new Error("src/app/page.tsx still contains quickActions reference!");
  }

  // Ensure HeroSlider is followed directly by TrustIntroSection
  const heroIndex = pageContent.indexOf("<HeroSlider />");
  const trustIndex = pageContent.indexOf("<TrustIntroSection />");
  if (heroIndex === -1 || trustIndex === -1) {
    throw new Error("Missing HeroSlider or TrustIntroSection in src/app/page.tsx");
  }
  if (trustIndex < heroIndex) {
    throw new Error("TrustIntroSection must come after HeroSlider");
  }

  const inBetween = pageContent.substring(heroIndex + "<HeroSlider />".length, trustIndex);
  // Only whitespace/comments allowed in between
  const nonCommentBetween = inBetween.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").trim();
  if (nonCommentBetween.length > 0) {
    throw new Error(`Unexpected content between HeroSlider and TrustIntroSection: ${nonCommentBetween}`);
  }
  console.log("✓ Verified src/app/page.tsx: HeroSlider flows directly into TrustIntroSection with no interstitial components.");

  // [TEST 2] Auditing Component File Deletion
  console.log("\n[TEST 2] Auditing Component File Deletion...");
  const componentPath = path.resolve(process.cwd(), "src/components/home/QuickActionsSection.tsx");
  if (fs.existsSync(componentPath)) {
    throw new Error("src/components/home/QuickActionsSection.tsx should have been deleted!");
  }
  console.log("✓ Verified src/components/home/QuickActionsSection.tsx was cleanly deleted.");

  // [TEST 3] Auditing Data Cleanup in src/data/homepage.ts
  console.log("\n[TEST 3] Auditing Data Cleanup in src/data/homepage.ts...");
  const dataPath = path.resolve(process.cwd(), "src/data/homepage.ts");
  const dataContent = fs.readFileSync(dataPath, "utf-8");

  if (dataContent.includes("QuickActionItem")) {
    throw new Error("src/data/homepage.ts still defines unused QuickActionItem interface!");
  }
  if (dataContent.includes("quickActions:")) {
    throw new Error("src/data/homepage.ts still contains unused quickActions array!");
  }
  console.log("✓ Verified src/data/homepage.ts cleaned up: QuickActionItem and quickActions removed.");

  // [TEST 4] Verifying Destination Routes Intact
  console.log("\n[TEST 4] Verifying All Destination Routes Intact...");
  const requiredRoutes = [
    "src/app/(public)/etse-2026/page.tsx",
    "src/app/(public)/admissions/page.tsx",
    "src/app/(student)/student/login/page.tsx",
    "src/app/(public)/results/page.tsx",
    "src/app/(public)/contact/page.tsx",
    "src/app/(public)/courses/page.tsx",
  ];

  for (const route of requiredRoutes) {
    const fullRoute = path.resolve(process.cwd(), route);
    if (!fs.existsSync(fullRoute)) {
      throw new Error(`Destination route missing: ${route}`);
    }
  }
  console.log("✓ All 6 destination routes verified intact on disk.");

  console.log("\n==================================================");
  console.log("ALL QUICK ACTION REMOVAL CHECKS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runQuickActionsRemovalAudit().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
