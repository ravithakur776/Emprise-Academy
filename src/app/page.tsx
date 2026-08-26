import Link from "next/link";
import { siteConfig } from "@/config/site";
import { VERIFIED_BRAND_DATA } from "@/data/brand";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-3xl w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-slate-700 pb-6 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-orange-500">
              Phase 1 Architecture Foundation
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              {siteConfig.name} Digital Platform
            </h1>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-mono font-medium">
            Status: Core Ready
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {siteConfig.tagline}. Established {siteConfig.establishedYear} in {siteConfig.location.city}.
          The underlying backend, normalized PostgreSQL schema, Supabase Auth with RLS, Excel result import engine, ETSE admit card pipeline, and CRM lead architecture are fully configured.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {VERIFIED_BRAND_DATA.primaryPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-sm font-bold text-orange-400 mb-1">{pillar.name}</h2>
                <p className="text-xs text-slate-400">{pillar.description}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                {pillar.targetClasses.join(" • ")}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Architectural Portals & Routes
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/results"
              className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition"
            >
              /results (Secure Search)
            </Link>
            <Link
              href="/verify-admit-card/sample-token"
              className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition"
            >
              /verify-admit-card
            </Link>
            <Link
              href="/student/login"
              className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition"
            >
              /student/login
            </Link>
            <Link
              href="/admin/login"
              className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition"
            >
              /admin/login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
