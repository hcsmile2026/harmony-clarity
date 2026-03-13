"use client"

import { useState, useEffect } from "react"
import {
  AppShell,
  ClarityCard,
  ProgressHeader,
  PrimaryButton,
  AutoGrowTextarea,
  InlineError,
} from "@/components/hcb"
import { useAuthCheck, getAuthHeaders } from "@/hooks/use-auth-check"

export default function NewBlueprintPage() {
  const { isChecking } = useAuthCheck()

  const [decisionContext, setDecisionContext] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hcb_decision_context")
      if (saved) {
        setDecisionContext(saved)
      }
    }
  }, [])

  const isValid = decisionContext.trim().length >= 20

  const handleContinue = async () => {
    setError("")
    setIsLoading(true)

    // Get the current value directly from the textarea to avoid stale state
    const currentValue = decisionContext.trim()
    
    try {
      // Save to localStorage immediately and synchronously
      localStorage.setItem("hcb_decision_context", currentValue)
      
      // Verify it was saved
      const savedValue = localStorage.getItem("hcb_decision_context")
      if (!savedValue) {
        throw new Error("Failed to save decision context")
      }

      // Create session
      const response = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/sessions/start",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            user_id: Number(localStorage.getItem("hcb_user_id")),
            decision_topic: currentValue,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to start session")
      }

      // Check if we got a new session
      if (data.session && data.session.id) {
        localStorage.setItem("hcb_session_id", String(data.session.id))
        window.location.href = "/options"
        return
      }

      // If no new session but active_count > 0, fetch existing session
      if (data.active_count > 0) {
        const userId = localStorage.getItem("hcb_user_id")
        const token = localStorage.getItem("hcb_token")
        const listResponse = await fetch(
          `https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/sessions/list?user_id=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        )

        if (listResponse.ok) {
          const listData = await listResponse.json()
          // Response shape is { sessions: [...] }
          const existingSession = listData.sessions?.[0]
          if (existingSession) {
            localStorage.setItem("hcb_session_id", String(existingSession.id))
            window.location.href = "/options"
            return
          }
        }
      }

      setError("Could not create or find session")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
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
    <AppShell>
      <ProgressHeader
        step={1}
        totalSteps={6}
        onBack={() => (window.location.href = "/dashboard")}
      />

      <ClarityCard>
        <h1
          className="font-serif text-[24px] mb-2"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          What decision are you seeking clarity about?
        </h1>
        <p
          className="text-base mb-6"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Describe the situation in your own words. There are no wrong answers.
        </p>

        <AutoGrowTextarea
          value={decisionContext}
          onChange={setDecisionContext}
          placeholder="I'm trying to decide whether to..."
          storageKey="hcb_decision_context"
          minHeight={120}
        />

        <p
          className="text-sm italic mt-4 mb-6"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          You don&apos;t need a perfect answer to continue.
        </p>

        {error && (
          <div className="mb-4">
            <InlineError message={error} />
          </div>
        )}

        <PrimaryButton
          fullWidth
          disabled={!isValid}
          isLoading={isLoading}
          onClick={handleContinue}
        >
          Continue &rarr;
        </PrimaryButton>
      </ClarityCard>
    </AppShell>
  )
}
