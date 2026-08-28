"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Image,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Upload,
} from "lucide-react";

export default function AdminGalleryCmsPage() {
  const toast = useToast();

  const [items, setItems] = useState([
    {
      id: "gal-1",
      title: "Main Classroom & Interactive Teaching",
      category: "CLASSROOM",
      altText: "Spacious air-conditioned classroom at Emprise Academy Mathura",
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "gal-2",
      title: "Dedicated Faculty Mentorship Desk",
      category: "FACULTY",
      altText: "1-on-1 doubt clearing counters with senior faculty mentors",
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "gal-3",
      title: "Academic Felicitation & Rankers Ceremony",
      category: "ACHIEVEMENTS",
      altText: "Directors felicitating JEE & NEET qualifying students",
      isPublished: true,
      displayOrder: 3,
    },
  ]);

  const toggleStatus = (id: string) => {
    setItems(
      items.map((it) =>
        it.id === id ? { ...it, isPublished: !it.isPublished } : it
      )
    );
    toast.success("Gallery Asset Updated", "Visibility toggled successfully.");
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
              Campus Media Gallery CMS
            </h1>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {item.category}
                  </Badge>
                  <Badge variant={item.isPublished ? "success" : "muted"} size="sm">
                    {item.isPublished ? "Live" : "Draft"}
                  </Badge>
                </div>

                <div className="h-28 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <Image className="w-8 h-8 opacity-40" />
                </div>

                <strong className="block text-slate-900 font-bold text-sm">
                  {item.title}
                </strong>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Alt: {item.altText}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => toggleStatus(item.id)}>
                  {item.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
