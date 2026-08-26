import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Navigation, PhoneCall } from "lucide-react";

export const CampusContactSection: React.FC = () => {
  const { contactCampus } = HOMEPAGE_DATA;

  return (
    <Section variant="surface" spacing="lg" id="contact">
      <Container size="xl">
        <div className="rounded-3xl bg-linear-to-br from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <Badge variant="accent" size="md" className="mb-3">
                  VISIT OUR CAMPUS
                </Badge>
                <Heading as="h2" variant="h1" color="white">
                  Emprise Academy, Mathura
                </Heading>
                <Text variant="body-large" color="white" className="opacity-90 mt-2">
                  Visit our academic block for personal course guidance, syllabus discussion, and classroom tours.
                </Text>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Campus Address:</span>
                    <span>{contactCampus.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Admissions Helpdesk:</span>
                    <a href={contactCampus.phoneHref} className="hover:text-white underline font-semibold">
                      {contactCampus.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Email Inquiries:</span>
                    <a href={`mailto:${contactCampus.email}`} className="hover:text-white underline">
                      {contactCampus.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Consultation Hours:</span>
                    <span>{contactCampus.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={contactCampus.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Navigation className="w-4 h-4" />}
                    rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    Get Campus Directions
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="md"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    View Campus Info
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Map / Interactive Guide Card */}
            <div className="lg:col-span-5 bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 backdrop-blur-xs flex flex-col justify-between space-y-4 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent-light)] block mb-1">
                  Location Relevance
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Centrally Located in Mathura
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Easily accessible from all major localities of Mathura, Vrindavan, and neighboring regions in Western Uttar Pradesh.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Dedicated student transport guidance available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Quiet, distraction-free academic environment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Parent & student consultation lounges</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#counselling"
                  className="block w-full py-2.5 text-center text-xs font-bold rounded-lg bg-white text-[var(--brand-primary)] hover:bg-slate-100 transition-colors"
                >
                  Schedule an In-Person Campus Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
