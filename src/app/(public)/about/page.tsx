import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Emprise Academy",
  description: "Learn about Emprise Academy's history since 2011, academic pedagogy, and faculty excellence in Mathura.",
};

export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">About Emprise Academy</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /about] — Architecture and route strategy prepared for Phase 2 UI development.
      </p>
    </div>
  );
}
