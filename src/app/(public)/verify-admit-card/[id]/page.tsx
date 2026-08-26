import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admit Card Verification | Emprise Academy",
  description: "Official verification portal for ETSE 2026 Admit Cards.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyAdmitCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Admit Card Verification</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /verify-admit-card/{resolvedParams.id}] — Public verification endpoint configured to return sanitized candidate identity & validity without exposing private records.
      </p>
    </div>
  );
}
