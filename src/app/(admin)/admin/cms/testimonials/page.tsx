"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Sparkles,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Trophy,
  User,
  Quote,
} from "lucide-react";

export default function AdminTestimonialsCmsPage() {
  const toast = useToast();

  const [testimonials, setTestimonials] = useState([
    {
      id: "test-1",
      authorName: "Atul Dagur",
      authorType: "STUDENT",
      exam: "IIT-JEE Advanced",
      academicYear: "2026",
      rankText: "AIR 284",
      quote:
        "The direct classroom mentorship by Rakesh Sir and Sushil Sir made all the difference. Conceptual clarity in Physics and deep algebra drills gave me the confidence to secure a top rank.",
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "test-2",
      authorName: "Dr. Alok Verma",
      authorType: "PARENT",
      exam: "NEET-UG",
      academicYear: "2026",
      rankText: "Parent of Aarav Verma",
      quote:
        "The discipline, regular parent communication, and strict doubt clearing sessions at Emprise Academy provided exactly the structured environment my child needed.",
      isFeatured: true,
      isPublished: true,
    },
  ]);

  const togglePublished = (id: string) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, isPublished: !t.isPublished } : t))
    );
    toast.success("Testimonial Updated", "Visibility toggled successfully.");
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
              Testimonials & Student Stories CMS
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/results" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Results & Stories
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {t.authorType} REVIEW
                  </Badge>
                  <Badge variant={t.isPublished ? "success" : "muted"} size="sm">
                    {t.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div>
                  <strong className="block text-slate-900 font-bold text-base">{t.authorName}</strong>
                  <span className="text-xs text-[var(--brand-accent)] font-semibold">{t.exam} • {t.rankText}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Badge variant={t.isFeatured ? "gold" : "muted"} size="sm">
                  {t.isFeatured ? "Featured on Home" : "Standard"}
                </Badge>

                <Button variant="ghost" size="sm" onClick={() => togglePublished(t.id)}>
                  {t.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
