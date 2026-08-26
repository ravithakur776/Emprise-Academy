import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery CMS | Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Media & Campus Gallery CMS</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/gallery] — Upload and categorize campus, classroom, and felicitation media.
      </p>
    </div>
  );
}
