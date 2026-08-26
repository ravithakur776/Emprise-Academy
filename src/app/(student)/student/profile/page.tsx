import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Profile | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function StudentProfilePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/profile] — Profile details and contact information.
      </p>
    </div>
  );
}
