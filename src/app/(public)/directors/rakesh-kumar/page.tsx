import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { DirectorDetailProfile } from "@/components/directors/DirectorDetailProfile";
import { DirectorJsonLd } from "@/components/directors/DirectorJsonLd";
import { DIRECTORS_DATA } from "@/data/directors";

export const metadata: Metadata = {
  title: "Rakesh Kumar | Director & Mathematics Mentor | Emprise Academy",
  description:
    "Profile of Rakesh Kumar, Director and Head of Mathematics at Emprise Academy Mathura. B.E. (Hons.) Mechanical Engineering (Univ. of Derby, UK) with Rolls-Royce Limited and IIT-JEE teaching background.",
  keywords: [
    "Rakesh Kumar",
    "Rakesh Kumar Emprise Academy",
    "Director Emprise Academy Mathura",
    "IIT JEE Mathematics Mentor Mathura",
    "Maths Faculty Mathura",
  ],
  alternates: {
    canonical: "https://empriseacademy.com/directors/rakesh-kumar",
  },
  openGraph: {
    title: "Rakesh Kumar | Director & Mathematics Mentor | Emprise Academy",
    description:
      "Profile of Rakesh Kumar, Director and Head of Mathematics at Emprise Academy Mathura. B.E. (Hons.) Mechanical Engineering (Univ. of Derby, UK) with Rolls-Royce Limited and IIT-JEE teaching background.",
    url: "https://empriseacademy.com/directors/rakesh-kumar",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "profile",
  },
};

export default function RakeshKumarProfilePage() {
  const { sushilDagur, rakeshKumar } = DIRECTORS_DATA;

  return (
    <ToastProvider>
      <DirectorJsonLd
        name={rakeshKumar.name}
        jobTitle={rakeshKumar.designation}
        description={rakeshKumar.leadershipPerspective}
        url="https://empriseacademy.com/directors/rakesh-kumar"
        alumniOf={rakeshKumar.almaMater}
        knowsAbout={["IIT-JEE Mathematics", "Calculus", "Coordinate Geometry", "Algebraic Discipline"]}
        breadcrumbs={[
          { name: "Home", item: "https://empriseacademy.com" },
          { name: "Directors", item: "https://empriseacademy.com/directors" },
          { name: rakeshKumar.name, item: "https://empriseacademy.com/directors/rakesh-kumar" },
        ]}
      />

      <Navbar />

      <main className="flex-1">
        <DirectorDetailProfile
          director={rakeshKumar}
          siblingDirector={{
            name: sushilDagur.name,
            slug: sushilDagur.slug,
            designation: sushilDagur.designation,
          }}
        />
      </main>

      <Footer />
      <MobileBottomCTA />
    </ToastProvider>
  );
}
