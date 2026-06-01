"use client"

import { AppShell, ClarityCard, PrimaryButton, SecondaryButton } from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

export default function PaymentSuccessPage() {
  const { isChecking } = useAuthCheck()

  if (isChecking) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div
            className="animate-spin h-8 w-8 border-2 rounded-full"
            style={{
              borderColor: "var(--hcb-border)",
              borderTopColor: "var(--hcb-action-primary)",
            }}
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell maxWidth="sm">
      <div className="flex flex-col items-center text-center pt-8">
        <div className="text-4xl mb-6" style={{ color: "var(--hcb-action-primary)" }}>
          &#10022;
        </div>

        <h1
          className="font-serif text-[28px] md:text-[32px] mb-3"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Payment Successful
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Your Blueprint credit has been added to your account.
        </p>

        <ClarityCard className="w-full mb-8 text-left">
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            What you unlocked
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Full AI-powered decision reflection",
              "Birth Blueprint Analysis",
              "Your Next 14 Days action plan",
              "Reflection Question",
              "Save to PDF",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-base mt-0.5" style={{ color: "var(--hcb-action-primary)" }}>
                  &#10022;
                </span>
                <span className="text-base" style={{ color: "var(--hcb-text-primary)" }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </ClarityCard>

        <div className="flex flex-col gap-3 w-full">
          <PrimaryButton fullWidth onClick={() => (window.location.href = "/new-blueprint")}>
            Start My Blueprint &rarr;
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={() => (window.location.href = "/dashboard")}>
            Go to Dashboard
          </SecondaryButton>
        </div>
      </div>
    </AppShell>
  )
}
