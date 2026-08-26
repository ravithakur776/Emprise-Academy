import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETSE Management | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminETSEPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">ETSE Examination Management</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/etse] — Exam configuration, centres, candidate registrations, and attendance.
      </p>
    </div>
  );
}
