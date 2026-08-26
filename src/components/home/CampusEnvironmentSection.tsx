import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { BookOpen, CheckCircle, Flame, ShieldAlert, Sparkles, Building2, HelpCircle } from "lucide-react";

export const CampusEnvironmentSection: React.FC = () => {
  const pillars = [
    { title: "Learn", desc: "Interactive concept lectures breaking down complex derivations and formulas." },
    { title: "Practice", desc: "Daily problem-solving sheets (DPPs) tailored to JEE Advanced & NEET difficulty." },
    { title: "Test", desc: "Rigorous timed OMR and CBT test series simulating national entrance conditions." },
    { title: "Improve", desc: "One-on-one doubt counters and individual performance feedback sessions." },
    { title: "Achieve", desc: "Building competitive temperament, high accuracy, and top percentile rankings." },
  ];

  return (
    <Section variant="navy-dark" spacing="lg">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="accent" size="md">
            LEARNING ENVIRONMENT
          </Badge>
          <Heading as="h2" variant="h1" color="white" align="center">
            A Disciplined Academic Ecosystem
          </Heading>
          <Text variant="body-large" color="white" className="opacity-90" align="center">
            Designed to foster intense academic focus, rigorous problem solving, and relentless daily improvement in Mathura.
          </Text>
        </div>

        {/* 5-Phase Narrative Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[var(--brand-accent)] text-white text-xs font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Pillar</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mathura Campus Facilities Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <Building2 className="w-5 h-5 text-[var(--brand-accent)] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Acoustically Optimized Classrooms</h4>
              <p className="text-xs text-slate-300">Spacious, distraction-free lecture halls equipped with modern audio-visual teaching aids.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Dedicated Doubt Counters</h4>
              <p className="text-xs text-slate-300">Faculty members available daily for one-on-one conceptual clarification and numerical troubleshooting.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Curated Academic Library</h4>
              <p className="text-xs text-slate-300">Comprehensive reference volumes, previous 20 years&apos; question archives, and quiet study zones.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
