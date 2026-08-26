import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminAnnouncementsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Notice Board & Announcements</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/announcements] — Publish broadcast notices, holiday announcements, and exam dates.
      </p>
    </div>
  );
}
