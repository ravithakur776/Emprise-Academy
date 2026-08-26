import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM & Leads | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Lead & Enquiry CRM</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/leads] — Lead status transitions, follow-up timeline, counsellor assignment.
      </p>
    </div>
  );
}
