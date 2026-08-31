"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { createClientBrowser } from "@/lib/supabase/client";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Trophy,
  Bell,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentLayoutProps {
  children: React.ReactNode;
  studentName?: string;
  studentClass?: string;
  applicationNo?: string;
}

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Applications", href: "/student/applications", icon: FileText },
  { label: "Admit Cards", href: "/student/admit-cards", icon: CreditCard },
  { label: "Results & Marks", href: "/student/results", icon: Trophy },
  { label: "Notifications", href: "/student/notifications", icon: Bell },
  { label: "My Documents", href: "/student/documents", icon: FolderOpen },
  { label: "My Profile", href: "/student/profile", icon: User },
];

export const StudentLayout: React.FC<StudentLayoutProps> = ({
  children,
  studentName,
  studentClass,
  applicationNo,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [identity, setIdentity] = useState({
    name: studentName || "Student",
    class: studentClass || "Class 12",
    applicationNo: applicationNo || "ID: Pending",
  });

  useEffect(() => {
    if (studentName && studentName !== "Student") {
      setIdentity({
        name: studentName,
        class: studentClass || "Class 12",
        applicationNo: applicationNo || "ID: Pending",
      });
      return;
    }

    async function fetchIdentity() {
      try {
        const supabase = createClientBrowser();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data: studentProf } = await (supabase
          .from("student_profiles") as any)
          .select("full_name, current_class, admission_number")
          .eq("user_id", user.id)
          .maybeSingle();

        const { data: userProf } = await (supabase
          .from("user_profiles") as any)
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

        const { data: appRecord } = await (supabase
          .from("etse_registrations") as any)
          .select("application_number")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const resolvedName =
          studentProf?.full_name ||
          userProf?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Student";

        const resolvedClass = studentProf?.current_class || studentClass || "Class 12";
        const resolvedAppNo =
          appRecord?.application_number ||
          studentProf?.admission_number ||
          applicationNo ||
          "ETSE Portal";

        setIdentity({
          name: resolvedName,
          class: resolvedClass,
          applicationNo: resolvedAppNo,
        });
      } catch {
        // Safe fallback
      }
    }

    fetchIdentity();
  }, [studentName, studentClass, applicationNo]);

  const activeName = studentName || identity.name;
  const activeClass = studentClass || identity.class;
  const activeAppNo = applicationNo || identity.applicationNo;

  const handleLogout = async () => {
    try {
      const supabase = createClientBrowser();
      await supabase.auth.signOut();
    } catch {
      // Ignore if SSR mock
    }
    router.refresh();
    router.push("/student/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 sticky top-0 h-screen overflow-y-auto">
          {/* Logo & Portal Badge */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 select-none" aria-label="Emprise Academy Student Portal">
              <EmpriseLogo size="sm" />
            </Link>
            <span className="text-[9px] font-bold text-[var(--brand-accent)] uppercase tracking-wider bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-md">
              STUDENT
            </span>
          </div>

          {/* Student Profile Snapshot */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {activeName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-slate-900 block truncate">
                {activeName}
              </span>
              <span className="text-[11px] text-slate-500 block truncate">
                {activeClass} • {activeAppNo}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/student/dashboard" && pathname === "/student") ||
                (item.href !== "/student/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    isActive
                      ? "bg-[var(--brand-primary)] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-[var(--brand-accent-light)]" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout & Footer */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
            <div className="text-[10px] text-slate-400 text-center pt-2">
              Emprise Student Identity Authority
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 select-none" aria-label="Emprise Academy Student Portal">
            <EmpriseLogo size="xs" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 z-30 shadow-lg animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-3 flex items-center justify-between">
              <div>
                <strong className="block text-slate-900">{activeName}</strong>
                <span className="text-slate-500">{activeClass} • {activeAppNo}</span>
              </div>
              <Link
                href="/student/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-bold text-[var(--brand-accent)] min-h-[44px] flex items-center"
              >
                Edit Profile
              </Link>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/student/dashboard" && pathname === "/student") ||
                (item.href !== "/student/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all min-h-[44px]",
                    isActive
                      ? "bg-[var(--brand-primary)] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 min-h-[44px] cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-8">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </div>

        {/* Mobile Fixed Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1 pb-[calc(0.375rem+env(safe-area-inset-bottom))] z-20 flex items-center justify-around shadow-lg">
          <Link
            href="/student/dashboard"
            className={cn(
              "flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold",
              pathname === "/student" || pathname === "/student/dashboard"
                ? "text-[var(--brand-primary)] font-bold"
                : "text-slate-500"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/student/applications"
            className={cn(
              "flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold",
              pathname.startsWith("/student/applications")
                ? "text-[var(--brand-primary)] font-bold"
                : "text-slate-500"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>Applications</span>
          </Link>

          <Link
            href="/student/admit-cards"
            className={cn(
              "flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold",
              pathname.startsWith("/student/admit-cards")
                ? "text-[var(--brand-primary)] font-bold"
                : "text-slate-500"
            )}
          >
            <CreditCard className="w-4 h-4" />
            <span>Admit Cards</span>
          </Link>

          <Link
            href="/student/results"
            className={cn(
              "flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold",
              pathname.startsWith("/student/results")
                ? "text-[var(--brand-primary)] font-bold"
                : "text-slate-500"
            )}
          >
            <Trophy className="w-4 h-4" />
            <span>Results</span>
          </Link>

          <Link
            href="/student/profile"
            className={cn(
              "flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold",
              pathname.startsWith("/student/profile")
                ? "text-[var(--brand-primary)] font-bold"
                : "text-slate-500"
            )}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
  );
};
