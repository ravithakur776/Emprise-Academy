"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Grid } from "@/components/ui/layout/Grid";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { IconButton } from "@/components/ui/button/IconButton";
import { Badge, StatusBadge } from "@/components/ui/badge/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card/Card";
import { CourseCard } from "@/components/ui/card/CourseCard";
import { ResultCard } from "@/components/ui/card/ResultCard";
import { DirectorCard } from "@/components/ui/card/FacultyCard";
import { TestimonialCard, StatCard, FeatureCard, AnnouncementCard, ExamCard } from "@/components/ui/card/TestimonialCard";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select, Textarea, Checkbox, RadioGroup } from "@/components/ui/form/Input";
import { PhoneField, PasswordField, SearchField, DateField, OTPField, FileUpload } from "@/components/ui/form/SpecializedFields";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TablePagination, TableFilterBar } from "@/components/ui/table/Table";
import { Modal, ConfirmationDialog } from "@/components/ui/modal/Modal";
import { Drawer } from "@/components/ui/modal/Drawer";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { Skeleton, CardSkeleton, TableSkeleton, FormSkeleton } from "@/components/ui/skeleton/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/feedback/EmptyState";
import { EmpriseImage } from "@/components/ui/media/EmpriseImage";
import { TextLink, ArrowLink, Breadcrumbs } from "@/components/ui/link/TextLink";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import {
  Sparkles,
  Trophy,
  Users,
  BookOpen,
  Award,
  Bell,
  CheckCircle,
  HelpCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

function DesignSystemContent() {
  const toast = useToast();

  // Modal & Drawer State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form State
  const [searchVal, setSearchVal] = useState("");
  const [otpVal, setOtpVal] = useState("123456");
  const [selectedRadio, setSelectedRadio] = useState("jee");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Table State
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[var(--brand-background)] pb-24">
      {/* Visual Navigation Shell */}
      <Navbar />

      {/* Hero Header */}
      <Section variant="navy-dark" spacing="md">
        <Container size="xl">
          <div className="max-w-3xl space-y-3">
            <Badge variant="accent" size="lg">
              PHASE 2 DESIGN SYSTEM SHOWCASE
            </Badge>
            <Heading as="h1" variant="display" color="white">
              Emprise Academy Visual Foundation
            </Heading>
            <Text variant="body-large" color="white" className="opacity-90">
              Institutional design tokens, typography scale, responsive containers, button system, cards, forms, tables, modals, and toasts.
            </Text>
          </div>
        </Container>
      </Section>

      <Container size="xl" className="py-12 space-y-16">
        {/* Breadcrumb Demo */}
        <div>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Design System", href: "/design-system" },
              { label: "Components & Tokens" },
            ]}
          />
        </div>

        {/* 1. BRAND COLOR TOKENS */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">01. Design Tokens</Badge>
            <Heading as="h2" variant="h2">Brand Color Palette</Heading>
            <Text variant="body" color="muted">Centralized single source of truth for all institutional interfaces.</Text>
          </div>

          <Grid cols={2} colsSm={3} colsMd={6} gap="md">
            <div className="p-4 rounded-xl bg-[var(--brand-primary)] text-white shadow-xs">
              <div className="h-10 rounded-lg bg-[var(--brand-primary-light)] mb-2" />
              <p className="font-bold text-sm">Deep Navy</p>
              <p className="text-xs opacity-70">#0A192F</p>
              <span className="text-[10px] uppercase font-semibold text-blue-200">--brand-primary</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--brand-accent)] text-white shadow-xs">
              <div className="h-10 rounded-lg bg-[var(--brand-accent-light)] mb-2" />
              <p className="font-bold text-sm">Vibrant Orange</p>
              <p className="text-xs opacity-70">#FF6B00</p>
              <span className="text-[10px] uppercase font-semibold text-orange-200">--brand-accent</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--brand-gold)] text-white shadow-xs">
              <div className="h-10 rounded-lg bg-amber-400 mb-2" />
              <p className="font-bold text-sm">Achievement Gold</p>
              <p className="text-xs opacity-70">#D97706</p>
              <span className="text-[10px] uppercase font-semibold text-amber-200">--brand-gold</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs">
              <div className="h-10 rounded-lg bg-[var(--brand-background)] border border-slate-200 mb-2" />
              <p className="font-bold text-sm">Clean Slate</p>
              <p className="text-xs text-slate-500">#F8FAFC</p>
              <span className="text-[10px] uppercase font-semibold text-slate-400">--brand-background</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-xs">
              <div className="h-10 rounded-lg bg-emerald-400 mb-2" />
              <p className="font-bold text-sm">Success Green</p>
              <p className="text-xs opacity-70">#10B981</p>
              <span className="text-[10px] uppercase font-semibold text-emerald-200">--brand-success</span>
            </div>

            <div className="p-4 rounded-xl bg-red-600 text-white shadow-xs">
              <div className="h-10 rounded-lg bg-red-400 mb-2" />
              <p className="font-bold text-sm">Danger Red</p>
              <p className="text-xs opacity-70">#EF4444</p>
              <span className="text-[10px] uppercase font-semibold text-red-200">--brand-danger</span>
            </div>
          </Grid>
        </section>

        {/* 2. TYPOGRAPHY SYSTEM */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">02. Typography System</Badge>
            <Heading as="h2" variant="h2">Typography Scale & Hierarchy</Heading>
          </div>

          <Card variant="surface" className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[var(--brand-muted)] uppercase">Display (4xl–6xl)</span>
              <Heading variant="display">Excellence in IIT-JEE & NEET</Heading>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[var(--brand-muted)] uppercase">Heading 1 (3xl–5xl)</span>
              <Heading variant="h1">Mathura&apos;s Premier Academic Hub</Heading>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[var(--brand-muted)] uppercase">Heading 2 (2xl–4xl)</span>
              <Heading variant="h2">Comprehensive 2-Year Integrated Batches</Heading>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[var(--brand-muted)] uppercase">Heading 3 (xl–3xl)</span>
              <Heading variant="h3">Talent Search Examination (ETSE 2026)</Heading>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[var(--brand-muted)] uppercase">Body Large & Body</span>
              <Text variant="body-large" className="mb-2">
                Designed to nurture strong analytical fundamentals, rigorous concept mastery, and competitive temperament.
              </Text>
              <Text variant="body" color="muted">
                Our faculty mentors provide personalized doubt clearance, daily practice problem sheets (DPPs), and comprehensive test analytics.
              </Text>
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <div>
                <span className="text-xs font-bold text-[var(--brand-muted)] uppercase block">Eyebrow</span>
                <Text variant="eyebrow" color="accent">ADMISSIONS 2026–2027</Text>
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--brand-muted)] uppercase block">Caption</span>
                <Text variant="caption" color="muted">Verified by Academic Board on 26 Aug 2026</Text>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. BUTTON SYSTEM */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">03. Buttons & Actions</Badge>
            <Heading as="h2" variant="h2">Button System</Heading>
          </div>

          <Card variant="default" className="p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="gold" leftIcon={<Trophy className="w-4 h-4" />}>
                Achievement Action
              </Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="success">Success Button</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" isLoading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <IconButton variant="outline" icon={<Bell className="w-4 h-4" />} aria-label="Notifications" />
              <IconButton variant="primary" icon={<Phone className="w-4 h-4" />} aria-label="Call" />
            </div>
          </Card>
        </section>

        {/* 4. BADGES & STATUSES */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">04. Badges & Indicators</Badge>
            <Heading as="h2" variant="h2">Status Badge System</Heading>
          </div>

          <Card variant="default" className="p-6 flex flex-wrap items-center gap-2.5">
            <StatusBadge status="PUBLISHED" />
            <StatusBadge status="REGISTERED" />
            <StatusBadge status="ADMIT_CARD_GENERATED" />
            <StatusBadge status="QUALIFIED" />
            <StatusBadge status="ACTIVE" />
            <StatusBadge status="PENDING" />
            <StatusBadge status="NEW" />
            <StatusBadge status="CONTACTED" />
            <StatusBadge status="DRAFT" />
            <StatusBadge status="REVOKED" />
            <StatusBadge status="NOT_QUALIFIED" />
            <StatusBadge status="LOST" />
          </Card>
        </section>

        {/* 5. CARD SYSTEM */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">05. Card System</Badge>
            <Heading as="h2" variant="h2">Data-Driven Component Cards</Heading>
          </div>

          <Grid cols={1} colsMd={3} gap="lg">
            {/* Course Card */}
            <CourseCard
              course={{
                id: "1",
                name: "2-Year JEE Integrated Program",
                targetExam: "IIT_JEE",
                duration: "2 Years",
                eligibleClasses: ["Class 11"],
                description: "Comprehensive coverage of Class 11 & 12 syllabus with high-difficulty problem solving modules.",
                features: ["Daily Practice Problems (DPPs)", "All-India Test Series", "Dedicated Doubt Mentorship"],
                slug: "iit-jee",
              }}
            />

            {/* Result Card */}
            <ResultCard
              result={{
                id: "r1",
                candidateName: "Aarav Sharma",
                rollNumber: "2026110001",
                examTitle: "ETSE 2026",
                academicYear: "2026-2027",
                totalMarks: 285,
                maxMarks: 300,
                percentage: 95.0,
                rank: 1,
                scholarshipAwarded: 100,
                qualifyingStatus: "QUALIFIED",
              }}
            />

            {/* Course Card 2 */}
            <CourseCard
              course={{
                id: "c2",
                name: "Foundation Class 10",
                targetExam: "FOUNDATION",
                duration: "1 Year",
                eligibleClasses: ["Class 10"],
                description: "Concept-first coaching building analytical foundations for future competitive entrance.",
                features: ["Daily Practice Papers", "Concept Modules", "Olympiad Workshops"],
                slug: "foundation",
              }}
            />
          </Grid>

          {/* Director & Testimonial Cards */}
          <Grid cols={1} colsMd={2} gap="lg">
            <DirectorCard
              director={{
                id: "d1",
                name: "Academic Director",
                designation: "Founder & Director, Emprise Academy",
                message: "Our pedagogical mission in Mathura is to make world-class JEE and NEET preparation accessible to every hardworking student through rigorous conceptual depth.",
              }}
            />

            <TestimonialCard
              testimonial={{
                id: "t1",
                studentName: "Devendra Yadav",
                examCleared: "JEE Advanced 2025",
                rankText: "AIR 412",
                courseAttended: "2-Year Classroom Program",
                year: 2025,
                quote: "The personalized attention and question-solving workshops at Emprise gave me the exact analytical edge required for IIT-JEE.",
              }}
            />
          </Grid>

          {/* Stats & Exam Cards */}
          <Grid cols={1} colsSm={2} colsMd={4} gap="md">
            <StatCard value="15+" label="Experience" description="Years of academic excellence in Mathura" />
            <StatCard value="100%" label="Scholarship" description="Available through ETSE 2026" />
            <StatCard value="2500+" label="Alumni" description="Mentored for JEE & NEET" />
            <StatCard value="3:1" label="Doubt Ratio" description="Daily faculty support sessions" />
          </Grid>

          <ExamCard
            exam={{
              id: "e1",
              title: "Emprise Talent Search Examination (ETSE) 2026",
              year: 2026,
              examDate: "6 September 2026",
              examTime: "10:00 AM - 01:00 PM",
              reportingTime: "09:15 AM",
              eligibleClasses: ["Class 7", "Class 8", "Class 9", "Class 10"],
              instructions: ["Bring printed Admit Card", "Use blue/black ballpoint pen"],
            }}
            onRegister={() => toast.success("ETSE Registration", "Opening registration form modal")}
          />
        </section>

        {/* 6. FORM SYSTEM */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">06. Form Controls</Badge>
            <Heading as="h2" variant="h2">Form System & Inputs</Heading>
          </div>

          <Card variant="default" className="p-6 sm:p-8 space-y-6">
            <Grid cols={1} colsSm={2} colsMd={3} gap="md">
              <FormField label="Full Name" required htmlFor="name">
                <Input id="name" placeholder="Enter student name" />
              </FormField>

              <FormField label="Mobile Number" required htmlFor="phone">
                <PhoneField id="phone" />
              </FormField>

              <FormField label="Date of Birth" required htmlFor="dob">
                <DateField id="dob" />
              </FormField>

              <FormField label="Select Course Stream" required htmlFor="course">
                <Select
                  id="course"
                  options={[
                    { value: "jee", label: "IIT-JEE (Main + Advanced)" },
                    { value: "neet", label: "NEET-UG Medical" },
                    { value: "foundation", label: "Foundation (Classes 8–10)" },
                  ]}
                />
              </FormField>

              <FormField label="Secure Password" required htmlFor="password">
                <PasswordField id="password" />
              </FormField>

              <FormField label="Search Roll Number / Lead" htmlFor="search">
                <SearchField
                  id="search"
                  placeholder="Type to search..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onClear={() => setSearchVal("")}
                />
              </FormField>
            </Grid>

            <Grid cols={1} colsMd={2} gap="lg" className="pt-4 border-t border-slate-100">
              <div className="space-y-4">
                <FormField label="Select Academic Goal" htmlFor="radio">
                  <RadioGroup
                    name="goal"
                    value={selectedRadio}
                    onChange={setSelectedRadio}
                    options={[
                      { value: "jee", label: "Engineering (IIT-JEE)", description: "Targeting IITs, NITs, IIITs" },
                      { value: "neet", label: "Medical (NEET-UG)", description: "Targeting AIIMS & Top Medical Colleges" },
                    ]}
                  />
                </FormField>

                <Checkbox label="I agree to receive admission updates via WhatsApp/SMS." />
              </div>

              <div className="space-y-4">
                <FormField label="6-Digit Verification Code (OTP)" htmlFor="otp">
                  <OTPField value={otpVal} onChange={setOtpVal} />
                </FormField>

                <FormField label="Upload Scorecard / ID Proof" htmlFor="upload">
                  <FileUpload file={selectedFile} onFileSelect={setSelectedFile} />
                </FormField>
              </div>
            </Grid>
          </Card>
        </section>

        {/* 7. DATA TABLE SYSTEM */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">07. Data Tables</Badge>
            <Heading as="h2" variant="h2">Data Table System</Heading>
          </div>

          <TableFilterBar
            actions={
              <Button variant="primary" size="sm">
                Export CSV
              </Button>
            }
          >
            <SearchField placeholder="Filter students..." className="w-64" />
            <Select
              options={[
                { value: "all", label: "All Classes" },
                { value: "11", label: "Class 11" },
                { value: "12", label: "Class 12" },
              ]}
              className="w-40"
            />
          </TableFilterBar>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead sortable>Roll Number</TableHead>
                <TableHead sortable>Candidate Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono font-semibold">2026110001</TableCell>
                <TableCell className="font-bold text-[var(--brand-primary)]">Aarav Sharma</TableCell>
                <TableCell>Class 11</TableCell>
                <TableCell className="font-semibold">285 / 300</TableCell>
                <TableCell className="font-bold text-[var(--brand-accent)]">95.0%</TableCell>
                <TableCell><StatusBadge status="QUALIFIED" size="sm" /></TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View Scorecard</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">2026110002</TableCell>
                <TableCell className="font-bold text-[var(--brand-primary)]">Diya Verma</TableCell>
                <TableCell>Class 11</TableCell>
                <TableCell className="font-semibold">278 / 300</TableCell>
                <TableCell className="font-bold text-[var(--brand-accent)]">92.6%</TableCell>
                <TableCell><StatusBadge status="QUALIFIED" size="sm" /></TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View Scorecard</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <TablePagination
            currentPage={currentPage}
            totalPages={5}
            totalRecords={48}
            pageSize={10}
            onPageChange={setCurrentPage}
          />
        </section>

        {/* 8. MODALS, TOASTS & FEEDBACK */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">08. Interactive Feedback</Badge>
            <Heading as="h2" variant="h2">Modals, Drawers & Toast Notifications</Heading>
          </div>

          <Card variant="default" className="p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Open Standard Modal
              </Button>
              <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                Open Confirmation Dialog
              </Button>
              <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                Open Side Drawer
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <Button variant="success" size="sm" onClick={() => toast.success("Success!", "Admit card generated and ready for print.")}>
                Trigger Success Toast
              </Button>
              <Button variant="danger" size="sm" onClick={() => toast.error("Import Error", "Row 4 contains marks exceeding 100.")}>
                Trigger Error Toast
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.warning("Warning", "Batch duplicate roll number detected.")}>
                Trigger Warning Toast
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toast.info("Notice", "Exam centre capacity updated to 600.")}>
                Trigger Info Toast
              </Button>
            </div>
          </Card>
        </section>

        {/* 9. SKELETON LOADING & EMPTY STATES */}
        <section className="space-y-6">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">09. Loading & Empty States</Badge>
            <Heading as="h2" variant="h2">Skeletons & Feedback Views</Heading>
          </div>

          <Grid cols={1} colsMd={2} gap="lg">
            <div>
              <Text variant="eyebrow" color="muted" className="mb-2">Card Loading Shimmer</Text>
              <CardSkeleton />
            </div>
            <div>
              <Text variant="eyebrow" color="muted" className="mb-2">Empty State Pattern</Text>
              <EmptyState
                title="No Test Results Found"
                description="We could not find any examination results matching the provided Roll Number & Date of Birth."
                actionLabel="Try Another Roll Number"
                onAction={() => toast.info("Search", "Resetting search filter")}
              />
            </div>
          </Grid>
        </section>
      </Container>

      {/* Modals & Drawers */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Student Admit Card Preview"
        description="Emprise Talent Search Examination (ETSE) 2026"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setIsModalOpen(false); toast.success("Download Started", "Printing admit card PDF"); }}>
              Print PDF
            </Button>
          </>
        }
      >
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <p><span className="font-bold">Candidate Name:</span> Aarav Sharma</p>
          <p><span className="font-bold">Roll Number:</span> 2026100001</p>
          <p><span className="font-bold">Exam Centre:</span> Emprise Academy Main Campus, Mathura</p>
          <p><span className="font-bold">Exam Date:</span> 6 September 2026 (10:00 AM)</p>
        </div>
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          toast.success("Admit Card Revoked", "Admit card marked as REVOKED");
        }}
        title="Revoke Student Admit Card"
        message="Are you sure you want to revoke this admit card? The candidate will no longer be eligible to appear in the examination with this token."
        confirmLabel="Revoke Card"
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Student Lead Details"
      >
        <div className="space-y-4 text-xs">
          <p><span className="font-bold">Student:</span> Devendra Yadav</p>
          <p><span className="font-bold">Phone:</span> +91 98765 43210</p>
          <p><span className="font-bold">Target Course:</span> IIT-JEE 2-Year Program</p>
          <p><span className="font-bold">Lead Status:</span> <StatusBadge status="INTERESTED" size="sm" /></p>
        </div>
      </Drawer>

      {/* Footer Shell */}
      <Footer />

      {/* Mobile Bottom Conversion CTA Bar */}
      <MobileBottomCTA />
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <DesignSystemContent />
    </ToastProvider>
  );
}
