import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import {
  Compass,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Trophy,
  Award,
  PhoneCall,
  Home,
} from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Emprise Academy Mathura",
  description: "The page you are looking for does not exist or has been relocated.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "IIT-JEE Coaching",
      description: "Class 11, 12 & Dropper engineering preparation.",
      href: "/iit-jee-coaching-mathura",
      icon: BookOpen,
    },
    {
      title: "NEET-UG Coaching",
      description: "Comprehensive medical entrance preparation.",
      href: "/neet-coaching-mathura",
      icon: GraduationCap,
    },
    {
      title: "Foundation Coaching",
      description: "Class 8, 9 & 10 Olympiad & NTSE foundation.",
      href: "/foundation-coaching-mathura",
      icon: Trophy,
    },
    {
      title: "ETSE 2026 Scholarship",
      description: "Talent search examination with up to 100% scholarship.",
      href: "/etse-2026",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <Badge variant="accent" size="md">
              404 ERROR — PAGE NOT FOUND
            </Badge>

            <Heading as="h1" variant="h1" align="center">
              Let's Get You Back on Track
            </Heading>

            <Text variant="body" color="muted" align="center" className="text-base sm:text-lg">
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </Text>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                  Back to Homepage
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="md" leftIcon={<PhoneCall className="w-4 h-4" />}>
                  Contact Admissions Desk
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Academic Navigation Cards */}
          <div className="mt-14 max-w-4xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-6">
              EXPLORE ACADEMIC PROGRAMMES & INITIATIVES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[var(--brand-accent)] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold text-slate-900 group-hover:text-[var(--brand-primary)] transition-colors">
                          {item.title}
                        </strong>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand-accent)] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
