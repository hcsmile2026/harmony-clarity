"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import {
  AppShell,
  ProgressHeader,
  PrimaryButton,
  SecondaryButton,
  InlineError,
} from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

export default function ResultsPage() {
  const { isChecking } = useAuthCheck()

  const [isGenerating, setIsGenerating] = useState(true)
  const [reflection, setReflection] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const generateBlueprint = async () => {
      const token = localStorage.getItem("hcb_token")
      const userId = localStorage.getItem("hcb_user_id")
      const sessionId = localStorage.getItem("hcb_session_id")
      const decisionContext = localStorage.getItem("hcb_decision_context")
      const optionsStr = localStorage.getItem("hcb_options")
      const existingReflection = localStorage.getItem("hcb_reflection")
      if (existingReflection) { setReflection(existingReflection); setIsGenerating(false); return }
        setError("Session data not found. Please start over.")
        setIsGenerating(false)
        return
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }

      
      let options: { id: number; name: string }[] = []
      try {
        options = JSON.parse(optionsStr || "[]")
      } catch {
        options = []
      }

      try {
        const response = await fetch(
          "https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/reflections/create",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              user_id: Number(userId),
              session_id: Number(sessionId),
              decision_context: decisionContext || "",
              option_1: options[0]?.name || "",
              option_2: options[1]?.name || "",
              option_3: options[2]?.name || null,
              option_4: options[3]?.name || null,
            }),
          }
        )

        const data = await response.json()

        // Handle insufficient credits error
        if (!response.ok || data.success === false) {
          if (data.error === "Insufficient credits" || data.message?.includes("Insufficient credits")) {
            setError("insufficient_credits")
            setIsGenerating(false)
            return
          }
          throw new Error(data.message || data.error || "Failed to generate blueprint")
        }

        setReflection(data.reflection || ""); localStorage.setItem("hcb_reflection", data.reflection || "")
        localStorage.setItem("hcb_reflection", data.reflection || "")
      } catch (err) {
        setIsGenerating(false)
      }
    }

    if (!isChecking) {
      generateBlueprint()
    }
  }, [isChecking])

  const handleSavePDF = () => {
    window.print()
  }

  const handleStartNew = () => {
    // Clear session data
    localStorage.removeItem("hcb_session_id")
    localStorage.removeItem("hcb_options")
    localStorage.removeItem("hcb_decision_context")
    localStorage.removeItem("hcb_pressure_q1")
    localStorage.removeItem("hcb_pressure_q2")
    localStorage.removeItem("hcb_pressure_q3"); localStorage.removeItem("hcb_reflection")
    localStorage.removeItem("hcb_reflection")
    window.location.href = "/new-blueprint"
  }
    setError("")
    setIsGenerating(true)
    window.location.reload()
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

  if (isGenerating) {
    return (
      <AppShell>
        <ProgressHeader step={4} totalSteps={4} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div
            className="animate-spin h-12 w-12 border-3 rounded-full mb-6"
            style={{
              borderColor: "var(--hcb-border)",
              borderTopColor: "var(--hcb-action-primary)",
              borderWidth: "3px",
            }}
          />
          <p
            className="text-lg font-medium mb-2"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            Generating your Blueprint...
          </p>
          <p
            className="text-base"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            This takes about 30 seconds.
          </p>
        </div>
      </AppShell>
    )
  }

  if (error) {
    // Special handling for insufficient credits
    if (error === "insufficient_credits") {
      return (
        <AppShell>
          <ProgressHeader step={4} totalSteps={4} />
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <p
              className="text-lg font-medium mb-2"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              You need credits to generate your Blueprint.
            </p>
            <p
              className="text-base mb-6"
              style={{ color: "var(--hcb-text-secondary)" }}
            >
              Purchase credits to unlock your personalized insights.
            </p>
            <PrimaryButton onClick={() => (window.location.href = "/buy-credits")}>
              Buy Credits &rarr;
            </PrimaryButton>
          </div>
        </AppShell>
      )
    }

    return (
      <AppShell>
        <ProgressHeader step={4} totalSteps={4} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <InlineError message="Something went wrong. Please try again." />
          <div className="mt-6">
            <PrimaryButton onClick={handleRetry}>Try Again</PrimaryButton>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <ProgressHeader step={4} totalSteps={4} />

      <h1
        className="font-serif text-[32px] text-center mb-2"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        Your Blueprint
      </h1>
      <p
        className="text-base text-center mb-8"
        style={{ color: "var(--hcb-text-secondary)" }}
      >
        Generated just for you
      </p>

      {reflection ? (
        <div
          className="rounded-[14px] p-6 prose prose-slate max-w-none"
          style={{
            backgroundColor: "var(--hcb-card-bg)",
            border: "1px solid var(--hcb-border-card)",
            color: "var(--hcb-text-primary)",
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-serif text-2xl font-medium mt-6 mb-3 first:mt-0" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-serif text-xl font-medium mt-5 mb-2" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-serif text-lg font-medium mt-4 mb-2" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 leading-relaxed" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-3" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-3" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: "var(--hcb-text-primary)" }}>
                  {children}
                </strong>
              ),
              br: () => <br />,             
              hr: () => (
                <hr className="my-6 border-t" style={{ borderColor: "var(--hcb-border)" }} />
              ),
            }}
          >
            {reflection}
          </ReactMarkdown>
        </div>
      ) : (
        <p
          className="text-center py-8"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          No reflection content was returned. Please try again.
        </p>
      )}

      <div className="flex flex-col gap-3 mt-8 no-print">
        <PrimaryButton fullWidth onClick={handleSavePDF}>
          Save to PDF
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={handleStartNew}>
          Start a New Blueprint
        </SecondaryButton>
      </div>

      <p
        className="text-[13px] text-center mt-8"
        style={{ color: "var(--hcb-text-secondary)" }}
      >
        This Blueprint is for reflective and entertainment purposes only. It is
        not professional advice of any kind.
      </p>
    </AppShell>
  )
}
