"use client";

import React, { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { Badge } from "@/components/ui/badge/Badge";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { Save, User, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

function StudentProfileContent() {
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile Fields
  const [profile, setProfile] = useState({
    studentName: "Aarav Verma",
    fatherName: "Sunil Verma",
    motherName: "Sunita Verma",
    dob: "2011-05-15",
    gender: "MALE",
    currentClass: "Class 8",
    schoolName: "St. Dominic's Senior Secondary School",
    phone: "98XXXXXXXX",
    email: "student@example.com",
    address: "Mathura, Uttar Pradesh",
    applicationNo: "ETSE2026-000100",
    accountStatus: "ACTIVE",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success("Profile Updated", "Your profile information has been saved successfully.");
    }, 600);
  };

  return (
    <StudentLayout
      studentName={profile.studentName}
      studentClass={profile.currentClass}
      applicationNo={profile.applicationNo}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              STUDENT IDENTITY & CREDENTIALS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Student Profile
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="success" size="sm">
              Account Active
            </Badge>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Avatar Banner */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary)] text-white font-extrabold text-2xl flex items-center justify-center shadow-xs">
              {profile.studentName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.studentName}</h2>
              <p className="text-xs text-slate-500">{profile.currentClass} • {profile.schoolName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-[var(--brand-accent)] font-semibold">
                  Permanent ID: {profile.applicationNo}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Student Full Name" required htmlFor="prof-name">
                <Input
                  id="prof-name"
                  value={profile.studentName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, studentName: e.target.value })}
                  required
                />
              </FormField>

              <FormField label="Father's / Guardian's Name" required htmlFor="prof-father">
                <Input
                  id="prof-father"
                  value={profile.fatherName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                  required
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Mother's Name" htmlFor="prof-mother">
                <Input
                  id="prof-mother"
                  value={profile.motherName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, motherName: e.target.value })}
                />
              </FormField>

              <FormField label="Date of Birth" required htmlFor="prof-dob">
                <Input
                  id="prof-dob"
                  type="date"
                  value={profile.dob}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  required
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Registered Mobile" required htmlFor="prof-phone">
                <PhoneField
                  id="prof-phone"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                />
              </FormField>

              <FormField label="Email Address" htmlFor="prof-email">
                <Input
                  id="prof-email"
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Current Enrolled Class" required htmlFor="prof-class">
                <Select
                  id="prof-class"
                  value={profile.currentClass}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, currentClass: e.target.value })}
                  options={[
                    { value: "Class 7", label: "Class 7" },
                    { value: "Class 8", label: "Class 8" },
                    { value: "Class 9", label: "Class 9" },
                    { value: "Class 10", label: "Class 10" },
                    { value: "Class 11", label: "Class 11" },
                    { value: "Class 12", label: "Class 12" },
                    { value: "Dropper", label: "Dropper" },
                  ]}
                />
              </FormField>

              <FormField label="School Name" required htmlFor="prof-school">
                <Input
                  id="prof-school"
                  value={profile.schoolName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
                  required
                />
              </FormField>
            </div>

            <FormField label="Residential Address / City" htmlFor="prof-address">
              <Input
                id="prof-address"
                value={profile.address}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </FormField>

            {/* Readonly Academic Record Notice */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Examination roll numbers and official scorecards are locked to your verified student identity and can only be updated by the examination administration.
              </span>
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSaving} rightIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}

export default function StudentProfilePage() {
  return (
    <ToastProvider>
      <StudentProfileContent />
    </ToastProvider>
  );
}
