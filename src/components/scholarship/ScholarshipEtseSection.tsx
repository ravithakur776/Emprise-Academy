import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { MAIN_SCHOLARSHIP_DATA } from "@/data/scholarship";
import { Trophy, Calendar, CheckCircle2, ArrowRight, Award } from "lucide-react";

export const ScholarshipEtseSection: React.FC = () => {
  const { etseRelationship } = MAIN_SCHOLARSHIP_DATA;

  return (
    <Section variant="surface" spacing="lg" id="etse-pathway">
      <Container size="xl">
        <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Info */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-amber-300 border border-white/10 font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{etseRelationship.eyebrow}</span>
              </div>

              <Heading as="h2" variant="h1" color="white">
                {etseRelationship.title}
              </Heading>

              <Text variant="body-large" color="white" className="opacity-90 max-w-2xl leading-relaxed">
                {etseRelationship.description}
              </Text>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">Exam Date</span>
                  <span className="font-bold text-amber-300">{etseRelationship.examDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">Eligible Classes</span>
                  <span className="font-bold text-white">{etseRelationship.eligibleClasses}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">Registration Fee</span>
                  <span className="font-bold text-emerald-400">{etseRelationship.registrationFee}</span>
                </div>
              </div>
            </div>

            {/* Right: CTA Card */}
            <div className="lg:col-span-4 bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent-light)] block">
                  ETSE 2026 Portal
                </span>
                <p className="text-xs text-slate-300">
                  Explore test pattern, exam syllabus, and online registration for the upcoming talent search examination.
                </p>
              </div>

              <div className="pt-2">
                <Link href={etseRelationship.ctaHref} className="block">
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {etseRelationship.ctaLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
