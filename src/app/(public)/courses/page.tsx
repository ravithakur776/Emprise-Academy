import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses & Programs | Emprise Academy",
  description: "Explore IIT-JEE, NEET-UG and Foundation Classroom Programs in Mathura.",
};

export default function CoursesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Academic Courses</h1>
      <p className="text-slate-600 mt-2 text-sm">
        [Route: /courses] — Architecture and route strategy prepared for Phase 2 UI development.
      </p>
    </div>
  );
}
