import React from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";

interface GoogleAnalyticsProps {
  gaId?: string;
}

/**
 * Google Analytics 4 (gtag.js) Component for Emprise Academy
 *
 * Configured with:
 * - Deferred non-blocking loading via Next.js Script (strategy="afterInteractive")
 * - Native Enhanced Measurement for SPA page transitions (zero double-counting)
 * - IP anonymization enabled
 * - Strict PII exclusion
 */
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  gaId = siteConfig.googleAnalyticsId,
}) => {
  if (!gaId) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
};
