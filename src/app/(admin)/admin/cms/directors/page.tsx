"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { getCanonicalDirectorsList } from "@/data/directors";
import { DirectorPhoto } from "@/components/directors/DirectorPhoto";
import {
  ShieldCheck,
  ArrowLeft,
  Eye,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Quote,
} from "lucide-react";

export default function AdminDirectorsCmsPage() {
  const toast = useToast();
  const [directors, setDirectors] = useState(getCanonicalDirectorsList());

  const togglePublished = (id: string) => {
    setDirectors(
      directors.map((d) => (d.id === id ? { ...d, isPublished: !d.isPublished } : d))
    );
    toast.success("Director Visibility Updated", "Profile publish state toggled.");
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={d.slug === "sushil-dagur" ? "primary" : "accent"} size="sm">
                    Order #{d.displayOrder}
                  </Badge>
                  <Badge variant={d.isPublished ? "success" : "muted"} size="sm">
                    {d.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div className="flex items-start gap-4">
                  <DirectorPhoto
                    photoUrl={d.photoUrl}
                    name={d.name}
                    designation={d.designation}
                    aspectRatio="square"
                    className="w-16 h-16 shrink-0 !rounded-xl text-xs"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{d.name}</h2>
                    <span className="text-xs font-bold text-[var(--brand-accent)] block">
                      {d.designation}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {d.qualification} • {d.institution}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-l-[var(--brand-accent)] text-xs text-slate-700 leading-relaxed italic">
                  <Quote className="w-3.5 h-3.5 text-[var(--brand-accent)] inline mr-1" />
                  &ldquo;{d.quote}&rdquo;
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Career Milestones
                  </span>
                  {d.professionalJourney.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{item.companyOrContext}:</strong> {item.roleSummary}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link href={`/directors/${d.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    View Public Bio →
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
