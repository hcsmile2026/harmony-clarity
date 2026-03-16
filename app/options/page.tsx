"use client"

import { useState, useEffect } from "react"
import { AppShell, ClarityCard, ProgressHeader, PrimaryButton, SecondaryButton, InlineError } from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

const DRAFT_KEY = "hcb_options_draft"
const DRAFT_KEY2 = "hcb_options_draft_bak"

function saveDraft(opts: string[]) {
  const val = JSON.stringify(opts)
  try { localStorage.setItem(DRAFT_KEY, val) } catch {}
  try { sessionStorage.setItem(DRAFT_KEY2, val) } catch {}
}

function loadDraft(): string[] | null {
  try {
    const a = localStorage.getItem(DRAFT_KEY) || sessionStorage.getItem(DRAFT_KEY2)
    if (a) {
      const p = JSON.parse(a)
      if (Array.isArray(p) && p.length >= 2) return p
    }
  } catch {}
  return null
}

export default function OptionsPage() {
  const { isChecking } = useAuthCheck()
  const [options, setOptions] = useState<string[]>(["", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const draft = loadDraft()
    if (draft) setOptions(draft)
  }, [])

  const filledOptions = options.filter((o) => o.trim().length > 0)
  const isValid = filledOptions.length >= 2

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
    saveDraft(newOptions)
  }

  const handleAddOption = () => {
    if (options.length < 4) {
      const newOptions = [...options, ""]
      setOptions(newOptions)
      saveDraft(newOptions)
    }
  }

  const handleBack = () => {
    saveDraft(options)
    localStorage.removeItem("hcb_session_id")
    localStorage.removeItem("hcb_options")
    window.location.href = "/new-blueprint"
  }

  const handleSubmit = async () => {
    setError("")
    setIsLoading(true)
    const sessionId = localStorage.getItem("hcb_session_id")
    const userId = localStorage.getItem("hcb_user_id")
    if (!sessionId || !userId) {
      setError("Session not found. Please start over.")
      setIsLoading(false)
      return
    }
    const token = localStorage.getItem("hcb_token")
    const headers: HeadersInit = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    try {
      localStorage.removeItem("hcb_options")
      const savedOptions: { id: number; name: string }[] = []
      for (const optionName of filledOptions) {
        const response = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/options/add", {
          method: "POST", headers,
          body: JSON.stringify({ user_id: Number(userId), session_id: Number(sessionId), option_name: optionName }),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Failed to add option")
        const optionId = data.option?.id || data.id || savedOptions.length + 1
        savedOptions.push({ id: optionId, name: optionName })
        localStorage.setItem("hcb_options", JSON.stringify(savedOptions))
      }
      localStorage.setItem("hcb_options", JSON.stringify(savedOptions))
      const lockResponse = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/options/lock", {
        method: "POST", headers,
        body: JSON.stringify({ user_id: Number(userId), session_id: Number(sessionId) }),
      })
      if (!lockResponse.ok) {
        const data = await lockResponse.json()
        throw new Error(data.message || "Failed to lock options")
      }
      try { localStorage.removeItem(DRAFT_KEY) } catch {}
      try { sessionStorage.removeItem(DRAFT_KEY2) } catch {}
      window.location.href = "/pressure-test"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppShell>
      {isChecking ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-2 rounded-full"
            style={{ borderColor: "var(--hcb-border)", borderTopColor: "var(--hcb-action-primary)" }} />
        </div>
      ) : (
        <>
          <ProgressHeader step={2} totalSteps={6} onBack={handleBack} />
          <ClarityCard>
            <h1 className="font-serif text-[24px] mb-2" style={{ color: "var(--hcb-text-primary)" }}>
              What are you choosing between?
            </h1>
            <p className="text-base mb-6" style={{ color: "var(--hcb-text-secondary)" }}>
              Add 2 to 4 options. Be as specific or as open as feels right.
            </p>
            <div className="flex flex-col gap-4 mb-4">
              {options.map((option, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: "var(--hcb-text-primary)" }}>
                    Option {index + 1}
                  </label>
                  <input type="text" value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    style={{ padding: "14px 16px", fontSize: "16px", borderRadius: "10px",
                      border: "1px solid var(--hcb-border)", backgroundColor: "var(--hcb-card-bg)",
                      color: "var(--hcb-text-primary)", outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"; e.currentTarget.style.borderColor = "var(--hcb-focus-ring)" }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--hcb-border)" }}
                  />
                </div>
              ))}
            </div>
            {options.length < 4 && (
              <SecondaryButton onClick={handleAddOption} className="mb-4">+ Add Another Option</SecondaryButton>
            )}
            <p className="text-sm italic mb-6" style={{ color: "var(--hcb-text-secondary)" }}>
              These options will guide your Blueprint reflection.
            </p>
            {error && <div className="mb-4"><InlineError message={error} /></div>}
            <PrimaryButton fullWidth disabled={!isValid} isLoading={isLoading} onClick={handleSubmit}>
              Lock In My Options &rarr;
            </PrimaryButton>
          </ClarityCard>
        </>
      )}
    </AppShell>
  )
}
