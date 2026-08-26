import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Members | Emprise Academy",
  description: "Meet our expert IIT-JEE and NEET-UG faculty mentors in Mathura.",
};

export default function FacultyPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Faculty Team</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /faculty] — Architecture and route strategy prepared for Phase 2 UI development.
      </p>
    </div>
  );
}
