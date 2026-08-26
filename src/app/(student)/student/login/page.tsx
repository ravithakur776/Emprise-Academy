import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Login | Emprise Academy",
  description: "Login to Emprise Academy Student Portal to access admit cards, applications, and performance reports.",
};

export default function StudentLoginPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Student Portal Login</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/login] — Supabase SSR Auth integration configured.
      </p>
    </div>
  );
}
