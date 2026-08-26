import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Results | Emprise Academy",
  description: "Check your ETSE and competitive test results securely with your Roll Number and Date of Birth.",
  robots: {
    index: true,
    follow: false,
  },
};

export default function ResultsSearchPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Result Search Portal</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /results] — Architecture prepared with secure Roll Number + Date of Birth verification API (`/api/results/search`).
      </p>
    </div>
  );
}
