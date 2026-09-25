import type { Metadata } from "next";
import AboutDirectorsPage, { metadata as directorsMetadata } from "@/app/(public)/about/directors/page";

export const metadata: Metadata = {
  ...directorsMetadata,
  alternates: {
    canonical: "https://empriseacademy.com/about/directors",
  },
};

export default function LegacyDirectorsRedirectPage() {
  return <AboutDirectorsPage />;
}
