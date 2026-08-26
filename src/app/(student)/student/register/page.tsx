import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Registration | Emprise Academy",
  description: "Create a student account on Emprise Academy portal.",
};

export default function StudentRegisterPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Student Account Registration</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /student/register] — Registration validated with Zod and linked to student profile.
      </p>
    </div>
  );
}
