"use client"

import { useState } from "react"
import {
  AppShell,
  ClarityCard,
  PageHeader,
  PrimaryButton,
  InlineError,
} from "@/components/hcb"
import { useAuthCheck, getAuthHeaders } from "@/hooks/use-auth-check"

const features = [
  "Full AI-powered decision reflection",
  "Birth Blueprint Analysis",
  "Your Next 14 Days action plan",
  "Reflection Question",
  "Save to PDF",
]

export default function BuyCreditsPage() {
  const { isChecking } = useAuthCheck()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:lsRTcA3V/payments/create-checkout",
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout")
      }

      // Redirect to Stripe checkout
      window.location.href = data.checkout_url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

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
      <PageHeader
        title="Get More Credits"
        subtitle="Each credit generates one complete Blueprint."
        onBack={() => (window.location.href = "/dashboard")}
      />

      <ClarityCard>
        <div className="text-center">
          <div
            className="font-serif text-[64px] font-bold mb-1"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            $47
          </div>
          <p
            className="text-base mb-6"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            1 Blueprint Credit
          </p>

          <div
            className="w-full h-px mb-6"
            style={{ backgroundColor: "var(--hcb-border)" }}
          />

          <ul className="flex flex-col gap-3 mb-6 text-left">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3"
              >
                <span
                  className="text-base mt-0.5"
                  style={{ color: "var(--hcb-action-primary)" }}
                >
                  &#10022;
                </span>
                <span
                  className="text-base"
                  style={{ color: "var(--hcb-text-primary)" }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {error && (
            <div className="mb-4">
              <InlineError message={error} />
            </div>
          )}

          <PrimaryButton
            fullWidth
            isLoading={isLoading}
            onClick={handlePurchase}
          >
            Purchase Blueprint &mdash; $47
          </PrimaryButton>

          <p
            className="text-[13px] mt-4 flex items-center justify-center gap-1"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="6"
                width="10"
                height="8"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 6V4a3 3 0 116 0v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Secure payment powered by Stripe
          </p>

          <p
            className="text-[13px] mt-2"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            Your Blueprint is generated instantly after purchase.
          </p>
        </div>
      </ClarityCard>
    </AppShell>
  )
}
