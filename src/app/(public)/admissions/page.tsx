import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions | Emprise Academy",
  description: "Admission procedures, batch enrollment, and academic counseling in Mathura.",
};

export default function AdmissionsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Admissions Portal</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admissions] — Architecture connected to Lead Intake & CRM Pipeline (`/api/leads`).
      </p>
    </div>
  );
}
