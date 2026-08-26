import * as XLSX from "xlsx";
import { ResultImportEngine } from "../src/services/result-import.service";
import {
  etseRegistrationSchema,
  resultSearchSchema,
  leadIntakeSchema,
  loginSchema,
  studentRegisterSchema,
} from "../src/validations";
import { STORAGE_CONFIG } from "../src/services/storage.service";
import { VERIFIED_BRAND_DATA } from "../src/data/brand";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ASSERTION FAILED]: ${message}`);
  }
}

async function runFoundationTests() {
  console.log("==================================================");
  console.log("EMPRISE ACADEMY — PHASE 1 FOUNDATION TEST SUITE");
  console.log("==================================================");

  // ----------------------------------------------------
  // TEST 1: Result Import Engine - Valid Dataset
  // ----------------------------------------------------
  console.log("\n[TEST 1] Testing Excel Result Import Engine with Valid Data...");

  const validData = [
    {
      "Roll Number": "2026110001",
      "Candidate Name": "Aarav Sharma",
      "Father Name": "Rajesh Sharma",
      "DOB": "2009-05-14",
      "Class": "Class 11",
      "Stream": "IIT_JEE",
      "Physics": 85,
      "Chemistry": 78,
      "Mathematics": 92,
      "Total Marks": 255,
      "Max Marks": 300,
      "Rank": 1,
      "Scholarship %": 100,
      "Status": "QUALIFIED",
    },
    {
      "Roll Number": "2026110002",
      "Candidate Name": "Diya Verma",
      "Father Name": "Suresh Verma",
      "DOB": "2009-08-22",
      "Class": "Class 11",
      "Stream": "NEET_UG",
      "Physics": 80,
      "Chemistry": 82,
      "Biology": 95,
      "Total Marks": 257,
      "Max Marks": 300,
      "Rank": 2,
      "Scholarship %": 90,
      "Status": "QUALIFIED",
    },
  ];

  const validWorksheet = XLSX.utils.json_to_sheet(validData);
  const validWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(validWorkbook, validWorksheet, "Results");
  const validBuffer = XLSX.write(validWorkbook, { type: "buffer", bookType: "xlsx" });

  const validReport = await ResultImportEngine.parseAndValidate(
    validBuffer,
    "e0000000-0000-0000-0000-000000000001",
    "2025-2026"
  );

  assert(validReport.totalRows === 2, "Expected totalRows to be 2");
  assert(validReport.validRowsCount === 2, "Expected validRowsCount to be 2");
  assert(validReport.invalidRowsCount === 0, "Expected invalidRowsCount to be 0");
  assert(validReport.validRows[0].rollNumber === "2026110001", "Roll number matching failed");
  assert(validReport.validRows[0].subjects.length === 3, "Expected 3 subjects for Aarav");
  assert(validReport.validRows[1].subjects.length === 3, "Expected 3 subjects for Diya");
  console.log("✓ Valid Excel dataset passed with 0 errors.");

  // ----------------------------------------------------
  // TEST 2: Result Import Engine - Invalid & Malformed Data
  // ----------------------------------------------------
  console.log("\n[TEST 2] Testing Excel Result Import Engine with Malformed Data & Duplicates...");

  const invalidData = [
    {
      "Roll Number": "2026110003",
      "Candidate Name": "", // Invalid: Missing name
      "Father Name": "Ramesh Gupta",
      "DOB": "2009-01-01",
      "Class": "Class 10",
      "Physics": 120, // Invalid: Exceeds max 100
      "Total Marks": 120,
      "Max Marks": 100, // Invalid: total > max
    },
    {
      "Roll Number": "2026110004",
      "Candidate Name": "Rohit Kumar",
      "Father Name": "Manoj Kumar",
      "DOB": "invalid-date-string", // Invalid DOB format
      "Class": "Class 9",
      "Total Marks": 50,
      "Max Marks": 100,
    },
    {
      "Roll Number": "2026110004", // Invalid: Duplicate roll number in batch
      "Candidate Name": "Another Rohit",
      "Father Name": "Manoj Kumar",
      "DOB": "2010-02-10",
      "Class": "Class 9",
      "Total Marks": 60,
      "Max Marks": 100,
    },
  ];

  const invalidWorksheet = XLSX.utils.json_to_sheet(invalidData);
  const invalidWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(invalidWorkbook, invalidWorksheet, "InvalidResults");
  const invalidBuffer = XLSX.write(invalidWorkbook, { type: "buffer", bookType: "xlsx" });

  const invalidReport = await ResultImportEngine.parseAndValidate(
    invalidBuffer,
    "e0000000-0000-0000-0000-000000000001",
    "2025-2026"
  );

  assert(invalidReport.invalidRowsCount > 0, "Expected invalid rows to be caught");
  assert(invalidReport.duplicateRollNumbersInFile.includes("2026110004"), "Expected duplicate roll number detection");
  console.log(`✓ Caught ${invalidReport.invalidRowsCount} specific row/column validation errors as expected.`);

  // ----------------------------------------------------
  // TEST 3: Zod Validation Layer
  // ----------------------------------------------------
  console.log("\n[TEST 3] Testing Zod Validation Schemas...");

  // 3a. ETSE Registration
  const validETSEInput = {
    examId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    studentName: "Pooja Agarwal",
    fatherName: "Deepak Agarwal",
    dob: "2009-11-20",
    gender: "FEMALE" as const,
    phone: "9876543210",
    email: "pooja@example.com",
    currentClass: "Class 10",
    schoolName: "Mathura Public School",
    streamInterest: "IIT_JEE" as const,
    examCentreId: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
  };
  const etseParsed = etseRegistrationSchema.safeParse(validETSEInput);
  assert(etseParsed.success === true, "ETSE registration validation failed on valid data");

  const invalidETSEInput = {
    ...validETSEInput,
    phone: "12345", // Invalid Indian phone
  };
  const etseInvalidParsed = etseRegistrationSchema.safeParse(invalidETSEInput);
  assert(etseInvalidParsed.success === false, "ETSE registration did not catch invalid phone");

  // 3b. Result Search
  const searchParsed = resultSearchSchema.safeParse({
    examId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    rollNumber: "etse202601",
    dob: "2009-11-20",
  });
  assert(searchParsed.success === true, "Result search validation failed");
  assert((searchParsed as any).data.rollNumber === "ETSE202601", "Roll number auto-uppercase failed");

  // 3c. Lead Intake
  const leadParsed = leadIntakeSchema.safeParse({
    studentName: "Vikram Singh",
    phone: "9123456780",
    courseInterest: "IIT-JEE 2 Year",
    source: "WEBSITE",
  });
  assert(leadParsed.success === true, "Lead intake schema validation failed");

  console.log("✓ Zod schemas validated all domain rules, transforms, and negative cases.");

  // ----------------------------------------------------
  // TEST 4: Brand Constants & Academic Pillars Verification
  // ----------------------------------------------------
  console.log("\n[TEST 4] Verifying Brand Integrity Constants...");
  assert(VERIFIED_BRAND_DATA.institutionName === "Emprise Academy", "Brand name mismatch");
  assert(VERIFIED_BRAND_DATA.yearEstablished === 2011, "Year established mismatch");
  assert(VERIFIED_BRAND_DATA.primaryPillars.length === 3, "Academic pillars mismatch");
  assert(STORAGE_CONFIG["student-documents"].isPublic === false, "Student documents must be private");
  assert(STORAGE_CONFIG["faculty-photos"].isPublic === true, "Faculty photos should be public");
  console.log("✓ Brand integrity and privacy rules verified.");

  console.log("\n==================================================");
  console.log("ALL PHASE 1 ARCHITECTURE & SERVICE TESTS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runFoundationTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
