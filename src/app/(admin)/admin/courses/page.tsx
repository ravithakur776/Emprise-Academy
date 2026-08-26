import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Management | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminCoursesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Course & Program Management</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/courses] — Manage JEE, NEET and Foundation courses, batches, and brochures.
      </p>
    </div>
  );
}
