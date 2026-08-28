"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  HelpCircle,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Filter,
  Plus,
} from "lucide-react";

export default function AdminFaqCmsPage() {
  const toast = useToast();
  const [pageFilter, setPageFilter] = useState("ALL");

  const [faqs, setFaqs] = useState([
    {
      id: "faq-1",
      question: "Who teaches the physics and mathematics classes at Emprise Academy?",
      answer: "All core classes in Physics and Mathematics are taken directly by the Academic Directors, Rakesh Kumar and Sushil Dagur, ensuring unmatched consistency and mentorship.",
      category: "HOMEPAGE",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "faq-2",
      question: "How are doubt clearance sessions scheduled?",
      answer: "Daily dedicated 1-on-1 doubt clearing counters operate from 02:00 PM to 07:30 PM under direct faculty supervision.",
      category: "JEE",
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "faq-3",
      question: "What is the format and fee for ETSE 2026?",
      answer: "ETSE 2026 is an offline pen-and-paper (OMR) talent search examination with ₹0 registration fee for all eligible students of Classes 7, 8, 9, and 10.",
      category: "ETSE",
      displayOrder: 3,
      isPublished: true,
    },
  ]);

  const filteredFaqs = faqs.filter(
    (f) => pageFilter === "ALL" || f.category === pageFilter
  );

  const togglePublished = (id: string) => {
    setFaqs(
      faqs.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f))
    );
    toast.success("FAQ Updated", "Visibility toggled successfully.");
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
              Frequently Asked Questions (FAQ) CMS
            </h1>
          </div>

          <div className="w-full sm:w-56">
            <Select
              id="faq-filter"
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Page Categories" },
                { value: "HOMEPAGE", label: "Homepage FAQs" },
                { value: "JEE", label: "IIT-JEE FAQs" },
                { value: "NEET", label: "NEET-UG FAQs" },
                { value: "FOUNDATION", label: "Foundation FAQs" },
                { value: "ETSE", label: "ETSE FAQs" },
              ]}
            />
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {f.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    Order #{f.displayOrder}
                  </span>
                </div>

                <Badge variant={f.isPublished ? "success" : "muted"} size="sm">
                  {f.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {f.question}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                {f.answer}
              </p>

              <div className="pt-2 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => togglePublished(f.id)}>
                  {f.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
