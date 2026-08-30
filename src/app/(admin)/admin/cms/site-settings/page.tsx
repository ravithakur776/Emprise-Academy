"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Building2,
} from "lucide-react";

export default function AdminSiteSettingsCmsPage() {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const business = CANONICAL_BUSINESS_CONFIG;

  const [settings, setSettings] = useState({
    academyName: business.academy_name,
    tagline: business.tagline || "",
    address: business.address.street_address || "",
    city: business.address.city,
    state: business.address.state,
    postalCode: business.address.postal_code || "",
    phonePrimary: business.contact.phone_primary || "",
    phoneSecondary: business.contact.phone_secondary || "",
    email: business.contact.email || "",
    whatsapp: business.contact.whatsapp || "",
    businessHours: business.contact.business_hours || "",
    googleMapsUrl: business.contact.google_maps_url || "",
    instagram: business.social.instagram || "",
    facebook: business.social.facebook || "",
    youtube: business.social.youtube || "",
    establishedYear: String(business.established_year),
    yearsOfExcellence: business.years_of_excellence,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings Saved", "Institutional contact and business configuration updated in CMS.");
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
            <p className="text-xs text-slate-500">
              Manage single canonical source of truth for institution credentials, campus address, and contact helplines.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Configuration
          </Button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Institution Identity & Campus Location</h2>
              <p className="text-xs text-slate-500">Rendered in header, footer, contact page, and structured JSON-LD schemas.</p>
            </div>
            <Badge variant="outline" size="sm">
              Single Source of Truth
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Official Academy Name" required htmlFor="set-name">
              <Input
                id="set-name"
                value={settings.academyName}
                onChange={(e) => setSettings({ ...settings, academyName: e.target.value })}
              />
            </FormField>

            <FormField label="Established Year" required htmlFor="set-year">
              <Input
                id="set-year"
                value={settings.establishedYear}
                onChange={(e) => setSettings({ ...settings, establishedYear: e.target.value })}
              />
            </FormField>

            <FormField label="Excellence Statement" required htmlFor="set-years">
              <Input
                id="set-years"
                value={settings.yearsOfExcellence}
                onChange={(e) => setSettings({ ...settings, yearsOfExcellence: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Campus Street Address" htmlFor="set-addr">
              <Input
                id="set-addr"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </FormField>

            <FormField label="City" required htmlFor="set-city">
              <Input
                id="set-city"
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              />
            </FormField>

            <FormField label="State & PIN" required htmlFor="set-state">
              <Input
                id="set-state"
                value={`${settings.state} - ${settings.postalCode}`}
                onChange={(e) => setSettings({ ...settings, state: e.target.value })}
              />
            </FormField>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Contact Helplines & Desks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField label="Primary Phone" htmlFor="set-phone">
                <Input
                  id="set-phone"
                  value={settings.phonePrimary}
                  onChange={(e) => setSettings({ ...settings, phonePrimary: e.target.value })}
                />
              </FormField>

              <FormField label="Secondary Phone" htmlFor="set-phone-sec">
                <Input
                  id="set-phone-sec"
                  value={settings.phoneSecondary}
                  onChange={(e) => setSettings({ ...settings, phoneSecondary: e.target.value })}
                />
              </FormField>

              <FormField label="Official Email" htmlFor="set-email">
                <Input
                  id="set-email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </FormField>

              <FormField label="WhatsApp Helpline" htmlFor="set-wa">
                <Input
                  id="set-wa"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                />
              </FormField>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Working Hours & Map Coordinates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Campus Working Hours" htmlFor="set-hours">
                <Input
                  id="set-hours"
                  value={settings.businessHours}
                  onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                />
              </FormField>

              <FormField label="Google Maps URL" htmlFor="set-maps">
                <Input
                  id="set-maps"
                  value={settings.googleMapsUrl}
                  onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                />
              </FormField>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Official Social Media Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Instagram Profile" htmlFor="set-ig">
                <Input
                  id="set-ig"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                />
              </FormField>

              <FormField label="Facebook Page" htmlFor="set-fb">
                <Input
                  id="set-fb"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                />
              </FormField>

              <FormField label="YouTube Channel" htmlFor="set-yt">
                <Input
                  id="set-yt"
                  value={settings.youtube}
                  onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                />
              </FormField>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
