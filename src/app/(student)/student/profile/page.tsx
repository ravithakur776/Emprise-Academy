"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { Badge } from "@/components/ui/badge/Badge";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { createClientBrowser } from "@/lib/supabase/client";
import { Save, User, ShieldCheck, Lock, CheckCircle2, RefreshCw } from "lucide-react";

function StudentProfileContent() {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Profile Fields
  const [profile, setProfile] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "2009-01-01",
    gender: "MALE",
    currentClass: "Class 12",
    schoolName: "",
    phone: "",
    email: "",
    address: "",
    applicationNo: "ETSE Portal",
    accountStatus: "ACTIVE",
  });

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fprofile");
        return;
      }

      setUserId(user.id);

      // Fetch student profile
      const { data: studentProf } = await (supabase
        .from("student_profiles") as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Fetch user profile
      const { data: userProf } = await (supabase
        .from("user_profiles") as any)
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // Fetch parent profile if available
      let parentProf: any = null;
      if (studentProf?.id) {
        const { data: p } = await (supabase
          .from("parent_profiles") as any)
          .select("*")
          .eq("student_id", studentProf.id)
          .maybeSingle();
        parentProf = p;
      }

      // Fetch application number
      const { data: appRecord } = await (supabase
        .from("etse_registrations") as any)
        .select("application_number, father_name, mother_name, school_name")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const studentName =
        studentProf?.full_name ||
        userProf?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student";

      const fatherName =
        parentProf?.father_name || appRecord?.father_name || "";
      const motherName =
        parentProf?.mother_name || appRecord?.mother_name || "";
      const currentClass = studentProf?.current_class || "Class 12";
      const schoolName =
        studentProf?.school_name || appRecord?.school_name || "";
      const phone = studentProf?.phone || userProf?.phone || "";
      const email = user.email || studentProf?.email || "";
      const address = studentProf?.address ? `${studentProf.address}, ${studentProf.city || ""}` : (studentProf?.city || "Mathura, Uttar Pradesh");
      const dob = studentProf?.dob || "2009-01-01";
      const gender = studentProf?.gender || "MALE";
      const applicationNo =
        appRecord?.application_number ||
        studentProf?.admission_number ||
        "ETSE Portal";

      setProfile({
        studentName,
        fatherName,
        motherName,
        dob,
        gender,
        currentClass,
        schoolName,
        phone,
        email,
        address,
        applicationNo,
        accountStatus: studentProf?.is_active !== false ? "ACTIVE" : "INACTIVE",
      });
    } catch (err) {
      console.error("[PROFILE_LOAD_ERROR]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsSaving(true);
    try {
      const supabase = createClientBrowser();

      // Upsert student_profiles
      const { data: existingStudent } = await (supabase
        .from("student_profiles") as any)
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existingStudent?.id) {
        await (supabase.from("student_profiles") as any)
          .update({
            full_name: profile.studentName,
            dob: profile.dob,
            gender: profile.gender,
            phone: profile.phone,
            current_class: profile.currentClass,
            school_name: profile.schoolName,
            address: profile.address,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingStudent.id);
      } else {
        await (supabase.from("student_profiles") as any).insert({
          user_id: userId,
          full_name: profile.studentName,
          dob: profile.dob,
          gender: profile.gender,
          phone: profile.phone,
          current_class: profile.currentClass,
          school_name: profile.schoolName,
          address: profile.address,
        });
      }

      // Also update user_profiles
      await (supabase.from("user_profiles") as any)
        .update({
          full_name: profile.studentName,
          phone: profile.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      setIsEditing(false);
      toast.success("Profile Updated", "Your profile information has been saved successfully.");
    } catch (err: any) {
      console.error("[PROFILE_SAVE_ERROR]", err);
      toast.error("Update Failed", err?.message || "Could not save profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-md w-1/3" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 h-96" />
        </div>
      </StudentLayout>
    );
  }

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
              {profile.studentName ? profile.studentName.charAt(0) : "S"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.studentName || "Authenticated Student"}</h2>
              <p className="text-xs text-slate-500">{profile.currentClass} {profile.schoolName ? `• ${profile.schoolName}` : ""}</p>
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

              <FormField label="Father's / Guardian's Name" htmlFor="prof-father">
                <Input
                  id="prof-father"
                  value={profile.fatherName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
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
                  disabled={true}
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

              <FormField label="School Name" htmlFor="prof-school">
                <Input
                  id="prof-school"
                  value={profile.schoolName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
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
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                <Button type="button" variant="outline" size="sm" fullWidth className="sm:w-auto" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" fullWidth className="sm:w-auto" isLoading={isSaving} rightIcon={<Save className="w-4 h-4" />}>
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
