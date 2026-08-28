"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Globe,
  FileText,
  Users,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  BookOpen,
  Image,
  Bell,
  Settings,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminCmsDashboardPage() {
  const toast = useToast();

  const cmsSections = [
    {
      title: "Homepage Editorial",
      description: "Hero banner, trust indicators, academic pillars, and conversion triggers.",
      href: "/admin/cms/homepage",
      icon: FileText,
      count: "1 Active Version",
      status: "PUBLISHED",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Faculty Mentors",
      description: "Subject matter experts, academic qualifications, experience, and bios.",
      href: "/admin/cms/faculty",
      icon: Users,
      count: "2 Verified Faculty",
      status: "PUBLISHED",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Academic Directors",
      description: "Founder credentials, teaching philosophy, leadership vision, and bios.",
      href: "/admin/cms/directors",
      icon: ShieldCheck,
      count: "2 Directors",
      status: "PUBLISHED",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Testimonials & Stories",
      description: "Authentic student and parent success accounts with exam and rank metadata.",
      href: "/admin/cms/testimonials",
      icon: Sparkles,
      count: "6 Published Reviews",
      status: "PUBLISHED",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Frequently Asked Questions",
      description: "Structured academic FAQs associated with JEE, NEET, Foundation, and ETSE.",
      href: "/admin/cms/faq",
      icon: HelpCircle,
      count: "18 FAQs",
      status: "PUBLISHED",
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      title: "Blog & Academic Articles",
      description: "Editorial prep guidance, exam strategies, and syllabus deep dives.",
      href: "/admin/cms/blog",
      icon: BookOpen,
      count: "3 Articles",
      status: "PUBLISHED",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      title: "Campus Media Gallery",
      description: "Authentic campus infrastructure, classroom photos, and celebration events.",
      href: "/admin/cms/gallery",
      icon: Image,
      count: "12 Assets",
      status: "PUBLISHED",
      color: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      title: "Announcements & Banners",
      description: "Urgent admissions alerts, ETSE countdown notices, and batch start dates.",
      href: "/admin/cms/announcements",
      icon: Bell,
      count: "2 Active Banners",
      status: "PUBLISHED",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      title: "Global SEO & Meta Settings",
      description: "Site-wide and page-level title tags, meta descriptions, canonicals, and OG images.",
      href: "/admin/cms/seo",
      icon: Settings,
      count: "14 Page Records",
      status: "VERIFIED",
      color: "bg-slate-100 text-slate-700 border-slate-200",
    },
  ];

  return (
    <AdminLayout staffName="Content Director" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              INSTITUTIONAL CONTENT CONTROL
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Content Management System (CMS)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Site
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Published Items</span>
            <div className="text-2xl font-black text-slate-900">46</div>
            <span className="text-[10px] text-slate-500">Across 9 CMS Modules</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Live Status</span>
            <div className="text-2xl font-black text-emerald-700">100%</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Zero broken links</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Draft / Review</span>
            <div className="text-2xl font-black text-blue-700">2</div>
            <span className="text-[10px] text-blue-600 font-semibold">Pending approval</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Last Publication</span>
            <div className="text-xl font-bold text-slate-900">Today, 04:30 PM</div>
            <span className="text-[10px] text-slate-500">By Rakesh Kumar</span>
          </div>
        </div>

        {/* CMS Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cmsSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center border", sec.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="muted" size="sm">
                      {sec.count}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[var(--brand-primary)] transition-colors">
                      {sec.title}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {sec.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {sec.status}
                  </span>

                  <Link href={sec.href}>
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
