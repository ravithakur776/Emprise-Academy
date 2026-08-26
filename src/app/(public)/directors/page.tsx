import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directors' Message | Emprise Academy",
  description: "Leadership message and educational vision from the Directors of Emprise Academy.",
};

export default function DirectorsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Directors' Message</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /directors] — Architecture and route strategy prepared for Phase 2 UI development.
      </p>
    </div>
  );
}
