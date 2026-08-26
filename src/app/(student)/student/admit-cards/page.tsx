import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Admit Cards | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function StudentAdmitCardsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">My Admit Cards</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/admit-cards] — Student's generated ETSE Admit Cards and PDF download trigger.
      </p>
    </div>
  );
}
