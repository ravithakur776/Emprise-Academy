"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { createClientBrowser } from "@/lib/supabase/client";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
  Award,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronRight,
  Sparkles,
  Trophy,
  CreditCard,
  Globe,
  FileText,
  ShieldCheck,
  HelpCircle,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminLayoutProps {
  children: React.ReactNode;
  staffName?: string;
  staffRole?: "SUPER_ADMIN" | "DIRECTOR" | "ADMISSION_ADMIN" | "COUNSELLOR";
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navSections = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
    ],
  },
  {
    title: "ADMISSIONS CRM",
    items: [
      {
        label: "Leads & Enquiries",
        href: "/admin/leads",
        icon: PhoneCall,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
      {
        label: "Follow-ups",
        href: "/admin/follow-ups",
        icon: Calendar,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
      {
        label: "Admissions",
        href: "/admin/admissions",
        icon: GraduationCap,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
      {
        label: "Students",
        href: "/admin/students",
        icon: Users,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN"],
      },
    ],
  },
  {
    title: "ACADEMIC",
    items: [
      {
        label: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN"],
      },
      {
        label: "Batches",
        href: "/admin/batches",
        icon: Layers,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN"],
      },
    ],
  },
  {
    title: "EXAMINATION",
    items: [
      {
        label: "Results & Import",
        href: "/admin/results",
        icon: Trophy,
        roles: ["SUPER_ADMIN", "DIRECTOR", "EXAM_ADMIN"],
      },
      {
        label: "Admit Cards",
        href: "/admin/admit-cards",
        icon: CreditCard,
        roles: ["SUPER_ADMIN", "DIRECTOR", "EXAM_ADMIN"],
      },
      {
        label: "ETSE 2026",
        href: "/admin/etse",
        icon: Award,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
    ],
  },
  {
    title: "CONTENT & CMS",
    items: [
      {
        label: "CMS Hub",
        href: "/admin/cms",
        icon: Globe,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Homepage",
        href: "/admin/cms/homepage",
        icon: FileText,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Faculty",
        href: "/admin/cms/faculty",
        icon: Users,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Directors",
        href: "/admin/cms/directors",
        icon: ShieldCheck,
        roles: ["SUPER_ADMIN", "DIRECTOR"],
      },
      {
        label: "Testimonials",
        href: "/admin/cms/testimonials",
        icon: Sparkles,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "FAQ",
        href: "/admin/cms/faq",
        icon: HelpCircle,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Blog Posts",
        href: "/admin/cms/blog",
        icon: BookOpen,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Gallery & Media",
        href: "/admin/cms/gallery",
        icon: Image,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "Announcements",
        href: "/admin/cms/announcements",
        icon: Bell,
        roles: ["SUPER_ADMIN", "DIRECTOR", "CONTENT_MANAGER"],
      },
      {
        label: "SEO & Settings",
        href: "/admin/cms/seo",
        icon: Settings,
        roles: ["SUPER_ADMIN", "DIRECTOR"],
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
        roles: ["SUPER_ADMIN", "DIRECTOR", "ADMISSION_ADMIN", "COUNSELLOR"],
      },
      {
        label: "Settings & Audit",
        href: "/admin/settings",
        icon: Settings,
        roles: ["SUPER_ADMIN", "DIRECTOR"],
      },
    ],
  },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  staffName = "Admissions Office",
  staffRole = "ADMISSION_ADMIN",
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const supabase = createClientBrowser();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    router.push("/admin/login");
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "DIRECTOR":
        return "bg-amber-100 text-amber-900 border-amber-200";
      case "ADMISSION_ADMIN":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "COUNSELLOR":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 antialiased font-sans">
        {/* Desktop Left Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-800">
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2 select-none" aria-label="Emprise Academy Admin Dashboard">
              <EmpriseLogo variant="on-dark" size="sm" />
            </Link>
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md">
              ADMIN
            </span>
          </div>

          {/* Staff Info Banner */}
          <div className="px-4 py-3 mx-3 my-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-white/10">
              {staffName.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <span className="font-bold text-xs text-white block truncate">
                {staffName}
              </span>
              <span className={cn("text-[9px] font-bold px-1.5 py-0.2 inline-block rounded-md border mt-0.5", getRoleBadgeStyle(staffRole))}>
                {staffRole.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex-1 px-3 py-2 space-y-4">
            {navSections.map((section) => {
              const visibleItems = section.items.filter((item) =>
                item.roles.includes(staffRole)
              );

              if (visibleItems.length === 0) return null;

              return (
                <div key={section.title} className="space-y-1">
                  <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </div>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                          isActive
                            ? "bg-[var(--brand-accent)] text-white shadow-xs font-bold"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500")} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 select-none" aria-label="Emprise Academy Admin Dashboard">
            <EmpriseLogo variant="on-dark" size="xs" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900 text-slate-300 p-4 space-y-3 z-30 border-b border-slate-800 shadow-xl animate-fade-in">
            {navSections.map((section) => {
              const visibleItems = section.items.filter((item) =>
                item.roles.includes(staffRole)
              );

              if (visibleItems.length === 0) return null;

              return (
                <div key={section.title} className="space-y-1">
                  <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </div>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold",
                          isActive
                            ? "bg-[var(--brand-accent)] text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </Link>
                    );
                  })}
                </div>
              );
            })}

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
  );
};
