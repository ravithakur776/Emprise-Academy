"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { BookOpen, Plus, CheckCircle2, Edit, Eye, Search } from "lucide-react";

export default function AdminCoursesPage() {
  const toast = useToast();
  const [courses, setCourses] = useState([
    {
      id: "crs-1",
      slug: "iit-jee-coaching-mathura",
      name: "IIT-JEE 2-Year Classroom Integrated Programme",
      targetExam: "JEE (Main & Advanced)",
      eligibleClasses: ["Class 11"],
      duration: "2 Academic Years",
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "crs-2",
      slug: "iit-jee-coaching-mathura/dropper",
      name: "IIT-JEE 1-Year Dropper / Repeater Rankers Target",
      targetExam: "JEE (Main & Advanced)",
      eligibleClasses: ["Dropper"],
      duration: "1 Academic Year",
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "crs-3",
      slug: "neet-coaching-mathura",
      name: "NEET-UG 2-Year Comprehensive Classroom Programme",
      targetExam: "NEET-UG",
      eligibleClasses: ["Class 11"],
      duration: "2 Academic Years",
      isActive: true,
      displayOrder: 3,
    },
    {
      id: "crs-4",
      slug: "foundation-coaching-mathura",
      name: "Foundation Olympiad & Science Aptitude (Classes 8–10)",
      targetExam: "School Boards & Olympiads (NSEJS, PRMO)",
      eligibleClasses: ["Class 8", "Class 9", "Class 10"],
      duration: "1 to 3 Academic Years",
      isActive: true,
      displayOrder: 4,
    },
  ]);

  const toggleCourseStatus = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    toast.success("Course Updated", "Course visibility updated.");
  };

  return (
    <AdminLayout staffName="Academic Administrator" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              ACADEMIC OFFERINGS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Course Management
            </h1>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Course Name</th>
                  <th className="p-3.5">Target Exam</th>
                  <th className="p-3.5">Eligible Classes</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{c.name}</strong>
                      <span className="text-[11px] font-mono text-slate-400">/{c.slug}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold">{c.targetExam}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.eligibleClasses.map((cls, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-600">{c.duration}</span>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => toggleCourseStatus(c.id)}
                        className="cursor-pointer"
                        title="Toggle status"
                      >
                        <Badge variant={c.isActive ? "success" : "muted"} size="sm">
                          {c.isActive ? "Published" : "Draft"}
                        </Badge>
                      </button>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCourseStatus(c.id)}
                      >
                        {c.isActive ? "Unpublish" : "Publish"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
