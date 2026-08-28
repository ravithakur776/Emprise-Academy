"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  BookOpen,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Calendar,
  User,
} from "lucide-react";

export default function AdminBlogCmsPage() {
  const toast = useToast();

  const [posts, setPosts] = useState([
    {
      id: "blog-1",
      title: "How to Build Speed and Accuracy for JEE Advanced Numerical Problems",
      slug: "jee-advanced-numerical-speed-accuracy",
      category: "JEE PREPARATION",
      author: "Rakesh Kumar",
      publishDate: "20 August 2026",
      status: "PUBLISHED",
      views: 420,
    },
    {
      id: "blog-2",
      title: "Essential NCERT Biology Revision Strategy for NEET-UG 2027 Aspirants",
      slug: "ncert-biology-revision-neet-2027",
      category: "NEET PREPARATION",
      author: "Academic Team",
      publishDate: "22 August 2026",
      status: "PUBLISHED",
      views: 310,
    },
    {
      id: "blog-3",
      title: "Why Class 8 and 9 Foundation Matters for Future Competitive Success",
      slug: "class-8-9-foundation-importance",
      category: "FOUNDATION",
      author: "Sushil Dagur",
      publishDate: "25 August 2026",
      status: "PUBLISHED",
      views: 280,
    },
  ]);

  const toggleStatus = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }
          : p
      )
    );
    toast.success("Blog Post Updated", "Visibility toggled successfully.");
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
              Blog & Editorial Articles CMS
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/blog" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Article Title & Slug</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Published Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold text-sm leading-snug">
                        {p.title}
                      </strong>
                      <span className="font-mono text-[11px] text-slate-400">/{p.slug}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant="primary" size="sm">
                        {p.category}
                      </Badge>
                    </td>

                    <td className="p-3.5 text-slate-700 font-medium">
                      {p.author}
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {p.publishDate}
                    </td>

                    <td className="p-3.5">
                      <Badge variant={p.status === "PUBLISHED" ? "success" : "muted"} size="sm">
                        {p.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(p.id)}>
                        {p.status === "PUBLISHED" ? "Unpublish" : "Publish"}
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
