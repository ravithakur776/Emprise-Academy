"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Settings,
  ArrowLeft,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function AdminSiteSettingsCmsPage() {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    academyName: "Emprise Academy",
    tagline: "Serious Preparation. Proven Mentorship. Rank-Driven Results.",
    address: "Near Highway Crossing, Mathura, Uttar Pradesh - 281001",
    phone: "+91 98765 43210",
    email: "admissions@empriseacademy.com",
    whatsapp: "+91 98765 43210",
    businessHours: "Monday to Saturday: 08:30 AM – 08:00 PM (Sunday: 09:00 AM – 02:00 PM)",
    googleMapsUrl: "https://maps.google.com/?q=Emprise+Academy+Mathura",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings Saved", "Global institution contact and business information updated.");
    }, 500);
  };

  return (
    <AdminLayout staffName="Super Admin" staffRole="SUPER_ADMIN">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to CMS Modules</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Institutional Business Settings
            </h1>
          </div>

          <Button
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Global Settings
          </Button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Verified Contact & Campus Coordinates</h2>
            <p className="text-xs text-slate-500">Rendered across website header, footer, contact page, and admit cards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Official Academy Name" required htmlFor="set-name">
              <Input
                id="set-name"
                value={settings.academyName}
                onChange={(e) => setSettings({ ...settings, academyName: e.target.value })}
              />
            </FormField>

            <FormField label="Primary Tagline" required htmlFor="set-tagline">
              <Input
                id="set-tagline"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Physical Campus Address" required htmlFor="set-addr">
            <Input
              id="set-addr"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Primary Phone" required htmlFor="set-phone">
              <Input
                id="set-phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </FormField>

            <FormField label="Official Email" required htmlFor="set-email">
              <Input
                id="set-email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </FormField>

            <FormField label="WhatsApp Helpline" required htmlFor="set-wa">
              <Input
                id="set-wa"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Campus Working Hours" htmlFor="set-hours">
            <Input
              id="set-hours"
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
            />
          </FormField>
        </div>
      </div>
    </AdminLayout>
  );
}
