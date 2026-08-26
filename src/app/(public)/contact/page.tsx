import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Emprise Academy",
  description: "Get in touch with Emprise Academy Mathura for admissions, courses, and queries.",
};

export default function ContactPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Contact Emprise Academy</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /contact] — Architecture connected to Lead capture and verified Mathura campus details.
      </p>
    </div>
  );
}
