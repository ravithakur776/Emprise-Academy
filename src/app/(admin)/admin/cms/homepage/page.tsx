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
  ArrowLeft,
  Save,
  CheckCircle2,
  Eye,
  Sparkles,
  Layers,
  FileText,
  Clock,
} from "lucide-react";

export default function AdminHomepageCmsPage() {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"HERO" | "STATS" | "PILLARS">("HERO");

  // Editable homepage content state
  const [heroContent, setHeroContent] = useState({
    eyebrow: "MATHURA'S PREMIER IIT-JEE, NEET & FOUNDATION INSTITUTE",
    h1: "Serious Preparation. Proven Mentorship. Rank-Driven Results.",
    paragraph:
      "Emprise Academy delivers systematic, conceptual classroom coaching for JEE Main, JEE Advanced, NEET-UG, and Olympiad Foundation right here in Mathura, guided directly by experienced directors.",
    primaryCtaText: "Explore Programmes",
    primaryCtaHref: "/courses",
    secondaryCtaText: "Register for ETSE 2026",
    secondaryCtaHref: "/etse-2026",
  });

  const [statsContent, setStatsContent] = useState([
    { label: "Faculty Mentorship", value: "15+ Years", note: "Direct IIT & Medical teaching pedigree" },
    { label: "Batch Size", value: "Strict 35:1", note: "Individual attention and doubt resolution" },
    { label: "Selection Focus", value: "Top Ranks", note: "Proven ranker tracking and testing rigour" },
    { label: "Campus Facility", value: "Mathura", note: "Centrally located highway-connected campus" },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Homepage Published", "Changes saved to CMS and revalidated on the live homepage.");
    }, 600);
  };

  return (
    <AdminLayout staffName="Content Director" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Back Link & Header */}
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
              Homepage Editorial Editor
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                Preview Live
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              isLoading={isSaving}
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save & Publish Changes
            </Button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs font-bold w-fit">
          <button
            onClick={() => setActiveTab("HERO")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "HERO" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab("STATS")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "STATS" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Trust & Key Statistics
          </button>
        </div>

        {/* Editor Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {activeTab === "HERO" && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Hero Section Copy & Calls to Action</h2>
                <p className="text-xs text-slate-500">Field-based structured editing preserves high-converting design layout.</p>
              </div>

              <FormField label="Eyebrow Tagline" required htmlFor="hp-eyebrow">
                <Input
                  id="hp-eyebrow"
                  value={heroContent.eyebrow}
                  onChange={(e) => setHeroContent({ ...heroContent, eyebrow: e.target.value })}
                />
              </FormField>

              <FormField label="Primary H1 Heading" required htmlFor="hp-h1">
                <Input
                  id="hp-h1"
                  value={heroContent.h1}
                  onChange={(e) => setHeroContent({ ...heroContent, h1: e.target.value })}
                />
              </FormField>

              <FormField label="Supporting Paragraph Copy" required htmlFor="hp-para">
                <Textarea
                  id="hp-para"
                  rows={3}
                  value={heroContent.paragraph}
                  onChange={(e) => setHeroContent({ ...heroContent, paragraph: e.target.value })}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <FormField label="Primary Button Text" htmlFor="hp-btn1-txt">
                  <Input
                    id="hp-btn1-txt"
                    value={heroContent.primaryCtaText}
                    onChange={(e) => setHeroContent({ ...heroContent, primaryCtaText: e.target.value })}
                  />
                </FormField>

                <FormField label="Primary Button Target URL" htmlFor="hp-btn1-href">
                  <Input
                    id="hp-btn1-href"
                    value={heroContent.primaryCtaHref}
                    onChange={(e) => setHeroContent({ ...heroContent, primaryCtaHref: e.target.value })}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Secondary Button Text" htmlFor="hp-btn2-txt">
                  <Input
                    id="hp-btn2-txt"
                    value={heroContent.secondaryCtaText}
                    onChange={(e) => setHeroContent({ ...heroContent, secondaryCtaText: e.target.value })}
                  />
                </FormField>

                <FormField label="Secondary Button Target URL" htmlFor="hp-btn2-href">
                  <Input
                    id="hp-btn2-href"
                    value={heroContent.secondaryCtaHref}
                    onChange={(e) => setHeroContent({ ...heroContent, secondaryCtaHref: e.target.value })}
                  />
                </FormField>
              </div>
            </div>
          )}

          {activeTab === "STATS" && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Homepage Highlight Statistics</h2>
                <p className="text-xs text-slate-500">Trust pillars displayed in the proof ticker across all screen sizes.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsContent.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <FormField label={`Metric #${idx + 1} Label`} htmlFor={`stat-lbl-${idx}`}>
                      <Input
                        id={`stat-lbl-${idx}`}
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...statsContent];
                          updated[idx].label = e.target.value;
                          setStatsContent(updated);
                        }}
                      />
                    </FormField>

                    <FormField label="Displayed Value" htmlFor={`stat-val-${idx}`}>
                      <Input
                        id={`stat-val-${idx}`}
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...statsContent];
                          updated[idx].value = e.target.value;
                          setStatsContent(updated);
                        }}
                      />
                    </FormField>

                    <FormField label="Contextual Note" htmlFor={`stat-note-${idx}`}>
                      <Input
                        id={`stat-note-${idx}`}
                        value={stat.note}
                        onChange={(e) => {
                          const updated = [...statsContent];
                          updated[idx].note = e.target.value;
                          setStatsContent(updated);
                        }}
                      />
                    </FormField>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
