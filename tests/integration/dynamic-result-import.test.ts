import * as XLSX from "xlsx";
import { ResultImportEngine } from "../../src/services/result-import.service";
import { ExamSubject } from "../../src/types/results";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[DYNAMIC IMPORT ASSERTION FAILED]: ${message}`);
  }
}

console.log("==================================================");
console.log("INTEGRATION TEST SUITE: DYNAMIC RESULT IMPORT & STUDENT MATCHING");
console.log("==================================================");

async function runDynamicSubjectImportTests() {
  // 1. Configure NEET Exam Subjects (Physics 180, Chemistry 180, Biology 360 = 720 Total)
  console.log("[1] Testing Dynamic NEET Exam Subject Validation (720 Max Marks)...");

  const neetSubjects: ExamSubject[] = [
    { id: "s-1", examId: "exam-neet", subjectName: "Physics", subjectCode: "PHY", maximumMarks: 180, displayOrder: 1, isOptional: false },
    { id: "s-2", examId: "exam-neet", subjectName: "Chemistry", subjectCode: "CHEM", maximumMarks: 180, displayOrder: 2, isOptional: false },
    { id: "s-3", examId: "exam-neet", subjectName: "Biology", subjectCode: "BIO", maximumMarks: 360, displayOrder: 3, isOptional: false },
  ];

  // Mock ResultImportEngine.getExamSubjects for testing
  ResultImportEngine.getExamSubjects = async () => neetSubjects;

  const validNeetData = [
    {
      "Roll Number": "2026NEET01",
      "Candidate Name": "Pooja Sharma",
      "Father Name": "Manoj Sharma",
      "DOB": "2008-03-21",
      "Class": "Class 12",
      "Stream": "NEET_UG",
      "Phone": "9876500001",
      "Physics": 160,
      "Chemistry": 165,
      "Biology": 340, // 665 / 720
      "Status": "QUALIFIED",
      "Rank": 4,
    },
    {
      "Roll Number": "2026NEET02",
      "Candidate Name": "Rohit Verma",
      "Father Name": "Vinod Verma",
      "DOB": "2008-08-10",
      "Class": "Class 12",
      "Stream": "NEET_UG",
      "Phone": "9876500002",
      "Physics": 170,
      "Chemistry": 170,
      "Biology": 380, // Invalid: Exceeds 360 max for Biology
      "Status": "QUALIFIED",
    },
  ];

  const ws = XLSX.utils.json_to_sheet(validNeetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "NEETResults");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const report = await ResultImportEngine.parseAndValidate(buffer, "exam-neet", "2026-2027", []);

  assert(report.totalRows === 2, "Expected 2 total rows");
  assert(report.validRowsCount === 1, "Expected 1 valid row (Row 1)");
  assert(report.invalidRowsCount === 1, "Expected 1 invalid row (Row 2)");
  assert(
    report.errors.some((e) => e.column === "Biology" && e.rowNumber === 3),
    "Failed to catch Biology marks exceeding 360 max limit"
  );
  assert(report.validRows[0].totalMarksObtained === 665, `Expected 665 total marks, got ${report.validRows[0].totalMarksObtained}`);
  assert(report.validRows[0].maxMarks === 720, `Expected 720 max marks, got ${report.validRows[0].maxMarks}`);
  assert(report.validRows[0].percentage === 92.36, `Percentage mismatch: got ${report.validRows[0].percentage}`);
  console.log("✓ Dynamic NEET subjects (720 Max) validated: out-of-range marks correctly rejected.");

  // 2. Cautious Student Identity Matching (Ambiguity & Conflict Test)
  console.log("\n[2] Testing Cautious Student Identity Matching (Rahul Sharma Ambiguity Check)...");

  const existingProfiles = [
    { id: "sp-1", full_name: "Rahul Sharma", dob: "2009-05-14", phone: "9876543210" },
    { id: "sp-2", full_name: "Rahul Sharma", dob: "2009-05-14", phone: "9123456789" }, // Same name & DOB, different phone
    { id: "sp-3", full_name: "Ananya Gupta", dob: "2009-11-20", phone: "9998887770" },
  ];

  const studentMatchTestData = [
    {
      "Roll Number": "2026001",
      "Candidate Name": "Ananya Gupta",
      "Father Name": "Suresh Gupta",
      "DOB": "2009-11-20",
      "Phone": "9998887770", // Exact match
      "Physics": 85,
      "Chemistry": 90,
      "Biology": 300,
    },
    {
      "Roll Number": "2026002",
      "Candidate Name": "Rahul Sharma",
      "Father Name": "Dinesh Sharma",
      "DOB": "2009-05-14",
      "Phone": "9876543210", // Ambiguous Name & DOB exists in sp-1 and sp-2
      "Physics": 70,
      "Chemistry": 75,
      "Biology": 280,
    },
    {
      "Roll Number": "2026003",
      "Candidate Name": "New Student Without Profile",
      "Father Name": "Father Name",
      "DOB": "2009-01-01",
      "Phone": "9000000000",
      "Physics": 80,
      "Chemistry": 80,
      "Biology": 310,
    },
  ];

  const matchWs = XLSX.utils.json_to_sheet(studentMatchTestData);
  const matchWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(matchWb, matchWs, "MatchResults");
  const matchBuffer = XLSX.write(matchWb, { type: "buffer", bookType: "xlsx" });

  const matchReport = await ResultImportEngine.parseAndValidate(
    matchBuffer,
    "exam-neet",
    "2026-2027",
    existingProfiles
  );

  assert(matchReport.validRowsCount === 3, "Expected 3 valid rows");
  
  // Row 1: Ananya Gupta should be MATCHED
  assert(matchReport.validRows[0].matchStatus === "MATCHED", "Ananya Gupta was not marked as MATCHED");
  assert(matchReport.validRows[0].matchedStudentProfileId === "sp-3", "Ananya Gupta linked to wrong profile");

  // Row 2: Rahul Sharma has multiple profiles with same Name & DOB -> CONFLICT
  assert(
    matchReport.validRows[1].matchStatus === "CONFLICT",
    "Ambiguous Rahul Sharma was improperly auto-merged instead of being flagged as CONFLICT"
  );
  assert(matchReport.conflictCount === 1, "Expected 1 conflict count");

  // Row 3: New Student should be NEW_STUDENT
  assert(matchReport.validRows[2].matchStatus === "NEW_STUDENT", "Unrecognized student not marked as NEW_STUDENT");
  assert(matchReport.newStudentCount === 1, "Expected 1 new student count");

  console.log("✓ Cautious matching verified: Ambiguous 'Rahul Sharma' flagged for admin review, exact match linked, and new student classified cleanly.");

  // 3. Dynamic Template Generation
  console.log("\n[3] Testing Downloadable Excel Template Generator for Exam...");
  const templateBuffer = await ResultImportEngine.generateExcelTemplate("exam-neet");
  assert(templateBuffer.length > 0, "Template buffer is empty");
  
  const templateWorkbook = XLSX.read(templateBuffer, { type: "buffer" });
  const templateSheet = templateWorkbook.Sheets[templateWorkbook.SheetNames[0]];
  const templateRows: any[] = XLSX.utils.sheet_to_json(templateSheet);

  assert(templateRows.length === 1, "Template should contain 1 sample row");
  assert(templateRows[0]["Physics (Max: 180)"] !== undefined, "Template missing Physics column");
  assert(templateRows[0]["Chemistry (Max: 180)"] !== undefined, "Template missing Chemistry column");
  assert(templateRows[0]["Biology (Max: 360)"] !== undefined, "Template missing Biology column");
  console.log("✓ Dynamic Excel template generated with exact configured exam subjects & maximum marks headers.");
}

runDynamicSubjectImportTests().then(() => {
  console.log("\nALL DYNAMIC RESULT IMPORT & STUDENT MATCHING TESTS PASSED.");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
