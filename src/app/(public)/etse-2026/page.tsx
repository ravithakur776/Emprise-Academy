import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETSE 2026 Registration | Emprise Academy",
  description: "Register online for Emprise Talent Search Examination (ETSE) 2026 for classes 7 to 11.",
};

export default function ETSE2026Page() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">ETSE 2026 Portal</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /etse-2026] — Architecture connected to ETSE Registration Engine and Automatic Admit Card Generation (`/api/etse/register`).
      </p>
    </div>
  );
}
