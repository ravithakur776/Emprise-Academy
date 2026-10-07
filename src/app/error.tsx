"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-sensitive error summary for production telemetry
    console.error("Application runtime error:", error.message || "Unknown error", error.digest ? `[digest: ${error.digest}]` : "");
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Container size="md">
        <div className="text-center max-w-xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <Heading as="h1" variant="h2" align="center">
            Something Went Wrong
          </Heading>

          <Text variant="body" color="muted" align="center" className="text-base">
            We encountered an unexpected issue while loading this page. Our technical team has been notified.
          </Text>

          {error.digest && (
            <p className="text-xs text-slate-400 font-mono">
              Error Reference: {error.digest}
            </p>
          )}

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => reset()}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
