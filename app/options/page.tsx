"use client"
import { useState, useEffect } from "react"
import { AppShell, ClarityCard, ProgressHeader, PrimaryButton, SecondaryButton, InlineError } from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

export default function OptionsPage() {
  const { isChecking } = useAuthCheck()
  const [options, setOptions] = useState<string[]>(["", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      const draft = localStorage.getItem("hcb_options_draft")
      if (draft) {
        const parsed = JSON.parse(draft)
        if (Array.isArray(parsed) && parsed.length >= 2) setOptions(parsed)
      }
    } catch {}
  }, [])

  const filledOptions = options.filter(o => o.trim().length > 0)
  const isValid = filledOptions.length >= 2

  const save = (opts: string[]) => {
    try { localStorage.setItem("hcb_options_draft", JSON.stringify(opts)) } catch {}
    try { sessionStorage.setItem("hcb_options_draft", JSON.stringify(opts)) } catch {}
  }

  const handleOptionChange = (index: number, value: string) => {
    const n = [...options]; n[index] = value; setOptions(n); save(n)
  }

  const handleAddOption = () => {
    if (options.length < 4) { const n = [...options, ""]; setOptions(n); save(n) }
  }

  const handleBack = () => {
    save(options)
    window.location.href = "/new-blueprint"
  }

  const handleSubmit = async () => {
    setError(""); setIsLoading(true)
    const sessionId = localStorage.getItem("hcb_session_id")
    const userId = localStorage.getItem("hcb_user_id")
    if (!sessionId || !userId) { setError("Session not found. Please start over."); setIsLoading(false); return }
    const token = localStorage.getItem("hcb_token")
    const headers: HeadersInit = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    try {
      localStorage.removeItem("hcb_options")
      const savedOptions: { id: number; name: string }[] = []
      for (const optionName of filledOptions) {
        const res = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/options/add", {
          method: "POST", headers,
          body: JSON.stringify({ user_id: Number(userId), session_id: Number(sessionId), option_name: optionName })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to add option")
        savedOptions.push({ id: data.option?.id || data.id || savedOptions.length + 1, name: optionName })
        localStorage.setItem("hcb_options", JSON.stringify(savedOptions))
      }
      const lockRes = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/options/lock", {
        method: "POST", headers,
        body: JSON.stringify({ user_id: Number(userId), session_id: Number(sessionId) })
      })
      if (!lockRes.ok) { const d = await lockRes.json(); throw new Error(d.message || "Failed to lock") }
      localStorage.removeItem("hcb_options_draft")
      sessionStorage.removeItem("hcb_options_draft")
      window.location.href = "/pressure-test"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally { setIsLoading(false) }
  }

  return (
    <AppShell>
      {isChecking ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-2 rounded-full" style={{ borderColor: "var(--hcb-border)", borderTopColor: "var(--hcb-action-primary)" }} />
        </div>
      ) : (
        <>
          <ProgressHeader step={2} totalSteps={6} onBack={handleBack} />
          <ClarityCard>
            <h1 className="font-serif text-[24px] mb-2" style={{ color: "var(--hcb-text-primary)" }}>What are you choosing between?</h1>
            <p className="text-base mb-6" style={{ color: "var(--hcb-text-secondary)" }}>Add 2 to 4 options. Be as specific or as open as feels right.</p>
            <div className="flex flex-col gap-4 mb-4">
              {options.map((option, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: "var(--hcb-text-primary)" }}>Option {index + 1}</label>
                  <input type="text" value={option} onChange={e => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    style={{ padding: "14px 16px", fontSize: "16px", borderRadius: "10px", border: "1px solid var(--hcb-border)", backgroundColor: "var(--hcb-card-bg)", color: "var(--hcb-text-primary)", outline: "none" }}
                    onFocus={e => { e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"; e.currentTarget.style.borderColor = "var(--hcb-focus-ring)" }}
                    onBlur={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--hcb-border)" }}
                  />
                </div>
              ))}
            </div>
            {options.length < 4 && <SecondaryButton onClick={handleAddOption} className="mb-4">+ Add Another Option</SecondaryButton>}
            <p className="text-sm italic mb-6" style={{ color: "var(--hcb-text-secondary)" }}>These options will guide your Blueprint reflection.</p>
            {error && <div className="mb-4"><InlineError message={error} /></div>}
            <PrimaryButton fullWidth disabled={!isValid} isLoading={isLoading} onClick={handleSubmit}>Lock In My Options &rarr;</PrimaryButton>
          </ClarityCard>
        </>
      )}
    </AppShell>
  )
}
