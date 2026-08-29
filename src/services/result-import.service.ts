import * as XLSX from "xlsx";
import {
  RawExcelResultRow,
  ValidatedResultRow,
  ExcelImportRowError,
  ExcelImportPreviewReport,
  ExcelImportExecutionResult,
  ExamSubject,
} from "@/types/results";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";

/**
 * Normalizes Excel column headers for generic fields
 */
function normalizeHeader(rawKey: string): string {
  return rawKey.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

/**
 * Converts Excel Serial Date or Date string to YYYY-MM-DD
 */
export function parseExcelDate(val: unknown): string | null {
  if (!val) return null;
  if (typeof val === "number") {
    // Excel serial date (days since 1899-12-30)
    const utcDays = Math.floor(val - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);
    return dateInfo.toISOString().split("T")[0];
  }
  if (val instanceof Date) {
    return val.toISOString().split("T")[0];
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    const ddmmyyyy = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (ddmmyyyy) {
      const day = ddmmyyyy[1].padStart(2, "0");
      const month = ddmmyyyy[2].padStart(2, "0");
      const year = ddmmyyyy[3];
      return `${year}-${month}-${day}`;
    }
  }
  return null;
}

export class ResultImportEngine {
  /**
   * Fetches configured subjects for an examination from exam_subjects
   */
  public static async getExamSubjects(examId: string): Promise<ExamSubject[]> {
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const adminSupabase = createAdminClient();
        const { data: subjects, error } = await (adminSupabase
          .from("exam_subjects") as any)
          .select("*")
          .eq("exam_id", examId)
          .order("display_order", { ascending: true });

        if (!error && subjects && subjects.length > 0) {
          return subjects.map((s: any) => ({
            id: s.id,
            examId: s.exam_id,
            subjectName: s.subject_name,
            subjectCode: s.subject_code,
            maximumMarks: Number(s.maximum_marks),
            passMarks: s.pass_marks ? Number(s.pass_marks) : null,
            displayOrder: s.display_order,
            isOptional: s.is_optional,
          }));
        }
      }
    } catch {
      // Fall back to default subjects
    }

    // Default fallback subjects if exam has no explicit configuration or offline
    return [
      { id: "def-1", examId, subjectName: "Physics", subjectCode: "PHY", maximumMarks: 100, displayOrder: 1, isOptional: false },
      { id: "def-2", examId, subjectName: "Chemistry", subjectCode: "CHEM", maximumMarks: 100, displayOrder: 2, isOptional: false },
      { id: "def-3", examId, subjectName: "Mathematics", subjectCode: "MATH", maximumMarks: 100, displayOrder: 3, isOptional: true },
      { id: "def-4", examId, subjectName: "Biology", subjectCode: "BIO", maximumMarks: 100, displayOrder: 4, isOptional: true },
    ];
  }

  /**
   * Step 1: Parse Excel/CSV Buffer, validate against Dynamic Exam Subjects & match student identities cautiously
   */
  public static async parseAndValidate(
    fileBuffer: Buffer | ArrayBuffer,
    examId: string,
    academicYear: string,
    existingProfilesCache?: any[]
  ): Promise<ExcelImportPreviewReport> {
    let examTitle = "Academic Examination";

    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const adminSupabase = createAdminClient();
        const { data: exam } = await (adminSupabase
          .from("result_exams") as any)
          .select("id, exam_title")
          .eq("id", examId)
          .maybeSingle();

        if (exam?.exam_title) {
          examTitle = exam.exam_title;
        }
      }
    } catch {
      // Offline fallback
    }

    const configuredSubjects = await this.getExamSubjects(examId);

    // 2. Read workbook
    const workbook = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      throw new Error("Uploaded workbook contains no sheets.");
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      defval: "",
    });

    // 3. Pre-fetch student profiles for identity matching if not cached
    let studentProfiles: any[] = existingProfilesCache || [];
    if (studentProfiles.length === 0 && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const adminSupabase = createAdminClient();
        const { data: profiles } = await (adminSupabase
          .from("student_profiles") as any)
          .select("id, full_name, dob, phone, email, admission_number")
          .is("deleted_at", null);
        studentProfiles = profiles || [];
      } catch {
        studentProfiles = [];
      }
    }

    const errors: ExcelImportRowError[] = [];
    const validRows: ValidatedResultRow[] = [];
    const seenRollNumbersInBatch = new Set<string>();
    const duplicateRollNumbersInFile: string[] = [];

    let matchedCount = 0;
    let newStudentCount = 0;
    let reviewRequiredCount = 0;
    let conflictCount = 0;
    let warningCount = 0;

    rawRows.forEach((row, index) => {
      const rowNumber = index + 2; // Header is row 1
      let rowHasErrors = false;

      // Build case-insensitive normalized row map
      const normalizedRowMap: Record<string, unknown> = {};
      Object.keys(row).forEach((key) => {
        normalizedRowMap[normalizeHeader(key)] = row[key];
      });

      // 1. Validate Roll Number
      const rollNumberRaw = String(
        normalizedRowMap["rollnumber"] ||
        normalizedRowMap["rollno"] ||
        normalizedRowMap["roll"] ||
        ""
      ).trim().toUpperCase();

      if (!rollNumberRaw) {
        errors.push({ rowNumber, column: "Roll Number", message: "Roll Number is required", severity: "ERROR" });
        return;
      }

      if (seenRollNumbersInBatch.has(rollNumberRaw)) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Roll Number",
          message: `Duplicate roll number '${rollNumberRaw}' in uploaded file`,
          severity: "ERROR",
        });
        duplicateRollNumbersInFile.push(rollNumberRaw);
        return;
      }
      seenRollNumbersInBatch.add(rollNumberRaw);

      // 2. Validate Candidate Name
      const candidateName = String(
        normalizedRowMap["candidatename"] ||
        normalizedRowMap["studentname"] ||
        normalizedRowMap["name"] ||
        ""
      ).trim();

      if (!candidateName || candidateName.length < 2) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Candidate Name",
          message: "Candidate name must be at least 2 characters",
          severity: "ERROR",
        });
        return;
      }

      // 3. Validate Father Name
      const fatherName = String(
        normalizedRowMap["fathername"] ||
        normalizedRowMap["father"] ||
        normalizedRowMap["guardian"] ||
        ""
      ).trim();

      if (!fatherName || fatherName.length < 2) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Father Name",
          message: "Father's name is required",
          severity: "ERROR",
        });
        return;
      }

      // 4. Validate DOB
      const rawDob = normalizedRowMap["dob"] || normalizedRowMap["dateofbirth"] || normalizedRowMap["birthdate"];
      const parsedDob = parseExcelDate(rawDob);
      if (!parsedDob) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Date of Birth",
          message: "Invalid DOB format. Expected YYYY-MM-DD or DD/MM/YYYY",
          value: rawDob,
          severity: "ERROR",
        });
        return;
      }

      // 5. Validate Class
      const classEnrolled = String(
        normalizedRowMap["class"] ||
        normalizedRowMap["classenrolled"] ||
        normalizedRowMap["standard"] ||
        "Class 11"
      ).trim();

      const stream = normalizedRowMap["stream"] ? String(normalizedRowMap["stream"]).trim() : undefined;
      const phone = normalizedRowMap["phone"] || normalizedRowMap["mobile"] ? String(normalizedRowMap["phone"] || normalizedRowMap["mobile"]).trim() : undefined;
      const email = normalizedRowMap["email"] ? String(normalizedRowMap["email"]).trim() : undefined;

      // 6. Dynamic Subject Marks Validation
      const subjects: ValidatedResultRow["subjects"] = [];
      let calculatedTotal = 0;
      let calculatedMax = 0;

      for (const subj of configuredSubjects) {
        const subjNormName = normalizeHeader(subj.subjectName);
        const subjNormCode = normalizeHeader(subj.subjectCode);

        // Look for matching column (e.g., "Physics", "Physics Marks", "PHY", "Phy Marks")
        let rawSubjectVal: unknown = undefined;
        for (const key of Object.keys(normalizedRowMap)) {
          if (
            key === subjNormName ||
            key === `${subjNormName}marks` ||
            key === subjNormCode ||
            key === `${subjNormCode}marks`
          ) {
            rawSubjectVal = normalizedRowMap[key];
            break;
          }
        }

        if (rawSubjectVal !== undefined && rawSubjectVal !== "") {
          const numMarks = Number(rawSubjectVal);
          if (isNaN(numMarks) || numMarks < 0 || numMarks > subj.maximumMarks) {
            rowHasErrors = true;
            errors.push({
              rowNumber,
              rollNumber: rollNumberRaw,
              column: subj.subjectName,
              message: `${subj.subjectName} marks (${rawSubjectVal}) must be between 0 and ${subj.maximumMarks}`,
              value: rawSubjectVal,
              severity: "ERROR",
            });
          } else {
            subjects.push({
              name: subj.subjectName,
              code: subj.subjectCode,
              marksObtained: numMarks,
              maxMarks: subj.maximumMarks,
            });
            calculatedTotal += numMarks;
            calculatedMax += subj.maximumMarks;
          }
        } else if (!subj.isOptional) {
          // Required subject missing in file
          rowHasErrors = true;
          errors.push({
            rowNumber,
            rollNumber: rollNumberRaw,
            column: subj.subjectName,
            message: `Required subject column '${subj.subjectName}' is missing or empty`,
            severity: "ERROR",
          });
        }
      }

      // 7. Validate Total & Maximum Marks
      let totalMarks = Number(normalizedRowMap["totalmarks"] || normalizedRowMap["total"]);
      let maxMarks = Number(normalizedRowMap["maxmarks"] || normalizedRowMap["maximummarks"]);

      if (isNaN(totalMarks)) {
        if (subjects.length > 0) {
          totalMarks = calculatedTotal;
          maxMarks = calculatedMax;
        } else {
          rowHasErrors = true;
          errors.push({
            rowNumber,
            rollNumber: rollNumberRaw,
            column: "Total Marks",
            message: "Total marks could not be determined from columns or subjects",
            severity: "ERROR",
          });
          return;
        }
      }

      if (isNaN(maxMarks) || maxMarks <= 0) {
        maxMarks = calculatedMax > 0 ? calculatedMax : 300;
      }

      if (totalMarks < 0 || totalMarks > maxMarks) {
        rowHasErrors = true;
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Total Marks",
          message: `Total marks (${totalMarks}) cannot exceed max marks (${maxMarks}) or be negative`,
          severity: "ERROR",
        });
        return;
      }

      let percentage = Number(normalizedRowMap["percentage"] || normalizedRowMap["percent"]);
      if (isNaN(percentage)) {
        percentage = Number(((totalMarks / maxMarks) * 100).toFixed(2));
      }

      const percentile = normalizedRowMap["percentile"] !== "" && !isNaN(Number(normalizedRowMap["percentile"]))
        ? Number(normalizedRowMap["percentile"])
        : undefined;

      const rank = normalizedRowMap["rank"] !== "" && !isNaN(Number(normalizedRowMap["rank"]))
        ? Number(normalizedRowMap["rank"])
        : undefined;

      const categoryRank = normalizedRowMap["categoryrank"] !== "" && !isNaN(Number(normalizedRowMap["categoryrank"]))
        ? Number(normalizedRowMap["categoryrank"])
        : undefined;

      const scholarshipAwarded = normalizedRowMap["scholarship"] !== "" && !isNaN(Number(normalizedRowMap["scholarship"]))
        ? Number(normalizedRowMap["scholarship"])
        : 0;

      const rawStatus = String(normalizedRowMap["status"] || normalizedRowMap["qualifyingstatus"] || "").toUpperCase();
      const qualifyingStatus = rawStatus === "NOT_QUALIFIED" || rawStatus === "AWAITING" ? rawStatus : "QUALIFIED";
      const remarks = normalizedRowMap["remarks"] ? String(normalizedRowMap["remarks"]).trim() : undefined;

      // 8. Cautious Student Identity Matching (Issue 5)
      // 8. Cautious Student Identity Matching (Issue 5)
      let matchStatus: ValidatedResultRow["matchStatus"] = "NEW_STUDENT";
      let matchedStudentProfileId: string | null = null;
      let matchDetails: string = "New student profile will be created on import.";

      const trustedProfileId = normalizedRowMap["studentprofileid"] ? String(normalizedRowMap["studentprofileid"]).trim() : undefined;

      if (trustedProfileId) {
        const found = studentProfiles.find((p) => p.id === trustedProfileId);
        if (found) {
          matchStatus = "MATCHED";
          matchedStudentProfileId = found.id;
          matchDetails = `Matched via explicit Student Profile ID (${found.full_name})`;
        }
      }

      if (!matchedStudentProfileId) {
        // Find all profiles with identical Name & DOB
        const matchesByNameDob = studentProfiles.filter(
          (p) => p.dob === parsedDob && p.full_name.toLowerCase().trim() === candidateName.toLowerCase().trim()
        );

        if (matchesByNameDob.length > 1) {
          // Multiple students share the exact same Name and DOB (e.g. two Rahul Sharmas)
          matchStatus = "CONFLICT";
          matchDetails = `Ambiguous student match: ${matchesByNameDob.length} existing profiles share name '${candidateName}' and DOB ${parsedDob}. Manual review required.`;
          warningCount++;
        } else if (matchesByNameDob.length === 1) {
          const profile = matchesByNameDob[0];
          if (!phone || profile.phone === phone) {
            matchStatus = "MATCHED";
            matchedStudentProfileId = profile.id;
            matchDetails = `Exact match by Name & DOB (${profile.full_name})`;
          } else {
            matchStatus = "REVIEW_REQUIRED";
            matchDetails = `Same Name & DOB found (${profile.full_name}), but phone (${phone}) differs from stored phone (${profile.phone}). Requires review.`;
            warningCount++;
          }
        } else {
          // No profile with this Name + DOB
          if (phone) {
            const matchesByPhone = studentProfiles.filter((p) => p.phone === phone);
            if (matchesByPhone.length > 0) {
              matchStatus = "REVIEW_REQUIRED";
              matchDetails = `Phone ${phone} matches existing profile (${matchesByPhone[0].full_name}), but Name/DOB differs. Requires review.`;
              warningCount++;
            }
          }
        }
      }

      if (matchStatus === "MATCHED") matchedCount++;
      else if (matchStatus === "NEW_STUDENT") newStudentCount++;
      else if (matchStatus === "REVIEW_REQUIRED") reviewRequiredCount++;
      else if (matchStatus === "CONFLICT") conflictCount++;

      if (rowHasErrors) {
        return;
      }

      validRows.push({
        rowNumber,
        rollNumber: rollNumberRaw,
        candidateName,
        fatherName,
        dob: parsedDob,
        classEnrolled,
        stream,
        phone,
        email,
        subjects,
        totalMarksObtained: totalMarks,
        maxMarks,
        percentage,
        percentile,
        rank,
        categoryRank,
        scholarshipPercentageAwarded: scholarshipAwarded,
        qualifyingStatus,
        remarks,
        matchStatus,
        matchedStudentProfileId,
        matchDetails,
      });
    });

    return {
      examId,
      examTitle,
      academicYear,
      configuredSubjects,
      totalRows: rawRows.length,
      validRowsCount: validRows.length,
      invalidRowsCount: errors.length,
      warningCount,
      matchedCount,
      newStudentCount,
      reviewRequiredCount,
      conflictCount,
      errors,
      validRows,
      duplicateRollNumbersInFile,
    };
  }

  /**
   * Step 2: Confirm and Bulk Upsert valid rows into PostgreSQL with Student Result History linking
   */
  public static async executeImport(
    validRows: ValidatedResultRow[],
    examId: string,
    academicYear: string,
    adminUserId: string,
    options?: { autoCreateNewStudents?: boolean }
  ): Promise<ExcelImportExecutionResult> {
    const supabase = createAdminClient();
    let insertedCount = 0;
    const updatedCount = 0;
    let failedCount = 0;
    let reviewRequiredCount = 0;
    const errors: ExcelImportRowError[] = [];

    const autoCreate = options?.autoCreateNewStudents ?? true;

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];

      // Skip conflicted / review required rows unless manually reviewed
      if (row.matchStatus === "CONFLICT" || row.matchStatus === "REVIEW_REQUIRED") {
        reviewRequiredCount++;
        errors.push({
          rowNumber: row.rowNumber,
          rollNumber: row.rollNumber,
          message: `Skipped auto-import: ${row.matchDetails}`,
          severity: "WARNING",
        });
        continue;
      }

      try {
        let studentProfileId = row.matchedStudentProfileId;

        // Create new student profile if NEW_STUDENT and autoCreate enabled
        if (!studentProfileId && autoCreate) {
          const { data: newProfile } = await (supabase
            .from("student_profiles") as any)
            .insert({
              full_name: row.candidateName,
              dob: row.dob,
              gender: "OTHER",
              phone: row.phone || "0000000000",
              email: row.email || null,
              current_class: row.classEnrolled,
              city: "Mathura",
              state: "Uttar Pradesh",
            })
            .select("id")
            .single();

          studentProfileId = newProfile?.id || null;
        }

        // Upsert Result on (exam_id, academic_year, roll_number)
        const { data: upsertedResult, error: upsertError } = await (supabase
          .from("results") as any)
          .upsert(
            {
              exam_id: examId,
              academic_year: academicYear,
              roll_number: row.rollNumber,
              student_profile_id: studentProfileId,
              candidate_name: row.candidateName,
              father_name: row.fatherName,
              dob: row.dob,
              class_enrolled: row.classEnrolled,
              stream: row.stream || null,
              total_marks_obtained: row.totalMarksObtained,
              max_marks: row.maxMarks,
              percentage: row.percentage,
              percentile: row.percentile || null,
              rank: row.rank || null,
              category_rank: row.categoryRank || null,
              scholarship_percentage_awarded: row.scholarshipPercentageAwarded || 0,
              qualifying_status: row.qualifyingStatus,
              remarks: row.remarks || null,
              is_published: true,
            },
            {
              onConflict: "exam_id,academic_year,roll_number",
            }
          )
          .select("id")
          .single();

        if (upsertError) {
          failedCount++;
          errors.push({
            rowNumber: row.rowNumber,
            rollNumber: row.rollNumber,
            message: `Database upsert error: ${upsertError.message}`,
            severity: "ERROR",
          });
          continue;
        }

        // Insert / replace subject breakdowns
        if (row.subjects && row.subjects.length > 0 && upsertedResult) {
          await (supabase.from("result_subjects") as any).delete().eq("result_id", (upsertedResult as any).id);

          const subjectInserts = row.subjects.map((s) => ({
            result_id: (upsertedResult as any).id,
            subject_name: s.name,
            marks_obtained: s.marksObtained,
            max_marks: s.maxMarks,
          }));

          await (supabase.from("result_subjects") as any).insert(subjectInserts);
        }

        insertedCount++;
      } catch (err) {
        failedCount++;
        errors.push({
          rowNumber: row.rowNumber,
          rollNumber: row.rollNumber,
          message: err instanceof Error ? err.message : "Unknown error during row import",
          severity: "ERROR",
        });
      }
    }

    // Log administrative audit event
    await logAuditEvent({
      userId: adminUserId,
      action: "EXCEL_RESULT_IMPORT_CONFIRMED",
      entityName: "results",
      entityId: examId,
      metadata: {
        academicYear,
        totalSubmitted: validRows.length,
        insertedCount,
        reviewRequiredCount,
        failedCount,
      },
    });

    return {
      examId,
      academicYear,
      insertedCount,
      updatedCount,
      failedCount,
      reviewRequiredCount,
      totalProcessed: validRows.length,
      errors,
    };
  }

  /**
   * Generates a downloadable Excel template configured with the exam's exact subjects
   */
  public static async generateExcelTemplate(examId: string): Promise<Buffer> {
    const subjects = await this.getExamSubjects(examId);

    // Build sample header and row
    const templateRow: Record<string, string | number> = {
      "Roll Number": "2026110001",
      "Candidate Name": "Aarav Sharma",
      "Father Name": "Rajesh Sharma",
      "DOB": "2009-05-14",
      "Class": "Class 11",
      "Stream": "IIT_JEE",
      "Phone": "9800000001",
      "Email": "candidate@example.com",
    };

    // Append dynamic subject columns
    subjects.forEach((subj) => {
      templateRow[`${subj.subjectName} (Max: ${subj.maximumMarks})`] = Math.round(subj.maximumMarks * 0.85);
    });

    templateRow["Rank"] = 1;
    templateRow["Scholarship %"] = 100;
    templateRow["Status"] = "QUALIFIED";
    templateRow["Remarks"] = "Exemplary Performance";

    const worksheet = XLSX.utils.json_to_sheet([templateRow]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ResultTemplate");

    return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
  }
}
