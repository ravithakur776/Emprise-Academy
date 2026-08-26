import crypto from "crypto";
import { AdmitCard, AdmitCardStatus } from "../../src/types/etse";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ADMIT CARD ASSERTION FAILED]: ${message}`);
  }
}

console.log("==================================================");
console.log("INTEGRATION TEST SUITE: ADMIT CARD LIFECYCLE");
console.log("==================================================");

// Simulated Admit Card Storage
const admitCardStore = new Map<string, AdmitCard>();

function createMockAdmitCard(reg: any, exam: any, centre: any): AdmitCard {
  // 1. Idempotency check
  if (admitCardStore.has(reg.id)) {
    return admitCardStore.get(reg.id)!;
  }

  const rollNumber = `202610${reg.application_number.split("-")[1] || "000001"}`;
  const verificationToken = crypto
    .createHash("sha256")
    .update(`${reg.id}:${reg.phone}:${Date.now()}`)
    .digest("hex");

  const newCard: AdmitCard = {
    id: `ac-${reg.id}`,
    registrationId: reg.id,
    examId: exam.id,
    rollNumber,
    verificationToken,
    qrVerificationUrl: `/verify-admit-card/${verificationToken}`,
    examDate: exam.exam_date,
    examTime: exam.exam_time,
    reportingTime: exam.reporting_time,
    examCentreId: centre.id,
    status: "PUBLISHED",
    // Snapshot Immutability
    studentNameSnapshot: reg.student_name,
    fatherNameSnapshot: reg.father_name,
    dobSnapshot: reg.dob,
    classSnapshot: reg.current_class,
    schoolNameSnapshot: reg.school_name,
    centreNameSnapshot: centre.centre_name,
    centreAddressSnapshot: centre.address,
    instructionsSnapshot: exam.instructions,
    isGenerated: true,
    generatedAt: new Date().toISOString(),
    downloadCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  admitCardStore.set(reg.id, newCard);
  return newCard;
}

function verifyAdmitCardByToken(token: string) {
  for (const card of admitCardStore.values()) {
    if (card.verificationToken === token) {
      if (card.status === "REVOKED") {
        return {
          isValid: false,
          status: "REVOKED",
          candidateName: card.studentNameSnapshot,
          rollNumber: card.rollNumber,
          message: "This admit card has been REVOKED.",
        };
      }
      return {
        isValid: true,
        status: card.status,
        candidateName: card.studentNameSnapshot,
        rollNumber: card.rollNumber,
        examCentre: card.centreNameSnapshot,
      };
    }
  }
  return { isValid: false, message: "Invalid or expired token" };
}

async function runAdmitCardLifecycleTests() {
  const mockReg = {
    id: "reg-001",
    application_number: "ETSE2026-000001",
    student_name: "Karan Johar",
    father_name: "Yash Johar",
    dob: "2009-04-12",
    current_class: "Class 10",
    school_name: "Mathura Public School",
    phone: "9876543210",
  };

  const mockExam = {
    id: "exam-2026",
    exam_date: "2026-10-18",
    exam_time: "10:00 AM - 01:00 PM",
    reporting_time: "09:15 AM",
    instructions: ["Carry valid ID proof", "Bring Blue/Black Ballpoint pen"],
  };

  const mockCentre = {
    id: "centre-01",
    centre_name: "Emprise Academy Main Campus",
    address: "Mathura Central Block",
  };

  // 1. First Generation
  console.log("[1] Testing Initial Admit Card Generation & Snapshot Creation...");
  const card1 = createMockAdmitCard(mockReg, mockExam, mockCentre);
  assert(card1.status === "PUBLISHED", "Expected initial status to be PUBLISHED");
  assert(card1.studentNameSnapshot === "Karan Johar", "Snapshot name mismatch");
  assert(card1.centreNameSnapshot === "Emprise Academy Main Campus", "Snapshot centre mismatch");
  console.log(`✓ Admit card generated with token: ${card1.verificationToken.slice(0, 16)}...`);

  // 2. Idempotency Check
  console.log("\n[2] Testing Idempotent Creation (Retry)...");
  const card2 = createMockAdmitCard(mockReg, mockExam, mockCentre);
  assert(card1.id === card2.id, "Idempotency failed: New card created instead of returning existing");
  assert(card1.verificationToken === card2.verificationToken, "Token changed on duplicate call");
  assert(admitCardStore.size === 1, "Duplicate record in store");
  console.log("✓ Duplicate creation attempts safely return identical existing record without creating duplicate entries.");

  // 3. Snapshot Immutability Test
  console.log("\n[3] Testing Snapshot Immutability Against Profile Mutation...");
  mockReg.student_name = "Karan Johar (Updated Name)";
  mockReg.school_name = "New International School";
  
  const storedCard = admitCardStore.get(mockReg.id)!;
  assert(storedCard.studentNameSnapshot === "Karan Johar", "Snapshot mutated when profile changed!");
  assert(storedCard.schoolNameSnapshot === "Mathura Public School", "School snapshot mutated!");
  console.log("✓ Snapshot fields preserve exact registration-time candidate and center details.");

  // 4. Public Verification Test
  console.log("\n[4] Testing Public Verification with Valid Token...");
  const validVerification = verifyAdmitCardByToken(card1.verificationToken);
  assert(validVerification.isValid === true, "Valid admit card failed verification");
  assert(validVerification.candidateName === "Karan Johar", "Candidate name mismatch");
  console.log("✓ Valid admit card verified successfully.");

  // 5. Revocation Lifecycle Test
  console.log("\n[5] Testing Admit Card Revocation...");
  storedCard.status = "REVOKED";
  storedCard.revokedAt = new Date().toISOString();
  storedCard.revocationReason = "Candidate withdrew application";

  const revokedVerification = verifyAdmitCardByToken(card1.verificationToken);
  assert(revokedVerification.isValid === false, "Revoked admit card still passed verification!");
  assert(revokedVerification.status === "REVOKED", "Expected status REVOKED");
  console.log("✓ Revoked admit card correctly flagged as invalid during public verification.");
}

runAdmitCardLifecycleTests().then(() => {
  console.log("\nALL ADMIT CARD LIFECYCLE TESTS PASSED.");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
