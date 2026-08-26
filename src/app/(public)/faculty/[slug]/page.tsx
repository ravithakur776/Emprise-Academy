import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { FacultyProfileView } from "@/components/faculty/FacultyProfileView";
import { FacultyJsonLd } from "@/components/faculty/FacultyJsonLd";
import { FACULTY_DATA } from "@/data/faculty";

interface FacultyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FACULTY_DATA.map((fac) => ({
    slug: fac.slug,
  }));
}

export async function generateMetadata({ params }: FacultyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faculty = FACULTY_DATA.find((f) => f.slug === slug);

  if (!faculty) {
    return {
      title: "Faculty Profile Not Found | Emprise Academy",
    };
  }

  return {
    title: `${faculty.name} | ${faculty.subject} Faculty | Emprise Academy Mathura`,
    description: `Profile of ${faculty.name}, ${faculty.designation} at Emprise Academy Mathura. ${faculty.qualification}. Specialises in ${faculty.specialisation}.`,
    keywords: [
      faculty.name,
      `${faculty.name} Emprise Academy`,
      `${faculty.subject} Faculty Mathura`,
      "Emprise Academy Faculty",
    ],
    alternates: {
      canonical: `https://empriseacademy.com/faculty/${faculty.slug}`,
    },
    openGraph: {
      title: `${faculty.name} | ${faculty.subject} Faculty | Emprise Academy`,
      description: `Profile of ${faculty.name}, ${faculty.designation} at Emprise Academy Mathura.`,
      url: `https://empriseacademy.com/faculty/${faculty.slug}`,
      siteName: "Emprise Academy",
      locale: "en_IN",
      type: "profile",
    },
  };
}

export default async function IndividualFacultyPage({ params }: FacultyPageProps) {
  const { slug } = await params;
  const faculty = FACULTY_DATA.find((f) => f.slug === slug);

  if (!faculty) {
    notFound();
  }

  return (
    <ToastProvider>
      <FacultyJsonLd
        name={faculty.name}
        jobTitle={faculty.designation}
        description={faculty.bio}
        url={`https://empriseacademy.com/faculty/${faculty.slug}`}
        breadcrumbs={[
          { name: "Home", item: "https://empriseacademy.com" },
          { name: "Faculty", item: "https://empriseacademy.com/faculty" },
          { name: faculty.name, item: `https://empriseacademy.com/faculty/${faculty.slug}` },
        ]}
      />

      <Navbar />

      <main className="flex-1">
        <FacultyProfileView faculty={faculty} />
      </main>

      <Footer />
      <MobileBottomCTA />
    </ToastProvider>
  );
}
