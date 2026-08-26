import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Settings | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Platform Settings & Config</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/settings] — Academic years, audit logs, system configurations, and verified brand values.
      </p>
    </div>
  );
}
