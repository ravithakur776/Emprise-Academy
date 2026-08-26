import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function StudentDashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/dashboard] — Protected student workspace. Isolated via Supabase RLS.
      </p>
    </div>
  );
}
