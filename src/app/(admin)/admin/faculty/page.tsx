import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Management | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminFacultyPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Faculty Directory Management</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/faculty] — Add and update verified faculty mentors and subjects.
      </p>
    </div>
  );
}
