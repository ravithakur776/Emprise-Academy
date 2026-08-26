import {
  etseRegistrationSchema,
  resultSearchSchema,
  leadIntakeSchema,
  loginSchema,
  studentRegisterSchema,
  courseSchema,
  facultySchema,
} from "../../src/validations";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[UNIT ASSERTION FAILED]: ${message}`);
  }
}

console.log("==================================================");
console.log("UNIT TEST SUITE: ZOD VALIDATION & SCHEMAS");
console.log("==================================================");

// 1. ETSE Registration Validation
console.log("[1] Testing ETSE Registration Schema...");

const validETSE = {
  examId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  studentName: "Ananya Sharma",
  fatherName: "Sunil Sharma",
  motherName: "Ritu Sharma",
  dob: "2009-07-15",
  gender: "FEMALE" as const,
  phone: "9876543210",
  email: "ananya@example.com",
  currentClass: "Class 10",
  schoolName: "Delhi Public School Mathura",
  streamInterest: "IIT_JEE" as const,
  examCentreId: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
};

assert(etseRegistrationSchema.safeParse(validETSE).success === true, "Valid ETSE payload rejected");

// Negative phone tests
assert(etseRegistrationSchema.safeParse({ ...validETSE, phone: "12345" }).success === false, "Failed to reject short phone");
assert(etseRegistrationSchema.safeParse({ ...validETSE, phone: "5876543210" }).success === false, "Failed to reject non-Indian starting digit");

// Negative date format tests
assert(etseRegistrationSchema.safeParse({ ...validETSE, dob: "15/07/2009" }).success === false, "Failed to reject non-ISO date format");
assert(etseRegistrationSchema.safeParse({ ...validETSE, examId: "invalid-uuid" }).success === false, "Failed to reject invalid UUID");
console.log("✓ ETSE Registration schema correctly enforces RFC4122 UUIDs, Indian phone numbers, and ISO dates.");

// 2. Result Search Schema & Transform
console.log("[2] Testing Result Search Schema & Case Transform...");

const searchRes = resultSearchSchema.safeParse({
  examId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  rollNumber: "  etse2026001  ",
  dob: "2009-07-15",
});

assert(searchRes.success === true, "Valid result search failed");
assert((searchRes as any).data.rollNumber === "ETSE2026001", "Roll number trimming/uppercase transform failed");
console.log("✓ Result search transforms lowercase/spaced roll numbers to standardized uppercase.");

// 3. Lead Intake Schema
console.log("[3] Testing Lead Intake Schema...");

const validLead = {
  studentName: "Devendra Yadav",
  phone: "9876543210",
  source: "WHATSAPP" as const,
  courseInterest: "NEET-UG 2 Year",
};

assert(leadIntakeSchema.safeParse(validLead).success === true, "Valid lead intake rejected");
assert(leadIntakeSchema.safeParse({ ...validLead, studentName: "A" }).success === false, "Failed to reject single-character name");
console.log("✓ Lead intake schema validated.");

console.log("\nALL UNIT TESTS PASSED.");
