import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Administrator Login</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /admin/login] — Protected administrative access portal with role-based redirection.
      </p>
    </div>
  );
}
