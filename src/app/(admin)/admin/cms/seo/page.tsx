"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Textarea } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Settings,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Save,
  Search,
} from "lucide-react";

export default function AdminSeoCmsPage() {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("/");

  const [seoPages, setSeoPages] = useState<Record<string, any>>({
    "/": {
      title: "IIT-JEE & NEET Coaching in Mathura | Emprise Academy",
      description: "Premier IIT-JEE, NEET-UG & Foundation coaching in Mathura. Guided directly by senior expert directors with 15+ years experience.",
      canonical: "https://empriseacademy.com",
      noindex: false,
    },
    "/iit-jee-coaching-mathura": {
      title: "Best IIT-JEE Coaching in Mathura | JEE Main & Advanced Preparation | Emprise Academy",
      description: "Best IIT-JEE coaching institute in Mathura for Class 11, Class 12 & Dropper students. Conceptual clarity, rigorous testing, and direct mentorship.",
      canonical: "https://empriseacademy.com/iit-jee-coaching-mathura",
      noindex: false,
    },
    "/neet-coaching-mathura": {
      title: "Best NEET Coaching in Mathura | NEET-UG Medical Preparation | Emprise Academy",
      description: "Best NEET coaching institute in Mathura for Class 11, 12 & Dropper aspirants. NCERT-focused biology, physics numerical mastery, and chemistry precision.",
      canonical: "https://empriseacademy.com/neet-coaching-mathura",
      noindex: false,
    },
    "/foundation-coaching-mathura": {
      title: "Best Foundation Coaching in Mathura | Class 8, 9 & 10 IIT/NEET Foundation | Emprise Academy",
      description: "Best Foundation coaching institute in Mathura for Class 8, 9 & 10 students. Build strong conceptual fundamentals for Olympiads, NTSE, IIT-JEE & NEET.",
      canonical: "https://empriseacademy.com/foundation-coaching-mathura",
      noindex: false,
    },
    "/etse-2026": {
      title: "ETSE 2026 | Emprise Talent Search Exam Mathura | Registration & Scholarship",
      description: "Register for ETSE 2026 - Emprise Talent Search Examination for Classes 7, 8, 9 & 10 in Mathura. Win up to 100% scholarship. Zero registration fee.",
      canonical: "https://empriseacademy.com/etse-2026",
      noindex: false,
    },
  });

  const currentPage = seoPages[selectedRoute] || seoPages["/"];

  const handleUpdate = (field: string, val: any) => {
    setSeoPages({
      ...seoPages,
      [selectedRoute]: {
        ...currentPage,
        [field]: val,
      },
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("SEO Metadata Saved", `Updated search engine metadata for route ${selectedRoute}.`);
    }, 500);
  };

  const titleLength = (currentPage.title || "").length;
  const descLength = (currentPage.description || "").length;

  return (
    <AdminLayout staffName="Super Admin" staffRole="SUPER_ADMIN">
      <div className="space-y-6 max-w-4xl mx-auto">
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
              SEO & Metadata Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              isLoading={isSaving}
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save SEO Record
            </Button>
          </div>
        </div>

        {/* Route Selector */}
        <div className="flex flex-wrap gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs font-bold">
          {Object.keys(seoPages).map((route) => (
            <button
              key={route}
              onClick={() => setSelectedRoute(route)}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                selectedRoute === route
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {route}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Page Meta Configuration: {selectedRoute}</h2>
              <span className="text-xs text-slate-500">Google SERP presentation & canonical URLs.</span>
            </div>
            <Badge variant="primary" size="sm">
              Production Verified
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Page Title Tag (Recommended: 50–60 chars)</label>
              <span className={`font-mono font-bold ${titleLength > 65 ? "text-amber-600" : "text-emerald-700"}`}>
                {titleLength} chars
              </span>
            </div>
            <Input
              id="seo-title"
              value={currentPage.title}
              onChange={(e) => handleUpdate("title", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Meta Description (Recommended: 120–160 chars)</label>
              <span className={`font-mono font-bold ${descLength > 165 ? "text-amber-600" : "text-emerald-700"}`}>
                {descLength} chars
              </span>
            </div>
            <Textarea
              id="seo-desc"
              rows={3}
              value={currentPage.description}
              onChange={(e) => handleUpdate("description", e.target.value)}
            />
          </div>

          <FormField label="Canonical URL" htmlFor="seo-canonical">
            <Input
              id="seo-canonical"
              value={currentPage.canonical}
              onChange={(e) => handleUpdate("canonical", e.target.value)}
            />
          </FormField>

          {/* Search Result Snippet Preview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              GOOGLE SEARCH PREVIEW
            </span>
            <div className="text-xs text-slate-500 font-mono">{currentPage.canonical}</div>
            <h3 className="text-sm font-bold text-blue-700 hover:underline cursor-pointer leading-tight">
              {currentPage.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {currentPage.description}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
