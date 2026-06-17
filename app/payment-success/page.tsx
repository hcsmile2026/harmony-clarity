"use client"

import { useEffect, useState } from "react"
import { AppShell, ClarityCard, PrimaryButton, SecondaryButton } from "@/components/hcb"

const FEATURES = [
  "Full decision reflection calculated from your birth data",
  "Birth Blueprint Analysis",
  "Your Next 14 Days action plan",
  "Reflection Question",
  "Save to PDF",
]

export default function PaymentSuccessPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("hcb_token")
    setIsAuthenticated(!!token)
  }, [])

  if (isAuthenticated === null) {
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
          {isAuthenticated
            ? "Your Blueprint credit has been added to your account."
            : "Your payment was received. Create an account or log in to access your Blueprint credit."}
        </p>

        <ClarityCard className="w-full mb-8 text-left">
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            What you unlocked
          </p>
          <ul className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
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

        {isAuthenticated ? (
          <div className="flex flex-col gap-3 w-full">
            <PrimaryButton fullWidth onClick={() => (window.location.href = "/new-blueprint")}>
              Start My Blueprint &rarr;
            </PrimaryButton>
            <SecondaryButton fullWidth onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </SecondaryButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <PrimaryButton fullWidth onClick={() => (window.location.href = "/?next=%2Fdashboard&context=purchase")}>
              Create Account or Log In &rarr;
            </PrimaryButton>
            <p className="text-sm" style={{ color: "var(--hcb-text-secondary)" }}>
              Your credit will be waiting when you sign in.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
