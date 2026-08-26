import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Blog & Resources | Emprise Academy",
  description: "Preparation strategies, exam analysis, and expert guidance for JEE, NEET and Foundation.",
};

export default function BlogPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Blog & Academic Resources</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /blog] — CMS blog architecture ready with category filtering and SEO slugs.
      </p>
    </div>
  );
}
