import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarship Management | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminScholarshipsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Scholarship Management</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/scholarships] — Review scholarship applications and award discount matrices.
      </p>
    </div>
  );
}
