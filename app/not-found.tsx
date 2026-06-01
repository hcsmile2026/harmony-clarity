"use client"

import { AppShell, PrimaryButton, SecondaryButton } from "@/components/hcb"

export default function NotFound() {
  return (
    <AppShell maxWidth="sm">
      <div className="flex flex-col items-center text-center pt-16">
        <div className="text-4xl mb-6" style={{ color: "var(--hcb-action-primary)" }}>
          &#10022;
        </div>

        <h1
          className="font-serif text-[32px] mb-3"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Page Not Found
        </h1>
        <p
          className="text-base mb-10"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          This page doesn&apos;t exist or has moved.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <PrimaryButton fullWidth onClick={() => (window.location.href = "/dashboard")}>
            Go to Dashboard
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={() => (window.location.href = "/")}>
            Back to Login
          </SecondaryButton>
        </div>
      </div>
    </AppShell>
  )
}
