import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Results & Performance | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function StudentResultsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">My Results & History</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/results] — Historical test scores and scholarship award records.
      </p>
    </div>
  );
}
