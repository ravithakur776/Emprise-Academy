import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Award, ArrowRight } from "lucide-react";

export const EtseScholarshipBridge: React.FC = () => {
  return (
    <Section variant="surface" spacing="md" id="scholarship-bridge">
      <Container size="xl">
        <div className="rounded-3xl bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/60 text-xs text-amber-900 font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>ETSE MERIT SCHOLARSHIP OPPORTUNITY</span>
            </div>
            <Heading as="h3" variant="h2" className="text-[var(--brand-primary)]">
              Unlock Up To Full Tuition Fee Concessions
            </Heading>
            <Text variant="body" color="muted" className="text-slate-700">
              High scorers in ETSE 2026 are automatically eligible for merit-based fee concessions on all 1-Year and 2-Year classroom programmes at Emprise Academy.
            </Text>
          </div>

          <div className="shrink-0">
            <Link href="/scholarship">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Scholarship Slabs
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
