import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result Management & Excel Import | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminResultsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Result Management & Excel Import Engine</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/results] — Excel/CSV parsing engine, row validation, duplicate detection, preview, and batch upsert (`/api/results/import/preview`, `/api/results/import/confirm`).
      </p>
    </div>
  );
}
