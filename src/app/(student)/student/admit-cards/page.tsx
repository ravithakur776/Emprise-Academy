"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { createClientBrowser } from "@/lib/supabase/client";
import {
  CreditCard,
  Calendar,
  Building,
  CheckCircle2,
  Printer,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  User,
  Info,
} from "lucide-react";

export default function StudentAdmitCardsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentIdentity, setStudentIdentity] = useState({
    name: "Student",
    class: "Class 8",
    applicationNo: "ETSE Portal",
  });
  const [admitCards, setAdmitCards] = useState<any[]>([]);

  const loadAdmitCards = async () => {
    try {
      setLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fadmit-cards");
        return;
      }

      // Fetch student profile
      const { data: studentProf } = await (supabase
        .from("student_profiles") as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: userProf } = await (supabase
        .from("user_profiles") as any)
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const name =
        studentProf?.full_name ||
        userProf?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student";
      const currentClass = studentProf?.current_class || "Class 8";

      // Query admit cards joined with registrations, exams, and centres
      const { data: cards } = await (supabase
        .from("admit_cards") as any)
        .select("*, etse_registrations(*), etse_exams(*), exam_centres(*)")
        .order("created_at", { ascending: false });

      if (cards && cards.length > 0) {
        const formatted = cards.map((ac: any) => {
          const reg = ac.etse_registrations || {};
          const exam = ac.etse_exams || {};
          const centre = ac.exam_centres || {};

          // Format Date of Birth
          const rawDob = ac.dob_snapshot || reg.dob || studentProf?.dob;
          let formattedDob = "15 May 2012";
          if (rawDob) {
            try {
              const d = new Date(rawDob);
              formattedDob = d.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            } catch {
              formattedDob = String(rawDob);
            }
          }

          // Format Exam Date
          const rawExamDate = ac.exam_date || exam.exam_date || "2026-09-06";
          let formattedExamDate = "Sunday, 06 September 2026";
          if (rawExamDate) {
            try {
              const ed = new Date(rawExamDate);
              formattedExamDate = ed.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            } catch {
              formattedExamDate = String(rawExamDate);
            }
          }

          return {
            id: ac.id,
            registrationId: ac.registration_id || reg.id,
            examTitle: exam.title || "Emprise Talent Search Examination (ETSE) 2026",
            examCode: exam.exam_code || "ETSE2026",
            applicationNo: reg.application_number || "ETSE2026-000002",
            rollNumber: ac.roll_number || "20260801001",
            candidateName: ac.student_name_snapshot || reg.student_name || name,
            fatherName: ac.father_name_snapshot || reg.father_name || "Test Father",
            motherName: ac.mother_name_snapshot || reg.mother_name || null,
            dob: formattedDob,
            gender: reg.gender ? (reg.gender === "MALE" ? "Male" : reg.gender === "FEMALE" ? "Female" : "Other") : "Male",
            currentClass: ac.class_snapshot || reg.current_class || currentClass,
            schoolName: ac.school_name_snapshot || reg.school_name || "Emprise Test School / Mathura",
            streamInterest: reg.stream_interest ? (reg.stream_interest === "FOUNDATION" ? "Foundation (Science & Mathematics)" : reg.stream_interest === "IIT_JEE" ? "Engineering (IIT-JEE)" : "Medical (NEET-UG)") : "Foundation (Science & Mathematics)",
            candidatePhone: reg.phone || studentProf?.phone || "9999999998",
            candidateEmail: reg.email || user.email || "ravietse2@gmail.com",
            photoUrl: reg.photo_url || studentProf?.photo_url || null,
            examDate: formattedExamDate,
            reportingTime: ac.reporting_time || exam.reporting_time || "09:30 AM",
            examTime: ac.exam_time || exam.exam_time || "10:00 AM – 12:00 PM",
            examDuration: "2 Hours (120 Minutes)",
            examCentre: ac.centre_name_snapshot || centre.centre_name || "Emprise Academy Mathura",
            centreAddress: ac.centre_address_snapshot || centre.address || "Near Tera Tower, Bhuteshwar Road, Mathura",
            centreCity: centre.city ? `${centre.city}, Uttar Pradesh` : "Mathura, Uttar Pradesh",
            centrePincode: centre.pincode || "281004",
            status: ac.status || (ac.is_generated ? "PUBLISHED" : "PENDING"),
            verificationToken: ac.verification_token,
            qrVerificationUrl: ac.qr_verification_url || `/verify-admit-card/${ac.verification_token}`,
            generatedAt: ac.generated_at ? new Date(ac.generated_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "31 Aug 2026",
            isReady: ac.is_generated || ac.status === "PUBLISHED",
          };
        });

        setAdmitCards(formatted);
        setStudentIdentity({
          name: formatted[0].candidateName,
          class: formatted[0].currentClass,
          applicationNo: formatted[0].applicationNo,
        });
      } else {
        setAdmitCards([]);
        setStudentIdentity({
          name,
          class: currentClass,
          applicationNo: studentProf?.admission_number || "No Admit Card",
        });
      }
    } catch (err) {
      console.error("[ADMIT_CARDS_LOAD_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmitCards();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-md w-1/3" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-96" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      studentName={studentIdentity.name}
      studentClass={studentIdentity.class}
      applicationNo={studentIdentity.applicationNo}
    >
      {/* Precision A4 Single-Page Full-Height Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }
          html,
          body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            font-size: 9pt !important;
            line-height: 1.35 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav,
          aside,
          header,
          footer,
          .no-print,
          button,
          .toast-container,
          #__next-build-watcher {
            display: none !important;
          }
          .admit-card-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0 !important;
            border: 1.5pt solid #0f172a !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .print-header-bar {
            padding: 6px 14px !important;
            background-color: #0f172a !important;
            color: #ffffff !important;
          }
          .print-header-content {
            padding: 10px 14px !important;
          }
          .print-banner {
            padding: 8px 14px !important;
            background-color: #0f172a !important;
            color: #ffffff !important;
          }
          .print-section {
            padding: 9px 14px !important;
          }
          .print-text-xs {
            font-size: 8pt !important;
            line-height: 1.25 !important;
          }
          .print-text-sm {
            font-size: 9pt !important;
            line-height: 1.3 !important;
          }
          .print-text-base {
            font-size: 11pt !important;
            line-height: 1.3 !important;
          }
          .print-text-lg {
            font-size: 13pt !important;
            line-height: 1.3 !important;
          }
          .print-photo-box {
            width: 32mm !important;
            height: 40mm !important;
          }
          .print-qr-box {
            width: 28mm !important;
            height: 40mm !important;
            padding: 3px !important;
          }
          .print-sig-box {
            height: 22mm !important;
            padding: 6px !important;
          }
          .print-compact-gap {
            gap: 8px !important;
          }
          .print-compact-list {
            margin: 0 !important;
            padding-left: 18px !important;
          }
          .print-compact-list li {
            margin-bottom: 4px !important;
            font-size: 8.5pt !important;
            line-height: 1.35 !important;
          }
          .print-footer-note {
            margin-top: 8px !important;
            padding-top: 6px !important;
            font-size: 7.5pt !important;
          }
        }
      `}</style>

      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Page Header (Web Only) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                OFFICIAL EXAMINATION CREDENTIAL
              </span>
              <Badge variant="success" size="sm">
                <ShieldCheck className="w-3 h-3 mr-1" /> Digitally Verifiable
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              Examination Admit Card & Hall Ticket
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Please download or print this official admit card and carry it to your allotted test centre on examination day.
            </p>
          </div>

          {admitCards.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => window.print()}
              >
                Print Admit Card (A4)
              </Button>
            </div>
          )}
        </div>

        {/* Admit Cards Render */}
        {admitCards.length > 0 ? (
          <div className="space-y-8">
            {admitCards.map((card) => (
              <div
                key={card.id}
                id="admit-card-document"
                className="admit-card-container bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden relative text-slate-900"
              >
                {/* Institutional Top Authority Bar */}
                <div className="print-header-bar bg-[var(--brand-primary)] text-white px-4 sm:px-6 py-2.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-widest font-black text-amber-400">
                      EMPRISE ACADEMY
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[11px] font-semibold text-slate-200">
                      Controller of Examinations
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono flex items-center gap-2">
                    <span>Session: <strong>2026–27</strong></span>
                    <span>•</span>
                    <span>Document Ref: <strong>{card.applicationNo}</strong></span>
                  </div>
                </div>

                {/* Official Institutional Header */}
                <div className="print-header-content p-4 sm:p-6 border-b border-slate-200 bg-linear-to-b from-slate-50/70 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Logo & Academy Title */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200 shadow-xs shrink-0">
                        <EmpriseLogo size="md" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[var(--brand-accent)] block">
                          EMPRISE TALENT SEARCH EXAMINATION 2026
                        </span>
                        <h2 className="text-base sm:text-xl font-black text-[var(--brand-primary)] leading-tight print-text-lg">
                          OFFICIAL EXAMINATION ADMIT CARD
                        </h2>
                        <p className="text-[10px] sm:text-xs text-slate-600 font-medium">
                          National Scholarship & Aptitude Benchmarking Examination
                        </p>
                      </div>
                    </div>

                    {/* Verification & Status Badge */}
                    <div className="flex sm:flex-col items-start sm:items-end justify-between gap-1 shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] sm:text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>ADMIT CARD ISSUED</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">
                        Generated: {card.generatedAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Identifiers Banner (Roll Number & App ID) */}
                <div className="print-banner bg-slate-900 text-white px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-slate-800 text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-amber-400 block tracking-wider">
                      OFFICIAL ROLL NUMBER
                    </span>
                    <span className="text-base sm:text-lg font-black font-mono tracking-wider text-amber-300 print-text-base">
                      {card.rollNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-300 block tracking-wider">
                      APPLICATION NUMBER
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-white print-text-sm">
                      {card.applicationNo}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-300 block tracking-wider">
                      ENROLLED CLASS
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white print-text-sm">
                      {card.currentClass}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-300 block tracking-wider">
                      TARGET STREAM
                    </span>
                    <span className="text-xs font-bold text-emerald-400 truncate block print-text-xs">
                      Foundation Batch
                    </span>
                  </div>
                </div>

                {/* Candidate Information & Photo Grid */}
                <div className="print-section p-4 sm:p-6 border-b border-slate-200">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] border-b border-slate-200 pb-1 mb-3 flex items-center justify-between">
                    <span>SECTION A: CANDIDATE IDENTITY RECORD</span>
                    <span className="text-[9px] font-normal text-slate-500 lowercase">verified institutional snapshot</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    {/* Candidate Details (Left 8 Cols) */}
                    <div className="sm:col-span-8 grid grid-cols-2 gap-y-3 gap-x-4 text-xs print-text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Candidate Full Name
                        </span>
                        <span className="text-sm font-black text-slate-900 block mt-0.5 print-text-sm">
                          {card.candidateName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Father&apos;s / Guardian&apos;s Name
                        </span>
                        <span className="text-xs font-bold text-slate-800 block mt-0.5 print-text-xs">
                          {card.fatherName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Date of Birth
                        </span>
                        <span className="text-xs font-bold text-slate-800 block mt-0.5 print-text-xs">
                          {card.dob}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Gender
                        </span>
                        <span className="text-xs font-bold text-slate-800 block mt-0.5 print-text-xs">
                          {card.gender}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Current School & City
                        </span>
                        <span className="text-xs font-bold text-slate-800 block mt-0.5 print-text-xs">
                          {card.schoolName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Registered Mobile
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-700 block mt-0.5 print-text-xs">
                          +91 {card.candidatePhone}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold uppercase text-[9px] block">
                          Registered Email
                        </span>
                        <span className="text-[11px] font-mono font-medium text-slate-700 block mt-0.5 truncate print-text-xs">
                          {card.candidateEmail}
                        </span>
                      </div>
                    </div>

                    {/* Candidate Photo Box & Security QR (Right 4 Cols - Side by side on print) */}
                    <div className="sm:col-span-4 flex flex-row sm:justify-end gap-3 shrink-0">
                      {/* Standard Passport Photo Frame */}
                      <div className="print-photo-box w-28 h-36 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center p-1 relative overflow-hidden shrink-0 shadow-inner">
                        {card.photoUrl ? (
                          <Image
                            src={card.photoUrl}
                            alt={card.candidateName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="space-y-1 flex flex-col items-center text-slate-400">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                              <User className="w-4 h-4" />
                            </div>
                            <span className="text-[8.5px] font-black uppercase tracking-wider text-slate-600 block">
                              PHOTO
                            </span>
                            <span className="text-[7.5px] text-slate-400 leading-tight block px-0.5">
                              Affix passport photo
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Digital Scannable Marker */}
                      <div className="print-qr-box w-26 h-36 bg-slate-50 border border-slate-200 rounded-lg p-1 text-center flex flex-col items-center justify-between shrink-0">
                        <div className="w-14 h-14 bg-white border border-slate-300 rounded p-0.5 flex items-center justify-center shadow-xs">
                          {/* Self-contained SVG Digital Verification Marker */}
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full text-slate-900"
                            fill="currentColor"
                            aria-label="Digital Verification QR Code"
                          >
                            <rect x="0" y="0" width="30" height="30" rx="3" fill="#0f172a" />
                            <rect x="6" y="6" width="18" height="18" fill="#ffffff" />
                            <rect x="10" y="10" width="10" height="10" fill="#0f172a" />

                            <rect x="70" y="0" width="30" height="30" rx="3" fill="#0f172a" />
                            <rect x="76" y="6" width="18" height="18" fill="#ffffff" />
                            <rect x="80" y="10" width="10" height="10" fill="#0f172a" />

                            <rect x="0" y="70" width="30" height="30" rx="4" fill="#0f172a" />
                            <rect x="6" y="76" width="18" height="18" fill="#ffffff" />
                            <rect x="10" y="80" width="10" height="10" fill="#0f172a" />

                            <rect x="40" y="10" width="8" height="8" fill="#f97316" />
                            <rect x="52" y="10" width="8" height="8" fill="#0f172a" />
                            <rect x="40" y="22" width="8" height="8" fill="#0f172a" />
                            <rect x="52" y="22" width="8" height="8" fill="#f97316" />

                            <rect x="10" y="40" width="8" height="8" fill="#0f172a" />
                            <rect x="22" y="40" width="8" height="8" fill="#f97316" />
                            <rect x="40" y="40" width="20" height="20" rx="2" fill="#0f172a" />
                            <rect x="45" y="45" width="10" height="10" fill="#f97316" />

                            <rect x="70" y="40" width="8" height="8" fill="#0f172a" />
                            <rect x="82" y="40" width="8" height="8" fill="#0f172a" />
                            <rect x="70" y="52" width="8" height="8" fill="#f97316" />
                            <rect x="82" y="52" width="8" height="8" fill="#0f172a" />

                            <rect x="40" y="70" width="8" height="8" fill="#0f172a" />
                            <rect x="52" y="70" width="8" height="8" fill="#0f172a" />
                            <rect x="40" y="82" width="8" height="8" fill="#f97316" />
                            <rect x="52" y="82" width="8" height="8" fill="#0f172a" />

                            <rect x="70" y="70" width="8" height="8" fill="#0f172a" />
                            <rect x="82" y="70" width="8" height="8" fill="#f97316" />
                            <rect x="70" y="82" width="8" height="8" fill="#0f172a" />
                            <rect x="82" y="82" width="8" height="8" fill="#0f172a" />
                          </svg>
                        </div>
                        <span className="text-[8px] font-black uppercase text-slate-700 block mt-0.5">
                          VERIFY PASS
                        </span>
                        <span className="text-[7px] font-mono text-slate-400 block truncate">
                          {card.verificationToken?.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section B: Examination Schedule & Centre Allotment */}
                <div className="print-section p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] border-b border-slate-200 pb-1 mb-2.5">
                    SECTION B: EXAMINATION SCHEDULE & ALLOTTED TEST CENTRE
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs print-text-xs">
                    {/* Exam Date */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-500 font-semibold text-[9px] uppercase">
                        <Calendar className="w-3 h-3 text-[var(--brand-accent)]" />
                        <span>Date of Examination</span>
                      </div>
                      <span className="text-xs font-extrabold text-[var(--brand-primary)] block print-text-sm">
                        {card.examDate}
                      </span>
                      <span className="text-[9.5px] text-emerald-700 font-semibold block">
                        Offline Classroom Test (OMR)
                      </span>
                    </div>

                    {/* Timings */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-500 font-semibold text-[9px] uppercase">
                        <Clock className="w-3 h-3 text-[var(--brand-accent)]" />
                        <span>Reporting & Exam Hours</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 block print-text-sm">
                        {card.examTime}
                      </span>
                      <span className="text-[9.5px] text-amber-700 font-bold block">
                        Reporting: {card.reportingTime} (Gate Closes: 09:50 AM)
                      </span>
                    </div>

                    {/* Centre */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-500 font-semibold text-[9px] uppercase">
                        <MapPin className="w-3 h-3 text-[var(--brand-accent)]" />
                        <span>Examination Centre</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 block print-text-sm">
                        {card.examCentre}
                      </span>
                      <span className="text-[9.5px] text-slate-600 block leading-tight">
                        {card.centreAddress}, PIN {card.centrePincode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section C: Instructions for Candidate */}
                <div className="print-section p-4 sm:p-6 border-b border-slate-200 text-xs">
                  <div className="font-bold uppercase tracking-wider text-[var(--brand-primary)] border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5 text-[10px] sm:text-xs">
                    <Info className="w-3 h-3 text-[var(--brand-accent)]" />
                    <span>SECTION C: IMPORTANT EXAMINATION DAY INSTRUCTIONS</span>
                  </div>

                  <ol className="print-compact-list list-decimal pl-4 space-y-1.5 text-[10px] sm:text-[10.5px] text-slate-700 leading-relaxed">
                    <li>
                      <strong>Mandatory Document:</strong> Candidates must bring a clean printed copy of this Admit Card along with their original School Identity Card or Aadhar Card.
                    </li>
                    <li>
                      <strong>Strict Reporting Time:</strong> Reporting time is <strong>09:30 AM</strong>. Entry gates close at <strong>09:50 AM</strong> sharp. No candidate will be admitted after gate closure.
                    </li>
                    <li>
                      <strong>Permitted Stationery:</strong> Darken answers on the OMR Sheet using <strong>Blue or Black Ballpoint Pen only</strong>. Pencils, gel pens, and correction fluid are prohibited.
                    </li>
                    <li>
                      <strong>Prohibited Articles:</strong> Mobile phones, electronic watches, calculators, bags, and loose study material are strictly forbidden inside the examination hall.
                    </li>
                    <li>
                      <strong>Seating & Attendance:</strong> Candidates must occupy only the seat allotted against their Official Roll Number (<strong>{card.rollNumber}</strong>) and sign the attendance sheet in the presence of the room invigilator.
                    </li>
                  </ol>
                </div>

                {/* Section D: Official Signature & Verification Sign-Off Area */}
                <div className="print-section p-4 sm:p-6 bg-slate-50/80">
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    SECTION D: VERIFICATION & SIGNATURE SIGN-OFF (FOR EXAM DAY USE)
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="print-sig-box border border-slate-300 rounded-lg bg-white p-2 flex flex-col justify-between h-22">
                      <div className="flex-1" />
                      <div className="border-t border-slate-300 pt-1">
                        <span className="text-[9px] font-bold text-slate-800 block">
                          Candidate&apos;s Signature
                        </span>
                        <span className="text-[7.5px] text-slate-400 block">
                          (Sign in presence of Invigilator)
                        </span>
                      </div>
                    </div>

                    <div className="print-sig-box border border-slate-300 rounded-lg bg-white p-2 flex flex-col justify-between h-22">
                      <div className="flex-1" />
                      <div className="border-t border-slate-300 pt-1">
                        <span className="text-[9px] font-bold text-slate-800 block">
                          Room Invigilator&apos;s Signature
                        </span>
                        <span className="text-[7.5px] text-slate-400 block">
                          (Verified Roll No & Identity)
                        </span>
                      </div>
                    </div>

                    <div className="print-sig-box border border-slate-300 rounded-lg bg-white p-2 flex flex-col justify-between h-22 relative">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[6px] font-extrabold uppercase text-slate-400 text-center leading-none p-0.5">
                          OFFICIAL SEAL
                        </div>
                      </div>
                      <div className="border-t border-slate-300 pt-1">
                        <span className="text-[9px] font-bold text-slate-800 block">
                          Controller of Examinations
                        </span>
                        <span className="text-[7.5px] text-slate-400 block">
                          Emprise Academy Mathura
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Document Footer Note */}
                  <div className="print-footer-note mt-3 pt-2 border-t border-slate-200 text-center text-[8px] sm:text-[9px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-1">
                    <span>Emprise Academy • Campus: Near Tera Tower, Bhuteshwar Road, Mathura - 281004</span>
                    <span>Helpline: +91 99999 99998 • Web: empriseacademy.com</span>
                  </div>
                </div>

                {/* Bottom Action Footer (Web Only) */}
                <div className="no-print p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Official Document Authenticated. Verification Token: <code className="font-mono text-[11px] text-slate-800">{card.verificationToken?.slice(0, 16)}...</code></span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Printer className="w-4 h-4" />}
                      onClick={() => window.print()}
                      className="flex-1 sm:flex-none"
                    >
                      Print Admit Card (A4)
                    </Button>
                    <Link
                      href={`/verify-admit-card/${card.verificationToken}`}
                      target="_blank"
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        rightIcon={<ExternalLink className="w-4 h-4" />}
                        className="w-full"
                      >
                        Verify Digital Pass
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <CreditCard className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Admit Card Issued Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have an active examination pass generated yet. Admit cards are published automatically upon ETSE examination registration.
            </p>
            <Link href="/etse-2026">
              <Button variant="primary" size="sm">
                Register for ETSE 2026
              </Button>
            </Link>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
