"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Users,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Edit,
  Sparkles,
} from "lucide-react";

export default function AdminFacultyCmsPage() {
  const toast = useToast();

  const [faculty, setFaculty] = useState([
    {
      id: "fac-1",
      name: "Rakesh Kumar",
      slug: "rakesh-kumar",
      designation: "Academic Director & Head of Physics",
      subject: "Physics",
      qualification: "B.Tech, Senior Physics Pedagogy",
      experience: "15+ Years",
      specialization: "Mechanics, Electrodynamics & Advanced Problem Solving",
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "fac-2",
      name: "Sushil Dagur",
      slug: "sushil-dagur",
      designation: "Managing Director & Head of Mathematics",
      subject: "Mathematics",
      qualification: "M.Sc Mathematics, IIT-JEE Mentor",
      experience: "15+ Years",
      specialization: "Calculus, Coordinate Geometry & Algebra Rigour",
      isPublished: true,
      displayOrder: 2,
    },
  ]);

  const togglePublished = (id: string) => {
    setFaculty(
      faculty.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f))
    );
    toast.success("Visibility Updated", "Faculty mentor visibility toggled.");
  };

  return (
    <AdminLayout staffName="Content Director" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to CMS Modules</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Faculty Directory Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/faculty" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Faculty Roster
              </Button>
            </Link>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Order / Mentor</th>
                  <th className="p-3.5">Subject & Designation</th>
                  <th className="p-3.5">Qualifications</th>
                  <th className="p-3.5">Experience</th>
                  <th className="p-3.5">Specialisation</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <span className="text-slate-400 font-mono text-[10px] block">#{f.displayOrder}</span>
                      <strong className="text-slate-900 font-bold text-sm block">{f.name}</strong>
                      <span className="font-mono text-[11px] text-slate-400">/{f.slug}</span>
                    </td>

                    <td className="p-3.5">
                      <strong className="text-[var(--brand-primary)] font-bold block">{f.subject}</strong>
                      <span className="text-slate-600 text-[11px]">{f.designation}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-medium">{f.qualification}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-slate-900">{f.experience}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-600 text-[11px] block max-w-xs">{f.specialization}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={f.isPublished ? "success" : "muted"} size="sm">
                        {f.isPublished ? "Live" : "Draft"}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublished(f.id)}
                      >
                        {f.isPublished ? "Unpublish" : "Publish"}
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
