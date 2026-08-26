import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminAdmissionsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Admissions Management</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/admissions] — Enrolled students, batch allocations, admission numbers.
      </p>
    </div>
  );
}
