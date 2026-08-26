import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Article CMS | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Blog & Academic Content CMS</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/blog] — Create and publish academic articles, exam tips, and announcements.
      </p>
    </div>
  );
}
