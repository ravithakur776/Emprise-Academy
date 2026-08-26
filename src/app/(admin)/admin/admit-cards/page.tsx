import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admit Cards | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminAdmitCardsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Admit Card Operations</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/admit-cards] — Batch admit card generation, token verification logs, regeneration.
      </p>
    </div>
  );
}
