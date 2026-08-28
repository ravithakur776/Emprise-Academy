"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ShieldCheck,
  ArrowLeft,
  Eye,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function AdminDirectorsCmsPage() {
  const toast = useToast();

  const [directors, setDirectors] = useState([
    {
      id: "dir-1",
      name: "Rakesh Kumar",
      slug: "rakesh-kumar",
      designation: "Academic Director",
      subject: "Physics",
      qualification: "B.Tech, 15+ Years Mentorship Experience",
      teachingPhilosophy:
        "Physics is not memorization; it is the fundamental language of physical phenomena. When concepts are visualized clearly, numerical problem-solving becomes second nature.",
      leadershipRole: "Academic Dean & Physics Course Authority",
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "dir-2",
      name: "Sushil Dagur",
      slug: "sushil-dagur",
      designation: "Managing Director",
      subject: "Mathematics",
      qualification: "M.Sc Mathematics, 15+ Years Pedagogy",
      teachingPhilosophy:
        "Mathematics in competitive exams demands structural clarity and multi-step deduction. Rigour in daily practice transforms anxiety into competitive advantage.",
      leadershipRole: "Operational Head & Mathematics Pedagogy Authority",
      isPublished: true,
      displayOrder: 2,
    },
  ]);

  const togglePublished = (id: string) => {
    setDirectors(
      directors.map((d) => (d.id === id ? { ...d, isPublished: !d.isPublished } : d))
    );
    toast.success("Director Profile Updated", "Visibility toggled successfully.");
  };

  return (
    <AdminLayout staffName="Super Admin" staffRole="SUPER_ADMIN">
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
              Academic Directors Authority CMS
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/directors" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Directors Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Directors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directors.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">
                    {d.designation}
                  </Badge>
                  <Badge variant={d.isPublished ? "success" : "muted"} size="sm">
                    {d.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{d.name}</h2>
                  <span className="text-xs font-bold text-[var(--brand-primary)] block mt-0.5">
                    {d.leadershipRole}
                  </span>
                  <span className="text-[11px] text-slate-500 block">{d.qualification}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                  "{d.teachingPhilosophy}"
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link href={`/directors/${d.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    View Public Bio
                  </Button>
                </Link>

                <Button variant="outline" size="sm" onClick={() => togglePublished(d.id)}>
                  {d.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
