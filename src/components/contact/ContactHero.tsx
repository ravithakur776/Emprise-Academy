import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/link/TextLink";
import { MAIN_CONTACT_DATA } from "@/data/admissions";

export interface ContactHeroProps {
  breadcrumbs: BreadcrumbItem[];
}

export const ContactHero: React.FC<ContactHeroProps> = ({ breadcrumbs }) => {
  const { hero } = MAIN_CONTACT_DATA;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-slate-800">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-6">
        <div className="text-slate-400">
          <Breadcrumbs
            items={breadcrumbs}
            className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
          />
        </div>

        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
            <span className="font-semibold tracking-wider uppercase text-[11px]">
              {hero.eyebrow}
            </span>
          </div>

          <Heading
            as="h1"
            variant="display"
            color="white"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            {hero.h1}
          </Heading>

          <div className="text-base sm:text-lg font-semibold text-[var(--brand-accent-light)]">
            {hero.subheading}
          </div>

          <Text
            variant="body-large"
            color="white"
            className="text-slate-300 leading-relaxed max-w-2xl text-sm sm:text-base"
          >
            {hero.paragraph}
          </Text>
        </div>
      </Container>
    </section>
  );
};
