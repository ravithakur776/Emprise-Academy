import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { DirectorDetailProfile } from "@/components/directors/DirectorDetailProfile";
import { DirectorJsonLd } from "@/components/directors/DirectorJsonLd";
import { DIRECTORS_DATA } from "@/data/directors";

export const metadata: Metadata = {
  title: "Sushil Dagur | Director, Emprise Academy Mathura",
  description:
    "Profile of Sushil Dagur, Founding Director of Emprise Academy Mathura. B.E. (Hons.) Mechanical Engineering (Univ. of Derby, UK) with Ford UK and Kota competitive mentoring experience.",
  keywords: [
    "Sushil Dagur",
    "Sushil Dagur Emprise Academy",
    "Director Emprise Academy Mathura",
    "IIT JEE Academic Director Mathura",
    "Educationist Mathura",
  ],
  alternates: {
    canonical: "https://empriseacademy.com/directors/sushil-dagur",
  },
  openGraph: {
    title: "Sushil Dagur | Director, Emprise Academy Mathura",
    description:
      "Profile of Sushil Dagur, Founding Director of Emprise Academy Mathura. B.E. (Hons.) Mechanical Engineering (Univ. of Derby, UK) with Ford UK and Kota competitive mentoring experience.",
    url: "https://empriseacademy.com/directors/sushil-dagur",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: "https://empriseacademy.com/images/directors/sushil-dagur.jpg",
        width: 819,
        height: 1024,
        alt: "Sushil Dagur — Director, Educationist & Academic Entrepreneur at Emprise Academy",
      },
    ],
  },
};

export default function SushilDagurProfilePage() {
  const { sushilDagur, rakeshKumar } = DIRECTORS_DATA;

  return (
    <ToastProvider>
      <DirectorJsonLd
        name={sushilDagur.name}
        jobTitle={sushilDagur.designation}
        description={sushilDagur.leadershipPerspective}
        url="https://empriseacademy.com/directors/sushil-dagur"
        image={sushilDagur.photoUrl}
        alumniOf={sushilDagur.almaMater}
        knowsAbout={["Curriculum Design", "Academic Leadership", "Physics Pedagogy", "Engineering Education"]}
        breadcrumbs={[
          { name: "Home", item: "https://empriseacademy.com" },
          { name: "Directors", item: "https://empriseacademy.com/directors" },
          { name: sushilDagur.name, item: "https://empriseacademy.com/directors/sushil-dagur" },
        ]}
      />

      <Navbar />

      <main className="flex-1">
        <DirectorDetailProfile
          director={sushilDagur}
          siblingDirector={{
            name: rakeshKumar.name,
            slug: rakeshKumar.slug,
            designation: rakeshKumar.designation,
          }}
        />
      </main>

      <Footer />
      <MobileBottomCTA />
    </ToastProvider>
  );
}
