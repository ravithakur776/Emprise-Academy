import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Records | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminStudentsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/students] — Centralized student database, parent profiles, enrollment status.
      </p>
    </div>
  );
}
