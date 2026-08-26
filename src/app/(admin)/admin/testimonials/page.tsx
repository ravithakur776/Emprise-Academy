import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials CMS | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Testimonials CMS</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/testimonials] — Manage verified student ranks, achievements, and quotes.
      </p>
    </div>
  );
}
