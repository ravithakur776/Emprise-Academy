"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { CANONICAL_COURSES, CanonicalCourseItem, CanonicalProgrammeId } from "@/data/courses";
import { BookOpen, CheckCircle2, Eye, Filter, Sparkles } from "lucide-react";

export default function AdminCoursesPage() {
  const toast = useToast();
  const [courses, setCourses] = useState<CanonicalCourseItem[]>(CANONICAL_COURSES);
  const [filterProgramme, setFilterProgramme] = useState<"ALL" | CanonicalProgrammeId>("ALL");

  const toggleCourseStatus = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
    toast.success("Course Visibility Updated", "Course publication state toggled.");
  };

  const filteredCourses = filterProgramme === "ALL"
    ? courses
    : courses.filter((c) => c.programmeId === filterProgramme);

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
              Course & Programme Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/courses" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Courses Directory
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filterProgramme === "ALL" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterProgramme("ALL")}
          >
            All Programmes ({courses.length})
          </Button>
          <Button
            variant={filterProgramme === "JEE" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterProgramme("JEE")}
          >
            IIT-JEE ({courses.filter((c) => c.programmeId === "JEE").length})
          </Button>
          <Button
            variant={filterProgramme === "NEET" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterProgramme("NEET")}
          >
            NEET-UG ({courses.filter((c) => c.programmeId === "NEET").length})
          </Button>
          <Button
            variant={filterProgramme === "FOUNDATION" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterProgramme("FOUNDATION")}
          >
            Foundation ({courses.filter((c) => c.programmeId === "FOUNDATION").length})
          </Button>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Order / Course Name</th>
                  <th className="p-3.5">Programme Stream</th>
                  <th className="p-3.5">Eligible Class</th>
                  <th className="p-3.5">Core Subjects</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <span className="text-slate-400 font-mono text-[10px] block">#{c.displayOrder}</span>
                      <strong className="block text-slate-900 font-bold">{c.name}</strong>
                      <span className="text-[11px] font-mono text-slate-400">{c.publicUrl}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge
                        variant={c.programmeId === "JEE" ? "primary" : c.programmeId === "NEET" ? "accent" : "gold"}
                        size="sm"
                      >
                        {c.programmeName}
                      </Badge>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800">{c.targetClass}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.subjects.map((sub, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => toggleCourseStatus(c.id)}
                        className="cursor-pointer"
                        title="Toggle status"
                      >
                        <Badge variant={c.isPublished ? "success" : "muted"} size="sm">
                          {c.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </button>
                    </td>

                    <td className="p-3.5 pr-6 text-right space-x-2">
                      <Link href={c.publicUrl} target="_blank">
                        <Button variant="ghost" size="sm">
                          View Page
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCourseStatus(c.id)}
                      >
                        {c.isPublished ? "Unpublish" : "Publish"}
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
