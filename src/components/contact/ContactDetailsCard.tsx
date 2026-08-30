import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { MapPin, Phone, Mail, MessageSquare, Clock, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

export const ContactDetailsCard: React.FC = () => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const phonePrimary = business.contact.phone_primary;
  const phonePrimaryTel = business.contact.phone_primary_tel;
  const phoneSecondary = business.contact.phone_secondary;
  const phoneSecondaryTel = business.contact.phone_secondary_tel;
  const whatsapp = business.contact.whatsapp;
  const whatsappLink = business.contact.whatsapp_link;
  const email = business.contact.email;
  const workingHours = business.contact.business_hours;
  const mapsUrl = business.contact.google_maps_url;

  return (
    <div className="space-y-6">
      {/* Information Cards Grid */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-[var(--brand-primary)]">
            Academic Campus & Reception
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Central admissions and classroom facility in Mathura
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          {/* Address */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[var(--brand-accent)]" />
            </div>
            <div>
              <strong className="block text-slate-900 mb-0.5">Campus Location</strong>
              <p className="text-slate-600 leading-relaxed">{business.address.display_location}</p>
            </div>
          </div>

          {/* Primary Phone */}
          {phonePrimary && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Admissions Desk (Primary)</strong>
                <a
                  href={phonePrimaryTel}
                  className="font-bold text-[var(--brand-accent)] hover:underline"
                >
                  {phonePrimary}
                </a>
              </div>
            </div>
          )}

          {/* Secondary Phone */}
          {phoneSecondary && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Admissions Helpline (Secondary)</strong>
                <a
                  href={phoneSecondaryTel}
                  className="font-bold text-[var(--brand-accent)] hover:underline"
                >
                  {phoneSecondary}
                </a>
              </div>
            </div>
          )}

          {/* WhatsApp */}
          {whatsapp && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Official WhatsApp Desk</strong>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:underline"
                >
                  {whatsapp} (Click to Chat)
                </a>
              </div>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Official Email</strong>
                <a
                  href={`mailto:${email}`}
                  className="text-slate-700 hover:text-[var(--brand-primary)] hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
          )}

          {/* Working Hours */}
          {workingHours && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Campus Consultation Hours</strong>
                <p className="text-slate-600">{workingHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Maps Directions Card */}
      {mapsUrl && (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campus Location & Directions
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Near Tera Tower, Bhuteshwar Road, Mathura. Centrally located and easily accessible from all parts of Mathura & Vrindavan.
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<Navigation className="w-4 h-4" />}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Get Directions on Google Maps
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};
