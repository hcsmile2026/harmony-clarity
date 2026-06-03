"use client"

import { useEffect, useState } from "react"
import { AppShell } from "@/components/hcb"
import { getAuthHeaders } from "@/hooks/use-auth-check"

export default function CheckoutPage() {
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("hcb_token")
    if (!token) {
      window.location.href = "/?next=%2Fcheckout"
      return
    }

    async function startCheckout() {
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

        window.location.href = data.checkout_url
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      }
    }

    startCheckout()
  }, [])

  if (error) {
    return (
      <AppShell maxWidth="sm">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <div className="text-3xl" style={{ color: "var(--hcb-action-primary)" }}>&#10022;</div>
          <p style={{ color: "var(--hcb-text-primary)" }}>{error}</p>
          <a
            href="/buy-credits"
            style={{ color: "var(--hcb-action-primary)", fontSize: "15px" }}
          >
            Try again
          </a>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell maxWidth="sm">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div
          className="animate-spin h-8 w-8 border-2 rounded-full"
          style={{
            borderColor: "var(--hcb-border)",
            borderTopColor: "var(--hcb-action-primary)",
          }}
        />
        <p className="text-sm" style={{ color: "var(--hcb-text-secondary)" }}>
          Taking you to checkout…
        </p>
      </div>
    </AppShell>
  )
}
