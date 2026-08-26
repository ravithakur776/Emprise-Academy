"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FacultyProfile } from "@/data/faculty";
import { GraduationCap, Briefcase, Sparkles, ArrowRight, UserCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FacultyDirectoryClientProps {
  facultyList: FacultyProfile[];
}

export const FacultyDirectoryClient: React.FC<FacultyDirectoryClientProps> = ({ facultyList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");

  const categories = ["ALL", "JEE", "NEET", "FOUNDATION"];
  const subjects = ["ALL", "Mathematics", "Physics", "Chemistry", "Biology"];

  const filteredFaculty = useMemo(() => {
    return facultyList.filter((fac) => {
      const matchCat =
        selectedCategory === "ALL" ||
        fac.category === "ALL" ||
        fac.category === selectedCategory;
      const matchSub =
        selectedSubject === "ALL" ||
        fac.subject === selectedSubject;
      return matchCat && matchSub;
    });
  }, [facultyList, selectedCategory, selectedSubject]);

  return (
    <Section variant="default" spacing="lg" id="directory">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="primary" size="md">
            FACULTY DIRECTORY
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Meet Our Subject Mentors
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Filtered by competitive programme and academic subject.
          </Text>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs mb-10">
          {/* Programme Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {cat === "ALL" ? "All Programmes" : `${cat} Mentors`}
              </button>
            ))}
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer",
                  selectedSubject === sub
                    ? "bg-orange-50 text-[var(--brand-accent)] border border-orange-200"
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                {sub === "ALL" ? "All Subjects" : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid or Clean CMS Fallback State */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative overflow-hidden"
              >
                <div>
                  {/* Avatar & Subject Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 border-2 border-slate-200 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-[var(--brand-primary)] opacity-70" />
                    </div>
                    <Badge variant={fac.subject === "Mathematics" ? "primary" : fac.subject === "Physics" ? "accent" : "gold"} size="sm">
                      {fac.subject}
                    </Badge>
                  </div>

                  {/* Name & Designation */}
                  <h3 className="text-xl font-bold text-[var(--brand-primary)] mb-1">
                    {fac.name}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--brand-accent)] mb-3">
                    {fac.designation}
                  </p>

                  {/* Qualification & Experience */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{fac.qualification}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{fac.experienceText}</span>
                    </div>
                  </div>

                  {/* Specialisation */}
                  <div className="space-y-1 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Specialisation
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {fac.specialisation}
                    </p>
                  </div>
                </div>

                {/* Profile Link */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/faculty/${fac.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>View Full Profile & Approach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--brand-primary)]">
              Faculty Profiles Are Being Updated
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Additional verified mentor profiles for this category are being updated in our academic registry. Please visit our Mathura campus or contact our admissions desk to meet our departmental faculty mentors.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedSubject("ALL");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
};
