"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { AppShell, PrimaryButton, SecondaryButton, InlineError } from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

export default function ViewBlueprintPage() {
  const { isChecking } = useAuthCheck()
  const [reflection, setReflection] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchReflection = async () => {
      const token = localStorage.getItem("hcb_token")
      const params = new URLSearchParams(window.location.search)
      const sessionId = params.get("session")

      if (!token || !sessionId) {
        setError("Session not found. Please go back to your dashboard.")
        setIsLoading(false)
        return
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }

      try {
        const res = await fetch(
          `https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/reflections/list?session_id=${sessionId}`,
          { headers }
        )
        const data = await res.json()
        const reflections = data.reflections || []
        const aiReflection = reflections.find((r: any) => r.reflection_type === "ai_generated")
        if (aiReflection?.reflection_text) {
          setReflection(aiReflection.reflection_text)
        } else {
          setError("No blueprint found for this session.")
        }
      } catch {
        setError("Something went wrong loading this blueprint.")
      } finally {
        setIsLoading(false)
      }
    }

    if (!isChecking) fetchReflection()
  }, [isChecking])

  const handleSavePDF = () => {
    window.print()
  }

  const handleDownloadText = () => {
    const blob = new Blob([reflection], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "harmony-clarity-blueprint.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isChecking || isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div
            className="animate-spin h-8 w-8 border-2 rounded-full"
            style={{ borderColor: "var(--hcb-border)", borderTopColor: "var(--hcb-action-primary)" }}
          />
        </div>
      </AppShell>
    )
  }

  if (error) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
          <InlineError message={error} />
          <SecondaryButton onClick={() => (window.location.href = "/dashboard")}>
            ← Back to Dashboard
          </SecondaryButton>
        </div>
      </AppShell>
    )
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
      <AppShell>
        <div className="flex items-center justify-between mb-6 no-print">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="text-sm cursor-pointer"
            style={{ color: "var(--hcb-action-primary)", fontWeight: 500 }}
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleDownloadText}
            className="text-sm cursor-pointer"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            Download as Text
          </button>
        </div>

        <h1
          className="font-serif text-[28px] md:text-[32px] mb-2 text-center"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Your Blueprint
        </h1>
        <p className="text-base text-center mb-8" style={{ color: "var(--hcb-text-secondary)" }}>
          Your past clarity blueprint
        </p>

        {reflection && (
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
                  <h1 className="font-serif text-2xl font-medium mt-6 mb-3 first:mt-0" style={{ color: "var(--hcb-text-primary)" }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-serif text-xl font-medium mt-5 mb-2" style={{ color: "var(--hcb-text-primary)" }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-lg font-medium mt-4 mb-2" style={{ color: "var(--hcb-text-primary)" }}>{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 leading-relaxed" style={{ color: "var(--hcb-text-primary)" }}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-3" style={{ color: "var(--hcb-text-primary)" }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-3" style={{ color: "var(--hcb-text-primary)" }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1" style={{ color: "var(--hcb-text-primary)" }}>{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold" style={{ color: "var(--hcb-text-primary)" }}>{children}</strong>
                ),
                br: () => <br />,
                hr: () => <hr className="my-6 border-t" style={{ borderColor: "var(--hcb-border)" }} />,
              }}
            >
              {reflection}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-8 no-print">
          <PrimaryButton fullWidth onClick={handleSavePDF}>
            Save to PDF
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={handleDownloadText}>
            Download as Text
          </SecondaryButton>
          <SecondaryButton fullWidth onClick={() => (window.location.href = "/dashboard")}>
            ← Back to Dashboard
          </SecondaryButton>
        </div>

        <p className="text-[13px] text-center mt-8 no-print" style={{ color: "var(--hcb-text-secondary)" }}>
          This Blueprint is for reflective and educational purposes only. It is not professional advice of any kind.
        </p>
      </AppShell>
    </>
  )
}

