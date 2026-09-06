import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Navigation, CheckCircle2 } from "lucide-react";

export const CampusContactSection: React.FC = () => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const phone = business.contact.phone_primary;
  const email = business.contact.email;
  const hours = business.contact.business_hours;
  const directionsUrl = business.contact.google_maps_url;

  return (
    <Section variant="default" spacing="lg" id="contact" className="bg-[var(--brand-background)]">
      <Container size="xl">
        <div className="rounded-3xl bg-white border border-[var(--brand-border)] p-6 sm:p-10 lg:p-12 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Clean White Institutional Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <Badge variant="primary" size="md" className="mb-3">
                  VISIT OUR CAMPUS
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
                  {business.academy_name}, <span className="text-[var(--brand-primary)]">Mathura</span>
                </h2>
                <Text variant="body-large" color="secondary" className="text-sm sm:text-base mt-2">
                  Visit our academic campus in Mathura for personalized course guidance, syllabus discussion, and direct faculty counseling.
                </Text>
              </div>

              <div className="space-y-4 pt-1 text-xs sm:text-sm text-[var(--brand-text-secondary)]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--brand-text)] block">Campus Location:</span>
                    <span>{business.address.display_location}</span>
                  </div>
                </div>

                {phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--brand-text)] block">Admissions Desk:</span>
                      <a href={`tel:${phone}`} className="text-[var(--brand-primary)] hover:underline font-bold">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--brand-text)] block">Official Email:</span>
                      <a href={`mailto:${email}`} className="text-[var(--brand-primary)] hover:underline font-semibold">
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {hours && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[var(--brand-accent)]" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--brand-text)] block">Consultation Hours:</span>
                      <span>{hours}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {directionsUrl ? (
                  <a
                    href={directionsUrl}
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
                ) : (
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="md"
                    >
                      Contact Campus Desk
                    </Button>
                  </Link>
                )}
                <Link href="/admissions">
                  <Button
                    variant="secondary"
                    size="md"
                  >
                    Admissions Process
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Deep Blue Feature Highlight Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#123E73] to-[#0B2748] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Location Relevance
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Centrally Located in Mathura
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed mb-4">
                  Easily accessible from all major localities of Mathura, Vrindavan, and Western Uttar Pradesh via Bhuteshwar Road.
                </p>
                <div className="space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated student academic mentorship</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Quiet, distraction-free study environment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Modern CBT & OMR testing center on campus</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15">
                <Link href="/contact" className="text-xs font-bold text-amber-300 hover:text-white inline-flex items-center gap-1.5 transition-colors">
                  <span>Schedule an In-Person Campus Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
