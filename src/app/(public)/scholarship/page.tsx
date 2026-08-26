import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships | Emprise Academy",
  description: "Scholarship opportunities up to 100% through ETSE and board merit for JEE, NEET and Foundation.",
};

export default function ScholarshipPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Scholarship Programs</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /scholarship] — Architecture prepared for scholarship criteria management and applications.
      </p>
    </div>
  );
}
