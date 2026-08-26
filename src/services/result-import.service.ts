import * as XLSX from "xlsx";
import {
  RawExcelResultRow,
  ValidatedResultRow,
  ExcelImportRowError,
  ExcelImportPreviewReport,
  ExcelImportExecutionResult,
} from "@/types/results";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";

/**
 * Normalizes Excel column names to standard keys
 */
function normalizeColumnKey(rawKey: string): string {
  const clean = rawKey.trim().toLowerCase().replace(/[\s_-]+/g, "");
  if (clean.includes("roll") || clean.includes("rollno")) return "roll_number";
  if (clean.includes("candidate") || clean.includes("studentname") || clean === "name")
    return "candidate_name";
  if (clean.includes("father") || clean.includes("guardian")) return "father_name";
  if (clean.includes("dob") || clean.includes("birth")) return "dob";
  if (clean === "class" || clean.includes("standard")) return "class";
  if (clean === "stream" || clean.includes("branch")) return "stream";
  if (clean.includes("physics") || clean === "phy") return "physics_marks";
  if (clean.includes("chemistry") || clean === "chem") return "chemistry_marks";
  if (clean.includes("math") || clean === "mat") return "maths_marks";
  if (clean.includes("bio") || clean.includes("biology")) return "biology_marks";
  if (clean.includes("total") && clean.includes("mark")) return "total_marks";
  if (clean.includes("max") && clean.includes("mark")) return "max_marks";
  if (clean.includes("percentile")) return "percentile";
  if (clean.includes("percent") || clean.includes("percentage") || clean === "%")
    return "percentage";
  if (clean === "rank" || clean.includes("air") || clean.includes("allindiarank")) return "rank";
  if (clean.includes("categoryrank") || clean.includes("catrank")) return "category_rank";
  if (clean.includes("scholarship")) return "scholarship_awarded";
  if (clean.includes("status") || clean.includes("qualify")) return "qualifying_status";
  if (clean.includes("remark")) return "remarks";
  return clean;
}

/**
 * Converts Excel Serial Date or Date string to YYYY-MM-DD
 */
function parseExcelDate(val: unknown): string | null {
  if (!val) return null;
  if (typeof val === "number") {
    // Excel serial date to JS Date
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
    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    // DD-MM-YYYY or DD/MM/YYYY
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
   * Step 1: Parse Excel/CSV Buffer and generate a strict validation preview
   */
  public static parseAndValidate(
    fileBuffer: Buffer | ArrayBuffer,
    examId: string,
    academicYear: string
  ): ExcelImportPreviewReport {
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

    const errors: ExcelImportRowError[] = [];
    const validRows: ValidatedResultRow[] = [];
    const seenRollNumbersInBatch = new Set<string>();
    const duplicateRollNumbersInFile: string[] = [];

    rawRows.forEach((row, index) => {
      const rowNumber = index + 2; // 1-indexed header is row 1

      // Normalize row keys
      const normalizedRow: RawExcelResultRow = {};
      Object.keys(row).forEach((key) => {
        const normKey = normalizeColumnKey(key);
        normalizedRow[normKey] = row[key];
      });

      // 1. Validate Roll Number
      const rollNumberRaw = String(normalizedRow.roll_number || "").trim().toUpperCase();
      if (!rollNumberRaw) {
        errors.push({ rowNumber, column: "Roll Number", message: "Roll Number is required" });
        return;
      }

      if (seenRollNumbersInBatch.has(rollNumberRaw)) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Roll Number",
          message: `Duplicate roll number '${rollNumberRaw}' in uploaded file`,
        });
        duplicateRollNumbersInFile.push(rollNumberRaw);
        return;
      }
      seenRollNumbersInBatch.add(rollNumberRaw);

      // 2. Validate Candidate Name
      const candidateName = String(normalizedRow.candidate_name || "").trim();
      if (!candidateName || candidateName.length < 2) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Candidate Name",
          message: "Candidate name must be at least 2 characters",
        });
        return;
      }

      // 3. Validate Father Name
      const fatherName = String(normalizedRow.father_name || "").trim();
      if (!fatherName || fatherName.length < 2) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Father Name",
          message: "Father's name is required",
        });
        return;
      }

      // 4. Validate DOB
      const parsedDob = parseExcelDate(normalizedRow.dob);
      if (!parsedDob) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Date of Birth",
          message: "Invalid DOB format. Use YYYY-MM-DD or DD/MM/YYYY",
          value: normalizedRow.dob,
        });
        return;
      }

      // 5. Validate Class
      const classEnrolled = String(normalizedRow.class || "").trim();
      if (!classEnrolled) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Class",
          message: "Class enrolled is required",
        });
        return;
      }

      // 6. Validate Subject Marks
      const subjects: ValidatedResultRow["subjects"] = [];
      const addSubjectIfPresent = (name: string, val: unknown, maxM = 100) => {
        if (val !== undefined && val !== "") {
          const num = Number(val);
          if (isNaN(num) || num < 0 || num > maxM) {
            errors.push({
              rowNumber,
              rollNumber: rollNumberRaw,
              column: name,
              message: `${name} marks must be between 0 and ${maxM}`,
              value: val,
            });
          } else {
            subjects.push({ name, marksObtained: num, maxMarks: maxM });
          }
        }
      };

      addSubjectIfPresent("Physics", normalizedRow.physics_marks);
      addSubjectIfPresent("Chemistry", normalizedRow.chemistry_marks);
      addSubjectIfPresent("Mathematics", normalizedRow.maths_marks);
      addSubjectIfPresent("Biology", normalizedRow.biology_marks);

      // 7. Validate Total & Max Marks
      let totalMarks = Number(normalizedRow.total_marks);
      let maxMarks = Number(normalizedRow.max_marks || 300);

      if (isNaN(totalMarks)) {
        if (subjects.length > 0) {
          totalMarks = subjects.reduce((sum, s) => sum + s.marksObtained, 0);
          maxMarks = subjects.reduce((sum, s) => sum + s.maxMarks, 0);
        } else {
          errors.push({
            rowNumber,
            rollNumber: rollNumberRaw,
            column: "Total Marks",
            message: "Total marks is required or must be calculable from subjects",
          });
          return;
        }
      }

      if (totalMarks < 0 || totalMarks > maxMarks) {
        errors.push({
          rowNumber,
          rollNumber: rollNumberRaw,
          column: "Total Marks",
          message: `Total marks (${totalMarks}) cannot exceed max marks (${maxMarks}) or be negative`,
        });
        return;
      }

      // Percentage calculation / validation
      let percentage = Number(normalizedRow.percentage);
      if (isNaN(percentage)) {
        percentage = Number(((totalMarks / maxMarks) * 100).toFixed(2));
      }

      // Ranks & Percentile
      const percentile =
        normalizedRow.percentile !== "" && !isNaN(Number(normalizedRow.percentile))
          ? Number(normalizedRow.percentile)
          : undefined;
      const rank =
        normalizedRow.rank !== "" && !isNaN(Number(normalizedRow.rank))
          ? Number(normalizedRow.rank)
          : undefined;
      const categoryRank =
        normalizedRow.category_rank !== "" && !isNaN(Number(normalizedRow.category_rank))
          ? Number(normalizedRow.category_rank)
          : undefined;
      const scholarshipAwarded =
        normalizedRow.scholarship_awarded !== "" &&
        !isNaN(Number(normalizedRow.scholarship_awarded))
          ? Number(normalizedRow.scholarship_awarded)
          : 0;

      const rawStatus = String(normalizedRow.qualifying_status || "").toUpperCase();
      const qualifyingStatus =
        rawStatus === "NOT_QUALIFIED" || rawStatus === "AWAITING" ? rawStatus : "QUALIFIED";

      validRows.push({
        rollNumber: rollNumberRaw,
        candidateName,
        fatherName,
        dob: parsedDob,
        classEnrolled,
        stream: normalizedRow.stream ? String(normalizedRow.stream).trim() : undefined,
        subjects,
        totalMarksObtained: totalMarks,
        maxMarks,
        percentage,
        percentile,
        rank,
        categoryRank,
        scholarshipPercentageAwarded: scholarshipAwarded,
        qualifyingStatus,
        remarks: normalizedRow.remarks ? String(normalizedRow.remarks).trim() : undefined,
      });
    });

    return {
      examId,
      academicYear,
      totalRows: rawRows.length,
      validRowsCount: validRows.length,
      invalidRowsCount: errors.length,
      errors,
      validRows,
      duplicateRollNumbersInFile,
    };
  }

  /**
   * Step 2: Confirm and Bulk Upsert valid rows into PostgreSQL
   */
  public static async executeImport(
    validRows: ValidatedResultRow[],
    examId: string,
    academicYear: string,
    adminUserId: string
  ): Promise<ExcelImportExecutionResult> {
    const supabase = createAdminClient();
    let insertedCount = 0;
    let updatedCount = 0;
    let failedCount = 0;
    const errors: ExcelImportRowError[] = [];

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];
      try {
        // Attempt to find matching student profile by phone or name/dob
        const { data: matchedStudent } = await (supabase
          .from("student_profiles") as any)
          .select("id")
          .eq("dob", row.dob)
          .ilike("full_name", row.candidateName)
          .maybeSingle();

        const { data: upsertedResult, error: upsertError } = await (supabase
          .from("results") as any)
          .upsert(
            {
              exam_id: examId,
              academic_year: academicYear,
              roll_number: row.rollNumber,
              student_profile_id: matchedStudent?.id || null,
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
            rowNumber: i + 2,
            rollNumber: row.rollNumber,
            message: `Database upsert error: ${upsertError.message}`,
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
          rowNumber: i + 2,
          rollNumber: row.rollNumber,
          message: err instanceof Error ? err.message : "Unknown error during row import",
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
        failedCount,
      },
    });

    return {
      examId,
      academicYear,
      insertedCount,
      updatedCount,
      failedCount,
      totalProcessed: validRows.length,
      errors,
    };
  }
}
