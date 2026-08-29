import React from "react";
import { MAIN_CONTACT_DATA } from "@/data/admissions";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { MapPin, Phone, Mail, MessageSquare, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";

export const ContactDetailsCard: React.FC = () => {
  const { contactDetails } = MAIN_CONTACT_DATA;
  const business = CANONICAL_BUSINESS_CONFIG;

  const phone = business.contact.phone_primary || contactDetails.phone;
  const whatsapp = business.contact.whatsapp || contactDetails.whatsapp;
  const email = business.contact.email || contactDetails.email;
  const workingHours = business.contact.business_hours || contactDetails.workingHours;
  const directionsUrl = business.contact.google_maps_url || contactDetails.googleMapsDirectionsUrl;
  const embedUrl = contactDetails.googleMapsEmbedUrl;

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
              <p className="text-slate-600">{business.address.display_location}</p>
            </div>
          </div>

          {/* Phone (Render only if verified & configured) */}
          {phone && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Admissions Desk</strong>
                <a
                  href={`tel:${phone}`}
                  className="font-bold text-[var(--brand-accent)] hover:underline"
                >
                  {phone}
                </a>
              </div>
            </div>
          )}

          {/* WhatsApp (Render only if verified & configured) */}
          {whatsapp && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Official WhatsApp Desk</strong>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:underline"
                >
                  {whatsapp} (Click to Chat)
                </a>
              </div>
            </div>
          )}

          {/* Email (Render only if verified & configured) */}
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

          {/* Working Hours (Render only if verified & configured) */}
          {workingHours && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">Campus Hours</strong>
                <p className="text-slate-600">{workingHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Google Maps Container (Render only if verified & configured) */}
      {embedUrl && directionsUrl ? (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Location Map
            </span>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <iframe
              title="Emprise Academy Location Map"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" size="sm" fullWidth rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Get Driving Directions
            </Button>
          </a>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-3 text-xs text-slate-600">
          <h4 className="text-sm font-bold text-slate-900">In-Person Academic Counselling</h4>
          <p>
            Visit our campus in Mathura, Uttar Pradesh to meet our academic directors, discuss batch schedules, or complete admission formalities.
          </p>
          <div className="pt-2">
            <Link href="#counselling-form">
              <Button variant="primary" size="sm" fullWidth>
                Request Counselling Session
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
